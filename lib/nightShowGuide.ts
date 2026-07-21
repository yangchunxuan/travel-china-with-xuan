export const NIGHT_SHOW_GUIDE_SOURCES = [
  {
    id: "hunan-transport",
    url: "https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716245.html",
  },
  {
    id: "fox-fairy-format",
    url: "https://www.hnzjj.com/index.php/Ticket/show/13.html",
  },
  {
    id: "fox-fairy-2026",
    url: "https://www.zjj.gov.cn/c33/20260317/i1147792.html",
  },
  {
    id: "fox-fairy-2025",
    url: "https://www.zjj.gov.cn/c32/20251220/i1131089.html",
  },
  {
    id: "charming-xiangxi-2026",
    url: "https://www.wlynews.cn/content/646046/52/15709922.html",
  },
  {
    id: "eternal-love-official",
    url: "https://www.songcn.com/show/9",
  },
] as const;

export type NightShowSourceId =
  (typeof NIGHT_SHOW_GUIDE_SOURCES)[number]["id"];

export function getNightShowSource(id: NightShowSourceId) {
  const source = NIGHT_SHOW_GUIDE_SOURCES.find((item) => item.id === id);

  if (!source) {
    throw new Error(`Unknown night-show source: ${id}`);
  }

  return source;
}
