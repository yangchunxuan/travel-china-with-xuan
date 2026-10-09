import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { inspectReleaseHtml, releasePaths, verifyLiveRelease } from "../../tools/verify-live-release.mjs";
import { hasVerifiedPagesRelease, resolvePagesRelease } from "../../tools/resolve-pages-release.mjs";

const commit = "a".repeat(40);
const olderCommit = "b".repeat(40);
const origin = "https://release-fixture.invalid";

function fixture({ markerSequence = [], badPage, badCanonical, badAsset = false, cache = "MISS" } = {}) {
  const requests = [];
  let markerCount = 0;
  const fetchImpl = async (input, options) => {
    const url = new URL(input);
    requests.push({ url, options });
    assert.equal(url.origin, origin, "all traffic stays in the injected fixture");
    assert.equal(options.method, "GET", "verification never submits an inquiry");
    assert.equal(options.redirect, "error");
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    assert.ok(url.searchParams.get("release-check"));
    if (url.pathname === "/release.json") {
      const variant = markerSequence[markerCount++] ?? {};
      return new Response(JSON.stringify({ schemaVersion: 1, commit, runId: "42", runAttempt: "1", ...variant.marker }), {
        status: variant.status ?? 200,
        headers: { "content-type": "application/json", "cf-cache-status": variant.cache ?? cache },
      });
    }
    if (url.pathname.startsWith("/_next/static/")) {
      return new Response(badAsset ? "<html>not found</html>" : "window.releaseFixture=true;", {
        headers: { "content-type": badAsset ? "text/html" : "application/javascript" },
      });
    }
    assert.ok(releasePaths.includes(url.pathname));
    return new Response(`<html><head><link href="${badCanonical === url.pathname ? origin + "/wrong/" : origin + url.pathname}" rel="canonical"></head><body><script src="/_next/static/chunks/runtime.js"></script><script src="/_next/static/chunks/page-${releasePaths.indexOf(url.pathname)}.js"></script></body></html>`, {
      status: badPage === url.pathname ? 526 : 200,
      headers: { "content-type": "text/html; charset=utf-8", "cf-cache-status": "HIT" },
    });
  };
  return { requests, fetchImpl };
}

const verify = (f, overrides = {}) => verifyLiveRelease({
  origin, expectedCommit: commit, expectedRunId: "42", expectedRunAttempt: "1",
  attempts: 1, timeoutMs: 100, retryDelayMs: 0, fetchImpl: f.fetchImpl, ...overrides,
});

test("a fresh exact marker, six canonicals and shared/page chunks produce verified evidence using GET only", async () => {
  const f = fixture();
  const report = await verify(f);
  assert.equal(report.ok, true);
  assert.equal(report.commit, commit);
  assert.equal(report.attempts[0].checks.length, 14);
  assert.deepEqual(report.attempts[0].checks.slice(1, 7).map((check) => check.path), releasePaths);
  assert.equal(f.requests.length, 14);
});

test("stale release markers are rejected even when the query is unique and the commit matches", async () => {
  const f = fixture({ cache: "HIT" });
  const report = await verify(f);
  assert.equal(report.ok, false);
  assert.match(report.attempts[0].error, /old_cache/u);
  assert.equal(f.requests.length, 1, "cached success cannot bless any HTML");
});

test("waits are bounded and retry until the new deployment marker reaches the origin", async () => {
  const f = fixture({ markerSequence: [{ marker: { commit: olderCommit } }, { cache: "STALE" }, {}] });
  const sleeps = [];
  const report = await verify(f, { attempts: 3, retryDelayMs: 2, sleep: async (ms) => sleeps.push(ms) });
  assert.equal(report.ok, true);
  assert.equal(report.attempts.length, 3);
  assert.deepEqual(sleeps, [2, 2]);
  assert.equal(f.requests.filter((request) => request.url.pathname === "/release.json").length, 3);
});

test("a marker from another run or attempt cannot confirm a rebuilt release of the same commit", async () => {
  for (const marker of [{ runId: "41" }, { runAttempt: "2" }]) {
    const report = await verify(fixture({ markerSequence: [{ marker }] }));
    assert.equal(report.ok, false);
    assert.match(report.attempts[0].error, /marker_mismatch/u);
  }
});

test("a transient page failure can retry after the origin marker itself becomes cached", async () => {
  const f = fixture({ markerSequence: [{}, { cache: "HIT" }] });
  const actualFetch = f.fetchImpl;
  let failed = false;
  f.fetchImpl = async (url, options) => {
    if (!failed && new URL(url).pathname === "/tours/") {
      failed = true;
      return new Response("temporary propagation", { status: 503 });
    }
    return actualFetch(url, options);
  };
  const report = await verify(f, { attempts: 2, sleep: async () => {} });
  assert.equal(report.ok, true);
  assert.equal(report.attempts[0].checks[0].cache, "MISS");
  assert.equal(report.attempts[1].checks[0].cache, "HIT");
  assert.equal(report.attempts[1].checks[0].freshMarkerAttempt, 1);
});

test("critical HTTP failures, wrong canonicals and HTML disguised as JavaScript all fail", async () => {
  for (const settings of [{ badPage: "/tours/" }, { badCanonical: "/ko/" }, { badAsset: true }]) {
    const report = await verify(fixture(settings));
    assert.equal(report.ok, false);
    assert.match(report.attempts[0].error, /http_526|canonical_mismatch|not_javascript/u);
  }
});

test("TLS/network errors remain failures and stop after the configured attempts", async () => {
  let calls = 0;
  const report = await verify({ fetchImpl: async () => { calls += 1; throw new TypeError("certificate expired"); } }, { attempts: 2, sleep: async () => {} });
  assert.equal(report.ok, false);
  assert.equal(calls, 2);
  assert.equal(report.attempts.length, 2);
  assert.match(report.attempts[1].error, /certificate expired/u);
});

test("unsafe origins, unbounded waits and missing scripts are rejected", async () => {
  await assert.rejects(verify(fixture(), { origin: "http://release-fixture.invalid" }), /plain_https_origin/u);
  await assert.rejects(verify(fixture(), { attempts: 7 }), /bounded/u);
  await assert.rejects(verify(fixture(), { timeoutMs: 9000 }), /bounded/u);
  assert.throws(() => inspectReleaseHtml(`<link rel="canonical" href="${origin}/">`, origin + "/"), /missing_javascript/u);
  assert.throws(() => inspectReleaseHtml(`<link rel="canonical" href="${origin}/"><script src="https://external.invalid/a.js"></script>`, origin + "/"), /missing_javascript/u);
});

const resolve = (overrides = {}) => resolvePagesRelease({
  eventName: "workflow_dispatch", workflowRef: "refs/heads/main", workflowSha: commit,
  mainSha: commit, isAncestor: async () => true, hasVerifiedRelease: async () => true,
  ...overrides,
});

test("normal releases use current main and a verified ancestor is an explicit recovery", async () => {
  assert.deepEqual(await resolve(), { commit, mainSha: commit, rollback: false });
  assert.deepEqual(await resolve({ deployRef: olderCommit }), { commit: olderCommit, mainSha: commit, rollback: true });
});

test("recovery rejects arbitrary refs, unknown/nonancestor commits, missing evidence and off-main dispatch", async () => {
  for (const deployRef of ["main", "origin/main", "refs/heads/test", "a123456", "https://external.invalid", "$(command)"]) {
    await assert.rejects(resolve({ deployRef }), /full_commit_sha/u);
  }
  await assert.rejects(resolve({ deployRef: olderCommit, isAncestor: async () => false }), /main_ancestor/u);
  await assert.rejects(resolve({ deployRef: olderCommit, hasVerifiedRelease: async () => false }), /verified_release/u);
  await assert.rejects(resolve({ workflowRef: "refs/heads/test" }), /must_run_on_main/u);
  await assert.rejects(resolve({ eventName: "push", workflowSha: olderCommit }), /superseded/u);
});

test("only an unexpired artifact from a completed successful main Deploy run authorizes recovery", async () => {
  const check = (artifactOverride = {}, runOverride = {}) => hasVerifiedPagesRelease(olderCommit, {
    repository: "fixture/site", token: "fixture-token-never-sent", fetchImpl: async (url) => {
      assert.ok(url.startsWith("https://api.github.com/repos/fixture/site/"));
      const data = url.includes("actions/artifacts") ? { artifacts: [{ name: `verified-release-${olderCommit}`, expired: false, expires_at: "2099-01-01T00:00:00Z", workflow_run: { id: 123 }, ...artifactOverride }] } : {
        path: ".github/workflows/deploy.yml", head_branch: "main", status: "completed", conclusion: "success", ...runOverride,
      };
      return new Response(JSON.stringify(data));
    },
  });
  assert.equal(await check(), true);
  assert.equal(await check({ expired: true }), false);
  assert.equal(await check({ expires_at: "2000-01-01T00:00:00Z" }), false);
  assert.equal(await check({}, { head_branch: "pull-request" }), false);
  assert.equal(await check({}, { conclusion: "failure" }), false);
  assert.equal(await check({}, { path: ".github/workflows/ci.yml" }), false);
});

test("workflow keeps prechecks, restores only validated commits and verifies after both cache purges", async () => {
  const workflow = await readFile(new URL("../../.github/workflows/deploy.yml", import.meta.url), "utf8");
  for (const check of ["npm run test:traffic-ops", "npm run test:inquiry", "npm run test:guide-search", "npx tsc --noEmit", "npm audit --omit=dev", "npm run check:indexable-export"]) assert.ok(workflow.includes(check));
  assert.ok(workflow.indexOf("Mark the exact release being published") < workflow.indexOf("actions/upload-pages-artifact"));
  assert.ok(workflow.indexOf("sleep 60") < workflow.indexOf("run: node tools/verify-live-release.mjs"));
  assert.ok(workflow.indexOf("run: node tools/verify-live-release.mjs") < workflow.indexOf("Tell IndexNow"));
  assert.match(workflow, /ref: \$\{\{ github\.sha \}\}/u, "the verifier comes from the workflow revision, not recovered source");
  assert.match(workflow, /current_main.*\n\s+if \[\[ "\$current_main" != "\$MAIN_SHA_AT_BUILD"/u);
  assert.match(workflow, /verified-release-\$\{\{ needs\.build\.outputs\.deploy_sha \}\}/u);
  assert.match(workflow, /retention-days: 90/u);
});
