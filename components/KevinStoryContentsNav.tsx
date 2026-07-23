"use client";

import { ChevronRight } from "lucide-react";
import { useStoryScrollSpy } from "./useStoryScrollSpy";
import styles from "./KevinPreparationStoryPage.module.css";

type ContentsSection = {
  id: string;
  title: string;
};

export function KevinStoryContentsNav({
  label,
  title,
  sections,
}: {
  label: string;
  title: string;
  sections: ContentsSection[];
}) {
  const { activeId, setActiveId } = useStoryScrollSpy(
    sections.map((section) => section.id),
  );

  return (
    <nav className={styles.contents} aria-labelledby="kevin-contents-title">
      <p>{label}</p>
      <h2 id="kevin-contents-title">{title}</h2>
      <ol>
        {sections.map((section, index) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(section.id)}
              >
                <ChevronRight
                  className={styles.contentsArrow}
                  aria-hidden="true"
                  size={16}
                  strokeWidth={2.2}
                />
                <span className={styles.contentsNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.contentsItemTitle}>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
