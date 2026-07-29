import { pathToFileURL } from "node:url";
import path from "node:path";

/*
 * Homepage section three uses authored headline lines in every language. This
 * check refuses a line set that does not join back to the plain sentence it
 * came from, so layout work cannot quietly reword, drop or duplicate copy.
 *
 * Run with Node's type stripping, as the inquiry tests do:
 *   node --experimental-strip-types tools/check-planning-scope-lines.mjs
 */

const { planningScopeCopy } = await import(
  pathToFileURL(
    path.join(process.cwd(), "lib", "homegroundPlanningScopeI18n.ts"),
  ).href
);

const failures = [];

function assertJoins(locale, field, lines, expected) {
  // "|" is a soft-break marker rendered as <wbr>; it carries no text.
  const joined = lines.join("").replaceAll("|", "");

  if (joined !== expected) {
    failures.push(
      `${locale}.${field}\n    joined:   ${joined}\n    expected: ${expected}`,
    );
  }
}

for (const [locale, copy] of Object.entries(planningScopeCopy)) {
  assertJoins(locale, "titleLines", copy.titleLines, copy.title);
}

if (failures.length > 0) {
  console.error(
    `✗ ${failures.length} planning-scope line set(s) do not match their sentence:\n\n${failures.join("\n\n")}`,
  );
  process.exitCode = 1;
} else {
  const localeCount = Object.keys(planningScopeCopy).length;
  console.log(
    `✓ Planning-scope headline breaks reproduce the sentence exactly in all ${localeCount} languages.`,
  );
}
