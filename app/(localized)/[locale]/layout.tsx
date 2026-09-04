import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalyticsConsent } from "../../../components/AnalyticsConsent";
import { SiteAnalytics } from "../../../components/SiteAnalytics";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../../../lib/homegroundI18n";
import "../../globals.css";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  const copy = getHomegroundCopy(locale);

  return {
    metadataBase: new URL("https://homegroundchina.com/"),
    applicationName: "Homeground China",
    referrer: "origin",
    verification: {
      other: {
        "naver-site-verification":
          "a721e6b305cee6093aa68b45b3826bffdb9aa455",
        "p:domain_verify": "ed1535ad23b359f2d828a60b4c89ba98",
      },
    },
    title: {
      default: copy.metadata.title,
      template: "%s — Homeground China",
    },
    description: copy.metadata.description,
    openGraph: {
      siteName: "Homeground China",
      type: "website",
    },
  };
}

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
    <html
      lang={htmlLang}
      dir="ltr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
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
      <body>
        <SiteAnalytics locale={locale} />
        {children}
        <AnalyticsConsent locale={locale} />
      </body>
    </html>
  );
}
