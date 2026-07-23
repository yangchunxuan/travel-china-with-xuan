"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./TantanZhangjiajieStoryPage.module.css";

type ContentsSection = {
  id: string;
  title: string;
};

export function TantanStoryContentsNav({
  label,
  title,
  sections,
}: {
  label: string;
  title: string;
  sections: ContentsSection[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionKey = useMemo(
    () => sections.map((section) => section.id).join("|"),
    [sections],
  );

  useEffect(() => {
    const sectionIds = sectionKey.split("|").filter(Boolean);
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) return;

    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const readingLine = Math.min(
        Math.max(window.innerHeight * 0.28, 120),
        260,
      );
      const sectionRects = sectionElements.map((element) => ({
        element,
        rect: element.getBoundingClientRect(),
      }));
      let nextActiveId: string | null = null;

      for (const [index, section] of sectionRects.entries()) {
        const nextSection = sectionRects[index + 1];
        const activeZoneEnd = nextSection?.rect.top ?? section.rect.bottom;

        if (section.rect.top <= readingLine && activeZoneEnd > readingLine) {
          nextActiveId = section.element.id;
          break;
        }
      }

      setActiveId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId,
      );
    };

    const scheduleUpdate = () => {
      if (animationFrame !== 0) return;
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
    };
  }, [sectionKey]);

  return (
    <nav className={styles.contents} aria-labelledby="story-contents-title">
      <p>{label}</p>
      <h2 id="story-contents-title">{title}</h2>
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
