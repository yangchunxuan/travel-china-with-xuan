/**
 * Public Inquiry contract versions shared by the browser, mock API and Edge
 * Function validation. Change these only with a coordinated deploy.
 */
export const inquirySchemaVersion = 1 as const;
export const currentInquiryFormVersion = "2026-07-18.1";
export const destinationInquirySchemaVersion = 2 as const;
export const legacyDestinationInquiryFormVersion = "2026-07-19.1";
export const previousDestinationInquiryFormVersion = "2026-07-20.1";
export const budgetDestinationInquiryFormVersion = "2026-07-20.2";
export const currentDestinationInquiryFormVersion = "2026-07-21.1";
export const supportedDestinationInquiryFormVersions = [
  legacyDestinationInquiryFormVersion,
  previousDestinationInquiryFormVersion,
  budgetDestinationInquiryFormVersion,
  currentDestinationInquiryFormVersion,
] as const;
export const legacyPrivacyNoticeVersion = "2026-07-19.1";
export const previousPrivacyNoticeVersion = "2026-07-20.1";
export const budgetPrivacyNoticeVersion = "2026-07-20.2";
export const currentPrivacyNoticeVersion = "2026-07-21.1";
export const inquirySubmitSurfaceByLocale = {
  en: "/",
  zh: "/zh/",
  ko: "/ko/",
} as const;
export const inquirySavedBrowserEventName = "homeground:inquiry-saved";
