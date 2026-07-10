"use client";

import { useEffect, useRef, useState } from "react";
import { slideStatics } from "../lib/i18n";

const INTERVAL_MS = 6500;

export interface SlideText {
  kicker: string;
  place: string;
}

export function HeroCarousel({
  basePath,
  slides,
}: {
  basePath: string;
  slides: SlideText[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = () => {
      reduced.current = mq.matches;
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (!reduced.current && !document.hidden) {
        setIndex((i) => (i + 1) % slideStatics.length);
      }
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = slides[index];
  const activeStatic = slideStatics[index];

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slideStatics.map((slide, i) => (
        <img
          key={slide.file}
          className={`hero-image hero-slide ${i === index ? "is-active" : ""}`}
          src={`${basePath}/images/${slide.file}`}
          alt={i === index ? `${slides[i].place}` : ""}
          style={{ objectPosition: slide.position }}
          loading={i === 0 ? "eager" : "lazy"}
          aria-hidden={i === index ? undefined : true}
        />
      ))}

      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-place-note carousel-place-note" aria-live="polite">
        <span>{active.kicker}</span>
        <strong>{active.place}</strong>
        <small>{activeStatic.coords}</small>
      </div>

      <div className="hero-dots" role="tablist" aria-label="Destination photos">
        {slideStatics.map((slide, i) => (
          <button
            key={slide.file}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${slides[i].place}`}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
