import type { HomegroundLocale } from "./homegroundI18n";
import type { PrivateCarServiceCopy } from "./privateCarServicesI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { privateCarServiceKinds, privateCarServicePath, type PrivateCarServiceKind } from "./privateCarServices.ts";

export interface PrivateCarServiceDraft {
  kind: PrivateCarServiceKind | "";
  cities: string;
  date: string;
  dateUndecided: boolean;
  travellers: string;
  luggage: string;
  pickup: string;
  pickupTime: string;
  route: string;
  note: string;
}

export const privateCarServiceTextMaxLength = 600;
export const privateCarServiceShortTextMaxLength = 200;

function clean(value: string, max: number, multiline = false) {
  const text = value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "");
  return (multiline ? text : text.replace(/[\r\n\t]+/gu, " ")).trim().slice(0, max);
}

/** Reject impossible calendar dates rather than carrying a misleading date into a quote. */
function calendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return null;
  const date = new Date(value + "T00:00:00.000Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : null;
}

/** A direct-channel draft only: no booking, price estimate or backend submission. */
export function privateCarServiceMessage(
  copy: PrivateCarServiceCopy,
  locale: HomegroundLocale,
  draft: PrivateCarServiceDraft,
) {
  const message = copy.enquiry.message;
  const count = Number(draft.travellers);
  const travellers = draft.travellers.trim() && Number.isSafeInteger(count) && count > 0
    ? String(count) : message.none;
  const kind = privateCarServiceKinds.includes(draft.kind as PrivateCarServiceKind)
    ? copy.kinds[draft.kind as PrivateCarServiceKind].title : message.none;
  const date = draft.dateUndecided ? message.datesOpen : calendarDate(draft.date) ?? message.none;
  const line = (label: string, value: string) => label + message.separator + value;
  return [
    message.opening,
    line(message.kind, kind),
    line(message.cities, clean(draft.cities, privateCarServiceShortTextMaxLength) || message.none),
    line(message.date, date),
    line(message.travellers, travellers),
    line(message.luggage, clean(draft.luggage, privateCarServiceShortTextMaxLength) || message.none),
    line(message.pickup, clean(draft.pickup, privateCarServiceShortTextMaxLength) || message.none),
    line(message.pickupTime, clean(draft.pickupTime, privateCarServiceShortTextMaxLength) || message.none),
    line(message.route, clean(draft.route, privateCarServiceTextMaxLength, true) || message.none),
    draft.note.trim() ? line(message.note, clean(draft.note, privateCarServiceTextMaxLength, true)) : null,
    message.confirmation,
    "https://homegroundchina.com" + privateCarServicePath[locale],
  ].filter(Boolean).join("\n");
}
