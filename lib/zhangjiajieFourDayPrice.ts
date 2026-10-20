// 2026-10-19 owner decision: the Korean page sells the Zhangjiajie 4-day route with a
// Korean-speaking guide on Days 2 and 3. Its extra cost (CNY 450 a guide day, CNY 900 a
// party) is added at cost: counted for two adults on the shared 2-4 adult rate, so a
// couple is never below cost, and split six ways on the six-adult rate.
export function zhangjiajieFourDayCny(
  cny: number,
  locale: string,
  party: "two-to-four" | "six",
): number {
  if (locale !== "ko") return cny;
  return cny + (party === "six" ? 150 : 450);
}
