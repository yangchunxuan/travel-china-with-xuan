import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const helper = fileURLToPath(new URL("tools/indexnow_sitemap.py", root));
const key = "a".repeat(32); // Disposable fixture key; never sent to a server.
const origin = "https://homegroundchina.com";
const url = (path) => `${origin}/${path}/`;
const xmlEscape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const sitemap = (entries) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map((entry) => {
  const [loc, lastmod] = Array.isArray(entry) ? entry : [entry];
  return `<url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}</url>`;
}).join("")}</urlset>`;

async function fixture(t, current, baseline, { all = false } = {}) {
  const directory = await mkdtemp(join(tmpdir(), "indexnow-sitemap-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const currentPath = join(directory, "current.xml");
  const baselinePath = join(directory, "baseline.xml");
  await writeFile(currentPath, current);
  if (baseline !== undefined) await writeFile(baselinePath, baseline);
  const result = spawnSync("python3", [helper, "--current", currentPath, "--baseline", baselinePath,
    "--as-of", "2026-10-08", "--key", key, "--submit-all", String(all)], {
    encoding: "utf8", env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" }, timeout: 15_000,
  });
  return {
    ...result,
    payload: result.status === 0 ? JSON.parse(result.stdout) : null,
    summary: result.status === 0 ? JSON.parse(result.stderr.split("IndexNow selection: ")[1]) : null,
  };
}

test("new undated language routes join recent edits exactly once; old undated and deleted routes stay out", async (t) => {
  const car = [url("services/private-car-and-driver"), url("zh/services/private-car-and-driver"), url("ko/services/private-car-and-driver")];
  const existing = url("guides/existing");
  const recent = url("guides/updated");
  const baseline = sitemap([existing, recent, url("removed")]);
  const result = await fixture(t, sitemap([existing, [recent, "2026-10-08"], ...car, car[0], [car[1], "2026-10-07"]]), baseline);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.payload.urlList, [...car, recent]);
  assert.deepEqual(result.summary, { all: false, baseline: "valid", current: 5, new: 3, omitted_at_limit: 0, recent: 2, rejected: 0, selected: 4 });
  assert.equal(result.payload.host, "homegroundchina.com");
  assert.equal(result.payload.keyLocation, `${origin}/${key}.txt`);
});

test("missing, 404 HTML, malformed and empty baselines preserve only recent edits; no implicit full send", async (t) => {
  const recent = url("recent");
  const current = sitemap([url("undated"), [url("old"), "2026-09-01"], [recent, "2026-10-07"]]);
  for (const baseline of [undefined, "<html>404 Not Found</html>", "<urlset><url>", "<urlset/>",
    "<urlset><url><lastmod>2026-10-08</lastmod></url></urlset>",
    '<!DOCTYPE urlset [<!ENTITY route "x">]><urlset/>', sitemap(["https://other.example/a/"])]) {
    const result = await fixture(t, current, baseline);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(result.payload.urlList, [recent]);
    assert.equal(result.summary.baseline, "unavailable");
    assert.equal(result.summary.new, 0);
    assert.equal(result.summary.all, false);
  }
  const empty = await fixture(t, sitemap([url("undated")]), undefined);
  assert.deepEqual(empty.payload.urlList, []);
});

test("explicit full mode selects only the current canonical routes, even with no baseline", async (t) => {
  const result = await fixture(t, sitemap([url("one"), url("one"), url("two")]), undefined, { all: true });
  assert.deepEqual(result.payload.urlList, [url("one"), url("two")]);
  assert.equal(result.summary.all, true);
});

test("foreign hosts, aliases, HTTP, credentials, ports, queries, fragments and noncanonical paths are rejected", async (t) => {
  const rejected = [
    "http://homegroundchina.com/a/", "https://www.homegroundchina.com/a/", "https://HOMEGROUNDCHINA.com/a/",
    "https://homegroundchina.com.evil.example/a/", "https://user@homegroundchina.com/a/",
    "https://homegroundchina.com:443/a/", `${origin}/a/?travelers=4`, `${origin}/a/#contact`,
    `${origin}/a`, `${origin}/a/../b/`, `${origin}//a/`, `${origin}/%61/`, `${origin}/a\\b/`, `${origin}/a b/`,
  ];
  const result = await fixture(t, sitemap([`${origin}/`, url("good"), ...rejected]), undefined, { all: true });
  assert.deepEqual(result.payload.urlList, [`${origin}/`, url("good")]);
  assert.equal(result.summary.rejected, rejected.length);
});

test("recent-lastmod retains the UTC calendar cutoff and excludes invalid or future dates", async (t) => {
  const entries = [
    [url("cutoff"), "2026-10-06"], [url("today"), "2026-10-08T12:00:00.000Z"],
    [url("offset"), "2026-10-07T12:00:00+08:00"], [url("too-old"), "2026-10-05"],
    [url("future"), "2026-10-09"], [url("impossible"), "2026-02-30"],
    [url("junk"), "2026-10-08oops"], [url("bad-time"), "2026-10-08T25:00:00Z"],
    [url("no-zone"), "2026-10-08T12:00:00"],
  ];
  const result = await fixture(t, sitemap(entries), sitemap(entries.map(([loc]) => loc)));
  assert.deepEqual(result.payload.urlList, [url("cutoff"), url("today"), url("offset")]);
  assert.equal(result.summary.new, 0);
});

test("malformed current maps produce no payload, including a partially parseable document", async (t) => {
  for (const current of ["<html>error</html>", `<urlset><url><loc>${url("one")}</loc></url>`,
    '<!DOCTYPE urlset [<!ENTITY route "x">]><urlset/>', "<urlset/>",
    `<urlset><url><loc>${url("one")}</loc><loc>${url("two")}</loc></url></urlset>`]) {
    const result = await fixture(t, current, sitemap([url("old")]));
    assert.equal(result.status, 1);
    assert.equal(result.stdout, "");
    assert.equal(result.payload, null);
  }
});

test("XML namespaces and extension links cannot be confused with sitemap locs", async (t) => {
  const current = `<s:urlset xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:x="http://www.w3.org/1999/xhtml"><s:url><s:loc>${url("good")}</s:loc><x:link href="https://other.example/"/></s:url></s:urlset>`;
  const result = await fixture(t, current, sitemap([url("existing")]));
  assert.deepEqual(result.payload.urlList, [url("good")]);
});

test("the 10000 URL cap is applied after deduplication, with new routes before older recent edits", async (t) => {
  const old = Array.from({ length: 10_001 }, (_, i) => url(`existing-${i}`));
  const result = await fixture(t, sitemap([...old.map((loc) => [loc, "2026-10-08"]), url("new"), url("new")]), sitemap(old));
  assert.equal(result.payload.urlList.length, 10_000);
  assert.equal(new Set(result.payload.urlList).size, 10_000);
  assert.equal(result.payload.urlList[0], url("new"));
  assert.equal(result.summary.omitted_at_limit, 2);
});

const workflowSource = () => readFile(new URL(".github/workflows/deploy.yml", root), "utf8");
function stepScript(workflow, name) {
  const start = workflow.indexOf(`      - name: ${name}\n`);
  assert.notEqual(start, -1, `workflow contains ${name}`);
  const end = workflow.indexOf("\n      - ", start + 1);
  const step = workflow.slice(start, end === -1 ? undefined : end);
  const script = step.match(/        run: \|\n([\s\S]*)$/)?.[1];
  assert.ok(script, `workflow has an executable script for ${name}`);
  return script.split("\n").map((line) => line.replace(/^          /, "")).join("\n");
}

test("workflow transfers validated maps and the helper across jobs with pinned actions and isolated optional files", async () => {
  const workflow = await workflowSource();
  assert.ok(workflow.indexOf("Capture the previous public sitemap") < workflow.indexOf("Build static site"));
  assert.ok(workflow.indexOf("Prepare IndexNow sitemap comparison") > workflow.indexOf("Check priority indexable exports"));
  assert.match(workflow, /cp out\/sitemap\.xml "\$directory\/sitemap\.xml"/);
  assert.match(workflow, /cp tools\/indexnow_sitemap\.py/);
  assert.match(workflow, /upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02/);
  assert.match(workflow, /download-artifact@d3f86a106a0bac45b974a628896c90dbdf5c8093/);
  assert.equal((workflow.match(/name: indexnow-sitemaps/g) ?? []).length, 2);
  assert.match(workflow, /upload-pages-artifact@[a-f0-9]{40}[^\n]*\n        with:\n          path: out/);
  const tell = stepScript(workflow, "Tell IndexNow which pages changed");
  assert.doesNotMatch(tell, /curl[^\n]*sitemap\.xml/);
  assert.match(tell, /--baseline "\$directory\/baseline\.xml"/);
  assert.match(tell, /--submit-all "\$SUBMIT_ALL"/);
  assert.match(tell, /--connect-timeout 10 --max-time 30/);
  assert.doesNotMatch(tell, /--retry|--insecure/);
  const ci = await readFile(new URL(".github/workflows/ci.yml", root), "utf8");
  for (const gates of [workflow, ci]) {
    assert.match(gates, /run: node --test tools\/tests\/indexnow-sitemap\.test\.mjs/);
  }
  for (const name of ["Capture the previous public sitemap", "Prepare IndexNow sitemap comparison",
    "Save IndexNow files for the deployment job", "Download the build's IndexNow files", "Tell IndexNow which pages changed"]) {
    const start = workflow.indexOf(`      - name: ${name}\n`);
    const end = workflow.indexOf("\n      - ", start + 1);
    assert.match(workflow.slice(start, end === -1 ? undefined : end), /continue-on-error: true/);
  }
});

test("the actual baseline GET shell handles unavailable files without retaining a partial or falling back to all URLs", async (t) => {
  const workflow = await workflowSource();
  const script = stepScript(workflow, "Capture the previous public sitemap");
  assert.match(script, /--connect-timeout 10 --max-time 30/);
  assert.match(script, /--proto '=https'/);
  assert.doesNotMatch(script, /--request POST|--insecure|--location|SUBMIT_ALL/);
  for (const status of [0, 22, 28]) {
    const directory = await mkdtemp(join(tmpdir(), "indexnow-baseline-shell-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const response = sitemap([url("old")]);
    // Override curl as a shell function: no network executable can be called.
    const intercepted = `curl() {\n  while [ "$#" -gt 0 ]; do\n    if [ "$1" = "--output" ]; then output="$2"; break; fi\n    shift\n  done\n  printf '%s' "$FIXTURE_RESPONSE" > "$output"\n  return ${status}\n}\n${script}`;
    const result = spawnSync("bash", ["-c", intercepted], { encoding: "utf8", timeout: 5000,
      env: { ...process.env, RUNNER_TEMP: directory, FIXTURE_RESPONSE: response } });
    assert.equal(result.status, 0, result.stderr);
    const baseline = join(directory, "indexnow-sitemaps/baseline.xml");
    if (status === 0) assert.equal(await readFile(baseline, "utf8"), response);
    else await assert.rejects(readFile(baseline), { code: "ENOENT" });
    await assert.rejects(readFile(join(directory, "indexnow-sitemaps/baseline.tmp")), { code: "ENOENT" });
  }
});

test("the actual notification shell uses the transferred helper and skips an empty selection without any request", async (t) => {
  const workflow = await workflowSource();
  const script = stepScript(workflow, "Tell IndexNow which pages changed");
  for (const changed of [false, true]) {
    const directory = await mkdtemp(join(tmpdir(), "indexnow-notify-shell-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const maps = join(directory, "indexnow-sitemaps");
    await mkdir(maps);
    await copyFile(helper, join(maps, "indexnow_sitemap.py"));
    await writeFile(join(maps, "baseline.xml"), sitemap([url("old")]));
    await writeFile(join(maps, "sitemap.xml"), sitemap([url("old"), ...(changed ? [url("new")] : [])]));
    const requestFile = join(directory, "intercepted.json");
    // jq/date/curl are intercepted functions. The fixture records the payload
    // locally and cannot invoke the real network or use production secrets.
    const intercepted = `date() { printf '%s' '2026-10-08'; }\njq() { "${process.execPath}" -e 'const fs=require("fs");console.log(JSON.parse(fs.readFileSync(process.argv[1],"utf8")).urlList.length)' "$2"; }\ncurl() { cp indexnow.json "$FIXTURE_REQUEST"; printf '%s' '200'; }\n${script}`;
    const result = spawnSync("bash", ["-c", intercepted], { cwd: directory, encoding: "utf8", timeout: 5000,
      env: { ...process.env, RUNNER_TEMP: directory, INDEXNOW_KEY: key, SUBMIT_ALL: "false", FIXTURE_REQUEST: requestFile, PYTHONDONTWRITEBYTECODE: "1" } });
    assert.equal(result.status, 0, result.stderr);
    if (changed) assert.deepEqual(JSON.parse(await readFile(requestFile, "utf8")).urlList, [url("new")]);
    else await assert.rejects(readFile(requestFile), { code: "ENOENT" });
  }
});
