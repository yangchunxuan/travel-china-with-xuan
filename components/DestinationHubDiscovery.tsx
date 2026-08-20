import Link from "next/link";
import { publishedDestinationHubRegistry } from "../lib/destinationHubs";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getSearchCollection } from "../lib/searchCollectionI18n";
import styles from "./DestinationHubDiscovery.module.css";

export function DestinationHubDiscovery({
  headingId,
  locale,
  showIntro = true,
}: {
  headingId: string;
  locale: HomegroundLocale;
  showIntro?: boolean;
}) {
  const collection = getSearchCollection("explore-cities-neighborhoods");
  const collectionCopy = collection.locales[locale];
  const HubTitle = showIntro ? "h3" : "h2";

  return (
    <section
      aria-labelledby={headingId}
      className={styles.discovery}
      data-homeground-locale={locale}
    >
      <div className={styles.inner}>
        {showIntro ? (
          <header className={styles.intro}>
            <p className={styles.eyebrow}>{collectionCopy.label}</p>
            <h2 id={headingId}>{collectionCopy.title}</h2>
            <p>{collectionCopy.description}</p>
          </header>
        ) : null}

        <nav aria-labelledby={headingId}>
          <ul className={styles.grid}>
            {publishedDestinationHubRegistry.map((hub) => {
              const hubCopy = hub.locales[locale];

              return (
                <li key={hub.id}>
                  <Link className={styles.card} href={hubCopy.path}>
                    <span className={styles.city}>{hubCopy.navTitle}</span>
                    <HubTitle>{hubCopy.title}</HubTitle>
                    <span className={styles.description}>
                      {hubCopy.description}
                    </span>
                    <span aria-hidden="true" className={styles.arrow}>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
