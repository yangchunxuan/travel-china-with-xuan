import type { Metadata } from "next";
import { SpanishContactHost } from "../../../components/SpanishContactHost";
import { homegroundHeadScript } from "../../../lib/homegroundAssetRecovery";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  applicationName: "Homeground China",
  referrer: "origin",
  openGraph: { siteName: "Homeground China", type: "website" },
};

// Spanish pages use the shared contact flow and privacy preferences, with localized copy.
export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script data-homeground-asset-recovery="" dangerouslySetInnerHTML={{ __html: homegroundHeadScript }} />
      </head>
      <body>{children}<SpanishContactHost /></body>
    </html>
  );
}
