import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (file) => readFile(path.join(projectRoot, file), "utf8");
const ids = (block) => [...block.matchAll(/\n {4,8}\{\n {6,10}id: "([a-z-]+)",/gu)].map((match) => match[1]);
const between = (text, start, end) => text.slice(text.indexOf(start), text.indexOf(end, text.indexOf(start)));

/** English section order for each page; the Japanese copy follows it. */
const termsIds = ["consultation-scope", "not-included", "full-trip", "confirmation", "traveller-responsibilities", "delivery", "changing-information", "personal-use", "attraction-reservations", "privacy-contact"];
const refundIds = ["delivery", "cancellation", "corrections", "request", "attraction-reservations"];

test("the English terms and refund pages still use this section order", async () => {
  const english = await source("lib/homegroundLegalI18n.ts");
  const en = between(english, "function termsCopy(", "    zh: {");
  assert.deepEqual(ids(en).filter((id) => termsIds.includes(id)), termsIds);
  const refund = between(english, "function refundCopy(", "    zh: {");
  assert.deepEqual(ids(refund).filter((id) => refundIds.includes(id)), refundIds);
});

test("the Japanese terms and refund pages include the attraction reservation service in the English order", async () => {
  const japanese = await source("lib/japaneseLegalCopy.ts");
  const terms = between(japanese, "const terms: JapaneseLegalCopy", "const refundDelivery");
  const refund = between(japanese, "const refundDelivery: JapaneseLegalCopy", "export const japaneseLegalCopy");
  assert.deepEqual(ids(terms), termsIds);
  assert.deepEqual(ids(refund), refundIds);
  assert.match(terms, /title: "9\. 観光地の予約代行サービス"[\s\S]*japaneseReservationGuarantee,\n\s*japaneseReservationLate,/u);
  assert.match(terms, /title: "10\. 個人情報とお問い合わせ先"/u);
  assert.match(refund, /予約のご依頼は無料です。/u);
  assert.match(refund, /当社が予約を完了する前であれば、メールでキャンセルできます。受領済みのサービス料とチケット代は全額返金します。/u);
  assert.match(refund, /body: japaneseReservationGuarantee,[\s\S]*body: japaneseReservationLate,/u);
  assert.match(japanese, /有料の観光地予約代行サービスも提供しています/u, "the current-services notice names the reservation service");
});
