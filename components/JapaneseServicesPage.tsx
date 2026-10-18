import { attractionReservationServiceFeeCny } from "../lib/attractionReservations";
import { japaneseLanguagePaths, japaneseSite } from "../lib/japaneseSite";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import { TravelServicesHubPage, type TravelServicesHubEdition } from "./TravelServicesHubPage";

const SITE_URL = "https://homegroundchina.com";

export const japaneseServicesCopy = {
  metadata: {
    title: "旅のサポートとサービス内容 | Homeground China",
    description:
      "プライベートガイド、送迎、ホテル選び、ルートの組み立てから旅全体のサポートまで。Homeground China が日本語でお手伝いできることと、進め方をご案内します。",
  },
  hero: {
    eyebrow: "ガイド・送迎・旅のサポート",
    title: "旅をもっと快適にする、現地のサポート。",
    description:
      "プライベートガイド、送迎、ホテル選び、ルートの組み立て、旅全体のサポートまで。ご要望を伺ったうえで、必要なお手伝いを組み合わせます。",
    scopeTitle: "現地のサポートが必要なのは、どこでしょう？",
    scope: [
      "手配が難しい一日だけ、プライベートガイドがほしい",
      "送迎やホテル、予約のサポートで不安を減らしたい",
      "旅全体を一人の担当者にまとめてほしい",
    ],
  },
  choices: {
    eyebrow: "わかっていることから始める",
    title: "旅に必要なサポートを、必要な分だけ。",
    body: "公開中のプライベートツアーを比べることも、旅行の時期や人数、必要な手配をお知らせいただくこともできます。ご提供できる内容とお見積もりは、ご予約の前に確認します。",
  },
  cards: [
    {
      id: "tours",
      eyebrow: "公開中のツアー",
      title: "プライベートツアーを比べる",
      body: "日ごとの実際の行程、公開料金、含まれるもの、予約の条件を確かめてから、日程に合うかどうかを判断できます。",
      action: "ツアー一覧を見る",
      href: japaneseSite.tours,
    },
    {
      id: "guides",
      eyebrow: "必要な一日だけ、現地の案内を",
      title: "プライベートガイド",
      body: "上海・北京・西安・張家界で、1日8時間までの英語ガイド料金をご案内しています。日本語ガイドをご希望の場合は、空き状況と追加料金を別途確認します。",
      action: "ガイドのサービスと料金を見る",
      href: "/ja/services/private-english-speaking-guides/",
    },
    {
      id: "reservations",
      eyebrow: "日程が決まったら、早めに予約を",
      title: "中国の取りにくい入場券は、私たちにお任せください",
      body: `故宮博物院や美術館など、旅で訪れたい場所の入場券をお任せください。早めにご相談いただければ、希望日の予約に向けて準備を進められます。手配料はお一人・一施設につき ${attractionReservationServiceFeeCny} CNY、入場券は額面どおりの料金です。`,
      action: "入場券の予約サービスを見る",
      href: "/ja/services/china-attraction-reservations/",
    },
    {
      id: "support",
      eyebrow: "現地での手配まで",
      title: "旅全体のサポート",
      body: "計画に合わせて、ホテル、入場券、送迎、現地での手配までをつなげます。私たちが担当する範囲は、始める前に書面でご案内します。",
      action: "旅全体のサポートを見る",
      href: "/ja/services/full-trip-support/",
    },
  ],
  method: {
    eyebrow: "どのように判断するか",
    title: "ご相談の前に、計画の進め方を知る。",
    body: "Homeground は、有料の作業を始める前に、お客様ご自身で手配を続けてよい部分、改めて確認が必要な部分、私たちが責任を持つ部分をご説明します。",
    guideNote:
      "ご相談は日本語で承ります。日本語ガイドをご希望の場合も、お気軽にお知らせください。上海・蘇州・杭州を巡る6日間のプライベートツアーは、日本語ガイドを含む公開料金です。そのほかのコースでは、日本語ガイドを手配できるかどうかと料金を、日程と人数に合わせて確認し、お見積もりします。",
    studioAction: "チームと進め方を見る",
    exploreAction: "目的地から旅を探す",
  },
} as const;


export function JapaneseServicesPage() {
  const copy = japaneseServicesCopy;
  const canonicalUrl = `${SITE_URL}${japaneseSite.services}`;
  const languagePaths = japaneseLanguagePaths("/services/", japaneseSite.services);
  const edition: TravelServicesHubEdition = {
    language: "ja",
    homePath: japaneseSite.home,
    homeLabel: "ホーム",
    skipLink: "本文へ移動",
    header: <JapaneseSiteHeader
      contactHref={japaneseSite.contact}
      currentPath={japaneseSite.services}
      languagePaths={languagePaths}
    />,
    footer: <JapaneseSiteFooter currentPath={japaneseSite.services} />,
    copy: {
      breadcrumb: "現在の位置",
      overview: "サービス",
      choicesEyebrow: copy.choices.eyebrow,
      choicesTitle: copy.choices.title,
      choicesBody: copy.choices.body,
      cards: copy.cards,
      methodEyebrow: copy.method.eyebrow,
      methodTitle: copy.method.title,
      methodBody: `${copy.method.body} ${copy.method.guideNote}`,
      methodAction: copy.method.studioAction,
      adviceAction: "旅の疑問をガイドで調べる",
    },
    section: {
      navLabel: "サービス",
      shortLabel: "サービス",
      ...copy.hero,
    },
    serviceHref: id => copy.cards.find(card => card.id === id)!.href,
    planningHref: japaneseSite.studio,
    guidesHref: japaneseSite.guides,
    feeLabel: `${attractionReservationServiceFeeCny} CNY`,
    additionalServiceLinks: [
      { href: "/ja/services/private-car-and-driver/", label: "専用車・空港送迎だけをお探しの方はこちら" },
    ],
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: copy.hero.title,
          description: copy.metadata.description,
          inLanguage: "ja",
          sameAs: languagePaths.map(item => `${SITE_URL}${item.path}`),
          mainEntity: { "@id": `${canonicalUrl}#services` },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}${japaneseSite.home}` },
            { "@type": "ListItem", position: 2, name: "サービス", item: canonicalUrl },
          ],
        },
        {
          "@type": "ItemList",
          "@id": `${canonicalUrl}#services`,
          numberOfItems: copy.cards.length,
          itemListElement: copy.cards.map((card, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: card.title,
            url: `${SITE_URL}${card.href}`,
          })),
        },
      ],
    },
  };
  return <TravelServicesHubPage edition={edition} />;
}
