import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { getGuideLanguagePaths, guideRegistry } from "../../lib/guideRegistry.ts";
import { validateAndNormalizeInquiry } from "../../lib/inquiryContract.ts";
import {
  currentHomepageEmailFormVersion,
  currentPrivateTourQuoteFormVersion,
  homepageEmailInquirySchemaVersion,
  privateTourQuoteSchemaVersion,
  travellerAckPrivacyNoticeVersion,
} from "../../lib/inquiryVersions.ts";
import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySubmissionContext,
} from "../../lib/privateTourInquiryContext.ts";
import {
  spanishContactEdition,
  spanishContactPackageLabels,
  spanishContactTourNames,
} from "../../lib/spanishContactEdition.ts";
import { tourContactNote, tourContactNoteMaxLength } from "../../lib/tourContactDraft.ts";
import { localizeSpanishPrivateTourProduct } from "../../lib/localizeSpanishPrivateTourProduct.ts";
import { getPrivateTourProduct, localizePrivateTourProduct } from "../../lib/privateTourProducts.ts";
import {
  spanishGuidePathBySourceId,
  spanishTourPagePath,
  spanishTourPageSlugs,
} from "../../lib/spanishEditionIndex.ts";
import { spanishGuidePath, spanishGuides } from "../../lib/spanishGuides.ts";
import { getSpanishTourCopy, spanishTourPath, spanishTourSlugs } from "../../lib/spanishTourCopy.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function spanishTour(slug) {
  const product = getPrivateTourProduct(slug);
  assert.ok(product, `no source product for ${slug}`);
  return { product, source: localizePrivateTourProduct(product, "en"), spanish: localizeSpanishPrivateTourProduct(product) };
}

test("the Spanish page index matches the Spanish tour copy and the Spanish guides", () => {
  assert.deepEqual([...spanishTourPageSlugs], [...spanishTourSlugs]);
  assert.deepEqual(
    { ...spanishGuidePathBySourceId },
    Object.fromEntries(
      spanishGuides
        .filter((guide) => guide.sourceGuideId)
        .map((guide) => [guide.sourceGuideId, spanishGuidePath(guide.slug)]),
    ),
  );
  // The guide registry carries its own copy of the list for the hreflang link.
  const registryLinks = Object.fromEntries(
    [...new Set(guideRegistry.map((guide) => guide.id))]
      .map((id) => [id, getGuideLanguagePaths(id).es])
      .filter(([, path]) => path),
  );
  assert.deepEqual(registryLinks, { ...spanishGuidePathBySourceId });
  for (const slug of spanishTourSlugs) assert.equal(spanishTourPagePath(slug), spanishTourPath(slug));
  assert.equal(spanishTourPagePath("harbin-winter-5-day-private-tour"), undefined);
});

test("every Spanish tour keeps the source days, photographs, options and published prices", () => {
  for (const slug of spanishTourSlugs) {
    const { source, spanish } = spanishTour(slug);
    assert.equal(spanish.path, `/es/tours/${slug}/`);
    assert.equal(spanish.itinerary.length, source.itinerary.length, slug);
    assert.deepEqual(spanish.itinerary.map((day) => day.day), source.itinerary.map((day) => day.day), slug);
    assert.deepEqual(
      spanish.routeMedia.map((group) => group.variants.map((variant) => variant.image.src)),
      source.routeMedia.map((group) => group.variants.map((variant) => variant.image.src)),
      slug,
    );
    assert.deepEqual(
      spanish.packages.map((item) => item.rows.map((row) => [row.travelers, row.amount, row.currency])),
      source.packages.map((item) => item.rows.map((row) => [row.travelers, row.amount, row.currency])),
      slug,
    );
    for (const row of spanish.packages.flatMap((item) => item.rows)) {
      assert.match(row.formatted, /^\d{1,3}(?:\.\d{3})* USD$/, `${slug}: ${row.formatted}`);
    }
  }
});

test("Spanish tour text quotes only this tour's published prices", () => {
  for (const slug of spanishTourSlugs) {
    const { spanish } = spanishTour(slug);
    const rows = spanish.packages.flatMap((item) => item.rows);
    const allowed = new Set(rows.map((row) => row.amount));
    for (const row of rows) if (row.travelers === 2) allowed.add(row.amount * 2);
    const text = JSON.stringify(getSpanishTourCopy(slug));
    const quoted = [...text.matchAll(/(\d{1,3}(?:\.\d{3})*) USD/g)].map((match) => Number(match[1].replaceAll(".", "")));
    for (const amount of quoted) assert.ok(allowed.has(amount), `${slug} quotes ${amount} USD, which is not a published price`);
    assert.doesNotMatch(text, /USD \d/, `${slug} writes the currency before the amount`);
  }
});

test("Spanish tours say which guide the price includes and never promise another language at the same price", () => {
  for (const slug of spanishTourSlugs) {
    const copy = getSpanishTourCopy(slug);
    assert.match(copy.serviceNote, /habla inglesa/, slug);
    assert.match(copy.serviceNote, /guía de habla hispana con suplemento/, slug);
    assert.doesNotMatch(JSON.stringify(copy), /coreano|Korean/i, slug);
  }
});

test("Spanish search titles and descriptions fit the result page", () => {
  for (const slug of spanishTourSlugs) {
    const copy = getSpanishTourCopy(slug);
    assert.ok(copy.metadataTitle.length <= 60, `${slug} title is ${copy.metadataTitle.length}`);
    assert.ok(copy.metadataDescription.length <= 160, `${slug} description is ${copy.metadataDescription.length}`);
  }
  for (const guide of spanishGuides) {
    assert.ok(guide.title.length <= 60, `${guide.slug} title is ${guide.title.length}`);
    assert.ok(guide.description.length <= 160, `${guide.slug} description is ${guide.description.length}`);
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test("Spanish guides link only to pages that exist and name their sources", () => {
  const spanishPaths = new Set([
    "/es/",
    "/es/tours/",
    "/es/guias/",
    ...spanishTourSlugs.map(spanishTourPath),
    ...spanishGuides.map((guide) => spanishGuidePath(guide.slug)),
  ]);
  for (const guide of spanishGuides) {
    assert.ok(guide.tourSlugs.length > 0, `${guide.slug} leads to no tour`);
    for (const slug of guide.tourSlugs) assert.ok(spanishTourSlugs.includes(slug), `${guide.slug} → ${slug}`);
    assert.ok(existsSync(resolve(root, "public", guide.heroImage.src.slice(1))), `${guide.slug} hero image`);
    const ids = guide.body.blocks.map((block) => block.id);
    assert.equal(new Set(ids).size, ids.length, `${guide.slug} repeats a block id`);
    assert.equal(guide.body.blocks[0].type, "lead");
    assert.ok(guide.body.blocks.some((block) => block.type === "faq"), `${guide.slug} has no FAQ`);
    const sources = guide.body.blocks.find((block) => block.type === "sources");
    assert.ok(sources && sources.items.length >= 3, `${guide.slug} has too few sources`);
    for (const block of guide.body.blocks) {
      if (block.type === "figure") {
        assert.ok(existsSync(resolve(root, "public", block.src.slice(1))), `${guide.slug}: ${block.src}`);
      }
      if (block.type !== "internal-links") continue;
      for (const item of block.items) {
        if (item.href.startsWith("/es/")) {
          assert.ok(spanishPaths.has(item.href), `${guide.slug} links a missing Spanish page: ${item.href}`);
        } else {
          // A link that leaves the Spanish pages says so.
          assert.match(item.label, /\(en inglés\)$/, `${guide.slug}: ${item.href}`);
        }
      }
    }
  }
});

test("the language switch offers Spanish on the home page, the lists, the guides with a Spanish page and every tour page", () => {
  const read = (file) => readFileSync(resolve(root, file), "utf8");
  const header = read("components/HomegroundHeader.tsx");
  // Once in the desktop switch and once in the mobile menu.
  assert.equal(header.match(/\{renderSpanishLanguageChoice\(\)\}/g)?.length, 2);
  assert.match(header, /const spanishLanguageHref = languagePaths\?\.es;/);
  assert.match(header, /hrefLang="es"\s+lang="es"/);
  assert.match(read("components/HomegroundHomePage.tsx"), /languagePaths=\{\{[^}]*es: "\/es\/"/);
  // A tour with a Spanish page opens it; any other tour opens the Spanish tour list.
  assert.match(
    read("components/ShanghaiJiangnanImaginePage.tsx"),
    /es: spanishTourPagePath\(product\.slug\) \?\? spanishSite\.tours,/,
  );
  const css = read("components/HomegroundHeader.module.css");
  assert.match(css, /\.mobileLanguageNav:has\(> a:nth-child\(5\)\)\s*\{\s*grid-template-columns: repeat\(5,/);
});

test("the contact flow names every Spanish tour and option as its Spanish page does", () => {
  assert.deepEqual(Object.keys(spanishContactTourNames), [...spanishTourSlugs]);
  for (const slug of spanishTourSlugs) {
    const { spanish } = spanishTour(slug);
    assert.equal(spanishContactTourNames[slug], spanish.title, slug);
    assert.equal(spanishContactEdition.tourPath(slug), spanishTourPath(slug));
    assert.equal(spanishContactEdition.tourSlugFromPath(spanishTourPath(slug)), slug);
    for (const tourPackage of spanish.packages) {
      assert.equal(spanishContactPackageLabels[tourPackage.id], tourPackage.label, `${slug} ${tourPackage.id}`);
      for (const row of tourPackage.rows) {
        const context = getPrivateTourInquiryContext(slug, "en", { packageId: tourPackage.id, travelers: row.travelers });
        assert.ok(context, `${slug} ${tourPackage.id} ${row.travelers}`);
        assert.equal(spanishContactEdition.tourName(context), spanish.title);
        assert.equal(spanishContactEdition.selectionLabel(context), `${tourPackage.label} · ${row.travelers} viajeros`);
      }
    }
  }
  for (const guide of spanishGuides) {
    assert.ok(spanishContactEdition.isGuidePath(spanishGuidePath(guide.slug)), guide.slug);
  }
  // English pages are not the Spanish edition's.
  assert.equal(spanishContactEdition.tourSlugFromPath("/tours/beijing-highlights-5-day-private-tour/"), null);
  assert.equal(spanishContactEdition.isGuidePath("/guides/how-to-pay-in-china-as-a-tourist/"), false);

  // The loading frame's heights: lower as the sheet widens, taller with the line naming a tour or guide.
  const { sheetSteps, sheetHeights } = spanishContactEdition;
  assert.deepEqual([...sheetSteps].sort((a, b) => a - b), [...sheetSteps]);
  assert.ok(sheetSteps.every((at) => at > 320 && at < 576));
  assert.equal(sheetHeights.length, sheetSteps.length + 1);
  for (let index = 1; index < sheetHeights.length; index += 1) {
    assert.ok(sheetHeights[index][0] < sheetHeights[index - 1][0]);
  }
  assert.ok(sheetHeights.every(([without, withLine]) => withLine > without));

  const words = (value) => typeof value === "string" ? [value] : Array.isArray(value) ? value : [];
  for (const group of ["frame", "card", "desk", "tourContact", "direct", "quote", "fieldErrors", "labels", "date", "receipt"]) {
    for (const [key, value] of Object.entries(spanishContactEdition[group])) {
      for (const text of words(value)) assert.ok(text.trim(), `${group}.${key} is empty`);
    }
  }
});

test("an enquiry saved from a Spanish page passes the intake contract and a quote says which page it came from", () => {
  const config = {
    allowedFormVersions: [currentPrivateTourQuoteFormVersion, currentHomepageEmailFormVersion],
    allowedPrivacyNoticeVersions: [travellerAckPrivacyNoticeVersion],
  };
  const common = {
    locale: "en",
    contact: { channel: "email", email: "traveller@example.com" },
    privacyNoticeVersion: travellerAckPrivacyNoticeVersion,
    experiment: null,
    antiAbuse: { companyWebsite: "" },
  };
  for (const slug of spanishTourSlugs) {
    const { spanish } = spanishTour(slug);
    const tourPackage = spanish.packages[0];
    const context = getPrivateTourInquiryContext(slug, "en", { packageId: tourPackage.id, travelers: tourPackage.rows[0].travelers });
    const marker = spanishContactEdition.noteMarker(spanishTourPath(slug));
    assert.ok(marker.includes(`https://homegroundchina.com/es/tours/${slug}/`), slug);
    assert.match(marker, /Spanish/);
    // The longest note the Spanish form accepts, with the traveller's own source line.
    const longest = "x".repeat(tourContactNoteMaxLength - marker.length - 2);
    const quote = validateAndNormalizeInquiry({
      ...common,
      schemaVersion: privateTourQuoteSchemaVersion,
      formVersion: currentPrivateTourQuoteFormVersion,
      entryPath: "private_tour_quote",
      productInterest: getPrivateTourInquirySubmissionContext(context, "en"),
      travelDate: "2027-03-12",
      note: [marker, tourContactNote(longest, "Instagram")].join("\n\n"),
      attribution: { landingPath: `/tours/${slug}/` },
    }, config);
    assert.equal(quote.ok, true, `${slug}: ${JSON.stringify(quote.fieldErrors ?? {})}`);
    assert.ok(quote.value.note.startsWith(marker), slug);

    const emailOnly = validateAndNormalizeInquiry({
      ...common,
      schemaVersion: homepageEmailInquirySchemaVersion,
      formVersion: currentHomepageEmailFormVersion,
      entryPath: "homepage_email",
      productInterest: getPrivateTourInquirySubmissionContext(getPrivateTourInquiryContext(slug, "en"), "en"),
      attribution: { landingPath: "/" },
    }, config);
    assert.equal(emailOnly.ok, true, `${slug}: ${JSON.stringify(emailOnly.fieldErrors ?? {})}`);
  }
});

test("Spanish pages mount the main contact flow and their buttons open it", () => {
  const read = (file) => readFileSync(resolve(root, file), "utf8");
  assert.match(read("app/(spanish)/es/layout.tsx"), /<body>\{children\}<SpanishContactHost \/><\/body>/);
  const host = read("components/SpanishContactHost.tsx");
  assert.match(host, /<TourContactPanel locale="en" edition=\{spanishContactEdition\} \/>/);
  assert.match(host, /<ContactCardHost locale="en" edition=\{spanishContactEdition\} \/>/);

  // The header button is the planner link the contact card answers; the home
  // page's contact section answers it without JavaScript.
  assert.match(read("lib/spanishSite.ts"), /contact: "\/es\/#planner-contact",/);
  assert.equal(spanishContactEdition.homePath, "/es/");
  assert.match(read("components/SpanishHomePage.tsx"), /id="planner-contact"/);
  const chrome = read("components/SpanishChrome.tsx");
  assert.match(chrome, /contactHref = spanishSite\.contact,/);
  assert.match(chrome, /href=\{contactHref\} onClick=\{openTourQuote\}/);

  // On a tour page the buttons open that tour's quote dialog; "another group
  // size" on the Zhangjiajie tours asks for the group, as on the main pages.
  const links = read("components/JapaneseJiangnanInteraction.tsx");
  assert.match(links, /startsWith\("\/es\/"\)\) \{[\s\S]*?openTourContactForContext\(event, getPrivateTourInquiryContext\(/);
  assert.match(links, /const customGroup = otherGroup && isZhangjiajieCustomGroupTour\(slug\);/);

  // Drafts are written in Spanish and point at the Spanish page.
  const context = getPrivateTourInquiryContext("guilin-yangshuo-5-day-private-tour", "en", { packageId: "standard-guided", travelers: 2 });
  const message = spanishContactEdition.messageText(context, undefined, { travelDate: "2027-03-12", note: "Dos habitaciones" });
  assert.deepEqual(message.split("\n"), [
    "Hola. Me gustaría organizar un viaje privado a China.",
    "Guilin y Yangshuo: viaje privado de 5 días",
    "Viaje privado · 2 viajeros",
    "https://homegroundchina.com/es/tours/guilin-yangshuo-5-day-private-tour/",
    "Llegada prevista: 2027-03-12",
    "Detalles del viaje: Dos habitaciones",
    "Idioma del guía (inglés, o español con suplemento):",
  ]);
  const mail = new URL(spanishContactEdition.mailtoHref(context));
  assert.equal(mail.pathname, "hello@homegroundchina.com");
  assert.equal(mail.searchParams.get("subject"), "Consulta de viaje privado: Guilin y Yangshuo: viaje privado de 5 días");
  // A guide's general message names the guide and its Spanish page.
  const general = spanishContactEdition.messageText(null, "/es/guias/yangshuo-que-ver/");
  assert.ok(general.includes("https://homegroundchina.com/es/guias/yangshuo-que-ver/"));
  assert.equal(spanishContactEdition.messageText(null, "/es/").includes("homegroundchina.com"), false);
});
