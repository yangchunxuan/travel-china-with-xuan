import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = async (relativePath) => (await readFile(path.join(projectRoot, relativePath), "utf8")).replaceAll("\r\n", "\n");

const release = await import("../../lib/ticketReleaseTimes.ts");
const reservations = await import("../../lib/attractionReservations.ts");
const copyModule = await import("../../lib/ticketReleaseTimeI18n.ts");

const locales = ["en", "zh", "ko"];
const { ticketReleaseRules: rules } = release;

test("Forbidden City tickets open at 20:00 China time seven days before the visit", () => {
  const instant = release.ticketReleaseInstant(rules["forbidden-city"], "2026-10-25");
  // 20:00 UTC+8 on 18 October is 12:00 UTC.
  assert.equal(instant.toISOString(), "2026-10-18T12:00:00.000Z");
  // Month and year boundaries roll back correctly.
  assert.equal(release.ticketReleaseInstant(rules["forbidden-city"], "2027-01-03").toISOString(), "2026-12-27T12:00:00.000Z");
  assert.equal(release.ticketReleaseInstant(rules["forbidden-city"], "2026-03-01").toISOString(), "2026-02-22T12:00:00.000Z");
});

test("Shaanxi History Museum opens five days ahead at 17:00 China time", () => {
  assert.equal(
    release.ticketReleaseInstant(rules["shaanxi-history-museum"], "2026-10-25").toISOString(),
    "2026-10-20T09:00:00.000Z",
  );
});

test("invalid dates compute nothing", () => {
  for (const value of ["", "2026-02-30", "2026-13-01", "25/10/2026"]) {
    assert.equal(release.ticketReleaseInstant(rules["forbidden-city"], value), null, value);
  }
});

test("status follows China time: upcoming, on sale, too late", () => {
  const rule = rules["forbidden-city"];
  // Release for 25 Oct is 18 Oct 12:00 UTC.
  assert.equal(release.ticketReleaseStatus(rule, "2026-10-25", new Date("2026-10-18T11:59:00Z")), "upcoming");
  assert.equal(release.ticketReleaseStatus(rule, "2026-10-25", new Date("2026-10-18T12:00:00Z")), "on-sale");
  // 25 Oct 00:30 in China (24 Oct 16:30 UTC) is the visit day: no same-day booking.
  assert.equal(release.ticketReleaseStatus(rule, "2026-10-25", new Date("2026-10-24T16:30:00Z")), "too-late");
  assert.equal(release.ticketReleaseStatus(rule, "2026-10-25", new Date("2026-10-24T15:30:00Z")), "on-sale");
});

test("the default date is the first one whose tickets are not on sale yet", () => {
  const rule = rules["forbidden-city"];
  // 10 Oct 19:00 China time: tickets for 17 Oct open in an hour.
  assert.equal(release.firstUpcomingVisitDate(rule, new Date("2026-10-10T11:00:00Z")), "2026-10-17");
  // 10 Oct 20:30 China time: 17 Oct is on sale, so 18 Oct is next.
  assert.equal(release.firstUpcomingVisitDate(rule, new Date("2026-10-10T12:30:00Z")), "2026-10-18");
});

test("the default date skips the Forbidden City's usual Monday closure", () => {
  // Sunday 11 Oct 21:30 China time: 18 Oct is on sale and 19 Oct is a Monday, so 20 Oct is offered.
  assert.equal(release.firstUpcomingVisitDate(rules["forbidden-city"], new Date("2026-10-11T13:30:00Z")), "2026-10-20");
});

test("Mondays are flagged only for the Forbidden City", () => {
  assert.equal(release.visitWeekday("2026-10-26"), 1);
  assert.equal(rules["forbidden-city"].usualClosedWeekday, 1);
  assert.equal(rules["shaanxi-history-museum"].usualClosedWeekday, null);
});

test("the calendar reminder starts ten minutes before release and escapes text", () => {
  const file = release.ticketReleaseCalendarFile({
    rule: rules["forbidden-city"], visitDate: "2026-10-25", now: new Date("2026-10-10T00:00:00Z"),
    title: "Forbidden City tickets open; book now", description: "Line one\nLine, two",
  });
  assert.match(file, /^BEGIN:VCALENDAR\r\n/u);
  assert.match(file, /\r\nDTSTART:20261018T115000Z\r\n/u);
  assert.match(file, /\r\nDTEND:20261018T122000Z\r\n/u);
  assert.match(file, /\r\nSUMMARY:Forbidden City tickets open\\; book now\r\n/u);
  assert.match(file, /\r\nDESCRIPTION:Line one\\nLine\\, two\r\n/u);
  assert.match(file, /\r\nUID:forbidden-city-2026-10-25@homegroundchina\.com\r\n/u);
  assert.match(file, /\r\nTRIGGER:PT0M\r\n/u);
  // Long lines fold at 75 octets (RFC 5545).
  const long = release.ticketReleaseCalendarFile({
    rule: rules["forbidden-city"], visitDate: "2026-10-25", now: new Date("2026-10-10T00:00:00Z"),
    title: "Forbidden City tickets", description: "故宫".repeat(60),
  });
  for (const line of long.split("\r\n")) assert.ok(new TextEncoder().encode(line).length <= 75, line);
  assert.match(long, /\r\n /u);
});

test("the Google Calendar fallback carries the same ten-minute window", () => {
  const url = new URL(release.ticketReleaseGoogleCalendarUrl({
    rule: rules["forbidden-city"], visitDate: "2026-10-25", title: "T", description: "D",
  }));
  assert.equal(url.origin + url.pathname, "https://calendar.google.com/calendar/render");
  assert.equal(url.searchParams.get("dates"), "20261018T115000Z/20261018T122000Z");
});

test("computed rules match the wording the source guides verified", () => {
  const forbidden = reservations.getAttractionReservationRule("forbidden-city");
  assert.match(forbidden.release.en, /7 days ahead at 20:00 China time/u);
  assert.equal(rules["forbidden-city"].daysBefore, 7);
  assert.equal(rules["forbidden-city"].chinaTime, "20:00");
  const shaanxi = reservations.getAttractionReservationRule("shaanxi-history-museum");
  assert.match(shaanxi.release.en, /5 days ahead at 17:00/u);
  assert.equal(rules["shaanxi-history-museum"].daysBefore, 5);
  assert.equal(rules["shaanxi-history-museum"].chinaTime, "17:00");
  for (const id of release.ticketReleaseToolAttractionIds) {
    const rule = reservations.getAttractionReservationRule(id);
    assert.ok(rule?.verifiedAt && rule.source, `${id} has a checked source guide`);
    assert.match(rules[id].releaseCheckedAt, /^\d{4}-\d{2}-\d{2}$/u);
    assert.ok(rules[id].releaseCheckedAt >= rule.verifiedAt, `${id} release check is not older than the guide check`);
    assert.match(rules[id].officialUrl, /^https:\/\//u);
  }
});

test("copy exists in every locale and never hard-codes a release fact", () => {
  for (const locale of locales) {
    const copy = copyModule.getTicketReleaseTimeCopy(locale);
    for (const id of release.ticketReleaseToolAttractionIds) {
      assert.ok(copy.calculator.attractionNames[id], `${locale} ${id} name`);
      assert.ok(copy.calculator.tooLate[id], `${locale} ${id} too-late`);
    }
    const text = JSON.stringify(copy);
    assert.doesNotMatch(text, /20:00|17:00/u, `${locale} copy takes times from the rules`);
    assert.ok(copyModule.getTicketReleaseMetadataCopy(locale).title.length <= 60, `${locale} title length`);
    assert.match(copyModule.getTicketReleaseMetadataCopy(locale).description, /20:00/u);
    assert.equal(copy.faq.length, 5);
  }
  assert.equal(copyModule.fillTicketReleaseCopy("{a} and {b}", { a: 1 }), "1 and {b}");
});

test("routes, sitemap, content node and the guide link are wired", async () => {
  const [enRoute, localizedRoute, adapter, sitemap, guideEn, guideZh, guideKo, calculator] = await Promise.all([
    source("app/(default)/tools/forbidden-city-ticket-release-time/page.tsx"),
    source("app/(localized)/[locale]/tools/forbidden-city-ticket-release-time/page.tsx"),
    source("lib/legacySystemContentAdapter.ts"),
    source("app/sitemap.ts"),
    source("content/guides/forbidden-city-for-foreign-visitors/body.en.ts"),
    source("content/guides/forbidden-city-for-foreign-visitors/body.zh.ts"),
    source("content/guides/forbidden-city-for-foreign-visitors/body.ko.ts"),
    source("components/TicketReleaseCalculator.tsx"),
  ]);
  assert.match(enRoute, /<TicketReleaseTimePage locale="en" \/>/u);
  assert.match(localizedRoute, /localizedRouteLocale\(locale\)/u);
  assert.match(adapter, /ticketReleaseToolNode,/u);
  assert.match(adapter, /section: "tools", family: "tool"/u);
  assert.match(sitemap, /tool-forbidden-city-ticket-release-time/u);
  assert.match(guideEn, /href: "https:\/\/homegroundchina\.com\/tools\/forbidden-city-ticket-release-time\/"/u);
  assert.match(guideZh, /href: "https:\/\/homegroundchina\.com\/zh\/tools\/forbidden-city-ticket-release-time\/"/u);
  assert.match(guideKo, /href: "https:\/\/homegroundchina\.com\/ko\/tools\/forbidden-city-ticket-release-time\/"/u);
  // The browser bundle must not pull in the tour catalogue.
  assert.doesNotMatch(calculator, /attractionReservations"/u);
  assert.match(calculator, /^"use client";/u);
  assert.deepEqual(release.ticketReleaseToolPath, {
    en: "/tools/forbidden-city-ticket-release-time/",
    zh: "/zh/tools/forbidden-city-ticket-release-time/",
    ko: "/ko/tools/forbidden-city-ticket-release-time/",
  });
});
