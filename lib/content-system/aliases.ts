// Node's built-in TypeScript test runner requires explicit extensions. The
// application build accepts this import through the TS5097 suppression.
// @ts-ignore TS5097: intentionally executable by node --experimental-strip-types.
import { normalizeContentPath } from "./path.ts";
// @ts-ignore TS5097: intentionally executable by node --experimental-strip-types.
import type { ContentManifest, SiteLocale } from "./types.ts";

export type LegacyAliasMode = "redirect" | "canonical-shell";

export interface LegacyAliasRule {
  readonly aliasPath: string;
  readonly canonicalPath: string;
  readonly locale: SiteLocale;
  readonly mode: LegacyAliasMode;
  readonly note: string;
}

export function assertValidAliasRules(
  rules: readonly LegacyAliasRule[],
  manifest: ContentManifest,
) {
  const canonicalPaths = new Set(manifest.entries.map((entry) => entry.path));
  const rulesByAlias = new Map<string, LegacyAliasRule>();

  for (const rule of rules) {
    const alias = normalizeContentPath(rule.locale, rule.aliasPath);
    const target = normalizeContentPath(rule.locale, rule.canonicalPath);
    if (alias === target) {
      throw new Error(`Alias must not point to itself: ${alias}.`);
    }
    if (canonicalPaths.has(alias)) {
      throw new Error(`Alias collides with a canonical path: ${alias}.`);
    }
    if (!canonicalPaths.has(target)) {
      throw new Error(`Alias target is not in the content manifest: ${target}.`);
    }
    if (rulesByAlias.has(alias)) {
      throw new Error(`Duplicate alias rule: ${alias}.`);
    }
    rulesByAlias.set(alias, rule);
  }

  for (const [alias, rule] of rulesByAlias) {
    let target = normalizeContentPath(rule.locale, rule.canonicalPath);
    const visited = new Set([alias]);
    while (rulesByAlias.has(target)) {
      if (visited.has(target)) {
        throw new Error(`Alias cycle detected at ${target}.`);
      }
      visited.add(target);
      const next = rulesByAlias.get(target);
      target = normalizeContentPath(next.locale, next.canonicalPath);
    }
  }

  return rules;
}
