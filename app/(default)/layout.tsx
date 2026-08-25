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
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteAnalytics locale="en" />
        {children}
        <AnalyticsConsent locale="en" />
      </body>
    </html>
  );
}
