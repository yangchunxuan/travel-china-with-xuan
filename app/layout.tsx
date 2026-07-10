import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-DPGR2SVC0G";
const TAWK_SRC = "https://embed.tawk.to/521727297ca1334016000005/1hgs87qh8";

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
            <Script id="tawk-to" strategy="afterInteractive">
              {`
                var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='${TAWK_SRC}';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
