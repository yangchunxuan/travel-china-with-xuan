import type { Metadata } from "next";
import { AnalyticsConsent } from "../../components/AnalyticsConsent";
import { SiteAnalytics } from "../../components/SiteAnalytics";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  applicationName: "Homeground China",
  referrer: "origin",
  verification: {
    other: {
      "naver-site-verification":
        "a721e6b305cee6093aa68b45b3826bffdb9aa455",
      "p:domain_verify": "ed1535ad23b359f2d828a60b4c89ba98",
      "msvalidate.01": "C3B08E57904F7FB8995048D0D0EE1A92",
      "ahrefs-site-verification":
        "008826387cc4ee8dba5d2346530e43243b31219c202a9f3bde50bf4dfcd3b5aa",
    },
  },
  title: {
    default: "Homeground China | China Travel Agency",
    template: "%s — Homeground China",
  },
  description:
    "A China travel agency for private, tailor-made trips, with practical guides, route design, stays, tickets, transport and local support.",
  openGraph: {
    siteName: "Homeground China",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <SiteAnalytics locale="en" />
        {children}
        <AnalyticsConsent locale="en" />
      </body>
    </html>
  );
}
