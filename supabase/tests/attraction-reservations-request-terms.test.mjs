import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { getAttractionReservationCopy } from "../../lib/attractionReservationsI18n.ts";
import { getAttractionReservationEditionCopy } from "../../lib/attractionReservationEditions.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (file) => readFile(path.join(projectRoot, file), "utf8");
const copyFor = (language) => (["en", "zh", "ko"].includes(language) ? getAttractionReservationCopy(language) : getAttractionReservationEditionCopy(language));

/**
 * Three published rules the service page states in every language: the request
 * is free, a paid booking can be cancelled for a full refund until we complete
 * it, and the passport fields are exactly those the privacy notice lists.
 */
const terms = {
  en: { free: /Sending a request is free\. Nothing is charged until you accept our written confirmation\./u, cancel: /cancel by email until we complete the reservation; the service fee and ticket money received are refunded in full/u, privacy: "lib/homegroundPrivacyI18n.ts", fields: "Full name as printed, passport number, nationality and, where the booking form asks, date of birth or passport expiry" },
  zh: { free: /提交需求免费，你接受书面确认之前不会收费/u, cancel: /付款后、我们完成预约前，你仍可通过邮件取消，已收取的服务费和门票款全额退还/u, privacy: "lib/homegroundPrivacyI18n.ts", fields: "证件上的姓名、护照号码、国籍，以及预约页面要求时的出生日期或护照有效期" },
  ko: { free: /예약 요청은 무료이며, 서면 확인을 수락하기 전에는 비용이 없습니다/u, cancel: /예약을 완료하기 전이라면 이메일로 취소할 수 있으며, 받은 수수료와 입장료를 전액 환불합니다/u, privacy: "lib/homegroundPrivacyI18n.ts", fields: "여권에 적힌 이름, 여권 번호, 국적, 예약 양식이 요구하는 경우 생년월일 또는 여권 만료일" },
  fr: { free: /La demande de réservation est gratuite\. Rien n’est facturé avant que vous acceptiez notre confirmation écrite\./u, cancel: /annuler par e-mail tant que nous n’avons pas achevé la réservation\. Les frais de service et montants de billets reçus sont intégralement remboursés/u, privacy: "lib/frenchLegalCopy.ts", fields: "Nom complet tel qu’il figure sur le passeport, numéro de passeport, nationalité et, si le formulaire le demande, date de naissance ou expiration du passeport" },
  es: { free: /La solicitud de reserva es gratuita\. No se cobra nada hasta que aceptes nuestra confirmación escrita\./u, cancel: /cancelar por correo electrónico mientras no hayamos completado la reserva\. Se devuelve íntegramente la tarifa de servicio y los importes de entradas recibidos/u, privacy: "lib/spanishLegalCopy.ts", fields: "Nombre completo tal como aparece en el pasaporte, número, nacionalidad y, si el formulario lo exige, fecha de nacimiento o caducidad" },
  de: { free: /Die Reservierungsanfrage ist kostenlos\. Es wird nichts berechnet, bevor Sie unsere schriftliche Bestätigung angenommen haben\./u, cancel: /per E-Mail stornieren, solange wir die Reservierung noch nicht abgeschlossen haben\. Eingegangene Servicegebühren und Ticketbeträge werden vollständig erstattet/u, privacy: "lib/germanLegalCopy.ts", fields: "Vollständiger Name laut Reisepass, Passnummer, Staatsangehörigkeit sowie Geburtsdatum oder Passablaufdatum, falls das Buchungsformular diese verlangt" },
  ar: { free: /طلب الحجز مجاني، ولا تُفرض أي رسوم قبل موافقتك على تأكيدنا الكتابي/u, cancel: /يمكنك الإلغاء عبر البريد الإلكتروني قبل إتمامنا الحجز، وتُرد رسوم الخدمة ومبالغ التذاكر المستلمة بالكامل/u, privacy: "lib/arabicLegalCopy.ts", fields: "الاسم الكامل كما في جواز السفر ورقم الجواز والجنسية، وتاريخ الميلاد أو انتهاء الجواز إذا طلبهما نموذج الحجز" },
  ja: { free: /ご依頼は無料です。書面でお送りする内容に同意いただくまで、料金は発生しません。/u, cancel: /当社が予約を完了する前であれば、メールでキャンセルできます。受領済みのサービス料とチケット代は全額返金します/u, privacy: "lib/japanesePrivacyCopy.ts", fields: "パスポート記載の氏名、パスポート番号、国籍、予約画面が求める場合は生年月日または有効期限" },
};

test("the first step says sending a request is free in every language", () => {
  for (const [language, term] of Object.entries(terms)) assert.match(copyFor(language).steps[0].body, term.free, language);
});

test("the refund list adds cancellation after payment and before booking, ahead of the issued-ticket rule", () => {
  for (const [language, term] of Object.entries(terms)) {
    const copy = copyFor(language);
    assert.equal(copy.limits[0], copy.guarantee, language);
    assert.equal(copy.limits[1], copy.guaranteeLate, language);
    // The page lists limits from the third item on, so this is the first refund rule a reader sees.
    assert.match(copy.limits[2], term.cancel, language);
    assert.equal(copy.limits.length, 5, language);
  }
});

test("the passport section lists exactly the fields in that language's privacy notice", async () => {
  for (const [language, term] of Object.entries(terms)) {
    const privacy = await source(term.privacy);
    assert.ok(privacy.includes(term.fields), `${language}: ${term.privacy} still lists these fields`);
    assert.ok(copyFor(language).passportBody.toLowerCase().includes(term.fields.toLowerCase()), `${language}: passport section lists the privacy notice's fields`);
  }
});
