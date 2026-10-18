import test from "node:test";
import assert from "node:assert/strict";
import { buildCorporateTiming, corporateMonthOptions, corporateTimingCopy, CorporateTimingError, emptyCorporateTiming } from "../../lib/corporateEnquiryTiming.ts";
import { buildCorporateEnquiryDraft, corporateEnquiryEmailHref } from "../../lib/corporateEnquiryDraft.ts";

const locales = ["en", "zh", "ko", "ja", "es", "fr", "de", "ar"];
test("all eight editions keep a month distinct from an exact arrival date in the enquiry", () => {
  for (const locale of locales) {
    const timing = buildCorporateTiming({ ...emptyCorporateTiming, mode: "month", year: "2027", month: "5", days: "4" }, locale);
    assert.ok(timing.includes("2027"), locale);
    if (locale === "en") assert.equal(timing, "May 2027 · 4 days");
    if (locale === "zh") assert.equal(timing, "2027年5月 · 4 天");
    assert.ok(timing.endsWith(corporateTimingCopy[locale].durationText(4)), locale);
    assert.doesNotMatch(timing, /2027-05-01|01\/05\/2027|2027\/05\/01/);
    const draft = { company: "QA Team", name: "", email: "", people: "20", purpose: "company-trip", trip: "shanghai-suzhou-4-day-company-retreat", timing, budget: "", notes: "" };
    const message = buildCorporateEnquiryDraft(draft, locale);
    assert.ok(message.includes(timing), locale);
    assert.equal(new URL(corporateEnquiryEmailHref("hello@example.com", draft, message, locale)).searchParams.get("body"), message);
  }
});
test("dates remain optional without inventing a month, and changing mode omits inactive dates", () => {
  for (const locale of locales) {
    assert.equal(buildCorporateTiming(emptyCorporateTiming, locale), corporateTimingCopy[locale].flexible);
    assert.equal(buildCorporateTiming({ ...emptyCorporateTiming, year: "2027", month: "5", date: "2027-05-04" }, locale), corporateTimingCopy[locale].flexible);
    const date = buildCorporateTiming({ ...emptyCorporateTiming, mode: "date", date: "2028-02-29" }, locale);
    assert.ok(date.includes("2028"), locale);
    assert.ok(date.includes("29"), locale);
    assert.equal(corporateMonthOptions(locale).length, 12);
    assert.equal(new Set(corporateMonthOptions(locale).map(option => option.value)).size, 12);
  }
});
test("invalid or incomplete timing is rejected with the field and language needed to focus it", () => {
  for (const locale of locales) {
    for (const [value, field, message] of [
      [{ ...emptyCorporateTiming, mode: "month", month: "5" }, "year", corporateTimingCopy[locale].monthError],
      [{ ...emptyCorporateTiming, mode: "month", year: "2027", month: "13" }, "month", corporateTimingCopy[locale].monthError],
      [{ ...emptyCorporateTiming, mode: "date", date: "2027-02-29" }, "date", corporateTimingCopy[locale].dateError],
      [{ ...emptyCorporateTiming, mode: "date", date: "2027-04-31" }, "date", corporateTimingCopy[locale].dateError],
      [{ ...emptyCorporateTiming, days: "1.5" }, "days", corporateTimingCopy[locale].daysError],
      [{ ...emptyCorporateTiming, days: "0" }, "days", corporateTimingCopy[locale].daysError],
    ]) assert.throws(() => buildCorporateTiming(value, locale), error => error instanceof CorporateTimingError && error.field === field && error.message === message, locale);
  }
});
