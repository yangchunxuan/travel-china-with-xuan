/** Enquiry choices for the published five-city small group. These are preferences, not seat reservations. */
export const fiveCitySmallGroupSlug = "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour";
export const fiveCitySmallGroupDepartures = [
  { start: "2027-04-10", end: "2027-04-23" },
  { start: "2027-05-08", end: "2027-05-21" },
  { start: "2027-09-11", end: "2027-09-24" },
  { start: "2027-10-09", end: "2027-10-22" },
] as const;
export type SmallGroupInquiryLanguage = "en" | "zh" | "ko" | "ja" | "es" | "fr";
export type SmallGroupRoomPreference = "twin-share" | "single-room" | null;
export interface SmallGroupInquiryDetails {
  departureDate: string | null;
  roomPreference: SmallGroupRoomPreference;
}
export function isFiveCitySmallGroup(slug?: string) { return slug === fiveCitySmallGroupSlug; }
export function smallGroupDeparture(value?: string | null) {
  return fiveCitySmallGroupDepartures.find(departure => departure.start === value) ?? null;
}
export const smallGroupInquiryCopy = {
  en: { departure: "Which departure?", undecided: "Not sure yet", group: "How many are travelling?", room: "Room preference", twin: "Sharing a twin room", single: "Single room", hint: "We’ll confirm places and room arrangements before you book.", subject: "Small-group tour enquiry", opening: "Hi, I’d like to ask about this small-group tour.", body: "I’m asking about this small-group tour" },
  zh: { departure: "想参加哪一期？", undecided: "还没确定", group: "有几位同行？", room: "房型偏好", twin: "两人同住双床房", single: "单人入住", hint: "预订前，我们会确认名额和房间安排。", subject: "小团行程咨询", opening: "你好，我想咨询这条小团行程。", body: "我想咨询这条小团行程" },
  ko: { departure: "어느 출발일을 원하시나요?", undecided: "아직 미정", group: "몇 명이 함께 여행하시나요?", room: "객실 선호", twin: "트윈룸 2인 사용", single: "1인실", hint: "예약 전에 잔여 인원과 객실 배정을 확인해 드립니다.", subject: "소규모 그룹 투어 문의", opening: "안녕하세요. 이 소규모 그룹 투어에 대해 문의하고 싶습니다.", body: "이 소규모 그룹 투어에 대해 문의합니다" },
  ja: { departure: "ご希望の出発日", undecided: "まだ未定", group: "一緒に参加する人数", room: "客室のご希望", twin: "ツインルームを2名で利用", single: "1名1室", hint: "ご予約前に空き状況と客室の手配を確認します。", subject: "少人数ツアーのお問い合わせ", opening: "こんにちは。この少人数ツアーについて相談したいです。", body: "この少人数ツアーについて相談したいです" },
  es: { departure: "¿Qué salida prefieres?", undecided: "Aún no lo sé", group: "¿Cuántos viajáis?", room: "Preferencia de habitación", twin: "Compartir habitación de dos camas", single: "Habitación individual", hint: "Confirmaremos las plazas y las habitaciones antes de reservar.", subject: "Consulta sobre el circuito en grupo reducido", opening: "Hola, me gustaría consultar este circuito en grupo reducido.", body: "Quisiera consultar este circuito en grupo reducido" },
  fr: { departure: "Quel départ préférez-vous ?", undecided: "Pas encore décidé", group: "Combien de personnes voyagent ?", room: "Préférence de chambre", twin: "Chambre à deux lits partagée", single: "Chambre individuelle", hint: "Nous confirmerons les places et les chambres avant la réservation.", subject: "Demande pour le circuit en petit groupe", opening: "Bonjour, je souhaite me renseigner sur ce circuit en petit groupe.", body: "Je souhaite me renseigner sur ce circuit en petit groupe" },
} as const;

export function smallGroupDepartureLabel(language: SmallGroupInquiryLanguage, value: string | null) {
  const departure = smallGroupDeparture(value);
  if (!departure) return smallGroupInquiryCopy[language].undecided;
  const format = new Intl.DateTimeFormat(language, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return format.formatRange(new Date(`${departure.start}T00:00:00Z`), new Date(`${departure.end}T00:00:00Z`));
}

export function smallGroupInquiryText(language: SmallGroupInquiryLanguage, details: SmallGroupInquiryDetails, travelers?: number | null): string {
  const copy = smallGroupInquiryCopy[language];
  const party = Number.isInteger(travelers) && travelers! >= 1 && travelers! <= 12 ? String(travelers) : copy.undecided;
  const room = details.roomPreference === "twin-share" ? copy.twin : details.roomPreference === "single-room" ? copy.single : copy.undecided;
  return [`${copy.departure}: ${smallGroupDepartureLabel(language, details.departureDate)}`, `${copy.group}: ${party}`, `${copy.room}: ${room}`].join("\n");
}

/** Keep the existing intake contract: controlled preferences go in the saved note. */
export function smallGroupInquiryNote(note: string, details: SmallGroupInquiryDetails): string {
  const departure = smallGroupDeparture(details.departureDate);
  const room = details.roomPreference === "twin-share" ? "Twin room sharing" : details.roomPreference === "single-room" ? "Single room" : "Not decided";
  return [
    `[Small-group departure: ${departure ? `${departure.start} to ${departure.end}` : "Not decided"}]`,
    `[Room preference: ${room}; subject to confirmation]`,
    note.trim(),
  ].filter(Boolean).join("\n\n");
}
