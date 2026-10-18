import type { Metadata } from "next";
import { JapaneseTerracottaHalfDayPage } from "../../../../../components/JapaneseTerracottaHalfDayPage";
import { japaneseHalfDayCopy as copy, japaneseHalfDayPath as path } from "../../../../../lib/japaneseTerracottaHalfDay";
import { terracottaHalfDayImage as image, terracottaHalfDayPaths } from "../../../../../lib/terracottaHalfDayTour";

export const metadata: Metadata = {
  title: { absolute: `${copy.title}｜Homeground China` }, description: copy.description,
  alternates: { canonical: path, languages: { en: terracottaHalfDayPaths.en, "zh-Hans": terracottaHalfDayPaths.zh, ko: terracottaHalfDayPaths.ko, ja: path, es: terracottaHalfDayPaths.es, fr: terracottaHalfDayPaths.fr, de: terracottaHalfDayPaths.de, ar: terracottaHalfDayPaths.ar, "x-default": terracottaHalfDayPaths.en } },
  openGraph: { title: copy.title, description: copy.description, url: path, locale: "ja_JP", type: "website", siteName: "Homeground China", images: [{ url: image.src, width: image.width, height: image.height, alt: copy.heroAlt }] },
  twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [{ url: image.src, alt: copy.heroAlt }] },
};
export default function Page() { return <JapaneseTerracottaHalfDayPage />; }
