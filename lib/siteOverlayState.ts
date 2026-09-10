let privacyManagerOpen = false;
const privacyManagerListeners = new Set<() => void>();

export function getPrivacyManagerOpen() {
  return privacyManagerOpen;
}

export function getServerPrivacyManagerOpen() {
  return false;
}

export function subscribePrivacyManager(listener: () => void) {
  privacyManagerListeners.add(listener);
  return () => {
    privacyManagerListeners.delete(listener);
  };
}

export function setPrivacyManagerOpen(open: boolean) {
  if (privacyManagerOpen === open) return;
  privacyManagerOpen = open;
  privacyManagerListeners.forEach((listener) => listener());
}

let navigationMenuOpen = false;
const navigationMenuListeners = new Set<() => void>();
export function getNavigationMenuOpen() { return navigationMenuOpen; }
export function subscribeNavigationMenu(listener: () => void) {
  navigationMenuListeners.add(listener);
  return () => { navigationMenuListeners.delete(listener); };
}
export function setNavigationMenuOpen(open: boolean) {
  if (navigationMenuOpen === open) return;
  navigationMenuOpen = open;
  navigationMenuListeners.forEach((listener) => listener());
}

let inquiryOpen = false;
const inquiryListeners = new Set<() => void>();
export function getInquiryOpen() { return inquiryOpen; }
export function subscribeInquiry(listener: () => void) {
  inquiryListeners.add(listener);
  return () => { inquiryListeners.delete(listener); };
}
export function setInquiryOpen(open: boolean) {
  if (inquiryOpen === open) return;
  inquiryOpen = open;
  inquiryListeners.forEach(listener => listener());
}
let newsletterExpanded = false;
const newsletterListeners = new Set<() => void>();
export function getNewsletterExpanded() { return newsletterExpanded; }
export function subscribeNewsletterExpanded(listener: () => void) {
  newsletterListeners.add(listener);
  return () => { newsletterListeners.delete(listener); };
}
export function setNewsletterExpanded(open: boolean) {
  if (newsletterExpanded === open) return;
  newsletterExpanded = open;
  newsletterListeners.forEach(listener => listener());
}

let consentBannerPending = true;
const consentBannerListeners = new Set<() => void>();
export function getConsentBannerPending() { return consentBannerPending; }
export function getServerConsentBannerPending() { return true; }
export function subscribeConsentBanner(listener: () => void) {
  consentBannerListeners.add(listener);
  return () => { consentBannerListeners.delete(listener); };
}
export function setConsentBannerPending(pending: boolean) {
  if (consentBannerPending === pending) return;
  consentBannerPending = pending;
  consentBannerListeners.forEach(listener => listener());
}

let newsletterDockSide: "left" | "right" = "right";
const newsletterDockListeners = new Set<() => void>();
export function getNewsletterDockSide() { return newsletterDockSide; }
export function getServerNewsletterDockSide() { return "right" as const; }
export function subscribeNewsletterDock(listener: () => void) {
  newsletterDockListeners.add(listener);
  return () => { newsletterDockListeners.delete(listener); };
}
export function setNewsletterDockSide(side: "left" | "right") {
  if (newsletterDockSide === side) return;
  newsletterDockSide = side;
  newsletterDockListeners.forEach(listener => listener());
}
