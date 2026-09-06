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
