import type { Metadata } from "next";
import { TenDayChinaRouteGuidePage } from "../../../../components/TenDayChinaRouteGuidePage";

const title = "Beijing–Zhangjiajie–Shanghai in 10 Days: Is It Realistic?";
const description =
  "Can Beijing, Zhangjiajie and Shanghai fit into 10 days? Count the real sightseeing days, see the trade-offs, and test whether your exact trip still works.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/guides/beijing-zhangjiajie-shanghai-10-days/",
  },
  robots: {
    // Release gate: enable indexing only after the final pre-publication
    // sample check and explicit owner approval.
    index: false,
    follow: false,
  },
  openGraph: {
    title,
    description,
    type: "article",
    locale: "en_US",
    url: "/guides/beijing-zhangjiajie-shanghai-10-days/",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function BeijingZhangjiajieShanghaiTenDayPage() {
  return <TenDayChinaRouteGuidePage />;
}
