import type { HomepageProductShowcaseTemplateCopy } from "../components/HomepageProductShowcase";
import type { PlanningScopeCopy } from "./homegroundPlanningScopeI18n";

/**
 * Japanese homepage copy. Written for Japanese readers from the English
 * homepage's structure and facts; wording is not a line-by-line translation.
 */
export const japaneseHomeCopy = {
  metadata: {
    title: "中国のプライベートツアーを日本語で相談 | Homeground China",
    description:
      "北京の旅行会社 Homeground China が、中国各地のプライベートツアーと出発日指定の少人数グループを日本語でご案内します。日程・料金を比べて、そのまま日本語で相談できます。",
  },
  skipLink: "本文へ移動",
  hero: {
    eyebrow: "中国専門の旅行会社・オーダーメイドのプライベート旅行",
    eyebrowShort: "中国の旅行会社",
    canonicalTitle: "中国を、自分たちのペースで。",
    fixedLines: ["中国を、", "自分たちのペースで。"],
    phrases: [
      // Ten characters or fewer, so each phrase stays on one line on a phone.
      "現地はお任せを。",
      "都市をきちんとつなぐ。",
      "移動時間も考えて組む。",
      "手配は私たちが。",
    ],
    body: "まずはイメージに近いルートを選び、旅行日程に合わせて整えていきましょう。",
    primary: "中国のプライベートツアーを比べる",
    secondary: "日本語で旅の相談をする",
    destinationPrompt: "行き先がまだ決まっていませんか？",
    destinationAction: "目的地から探す",
  },
  showcase: {
    eyebrow: "おすすめのプライベートツアー",
    title: "古都の城壁から、カルストの川辺まで。",
    intro: "日ごとの行程と公開料金を見比べて、気になる旅を開いてみてください。",
    countLabel: "{count}コース",
    durationLabel: "{days}日間・{nights}泊",
    productLabel: "プライベートツアー",
    startingPriceLabel: "公開料金の目安",
    quoteOnlyLabel: "日程別のお見積もり",
    quoteOnlyNote: "日程と人数に合わせてご案内",
    perPersonLabel: "1名あたり",
    groupBasis: "{travelers}名参加時",
    actionLabel: "この旅を見る",
    hubActionLabel: "すべての中国ツアーを比べる",
    productListLabel: "Homeground China のプライベートツアー",
  } satisfies HomepageProductShowcaseTemplateCopy,
  reading: {
    eyebrow: "日本語で読める旅の情報",
    title: "行き先と移動から、旅を組み立てる。",
    cards: [
      {
        title: "目的地から探す",
        body: "北京、上海、西安、成都など、ツアーで訪れる都市ごとに、何泊すればよいか、どこに泊まるか、次の都市へのつなぎ方をまとめています。",
        href: "/ja/explore/",
        action: "目的地の一覧へ",
      },
      {
        title: "上海から杭州へ。列車はどの駅を選ぶ？",
        body: "所要時間だけで決めず、ホテルから駅、到着駅から観光地までを含めて比べるためのガイドです。日帰りと宿泊の選び方も整理しました。",
        href: "/ja/guides/shanghai-hangzhou-transport-route/",
        action: "移動ガイドを読む",
      },
      {
        title: "サービスの範囲を知る",
        body: "旅全体の計画と現地の手配をまとめてお任せいただくことも、難しい部分だけをご相談いただくこともできます。お支払い前に書面で内容を確定します。",
        href: "/ja/services/",
        action: "サービスを見る",
      },
    ],
  },
  planningScope: {
    htmlLang: "ja",
    title: "中国の旅を、はじめから終わりまで無理なく。",
    titleLines: ["中国の旅を、", "はじめから終わりまで|無理なく。"],
    body: "旅行日程や興味、ご一緒される方に合わせて、都市を巡る順番、宿泊エリア、都市間の移動、予約、毎日のペースを組み立てます。",
    values: ["日数に合った都市選び", "無理のない都市間の移動", "同行の方に合う一日のペース"],
    cta: "日本語で相談する",
  } satisfies PlanningScopeCopy,
  planning: {
    eyebrow: "必要なときに、現地のプランナーを",
    title: "決まっているものはそのままに。難しいところは任せてください。",
    body: "Homeground は、オーダーメイドのプライベート旅行を専門とする中国の旅行会社です。予約済みの航空券やホテルはそのまま生かし、旅全体をまとめることも、手配の難しい一部分だけをお手伝いすることもできます。",
    teamAction: "Homeground のチームを見る",
  },
  faq: {
    eyebrow: "よくあるご質問",
    title: "ご相談の前に、よく聞かれること。",
    action: "日本語で相談する",
    items: [
      {
        question: "日本語で相談できますか？日本語ガイドは付きますか？",
        answer:
          "ご相談は日本語で承ります。日本語ガイドをご希望の場合も、お気軽にお知らせください。ガイドの言語と料金はコースによって異なります。上海・蘇州・杭州を巡る6日間のプライベートツアーは、日本語ガイドを含む公開料金です。そのほかのコースでは、日本語ガイドを手配できるかどうかと料金を、日程と人数に合わせて確認し、お見積もりします。",
      },
      {
        question: "プライベートツアーですか？それとも少人数グループですか？",
        answer:
          "公開しているコースの多くはプライベートツアーで、ガイドと車はお客様とご一緒の方だけのために手配します。「少人数グループ」と明記したコースは出発日が決まっており、ほかにご予約のお客様とご一緒になります。プライベートのコースでも、公共の列車、クルーズ船、観光地内の交通などをほかの方と利用する場合があり、その部分は各ツアーのページと確認書に記載します。形式、内容、料金はお支払い前に確定し、お客様の同意なく共同の手配に切り替えることはありません。",
      },
      {
        question: "問い合わせをした後は、どうなりますか？",
        answer:
          "まずプランナーが、お客様が解決したいことを伺います。引き続きお手伝いできる場合は、有料の作業を始める前に、サービスの内容、範囲、料金を確定します。",
      },
      {
        question: "予約や現地での手配は、誰が担当しますか？",
        answer:
          "お選びいただくサービスによって異なります。作業を始める前に、Homeground が担当すること、現地のパートナーが提供するサービス、お客様ご自身で予約していただくものを書面でご説明します。",
      },
      {
        question: "子ども連れや年配の家族、歩くのが不安な方がいても計画できますか？",
        answer:
          "はい。歩く距離、階段、朝の早い出発、お部屋の条件、食事のご要望、休憩の必要などは、早めにお知らせください。こうした条件は、ルートと毎日の予定の組み立てに直接関わります。",
      },
      {
        question: "まだ漠然とした考えしかなくても、相談できますか？",
        answer:
          "はい。旅行の時期、人数、すでに決まっている都市があれば、そこから始めましょう。まだ決まっていないことは、やりとりの中で一緒に整理していきます。",
      },
      {
        question: "航空券やホテル、旅の一部をすでに予約している場合は？",
        answer:
          "一から計画し直す必要はありません。確定している手配を生かしたうえで、時間の重なりや無理のある移動、足りない部分があればお伝えします。",
      },
      {
        question: "旅の一部だけを手伝ってもらうことはできますか？",
        answer:
          "はい。旅全体を見てほしい場合も、都市の組み合わせ、交通の乗り継ぎ、宿泊エリア、旅の中の特定の区間など、いちばん手配が難しい部分だけの場合もご相談いただけます。",
      },
    ],
  },
} as const;
