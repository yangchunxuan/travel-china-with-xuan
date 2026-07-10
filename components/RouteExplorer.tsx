"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { Dict } from "../lib/i18n";

const basePath = "/travel-china-with-xuan";

const journeyStatics = [
  {
    id: "home-turf",
    image: `${basePath}/images/hero-zhangjiajie.jpg`,
    alt: "The sandstone peaks and forest of Zhangjiajie",
  },
  {
    id: "first-china",
    image: `${basePath}/images/china-classic.jpg`,
    alt: "A panorama of China's Great Wall, mountains, old towns and high-speed rail",
  },
  {
    id: "family-pace",
    image: `${basePath}/images/family-journey.jpg`,
    alt: "A multi-generation family walking through a traditional Chinese town",
  },
  {
    id: "food-culture",
    image: `${basePath}/images/food-journey.jpg`,
    alt: "A table filled with regional Chinese dishes in a lantern-lit old town",
  },
];

export function RouteExplorer({ t }: { t: Dict }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = t.journeys.items[activeIndex];
  const activeStatic = journeyStatics[activeIndex];

  return (
    <div className="route-explorer">
      <div className="route-tabs" role="tablist" aria-label="Sample journeys">
        {t.journeys.items.map((journey, index) => (
          <button
            key={journeyStatics[index].id}
            id={`tab-${journeyStatics[index].id}`}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls="journey-panel"
            onClick={() => setActiveIndex(index)}
          >
            {journey.tab}
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
            <span>{active.tab}</span>
          </div>
        </div>

        <div className="route-copy">
          <span className="section-kicker">{active.kicker}</span>
          <h3>{active.title}</h3>
          <p>{active.summary}</p>

          <div className="route-facts">
            <span>
              <CalendarDays size={17} />
              <strong>{active.duration}</strong>
            </span>
            <span>
              <Users size={17} />
              <strong>{active.bestFor}</strong>
            </span>
          </div>

          <ul className="route-highlights">
            {active.highlights.map((highlight) => (
              <li key={highlight}>
                <Check size={16} /> {highlight}
              </li>
            ))}
          </ul>

          <div className="route-line" aria-label="Example route">
            {active.route.map((stop, index) => (
              <span key={stop}>
                <b>{index + 1}</b>
                {stop}
              </span>
            ))}
          </div>

          <a className="text-link" href="#plan">
            {t.journeys.adapt} <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </div>
  );
}
