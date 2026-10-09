/**
 * Read-only checks; no credentials, inquiries, writes to remote services or retries.
 * node tools/check-site-stability.mjs [--output report.json]
 *   [--timeout-ms 10000] [--latency-warning-ms 5000]
 * Exit 0 = healthy, 1 = critical/configuration failure, 2 = warning.
 * Each request has an absolute deadline; at most four checks run concurrently.
 * TLS always verifies the chain and hostname, even if NODE_TLS_REJECT_UNAUTHORIZED=0.
 * Fixture-only override: SITE_STABILITY_ALLOW_LOCAL_FIXTURES=1 together with
 * SITE_STABILITY_TEST_ORIGIN=https://localhost:<port> (loopback HTTPS only).
 * This redirects ALL checks to the fixture, retaining apex/www SNI for TLS probes.
 * A fixture CA may be supplied to the imported function only in this local mode.
 * JSON deliberately excludes bodies, arbitrary headers, env values and error messages.
 */
import https from "node:https";
import tls from "node:tls";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";

const DAY_MS = 86_400_000;
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const HOSTNAMES = Object.freeze(["homegroundchina.com", "www.homegroundchina.com"]);
export const DEFAULT_CONFIG = Object.freeze({
  origin: "https://homegroundchina.com",
  originAddresses: Object.freeze(["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]),
  timeoutMs: 10_000,
  latencyWarningMs: 5_000,
  pages: Object.freeze([
    { path: "/", language: "en" },
    { path: "/zh/", language: "zh-Hans" },
    { path: "/ko/", language: "ko" },
    { path: "/tours/", language: "en", titlePattern: /China.*Tours?/iu },
    { path: "/services/china-attraction-reservations/", language: "en", titlePattern: /Forbidden City|Museum Tickets|Attraction/iu },
  ]),
});

const NETWORK_CODES = new Set([
  "CERT_HAS_EXPIRED", "CERT_NOT_YET_VALID", "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN", "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY", "ERR_TLS_CERT_ALTNAME_INVALID",
  "ERR_TLS_CERT_SIGNATURE_ALGORITHM_UNSUPPORTED", "ERR_TLS_CERT_CHAIN_TOO_LONG",
  "ECONNRESET", "ECONNREFUSED", "ENOTFOUND", "EAI_AGAIN", "ETIMEDOUT",
  "BODY_TOO_LARGE", "ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR",
]);
function codedError(code) { return Object.assign(new Error(code), { code }); }
function safeCode(error) { return NETWORK_CODES.has(error?.code) ? error.code : "NETWORK_ERROR"; }
function result(status, details) {
  return { ok: status === "healthy", status, severity: status === "healthy" ? "info" : status, details };
}
function positiveInteger(value, fallback, maximum = 60_000) {
  const n = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(n) || n < 1 || n > maximum) throw codedError("INVALID_CONFIGURATION");
  return n;
}

export function readConfiguration(env = process.env) {
  const override = env.SITE_STABILITY_TEST_ORIGIN;
  if (override && env.SITE_STABILITY_ALLOW_LOCAL_FIXTURES !== "1") throw codedError("FIXTURE_OPT_IN_REQUIRED");
  if (!override) return { origin: DEFAULT_CONFIG.origin, fixture: false };
  let url;
  try { url = new URL(override); } catch { throw codedError("INVALID_FIXTURE_ORIGIN"); }
  const hostname = url.hostname.replace(/^\[|\]$/gu, "");
  if (url.protocol !== "https:" || !["localhost", "127.0.0.1", "::1"].includes(hostname)
      || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw codedError("INVALID_FIXTURE_ORIGIN");
  }
  return { origin: url.origin, fixture: true, fixtureHost: hostname, fixturePort: Number(url.port || 443) };
}

/** Date/SAN evaluation follows a successful strict TLS handshake; authorization is required. */
export function evaluateCertificate(cert, { hostname, authorized = false, now = Date.now() } = {}) {
  if (!authorized) return result("critical", { code: "TLS_CHAIN_UNTRUSTED", chainVerified: false });
  if (!cert || !hostname || tls.checkServerIdentity(hostname, cert)) {
    return result("critical", { code: "TLS_HOSTNAME_MISMATCH", chainVerified: true, hostnameVerified: false });
  }
  const starts = Date.parse(cert.valid_from);
  const ends = Date.parse(cert.valid_to);
  const timestamp = Number(new Date(now));
  if (![starts, ends, timestamp].every(Number.isFinite) || ends <= starts) {
    return result("critical", { code: "TLS_CERTIFICATE_DATES_INVALID", chainVerified: true, hostnameVerified: true });
  }
  const daysRemaining = (ends - timestamp) / DAY_MS;
  const details = {
    code: "TLS_VALID", chainVerified: true, hostnameVerified: true,
    notBefore: new Date(starts).toISOString(), notAfter: new Date(ends).toISOString(),
    daysRemaining: Math.round(daysRemaining * 1000) / 1000,
    fingerprint256: /^[\dA-Fa-f:]{95}$/u.test(cert.fingerprint256 || "") ? cert.fingerprint256 : null,
  };
  if (timestamp < starts) return result("critical", { ...details, code: "TLS_CERTIFICATE_NOT_YET_VALID" });
  if (timestamp >= ends) return result("critical", { ...details, code: "TLS_CERTIFICATE_EXPIRED" });
  const threshold = [7, 14, 30].find((days) => daysRemaining <= days);
  return threshold === undefined ? result("healthy", details)
    : result("warning", { ...details, code: "TLS_CERTIFICATE_EXPIRING", warningThresholdDays: threshold });
}

export function probeTls({ host, port = 443, servername, timeoutMs, ca }) {
  return new Promise((resolveProbe, reject) => {
    const started = performance.now();
    let settled = false;
    const socket = tls.connect({ host, port, servername, rejectUnauthorized: true, checkServerIdentity: tls.checkServerIdentity, ...(ca ? { ca } : {}) });
    const timer = setTimeout(() => finish(codedError("ETIMEDOUT")), timeoutMs);
    function finish(error, value) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      if (error) reject(error); else resolveProbe(value);
    }
    socket.once("error", (error) => finish(error));
    socket.once("secureConnect", () => finish(null, {
      certificate: socket.getPeerCertificate(true), authorized: socket.authorized,
      latencyMs: Math.round(performance.now() - started),
    }));
    socket.once("close", () => { if (!settled) finish(codedError("ECONNRESET")); });
  });
}

export function requestPage({ url, timeoutMs, ca }) {
  return new Promise((resolveRequest, reject) => {
    const started = performance.now();
    let settled = false;
    const request = https.request(url, {
      method: "GET", agent: false, rejectUnauthorized: true, checkServerIdentity: tls.checkServerIdentity,
      ...(ca ? { ca } : {}),
      headers: { "User-Agent": "Homeground-Site-Stability/1.0", Accept: "text/html", "Cache-Control": "no-cache" },
    });
    const timer = setTimeout(() => finish(codedError("ETIMEDOUT")), timeoutMs);
    function finish(error, value) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      request.destroy();
      if (error) reject(error); else resolveRequest(value);
    }
    request.once("error", (error) => finish(error));
    request.once("response", (response) => {
      const chunks = [];
      let bytes = 0;
      response.once("error", (error) => finish(error));
      response.once("aborted", () => finish(codedError("ECONNRESET")));
      response.on("data", (chunk) => {
        bytes += chunk.length;
        if (bytes > MAX_BODY_BYTES) { finish(codedError("BODY_TOO_LARGE")); response.destroy(); }
        else chunks.push(chunk);
      });
      response.once("end", () => finish(null, {
        statusCode: response.statusCode, body: Buffer.concat(chunks).toString("utf8"),
        contentType: response.headers["content-type"], cacheStatus: response.headers["cf-cache-status"],
        latencyMs: Math.round(performance.now() - started), bytes,
      }));
    });
    request.end();
  });
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "iu"));
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}
export function evaluatePage(response, page, { origin, latencyWarningMs }) {
  const { statusCode, latencyMs, body = "", contentType = "", cacheStatus } = response;
  const details = { code: "HTTP_CONTENT_VALID", statusCode: Number(statusCode) || 0, latencyMs: Number.isFinite(latencyMs) ? latencyMs : null };
  if (statusCode !== 200) return result("critical", { ...details, code: "HTTP_STATUS_UNHEALTHY" });
  if (!/^text\/html(?:\s*;|$)/iu.test(contentType)) return result("critical", { ...details, code: "HTTP_CONTENT_TYPE_MISMATCH" });
  const expectedCanonical = new URL(page.path, origin).href;
  const htmlTag = body.match(/<html\b[^>]*>/iu)?.[0] || "";
  const canonicalTags = [...body.matchAll(/<link\b[^>]*>/giu)].map((m) => m[0])
    .filter((tag) => attribute(tag, "rel")?.toLowerCase().split(/\s+/u).includes("canonical"));
  const title = body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/iu)?.[1] || "";
  // Existing resolvePageTitle intentionally drops the brand suffix on long SEO titles.
  const brandedSiteName = [...body.matchAll(/<meta\b[^>]*>/giu)].some(([tag]) =>
    attribute(tag, "property") === "og:site_name" && attribute(tag, "content") === "Homeground China");
  const missing = [];
  if (attribute(htmlTag, "lang") !== page.language) missing.push("html_language");
  if (!/Homeground(?:\s|&nbsp;)+China/iu.test(title) && !brandedSiteName) missing.push("brand_identity");
  if (canonicalTags.length !== 1 || attribute(canonicalTags[0], "href") !== expectedCanonical) missing.push("canonical");
  if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/iu.test(body)) missing.push("main_heading");
  if (page.titlePattern && !page.titlePattern.test(title)) missing.push("page_topic");
  if (missing.length) return result("critical", { ...details, code: "HTTP_CONTENT_MISMATCH", missing });
  if (!Number.isFinite(latencyMs) || latencyMs < 0) return result("critical", { ...details, code: "HTTP_LATENCY_UNAVAILABLE" });
  if (cacheStatus === "STALE") return result("warning", { ...details, code: "HTTP_STALE_CACHE", cacheStatus: "STALE" });
  if (latencyMs > latencyWarningMs) return result("warning", { ...details, code: "HTTP_SLOW", latencyWarningMs });
  return result("healthy", details);
}

function deadline(task, timeoutMs) {
  let timer;
  return Promise.race([Promise.resolve().then(task), new Promise((_, reject) => {
    timer = setTimeout(() => reject(codedError("ETIMEDOUT")), timeoutMs);
  })]).finally(() => clearTimeout(timer));
}
async function boundedMap(items, task) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(4, items.length) }, async () => {
    for (;;) { const index = next++; if (index >= items.length) return; results[index] = await task(items[index]); }
  }));
  return results;
}

export async function checkSiteStability(options = {}) {
  const configuration = readConfiguration(options.env);
  if (options.fixtureCA && !configuration.fixture) throw codedError("FIXTURE_OPT_IN_REQUIRED");
  const timeoutMs = positiveInteger(options.timeoutMs, DEFAULT_CONFIG.timeoutMs);
  const latencyWarningMs = positiveInteger(options.latencyWarningMs, DEFAULT_CONFIG.latencyWarningMs);
  const now = options.now ?? Date.now();
  const dependencies = { tlsProbe: probeTls, requestPage, ...options.dependencies };
  const targets = [
    ...HOSTNAMES.map((hostname) => ({ id: `edge:${hostname}`, kind: "edge_tls", target: hostname, host: hostname, servername: hostname })),
    ...DEFAULT_CONFIG.originAddresses.flatMap((ip) => HOSTNAMES.map((hostname) => ({
      id: `origin:${ip}:${hostname}`, kind: "origin_tls", target: `${ip}/${hostname}`, host: ip, servername: hostname,
    }))),
    ...DEFAULT_CONFIG.pages.map((page) => ({ id: `page:${page.path}`, kind: "page", target: page.path, page })),
  ];
  const checks = await boundedMap(targets, async (target) => {
    const base = { id: target.id, kind: target.kind, target: target.target };
    try {
      if (target.kind === "page") {
        const response = await deadline(() => dependencies.requestPage({
          url: new URL(target.page.path, configuration.origin).href, timeoutMs, ca: options.fixtureCA,
        }), timeoutMs);
        return { ...base, ...evaluatePage(response, target.page, { origin: configuration.origin, latencyWarningMs }) };
      }
      const peer = await deadline(() => dependencies.tlsProbe({
        host: configuration.fixture ? configuration.fixtureHost : target.host,
        port: configuration.fixture ? configuration.fixturePort : 443,
        servername: target.servername, timeoutMs, ca: options.fixtureCA,
      }), timeoutMs);
      return { ...base, ...evaluateCertificate(peer.certificate, { hostname: target.servername, authorized: peer.authorized, now }) };
    } catch (error) { return { ...base, ...result("critical", { code: safeCode(error) }) }; }
  });
  const summary = { total: checks.length, healthy: 0, warning: 0, critical: 0 };
  for (const check of checks) summary[check.status]++;
  const status = summary.critical ? "critical" : summary.warning ? "warning" : "healthy";
  return { ...result(status, { readOnly: true, fixture: configuration.fixture }), checkedAt: new Date(now).toISOString(), summary, checks };
}

export function exitCodeForReport(report) { return report.status === "healthy" ? 0 : report.status === "warning" ? 2 : 1; }
export async function runCli(argv = process.argv.slice(2), dependencies = {}) {
  const options = { env: dependencies.env ?? process.env };
  let output;
  let report;
  try {
    for (let i = 0; i < argv.length; i++) {
      if (argv[i] === "--help") {
        (dependencies.stdout ?? ((text) => process.stdout.write(text)))("Usage: node tools/check-site-stability.mjs [--output path] [--timeout-ms 10000] [--latency-warning-ms 5000]\nExit codes: 0 healthy; 1 critical; 2 warning. Read-only, verified TLS; local fixtures require explicit opt-in.\n");
        return 0;
      }
      if (!["--output", "--timeout-ms", "--latency-warning-ms"].includes(argv[i]) || !argv[i + 1] || argv[i + 1].startsWith("--")) throw codedError("INVALID_ARGUMENTS");
      const key = argv[i++];
      if (key === "--output") output = argv[i];
      else options[key === "--timeout-ms" ? "timeoutMs" : "latencyWarningMs"] = positiveInteger(argv[i]);
    }
    report = await (dependencies.check ?? checkSiteStability)(options);
  } catch {
    report = { ...result("critical", { code: "CONFIGURATION_ERROR" }), checkedAt: new Date().toISOString(), summary: { total: 0, healthy: 0, warning: 0, critical: 1 }, checks: [] };
  }
  const json = `${JSON.stringify(report, null, 2)}\n`;
  try {
    if (output) {
      await mkdir(dirname(resolve(output)), { recursive: true });
      await (dependencies.writeFile ?? writeFile)(output, json, { mode: 0o600 });
    } else (dependencies.stdout ?? ((text) => process.stdout.write(text)))(json);
  } catch {
    (dependencies.stdout ?? ((text) => process.stdout.write(text)))(`${JSON.stringify({ ...result("critical", { code: "OUTPUT_WRITE_FAILED" }), checkedAt: report.checkedAt, summary: report.summary, checks: [] })}\n`);
    return 1;
  }
  return exitCodeForReport(report);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.exitCode = await runCli();
