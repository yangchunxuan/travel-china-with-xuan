import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
  referrer: "no-referrer",
  title: {
    default: "已保存询盘洞察 — Homeground China",
    template: "%s — Homeground China",
  },
  description: "Homeground China 负责人使用的已保存询盘汇总与系统状态页。",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hans" dir="ltr">
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body>{children}</body>
    </html>
  );
}
