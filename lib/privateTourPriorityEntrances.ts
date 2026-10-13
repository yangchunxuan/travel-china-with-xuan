import type { HomegroundLocale } from "./homegroundI18n";
import type { PublishedPrivateTourCatalogItem } from "./publishedPrivateTourCatalog";

const routes = [
  {
    slug: "beijing-xian-shanghai-8-day-private-tour",
    reason: { en: "Beijing, Xi’an and Shanghai in eight days.", zh: "八天连接北京、西安和上海。", ko: "8일 동안 베이징·시안·상하이를 연결합니다." },
  },
  {
    slug: "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour",
    reason: { en: "Five cities, with a Guilin hotel base and a Yangshuo day trip.", zh: "五城路线，以桂林为住宿基地，阳朔安排当日往返。", ko: "다섯 도시를 여행하며 계림에 머물고 양삭은 당일로 다녀옵니다." },
  },
  {
    slug: "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
    reason: { en: "Five cities, with two nights in Yangshuo.", zh: "五城路线，阳朔连住两晚。", ko: "다섯 도시를 여행하며 양삭에서 2박합니다." },
  },
  {
    slug: "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
    reason: { en: "Two weeks through Beijing, Xi’an, Zhangjiajie, Guilin and Shanghai.", zh: "两周连接北京、西安、张家界、桂林和上海。", ko: "2주 동안 베이징·시안·장가계·계림·상하이를 연결합니다." },
  },
  {
    slug: "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
    reason: { en: "The fixed-date five-city small group, shared with other guests.", zh: "固定日期的五城小团，与其他客人同行。", ko: "정해진 출발일에 다른 여행자와 함께하는 다섯 도시 소그룹입니다." },
  },
  {
    slug: "suzhou-tongli-hangzhou-shanghai-12-day-private-tour",
    reason: { en: "Jiangnan gardens and water towns, with an overnight in Tongli.", zh: "江南园林与水乡，在同里过夜。", ko: "강남의 정원과 수향을 둘러보고 퉁리에서 숙박합니다." },
  },
] as const;

export const privateTourPriorityCopy = {
  en: { eyebrow: "Start with a multi-city route", title: "China in 8–14 days: choose your journey", introduction: "Compare these longer journeys first, then explore every published route below." },
  zh: { eyebrow: "先选一条多城路线", title: "中国 8–14 天，先看这几种走法", introduction: "先比较这些长线，再从下面的完整目录查看其他已发布路线。" },
  ko: { eyebrow: "여러 도시를 잇는 여행", title: "중국 8~14일, 여행 동선부터 고르세요", introduction: "이 장기 여행들을 먼저 비교한 뒤 아래 전체 목록에서 다른 공개 일정을 살펴보세요." },
} as const;

export function getPrivateTourPriorityEntrances(
  products: readonly PublishedPrivateTourCatalogItem[],
  locale: HomegroundLocale,
) {
  return routes.flatMap((route) => {
    const index = products.findIndex((product) => product.slug === route.slug);
    if (index === -1) return [];
    return [{ product: products[index], catalogPosition: index + 1, reason: route.reason[locale] }];
  });
}
