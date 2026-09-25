import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { encode } from "uqr";
import {
  contactCardDesktopQuery,
  contactCardFrameCopy,
  contactCardRequestForLink,
  holdPageScroll,
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

test("the card answers WhatsApp and mail clicks on desktop only, planner links everywhere, and never rewrites a link", async () => {
  const host = await source("components/ContactCardHost.tsx");
  assert.match(contactCardDesktopQuery, /min-width: 64rem/);
  assert.match(contactCardDesktopQuery, /hover: hover/);
  assert.match(contactCardDesktopQuery, /pointer: fine/);
  // New-tab and modifier clicks keep the link's own behaviour.
  assert.match(host, /if \(event\.defaultPrevented \|\| event\.button !== 0\) return;/);
  assert.match(host, /if \(event\.metaKey \|\| event\.ctrlKey \|\| event\.shiftKey \|\| event\.altKey\) return;/);
  // Phones and tablets keep WhatsApp and mail links direct; their planner
  // links open the card as a sheet instead of leaving or jumping down the page.
  assert.match(host, /if \(!onDesktop && next\.trigger !== "planner"\) return;/);
  // Only navigation is replaced: hrefs stay, and the link's analytics handler still runs.
  assert.doesNotMatch(host, /setAttribute\("href"|\.href\s*=|stopPropagation|stopImmediatePropagation/);
  assert.match(host, /event\.preventDefault\(\);\s*show\(next, anchor, onDesktop \? "card" : "sheet"\);/);
  // Links inside the card, and links marked as direct, work normally.
  assert.match(host, /anchor\.closest\("\[data-contact-card-dialog\], \[data-contact-card-direct\]"\)/);
});

test("on phones and tablets a planner link opens the card as a sheet: WhatsApp, Messenger and email, no code to scan", async () => {
  const [dialog, sheetStyles, social] = await Promise.all([
    source("components/ContactCardDialog.tsx"),
    source("components/ContactSheet.module.css"),
    source("lib/homegroundSocial.ts"),
  ]);
  assert.match(dialog, /const sheet = layout === "sheet";/);
  // Reported as its own variant of the same events.
  assert.match(dialog, /const contactVariant = sheet \? "mobile_sheet" : "desktop_card";/);
  const sheetStart = dialog.indexOf("{sheet ? (");
  const sheetBranch = dialog.slice(sheetStart, dialog.indexOf("<div className={styles.columns}", sheetStart));
  assert.ok(sheetBranch.length > 200);
  // WhatsApp opens the app with the same prefilled chat as the card's code; Messenger is the site's own page.
  assert.match(sheetBranch, /href=\{whatsappHref\} target="_blank" rel="noopener noreferrer"[^>]*onClick=\{openedApp\("whatsapp"\)\}/);
  assert.match(sheetBranch, /href=\{messengerHref\} target="_blank" rel="noopener noreferrer"[^>]*onClick=\{openedApp\("messenger"\)\}/);
  assert.match(dialog, /const messengerHref = sheet \? homegroundMessengerUrl\(\) : "";/);
  assert.match(social, /trustedMessengerUrl\(\s*process\.env\.NEXT_PUBLIC_HOMEGROUND_MESSENGER_URL\?\.trim\(\) \|\|\s*`https:\/\/m\.me\/\$\{homegroundFacebookPageId\}`/);
  assert.doesNotMatch(sheetBranch, /ContactCardScan/);
  // The same email form serves both layouts.
  assert.equal((dialog.match(/<form /g) ?? []).length, 1);
  assert.match(sheetBranch, /\{mail\}/);
  // A sheet from the bottom edge, clear of the home indicator; motion only when welcome.
  // Its box outranks the card's .dialog whichever of the two stylesheets loaded last.
  assert.match(sheetStyles, /\n\.sheet\.sheet \{[^}]*inset: auto 0 0;[^}]*padding-bottom: env\(safe-area-inset-bottom, 0px\);/);
  assert.match(sheetStyles, /@media \(prefers-reduced-motion: no-preference\) \{\s*\.sheet\.sheet\[open\] \{\s*animation: sheetIn/);
  // China time stays visible on the phone, under the title.
  assert.match(sheetStyles, /\.sheet \.clock \{\s*display: inline-flex;/);
  for (const size of sheetStyles.matchAll(/font-size: ([0-9.]+)rem/g)) assert.ok(Number(size[1]) >= 0.8125, size[0]);
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

function ruleBody(css, selector) {
  const start = css.indexOf(`\n${selector} {`);
  assert.ok(start >= 0, selector);
  return css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
}

function declaration(body, property) {
  return body.match(new RegExp(`(?:^|;)\\s*${property}:\\s*([^;]+);`))?.[1].trim();
}

test("the first open answers the press at once: the card's frame, then the card in its place", async () => {
  const [host, frame, dialog] = await Promise.all([
    source("components/ContactCardHost.tsx"),
    source("components/ContactCardFrame.ts"),
    source("components/ContactCardDialog.tsx"),
  ]);
  // The card's code still loads only on demand, never with the page.
  assert.match(host, /import type \{ ContactCardDialog as ContactCardDialogComponent \} from "\.\/ContactCardDialog";/);
  assert.match(host, /import\("\.\/ContactCardDialog"\)/);
  assert.doesNotMatch(host, /^import \{[^}]*\} from "\.\/ContactCardDialog";/m);
  // No Suspense boundary: React holds a suspended boundary's content back
  // until 300 ms after its fallback showed, which was the blank first open.
  assert.doesNotMatch(host, /lazy\(|<Suspense/);
  // Idle preload as before, and sooner on the way to a link or control the card answers.
  assert.match(host, /requestIdleCallback\(preloadDialog, \{ timeout: 4000 \}\)/);
  assert.match(host, /setTimeout\(preloadDialog, 2500\)/);
  assert.match(host, /\["pointerover", "pointerdown", "touchstart", "focusin"\]/);
  assert.match(host, /if \(!next \|\| \(!desktop\.matches && next\.trigger !== "planner"\)\) return;/);
  // With the code there the card opens straight away; otherwise the frame opens
  // in the press itself, outside React's commit, goes as the card opens in its
  // place, and a failed load closes it.
  assert.match(host, /if \(loadedDialog\) \{\s*mountCard\(\);\s*setFrameShownAt\(null\);\s*return;\s*\}/);
  assert.match(host, /removeFrameRef\.current = openContactCardFrame\(locale, nextLayout, close\);\s*setFrameShownAt\(performance\.now\(\)\);\s*loadDialog\(\)\.then\(\s*mountCard,/);
  assert.match(host, /useLayoutEffect\(\(\) => \{\s*if \(cardMounted && open\) removeFrame\(\);/);
  assert.match(host, /The code did not arrive[\s\S]*?removeFrame\(\);\s*setOpen\(false\);/);
  // The frame is the card's outer shape: a modal dialog, its close button, no words of its own.
  assert.match(frame, /dialog\.showModal\(\);/);
  assert.match(frame, /close\.setAttribute\("aria-label", copy\.close\);/);
  assert.match(frame, /addEventListener\("cancel", \(event\) => \{\s*event\.preventDefault\(\);\s*onClose\(\);/);
  assert.match(frame, /setAttribute\("aria-busy", "true"\)/);
  assert.match(frame, /return \(\) => \{\s*dialog\.remove\(\);\s*releaseScroll\(\);\s*\};/);
  // The page stops scrolling from the press, under the frame as under the card,
  // and the card takes its hold in the same commit that opens it.
  assert.match(frame, /const releaseScroll = holdPageScroll\(\);[\s\S]*?document\.body\.append\(dialog\);/);
  assert.match(dialog, /useLayoutEffect\(\(\) => \(open \? holdPageScroll\(\) : undefined\), \[open\]\);/);
  assert.doesNotMatch(dialog, /document\.body\.style\.overflow/);
  // Focus goes back to the link in the commit that closes the card, whichever
  // way it opened (the frame's close button, the card's own return target then, is gone).
  assert.doesNotMatch(host, /requestAnimationFrame/);
  assert.match(host, /useLayoutEffect\(\(\) => \{\s*if \(open\) \{\s*shownRef\.current = true;\s*return;\s*\}[\s\S]*?const previous = returnFocusRef\.current;[\s\S]*?target\?\.focus\(\{ preventScroll: true \}\);\s*\}, \[open\]\);/);
  // The card opens before the browser paints and carries on the frame's entrance.
  assert.match(dialog, /useLayoutEffect\(\(\) => \{\s*const dialog = dialogRef\.current;[\s\S]*?dialog\.showModal\(\);[\s\S]*?\.focus\(\{ preventScroll: true \}\);\s*\}, \[open, request, frameShownAt\]\);/);
  assert.match(dialog, /dialog\.style\.setProperty\("--card-enter-delay"/);
  // The guide's "ask a planner" button warms the card up as its links do.
  assert.match(await source("components/TourContactPanel.tsx"), /className=\{styles\.launcher\}[^>]*data-contact-card-trigger=""/);
});

test("the frame is the card's own shape and size, and the card's title and close words have one home", async () => {
  const [card, sheet, frame, copy] = await Promise.all([
    source("components/ContactCard.module.css"),
    source("components/ContactSheet.module.css"),
    source("components/ContactCardFrame.module.css"),
    source("lib/contactCardCopy.ts"),
  ]);
  const same = (from, fromSelector, toSelector, properties) => {
    const a = ruleBody(from, fromSelector), b = ruleBody(frame, toSelector);
    for (const property of properties) {
      assert.equal(declaration(b, property), declaration(a, property), `${toSelector} ${property}`);
    }
  };
  same(card, ".dialog", ".dialog", ["position", "inset", "width", "max-height", "margin", "border-radius", "box-shadow"]);
  same(card, ".dialog::backdrop", ".dialog::backdrop", ["background", "backdrop-filter"]);
  same(card, ".head", ".head", ["gap", "padding"]);
  same(card, ".close", ".close", ["width", "height", "border-radius"]);
  same(sheet, ".sheet.sheet", ".sheet", ["inset", "width", "max-width", "max-height", "margin", "padding-bottom", "border-radius", "box-shadow"]);
  same(sheet, ".grabber", ".grabber", ["width", "height", "margin", "border-radius"]);
  same(sheet, ".sheet .head", ".sheet .head", ["padding"]);
  assert.equal(declaration(ruleBody(frame, ".close"), "background"), "#f2f1ef");
  assert.equal(declaration(ruleBody(frame, ".dialog"), "background"), "#fff");
  // Its entrance is the card's, and only when motion is welcome; the card continues it (negative delay).
  assert.match(frame, /@media \(prefers-reduced-motion: no-preference\) \{\s*\.dialog\[open\] \{\s*animation: cardIn 460ms cubic-bezier\(0\.22, 1, 0\.36, 1\) both;/);
  assert.doesNotMatch(withoutMotionBlocks(frame), /animation:/);
  assert.match(card, /\.dialog\[open\] \{\s*animation: cardIn 460ms var\(--card-ease\) var\(--card-enter-delay, 0s\) both;/);
  assert.match(card, /\.dialog\[open\]::backdrop \{\s*animation: fadeIn 260ms ease-out var\(--card-enter-delay, 0s\) both;/);
  assert.match(sheet, /\.sheet\.sheet\[open\] \{\s*animation: sheetIn 420ms var\(--card-ease\) var\(--card-enter-delay, 0s\) both;/);
  // Every page carries the frame, so it stays small.
  assert.ok(frame.length < 4_000, `${frame.length} bytes`);
  for (const locale of locales) {
    assert.match(copy, new RegExp(`${locale}: \\{\\s*\\.\\.\\.contactCardFrameCopy\\.${locale},`));
    assert.ok(contactCardFrameCopy[locale].title && contactCardFrameCopy[locale].close, locale);
  }
});

test("the card's QR code is drawn just after the card first paints, in a square that is there from the start", async () => {
  const [qr, scan, dialog, inline] = await Promise.all([
    source("components/WhatsAppQr.tsx"),
    source("components/ContactCardScan.tsx"),
    source("components/ContactCardDialog.tsx"),
    source("components/ContactCardInlineScan.tsx"),
  ]);
  // Only the card waits: the homepage contact board (WhatsApp and Messenger)
  // draws its codes as they render, as it always has.
  assert.match(qr, /drawAfterPaint \? <QrCodeAfterPaint href=\{href\} label=\{label\} \/> : <QrCode code=\{drawCode\(href\)\} label=\{label\} \/>/);
  assert.match(qr, /drawAfterPaint = false/);
  assert.match(scan, /drawQrAfterPaint = false,/);
  assert.match(scan, /<WhatsAppQr href=\{href\} label=\{[^}]*\} drawAfterPaint=\{drawQrAfterPaint\} \/>/);
  assert.match(dialog, /<ContactCardScan locale=\{locale\} href=\{whatsappHref\} headingId=\{`\$\{id\}-scan`\} drawQrAfterPaint>/);
  assert.doesNotMatch(inline, /drawQrAfterPaint/);
  assert.match(qr, /useEffect\(\(\) => \{[\s\S]*?requestAnimationFrame\([\s\S]*?setTimeout\(\(\) => setDrawn\(true\)\)/);
  assert.match(qr, /const code = useMemo\(\(\) => \(drawn \? drawCode\(href\) : null\), \[drawn, href\]\);/);
  // The same svg element throughout (its reveal keeps running), labelled from the start.
  assert.match(qr, /<svg\s+viewBox=\{code \? `0 0 \$\{code\.size\} \$\{code\.size\}` : "0 0 1 1"\}\s+role="img"\s+aria-label=\{label\}/);
});

test("the page stops scrolling while the frame or the card is up, and gets its own overflow back after both", () => {
  const previous = globalThis.document;
  globalThis.document = { body: { style: { overflow: "clip" } } };
  try {
    const style = globalThis.document.body.style;
    // The frame holds first, the card takes over, then the frame lets go.
    const releaseFrame = holdPageScroll();
    assert.equal(style.overflow, "hidden");
    const releaseCard = holdPageScroll();
    releaseFrame();
    assert.equal(style.overflow, "hidden");
    releaseFrame();
    assert.equal(style.overflow, "hidden", "releasing the same hold twice does nothing");
    releaseCard();
    assert.equal(style.overflow, "clip");
    // A frame closed before the card arrived.
    const releaseAlone = holdPageScroll();
    assert.equal(style.overflow, "hidden");
    releaseAlone();
    assert.equal(style.overflow, "clip");
  } finally {
    globalThis.document = previous;
  }
});

test("the frame is as tall as the card or sheet that replaces it, at every width", async () => {
  const frame = await source("components/ContactCardFrame.ts");
  const table = (name) => {
    const start = frame.indexOf(`const ${name}`);
    const body = frame.slice(start, frame.indexOf("};", start));
    return Object.fromEntries(locales.map((locale) => [locale, JSON.parse(body.match(new RegExp(`${locale}: (\\[.*\\]),`))[1])]));
  };
  const steps = table("sheetSteps");
  const heights = table("sheetHeights");
  for (const locale of locales) {
    // Rising widths below the sheet's 36rem, and a height before the first step and from each on.
    assert.deepEqual([...steps[locale]].sort((a, b) => a - b), steps[locale], locale);
    assert.ok(steps[locale].every((at) => at > 320 && at < 576), locale);
    assert.equal(heights[locale].length, steps[locale].length + 1, locale);
    // Lower as it widens; the line naming a tour or guide adds to each.
    for (let index = 1; index < heights[locale].length; index += 1) {
      assert.ok(heights[locale][index][0] < heights[locale][index - 1][0], locale);
    }
    assert.ok(heights[locale].every(([without, withLine]) => withLine > without), locale);
  }
  assert.match(frame, /const cardHeight = \[537, 579\];/);
  assert.match(frame, /dialog\.style\.setProperty\("--frame-height", `\$\{frameHeight\(locale, layout, named\)\}px`\);/);
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
