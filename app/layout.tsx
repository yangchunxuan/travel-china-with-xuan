import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-DPGR2SVC0G";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  title: {
    default: "Homeground China — Private, Fully-Handled China Trips",
    template: "%s — Homeground China",
  },
  description:
    "Private, tailor-made China trips planned by a Zhangjiajie-born local. No shopping stops, no hidden fees — payments, transport, tickets and an English-speaking guide, all handled.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
