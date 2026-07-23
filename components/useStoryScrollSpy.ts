"use client";

import { useEffect, useMemo, useState } from "react";

export function useStoryScrollSpy(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  useEffect(() => {
    const ids = sectionKey.split("|").filter(Boolean);
    const sectionElements = ids
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

  return { activeId, setActiveId };
}
