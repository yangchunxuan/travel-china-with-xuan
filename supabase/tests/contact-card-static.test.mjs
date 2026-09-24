import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { encode } from "uqr";
import {
  contactCardDesktopQuery,
  whatsappDisplayNumber,
  whatsappQrCandidates,
} from "../../lib/contactCard.ts";
import { openGuideContactFromLink, tourWhatsAppHref } from "../../lib/tourContact.ts";
import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySubmissionContext,
  privateTourInquirySlugs,
} from "../../lib/privateTourInquiryContext.ts";
import {
  currentHomepageEmailFormVersion,
  homepageEmailInquirySchemaVersion,
  homepageEmailPrivacyNoticeVersion,
  inquirySubmitSurfaceByLocale,
  validateAndNormalizeInquiry,
} from "../../lib/inquiryContract.ts";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

const locales = ["en", "zh", "ko"];

test("the contact card only answers clicks on desktop and never rewrites a link", async () => {
  const host = await source("components/ContactCardHost.tsx");
  assert.match(contactCardDesktopQuery, /min-width: 64rem/);
  assert.match(contactCardDesktopQuery, /hover: hover/);
  assert.match(contactCardDesktopQuery, /pointer: fine/);
  // Phones, tablets, new-tab and modifier clicks keep the link's own behaviour.
  assert.match(host, /if \(!desktop\.matches \|\| event\.defaultPrevented \|\| event\.button !== 0\) return;/);
  assert.match(host, /if \(event\.metaKey \|\| event\.ctrlKey \|\| event\.shiftKey \|\| event\.altKey\) return;/);
  // Only navigation is replaced: hrefs stay, and the link's analytics handler still runs.
  assert.doesNotMatch(host, /setAttribute\("href"|\.href\s*=|stopPropagation|stopImmediatePropagation/);
  assert.match(host, /event\.preventDefault\(\);\s*show\(next, anchor\);/);
  // Links inside the card (WhatsApp on this computer, the mail app) work normally.
  assert.match(host, /anchor\.closest\("\[data-contact-card-dialog\]"\)/);
});

test("the contact card mounts on every page next to the tour contact panel", async () => {
  for (const path of ["app/(default)/layout.tsx", "app/(localized)/[locale]/layout.tsx"]) {
    const layout = await source(path);
    assert.match(layout, /<TourContactPanel locale=\{?[^/]+\/>\s*<ContactCardHost locale=/, path);
  }
});

test("a guide link the card already answered does not also open the guide panel", () => {
  const event = { defaultPrevented: true, preventDefault() { throw new Error("should not run"); }, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, button: 0 };
  assert.equal(openGuideContactFromLink(event, "/#planner-contact", "en"), false);
});

test("every WhatsApp chat fits a QR code a phone reads easily off a screen", () => {
  const longDraft = { travelDate: "2026-10-18", note: "We are two families with grandparents; please keep walking short and add a rest day.", referralSource: "", requestedTravelers: null };
  for (const locale of locales) {
    const hrefs = [tourWhatsAppHref(locale, null)];
    for (const slug of privateTourInquirySlugs) {
      const context = getPrivateTourInquiryContext(slug, locale);
      hrefs.push(tourWhatsAppHref(locale, context), tourWhatsAppHref(locale, context, undefined, longDraft));
    }
    for (const href of hrefs) {
      const candidates = whatsappQrCandidates(href);
      assert.equal(candidates[0], href, "the code tries the exact link first");
      const chosen = candidates.map((candidate) => encode(candidate, { ecc: "M", border: 0 })).find((qr) => qr.version <= 15);
      assert.ok(chosen, `${locale}: ${href.slice(0, 80)}…`);
      // A shortened code keeps the greeting and, for a tour, the page link.
      const shortened = candidates.at(-1);
      assert.match(new URL(shortened).searchParams.get("text") ?? "", /\S/);
    }
  }
  assert.equal(whatsappDisplayNumber("https://wa.me/8613174215999?text=Hi"), "+86 131 7421 5999");
});

test("the card's email reuses the homepage email contract, with the tour when there is one", async () => {
  const dialog = await source("components/ContactCardDialog.tsx");
  assert.match(dialog, /entryPath: "homepage_email"/);
  assert.match(dialog, /privacyNoticeVersion: homepageEmailPrivacyNoticeVersion/);
  assert.match(dialog, /attribution: \{ landingPath: inquirySubmitSurfaceByLocale\[locale\] \}/);
  assert.match(dialog, /"Idempotency-Key": snapshot\.key/);
  assert.match(dialog, /name="companyWebsite"/);
  const config = {
    allowedFormVersions: [currentHomepageEmailFormVersion],
    allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion],
    whatsappEnabled: false,
  };
  for (const locale of locales) {
    for (const context of [null, getPrivateTourInquiryContext(privateTourInquirySlugs[0], locale)]) {
      // The endpoint lifts trafficSessionToken off before validation.
      const payload = {
        schemaVersion: homepageEmailInquirySchemaVersion,
        formVersion: currentHomepageEmailFormVersion,
        entryPath: "homepage_email",
        locale,
        contact: { channel: "email", email: "traveller@example.com" },
        privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
        productInterest: context ? getPrivateTourInquirySubmissionContext(context, locale) : null,
        attribution: { landingPath: inquirySubmitSurfaceByLocale[locale] },
        experiment: null,
        antiAbuse: { companyWebsite: "" },
      };
      const result = validateAndNormalizeInquiry(payload, config);
      assert.equal(result.ok, true, `${locale} ${context?.slug ?? "general"}: ${JSON.stringify(result.fieldErrors ?? {})}`);
    }
  }
});

test("the card reports through existing analytics events only", async () => {
  const [dialog, analytics] = await Promise.all([source("components/ContactCardDialog.tsx"), source("lib/analytics.ts")]);
  const names = [...dialog.matchAll(/trackEvent\("([a-z_]+)"/g), ...dialog.matchAll(/recordOutcome\("([a-z_]+)"/g)].map((match) => match[1]);
  assert.ok(names.length >= 4);
  for (const name of new Set(names)) assert.match(analytics, new RegExp(`\\| "${name}"`), name);
  // Contact details never go into analytics parameters.
  assert.doesNotMatch(dialog, /trackEvent\([^)]*email:/);
});

test("the card's motion only plays when motion is welcome", async () => {
  const styles = await source("components/ContactCard.module.css");
  const motion = styles.match(/@media \(prefers-reduced-motion: no-preference\) \{([\s\S]*?)\r?\n\}\r?\n/)?.[1] ?? "";
  for (const rule of [".dialog[open] {", ".qrCode svg {", ".scanBeam {", ".qrLogo {", ".successMark circle {"]) {
    assert.ok(motion.includes(rule), rule);
  }
  // Outside that block nothing animates on open, and the QR is never masked.
  const outside = styles.replace(motion, "");
  assert.doesNotMatch(outside, /animation: (?!spin)/);
  assert.doesNotMatch(outside, /mask-image: radial-gradient/);
  // No text smaller than 13px.
  for (const size of styles.matchAll(/font-size: ([0-9.]+)rem/g)) assert.ok(Number(size[1]) >= 0.8125, size[0]);
});
