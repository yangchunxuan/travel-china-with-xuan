import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { HomegroundLocale } from "../../../lib/homegroundI18n";
import "../../globals.css";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  referrer: "strict-origin-when-cross-origin",
  title: {
    default: "Homeground China",
    template: "%s — Homeground China",
  },
  description:
    "China trip planning shaped around your party, pace and priorities, with suitable local services checked by a person after travel details are clear.",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "ko" }];
}

export default async function LocalizedRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  const htmlLang = locale === "zh" ? "zh-Hans" : "ko";

  return (
    <html lang={htmlLang} dir="ltr" data-scroll-behavior="smooth">
      <head>
        {locale === "zh" ? (
          <link
            rel="preload"
            href="/fonts/homeground-serif-sc.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ) : (
          <>
            <link
              rel="preload"
              href="/fonts/homeground-pretendard-ko.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/homeground-maruburi-ko.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
