/**
 * Public Inquiry contract versions shared by the browser, mock API and Edge
 * Function validation. Change these only with a coordinated deploy.
 */
export const inquirySchemaVersion = 1 as const;
export const currentInquiryFormVersion = "2026-07-18.1";
export const destinationInquirySchemaVersion = 2 as const;
export const previousDestinationInquiryFormVersion = "2026-07-19.1";
export const currentDestinationInquiryFormVersion = "2026-07-20.1";
export const supportedDestinationInquiryFormVersions = [
  previousDestinationInquiryFormVersion,
  currentDestinationInquiryFormVersion,
] as const;
export const currentPrivacyNoticeVersion = "2026-07-20.1";
