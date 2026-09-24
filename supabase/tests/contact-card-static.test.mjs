import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { encode } from "uqr";
import {
  contactCardDesktopQuery,
  contactCardRequestForLink,
  whatsappDisplayNumber,
  whatsappQrCandidates,
} from "../../lib/contactCard.ts";
import { handleHomegroundHashClick } from "../../lib/homegroundNavigation.ts";
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
  // Links inside the card, and links marked as direct, work normally.
  assert.match(host, /anchor\.closest\("\[data-contact-card-dialog\], \[data-contact-card-direct\]"\)/);
});

test("plain planner links open the card everywhere, including the homepage; chosen services keep their flow", () => {
  const previousWindow = globalThis.window;
  const at = (pathname) => { globalThis.window = { location: { origin: "https://homegroundchina.com", pathname } }; };
  const link = (href) => ({ href: new URL(href, "https://homegroundchina.com/").href });
  try {
    at("/");
    assert.deepEqual(contactCardRequestForLink(link("/#planner-contact"), "en"), { trigger: "planner" });
    assert.equal(contactCardRequestForLink(link("/?service=full-trip-support#planner-contact"), "en"), null);
    assert.equal(contactCardRequestForLink(link("/#route-finder"), "en"), null);
    at("/zh/studio/");
    assert.deepEqual(contactCardRequestForLink(link("/zh/?utm_source=studio#planner-contact"), "zh"), { trigger: "planner" });
    assert.equal(contactCardRequestForLink(link("/#planner-contact"), "zh"), null, "another language's homepage");
    assert.equal(contactCardRequestForLink(link("https://wa.me/8613174215999?text=Hi"), "en").trigger, "whatsapp");
    assert.equal(contactCardRequestForLink(link("mailto:hello@homegroundchina.com?subject=Hi"), "en").trigger, "email");
    assert.equal(contactCardRequestForLink(link("mailto:someone@example.com"), "en"), null);
  } finally {
    globalThis.window = previousWindow;
  }
});

test("a homepage planner link the card already answered does not also scroll the page", () => {
  let scrolled = false;
  const previousDocument = globalThis.document;
  globalThis.document = { querySelector() { scrolled = true; return null; }, getElementById() { scrolled = true; return null; } };
  try {
    handleHomegroundHashClick({ defaultPrevented: true, button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() {} }, "#planner-contact");
    assert.equal(scrolled, false);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("the homepage contact panel shows the card's scan block on desktop and keeps its WhatsApp link", async () => {
  const [panel, inline, styles] = await Promise.all([
    source("components/HomepageQuickContact.tsx"),
    source("components/ContactCardInlineScan.tsx"),
    source("components/HomegroundHomePage.module.css"),
  ]);
  assert.match(panel, /\{desktopCard && \([\s\S]*?<ContactCardInlineScan[\s\S]*?href=\{whatsappUrl\}/);
  // The same link, href and analytics as before; on desktop it opens WhatsApp itself.
  assert.match(panel, /href=\{whatsappUrl\}[\s\S]*?data-contact-card-direct=\{desktopCard \? "" : undefined\}[\s\S]*?trackEvent\("contact_option_clicked", \{\s*channel: "whatsapp",/);
  assert.match(panel, /\{desktopCard\s*\? contactCardCopy\[locale\]\.useHere\s*: contactCopy\.whatsappAction\}/);
  // The QR code's code loads only when the desktop panel renders it.
  assert.match(inline, /lazy\(\(\) =>\s*import\("\.\/ContactCardScan"\)/);
  assert.match(inline, /window\.matchMedia\(contactCardDesktopQuery\)/);
  assert.match(styles, /\.quickContactScan \{[\s\S]*?min-block-size: 15rem;/);
});

test("on desktop the homepage panel shows one way in at a time, as real tabs, keeping every link", async () => {
  const [panel, styles] = await Promise.all([
    source("components/HomepageQuickContact.tsx"),
    source("components/HomegroundHomePage.module.css"),
  ]);
  assert.match(panel, /const board = desktopCard;/);
  assert.match(panel, /role="tablist"/);
  assert.match(panel, /role="tab"[\s\S]*?aria-controls=\{`\$\{boardId\}-\$\{tab\}`\}[\s\S]*?aria-selected=\{boardTab === tab\}/);
  assert.match(panel, /role: "tabpanel",[\s\S]*?hidden: boardTab !== tab,/);
  assert.match(panel, /event\.key === "ArrowRight"[\s\S]*?event\.key === "ArrowLeft"/);
  // Panels share one grid cell (no jump on switching); a hidden one is invisible and unfocusable.
  assert.match(styles, /\.quickContactBoard \.quickContactGrid > \[role="tabpanel"\] \{\s*grid-area: 1 \/ 1;/);
  assert.match(styles, /\.quickContactBoard \[role="tabpanel"\]\[hidden\] \{\s*visibility: hidden;/);
  // Messenger keeps its link and its analytics; phones keep the stacked panel.
  assert.match(panel, /className=\{board \? styles\.boardMessengerLink : undefined\}\s*href=\{messengerUrl\}[\s\S]*?channel: "messenger",/);
  assert.match(panel, /\{messengerUrl && !board && \(/);
  // Motion only when it is welcome.
  assert.match(styles, /@media \(prefers-reduced-motion: no-preference\) \{\s*\.boardKnob \{\s*transition:/);
});

test("every planner has a small avatar, shown beside Meet the team on wide screens only", async () => {
  const { getHomepageTeamFaces } = await import("../../lib/homegroundStudioI18n.ts");
  const { stat } = await import("node:fs/promises");
  for (const locale of locales) {
    const faces = getHomepageTeamFaces(locale);
    assert.ok(faces.length >= 5, locale);
    for (const face of faces) {
      const file = await stat(new URL(`../../public${face.src}`, import.meta.url));
      assert.ok(file.size < 8_000, `${face.src} is ${file.size} bytes`);
    }
  }
  const showcase = await source("components/HomepageShowcase.module.css");
  assert.match(showcase, /\.planningFaces \{\s*display: none;\s*\}\s*@media \(min-width: 64rem\) \{\s*\.planningFaces \{\s*display: inline-flex;/);
  const home = await source("components/HomegroundHomePage.tsx");
  assert.match(home, /className=\{showcaseStyles\.planningFaces\} aria-hidden="true"/);
  assert.match(home, /alt=""/);
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

function withoutMotionBlocks(css) {
  // Drop every `@media (prefers-reduced-motion: no-preference) { … }` block, nested or not.
  let out = css;
  for (;;) {
    const start = out.indexOf("@media (prefers-reduced-motion: no-preference)");
    if (start < 0) return out;
    let depth = 0;
    let end = out.indexOf("{", start);
    for (; end < out.length; end += 1) {
      if (out[end] === "{") depth += 1;
      else if (out[end] === "}" && --depth === 0) break;
    }
    out = out.slice(0, start) + out.slice(end + 1);
  }
}

test("the card's motion only plays when motion is welcome", async () => {
  const styles = await source("components/ContactCard.module.css");
  const motion = styles.match(/@media \(prefers-reduced-motion: no-preference\) \{([\s\S]*?)\r?\n\}\r?\n/)?.[1] ?? "";
  for (const rule of [".dialog[open] {", ".qrCode svg {", ".scanBeam {", ".qrLogo {", ".successMark circle {"]) {
    assert.ok(motion.includes(rule), rule);
  }
  // The homepage's scroll-linked reveal sits behind a feature query and the same preference,
  // and finishes once the whole code is on screen.
  assert.match(styles, /@supports \(animation-timeline: view\(\)\) \{\s*@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\.scanInline \.qrCode svg \{[\s\S]*?animation-range: entry 0% entry 100%;/);
  // Outside those blocks nothing animates on open, and the QR is never masked.
  const outside = withoutMotionBlocks(styles);
  assert.doesNotMatch(outside, /animation: (?!spin)/);
  assert.doesNotMatch(outside, /mask-image: radial-gradient/);
  // No text smaller than 13px.
  for (const size of styles.matchAll(/font-size: ([0-9.]+)rem/g)) assert.ok(Number(size[1]) >= 0.8125, size[0]);
});
