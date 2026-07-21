import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  referrer: "strict-origin-when-cross-origin",
  verification: {
    other: {
      "naver-site-verification":
        "a721e6b305cee6093aa68b45b3826bffdb9aa455",
    },
  },
  title: {
    default: "Homeground China — China Trip Planning Studio",
    template: "%s — Homeground China",
  },
  description:
    "China trip planning shaped around your party, pace and priorities, with suitable local services checked by a person after travel details are clear.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
