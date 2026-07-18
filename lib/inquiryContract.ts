/**
 * Shared Homeground Inquiry contract.
 *
 * This module is deliberately runtime-neutral: it does not import Node, Deno,
 * Supabase, or browser-only APIs. The static frontend and the Edge Functions
 * can therefore validate and canonicalize the same payload shape.
 */

import {
  computeRoutePlan,
  routeRuleVersion as currentRouteRuleVersion,
  travelPartyIds,
  travelStyleIds,
  tripNightsIds,
  tripPaceIds,
  type CityNights,
  type ComputedRoutePlan,
  type RouteAnswers,
  type RouteFamilyId,
  type RouteProfile,
  type TravelPartyId,
  type TravelStyleId,
  type TripNightsId,
  type TripPaceId,
  // @ts-ignore Source-TypeScript runtimes require the explicit extension.
} from "./routeRules.ts";
import {
  currentInquiryFormVersion,
  currentPrivacyNoticeVersion,
  inquirySchemaVersion,
  // @ts-ignore Source-TypeScript runtimes require the explicit extension.
} from "./inquiryVersions.ts";

export {
  currentInquiryFormVersion,
  currentPrivacyNoticeVersion,
  inquirySchemaVersion,
  currentRouteRuleVersion,
  travelPartyIds,
  travelStyleIds,
  tripNightsIds,
  tripPaceIds,
};
export type {
  RouteFamilyId,
  RouteProfile,
  TravelPartyId,
  TravelStyleId,
  TripNightsId,
  TripPaceId,
};

export const inquiryLocales = ["en", "zh", "ko"] as const;

export type InquiryLocale = (typeof inquiryLocales)[number];
export type InquiryAnswers = RouteAnswers;
export type CanonicalCityNights = CityNights;
export type CanonicalRouteSnapshot = ComputedRoutePlan;

export type NormalizedInquiryContact =
  | {
      channel: "email";
      email: string;
    }
  | {
      channel: "whatsapp";
      phoneE164: string;
    };

export interface NormalizedInquiryAttribution {
  landingPath: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

export interface NormalizedInquiryPayload {
  schemaVersion: typeof inquirySchemaVersion;
  formVersion: string;
  entryPath: "generated_route";
  locale: InquiryLocale;
  journey: {
    journeyId: string;
    revision: number;
    answers: InquiryAnswers;
    routeId: string;
    ruleVersion: string;
  };
  routeSnapshot: CanonicalRouteSnapshot;
  contact: NormalizedInquiryContact;
  note: string | null;
  privacyNoticeVersion: string;
  attribution: NormalizedInquiryAttribution;
  experiment: null;
}

export interface InquiryValidationConfig {
  allowedFormVersions: readonly string[];
  allowedPrivacyNoticeVersions: readonly string[];
  whatsappEnabled?: boolean;
}

export type InquiryValidationCode =
  | "validation_failed"
  | "route_mismatch"
  | "unsupported_rule_version"
  | "unsupported_form_version"
  | "unsupported_privacy_notice"
  | "whatsapp_disabled";

export type InquiryValidationResult =
  | {
      ok: true;
      value: NormalizedInquiryPayload;
    }
  | {
      ok: false;
      code: InquiryValidationCode;
      fieldErrors: Record<string, string>;
    };

type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue };

const uuidV4Pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const e164Pattern = /^\+[1-9][0-9]{7,14}$/;
const disallowedControlCharacters =
  /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u;

function normalizeText(value: string): string {
  return value.normalize("NFC").replace(/\r\n?/g, "\n");
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: readonly string[],
  path: string,
  fieldErrors: Record<string, string>,
): boolean {
  let valid = true;
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      fieldErrors[path ? `${path}.${key}` : key] = "unknown";
      valid = false;
    }
  }
  return valid;
}

function isOneOf<T extends string>(
  value: unknown,
  options: readonly T[],
): value is T {
  return typeof value === "string" && options.includes(value as T);
}

function unicodeLength(value: string): number {
  return Array.from(value).length;
}

function normalizeEmail(value: string): string | null {
  const normalized = normalizeText(value).trim();
  if (
    normalized.length === 0 ||
    normalized.length > 254 ||
    disallowedControlCharacters.test(normalized) ||
    /\s/u.test(normalized)
  ) {
    return null;
  }

  const separator = normalized.lastIndexOf("@");
  if (separator <= 0 || separator === normalized.length - 1) return null;

  const localPart = normalized.slice(0, separator);
  const domain = normalized.slice(separator + 1).toLowerCase();
  if (localPart.length > 64 || domain.length > 253) return null;
  if (!/^[^\s@]+$/u.test(localPart)) return null;
  if (
    !domain
      .split(".")
      .every(
        (label) =>
          label.length > 0 &&
          label.length <= 63 &&
          /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label),
      )
  ) {
    return null;
  }

  return `${localPart}@${domain}`;
}

function normalizePhone(value: string): string | null {
  const normalized = normalizeText(value).trim();
  if (
    normalized.length === 0 ||
    normalized.length > 64 ||
    !/^\+[0-9\s().-]+$/u.test(normalized)
  ) {
    return null;
  }
  const phoneE164 = `+${normalized.replace(/[^0-9]/g, "")}`;
  return e164Pattern.test(phoneE164) ? phoneE164 : null;
}

export function computeCanonicalRouteSnapshot(
  answers: InquiryAnswers,
): CanonicalRouteSnapshot {
  return computeRoutePlan(answers);
}

export function canonicalizeJson(value: JsonValue): string {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("Non-finite JSON number.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalizeJson(item)).join(",")}]`;
  }

  const object = value as { readonly [key: string]: JsonValue };
  return `{${Object.keys(object)
    .sort()
    .map(
      (key) =>
        `${JSON.stringify(key)}:${canonicalizeJson(object[key] as JsonValue)}`,
    )
    .join(",")}}`;
}

export function semanticInquiryPayload(
  value: NormalizedInquiryPayload,
): JsonValue {
  const contact: JsonValue =
    value.contact.channel === "email"
      ? { channel: "email", email: value.contact.email }
      : { channel: "whatsapp", phoneE164: value.contact.phoneE164 };

  return {
    schemaVersion: value.schemaVersion,
    formVersion: value.formVersion,
    entryPath: value.entryPath,
    locale: value.locale,
    journey: {
      journeyId: value.journey.journeyId,
      revision: value.journey.revision,
      answers: {
        party: value.journey.answers.party,
        travelStyle: value.journey.answers.travelStyle,
        nights: value.journey.answers.nights,
        pace: value.journey.answers.pace,
      },
      routeId: value.journey.routeId,
      ruleVersion: value.journey.ruleVersion,
    },
    contact,
    note: value.note,
    privacyNoticeVersion: value.privacyNoticeVersion,
    attribution: {
      landingPath: value.attribution.landingPath,
      utmSource: value.attribution.utmSource,
      utmMedium: value.attribution.utmMedium,
      utmCampaign: value.attribution.utmCampaign,
    },
    experiment: null,
  };
}

export function validateAndNormalizeInquiry(
  input: unknown,
  config: InquiryValidationConfig,
): InquiryValidationResult {
  const fieldErrors: Record<string, string> = {};
  if (!isPlainObject(input)) {
    return {
      ok: false,
      code: "validation_failed",
      fieldErrors: { request: "invalid" },
    };
  }

  hasOnlyKeys(
    input,
    [
      "schemaVersion",
      "formVersion",
      "entryPath",
      "locale",
      "journey",
      "contact",
      "note",
      "privacyNoticeVersion",
      "attribution",
      "experiment",
      "antiAbuse",
    ],
    "",
    fieldErrors,
  );

  if (input.schemaVersion !== inquirySchemaVersion) {
    fieldErrors.schemaVersion = "unsupported";
  }
  if (
    typeof input.formVersion !== "string" ||
    !config.allowedFormVersions.includes(input.formVersion)
  ) {
    fieldErrors.formVersion = "unsupported";
  }
  if (input.entryPath !== "generated_route") {
    fieldErrors.entryPath = "invalid";
  }
  if (!isOneOf(input.locale, inquiryLocales)) {
    fieldErrors.locale = "invalid";
  }
  if (
    typeof input.privacyNoticeVersion !== "string" ||
    !config.allowedPrivacyNoticeVersions.includes(input.privacyNoticeVersion)
  ) {
    fieldErrors.privacyNoticeVersion = "unsupported";
  }
  if (input.experiment !== null) {
    fieldErrors.experiment = "must_be_null";
  }

  const journey = input.journey;
  let answers: InquiryAnswers | null = null;
  let journeyId = "";
  let journeyRevision = 0;
  let clientRouteId = "";
  let clientRuleVersion = "";
  if (!isPlainObject(journey)) {
    fieldErrors.journey = "required";
  } else {
    hasOnlyKeys(
      journey,
      ["journeyId", "revision", "answers", "routeId", "ruleVersion"],
      "journey",
      fieldErrors,
    );
    if (
      typeof journey.journeyId !== "string" ||
      !uuidV4Pattern.test(journey.journeyId)
    ) {
      fieldErrors["journey.journeyId"] = "invalid";
    } else {
      journeyId = journey.journeyId.toLowerCase();
    }
    if (
      typeof journey.revision !== "number" ||
      !Number.isSafeInteger(journey.revision) ||
      journey.revision < 1 ||
      journey.revision > 1_000_000
    ) {
      fieldErrors["journey.revision"] = "invalid";
    } else {
      journeyRevision = journey.revision;
    }
    if (typeof journey.routeId !== "string" || journey.routeId.length > 80) {
      fieldErrors["journey.routeId"] = "invalid";
    } else {
      clientRouteId = journey.routeId;
    }
    if (
      typeof journey.ruleVersion !== "string" ||
      journey.ruleVersion.length > 64
    ) {
      fieldErrors["journey.ruleVersion"] = "invalid";
    } else {
      clientRuleVersion = journey.ruleVersion;
    }

    if (!isPlainObject(journey.answers)) {
      fieldErrors["journey.answers"] = "required";
    } else {
      hasOnlyKeys(
        journey.answers,
        ["party", "travelStyle", "nights", "pace"],
        "journey.answers",
        fieldErrors,
      );
      const candidate = journey.answers;
      if (!isOneOf(candidate.party, travelPartyIds)) {
        fieldErrors["journey.answers.party"] = "invalid";
      }
      if (!isOneOf(candidate.travelStyle, travelStyleIds)) {
        fieldErrors["journey.answers.travelStyle"] = "invalid";
      }
      if (!isOneOf(candidate.nights, tripNightsIds)) {
        fieldErrors["journey.answers.nights"] = "invalid";
      }
      if (!isOneOf(candidate.pace, tripPaceIds)) {
        fieldErrors["journey.answers.pace"] = "invalid";
      }
      if (
        isOneOf(candidate.party, travelPartyIds) &&
        isOneOf(candidate.travelStyle, travelStyleIds) &&
        isOneOf(candidate.nights, tripNightsIds) &&
        isOneOf(candidate.pace, tripPaceIds)
      ) {
        answers = {
          party: candidate.party,
          travelStyle: candidate.travelStyle,
          nights: candidate.nights,
          pace: candidate.pace,
        };
      }
    }
  }

  const contact = input.contact;
  let normalizedContact: NormalizedInquiryContact | null = null;
  let contactCode: InquiryValidationCode | null = null;
  if (!isPlainObject(contact)) {
    fieldErrors.contact = "required";
  } else if (contact.channel === "email") {
    hasOnlyKeys(contact, ["channel", "email"], "contact", fieldErrors);
    if (typeof contact.email !== "string") {
      fieldErrors["contact.email"] = "required";
    } else {
      const email = normalizeEmail(contact.email);
      if (email === null) {
        fieldErrors["contact.email"] = "invalid";
      } else {
        normalizedContact = { channel: "email", email };
      }
    }
  } else if (contact.channel === "whatsapp") {
    hasOnlyKeys(contact, ["channel", "phoneRaw"], "contact", fieldErrors);
    if (!config.whatsappEnabled) {
      fieldErrors["contact.channel"] = "disabled";
      contactCode = "whatsapp_disabled";
    }
    if (typeof contact.phoneRaw !== "string") {
      fieldErrors["contact.phoneRaw"] = "required";
    } else {
      const phoneE164 = normalizePhone(contact.phoneRaw);
      if (phoneE164 === null) {
        fieldErrors["contact.phoneRaw"] = "invalid";
      } else if (config.whatsappEnabled) {
        normalizedContact = { channel: "whatsapp", phoneE164 };
      }
    }
  } else {
    hasOnlyKeys(contact, ["channel"], "contact", fieldErrors);
    fieldErrors["contact.channel"] = "invalid";
  }

  let note: string | null = null;
  if (input.note !== undefined && input.note !== null) {
    if (typeof input.note !== "string") {
      fieldErrors.note = "invalid";
    } else {
      const normalizedNote = normalizeText(input.note).trim();
      if (unicodeLength(normalizedNote) > 2_000) {
        fieldErrors.note = "too_long";
      } else if (disallowedControlCharacters.test(normalizedNote)) {
        fieldErrors.note = "invalid_control_character";
      } else if (normalizedNote.length > 0) {
        note = normalizedNote;
      }
    }
  }

  const attribution = input.attribution;
  let normalizedAttribution: NormalizedInquiryAttribution | null = null;
  if (!isPlainObject(attribution)) {
    fieldErrors.attribution = "required";
  } else {
    hasOnlyKeys(
      attribution,
      ["landingPath", "utmSource", "utmMedium", "utmCampaign"],
      "attribution",
      fieldErrors,
    );
    const landingPath =
      typeof attribution.landingPath === "string"
        ? normalizeText(attribution.landingPath).trim()
        : "";
    if (
      landingPath.length === 0 ||
      landingPath.length > 200 ||
      !landingPath.startsWith("/") ||
      landingPath.startsWith("//") ||
      landingPath.includes("://") ||
      disallowedControlCharacters.test(landingPath)
    ) {
      fieldErrors["attribution.landingPath"] = "invalid";
    }

    const normalizeUtm = (key: "utmSource" | "utmMedium" | "utmCampaign") => {
      const raw = attribution[key];
      if (raw === undefined || raw === null || raw === "") return null;
      if (typeof raw !== "string") {
        fieldErrors[`attribution.${key}`] = "invalid";
        return null;
      }
      const normalized = normalizeText(raw).trim();
      if (
        unicodeLength(normalized) > 100 ||
        disallowedControlCharacters.test(normalized)
      ) {
        fieldErrors[`attribution.${key}`] = "invalid";
        return null;
      }
      return normalized || null;
    };

    normalizedAttribution = {
      landingPath,
      utmSource: normalizeUtm("utmSource"),
      utmMedium: normalizeUtm("utmMedium"),
      utmCampaign: normalizeUtm("utmCampaign"),
    };
  }

  const antiAbuse = input.antiAbuse;
  if (!isPlainObject(antiAbuse)) {
    fieldErrors.antiAbuse = "required";
  } else {
    hasOnlyKeys(antiAbuse, ["companyWebsite"], "antiAbuse", fieldErrors);
    if (
      typeof antiAbuse.companyWebsite !== "string" ||
      antiAbuse.companyWebsite.trim() !== ""
    ) {
      fieldErrors.request = "invalid";
    }
  }

  if (clientRuleVersion && clientRuleVersion !== currentRouteRuleVersion) {
    return {
      ok: false,
      code: "unsupported_rule_version",
      fieldErrors: {
        ...fieldErrors,
        "journey.ruleVersion": "unsupported",
      },
    };
  }

  let routeSnapshot: CanonicalRouteSnapshot | null = null;
  if (answers !== null) {
    routeSnapshot = computeCanonicalRouteSnapshot(answers);
    if (clientRouteId && clientRouteId !== routeSnapshot.routeId) {
      return {
        ok: false,
        code: "route_mismatch",
        fieldErrors: {
          ...fieldErrors,
          "journey.routeId": "mismatch",
        },
      };
    }
  }

  if (contactCode !== null) {
    return { ok: false, code: contactCode, fieldErrors };
  }
  if (
    Object.keys(fieldErrors).length > 0 ||
    !answers ||
    !routeSnapshot ||
    !normalizedContact ||
    !normalizedAttribution ||
    !isOneOf(input.locale, inquiryLocales) ||
    typeof input.formVersion !== "string" ||
    typeof input.privacyNoticeVersion !== "string"
  ) {
    let code: InquiryValidationCode = "validation_failed";
    if (fieldErrors.formVersion === "unsupported") {
      code = "unsupported_form_version";
    } else if (fieldErrors.privacyNoticeVersion === "unsupported") {
      code = "unsupported_privacy_notice";
    }
    return { ok: false, code, fieldErrors };
  }

  return {
    ok: true,
    value: {
      schemaVersion: inquirySchemaVersion,
      formVersion: input.formVersion,
      entryPath: "generated_route",
      locale: input.locale,
      journey: {
        journeyId,
        revision: journeyRevision,
        answers,
        routeId: routeSnapshot.routeId,
        ruleVersion: currentRouteRuleVersion,
      },
      routeSnapshot,
      contact: normalizedContact,
      note,
      privacyNoticeVersion: input.privacyNoticeVersion,
      attribution: normalizedAttribution,
      experiment: null,
    },
  };
}
