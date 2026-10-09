import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import https from "node:https";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  DEFAULT_CONFIG, checkSiteStability, evaluateCertificate, evaluatePage,
  exitCodeForReport, probeTls, readConfiguration, requestPage, runCli,
} from "../../tools/check-site-stability.mjs";

const NOW = Date.parse("2026-10-09T12:00:00Z");
const DAY = 86_400_000;
const SECRET = "fixture-only-secret-do-not-output";
function certificate(days = 90) {
  return {
    valid_from: new Date(NOW - 100 * DAY).toUTCString(), valid_to: new Date(NOW + days * DAY).toUTCString(),
    subject: { CN: "homegroundchina.com" },
    subjectaltname: "DNS:homegroundchina.com, DNS:www.homegroundchina.com",
    fingerprint256: Array(32).fill("A1").join(":"), privateKey: SECRET,
  };
}
function html(url) {
  const { pathname } = new URL(url);
  const language = pathname === "/zh/" ? "zh-Hans" : pathname === "/ko/" ? "ko" : "en";
  const title = pathname === "/tours/" ? "Private China Tours" : pathname.includes("reservations") ? "Book China Museum Tickets" : "Travel in China";
  return `<html lang="${language}"><head><title>${title} — Homeground China</title><link href="${url}" rel="canonical"></head><body><h1>${title}</h1></body></html>`;
}
function pageResponse(url, extra = {}) {
  return { statusCode: 200, body: html(url), contentType: "text/html; charset=utf-8", latencyMs: 25, ...extra };
}
function injectedOptions(extra = {}) {
  return {
    env: {}, now: NOW,
    dependencies: {
      tlsProbe: async () => ({ certificate: certificate(), authorized: true, latencyMs: 5 }),
      requestPage: async ({ url }) => pageResponse(url),
      ...extra,
    },
  };
}

test("the production matrix checks both TLS legs and all five actual routes without submitting data", async () => {
  const tlsCalls = [], pageCalls = [];
  const report = await checkSiteStability(injectedOptions({
    tlsProbe: async (options) => { tlsCalls.push(options); return { certificate: certificate(), authorized: true }; },
    requestPage: async (options) => { pageCalls.push(options); return pageResponse(options.url); },
  }));
  assert.equal(report.status, "healthy");
  assert.equal(report.ok, true);
  assert.equal(JSON.stringify(report).includes(SECRET), false, "peer-certificate extras must not enter reports");
  assert.deepEqual(report.summary, { total: 15, healthy: 15, warning: 0, critical: 0 });
  assert.equal(tlsCalls.length, 10);
  for (const ip of DEFAULT_CONFIG.originAddresses) {
    assert.deepEqual(tlsCalls.filter((call) => call.host === ip).map((call) => call.servername), ["homegroundchina.com", "www.homegroundchina.com"]);
  }
  assert.deepEqual(pageCalls.map((call) => new URL(call.url).pathname), ["/", "/zh/", "/ko/", "/tours/", "/services/china-attraction-reservations/"]);
  assert.equal(tlsCalls.every((call) => call.timeoutMs === 10_000 && !call.ca), true);
});

test("expiry warnings cover exact 30/14/7-day boundaries; expiration and future dates are critical", () => {
  for (const [days, status, threshold] of [[31, "healthy"], [30, "warning", 30], [14, "warning", 14], [7, "warning", 7], [0.1, "warning", 7], [0, "critical"], [-1, "critical"]]) {
    const check = evaluateCertificate(certificate(days), { hostname: "homegroundchina.com", authorized: true, now: NOW });
    assert.equal(check.status, status, `${days} days`);
    assert.equal(check.details.warningThresholdDays, threshold);
    if (days <= 0) assert.equal(check.details.code, "TLS_CERTIFICATE_EXPIRED");
  }
  const future = { ...certificate(), valid_from: new Date(NOW + DAY).toUTCString() };
  assert.equal(evaluateCertificate(future, { hostname: "homegroundchina.com", authorized: true, now: NOW }).details.code, "TLS_CERTIFICATE_NOT_YET_VALID");
  assert.equal(evaluateCertificate({ ...certificate(), valid_to: "invalid" }, { hostname: "homegroundchina.com", authorized: true, now: NOW }).status, "critical");
});

test("SAN mismatch and an unauthorized chain cannot produce a healthy certificate check", () => {
  assert.equal(evaluateCertificate(certificate(), { hostname: "wrong.example", authorized: true, now: NOW }).details.code, "TLS_HOSTNAME_MISMATCH");
  assert.equal(evaluateCertificate(certificate(), { hostname: "homegroundchina.com", authorized: false, now: NOW }).details.code, "TLS_CHAIN_UNTRUSTED");
});

test("TLS failure codes, never-returning probes and unknown secret-bearing errors remain structured", async () => {
  for (const code of ["CERT_HAS_EXPIRED", "DEPTH_ZERO_SELF_SIGNED_CERT", "ERR_TLS_CERT_ALTNAME_INVALID", "ECONNREFUSED"]) {
    const report = await checkSiteStability(injectedOptions({ tlsProbe: async () => { throw Object.assign(new Error(SECRET), { code }); } }));
    assert.equal(report.status, "critical");
    assert.equal(report.checks[0].details.code, code);
    assert.equal(JSON.stringify(report).includes(SECRET), false);
  }
  const timeout = await checkSiteStability({ ...injectedOptions({ tlsProbe: () => new Promise(() => {}) }), timeoutMs: 10 });
  assert.equal(timeout.checks[0].details.code, "ETIMEDOUT");
  const unknown = await checkSiteStability(injectedOptions({ tlsProbe: async () => { throw Object.assign(new Error(SECRET), { code: SECRET }); } }));
  assert.equal(unknown.checks[0].details.code, "NETWORK_ERROR");
});

test("HTTP 526, wrong language/topic/canonical, redirects and non-HTML are unhealthy even if a body looks branded", async () => {
  const page = DEFAULT_CONFIG.pages[0], origin = DEFAULT_CONFIG.origin;
  const valid = pageResponse(`${origin}/`);
  for (const statusCode of [301, 404, 500, 526]) {
    assert.equal(evaluatePage({ ...valid, statusCode }, page, { origin, latencyWarningMs: 5000 }).details.code, "HTTP_STATUS_UNHEALTHY");
  }
  const broken = valid.body.replace('lang="en"', 'lang="ko"').replace(`${origin}/`, `${origin}/wrong/`);
  const mismatch = evaluatePage({ ...valid, body: broken }, page, { origin, latencyWarningMs: 5000 });
  assert.deepEqual(mismatch.details.missing, ["html_language", "canonical"]);
  assert.equal(evaluatePage({ ...valid, contentType: "application/json" }, page, { origin, latencyWarningMs: 5000 }).details.code, "HTTP_CONTENT_TYPE_MISMATCH");
  const tours = DEFAULT_CONFIG.pages[3];
  assert.equal(evaluatePage(pageResponse(`${origin}/tours/`, { body: html(`${origin}/tours/`).replace("Private China Tours", "Unrelated page") }), tours, { origin, latencyWarningMs: 5000 }).details.code, "HTTP_CONTENT_MISMATCH");
  const report = await checkSiteStability(injectedOptions({ requestPage: async ({ url }) => pageResponse(url, { statusCode: 526, body: SECRET }) }));
  assert.equal(report.status, "critical");
  assert.equal(report.summary.critical, 5);
  assert.equal(JSON.stringify(report).includes(SECRET), false);
});

test("latency and stale cached pages yield warnings; an HTTP timeout remains critical", async () => {
  for (const extra of [{ latencyMs: 5001 }, { cacheStatus: "STALE" }]) {
    const report = await checkSiteStability(injectedOptions({ requestPage: async ({ url }) => pageResponse(url, extra) }));
    assert.equal(report.status, "warning");
    assert.equal(report.ok, false);
    assert.equal(exitCodeForReport(report), 2);
  }
  const report = await checkSiteStability({ ...injectedOptions({ requestPage: () => new Promise(() => {}) }), timeoutMs: 10 });
  assert.equal(report.status, "critical");
  assert.equal(report.checks.at(-1).details.code, "ETIMEDOUT");
});

test("long published SEO titles may omit the brand suffix while retaining the verified social site name", () => {
  const page = DEFAULT_CONFIG.pages[4], origin = DEFAULT_CONFIG.origin;
  const url = `${origin}${page.path}`;
  const body = html(url).replace(" — Homeground China", "")
    .replace("</head>", '<meta property="og:site_name" content="Homeground China"/></head>');
  assert.equal(evaluatePage(pageResponse(url, { body }), page, { origin, latencyWarningMs: 5000 }).status, "healthy");
  const wrong = body.replace('content="Homeground China"', 'content="Wrong site"');
  assert.deepEqual(evaluatePage(pageResponse(url, { body: wrong }), page, { origin, latencyWarningMs: 5000 }).details.missing, ["brand_identity"]);
});

test("local override requires explicit opt-in and cannot send fixtures to a remote or credential-bearing origin", async () => {
  assert.throws(() => readConfiguration({ SITE_STABILITY_TEST_ORIGIN: "https://localhost:1234" }), /FIXTURE_OPT_IN_REQUIRED/u);
  for (const value of ["http://localhost:1234", "https://evil.example", `https://${SECRET}:password@localhost:1234`, "https://localhost:1234/path", "https://localhost:1234?token=secret"]) {
    assert.throws(() => readConfiguration({ SITE_STABILITY_ALLOW_LOCAL_FIXTURES: "1", SITE_STABILITY_TEST_ORIGIN: value }), /INVALID_FIXTURE_ORIGIN/u);
  }
  await assert.rejects(checkSiteStability({ ...injectedOptions(), fixtureCA: SECRET }), /FIXTURE_OPT_IN_REQUIRED/u);
  const calls = [];
  const report = await checkSiteStability({
    ...injectedOptions({
      tlsProbe: async (options) => { calls.push(options); return { certificate: certificate(), authorized: true }; },
      requestPage: async ({ url }) => { assert.equal(new URL(url).hostname, "localhost"); return pageResponse(url); },
    }),
    env: { SITE_STABILITY_ALLOW_LOCAL_FIXTURES: "1", SITE_STABILITY_TEST_ORIGIN: "https://localhost:1234" },
  });
  assert.equal(report.status, "healthy");
  assert.equal(calls.length, 10);
  assert.equal(calls.every((call) => call.host === "localhost" && call.port === 1234), true);
});

async function localTlsFixture(t) {
  const dir = await mkdtemp(join(tmpdir(), "site-stability-tls-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const openssl = (...args) => execFileSync("openssl", args, { cwd: dir, stdio: "pipe" });
  openssl("req", "-x509", "-newkey", "rsa:2048", "-nodes", "-keyout", "ca.key", "-out", "ca.crt", "-days", "365", "-subj", "/CN=local stability fixture CA");
  openssl("req", "-newkey", "rsa:2048", "-nodes", "-keyout", "server.key", "-out", "server.csr", "-subj", "/CN=homegroundchina.com");
  await writeFile(join(dir, "extensions.cnf"), "subjectAltName=DNS:homegroundchina.com,DNS:www.homegroundchina.com,DNS:localhost,IP:127.0.0.1\nextendedKeyUsage=serverAuth\n");
  openssl("x509", "-req", "-in", "server.csr", "-CA", "ca.crt", "-CAkey", "ca.key", "-CAcreateserial", "-out", "valid.crt", "-days", "90", "-extfile", "extensions.cnf");
  await writeFile(join(dir, "index.txt"), "");
  await writeFile(join(dir, "serial"), "1000\n");
  await writeFile(join(dir, "ca.cnf"), "[ca]\ndefault_ca=local\n[local]\ndatabase=index.txt\nserial=serial\nnew_certs_dir=.\ncertificate=ca.crt\nprivate_key=ca.key\ndefault_md=sha256\npolicy=policy\n[policy]\ncommonName=supplied\n[server_extensions]\nsubjectAltName=DNS:homegroundchina.com,DNS:www.homegroundchina.com,DNS:localhost,IP:127.0.0.1\nextendedKeyUsage=serverAuth\n");
  openssl("ca", "-batch", "-notext", "-config", "ca.cnf", "-in", "server.csr", "-out", "expired.crt", "-startdate", "20200101000000Z", "-enddate", "20200102000000Z", "-extensions", "server_extensions");
  const key = await readFile(join(dir, "server.key"));
  const ca = await readFile(join(dir, "ca.crt"));
  async function start(certName, handler = (req, res) => { res.writeHead(200, { "content-type": "text/html" }); res.end(html(`https://127.0.0.1:${req.socket.localPort}${req.url}`)); }) {
    const cert = await readFile(join(dir, certName));
    const server = https.createServer({ key, cert }, handler);
    server.on("tlsClientError", () => {});
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    t.after(() => new Promise((resolve) => server.close(resolve)));
    return { server, host: "127.0.0.1", port: server.address().port, ca };
  }
  return { start, ca };
}

test("real local TLS rejects an untrusted or expired chain, with hostname validation kept on", async (t) => {
  const fixture = await localTlsFixture(t);
  const valid = await fixture.start("valid.crt");
  const options = { host: valid.host, port: valid.port, servername: "homegroundchina.com", timeoutMs: 1000 };
  await assert.rejects(probeTls(options), (error) => ["UNABLE_TO_VERIFY_LEAF_SIGNATURE", "UNABLE_TO_GET_ISSUER_CERT_LOCALLY"].includes(error.code));
  assert.equal((await probeTls({ ...options, ca: fixture.ca })).authorized, true);
  await assert.rejects(probeTls({ ...options, servername: "wrong.example", ca: fixture.ca }), { code: "ERR_TLS_CERT_ALTNAME_INVALID" });
  const expired = await fixture.start("expired.crt");
  await assert.rejects(probeTls({ ...options, port: expired.port, ca: fixture.ca }), { code: "CERT_HAS_EXPIRED" });
  const report = await checkSiteStability({
    env: { SITE_STABILITY_ALLOW_LOCAL_FIXTURES: "1", SITE_STABILITY_TEST_ORIGIN: `https://127.0.0.1:${expired.port}` }, fixtureCA: fixture.ca,
  });
  assert.equal(report.status, "critical");
  assert.equal(report.checks.every((check) => check.details.code === "CERT_HAS_EXPIRED"), true);
  assert.equal(JSON.stringify(report).includes("PRIVATE KEY"), false);
});

test("native HTTP checks enforce absolute time and body limits; full local fixture matrix stays read-only", async (t) => {
  const fixture = await localTlsFixture(t);
  const valid = await fixture.start("valid.crt");
  const report = await checkSiteStability({
    env: { SITE_STABILITY_ALLOW_LOCAL_FIXTURES: "1", SITE_STABILITY_TEST_ORIGIN: `https://127.0.0.1:${valid.port}` }, fixtureCA: fixture.ca,
  });
  assert.equal(report.status, "healthy");
  const slow = await fixture.start("valid.crt", (_, response) => { setTimeout(() => response.end("slow"), 50); });
  await assert.rejects(requestPage({ url: `https://127.0.0.1:${slow.port}/`, ca: fixture.ca, timeoutMs: 10 }), { code: "ETIMEDOUT" });
  const oversized = await fixture.start("valid.crt", (_, response) => { response.end("x".repeat(3 * 1024 * 1024)); });
  await assert.rejects(requestPage({ url: `https://127.0.0.1:${oversized.port}/`, ca: fixture.ca, timeoutMs: 1000 }), { code: "BODY_TOO_LARGE" });
});

test("CLI JSON, output file and exit codes distinguish healthy/warning/critical without leaking secrets", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "site-stability-json-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  for (const [status, expectedCode] of [["healthy", 0], ["warning", 2], ["critical", 1]]) {
    let stdout = "";
    const code = await runCli([], { env: {}, stdout: (text) => { stdout += text; }, check: async () => ({ status, ok: status === "healthy", checks: [] }) });
    assert.equal(code, expectedCode);
    assert.equal(JSON.parse(stdout).status, status);
  }
  const path = join(dir, "nested", "report.json");
  assert.equal(await runCli(["--output", path], { env: {}, check: () => checkSiteStability(injectedOptions()) }), 0);
  assert.equal(JSON.parse(await readFile(path, "utf8")).summary.total, 15);
  let output = "";
  assert.equal(await runCli(["--unknown", SECRET], { stdout: (value) => { output += value; }, env: { TOKEN: SECRET } }), 1);
  assert.equal(JSON.parse(output).details.code, "CONFIGURATION_ERROR");
  assert.equal(output.includes(SECRET), false);
  let failure = "";
  await runCli(["--output", path], { check: () => checkSiteStability(injectedOptions()), writeFile: async () => { throw new Error(SECRET); }, stdout: (value) => { failure += value; } });
  assert.equal(JSON.parse(failure).details.code, "OUTPUT_WRITE_FAILED");
  assert.equal(failure.includes(SECRET), false);
});
