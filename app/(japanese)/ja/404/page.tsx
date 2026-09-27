import type { Metadata } from "next";
import { JapaneseNotFoundPage } from "../../../../components/JapaneseNotFoundPage";

export const metadata: Metadata = {
  title: { absolute: "ページが見つかりません | Homeground China" },
  robots: { index: false, follow: true },
};

export default function JapaneseNotFoundRoute() {
  return <JapaneseNotFoundPage />;
}
