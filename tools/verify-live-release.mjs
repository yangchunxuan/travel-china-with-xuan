import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const releasePaths = [
  "/", "/tours/", "/zh/", "/ko/",
  "/services/china-attraction-reservations/",
  "/guides/china-attractions-advance-booking-checklist/",
];

const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/gu)]
    .map((match) => [match[1].toLowerCase(), match[2].replaceAll("&amp;", "&")]),
);

export function inspectReleaseHtml(html, expectedUrl) {
  const canonical = [...html.matchAll(/<link\b[^>]*>/giu)]
    .map(([tag]) => attributes(tag))
    .filter((tag) => tag.rel?.toLowerCase().split(/\s+/u).includes("canonical"));
  if (canonical.length !== 1 || canonical[0].href !== expectedUrl) {
    throw new Error(`canonical_mismatch:${new URL(expectedUrl).pathname}`);
  }
  const origin = new URL(expectedUrl).origin;
  const assets = [...html.matchAll(/<script\b[^>]*>/giu)]
    .map(([tag]) => attributes(tag).src)
    .filter(Boolean)
    .map((src) => new URL(src, expectedUrl))
    .filter((url) => url.origin === origin && /^\/_next\/static\/.*\.js$/u.test(url.pathname));
  if (!assets.length) throw new Error(`missing_javascript:${new URL(expectedUrl).pathname}`);
  // The shared runtime and a page-specific chunk must both remain fetchable.
  return [...new Set([assets[0].href, assets.at(-1).href])];
}

async function download(url, { fetchImpl, timeoutMs, maximumBytes }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      method: "GET", redirect: "error", cache: "no-store", signal: controller.signal,
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    if (response.status !== 200) {
      await response.body?.cancel();
      throw new Error(`http_${response.status}:${new URL(url).pathname}`);
    }
    const reader = response.body?.getReader();
    if (!reader) throw new Error(`empty_response:${new URL(url).pathname}`);
    let size = 0;
    const chunks = [];
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > maximumBytes) {
        await reader.cancel();
        throw new Error(`oversized_response:${new URL(url).pathname}`);
      }
      chunks.push(Buffer.from(part.value));
    }
    return {
      body: Buffer.concat(chunks).toString("utf8"),
      status: response.status,
      cache: response.headers.get("cf-cache-status"),
      type: response.headers.get("content-type") ?? "",
      bytes: size,
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function verifyLiveRelease({
  origin = "https://homegroundchina.com", expectedCommit, expectedRunId,
  expectedRunAttempt, attempts = 6, retryDelayMs = 15_000,
  timeoutMs = 8_000, fetchImpl = fetch,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)), uuid = randomUUID,
}) {
  const base = new URL(origin);
  if (base.protocol !== "https:" || base.pathname !== "/" || base.search || base.hash || base.username || base.password) {
    throw new Error("origin_must_be_plain_https_origin");
  }
  if (!/^[a-f0-9]{40}$/u.test(expectedCommit ?? "")) throw new Error("expected_commit_must_be_full_sha");
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 6 ||
      !Number.isInteger(retryDelayMs) || retryDelayMs < 0 || retryDelayMs > 15_000 ||
      !Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 8_000) {
    throw new Error("verification_wait_must_be_bounded");
  }
  const report = { schemaVersion: 1, commit: expectedCommit, runId: expectedRunId ?? null,
    runAttempt: expectedRunAttempt ?? null, origin: base.origin, ok: false, attempts: [] };
  let freshMarkerAttempt = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const record = { attempt, checkedAt: new Date().toISOString(), checks: [] };
    report.attempts.push(record);
    const request = (route) => {
      const url = new URL(route, base);
      url.searchParams.set("release-check", `${expectedCommit}-${uuid()}`);
      return url.href;
    };
    const get = (url, maximumBytes = 3 * 1024 * 1024) => download(url, { fetchImpl, timeoutMs, maximumBytes });
    try {
      const marker = await get(request("/release.json"), 4096);
      const cachedMarker = /^(HIT|STALE|UPDATING)$/iu.test(marker.cache ?? "");
      if (cachedMarker && freshMarkerAttempt === null) throw new Error("release_marker_served_from_old_cache");
      const release = JSON.parse(marker.body);
      if (release.schemaVersion !== 1 || release.commit !== expectedCommit ||
          (expectedRunId !== undefined && String(release.runId) !== String(expectedRunId)) ||
          (expectedRunAttempt !== undefined && String(release.runAttempt) !== String(expectedRunAttempt))) {
        throw new Error("release_marker_mismatch");
      }
      // A transient page/chunk failure may follow a successful origin marker.
      // Keep that proof across retries; query-insensitive caches can cache our
      // own marker request without making the original fresh proof disappear.
      if (!cachedMarker) freshMarkerAttempt = attempt;
      record.checks.push({ path: "/release.json", status: marker.status, cache: marker.cache,
        commit: release.commit, freshMarkerAttempt });
      const pages = await Promise.all(releasePaths.map(async (route) => {
        const page = await get(request(route));
        if (!/^text\/html\b/iu.test(page.type)) throw new Error(`not_html:${route}`);
        const expectedUrl = new URL(route, base).href;
        const assets = inspectReleaseHtml(page.body, expectedUrl);
        return { path: route, status: page.status, cache: page.cache, canonical: expectedUrl, assets };
      }));
      record.checks.push(...pages.map(({ assets, ...page }) => page));
      const assets = [...new Set(pages.flatMap((page) => page.assets))];
      const scripts = await Promise.all(assets.map(async (url) => {
        const script = await get(request(new URL(url).pathname), 5 * 1024 * 1024);
        if (!/^(?:text|application)\/(?:javascript|x-javascript|ecmascript)\b/iu.test(script.type) ||
            !script.body.trim() || /^\s*</u.test(script.body)) {
          throw new Error(`not_javascript:${new URL(url).pathname}`);
        }
        return { path: new URL(url).pathname, status: script.status, bytes: script.bytes };
      }));
      record.checks.push(...scripts);
      report.ok = true;
      report.verifiedAt = new Date().toISOString();
      return report;
    } catch (error) {
      record.error = error instanceof Error ? error.message.slice(0, 300) : "verification_failed";
      if (attempt < attempts) await sleep(retryDelayMs);
    }
  }
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const output = process.env.LIVE_RELEASE_REPORT ?? "live-release-verification.json";
  let report;
  try {
    report = await verifyLiveRelease({
      expectedCommit: process.env.EXPECTED_DEPLOY_SHA,
      expectedRunId: process.env.GITHUB_RUN_ID,
      expectedRunAttempt: process.env.GITHUB_RUN_ATTEMPT,
    });
  } catch (error) {
    report = { ok: false, error: error instanceof Error ? error.message : "verification_failed" };
  }
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(report.ok ? `Verified live release ${report.commit}` : "Live release verification failed; inspect the verification artifact.");
  if (!report.ok) process.exitCode = 1;
}
