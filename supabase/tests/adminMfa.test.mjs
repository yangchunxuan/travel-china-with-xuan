import assert from "node:assert/strict";
import test from "node:test";
import { selectUnverifiedTotpFactors } from "../../lib/adminMfa.ts";

test("MFA enrollment cleanup selects only unverified TOTP factors", () => {
  const factors = [
    { id: "verified-totp", factor_type: "totp", status: "verified" },
    { id: "unfinished-totp", factor_type: "totp", status: "unverified" },
    { id: "unfinished-phone", factor_type: "phone", status: "unverified" },
    {
      id: "unfinished-webauthn",
      factor_type: "webauthn",
      status: "unverified",
    },
  ];

  assert.deepEqual(
    selectUnverifiedTotpFactors(factors).map((factor) => factor.id),
    ["unfinished-totp"],
  );
  assert.equal(
    selectUnverifiedTotpFactors(factors).some(
      (factor) => factor.id === "verified-totp",
    ),
    false,
  );
});
