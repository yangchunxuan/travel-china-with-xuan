"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  Footprints,
  MapPin,
  PlaneLanding,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Dict } from "../lib/i18n";

const basePath = "";

const moduleStatics = [
  {
    id: "triangle",
    image: `${basePath}/images/beijing-forbidden-city.jpg`,
    alt: "The golden roofs of Beijing's Forbidden City at sunset",
  },
  {
    id: "guilin",
    image: `${basePath}/images/china-classic.jpg`,
    alt: "China's rivers, karst peaks and old towns",
  },
  {
    id: "pandas",
    image: `${basePath}/images/family-journey.jpg`,
    alt: "A multi-generation family walking through a traditional Chinese town",
  },
  {
    id: "zhangjiajie",
    image: `${basePath}/images/hero-zhangjiajie.jpg`,
    alt: "The sandstone pillars of Zhangjiajie in mist",
  },
  {
    id: "yangtze",
    image: `${basePath}/images/chongqing-monorail.jpg`,
    alt: "Chongqing, gateway to the Yangtze Three Gorges",
  },
  {
    id: "grand",
    image: `${basePath}/images/lijiang-old-town.jpg`,
    alt: "Lijiang old town beneath Jade Dragon Snow Mountain",
  },
];

export function RouteExplorer({ t }: { t: Dict }) {
  const [activeIndex, setActiveIndex] = useState(3); // default: Zhangjiajie, our home ground
  const j = t.journeys;
  const active = j.modules[activeIndex];
  const activeStatic = moduleStatics[activeIndex];
  const isHomeground = activeStatic.id === "zhangjiajie";

  return (
    <div className="route-explorer">
      <div className="route-tabs" role="tablist" aria-label={j.chipsAria}>
        {j.modules.map((module, index) => (
          <button
            key={moduleStatics[index].id}
            id={`tab-${moduleStatics[index].id}`}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls="journey-panel"
            className={moduleStatics[index].id === "zhangjiajie" ? "is-homeground" : ""}
            onClick={() => setActiveIndex(index)}
          >
            {module.chip}
          </button>
        ))}
      </div>

      <div
        id="journey-panel"
        className="route-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeStatic.id}`}
        key={activeStatic.id}
      >
        <div className="route-media">
          <img src={activeStatic.image} alt={activeStatic.alt} />
          <div className="route-media-label">
            <MapPin size={16} />
            <span>{active.chip}</span>
          </div>
        </div>

        <div className="route-copy">
          <span className="section-kicker">
            {active.kicker}
            {isHomeground && (
              <em className="homeground-badge">{j.homegroundBadge}</em>
            )}
          </span>
          <h3>{active.title}</h3>
          <p>{active.summary}</p>

          <div className="route-facts">
            <span>
              <CalendarDays size={17} />
              <strong>{active.days}</strong>
            </span>
            <span>
              <Users size={17} />
              <strong>{active.bestFor}</strong>
            </span>
            <span>
              <Footprints size={17} />
              <strong>{active.pace}</strong>
            </span>
          </div>

          <ul className="route-highlights">
            {active.highlights.map((highlight) => (
              <li key={highlight}>
                <Check size={16} /> {highlight}
              </li>
            ))}
          </ul>

          <div className="route-line" aria-label="Route">
            {active.route.map((stop, index) => (
              <span key={stop}>
                <b>{index + 1}</b>
                {stop}
              </span>
            ))}
          </div>

          <a className="text-link" href="#plan">
            {j.adapt} <ArrowRight size={17} />
          </a>
        </div>
      </div>

      <div className="stopover-note">
        <PlaneLanding size={18} />
        <span>
          <strong>{j.stopover.title}</strong> {j.stopover.body}{" "}
          <Link href="/china-visa-free-uk-canada/">→</Link>
        </span>
      </div>
    </div>
  );
}
