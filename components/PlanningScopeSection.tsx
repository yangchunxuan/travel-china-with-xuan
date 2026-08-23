"use client";

import { getPlanningScopeCopy } from "../lib/homegroundPlanningScopeI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { handleHomegroundHashClick } from "../lib/homegroundNavigation";
import styles from "./PlanningScopeSection.module.css";

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
 * Homepage section three: the value of planning one China trip as a whole.
 *
 * The image supplies atmosphere; the heading, three outcomes and contact
 * action carry the service message. There is no case study or secondary offer
 * competing with the whole-trip proposition.
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
        <header className={styles.intro}>
          <h2 id="planning-proof-title" tabIndex={-1}>
            {copy.titleLines.map((line, index) => (
              <span className={styles.titleLine} key={`${index}-${line}`}>
                <SoftBreaks line={line} />
              </span>
            ))}
          </h2>
          <p>{copy.body}</p>
        </header>

        <div className={styles.visual}>
          <img
            alt=""
            className={styles.image}
            decoding="async"
            height="1200"
            loading="lazy"
            src="/images/home/hangzhou-west-lake-leifeng-1600.webp"
            width="1600"
          />
        </div>

        <div className={styles.outcomes}>
          <ul className={styles.values}>
            {copy.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>

          <a
            className={styles.cta}
            href="#planner-contact"
            onClick={(event) =>
              handleHomegroundHashClick(event, "#planner-contact")
            }
          >
            <span>{copy.cta}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
