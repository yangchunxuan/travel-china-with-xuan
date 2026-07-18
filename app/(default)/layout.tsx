import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://homegroundchina.com/"),
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
