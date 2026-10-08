import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  getPrivateTourInquiryContext,
  isPrivateTourPreviewInquirySlug,
  privateTourInquirySlugs,
} from "../../lib/privateTourInquiryContext.ts";

const migrationPath = new URL(
  "../migrations/202609270001_add_japanese_email_and_quote_inquiries.sql",
  import.meta.url,
);
const clientInspiredSlugs = new Set([
  "suzhou-tongli-hangzhou-shanghai-12-day-private-tour",
  "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour",
]);

test("Japanese SQL identity matches every published Japanese tour title", async () => {
  const sql = await readFile(migrationPath, "utf8");
  const productNames = sql.match(
    /create or replace function homeground_private\.private_tour_product_name_v1\([\s\S]*?\n\$\$;/u,
  )?.[0];
  assert.ok(productNames);
  const newSql = await readFile(new URL("../migrations/202610090001_add_jiangnan_and_five_city_quote_routes.sql", import.meta.url), "utf8");
  const newProductNames = newSql.match(
    /create or replace function homeground_private\.private_tour_product_name_v1\([\s\S]*?\n\$\$;/u,
  )?.[0];
  assert.ok(newProductNames);
  // Preview products have no Japanese page; the Northeast preview migration
  // adds their en/zh/ko names without a Japanese one.
  for (const slug of privateTourInquirySlugs.filter((candidate) => !isPrivateTourPreviewInquirySlug(candidate))) {
    const source = clientInspiredSlugs.has(slug) ? newProductNames : productNames;
    const branch = source.match(
      new RegExp(`when '${slug}' then case p_locale([\\s\\S]*?)else null end`, "u"),
    )?.[1];
    assert.ok(branch, slug);
    const expected = getPrivateTourInquiryContext(slug, "ja").name.replaceAll("'", "''");
    assert.ok(branch.includes(`when 'ja' then '${expected}'`), slug);
    for (const locale of ["en", "zh", "ko"]) {
      assert.match(branch, new RegExp(`when '${locale}' then`, "u"), `${locale}:${slug}`);
    }
  }
});

test("Japanese persistence stays restricted to email and quote with exact paths and selections", async () => {
  const sql = await readFile(migrationPath, "utf8");
  assert.match(sql, /locale = 'ja' and \(\s*\(entry_path = 'homepage_email' and route_id = 'homepage-email'\)/u);
  assert.match(sql, /p_locale = 'ja' and \(p_route_id is null or p_route_id not in \('homepage-email', 'private-tour-quote'\)\)/u);
  assert.match(sql, /when p_locale = 'ja' and p_route_id = 'homepage-email' then 'homepage_email'/u);
  assert.match(sql, /when p_locale = 'ja' and p_route_id = 'private-tour-quote' then 'private_tour_quote'/u);
  assert.match(sql, /when 'ja' then '\/ja\/'/u);
  assert.match(sql, /p_product_interest is distinct from expected_product_interest/u);
  assert.match(sql, /p_attribution is distinct from expected_attribution/u);
  assert.match(sql, /is_valid_private_tour_selection_v1/u);
  assert.doesNotMatch(sql, /create or replace function homeground_private\.is_valid_private_tour_selection_v1/u);
  assert.match(sql, /alter table homeground_private\.traffic_sessions[\s\S]*?locale in \('en', 'zh', 'ko', 'ja'\)/u);
  assert.match(sql, /alter table homeground_private\.inquiry_traffic_attribution[\s\S]*?locale in \('en', 'zh', 'ko', 'ja'\)/u);
});
