"use client";

import { useLayoutEffect } from "react";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

const mix = (current: number, target: number, amount: number) =>
  current + (target - current) * amount;

const setNumber = (
  element: HTMLElement,
  name: string,
  value: number,
  unit = "",
) => {
  element.style.setProperty(name, `${value.toFixed(3)}${unit}`);
};

const clearProperties = (element: HTMLElement, names: readonly string[]) => {
  for (const name of names) element.style.removeProperty(name);
};

const collageProperties = [
  "--collage-x",
  "--collage-y",
  "--collage-rotate",
  "--collage-scale",
  "--collage-opacity",
  "--collage-caption-opacity",
  "--collage-caption-y",
  "--collage-image-y",
] as const;

const memberProperties = [
  "--member-photo-x",
  "--member-photo-y",
  "--member-photo-scale",
  "--member-photo-opacity",
  "--member-image-y",
  "--member-story-x",
  "--member-story-y",
  "--member-story-opacity",
  "--member-rail-y",
  "--member-rail-opacity",
] as const;

export function HomegroundStudioMotion({ rootId }: { rootId: string }) {
  useLayoutEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMotion = window.matchMedia("(min-width: 901px)");
    const collageScene = root.querySelector<HTMLElement>(
      "[data-studio-collage-scene]",
    );
    const collageItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-studio-collage-item]"),
    );
    const members = Array.from(
      root.querySelectorAll<HTMLElement>("[data-studio-member]"),
    );
    const revealTargets = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-studio-reveal], [data-studio-member-part], [data-studio-collage-item]",
      ),
    );
    const progressByElement = new WeakMap<HTMLElement, number>();
    let animationFrame = 0;
    let hasRendered = false;
    let disposed = false;

    if (!("IntersectionObserver" in window)) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "true";
          revealObserver.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    const clearContinuousMotion = () => {
      collageScene?.removeAttribute("data-motion-active");
      for (const item of collageItems) {
        clearProperties(item, collageProperties);
      }
      for (const member of members) {
        clearProperties(member, memberProperties);
        member.removeAttribute("data-motion-active");
      }
    };

    const clearMotionStyles = () => {
      root.dataset.motion = "reduced";
      clearContinuousMotion();
      for (const target of revealTargets) target.dataset.visible = "true";
    };

    const render = () => {
      animationFrame = 0;
      if (reducedMotion.matches || !desktopMotion.matches) return;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const writes: Array<() => void> = [];
      let shouldContinue = false;

      if (collageScene) {
        const rectangle = collageScene.getBoundingClientRect();
        const travel = Math.max(rectangle.height - viewportHeight * 0.18, 1);
        const targetProgress = clamp(
          (viewportHeight * 0.9 - rectangle.top) / travel,
        );
        const previous = progressByElement.get(collageScene) ?? targetProgress;
        const progress = hasRendered
          ? mix(previous, targetProgress, 0.16)
          : targetProgress;
        progressByElement.set(collageScene, progress);
        shouldContinue ||= Math.abs(progress - targetProgress) > 0.001;

        const initialOffsets = [
          [-10, -5, -3.2],
          [2, 13, 2.2],
          [11, -6, 3.1],
          [-8, 14, -2.4],
          [9, 11, 2.7],
        ] as const;
        const driftOffsets = [-18, 20, -14, 16, -20] as const;
        const active = rectangle.bottom > 0 && rectangle.top < viewportHeight;

        writes.push(() => {
          if (active) collageScene.dataset.motionActive = "true";
          else collageScene.removeAttribute("data-motion-active");
        });

        collageItems.forEach((item, index) => {
          const [offsetX, offsetY, rotation] = initialOffsets[index] ?? [0, 8, 0];
          const enter = smoothstep(
            0.03 + index * 0.035,
            0.48 + index * 0.018,
            progress,
          );
          const drift = smoothstep(0.52, 1, progress);
          const x = (1 - enter) * offsetX * Math.min(viewportWidth, 1440) * 0.01;
          const y =
            (1 - enter) * offsetY * viewportHeight * 0.01 +
            drift * driftOffsets[index] * 0.72;
          const scale = 0.91 + enter * 0.09 + drift * 0.012;
          const opacity = 0.16 + enter * 0.84;
          const caption = smoothstep(
            0.23 + index * 0.035,
            0.55 + index * 0.025,
            progress,
          );
          const imageY = (drift - 0.5) * driftOffsets[index] * -0.42;

          writes.push(() => {
            setNumber(item, "--collage-x", x, "px");
            setNumber(item, "--collage-y", y, "px");
            setNumber(item, "--collage-rotate", (1 - enter) * rotation, "deg");
            setNumber(item, "--collage-scale", scale);
            setNumber(item, "--collage-opacity", opacity);
            setNumber(item, "--collage-caption-opacity", caption);
            setNumber(item, "--collage-caption-y", (1 - caption) * 12, "px");
            setNumber(item, "--collage-image-y", imageY, "px");
          });
        });

      }

      members.forEach((member, index) => {
        const rectangle = member.getBoundingClientRect();
        const travel = Math.max(rectangle.height + viewportHeight * 0.12, 1);
        const targetProgress = clamp(
          (viewportHeight * 0.84 - rectangle.top) / travel,
        );
        const previous = progressByElement.get(member) ?? targetProgress;
        const progress = hasRendered
          ? mix(previous, targetProgress, 0.17)
          : targetProgress;
        progressByElement.set(member, progress);
        shouldContinue ||= Math.abs(progress - targetProgress) > 0.001;

        const enter = smoothstep(0.04, 0.4, progress);
        const exit = smoothstep(0.78, 1, progress);
        const direction = index % 2 === 0 ? -1 : 1;
        const safeHorizontalTravel = Math.max(
          0,
          Math.min(
            46,
            rectangle.left - 4,
            viewportWidth - rectangle.right - 4,
          ),
        );
        const photoTravel = Math.min(38, safeHorizontalTravel);
        const storyTravel = Math.min(46, safeHorizontalTravel);
        const photoX =
          direction * (1 - enter) * photoTravel -
          direction * exit * Math.min(10, safeHorizontalTravel);
        const photoY = (1 - enter) * 42 - exit * 18;
        const storyX =
          -direction * (1 - enter) * storyTravel +
          direction * exit * Math.min(12, safeHorizontalTravel);
        const storyY = (1 - enter) * 34 - exit * 22;
        const active = rectangle.bottom > 0 && rectangle.top < viewportHeight;

        writes.push(() => {
          if (active) member.dataset.motionActive = "true";
          else member.removeAttribute("data-motion-active");
          setNumber(member, "--member-photo-x", photoX, "px");
          setNumber(member, "--member-photo-y", photoY, "px");
          setNumber(member, "--member-photo-scale", 0.965 + enter * 0.035 + exit * 0.01);
          setNumber(member, "--member-photo-opacity", 0.18 + enter * 0.82 - exit * 0.2);
          setNumber(member, "--member-image-y", (progress - 0.5) * -28, "px");
          setNumber(member, "--member-story-x", storyX, "px");
          setNumber(member, "--member-story-y", storyY, "px");
          setNumber(member, "--member-story-opacity", 0.12 + enter * 0.88 - exit * 0.34);
          setNumber(member, "--member-rail-y", (1 - enter) * 20 - exit * 10, "px");
          setNumber(member, "--member-rail-opacity", 0.3 + enter * 0.7 - exit * 0.26);
        });
      });

      for (const write of writes) write();
      hasRendered = true;
      if (shouldContinue) animationFrame = window.requestAnimationFrame(render);
    };

    const scheduleRender = () => {
      if (
        disposed ||
        animationFrame ||
        reducedMotion.matches ||
        !desktopMotion.matches
      ) {
        return;
      }
      animationFrame = window.requestAnimationFrame(render);
    };

    const revealCurrentViewport = () => {
      const revealBoundary = window.innerHeight * 0.94;
      for (const target of revealTargets) {
        const rectangle = target.getBoundingClientRect();
        if (rectangle.bottom > 0 && rectangle.top < revealBoundary) {
          target.dataset.visible = "true";
        }
      }
    };

    const applyMotionMode = () => {
      if (reducedMotion.matches) {
        clearMotionStyles();
        return;
      }

      if (!desktopMotion.matches) clearContinuousMotion();
      hasRendered = false;
      if (desktopMotion.matches) render();
      revealCurrentViewport();
      root.dataset.motion = "ready";
      for (const target of revealTargets) {
        if (desktopMotion.matches && target.hasAttribute("data-studio-collage-item")) {
          target.dataset.visible = "true";
          continue;
        }
        if (target.dataset.visible !== "true") revealObserver.observe(target);
      }
      scheduleRender();
    };

    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            hasRendered = false;
            scheduleRender();
          })
        : null;

    if (resizeObserver) {
      if (collageScene) resizeObserver.observe(collageScene);
      for (const member of members) resizeObserver.observe(member);
    }

    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender, { passive: true });
    reducedMotion.addEventListener("change", applyMotionMode);
    desktopMotion.addEventListener("change", applyMotionMode);
    applyMotionMode();
    document.fonts?.ready.then(scheduleRender).catch(() => undefined);

    return () => {
      disposed = true;
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
      reducedMotion.removeEventListener("change", applyMotionMode);
      desktopMotion.removeEventListener("change", applyMotionMode);
      revealObserver.disconnect();
      resizeObserver?.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      delete root.dataset.motion;
    };
  }, [rootId]);

  return null;
}
