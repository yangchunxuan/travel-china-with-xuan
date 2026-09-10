import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { dateFromIso, dateToIso, formatTourDate, parseTourDate, tourDateCopy } from "../../lib/tourDate.ts";
import { isValidPrivateTourTravelDate } from "../../lib/inquiryContract.ts";

test("numeric editing formats are localized without guessing month/day order", () => {
  assert.equal(parseTourDate("03/04/2026", "en"), "2026-04-03");
  assert.equal(parseTourDate("3/4/2026", "en"), "2026-04-03");
  assert.equal(parseTourDate("04/13/2026", "en"), "");
  assert.equal(parseTourDate("2026/04/03", "en"), "");
  for (const locale of ["zh", "ko"]) {
    assert.equal(parseTourDate("2026/4/3", locale), "2026-04-03");
    assert.equal(parseTourDate("03/04/2026", locale), "");
  }
  assert.equal(parseTourDate("2026年 4月 3日", "zh"), "2026-04-03");
  assert.equal(parseTourDate("2026년 4월 3일", "ko"), "2026-04-03");
  for (const locale of ["en", "zh", "ko"]) {
    assert.equal(parseTourDate(" 2026-04-03 ", locale), "2026-04-03");
    const display = formatTourDate("2026-04-03", locale);
    assert.equal(display, locale === "en" ? "03/04/2026" : "2026/04/03");
    assert.equal(parseTourDate(display, locale), "2026-04-03");
    assert.equal(tourDateCopy[locale].placeholder, locale === "en" ? "DD/MM/YYYY" : "YYYY/MM/DD");
  }
});

test("eight-digit mobile entry uses the locale order and normalizes to the display format", () => {
  assert.equal(parseTourDate("06072026", "en"), "2026-07-06");
  assert.equal(parseTourDate(" 29022024 ", "en"), "2024-02-29");
  assert.equal(formatTourDate(parseTourDate("06072026", "en"), "en"), "06/07/2026");
  for (const locale of ["zh", "ko"]) {
    assert.equal(parseTourDate("20260706", locale), "2026-07-06");
    assert.equal(parseTourDate("20240229", locale), "2024-02-29");
    assert.equal(formatTourDate(parseTourDate("20260706", locale), locale), "2026/07/06");
  }
  // Both readings are real dates; the declared locale alone decides the order.
  assert.equal(parseTourDate("20011212", "en"), "1212-01-20");
  assert.equal(parseTourDate("20011212", "zh"), "2001-12-12");
  assert.equal(parseTourDate("20011212", "ko"), "2001-12-12");
});

test("compact entry rejects invalid dates, another locale's order, and non-eight-digit input", () => {
  for (const input of ["29022026", "31112026", "01002026", "01010000", "20260706"]) {
    assert.equal(parseTourDate(input, "en"), "", input);
  }
  for (const locale of ["zh", "ko"]) {
    for (const input of ["20260229", "20261131", "20260001", "00000101", "06072026"]) {
      assert.equal(parseTourDate(input, locale), "", `${locale}: ${input}`);
    }
  }
  for (const locale of ["en", "zh", "ko"]) {
    for (const input of ["", "1", "1092026", "010920260", "2026091000", "0109 2026", "0607202x"]) {
      assert.equal(parseTourDate(input, locale), "", `${locale}: ${input}`);
    }
  }
});

test("calendar validity and full four-digit year range agree with the backend", () => {
  const samples = [
    "0001-01-01", "0099-12-31", "0400-02-29", "1582-10-10", "1900-02-28",
    "2000-02-29", "2024-02-29", "2026-09-10", "9999-12-31",
    "0000-01-01", "0100-02-29", "1900-02-29", "2026-02-29", "2026-04-31",
    "2026-00-10", "2026-13-10", "2026-01-00", "2026-01-32", "10000-01-01",
    "2026-4-03", "2026-04-3", "2026-04-03T00:00:00Z", "", "not a date",
  ];
  for (const iso of samples) {
    const valid = isValidPrivateTourTravelDate(iso);
    for (const locale of ["en", "zh", "ko"]) {
      assert.equal(parseTourDate(iso, locale), valid ? iso : "", `${locale}: ${iso}`);
      if (valid) assert.equal(parseTourDate(formatTourDate(iso, locale), locale), iso);
      else assert.equal(formatTourDate(iso, locale), "");
    }
    if (!valid) assert.equal(dateFromIso(iso), undefined);
  }
  assert.equal(parseTourDate("31/04/2026", "en"), "");
  assert.equal(parseTourDate("2026/2/29", "zh"), "");
  assert.equal(parseTourDate("2026년 2월 29일", "ko"), "");
  assert.equal(dateToIso(new Date(Number.NaN)), "");
});

test("calendar dates remain local noon across timezone offsets, DST, and years below 100", () => {
  const moduleUrl = new URL("../../lib/tourDate.ts", import.meta.url).href;
  const dates = ["0001-01-01", "0099-12-31", "2026-03-08", "2026-09-10", "2026-11-01", "9999-12-31"];
  const script = `
    import {dateFromIso,dateToIso} from ${JSON.stringify(moduleUrl)};
    const values=${JSON.stringify(dates)}.map(iso=>{
      const date=dateFromIso(iso);
      return {iso,dateBack:date&&dateToIso(date),hours:date&&date.getHours(),minutes:date&&date.getMinutes()};
    });
    console.log(JSON.stringify(values));
  `;
  for (const zone of ["UTC", "America/Los_Angeles", "Asia/Shanghai", "Pacific/Kiritimati"]) {
    const output = execFileSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], {
      encoding: "utf8", env: { ...process.env, TZ: zone }, stdio: ["ignore", "pipe", "pipe"],
    });
    const results = JSON.parse(output);
    assert.deepEqual(results, dates.map(iso => ({ iso, dateBack: iso, hours: 12, minutes: 0 })), zone);
  }
});

test("a locally skipped civil day cannot silently select a different date", () => {
  const moduleUrl = new URL("../../lib/tourDate.ts", import.meta.url).href;
  const script = `import {dateFromIso} from ${JSON.stringify(moduleUrl)}; console.log(dateFromIso('2011-12-30') === undefined);`;
  const output = execFileSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], {
    encoding: "utf8", env: { ...process.env, TZ: "Pacific/Apia" }, stdio: ["ignore", "pipe", "pipe"],
  });
  assert.equal(output.trim(), "true");
});
