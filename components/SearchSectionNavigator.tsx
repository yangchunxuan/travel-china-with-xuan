import Link from "next/link";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
  type SearchSectionId,
} from "../lib/searchPlatformI18n";
import {
  getAllGuidesPath,
  getSearchSectionNavigationCopy,
  searchAssistanceSectionId,
  searchKnowledgeSectionIds,
  searchUtilitySectionId,
} from "../lib/searchSectionNavigation";
import styles from "./SearchSectionNavigator.module.css";

function CurrentMarker({ label }: { label: string }) {
  return <span className={styles.currentMarker}>{label}</span>;
}

export function SearchSectionNavigator({
  locale = "en",
  currentSection,
  id,
}: {
  locale?: HomegroundLocale;
  currentSection?: SearchSectionId;
  id?: string;
}) {
  const copy = getSearchSectionNavigationCopy(locale);
  const platformCopy = getSearchPlatformCopy(locale);
  const destinationIsCurrent = currentSection === "explore";
  const allGuidesIsCurrent = currentSection === undefined;

  return (
    <nav className={styles.navigator} aria-label={copy.ariaLabel} id={id}>
      <div className={styles.inner}>
        <header className={styles.introduction}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <div>
            <h2>{copy.title}</h2>
            <p>{copy.introduction}</p>
          </div>
        </header>

        <div className={styles.navigationGrid}>
          <section className={styles.knowledge} aria-labelledby="knowledge-navigation-title">
            <header className={styles.groupHeader}>
              <div>
                <p className={styles.groupEyebrow}>{copy.knowledge.eyebrow}</p>
                <h3 id="knowledge-navigation-title">{copy.knowledge.title}</h3>
              </div>
              <p>{copy.knowledge.description}</p>
            </header>

            <div className={styles.gatewayGrid}>
              <Link
                aria-current={destinationIsCurrent ? "page" : undefined}
                className={styles.gateway}
                data-current={destinationIsCurrent ? "true" : undefined}
                href={getSearchSectionPath("explore", locale)}
              >
                <span className={styles.gatewayEyebrow}>{copy.destinations.eyebrow}</span>
                <strong>{copy.destinations.title}</strong>
                <span className={styles.gatewayDescription}>{copy.destinations.description}</span>
                <span className={styles.gatewayAction}>
                  {destinationIsCurrent ? (
                    <CurrentMarker label={copy.currentLabel} />
                  ) : (
                    copy.destinations.action
                  )}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>

              <Link
                aria-current={allGuidesIsCurrent ? "page" : undefined}
                className={`${styles.gateway} ${styles.allGuides}`}
                data-current={allGuidesIsCurrent ? "true" : undefined}
                href={getAllGuidesPath(locale)}
              >
                <span className={styles.gatewayEyebrow}>{copy.allGuides.eyebrow}</span>
                <strong>{copy.allGuides.title}</strong>
                <span className={styles.gatewayDescription}>{copy.allGuides.description}</span>
                <span className={styles.gatewayAction}>
                  {allGuidesIsCurrent ? (
                    <CurrentMarker label={copy.currentLabel} />
                  ) : (
                    copy.allGuides.action
                  )}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>

            <ul className={styles.knowledgeLinks}>
              {searchKnowledgeSectionIds
                .filter((section) => section !== "explore")
                .map((section) => {
                  const sectionCopy = platformCopy.sections[section];
                  const isCurrent = section === currentSection;

                  return (
                    <li key={section}>
                      <Link
                        aria-current={isCurrent ? "page" : undefined}
                        data-current={isCurrent ? "true" : undefined}
                        href={getSearchSectionPath(section, locale)}
                      >
                        <span>
                          <strong>{sectionCopy.shortLabel}</strong>
                          <small>{sectionCopy.eyebrow}</small>
                        </span>
                        {isCurrent ? (
                          <CurrentMarker label={copy.currentLabel} />
                        ) : (
                          <b aria-hidden="true">↗</b>
                        )}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </section>

          <div className={styles.sideRail}>
            <Link
              aria-current={currentSection === searchUtilitySectionId ? "page" : undefined}
              className={styles.sideCard}
              data-current={currentSection === searchUtilitySectionId ? "true" : undefined}
              href={getSearchSectionPath(searchUtilitySectionId, locale)}
            >
              <span className={styles.groupEyebrow}>{copy.utility.eyebrow}</span>
              <strong>{copy.utility.title}</strong>
              <span className={styles.sideDescription}>{copy.utility.description}</span>
              <span className={styles.sideAction}>
                {currentSection === searchUtilitySectionId ? (
                  <CurrentMarker label={copy.currentLabel} />
                ) : (
                  platformCopy.sections[searchUtilitySectionId].navLabel
                )}
                <span aria-hidden="true">→</span>
              </span>
            </Link>

            <Link
              aria-current={
                currentSection === searchAssistanceSectionId ? "page" : undefined
              }
              className={styles.sideCard}
              data-current={
                currentSection === searchAssistanceSectionId ? "true" : undefined
              }
              href={getSearchSectionPath(searchAssistanceSectionId, locale)}
            >
              <span className={styles.groupEyebrow}>{copy.assistance.eyebrow}</span>
              <strong>{copy.assistance.title}</strong>
              <span className={styles.sideDescription}>{copy.assistance.description}</span>
              <span className={styles.sideAction}>
                {currentSection === searchAssistanceSectionId ? (
                  <CurrentMarker label={copy.currentLabel} />
                ) : (
                  platformCopy.sections[searchAssistanceSectionId].navLabel
                )}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
