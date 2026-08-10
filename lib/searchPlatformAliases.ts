import { assertValidAliasRules, type LegacyAliasRule } from "./content-system/aliases";
import { searchPlatformManifest } from "./searchPlatformManifest";

export const searchPlatformAliasRules = assertValidAliasRules(
  [
    {
      aliasPath: "/china-visa-free-uk-canada/",
      canonicalPath: "/guides/china-entry-requirements/",
      locale: "en",
      mode: "canonical-shell",
      note:
        "GitHub Pages cannot emit a server 301. Keep the existing noindex/follow compatibility page with a canonical until redirects move to a capable edge layer.",
    },
  ] satisfies readonly LegacyAliasRule[],
  searchPlatformManifest,
);
