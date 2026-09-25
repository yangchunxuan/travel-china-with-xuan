import type { StructuredPageBody } from "./content-system/page-body";
import { getGuidePublishedRouteLinks } from "./existingContentCommercialLinks.ts";
import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import {
  buildGuideProductSalesCard,
  getDefaultGuideSalesCard,
  getGuideSalesCard,
  hasGuideSalesCardPlan,
  type GuideSalesCardData,
} from "./guideSalesCards.ts";

/**
 * A brief in-article sales card. Guides with an explicit plan in
 * `guideSalesCards` get exactly that reviewed product card. Every other
 * commercial guide keeps its curated product. Guides without a reviewed
 * mapping get one stable market-weighted product with destination/topic
 * affinity considered first. No guide card falls back to the generic list.
 */
export type GuideTourCardData = GuideSalesCardData;

type CuratedCardCopy = { readonly label: string; readonly note: string; readonly action: string };

/** Make the difference visible when a published tour extends a planning example. */
const curatedCardCopy: Partial<Record<GuideId, Record<HomegroundLocale, CuratedCardCopy>>> = {
  "china-7-day-itinerary": {
    en: { label: "A longer published route", note: "This 8-day tour adds Xi'an. For the Beijing–Shanghai week above, ask us for a two-city quote.", action: "View the 8-day tour" },
    zh: { label: "一条更长的现有路线", note: "这条 8 天产品增加了西安。若想按上面的北京—上海两城走，可请我们另行报价。", action: "查看 8 天行程" },
    ko: { label: "도시를 추가한 공개 일정", note: "이 8일 상품에는 시안이 추가됩니다. 위의 베이징·상하이 2도시 일정은 별도로 견적을 요청해 주세요.", action: "8일 일정 보기" },
  },
  "china-10-day-itinerary": {
    en: { label: "The same three cities in a published route", note: "This tour is 8 days. The 10-day outline above is a planning example; ask us to add time and quote it separately.", action: "View the 8-day tour" },
    zh: { label: "同样三座城市的现有路线", note: "这条产品是 8 天。上面的 10 天路线是规划示例；想多留两天，可以请我们另排并报价。", action: "查看 8 天行程" },
    ko: { label: "같은 세 도시를 잇는 공개 일정", note: "이 상품은 8일 일정입니다. 위의 10일 코스는 계획 예시이며, 이틀을 더 머무는 안은 별도로 견적을 요청해 주세요.", action: "8일 일정 보기" },
  },
  "china-14-day-itinerary": {
    en: { label: "A published two-week alternative", note: "This tour adds Guilin to the four-city example above. Ask us to quote the version without Guilin.", action: "View the five-city tour" },
    zh: { label: "已发布的另一条两周路线", note: "这条产品比上面的四城示例多了桂林。若想只走四城，可以请我们另排并报价。", action: "查看五城行程" },
    ko: { label: "공개된 다른 2주 일정", note: "이 상품은 위의 네 도시 예시에 구이린을 추가합니다. 구이린을 뺀 일정은 별도로 견적을 요청해 주세요.", action: "다섯 도시 일정 보기" },
  },
  "beijing-zhangjiajie-shanghai-10-days": {
    en: { label: "A longer route through all three cities", note: "This 14-day tour adds Xi'an and Guilin. Ask us for a separate quote for the Beijing–Zhangjiajie–Shanghai 10-day route above.", action: "View the 14-day tour" },
    zh: { label: "经过这三座城市的更长路线", note: "这条 14 天产品还增加西安和桂林。若只走上面的北京—张家界—上海 10 天，可请我们另行报价。", action: "查看 14 天行程" },
    ko: { label: "세 도시를 모두 지나는 더 긴 일정", note: "이 14일 상품에는 시안과 구이린도 포함됩니다. 위의 베이징·장가계·상하이 10일 일정은 별도로 견적을 요청해 주세요.", action: "14일 일정 보기" },
  },
  "beijing-zhangjiajie-shanghai-transport": {
    en: { label: "A longer route through all three cities", note: "This 14-day tour also visits Xi'an and Guilin. Ask us to quote only Beijing, Zhangjiajie and Shanghai.", action: "View the 14-day tour" },
    zh: { label: "经过这三座城市的更长路线", note: "这条 14 天产品还去西安和桂林。若只走北京、张家界和上海，可请我们另行报价。", action: "查看 14 天行程" },
    ko: { label: "세 도시를 모두 지나는 더 긴 일정", note: "이 14일 상품은 시안과 구이린도 방문합니다. 베이징·장가계·상하이만 원하면 별도로 견적을 요청해 주세요.", action: "14일 일정 보기" },
  },
  "beijing-xian-chengdu-route-order": {
    en: { label: "A published route starting with these cities", note: "This tour continues from Chengdu to Guilin and Shanghai. Ask us to quote the Beijing–Xi'an–Chengdu route on its own.", action: "View the 14-day tour" },
    zh: { label: "从这三座城市继续走的现有路线", note: "这条产品从成都继续到桂林和上海。若只走北京—西安—成都，可请我们另行报价。", action: "查看 14 天行程" },
    ko: { label: "이 세 도시에서 이어지는 공개 일정", note: "이 상품은 청두 뒤에 구이린과 상하이로 이어집니다. 베이징·시안·청두만 여행하려면 별도로 견적을 요청해 주세요.", action: "14일 일정 보기" },
  },
  "chengdu-chongqing-zhangjiajie-itinerary": {
    en: { label: "The Chengdu–Chongqing part of this route", note: "This 8-day tour does not include Zhangjiajie. Ask us to add it and quote the full route separately.", action: "View the 8-day tour" },
    zh: { label: "这条路线的成都—重庆部分", note: "这条 8 天产品不含张家界。若想三地连走，可请我们另排并报价。", action: "查看 8 天行程" },
    ko: { label: "청두·충칭 구간의 공개 일정", note: "이 8일 상품에는 장가계가 없습니다. 세 지역을 함께 여행하려면 별도로 견적을 요청해 주세요.", action: "8일 일정 보기" },
  },
  "guangzhou-shenzhen-hong-kong-route-order": {
    en: { label: "A published Guangzhou-area route", note: "This 5-day tour visits Guangzhou, Shunde and Foshan, not Shenzhen or Hong Kong. Ask us to quote the three-city route above.", action: "View the 5-day tour" },
    zh: { label: "已发布的广州周边路线", note: "这条 5 天产品走广州、顺德和佛山，不含深圳与香港。三地连走可请我们另行报价。", action: "查看 5 天行程" },
    ko: { label: "광저우 인근의 공개 일정", note: "이 5일 상품은 광저우·순더·포산을 방문하며 선전과 홍콩은 포함하지 않습니다. 세 도시 일정은 별도로 견적을 요청해 주세요.", action: "5일 일정 보기" },
  },
  "guangzhou-macau-transport-route": {
    en: { label: "A published Guangzhou-area route", note: "This 5-day tour does not include Macau. Ask us to quote a Guangzhou–Macau journey separately.", action: "View the 5-day tour" },
    zh: { label: "已发布的广州周边路线", note: "这条 5 天产品不含澳门。若想广州与澳门连走，可请我们另行报价。", action: "查看 5 天行程" },
    ko: { label: "광저우 인근의 공개 일정", note: "이 5일 상품에는 마카오가 없습니다. 광저우·마카오 여행은 별도로 견적을 요청해 주세요.", action: "5일 일정 보기" },
  },
  "kunming-dali-lijiang-shangri-la-route-order": {
    en: { label: "A published Yunnan route", note: "This 8-day tour ends in Lijiang; Shangri-La needs a separate extension and quote.", action: "View the 8-day tour" },
    zh: { label: "已发布的云南路线", note: "这条 8 天产品到丽江为止；继续去香格里拉须另排并报价。", action: "查看 8 天行程" },
    ko: { label: "공개된 윈난 일정", note: "이 8일 상품은 리장에서 끝납니다. 샹그릴라 연장은 별도로 설계하고 견적을 드립니다.", action: "8일 일정 보기" },
  },
  "lijiang-shangri-la-transport-route": {
    en: { label: "A published route ending in Lijiang", note: "Shangri-La is not included in this 8-day tour. Ask us to quote that extension separately.", action: "View the 8-day tour" },
    zh: { label: "到丽江的现有路线", note: "这条 8 天产品不含香格里拉。若要继续往北走，可请我们另行报价。", action: "查看 8 天行程" },
    ko: { label: "리장에서 끝나는 공개 일정", note: "이 8일 상품에는 샹그릴라가 없습니다. 북쪽 연장은 별도로 견적을 요청해 주세요.", action: "8일 일정 보기" },
  },
  "shanghai-suzhou-hangzhou-nanjing-route-order": {
    en: { label: "A published three-city Jiangnan route", note: "This 6-day tour covers Shanghai, Suzhou and Hangzhou; Nanjing needs extra time and a separate quote.", action: "View the 6-day tour" },
    zh: { label: "已发布的江南三城路线", note: "这条 6 天产品走上海、苏州和杭州；增加南京需另排时间并报价。", action: "查看 6 天行程" },
    ko: { label: "공개된 장난 3도시 일정", note: "이 6일 상품은 상하이·쑤저우·항저우를 방문합니다. 난징을 더하려면 별도로 견적을 요청해 주세요.", action: "6일 일정 보기" },
  },
  "xian-lanzhou-dunhuang-silk-road-route": {
    en: { label: "A longer published Silk Road route", note: "This 15-day tour visits Xi'an and Dunhuang but does not stop in Lanzhou. Ask us to quote the shorter route above.", action: "View the 15-day tour" },
    zh: { label: "已发布的更长丝路路线", note: "这条 15 天产品去西安和敦煌，但不在兰州停留。若想按上面的短线走，可请我们另行报价。", action: "查看 15 天行程" },
    ko: { label: "공개된 더 긴 실크로드 일정", note: "이 15일 상품은 시안과 둔황을 방문하지만 란저우에 머물지 않습니다. 위의 짧은 일정은 별도로 견적을 요청해 주세요.", action: "15일 일정 보기" },
  },
};

export function getGuideTourCard(
  guideId: GuideId,
  locale: HomegroundLocale,
): GuideTourCardData {
  if (hasGuideSalesCardPlan(guideId)) return getGuideSalesCard(guideId, locale);
  const target = getGuidePublishedRouteLinks(guideId, locale)[0];
  if (target) {
    const product = getPublishedPrivateTourCatalog(locale).find(
      (item) => item.id === target.id || item.slug === target.id,
    );
    if (product) {
      return buildGuideProductSalesCard(product.id, locale, curatedCardCopy[guideId]?.[locale]);
    }
  }
  return getDefaultGuideSalesCard(guideId, locale);
}

/**
 * Where the card goes: after the reader has finished one real section, not
 * before they have read anything. With four or more headings it sits before
 * the third; with two or three, before the second; otherwise at the end.
 */
export function guideTourCardBlockIndex(body: StructuredPageBody): number {
  const headings = body.blocks
    .map((block, index) => (block.type === "heading" ? index : -1))
    .filter((index) => index >= 0);
  if (headings.length >= 4) return headings[2] - 1;
  if (headings.length >= 2) return headings[1] - 1;
  return body.blocks.length - 1;
}
