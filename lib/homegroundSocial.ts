const homegroundFacebookPageId = "61591910731724";
/** The claimed Trustpilot profile (claimed September 2026), where customers review Homeground. */
const defaultTrustpilotProfileUrl = "https://www.trustpilot.com/review/homegroundchina.com";
const defaultFacebookPageUrl =
  "https://www.facebook.com/profile.php?id=61591910731724";

export type HomegroundSocialPlatform =
  | "x"
  | "instagram"
  | "facebook"
  | "youtube";

export interface HomegroundSocialProfile {
  readonly platform: HomegroundSocialPlatform;
  readonly label: string;
  readonly url: string;
}

function hasSafeProfileUrlShape(
  parsed: URL,
  allowSearch = false,
): boolean {
  return (
    parsed.protocol === "https:" &&
    !parsed.port &&
    !parsed.username &&
    !parsed.password &&
    (allowSearch || !parsed.search) &&
    !parsed.hash
  );
}

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
      !hasSafeProfileUrlShape(parsed, isNumericProfile) ||
      parsed.hostname !== "www.facebook.com" ||
      (!isNumericProfile && !isConfirmedPeopleUrl && !isBrandUsername)
    ) {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

export function trustedXProfileUrl(value: string): string {
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/u, "");
    if (
      !hasSafeProfileUrlShape(parsed) ||
      !["x.com", "www.x.com"].includes(parsed.hostname) ||
      !/^\/[A-Za-z0-9_]{1,15}$/u.test(path)
    ) {
      return "";
    }
    return `https://x.com${path}`;
  } catch {
    return "";
  }
}

export function trustedInstagramProfileUrl(value: string): string {
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/u, "");
    const username = path.slice(1);
    const isValidUsername =
      /^[A-Za-z0-9._]{1,30}$/u.test(username) &&
      !username.startsWith(".") &&
      !username.endsWith(".") &&
      !username.includes("..");
    if (
      !hasSafeProfileUrlShape(parsed) ||
      !["instagram.com", "www.instagram.com"].includes(parsed.hostname) ||
      !isValidUsername
    ) {
      return "";
    }
    return `https://www.instagram.com${path}/`;
  } catch {
    return "";
  }
}

export function trustedYouTubeProfileUrl(value: string): string {
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/u, "");
    const isHandle = /^\/@[A-Za-z0-9._-]{3,30}$/u.test(path);
    const isChannel = /^\/channel\/UC[A-Za-z0-9_-]{20,30}$/u.test(path);
    if (
      !hasSafeProfileUrlShape(parsed) ||
      !["youtube.com", "www.youtube.com"].includes(parsed.hostname) ||
      (!isHandle && !isChannel)
    ) {
      return "";
    }
    return `https://www.youtube.com${path}`;
  } catch {
    return "";
  }
}

/** Only Homeground's own Trustpilot review page: www.trustpilot.com/review/homegroundchina.com. */
export function trustedTrustpilotProfileUrl(value: string): string {
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/u, "");
    if (
      !hasSafeProfileUrlShape(parsed) ||
      parsed.hostname !== "www.trustpilot.com" ||
      path !== "/review/homegroundchina.com"
    ) {
      return "";
    }
    return `https://www.trustpilot.com${path}`;
  } catch {
    return "";
  }
}

export function getHomegroundTrustpilotProfileUrl(): string {
  return trustedTrustpilotProfileUrl(defaultTrustpilotProfileUrl);
}

/** The Messenger chat the site links to; an override must pass trustedMessengerUrl. */
export function homegroundMessengerUrl(): string {
  return trustedMessengerUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_MESSENGER_URL?.trim() ||
      `https://m.me/${homegroundFacebookPageId}`,
  );
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

export function getHomegroundXProfileUrl(): string {
  return trustedXProfileUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_X_PROFILE_URL?.trim() || "",
  );
}

export function getHomegroundInstagramProfileUrl(): string {
  return trustedInstagramProfileUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_INSTAGRAM_PROFILE_URL?.trim() || "",
  );
}

export function getHomegroundYouTubeProfileUrl(): string {
  return trustedYouTubeProfileUrl(
    process.env.NEXT_PUBLIC_HOMEGROUND_YOUTUBE_PROFILE_URL?.trim() || "",
  );
}

export function getHomegroundSocialProfiles(): HomegroundSocialProfile[] {
  return [
    {
      platform: "x",
      label: "X",
      url: getHomegroundXProfileUrl(),
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: getHomegroundInstagramProfileUrl(),
    },
    {
      platform: "facebook",
      label: "Facebook",
      url: getHomegroundFacebookPageUrl(),
    },
    {
      platform: "youtube",
      label: "YouTube",
      url: getHomegroundYouTubeProfileUrl(),
    },
  ];
}

/**
 * Every public page that is Homeground elsewhere, for the Organization's
 * sameAs: the social profiles, plus the Trustpilot review page, which is not
 * a social channel and so stays out of the footer icons.
 */
export function getHomegroundSocialProfileUrls(): string[] {
  return [
    ...getHomegroundSocialProfiles().map((profile) => profile.url),
    getHomegroundTrustpilotProfileUrl(),
  ].filter(Boolean);
}
