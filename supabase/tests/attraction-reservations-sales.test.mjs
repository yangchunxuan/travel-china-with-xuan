import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire, stripTypeScriptTypes } from "node:module";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import vm from "node:vm";
import ts from "typescript";

import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS as days } from "../../lib/attractionReservationGuarantee.ts";
import { getAttractionReservationCopy } from "../../lib/attractionReservationsI18n.ts";
import { getAttractionReservationEditionCopy, getAttractionReservationEditionRule, formatAttractionReservationEditionMoney } from "../../lib/attractionReservationEditions.ts";
import { attractionReservationRules, attractionReservationServiceFeeCny } from "../../lib/attractionReservations.ts";
import { attractionReservationMailtoHref, attractionReservationMessageText } from "../../lib/attractionReservationMessage.ts";
import { appendVisitRefToContactHref } from "../../lib/visitRef.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = async (file) => (await readFile(path.join(projectRoot, file), "utf8")).replaceAll("\r\n", "\n");
const locales = ["en", "zh", "ko", "fr", "es", "de", "ar"];
const primaryLocales = new Set(["en", "zh", "ko"]);
const copyFor = (locale) => primaryLocales.has(locale) ? getAttractionReservationCopy(locale) : getAttractionReservationEditionCopy(locale);
const textValues = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(textValues) : [];

// Policy concepts are checked independently of the copy's sentence order.
const policy = {
  en: {
    asap: /as soon as|dates are fixed/iu, requestAndPay: /request and (?:payment|pay)/iu,
    exception: /best effort.*excluded|except.*best effort/iu,
    fullRefund: /full refund|refunded in full/iu, feeAndTicket: /service fee and ticket money/iu,
    try: /still try|attempt/iu, noGuarantee: /not guaranteed|cannot guarantee/iu,
    unusedTicket: /ticket money not spent|unspent ticket money/iu,
    early: /at least/iu, late: /less than/iu, releasePassed: /release.*may have passed/iu, lateFullService: /service fee.*refunded in full|refund.*service fee.*in full/iu,
    faceValue: /face value.*no mark-up/isu,
    bothAmounts: /both are refunded in full/iu,
    nonRefundable: /service fee.*not refundable/iu, writtenBeforePay: /pay only after.*written confirmation|paid.*after.*confirm in writing/iu,
    bookingIntent: /I'd like you to book/iu, noCompletedPurchase: /\bI(?:'ve| have) (?:already )?paid\b|my (?:booking|reservation) is confirmed/iu,
  },
  zh: {
    asap: /日期.*确定/u, requestAndPay: /提交需求并完成付款/u, exception: /尽力预约.*除外/u,
    fullRefund: /全额退还/u, feeAndTicket: /服务费和门票款/u, try: /仍会尽力/u, noGuarantee: /不作保证/u,
    unusedTicket: /未使用的门票款/u, nonRefundable: /服务费不予退还/u, writtenBeforePay: /书面确认后才付款|书面确认后一起支付/u,
    early: /至少/u, late: /不足/u, releasePassed: /放票时间可能已过/u, lateFullService: /全额退还该景点的服务费/u, faceValue: /票面价.*不加价/su,
    bothAmounts: /两(?:者|项费用)全额退还/u,
    bookingIntent: /想请你们安排/u, noCompletedPurchase: /我(?:已|已经)(?:经)?(?:付款|支付)|预约已确认/u,
  },
  ko: {
    asap: /날짜.*정해/u, requestAndPay: /요청과 결제/u, exception: /최선 시도.*제외/u,
    fullRefund: /전액.*환불/u, feeAndTicket: /수수료와 입장료/u, try: /시도/u, noGuarantee: /보장하지/u,
    unusedTicket: /사용하지 않은 입장료/u, nonRefundable: /수수료는 환불되지/u, writtenBeforePay: /서면 확인.*뒤에만 결제|서면 확인 후.*결제/u,
    early: /최소/u, late: /미만/u, releasePassed: /예약 오픈이 이미 지났/u, lateFullService: /수수료 전액/u, faceValue: /공식 가격 그대로.*추가 금액 없음/su,
    bothAmounts: /둘 다 전액 환불/u,
    bookingIntent: /입장권 예약을 부탁/u, noCompletedPurchase: /결제(?:를)? (?:완료했|했습니다)|예약이 확정되었/u,
  },
  fr: {
    asap: /dès que.*dates|dates.*fix/iu, requestAndPay: /demande.*paiement/iu, exception: /sauf.*sans garantie/iu,
    fullRefund: /rembours.*intégralement|intégralement.*rembours/iu, feeAndTicket: /frais de service et le montant du billet/iu,
    try: /tentons|essayons/iu, noGuarantee: /sans.*garant/iu, unusedTicket: /billets?.*(?:non utilisé|pas été utilisé)/iu,
    early: /^au moins/iu, late: /^moins de/iu, releasePassed: /mise en vente.*déjà être passée/iu, lateFullService: /frais de service.*remboursés intégralement/iu, faceValue: /(?:tarif|prix) officiel.*sans majoration/isu,
    bothAmounts: /deux montants.*intégralement|intégralement.*deux montants/iu,
    nonRefundable: /frais de service.*ne sont (?:alors )?(?:plus|pas) remboursables/iu,
    writtenBeforePay: /payez.*après.*confirmation écrite|payés.*après.*confirmation écrite/iu,
    bookingIntent: /souhaite.*réserv|voudrais.*réserv/iu, noCompletedPurchase: /j’ai déjà payé|ma réservation est confirmée/iu,
  },
  es: {
    asap: /en cuanto.*fechas|fechas.*(?:fijad|definid|decidid)/iu, requestAndPay: /solicitud.*pago/iu, exception: /salvo.*sin garantía/iu,
    fullRefund: /devolvemos.*íntegramente|reembols.*íntegramente/iu, feeAndTicket: /gastos de gestión y el importe de la entrada/iu,
    try: /intentamos/iu, noGuarantee: /sin.*garant|no.*garant/iu, unusedTicket: /entradas?.*no.*utilizad/iu,
    early: /^al menos/iu, late: /^menos de/iu, releasePassed: /venta.*puede haber abierto ya/iu, lateFullService: /devolvemos íntegramente los gastos de gestión/iu, faceValue: /precio oficial.*sin recargo/isu,
    bothAmounts: /ambos importes.*íntegramente|íntegramente.*ambos importes/iu,
    nonRefundable: /gastos de gestión.*no (?:son|serán).*reembolsables/iu,
    writtenBeforePay: /pagas.*después.*confirmación escrita|pagan.*después.*confirmación escrita/iu,
    bookingIntent: /quiero.*reserv|gustaría.*reserv/iu, noCompletedPurchase: /ya he pagado|mi reserva está confirmada/iu,
  },
  de: {
    asap: /sobald.*Daten|Daten.*feststeh/iu, requestAndPay: /Anfrage.*Zahlung/iu, exception: /außer.*nicht garantiert/iu,
    fullRefund: /erstatten.*vollständig/iu, feeAndTicket: /Servicegebühr und den Ticketbetrag/iu,
    try: /versuchen/iu, noGuarantee: /ohne Garantie/iu, unusedTicket: /nicht verwendete Ticketbeträge/iu,
    early: /^mindestens/iu, late: /^weniger als/iu, releasePassed: /bereits freigegeben worden sein/iu, lateFullService: /Servicegebühr.*vollständig/iu, faceValue: /offiziellen Preis.*ohne Aufschlag/isu,
    bothAmounts: /beide Beträge.*vollständig|vollständig.*beide Beträge/iu,
    nonRefundable: /Servicegebühr.*nicht mehr erstattet/iu, writtenBeforePay: /zahlen.*nach.*schriftlichen Bestätigung|bezahlt.*nach.*schriftlichen Bestätigung/iu,
    bookingIntent: /möchte.*buch|möchte.*reserv/iu, noCompletedPurchase: /ich habe bereits bezahlt|meine Reservierung ist bestätigt/iu,
  },
  ar: {
    asap: /فور.*تحديد.*تواريخ/u, requestAndPay: /الطلب.*الدفع/u, exception: /باستثناء.*دون ضمان|باستثناء.*غير المضمونة/u,
    fullRefund: /نعيد.*بالكامل/u, feeAndTicket: /رسوم الخدمة وقيمة التذكرة/u,
    try: /نحاول/u, noGuarantee: /دون ضمان/u, unusedTicket: /تذاكر لم تُستخدم/u,
    early: /بما لا يقل عن/u, late: /بأقل من/u, releasePassed: /طرح التذاكر.*قد.*مضى/u, lateFullService: /رسوم الخدمة.*بالكامل/u, faceValue: /السعر الرسمي.*دون زيادة/su,
    bothAmounts: /المبلغين بالكامل/u,
    nonRefundable: /لا تُسترد رسوم الخدمة/u, writtenBeforePay: /تدفع بعد التأكيد الكتابي|تُدفع.*بعد التأكيد الكتابي/u,
    bookingIntent: /أريد.*حجز/u, noCompletedPurchase: /لقد دفعت بالفعل|تم تأكيد حجزي/u,
  },
};

/**
 * Re-evaluate the real copy modules with a different guarantee constant.
 * Data URLs keep this isolated from the normal import cache and do not
 * modify the working tree or substitute handcrafted test copy.
 */
async function copiesWithLeadDays(leadDays) {
  const copyModules = new Set([
    "lib/attractionReservationsI18n.ts", "lib/attractionReservationEditions.ts",
    "lib/germanAttractionReservationCopy.ts", "lib/arabicAttractionReservationCopy.ts",
  ]);
  const cache = new Map();
  async function moduleUrl(file) {
    if (cache.has(file)) return cache.get(file);
    let javascript = stripTypeScriptTypes(await source(file));
    const imports = [...javascript.matchAll(/\bfrom\s+(["'])(\.[^"']+)\1/gu)];
    for (const [, quote, specifier] of imports) {
      const extension = path.extname(specifier) ? "" : ".ts";
      const dependency = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier + extension));
      const replacement = dependency === "lib/attractionReservationGuarantee.ts"
        ? "data:text/javascript," + encodeURIComponent(`export const ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS = ${leadDays};`)
        : copyModules.has(dependency) ? await moduleUrl(dependency) : pathToFileURL(path.join(projectRoot, dependency)).href;
      javascript = javascript.replaceAll(`${quote}${specifier}${quote}`, `${quote}${replacement}${quote}`);
    }
    const url = "data:text/javascript;base64," + Buffer.from(javascript).toString("base64");
    cache.set(file, url);
    return url;
  }
  const core = await import(await moduleUrl("lib/attractionReservationsI18n.ts"));
  const editions = await import(await moduleUrl("lib/attractionReservationEditions.ts"));
  return {
    copyFor: (locale) => primaryLocales.has(locale) ? core.getAttractionReservationCopy(locale) : editions.getAttractionReservationEditionCopy(locale),
    ruleFor: (rule, locale) => primaryLocales.has(locale) ? rule : editions.getAttractionReservationEditionRule(rule, locale),
  };
}

test("all seven editions sell an early booking with three clear timing choices and the existing policies", async (t) => {
  assert.equal(days, 8, "the published commercial cutoff remains eight days");
  for (const locale of locales) {
    await t.test(locale, () => {
    const copy = copyFor(locale);
    const p = policy[locale];
    for (const key of ["h1", "lede", "heroPain", "heroUrgency", "heroCta", "timingTitle", "guaranteeTitle", "sectionCta"]) {
      assert.ok(copy[key]?.trim(), `${locale}: ${key}`);
    }
    assert.match(copy.heroUrgency, /7(?!\d)/u, `${locale}: Forbidden City release is seven days`);
    assert.match(copy.heroUrgency, /20(?::00|\s*h)/u, `${locale}: Forbidden City release time`);
    assert.ok(copy.heroUrgency.includes(String(days)), `${locale}: urgency includes guarantee cutoff`);
    assert.match(copy.heroUrgency, p.exception, `${locale}: hero guarantee excludes best-effort attractions`);
    assert.equal(copy.timingRows.length, 3, `${locale}: three contact timings`);
    assert.match(copy.timingRows[0].title, p.asap, `${locale}: contact as soon as dates are fixed`);
    for (const index of [1, 2]) assert.ok(copy.timingRows[index].title.includes(String(days)), `${locale}: row ${index + 1} cutoff`);
    assert.match(copy.timingRows[1].title, p.early, `${locale}: request at or before the guarantee cutoff`);
    assert.match(copy.timingRows[2].title, p.late, `${locale}: shorter lead time is a separate choice`);
    const guaranteed = copy.timingRows[1].body;
    for (const pattern of [p.requestAndPay, p.exception, p.fullRefund, p.feeAndTicket]) {
      assert.match(guaranteed, pattern, `${locale}: guaranteed row retains ${pattern}`);
    }
    const late = copy.timingRows[2].body;
    for (const pattern of [p.try, p.noGuarantee, p.lateFullService, p.unusedTicket, p.releasePassed]) {
      assert.match(late, pattern, `${locale}: late row retains ${pattern}`);
    }
    assert.equal(copy.limits[0], copy.guarantee, `${locale}: guarantee policy preserved`);
    assert.equal(copy.limits[1], copy.guaranteeLate, `${locale}: late refund policy preserved`);
    assert.match(copy.limits.slice(2).join(" "), p.nonRefundable, `${locale}: issued-ticket service fee is not refundable`);
    assert.match([copy.pricingLead, ...copy.pricing.map((item) => item.body)].join(" "), p.writtenBeforePay, `${locale}: payment follows written confirmation`);
    assert.ok(copy.forItems.some((item) => item.includes("L-BJ10587")), `${locale}: agency licence`);
    assert.ok(copy.heroCta.includes("WhatsApp") || copy.heroCta.includes("واتساب"), `${locale}: clear WhatsApp next step`);
    });
  }
});

test("changing the guarantee constant changes every edition's cutoff without changing museum release facts", async () => {
  const changedDays = 13;
  const changed = await copiesWithLeadDays(changedDays);
  for (const locale of locales) {
    const original = copyFor(locale);
    const altered = changed.copyFor(locale);
    const originalText = textValues(original);
    const alteredText = textValues(altered);
    assert.equal(alteredText.length, originalText.length, `${locale}: changed cutoff does not alter copy fields`);
    const cutoff = new RegExp(`(?<!\\d)${days}(?!\\d)`, "gu");
    for (const [index, text] of originalText.entries()) {
      assert.equal(alteredText[index], text.replace(cutoff, String(changedDays)), `${locale}: every visible cutoff follows the constant`);
    }
    for (const key of ["heroUrgency", "guarantee", "guaranteeLate"]) {
      assert.ok(altered[key].includes(String(changedDays)), `${locale}: ${key} follows changed constant`);
      assert.equal(altered[key].replaceAll(String(changedDays), "{cutoff}"), original[key].replaceAll(String(days), "{cutoff}"), `${locale}: ${key} only changes the guarantee lead time`);
    }
    for (const index of [1, 2]) {
      assert.ok(altered.timingRows[index].title.includes(String(changedDays)), `${locale}: timing row ${index + 1} follows changed constant`);
      assert.equal(altered.timingRows[index].body.replaceAll(String(changedDays), "{cutoff}"), original.timingRows[index].body.replaceAll(String(days), "{cutoff}"), `${locale}: timing row policy follows changed constant`);
    }
    assert.deepEqual(altered.timingRows[0], original.timingRows[0], `${locale}: contact immediately stays immediate`);
    for (const [id, releaseDays, releaseTime] of [
      ["forbidden-city", 7, /20(?::00|\s*h)/u],
      ["national-museum-of-china", 7, /17(?::00|\s*h)/u],
      ["shaanxi-history-museum", 5, /17(?::00|\s*h)/u],
    ]) {
      const rule = attractionReservationRules.find((item) => item.id === id);
      const release = primaryLocales.has(locale) ? rule.release[locale] : getAttractionReservationEditionRule(rule, locale).release;
      const changedRule = changed.ruleFor(rule, locale);
      const changedRelease = primaryLocales.has(locale) ? changedRule.release[locale] : changedRule.release;
      assert.equal(changedRelease, release, `${locale}: ${id} fact is independent of the guarantee`);
      assert.match(release, new RegExp(`${releaseDays}(?!\\d)`, "u"), `${locale}: ${id} release window`);
      assert.match(release, releaseTime, `${locale}: ${id} release time`);
    }
  }
});

test("sales copy keeps the CNY 45 fee, face-value tickets and full best-effort refunds", () => {
  assert.equal(attractionReservationServiceFeeCny, 45);
  for (const locale of locales) {
    const copy = copyFor(locale);
    assert.ok(copy.heroFacts[0].value.includes("{fee}"), `${locale}: fee stays data driven`);
    assert.ok(copy.pricing[0].title.includes("{fee}"), `${locale}: price uses the existing fee`);
    assert.ok(copy.guideCta.bodyBestEffort.includes("{fee}"), `${locale}: best-effort fee unchanged`);
    assert.match([copy.heroFacts[1].value, copy.pricing[1].title, copy.pricing[1].body].join(" "), policy[locale].faceValue, `${locale}: tickets stay at face value with no mark-up`);
    assert.match(copy.guideCta.bodyBestEffort, policy[locale].fullRefund, `${locale}: best-effort failure refunds both amounts in full`);
    assert.match(copy.guideCta.bodyBestEffort, policy[locale].bothAmounts, `${locale}: both service fee and ticket money are refunded`);
    assert.doesNotMatch(copy.guideCta.bodyBestEffort, policy[locale].unusedTicket, `${locale}: best-effort refund is not limited to unused tickets`);
    if (!primaryLocales.has(locale)) assert.match(formatAttractionReservationEditionMoney(attractionReservationServiceFeeCny, locale), /45/u, `${locale}: same base fee`);
  }
});

test("all edition drafts read as a request to book and keep the same customer fields", () => {
  const draft = {
    cities: ["Beijing", "Xi'an"],
    visits: [{ label: "Forbidden City", date: "2026-12-11" }, { label: "Shaanxi History Museum", date: null }],
    travellers: 3, note: "Morning\u0007 please", pageUrl: "https://example.invalid/services/china-attraction-reservations/",
  };
  for (const locale of locales) {
    const messageCopy = copyFor(locale).enquiry.message;
    assert.match(messageCopy.opening, policy[locale].bookingIntent, `${locale}: customer is asking us to book`);
    assert.doesNotMatch(messageCopy.opening + " " + messageCopy.subject, policy[locale].noCompletedPurchase, `${locale}: no implied payment or confirmed booking`);
    const text = attractionReservationMessageText(messageCopy, draft);
    assert.ok(text.startsWith(messageCopy.opening), `${locale}: customer-ready opening`);
    for (const value of [messageCopy.serviceValue, "Beijing, Xi'an", "Forbidden City: 2026-12-11", "Shaanxi History Museum: " + messageCopy.datesUndecided, "Morning please", draft.pageUrl]) {
      assert.ok(text.includes(value), `${locale}: preserves draft value ${value}`);
    }
    assert.match(text, /: 3$/mu, `${locale}: traveller count`);
    assert.doesNotMatch(text, /\u0007/u);
    const mailto = new URL(attractionReservationMailtoHref("hello@example.invalid", messageCopy, draft));
    assert.equal(mailto.searchParams.get("subject"), `${messageCopy.subject} – Beijing, Xi'an`);
    assert.equal(mailto.searchParams.get("body"), text, `${locale}: email and chat carry the same draft`);
  }
});

test("service and guide pitches avoid DIY referrals, seller claims and Chinese absolutes", () => {
  const diy = /book (?:it )?yourself|do it yourself|自行预约|직접 예약(?:하셔|할 수)|vous-même.{0,80}guide|(?:puedes|también puedes) reservar por tu cuenta|selbst buchen.{0,80}(?:Ratgeber|Guide)|بنفسك.{0,80}(?:دليل|الحجز)/iu;
  const sellerClaim = /(?:authori[sz]ed|official|appointed) (?:ticket )?(?:seller|agent|partner|reseller)|官方(?:代理|合作)|指定代理|공식 (?:판매처|대리점)|(?:revendeur|partenaire) officiel|(?:vendedor autorizado|socio oficial)|(?:autorisierter Ticketverkäufer|offizieller Partner)|(?:بائع|وكيل|شريك) رسمي/iu;
  for (const locale of locales) {
    const copy = copyFor(locale);
    for (const text of textValues(copy)) {
      assert.doesNotMatch(text, diy, `${locale}: service sells the booking service`);
      assert.doesNotMatch(text, sellerClaim, `${locale}: no attraction-seller relationship claim`);
    }
    // An ordinary sequence (for example, a first message) is not a ranking claim.
    if (locale === "zh") assert.doesNotMatch(JSON.stringify(copy).replace(/第[一二三四五六七八九十\d]+(?:条消息|次|天|步)/gu, ""), /最|第一|国家级|绝对|零风险|100\s*%/u);
    for (const rule of attractionReservationRules) {
      const translated = primaryLocales.has(locale) ? { notes: rule.notes[locale], disclosure: rule.disclosure?.[locale] } : getAttractionReservationEditionRule(rule, locale);
      const text = translated.notes + " " + (translated.disclosure ?? "");
      assert.doesNotMatch(text, diy, `${locale}: ${rule.id} service pitch`);
      assert.doesNotMatch(text, sellerClaim, `${locale}: ${rule.id} no seller claim`);
    }
  }
});

test("new sales CTAs reuse the existing form draft and tracking contract", async () => {
  const [enquiry, cta, message] = await Promise.all([
    source("components/AttractionReservationEnquiry.tsx"),
    source("components/AttractionReservationCta.tsx"),
    source("lib/attractionReservationMessage.ts"),
  ]);
  const fieldNames = new Set([...enquiry.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/gu)].map((match) => match[1]));
  assert.deepEqual([...fieldNames].sort(), ["attraction", "note", "travellers"], "the form keeps its existing customer fields");
  assert.match(enquiry, /chosen\.map\(\(attraction\) => \(\s*<TourDateField/u, "one visit date per selected attraction");
  assert.doesNotMatch(enquiry, /name="passport|passportNumber|type="(?:password|credit-card)"/iu);
  const eventNames = [...enquiry.matchAll(/(?:trackEvent|useVisibleAnalyticsEvent(?:<[^>]+>)?)\("([^"]+)"/gu)].map((match) => match[1]);
  assert.deepEqual(eventNames.sort(), ["contact_option_clicked", "contact_options_viewed", "quick_email_started"], "existing event names remain unchanged");
  assert.match(enquiry, /const serviceInterest = "attraction_reservation"/u);
  assert.match(enquiry, /page_language: editionLocale \?\? locale, submission_surface: serviceInterest, service_interest: serviceInterest/u);
  assert.match(enquiry, /trackEvent\("contact_option_clicked", \{ \.\.\.eventParameters, channel \}/u);
  assert.match(cta, /a\[data-reservation-channel="whatsapp"\]/u, "sales links select the existing WhatsApp control");
  assert.match(cta, /send\.click\(\)/u, "the current draft and existing channel handler are used");
  assert.doesNotMatch(cta, /trackEvent|useVisibleAnalyticsEvent/u, "sales links do not invent duplicate analytics events");
  assert.match(message, /attractionReservationNoteMaxLength = 600/u);
});

test("a delegated desktop CTA returns focus to its origin and every direct activation uses the live draft", async () => {
  const javascript = ts.transpileModule(await source("components/AttractionReservationCta.tsx"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const require = createRequire(import.meta.url);
  function fixture({ desktop = true, formPresent = true, visitLine = null } = {}) {
    let sendClicks = 0;
    let originalFocus = null;
    let focusListener = null;
    let focusOptions = null;
    const send = {
      href: "https://wa.me/8612345678901?text=current-attractions-dates-travellers-and-note",
      click: () => { sendClicks += 1; },
      addEventListener: (type, listener, options) => {
        assert.equal(type, "focus");
        focusListener = listener;
        focusOptions = options;
      },
    };
    const trigger = { href: "https://wa.me/8612345678901?text=initial-empty-draft", isConnected: true, focus: (options) => { originalFocus = options; } };
    const module = { exports: {} };
    vm.runInNewContext(javascript, {
      module, exports: module.exports,
      document: { getElementById: (id) => {
        assert.equal(id, "reservation-form");
        return formPresent ? { querySelector: () => send } : null;
      } },
      require: (id) => {
        if (id === "../lib/contactCard") return { contactCardIsAvailable: () => desktop };
        if (id === "../lib/tourContact") return { homegroundWhatsAppNumber: () => "8612345678901" };
        if (id === "../lib/visitRef") return { appendVisitRefToContactHref, currentVisitRefLine: () => visitLine };
        return require(id);
      },
    });
    const anchor = module.exports.AttractionReservationCta({ href: trigger.href, formId: "reservation-form", className: "cta", children: "Send your dates" });
    let prevented = false;
    const event = (extra = {}) => ({ currentTarget: trigger, button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault: () => { prevented = true; }, ...extra });
    return { anchor, trigger, send, event, sendClicks: () => sendClicks, prevented: () => prevented, focusListener: () => focusListener, focusOptions: () => focusOptions, originalFocus: () => originalFocus };
  }

  const desktop = fixture();
  const activation = desktop.event();
  desktop.anchor.props.onClick(activation);
  // React clears currentTarget after the handler. The close callback must keep
  // the actual originating element, not the later synthetic event value.
  activation.currentTarget = null;
  assert.equal(desktop.prevented(), true);
  assert.equal(desktop.sendClicks(), 1, "the existing send handler remains the single channel activation");
  assert.equal(desktop.focusOptions().once, true, "focus relay only handles this card's return");
  desktop.focusListener()();
  assert.equal(desktop.originalFocus().preventScroll, true, "closing restores the original CTA without scrolling to the form");

  const phone = fixture({ desktop: false });
  phone.anchor.props.onClick(phone.event());
  assert.equal(phone.sendClicks(), 1, "phones keep the existing direct WhatsApp action");
  assert.equal(phone.focusListener(), null, "direct app navigation installs no lingering focus relay");

  for (const modifier of ["metaKey", "ctrlKey", "shiftKey", "altKey"]) {
    const modified = fixture();
    modified.anchor.props.onClick(modified.event({ [modifier]: true }));
    assert.equal(modified.trigger.href, modified.send.href, `${modifier}: current draft is used by native navigation`);
    assert.equal(modified.prevented(), false, `${modifier}: browser modifier behavior is preserved`);
    assert.equal(modified.sendClicks(), 0, `${modifier}: no duplicate delegated activation`);
  }
  for (const approach of ["onPointerDown", "onContextMenu", "onFocus"]) {
    const direct = fixture();
    direct.anchor.props[approach](direct.event({ button: approach === "onPointerDown" ? 1 : 0 }));
    assert.equal(direct.trigger.href, direct.send.href, `${approach}: middle-click, context menu and keyboard use the live draft`);
    assert.equal(direct.sendClicks(), 0);
  }
  const visitLine = "ref: services/china-attraction-reservations · search";
  const attributed = fixture({ visitLine });
  // Match the site's capture listener: it rewrites the originating CTA before
  // React handles a modifier click, while the form link is still untouched.
  attributed.trigger.href = appendVisitRefToContactHref(attributed.trigger.href, visitLine, { whatsappNumber: "8612345678901", email: "" });
  attributed.anchor.props.onClick(attributed.event({ ctrlKey: true }));
  const attributedText = new URL(attributed.trigger.href).searchParams.get("text");
  assert.ok(attributedText.startsWith("current-attractions-dates-travellers-and-note"));
  assert.ok(attributedText.endsWith(visitLine), "native modifier navigation retains allowed visit attribution");
  assert.equal(attributedText.split("ref:").length, 2, "the attribution line is only appended once");
  const refused = fixture();
  refused.send.href = appendVisitRefToContactHref(refused.send.href, visitLine, { whatsappNumber: "8612345678901", email: "" });
  refused.anchor.props.onClick(refused.event({ ctrlKey: true }));
  assert.doesNotMatch(new URL(refused.trigger.href).searchParams.get("text"), /ref:/u, "refusing attribution removes a previously added line");
  const fallback = fixture({ formPresent: false });
  const originalHref = fallback.trigger.href;
  fallback.anchor.props.onClick(fallback.event());
  assert.equal(fallback.prevented(), false, "the server-rendered WhatsApp link still works before the form is available");
  assert.equal(fallback.trigger.href, originalHref);
});
