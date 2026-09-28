import type { Metadata } from "next";
import { JapaneseInquiryDialog } from "../../../components/JapaneseInquiryDialog";
import { homegroundInternalRouteBootstrap } from "../../../lib/homegroundRouteSession";
import { homegroundAssetRecoveryBootstrap } from "../../../lib/homegroundAssetRecovery";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  applicationName: "Homeground China",
  referrer: "origin",
  openGraph: { siteName: "Homeground China", type: "website" },
};

export default function JapanesePilotLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          data-homeground-asset-recovery
          dangerouslySetInnerHTML={{
            __html: `${homegroundAssetRecoveryBootstrap}\n${homegroundInternalRouteBootstrap}`,
          }}
        />
      </head>
      <body>{children}<JapaneseInquiryDialog /></body>
    </html>
  );
}
