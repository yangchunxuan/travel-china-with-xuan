/**
 * The Japanese rows of the English Private Tours and Services menus. The
 * header, the collection pages' "other ways" and service rows, and the city
 * pages' service rows all use these, so each row reads the same everywhere,
 * as in the other editions.
 */
export const japaneseTourMenu = {
  "all-tours": { label: "すべてのプライベートツアー", description: "地域、日数、料金で全ルートを比べる", href: "/ja/tours/" },
  "multi-city": { label: "複数都市の定番ルート", description: "ひとつの旅で、いくつもの都市へ", href: "/ja/tours/multi-city/" },
  regions: { label: "ひとつの地域をめぐる旅", description: "華東、中国西南部、華南ほか", href: "/ja/tours/regions/" },
  seasonal: { label: "今シーズンの旅", description: "中国東北部の冬：ハルビンと長白山", href: "/ja/tours/seasonal/" },
} as const;

export const japaneseServiceMenu = {
  "attraction-tickets": { label: "観光チケットの予約", description: "チケットの予約はお任せください。日程が決まったら早めにご連絡を。", href: "/ja/services/china-attraction-reservations/" },
  "english-guides": { label: "プライベート英語ガイド", description: "1日単位で、4都市でご案内します", href: "/ja/services/private-english-speaking-guides/" },
  "private-car": { label: "専用車・ドライバー", description: "空港送迎と専用車での1日観光", href: "/ja/services/private-car-and-driver/" },
  "trip-support": { label: "旅行プランニング・現地サポート", description: "ホテル、送迎、現地でのサポート", href: "/ja/services/full-trip-support/" },
} as const;
