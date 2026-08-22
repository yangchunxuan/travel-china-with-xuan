const homegroundFacebookPageId = "61591910731724";
const defaultFacebookPageUrl =
  "https://www.facebook.com/profile.php?id=61591910731724";

function isHomegroundFacebookUsername(pathname: string): boolean {
  return /^\/homeground[a-z0-9.]{0,40}\/?$/iu.test(pathname);
}

export function trustedFacebookPageUrl(value: string): string {
  try {
    const parsed = new URL(value);
    const isNumericProfile =
      parsed.pathname === "/profile.php" &&
      parsed.searchParams.size === 1 &&
      parsed.searchParams.get("id") === homegroundFacebookPageId;
    const isConfirmedPeopleUrl =
      parsed.pathname.replace(/\/+$/u, "") ===
        `/people/Homeground-China-Journeys/${homegroundFacebookPageId}` &&
      !parsed.search;
    const isBrandUsername =
      isHomegroundFacebookUsername(parsed.pathname) && !parsed.search;

    if (
      parsed.protocol !== "https:" ||
      parsed.hostname !== "www.facebook.com" ||
      parsed.port ||
      parsed.username ||
      parsed.password ||
      parsed.hash ||
      (!isNumericProfile && !isConfirmedPeopleUrl && !isBrandUsername)
    ) {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

export function trustedMessengerUrl(value: string): string {
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/u, "");
    const isNumericPageId = path === `/${homegroundFacebookPageId}`;
    const isBrandUsername = isHomegroundFacebookUsername(path);

    if (
      parsed.protocol !== "https:" ||
      parsed.hostname !== "m.me" ||
      parsed.port ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash ||
      (!isNumericPageId && !isBrandUsername)
    ) {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

export function getHomegroundFacebookPageUrl(): string {
  return trustedFacebookPageUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_FACEBOOK_PAGE_URL?.trim() ||
      defaultFacebookPageUrl,
  );
}

export function getHomegroundSocialProfileUrls(): string[] {
  return [getHomegroundFacebookPageUrl()].filter(Boolean);
}
