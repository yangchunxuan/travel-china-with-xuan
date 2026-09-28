import assert from "node:assert/strict";
import test from "node:test";
import { staffReplyMailto } from "../functions/_shared/staff-reply.ts";

test("staff starts a clean new email in every language, without internal content", () => {
  for (const locale of ["en", "zh", "ko", "ja"]) {
    const uri = new URL(staffReplyMailto("guest+family@example.com", "HG-ABCD-EFGH-JKLM", locale));
    assert.equal(decodeURIComponent(uri.pathname), "guest+family@example.com");
    assert.match(uri.searchParams.get("subject"), /HG-ABCD-EFGH-JKLM/);
    assert.doesNotMatch(uri.searchParams.get("body"), /INTERNAL|budget|First response due|Traveller note/);
    assert.doesNotMatch(uri.searchParams.get("body").replaceAll("\r\n", ""), /\n/);
    assert.deepEqual([...uri.searchParams.keys()], ["subject", "body"]);
  }
});

test("staff links reject header injection instead of addressing extra recipients", () => {
  assert.throws(() => staffReplyMailto("guest@example.com\r\nBcc: hidden@example.com", "HG-X", "en"));
  assert.throws(() => staffReplyMailto("guest@example.com", "HG-X\r\nBcc: hidden", "en"));
  const uri = new URL(staffReplyMailto("guest?bcc=other@example.com", "HG-X", "en"));
  assert.equal(uri.searchParams.get("bcc"), null);
});
