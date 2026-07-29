import { getPlanningScopeCopy } from "../lib/homegroundPlanningScopeI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import styles from "./PlanningScopeSection.module.css";

/**
 * Splits a line on the `|` soft-break marker into <wbr> break opportunities.
 * <wbr> contributes no text, so the heading still reads as one sentence.
 */
function SoftBreaks({ line }: { line: string }) {
  const parts = line.split("|");

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${index}-${part}`}>
          {part}
          {index < parts.length - 1 ? <wbr /> : null}
        </span>
      ))}
    </>
  );
}

/**
 * Renders authored clause breaks as block lines. The join character is kept in
 * the text so the element's text content still reads as the original sentence;
 * tools/check-planning-scope-lines.mjs enforces that.
 */
function ClauseLines({
  join,
  lines,
}: {
  join: string;
  lines: readonly string[];
}) {
  return (
    <>
      {lines.map((line, index) => (
        <span className={styles.clause} key={`${index}-${line}`}>
          {line}
          {index < lines.length - 1 ? join : ""}
        </span>
      ))}
    </>
  );
}

/**
 * Homepage section three: how much of the trip a traveller hands over.
 *
 * Reading order is deliberate — the choice first, then one worked example that
 * proves the choice is real, then the commercial boundary. Nothing here is
 * interactive, so the section carries no focus traps and no motion.
 */
export function PlanningScopeSection({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getPlanningScopeCopy(locale);

  return (
    <section
      aria-labelledby="planning-proof-title"
      className={styles.scope}
      data-homeground-locale={locale}
      id="planning-proof"
      lang={copy.htmlLang}
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="planning-proof-title" tabIndex={-1}>
            {copy.titleLines.map((line, index) => (
              <span className={styles.titleLine} key={`${index}-${line}`}>
                <SoftBreaks line={line} />
              </span>
            ))}
          </h2>
        </header>

        <div className={styles.choice}>
          {copy.options.map((option) => (
            <div className={styles.choiceColumn} key={option.label}>
              <h3 className={styles.choiceLabel}>{option.label}</h3>
              <p className={styles.choiceDetail}>
                <ClauseLines
                  join={copy.lineJoin}
                  lines={option.detailLines}
                />
              </p>
            </div>
          ))}
          <div className={styles.choiceNoteRow}>
            <p className={styles.choiceNote}>
              <ClauseLines join={copy.lineJoin} lines={copy.keepNoteLines} />
            </p>
          </div>
        </div>

        <article
          aria-labelledby="planning-example-title"
          className={styles.example}
        >
          <figure className={styles.exampleFigure}>
            <figcaption>{copy.imageCaption}</figcaption>
            <img
              alt={copy.imageAlt}
              decoding="async"
              height="1066"
              loading="lazy"
              src="/images/home/hangzhou-1600.jpg"
              width="1600"
            />
          </figure>

          <div className={styles.examplePanel}>
            <p className={styles.panelEyebrow}>{copy.exampleEyebrow}</p>
            <h3 className={styles.panelTitle} id="planning-example-title">
              {copy.exampleTitle}
            </h3>
            <dl className={styles.panelRows}>
              {copy.exampleRows.map((row) => (
                <div key={row.term}>
                  <dt>{row.term}</dt>
                  <dd>{row.detail}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.panelNote}>{copy.exampleNote}</p>
          </div>
        </article>

        <div className={styles.beforePay}>
          <p className={styles.beforePayLabel}>{copy.beforePayLabel}</p>
          <p className={styles.beforePayBody}>{copy.beforePay}</p>
        </div>
      </div>
    </section>
  );
}
