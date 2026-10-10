import type { Metadata } from "next";
import { homegroundInternalRouteBootstrap } from "../../../lib/homegroundRouteSession";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  applicationName: "Homeground China",
  referrer: "origin",
  openGraph: { siteName: "Homeground China", type: "website" },
};

// Spanish pages contact us by WhatsApp or email, so the layout mounts no
// enquiry form, analytics or consent banner.
export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: homegroundInternalRouteBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
