import { getGuideEntry } from "./guideRegistry";

export const ZHANGJIAJIE_GUIDE = getGuideEntry(
  "zhangjiajie-itinerary",
  "en",
);

export const ZHANGJIAJIE_GUIDE_SOURCES = [
  {
    name: "Wulingyuan District: 2025 summer timed-entry notice (historical context)",
    url: "https://www.wlynews.cn/content/646942/52/15207818.html",
  },
  {
    name: "Zhangjiajie UNESCO Global Geopark: official two-day route",
    url: "https://zhangjiajieuggp.org.cn/html/2026/2026032620135033852.html",
  },
  {
    name: "Hunan Department of Culture and Tourism: Zhangjiajie transport baseline",
    url: "https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716245.html",
  },
  {
    name: "Hunan Department of Culture and Tourism: three-day planning guidance",
    url: "https://whhlyt.hunan.gov.cn/whhlyt/wldhlylx/202208/t20220816_27584142.html",
  },
  {
    name: "Hunan Government: Zhangjiajie 72 Qilou as an evening experience",
    url: "https://www.hunan.gov.cn/hnszf/hnyw/szdt/202405/t20240505_33292041.html",
  },
  {
    name: "Ministry of Culture and Tourism: Zhangjiajie–Furong–Fenghuang rail connections",
    url: "https://www.mct.gov.cn/whzx/qgwhxxlb/hn_7731/202112/t20211207_929617.htm",
  },
  {
    name: "Hunan Government: Fenghuang station transfer guide",
    url: "https://www.enghunan.gov.cn/hneng/Tourism/GoldenTravelRoutes/202508/t20250802_33979569.html",
  },
  {
    name: "Zhangjiajie Grand Canyon: official visitor routes and estimated duration",
    url: "https://zjjdaxiagu.com/guide.html",
  },
  {
    name: "Hunan Road Transport Administration: Zhangjiajie Grand Canyon corridor",
    url: "https://jtt.hunan.gov.cn/hnygj/szdtyg/202405/t20240507_33294107.html",
  },
  {
    name: "Hunan Department of Culture and Tourism: Huanglong Cave overview",
    url: "https://whhlyt.hunan.gov.cn/whhlyt/wldhjqjd/202208/t20220816_27583725.html",
  },
] as const;
