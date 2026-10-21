import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS as days } from "../../lib/attractionReservationGuarantee.ts";
import { getAttractionReservationCopy } from "../../lib/attractionReservationsI18n.ts";
import { getAttractionReservationEditionCopy } from "../../lib/attractionReservationEditions.ts";
import { guideReservationOfferTranslations } from "../../lib/guideReservationOfferTranslations.ts";

/**
 * Owner decision, 2026-10-22: the attraction reservation guarantee applies only
 * when the request, the payment and complete passport details for every
 * traveller all reach Homeground at least ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS
 * days before the visit. Every language's statement of the guarantee names all
 * three, and every "when do I send passport details" answer gives the same
 * deadline after the written confirmation.
 */

const root = path.resolve(import.meta.dirname, "../..");
const require = createRequire(import.meta.url);
const locales = ["en", "zh", "ko", "ja", "fr", "es", "de", "ar"];
const primary = new Set(["en", "zh", "ko"]);
const copyFor = (locale) => primary.has(locale) ? getAttractionReservationCopy(locale) : getAttractionReservationEditionCopy(locale);

const lead = {
  en: new RegExp(`at least ${days} days`, "u"),
  zh: new RegExp(`至少(?:提前)? ${days} 天`, "u"),
  ko: new RegExp(`최소 ${days}일 전`, "u"),
  ja: new RegExp(`${days} ?日前まで`, "u"),
  fr: new RegExp(`au moins ${days} jours`, "u"),
  es: new RegExp(`al menos ${days} días`, "u"),
  de: new RegExp(`mindestens ${days} Tage`, "u"),
  ar: new RegExp(`بما لا يقل عن ${days} أيام`, "u"),
};
const request = { en: /request/iu, zh: /提交需求/u, ko: /요청/u, ja: /ご依頼/u, fr: /demande/iu, es: /solicitud|encarg|pide/iu, de: /Anfrage/u, ar: /الطلب/u };
const payment = { en: /\bpa(?:y|yment)\b/iu, zh: /付款/u, ko: /결제/u, ja: /お支払い/u, fr: /paiement|réglez/iu, es: /\bpag(?:o|a|as)\b/iu, de: /Zahlung/u, ar: /الدفع/u };
const passport = { en: /passport details/u, zh: /护照信息/u, ko: /여권 정보/u, ja: /パスポート情報/u, fr: /passeport/u, es: /pasaporte/u, de: /Pass(?:daten|angaben)/u, ar: /جواز/u };
const everyTraveller = { en: /every traveller/u, zh: /每位游客/u, ko: /모든 여행자/u, ja: /全員/u, fr: /chaque voyageur/u, es: /cada viajero/u, de: /aller Reisenden/u, ar: /جميع المسافرين/u };
/** "No later than N days before the visit" for the passport deadline. */
const deadline = {
  en: new RegExp(`no later than ${days} days before`, "u"),
  zh: new RegExp(`不晚于参观日前 ${days} 天`, "u"),
  ko: new RegExp(`늦어도 방문일 ${days}일 전까지`, "u"),
  ja: new RegExp(`遅くとも訪問日の${days}日前まで`, "u"),
  fr: new RegExp(`au plus tard ${days} jours avant`, "u"),
  es: new RegExp(`a más tardar ${days} días antes`, "u"),
  de: new RegExp(`spätestens ${days} Tage vor`, "u"),
  ar: new RegExp(`قبل الزيارة بما لا يقل عن ${days} أيام`, "u"),
};
const writtenConfirmation = { en: /written confirmation/u, zh: /书面确认/u, ko: /서면 확인/u, ja: /書面/u, fr: /confirmation écrite/u, es: /confirmación escrita/u, de: /schriftliche/u, ar: /(?:التأكيد|تأكيدنا) (?:الكتابي|المكتوب)/u };
const passportFaq = {
  en: /When do I send passport details/u, zh: /什么时候提供护照信息/u, ko: /여권 정보는 언제/u, ja: /フォームでパスポート番号を聞かない/u,
  fr: /ne demande-t-il pas mon numéro de passeport/u, es: /no pide mi número de pasaporte/u, de: /Passnummer nicht im Formular/u, ar: /لا يطلب النموذج رقم جوازي/u,
};
/** The opening words of the full guarantee sentence in the legal copy. */
const legalGuaranteeOpening = {
  en: /^Guaranteed booking: /u, zh: /^预约保证：/u, ko: /^예약 보장: /u, ja: /^予約保証：/u,
  fr: /^Réservation garantie : /u, es: /^Reserva garantizada: /u, de: /^Garantierte Reservierung: /u, ar: /^حجز مضمون: /u,
};

function assertNamesAllThree(text, locale, where) {
  assert.match(text, lead[locale], `${locale} ${where}: ${days}-day lead`);
  assert.match(text, request[locale], `${locale} ${where}: request`);
  assert.match(text, payment[locale], `${locale} ${where}: payment`);
  assert.match(text, passport[locale], `${locale} ${where}: passport details`);
  assert.match(text, everyTraveller[locale], `${locale} ${where}: every traveller`);
}

/** Loads a TypeScript module and its relative imports (some legal modules import without extensions). */
function loadModule(relative, cache = new Map()) {
  const absolute = path.resolve(root, relative);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  if (absolute.endsWith(".json")) return JSON.parse(readFileSync(absolute, "utf8"));
  const module = { exports: {} };
  cache.set(absolute, module);
  const code = ts.transpileModule(readFileSync(absolute, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports, process, URL, URLSearchParams, Intl,
    require(id) {
      if (!id.startsWith(".")) return require(id);
      const base = path.resolve(path.dirname(absolute), id);
      const resolved = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`].find((candidate) => existsSync(candidate) && !candidate.endsWith(path.sep));
      assert.ok(resolved, `Cannot resolve ${id} from ${relative}`);
      return loadModule(path.relative(root, resolved), cache);
    },
  }, { filename: relative });
  return module.exports;
}

function legalCopy(locale, pageId) {
  if (primary.has(locale)) return loadModule("lib/homegroundLegalI18n.ts").getHomegroundLegalCopy(pageId, locale);
  if (locale === "ja") return loadModule("lib/japaneseLegalCopy.ts").getJapaneseLegalCopy(pageId);
  const getters = { fr: ["lib/frenchLegalCopy.ts", "getFrenchLegalCopy"], es: ["lib/spanishLegalCopy.ts", "getSpanishLegalCopy"], de: ["lib/germanLegalCopy.ts", "getGermanLegalCopy"], ar: ["lib/arabicLegalCopy.ts", "getArabicLegalCopy"] };
  const [file, getter] = getters[locale];
  return loadModule(file)[getter](pageId);
}

const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];

test("every language's guarantee statement names the request, payment and every traveller's passport details with the same lead", () => {
  assert.equal(days, 8, "the owner kept the eight-day lead");
  for (const locale of locales) {
    const copy = copyFor(locale);
    assertNamesAllThree(copy.guarantee, locale, "guarantee");
    assertNamesAllThree(copy.timingRows[1].body, locale, "guaranteed timing row");
    assertNamesAllThree(copy.heroUrgency, locale, "hero urgency");
    assertNamesAllThree(copy.guideCta.body, locale, "guide CTA");
    assertNamesAllThree(copy.guideCta.bodyPassportUnchecked, locale, "guide CTA (passport unchecked)");
    if (copy.metadata.description.includes(String(days))) {
      assert.match(copy.metadata.description, passport[locale], `${locale}: metadata description names passport details`);
    }
    assert.match(copy.guaranteeLate, passport[locale], `${locale}: a late passport is covered by the late-request rule`);
    assert.ok(copy.guaranteeLate.includes(String(days)), `${locale}: late rule keeps the same lead`);
    const guaranteeFaq = copy.faqs.find((item) => item.answer.startsWith(copy.guarantee));
    assert.ok(guaranteeFaq, `${locale}: the guarantee FAQ repeats the guarantee`);

    const offerLine = guideReservationOfferTranslations[locale]?.guarantee.replace("{days}", String(days));
    if (offerLine) assertNamesAllThree(offerLine, locale, "guide offer card");
  }
});

test("every 'when do I send passport details' answer says after the written confirmation and by the guarantee deadline", () => {
  for (const locale of locales) {
    const copy = copyFor(locale);
    const faq = copy.faqs.find((item) => passportFaq[locale].test(item.question));
    assert.ok(faq, `${locale}: passport timing FAQ`);
    for (const [where, text] of [["FAQ", faq.answer], ["passport section", copy.passportBody]]) {
      assert.match(text, writtenConfirmation[locale], `${locale} ${where}: after the written confirmation`);
      assert.match(text, deadline[locale], `${locale} ${where}: no later than ${days} days before the visit`);
    }
  }
});

test("terms and refund pages in every language state the three-part guarantee and the passport deadline", () => {
  for (const locale of locales) {
    for (const pageId of ["terms", "refund-delivery"]) {
      const section = legalCopy(locale, pageId).sections.find((item) => item.id === "attraction-reservations");
      assert.ok(section, `${locale} ${pageId}: attraction reservation section`);
      const texts = strings(section);
      const guarantee = texts.filter((text) => legalGuaranteeOpening[locale].test(text));
      assert.equal(guarantee.length, 1, `${locale} ${pageId}: one guarantee statement`);
      assertNamesAllThree(guarantee[0], locale, `${pageId} guarantee`);
      if (pageId === "terms") {
        const passportLine = texts.find((text) => writtenConfirmation[locale].test(text) && deadline[locale].test(text));
        assert.ok(passportLine, `${locale} terms: passport details after written confirmation and by the deadline`);
      } else {
        const guaranteeCardTitle = section.cards?.find((card) => card.body === guarantee[0])?.title
          ?? section.bullets?.find((item) => typeof item === "object" && item.body === guarantee[0])?.title;
        if (guaranteeCardTitle) assert.match(guaranteeCardTitle, passport[locale], `${locale} refund: the guaranteed row title names passport details`);
      }
    }
  }
});
