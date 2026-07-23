import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  adminInviteExpiryOutcome,
  adminInviteSessionLimitMs,
  captureAdminInviteFragment,
  classifyAdminInviteContinuation,
  parseAdminInviteFragment,
  validateAdminInvitePassword,
} from "../../lib/adminInvite.ts";

test("Admin setup accepts exact invite or recovery fragments and rejects ambiguity", () => {
  const accessToken = `${"a".repeat(40)}.${"b".repeat(80)}.${"c".repeat(40)}`;
  const refreshToken = "r".repeat(48);
  const fragment =
    `#access_token=${accessToken}&expires_at=1784567890&expires_in=3600` +
    `&refresh_token=${refreshToken}&token_type=bearer&type=invite`;
  assert.deepEqual(
    parseAdminInviteFragment(fragment),
    { accessToken, refreshToken },
  );
  assert.deepEqual(
    parseAdminInviteFragment(`${fragment}&sb`),
    { accessToken, refreshToken },
  );
  assert.equal(parseAdminInviteFragment(`${fragment}&sb=unexpected`), null);
  assert.equal(parseAdminInviteFragment(`${fragment}&sb&sb`), null);
  assert.deepEqual(
    parseAdminInviteFragment(fragment.replace("type=invite", "type=recovery")),
    { accessToken, refreshToken },
  );
  assert.equal(
    parseAdminInviteFragment(fragment.replace("type=invite", "type=signup")),
    null,
  );
  assert.equal(
    parseAdminInviteFragment(
      `${fragment}&refresh_token=${"s".repeat(48)}`,
    ),
    null,
  );
  assert.equal(
    parseAdminInviteFragment(`${fragment}&type=recovery`),
    null,
  );
  assert.equal(
    parseAdminInviteFragment(fragment.replace(`&refresh_token=${refreshToken}`, "")),
    null,
  );
  assert.equal(
    parseAdminInviteFragment(`${fragment}&provider_token=not-allowed`),
    null,
  );
  assert.equal(parseAdminInviteFragment(""), null);
});

test("Admin invite capture scrubs before validation and fixes an absolute deadline", () => {
  const accessToken = `${"a".repeat(40)}.${"b".repeat(80)}.${"c".repeat(40)}`;
  const refreshToken = "r".repeat(48);
  const fragment =
    `#access_token=${accessToken}&refresh_token=${refreshToken}` +
    `&token_type=bearer&type=invite`;
  const events = [];
  const captured = captureAdminInviteFragment(
    fragment,
    () => events.push("scrubbed"),
    10_000,
  );
  assert.deepEqual(events, ["scrubbed"]);
  assert.equal(captured.kind, "valid");
  assert.equal(captured.localDeadlineMs, 10_000 + adminInviteSessionLimitMs);

  const recoveryEvents = [];
  const recoveryCapture = captureAdminInviteFragment(
    fragment.replace("type=invite", "type=recovery"),
    () => recoveryEvents.push("scrubbed"),
    20_000,
  );
  assert.deepEqual(recoveryEvents, ["scrubbed"]);
  assert.equal(recoveryCapture.kind, "valid");
  assert.equal(
    recoveryCapture.localDeadlineMs,
    20_000 + adminInviteSessionLimitMs,
  );

  let invalidScrubbed = false;
  assert.deepEqual(
    captureAdminInviteFragment("#type=signup", () => {
      invalidScrubbed = true;
    }),
    { kind: "invalid" },
  );
  assert.equal(invalidScrubbed, true);
  assert.deepEqual(
    captureAdminInviteFragment(fragment, () => {
      throw new Error("history unavailable");
    }),
    { kind: "unavailable" },
  );
  assert.deepEqual(captureAdminInviteFragment("", () => assert.fail()), {
    kind: "missing",
  });
});

test("Admin invite password rules allow passphrases and reject risky input", () => {
  assert.equal(
    validateAdminInvitePassword(
      "correct horse battery staple",
      "correct horse battery staple",
    ),
    null,
  );
  assert.match(
    validateAdminInvitePassword("too-short", "too-short"),
    /14/,
  );
  assert.match(
    validateAdminInvitePassword(
      " leading or trailing space ",
      " leading or trailing space ",
    ),
    /空格/,
  );
  assert.match(
    validateAdminInvitePassword(
      `safe-length-value\u202etext`,
      `safe-length-value\u202etext`,
    ),
    /方向控制字符/,
  );
  assert.match(
    validateAdminInvitePassword(
      "one-long-password-value",
      "another-long-password-value",
    ),
    /不一致/,
  );
});

test("Admin invite continuations fail closed at the absolute deadline", () => {
  const client = {};
  assert.equal(
    classifyAdminInviteContinuation(client, client, 4, 4, 20_000, 19_999),
    "current",
  );
  assert.equal(
    classifyAdminInviteContinuation(client, client, 4, 4, 20_000, 20_000),
    "expired",
  );
  assert.equal(
    classifyAdminInviteContinuation({}, client, 4, 4, 20_000, 19_999),
    "superseded",
  );
  assert.equal(
    classifyAdminInviteContinuation(client, client, 5, 4, 20_000, 19_999),
    "superseded",
  );
});

test("Admin invite timeout reports an in-flight password update as unconfirmed", async () => {
  const client = {};
  const generation = 8;
  let releaseUpdate;
  const updatePending = new Promise((resolve) => {
    releaseUpdate = resolve;
  });
  let marker = null;

  const passwordUpdate = (async () => {
    marker = { client, generation };
    await updatePending;
  })();
  await Promise.resolve();

  assert.equal(
    adminInviteExpiryOutcome(marker, client, generation),
    "unconfirmed",
  );
  assert.equal(adminInviteExpiryOutcome(null, client, generation), "invalid");
  assert.equal(
    adminInviteExpiryOutcome(marker, client, generation + 1),
    "invalid",
  );

  releaseUpdate();
  await passwordUpdate;
});

test("Admin invite source is explicit, isolated, and never reads business data", async () => {
  const source = await readFile(
    new URL("../../components/admin/AdminInvitePage.tsx", import.meta.url),
    "utf8",
  );
  const clientSource = await readFile(
    new URL("../../lib/adminInvite.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /setSession\(\{[\s\S]*access_token:[\s\S]*refresh_token:/);
  assert.match(source, /updateUser\(\{ password \}\)/);
  assert.match(source, /signOut\(\{ scope: "local" \}\)/);
  assert.match(source, /useLayoutEffect\(\(\) => \{/);
  assert.match(source, /bootstrapRef = useRef<InviteBootstrapState>/);
  assert.match(source, /history\.replaceState\(/);
  assert.match(source, /window\.location\.pathname \+ window\.location\.search/);
  assert.doesNotMatch(source, /fetchAdmin(?:Health|Insights)/);
  assert.doesNotMatch(source, /useState[^\n]*(?:access|refresh|token)/i);
  assert.doesNotMatch(source, /verifyOtp/);
  assert.doesNotMatch(source, /console\./);
  assert.match(clientSource, /persistSession: false/);
  assert.doesNotMatch(clientSource, /storageKey:/);
  assert.doesNotMatch(clientSource, /sessionStorage/);
  assert.match(clientSource, /detectSessionInUrl: false/);
  assert.match(clientSource, /autoRefreshToken: false/);
  assert.doesNotMatch(source, /homeground-admin-invite/);
  assert.doesNotMatch(source, /sessionStorage/);
  assert.doesNotMatch(source, /let inviteRuntime:/);
  assert.doesNotMatch(source, /href="#admin-invite-main"/);
  assert.match(
    source,
    /document\.getElementById\("admin-invite-main"\)\?\.focus\(\)/,
  );
  assert.match(source, /id="admin-invite-main"[\s\S]*tabIndex=\{-1\}/);
  assert.match(source, /actionRef\.current/);
  assert.match(source, /clientGenerationRef\.current/);
  assert.match(source, /Math\.min\([\s\S]*bootstrap\.localDeadlineMs/);

  const updateCall = source.indexOf("await client.auth.updateUser({ password })");
  const postUpdateDeadlineCheck = source.indexOf(
    "classifyAdminInviteContinuation(",
    updateCall,
  );
  const updateErrorBranch = source.indexOf("if (update.error)", updateCall);
  assert.ok(updateCall >= 0);
  assert.ok(postUpdateDeadlineCheck > updateCall);
  assert.ok(updateErrorBranch > postUpdateDeadlineCheck);
  assert.match(source, /updateContinuation === "expired"[\s\S]*"unconfirmed"/);
  assert.match(
    source,
    /if \(updateAttempted\) \{[\s\S]*closeCurrentInvite\(client, "unconfirmed", null\)/,
  );
  assert.match(
    source,
    /update\.error\.code === "weak_password"[\s\S]*closeCurrentInvite\(client, "unconfirmed", null\)/,
  );
  assert.match(
    source,
    /nextStage === "complete"[\s\S]*Date\.now\(\) >= deadlineRef\.current[\s\S]*\? "unconfirmed"/,
  );
  const updateMarkerWrite = source.indexOf(
    "updateMarkerRef.current = { client, generation }",
  );
  const timeoutOutcome = source.indexOf("adminInviteExpiryOutcome(");
  assert.ok(updateMarkerWrite >= 0 && updateMarkerWrite < updateCall);
  assert.ok(timeoutOutcome >= 0 && timeoutOutcome < updateCall);

  const fragmentRead = source.indexOf(
    "bootstrapRef.current = captureAdminInviteFragment",
  );
  const fragmentScrub = source.indexOf("window.history.replaceState");
  const configCheck = source.indexOf(
    "configResultRef.current = getAdminConfig()",
  );
  assert.ok(fragmentRead >= 0);
  assert.ok(fragmentScrub > fragmentRead);
  assert.ok(configCheck > fragmentScrub);
});
