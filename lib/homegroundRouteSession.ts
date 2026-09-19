let routeHasMounted = false;

const internalReloadStorageKey = "homeground:internal-route";
const internalReloadDatasetKey = "homegroundInternalNavigation";
const internalReloadMarkerLifetimeMs = 15_000;

export const homegroundInternalRouteBootstrap = `(()=>{try{const k=${JSON.stringify(internalReloadStorageKey)};const r=sessionStorage.getItem(k);if(!r)return;sessionStorage.removeItem(k);const m=JSON.parse(r);if(m&&m.path===location.pathname&&Math.abs(Date.now()-m.createdAt)<=${internalReloadMarkerLifetimeMs})document.documentElement.dataset.${internalReloadDatasetKey}="true";}catch{}})();`;

export function hasMountedHomegroundRoute() {
  return routeHasMounted;
}

export function markHomegroundRouteMounted() {
  routeHasMounted = true;
}

/** Carries an internal-navigation signal across Next.js root-layout reloads. */
export function markHomegroundInternalReload(href: string) {
  if (typeof window === "undefined") return;
  try {
    const target = new URL(href, window.location.href);
    window.sessionStorage.setItem(
      internalReloadStorageKey,
      JSON.stringify({ path: target.pathname, createdAt: Date.now() }),
    );
  } catch {
    // Storage can be unavailable in strict browser modes. Navigation still works.
  }
}

export function arrivedViaHomegroundInternalReload() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset[internalReloadDatasetKey] === "true"
  );
}

export function clearHomegroundInternalReloadFlag() {
  if (typeof document === "undefined") return;
  delete document.documentElement.dataset[internalReloadDatasetKey];
}
