import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yangchunxuan.github.io/travel-china-with-xuan/"),
  title: {
    default: "Travel China with Xuan — Private, Fully-Handled China Trips",
    template: "%s — Travel China with Xuan",
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
      <body>{children}</body>
    </html>
  );
}
