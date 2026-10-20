import assert from "node:assert/strict";
import test from "node:test";
import { splitJapanesePhrases } from "../../lib/japanesePhrases.ts";

test("a long run of words can break where a katakana word begins, not inside it", () => {
  assert.deepEqual(splitJapanesePhrases("冬季プライベートツアー"), ["冬季プライベート", "ツアー"]);
  assert.deepEqual(splitJapanesePhrases("中国東北部の冬のプライベートツアー"), ["中国東北部の", "冬の", "プライベート", "ツアー"]);
});

test("short words, kanji compounds and day counts stay whole", () => {
  assert.deepEqual(splitJapanesePhrases("北京・西安・上海 8日間（7泊）"), ["北京・", "西安・", "上海 ", "8日間（7泊）"]);
  assert.deepEqual(splitJapanesePhrases("中華人民共和国文化観光部"), ["中華人民共和国文化観光部"]);
  assert.deepEqual(splitJapanesePhrases("決まっているものはそのままに"), ["決まっているものは", "そのままに"]);
  assert.deepEqual(splitJapanesePhrases("ツアー一覧"), ["ツアー一覧"]);
});
