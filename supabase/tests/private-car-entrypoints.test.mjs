import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { getPrivateCarServiceCta, privateCarServiceCtaTargets } from "../../lib/privateCarServiceCta.ts";
import { privateCarServicePath } from "../../lib/privateCarServices.ts";

test("car links only appear for existing relevant transport guides in the same language", () => {
  for (const guideId of privateCarServiceCtaTargets) {
    assert.ok(existsSync(new URL(`../../content/guides/${guideId}/metadata.json`, import.meta.url)));
    for (const locale of ["en", "zh", "ko"]) {
      const cta = getPrivateCarServiceCta(guideId, locale);
      assert.equal(cta.href, privateCarServicePath[locale]);
      assert.ok(cta.body.length > 20);
      assert.doesNotMatch(cta.body, /CNY|USD|8 hours|8小时|8시간|guaranteed pickup/i);
    }
  }
  assert.equal(getPrivateCarServiceCta("china-visa-free-entry-rules", "en"), null);
  assert.equal(getPrivateCarServiceCta("forbidden-city-for-foreign-visitors", "zh"), null);
});
