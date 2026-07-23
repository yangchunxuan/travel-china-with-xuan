import assert from "node:assert/strict";
import test from "node:test";
import { canCommitAdminResponse } from "../../lib/adminRequestEpoch.ts";

test("a response can commit only for the latest request and same user", () => {
  assert.equal(canCommitAdminResponse(4, "user-a", 4, "user-a"), true);
  assert.equal(canCommitAdminResponse(3, "user-a", 4, "user-a"), false);
  assert.equal(canCommitAdminResponse(4, "user-a", 4, "user-b"), false);
  assert.equal(canCommitAdminResponse(4, "user-a", 4, null), false);
});
