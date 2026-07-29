import { pathToFileURL } from "node:url";
import path from "node:path";

/*
 * The typographic variants of homepage section three set the same sentences one
 * clause per line. This check refuses any line set that does not join back to
 * the plain sentence it came from, so a layout experiment can never quietly
 * reword, drop or duplicate copy in any language.
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

function assertJoins(locale, field, lines, expected, join) {
  // "|" is a soft-break marker rendered as <wbr>; it carries no text.
  const joined = lines.join(join).replaceAll("|", "");

  if (joined !== expected) {
    failures.push(
      `${locale}.${field}\n    joined:   ${joined}\n    expected: ${expected}`,
    );
  }
}

for (const [locale, copy] of Object.entries(planningScopeCopy)) {
  const { lineJoin } = copy;

  assertJoins(locale, "titleLines", copy.titleLines, copy.title, "");
  assertJoins(locale, "leadLines", copy.leadLines, copy.lead, lineJoin);
  assertJoins(
    locale,
    "keepNoteLines",
    copy.keepNoteLines,
    copy.keepNote,
    lineJoin,
  );

  copy.options.forEach((option, index) => {
    assertJoins(
      locale,
      `options[${index}].detailLines`,
      option.detailLines,
      option.detail,
      lineJoin,
    );
  });
}

if (failures.length > 0) {
  console.error(
    `✗ ${failures.length} planning-scope line set(s) do not match their sentence:\n\n${failures.join("\n\n")}`,
  );
  process.exitCode = 1;
} else {
  const localeCount = Object.keys(planningScopeCopy).length;
  console.log(
    `✓ Planning-scope line breaks reproduce every sentence exactly in all ${localeCount} languages.`,
  );
}
