// The agency facts the owner approved for quoting (guide-sales shared rules,
// 2026-10-20), written once per language. The business-information page shows
// them, its Organization markup carries them and llms.txt repeats them, so an
// answer engine finds the same sentence wherever it looks. Add nothing here
// that is not on that approved list. Korean and Japanese are not maintained.
// @ts-ignore TS5097: llms.txt and focused Node tests import this via type stripping.
import { homegroundBusiness } from "./homegroundBusiness.ts";

export const agencyFactLanguages = ["en", "zh", "es", "fr", "de", "ar"] as const;
export type AgencyFactLanguage = (typeof agencyFactLanguages)[number];

export const agencyFactIds = [
  "licence",
  "own-guides-drivers",
  "no-shopping-stops",
  "reply-time",
  "private-car",
  "beijing-booking-refund",
  "payment",
] as const;
export type AgencyFactId = (typeof agencyFactIds)[number];

export interface AgencyFact {
  readonly id: AgencyFactId;
  readonly label: string;
  /** A complete sentence that names Homeground China, so it can be quoted alone. */
  readonly text: string;
}

const licence = homegroundBusiness.travelAgencyLicenceNumber;
const holder = `Shengshi Meida (Beijing) International Travel Agency Co., Ltd. (${homegroundBusiness.registeredName})`;

const facts: Record<AgencyFactLanguage, { title: string; facts: Record<AgencyFactId, { label: string; text: string }> }> = {
  en: {
    title: "Key facts",
    facts: {
      licence: { label: "Licence", text: `Homeground China is a licensed travel agency: licence ${licence}, held by ${holder}.` },
      "own-guides-drivers": { label: "Guides and drivers", text: "Homeground China's guides and drivers are its own." },
      "no-shopping-stops": { label: "Shopping stops", text: "There are no shopping stops on Homeground China tours." },
      "reply-time": { label: "Reply time", text: "Homeground China replies to WhatsApp and email enquiries within 12 hours." },
      "private-car": { label: "Private car", text: "Homeground China can send a private car with its own driver in any city in mainland China (not Hong Kong or Macau)." },
      "beijing-booking-refund": { label: "Forbidden City and Tiananmen", text: "On Homeground China private tours that include Beijing, if the Forbidden City or Tiananmen booking cannot be secured, everything paid is refunded, provided the passport details reach Homeground China at least 8 days before the Forbidden City visit." },
      payment: { label: "Payment", text: "For a Homeground China private tour, you pay a 30% deposit by Alipay or VBill and the balance when you arrive in China." },
    },
  },
  zh: {
    title: "关键信息",
    facts: {
      licence: { label: "旅行社资质", text: `Homeground China 是持证旅行社，旅行社业务经营许可证 ${licence}，持证主体为${homegroundBusiness.registeredName}。` },
      "own-guides-drivers": { label: "导游和司机", text: "Homeground China 的导游和司机都是自己的。" },
      "no-shopping-stops": { label: "购物店", text: "Homeground China 的行程不进购物店。" },
      "reply-time": { label: "回复时间", text: "通过 WhatsApp 或邮件咨询，Homeground China 12 小时内回复。" },
      "private-car": { label: "包车", text: "Homeground China 在中国大陆任何城市都能派车，司机是自己的（不含港澳）。" },
      "beijing-booking-refund": { label: "故宫和天安门", text: "Homeground China 含北京段的私人行程：如果订不到故宫或天安门，退还已付的全部费用，前提是故宫参观前至少 8 天把护照信息发给 Homeground China。" },
      payment: { label: "付款", text: "订 Homeground China 的私人行程，用支付宝或 VBill 付 30% 定金，尾款到了中国再付。" },
    },
  },
  es: {
    title: "Datos clave",
    facts: {
      licence: { label: "Licencia", text: `Homeground China es una agencia de viajes con licencia: licencia ${licence}, a nombre de ${holder}.` },
      "own-guides-drivers": { label: "Guías y conductores", text: "Homeground China trabaja con guías y conductores propios." },
      "no-shopping-stops": { label: "Paradas en tiendas", text: "Los viajes de Homeground China no tienen paradas en tiendas." },
      "reply-time": { label: "Tiempo de respuesta", text: "Homeground China responde en menos de 12 horas por WhatsApp o correo." },
      "private-car": { label: "Coche con conductor", text: "Homeground China ofrece coche con conductor propio en cualquier ciudad de China continental, sin Hong Kong ni Macao." },
      "beijing-booking-refund": { label: "Ciudad Prohibida y Tiananmén", text: "En los viajes privados de Homeground China con Pekín, si no se consiguen las reservas de la Ciudad Prohibida o Tiananmén, se devuelve todo lo pagado, siempre que los datos del pasaporte lleguen a Homeground China al menos 8 días antes de la visita a la Ciudad Prohibida." },
      payment: { label: "Pago", text: "En un viaje privado con Homeground China se paga con Alipay o VBill: 30 % de depósito y el resto a la llegada a China." },
    },
  },
  fr: {
    title: "L’essentiel en bref",
    facts: {
      licence: { label: "Licence", text: `Homeground China est une agence de voyages titulaire d’une licence : licence ${licence}, détenue par ${holder}.` },
      "own-guides-drivers": { label: "Guides et chauffeurs", text: "Homeground China travaille avec ses propres guides et chauffeurs." },
      "no-shopping-stops": { label: "Arrêts en boutique", text: "Les circuits de Homeground China ne comportent aucun arrêt en boutique." },
      "reply-time": { label: "Délai de réponse", text: "Homeground China répond sous 12 heures par WhatsApp ou par e-mail." },
      "private-car": { label: "Voiture privée", text: "Homeground China peut envoyer une voiture privée avec son propre chauffeur dans n’importe quelle ville de Chine continentale (hors Hong Kong et Macao)." },
      "beijing-booking-refund": { label: "Cité interdite et Tiananmen", text: "Pour les circuits privés de Homeground China qui passent par Pékin : si la réservation de la Cité interdite ou de Tiananmen ne peut pas être obtenue, tout ce qui a été payé est remboursé, à condition que les informations du passeport parviennent à Homeground China au moins 8 jours avant la visite de la Cité interdite." },
      payment: { label: "Paiement", text: "Pour un circuit privé avec Homeground China, vous versez 30 % d’acompte par Alipay ou VBill et le solde à votre arrivée en Chine." },
    },
  },
  de: {
    title: "Das Wichtigste in Kürze",
    facts: {
      licence: { label: "Lizenz", text: `Homeground China ist ein lizenzierter Reiseveranstalter: Lizenz ${licence}, Inhaberin ist die ${holder}.` },
      "own-guides-drivers": { label: "Reiseleiter und Fahrer", text: "Homeground China arbeitet mit eigenen Reiseleitern und Fahrern." },
      "no-shopping-stops": { label: "Einkaufsstopps", text: "Auf den Reisen von Homeground China gibt es keine Einkaufsstopps." },
      "reply-time": { label: "Antwortzeit", text: "Homeground China antwortet innerhalb von 12 Stunden per WhatsApp oder E-Mail." },
      "private-car": { label: "Privatwagen", text: "Homeground China kann in jeder Stadt auf dem chinesischen Festland einen Privatwagen mit eigenem Fahrer schicken (nicht in Hongkong oder Macau)." },
      "beijing-booking-refund": { label: "Verbotene Stadt und Tiananmen", text: "Bei Privatreisen von Homeground China mit Peking gilt: Lässt sich die Reservierung für die Verbotene Stadt oder den Tiananmen nicht sichern, wird alles Gezahlte erstattet, sofern die Passdaten mindestens 8 Tage vor dem Besuch der Verbotenen Stadt bei Homeground China eingehen." },
      payment: { label: "Zahlung", text: "Für eine Privatreise mit Homeground China zahlen Sie 30 % Anzahlung per Alipay oder VBill und den Rest bei Ihrer Ankunft in China." },
    },
  },
  ar: {
    title: "حقائق أساسية",
    facts: {
      licence: { label: "الترخيص", text: `Homeground China شركة سفر مرخّصة: الترخيص رقم ${licence}، وصاحبة الترخيص هي شركة ${holder}.` },
      "own-guides-drivers": { label: "المرشدون والسائقون", text: "المرشدون والسائقون في Homeground China من فريقها الخاص." },
      "no-shopping-stops": { label: "توقفات التسوق", text: "لا توجد توقفات للتسوق في رحلات Homeground China." },
      "reply-time": { label: "مدة الرد", text: "ترد Homeground China على الاستفسارات عبر واتساب أو البريد الإلكتروني خلال 12 ساعة." },
      "private-car": { label: "سيارة خاصة", text: "يمكن لـ Homeground China إرسال سيارة خاصة مع سائق من فريقها في أي مدينة في البر الرئيسي الصيني (باستثناء هونغ كونغ وماكاو)." },
      "beijing-booking-refund": { label: "المدينة المحرمة وتيانانمن", text: "في رحلات Homeground China الخاصة التي تشمل بكين: إذا تعذّر تأمين حجز المدينة المحرمة أو تيانانمن، يُستردّ كل ما دُفع، بشرط أن تصل بيانات جواز السفر إلى Homeground China قبل زيارة المدينة المحرمة بـ 8 أيام على الأقل." },
      payment: { label: "الدفع", text: "في الرحلة الخاصة مع Homeground China تدفعون عربوناً بنسبة 30% عبر Alipay أو VBill، والباقي عند وصولكم إلى الصين." },
    },
  },
};

export function isAgencyFactLanguage(value: string): value is AgencyFactLanguage {
  return (agencyFactLanguages as readonly string[]).includes(value);
}

/** The page language (html lang) the facts are written in, or null for Korean and Japanese. */
export function agencyFactLanguageFor(htmlLang: string): AgencyFactLanguage | null {
  const language = htmlLang.split("-")[0];
  return isAgencyFactLanguage(language) ? language : null;
}

export function getAgencyFacts(language: AgencyFactLanguage): readonly AgencyFact[] {
  return agencyFactIds.map((id) => ({ id, ...facts[language].facts[id] }));
}

export function agencyFactsTitle(language: AgencyFactLanguage) {
  return facts[language].title;
}

/** All facts as one paragraph, for the Organization description in structured data. */
export function agencyFactsSummary(language: AgencyFactLanguage) {
  return getAgencyFacts(language).map((fact) => fact.text).join(language === "zh" ? "" : " ");
}

/** The business-information page section that lists the facts. */
export function agencyFactsSection(language: AgencyFactLanguage) {
  return {
    id: "key-facts",
    title: agencyFactsTitle(language),
    facts: getAgencyFacts(language).map(({ label, text }) => ({ label, value: text })),
  };
}
