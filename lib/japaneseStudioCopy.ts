import {
  homegroundStudioCopy,
  type HomegroundStudioCopy,
  type StudioMember,
} from "./homegroundStudioI18n";

/**
 * Japanese copy for the team page (/ja/studio/), in the same shape as the
 * EN / ZH / KO entries of homegroundStudioCopy. The English entry is the
 * source of truth; see the adaptation notes at the end of this file.
 */

// The photos are shared by every language, so only the alt text is new here.
function photo(id: string, alt: string): StudioMember["image"] {
  const member = homegroundStudioCopy.en.members.find(
    (candidate) => candidate.id === id,
  );
  if (!member) throw new Error(`Missing ${id} in the English studio copy.`);
  return { ...member.image, alt };
}

export const japaneseStudioCopy: HomegroundStudioCopy = {
  path: "/ja/studio/",
  metadata: {
    title: "中国旅行はこう計画します | Homeground China",
    description:
      "日程、同行者、優先したいこと、すでに決まっている予約をもとに、無理のない中国旅行のルートを組み立て、サービスの範囲と実行できる計画を書面にまとめる流れをご紹介します。",
    openGraphTitle: "Homegroundは中国の旅をこう組み立てます",
  },
  eyebrow: "中国旅行を計画する流れ",
  title: "実際の条件から、そのまま使える旅の計画へ。",
  intro:
    "すでに決まっていること、大切にしたいこと、まだ決めていないことを教えてください。一人の主任プランナーがその内容を筋の通ったルートにまとめ、実際の旅の条件と照らし合わせて確かめます。有料の作業を始める前に、どこまでを行うのかを具体的に確認します。",
  overview: {
    title: "計画の流れを、ひと目で",
    stages: [
      {
        label: "01 / 旅の情報",
        title: "ありのままの旅から始めます",
        detail:
          "日程、同行者、必ず見たい場所、旅のペース、歩行や移動への配慮、決まっている予約、まだ迷っていること。",
      },
      {
        label: "02 / 進め方",
        title: "ご要望を整理 → 実現性を確認 → 書面にまとめる",
        detail:
          "プランナー自身が、無理なくつながる点、食い違う点、先に決めるべきことを確かめます。",
      },
      {
        label: "03 / お渡しするもの",
        title: "プライベートツアーの範囲と手配内容",
        detail:
          "お渡しするのは、ありきたりの観光地リストではなく、合意したサービスに沿って作成する書面です。",
      },
    ],
    termsLabel: "04 / お渡しの時期",
    termsTitle: "有料の作業を始める前に、お渡し日を確認します",
    terms: [
      {
        label: "お渡しの時期",
        value: "お支払い前にお渡し日を確認",
      },
    ],
  },
  collageLabel: "Homeground Chinaの5人のメンバー",
  peopleEyebrow: "だれが何を担当するのか",
  peopleTitle: "得意分野はそれぞれ。計画の流れは一つ。",
  peopleIntro:
    "やり取りは、主任プランナーが一つの窓口として進めます。旅に必要なときは、チームのほかのメンバーがルート、目的地、手配・運営、お客様対応の経験を持ち寄ります。",
  peopleDetailsLabel: "経歴と経験を見る",
  proof: {
    label: "数字で見るHomeground",
    people: "Homegroundのチームメンバー数",
    guides: "公開中の中国旅行ガイド記事数（英語・中国語・韓国語）",
    tours: "公開中のプライベートツアー数",
    languages: "サイトの対応言語数（英語・中国語・韓国語・日本語）",
  },
  members: [
    {
      id: "evan",
      name: "Evan",
      role: "主任プランナー／異文化をつなぐ旅の設計",
      value:
        "初めての中国旅行でわからないことを、一緒に話し合える明確な選択肢に変えます。",
      bio:
        "Evanは韓国の西江大学校の出身で、台湾、タイ、マレーシアでも暮らしてきました。異なる文化の中で過ごした経験から、海外の旅行者が初めての中国旅行で本当に気にかけていることがよくわかります。どの都市を残すのか、移動に無理はないか、言葉の壁で困らないか。旅全体の方向性を組み立て、込み入った判断も英語または韓国語で説明できます。",
      tags: ["英語", "韓国語", "異文化をふまえた計画", "複数都市の旅程"],
      image: photo("evan", "書店で本に見入るEvan"),
    },
    {
      id: "yoyo",
      name: "Yoyo",
      role: "旅行プランナー／細部の調整担当",
      value: "ばらばらな旅の希望を、無理なくつながるルートにまとめます。",
      bio:
        "会計を学んだYoyoは、物事を自然と筋道立てて考えます。まだ形になっていないアイデアを実際に回れるルートに落とし込み、宿泊数や都市間のつながり、見落としやすい細部まで確かめます。北京などで旅行者をサポートしてきた経験から、その計画が実際に旅をする方々に本当に合っているかどうかを大切にしています。",
      tags: ["ルートの組み立て", "宿泊数の配分", "細部の確認", "都市間のつながり"],
      image: photo("yoyo", "中国を旅行中、山あいの湖のそばに立つYoyo"),
    },
    {
      id: "tantan",
      name: "Tantan",
      role: "旅行プランナー／湖南の現地調整担当",
      value: "張家界エリアのどの計画にも、現地の実情を反映させます。",
      bio:
        "Tantanは旅行の計画と湖南省での現地調整の両方を担い、張家界、長沙、鳳凰の周辺で現場の経験を積んできました。行程表の上では簡単に見えるルートも、車での移動時間や行列、天気によって変わることをよく知っています。計画を画面の上だけでなく、現地で本当に成り立つものにすること。それがTantanの役割です。",
      tags: ["張家界", "長沙", "鳳凰", "湖南での現地調整"],
      image: photo("tantan", "タイ旅行中、ゾウのそばで笑顔を見せるTantan"),
    },
    {
      id: "kevin",
      name: "Kevin",
      role: "旅行プランナー／手配・運営担当",
      value: "手配の抜け漏れを、旅行当日のトラブルになる前に見つけ出します。",
      bio:
        "英語を学んだKevinは、大学在学中から現地ガイドや旅行の手配・運営の仕事を始め、約4年の現場経験を積んできました。到着から都市間の移動、現地でのやり取り、旅程の実施まで、旅の流れ全体を理解しています。その経験を生かして、引き継ぎの弱い部分を早い段階で見つけ出し、見栄えのよい計画が旅行者の到着後もきちんと機能するようにしています。",
      tags: ["英語でのサポート", "現地手配", "進行管理", "実施内容の確認"],
      image: photo("kevin", "旅行中、マレーシアのプトラ・モスクの前に立つKevin"),
    },
    {
      id: "vivi",
      name: "Vivi",
      role: "お客様対応／現地手配",
      value:
        "声が届き、状況がわかり、見守られている。旅行者がそう感じられるよう支えます。",
      bio:
        "Viviは現地でのお客様対応の確かな経験と、自然な温かさが伝わるコミュニケーションが持ち味です。観光地のリストだけでなく、返信が遅れずに届いているか、引き継ぎがはっきりしているか、旅行者からの要望がきちんと受け止められているかにも目を配ります。お客様とのやり取りや現地での調整をサポートし、旅の段取りに細やかな気配りと安心感を添えています。",
      tags: ["お客様とのやり取り", "現地での調整", "明確な引き継ぎ", "旅行中のサポート"],
      image: photo("vivi", "旅先で飲み物を手にくつろぐVivi"),
    },
  ],
  trust: {
    eyebrow: "仕事の進め方",
    title: "旅の基本情報をお送りいただいた後の流れ。",
    body:
      "やり取りは、旅の全体を把握している主任プランナーが一つの窓口となり、わかりやすく進めます。Homegroundが担当する手配と、旅行中に含まれるサポートの内容は、旅行の合意書で確認します。",
    inputsTitle: "お送りいただくこと",
    inputs: [
      "旅行の日程と、到着・出発の場所",
      "同行される方、ご希望の旅のペース、移動やお部屋に関するご要望",
      "必ず行きたい場所と、なくても構わない候補",
      "決まっている予約、参考になるご予算の目安、決める期限があればその時期",
    ],
    stepsTitle: "私たちが行うこと",
    points: [
      {
        title: "ご要望を把握する",
        detail:
          "決まっていること、変えられること、ルートに影響する不足情報を、プランナーが見分けます。",
      },
      {
        title: "旅全体を検証する",
        detail:
          "都市の順番、宿泊数、移動、ペース、現地での制約を、つながった一つの旅として確認します。",
      },
      {
        title: "有料の作業の前に確認する",
        detail:
          "ご旅行に合ったサービス、書面にしたサービス範囲、旅行のお見積もり、次の進め方をお返事します。",
      },
    ],
    deliverablesTitle: "お受け取りいただくもの",
    deliverables: [
      "旅全体の計画と現地サポート：計画・手配・現地対応の範囲を、その旅に合わせて書面にまとめます",
      "合意したサービスについて、前提、取捨選択、次に決めることを明確にお示しします",
    ],
    boundary:
      "プライベートツアーの最初のお問い合わせは無料です。ご旅行の日程と人数に合わせた手配内容、含まれるもの、お見積もりは、ご予約の前に確認します。",
  },
  cta: {
    label: "次のステップ",
    title: "見逃したくない場所を、教えてください。",
    body:
      "WhatsApp またはメールでご連絡ください。日本語でご相談いただけます。まだ決まっていないことをプランナーがうかがい、ご旅行に合った次のステップをご説明します。有料の作業は、範囲、料金、お渡しの時期を確認してから始めます。",
    button: "中国旅行のプランナーに相談する",
    secondaryButton: "旅の計画サービスを比べる",
  },
  homeLink: "計画を支えるメンバーを見る",
};

/**
 * Strings and routes HomegroundStudioPage.tsx does not read from the studio
 * copy: text hard-coded in the component, text it takes from other locale
 * maps, and the page-level values it derives from the locale.
 */
export const japaneseStudioComponentStrings = {
  /** Page-level values (component: homeCopy.htmlLang, homeCopy.path, copy.path). */
  htmlLang: "ja", // EN: "en"
  homePath: "/ja/", // EN: "/"
  pagePath: "/ja/studio/", // EN: "/studio/"
  /** Component: `${homeCopy.path}#planner-contact`; the Japanese contact anchor is japaneseSite.contact. */
  plannerHref: "/ja/#contact", // EN: "/#planner-contact"
  /** Component: isEnglish ? "/services/" : `/${locale}/services/`. */
  planningServicesHref: "/ja/services/", // EN: "/services/"

  /** Skip link (homegroundI18n skipLink). */
  skipLink: "本文へ移動", // EN: "Skip to main content"

  /** Hero buttons: hard-coded for English, copy.cta.* for other locales. */
  heroPrimaryAction: "中国旅行のプランナーに相談する", // EN: "Talk to a China trip planner"
  heroSecondaryAction: "旅の計画サービスを比べる", // EN: "Compare planning services"

  /** CTA buttons: hard-coded for English, copy.cta.* for other locales. */
  ctaPrimaryAction: "中国旅行のプランナーに相談する", // EN: "Talk to a China trip planner"
  ctaSecondaryAction: "旅の計画サービスを比べる", // EN: "Compare planning services"

  /**
   * MemberStoryLink labels (guideRegistry featuredLinkLabel of the guides in
   * memberStoryGuideIds). Neither guide has a Japanese version yet.
   */
  memberStoryLinks: {
    tantan: "Tantanが現地で確かめる7つのポイントを見る", // EN: "Read Tantan’s seven on-the-ground checks" (guide: zhangjiajie-glass-bridge-vs-skywalk)
    kevin: "Kevinがお客様と会う前の準備を見る", // EN: "See how Kevin prepares before meeting a guest" (guide: kevin-before-the-hotel-pickup)
  },
} as const;

// Adaptation notes:
// - metadata.title: "How Homeground Plans China Trips" is written as
//   "中国旅行はこう計画します｜Homegroundの旅づくり" so the Japanese title leads with
//   the search phrase 中国旅行; same meaning, no new claim.
// - "lead planner" is 主任プランナー throughout (intro, peopleIntro, trust.body,
//   Evan's role), matching ZH 主规划师 and KO 리드 플래너.
// - overview.stages[0].label "Inputs" is "旅の情報" (the trip details you send);
//   stages[1].title "Brief → fit check → written work" is spelled out as
//   "ご要望を整理 → 実現性を確認 → 書面にまとめる".
// - stages[1].detail "A human planner" is "プランナー自身が" (the planner
//   personally), which keeps the "done by a person" point without the
//   awkward literal 人間のプランナー.
// - "delivery date / delivery timing" is お渡し日 / お渡しの時期 rather than the
//   B2B word 納品.
// - proof.* labels are written as counted nouns (…数) because the number is
//   shown above the label; ZH/KO start the label with a counter word instead.
// - proof.guides "published China travel guides" is ガイド記事 so it is not
//   read as human tour guides. The count is of the English guides, which are
//   also published in Chinese and Korean; only one guide has a Japanese
//   version, so the label names the three languages.
// - proof.languages: the EN list "English, Chinese and Korean" is extended to
//   "英語・中国語・韓国語・日本語", because this label appears on the Japanese
//   site itself. The figure above it must then be 4 (see the report: the
//   component currently shows homegroundLocales.length, which is 3).
// - cta.body: one sentence added, "日本語でご相談いただけます。" (the owner has
//   confirmed Japanese consultation; the same line already appears on /ja/).
//   Nothing is said about Japanese-speaking guides anywhere on this page.
// - trust.deliverables[0]: the service name "Full Trip" uses the name the
//   Japanese legal pages give it, "旅全体の計画と現地サポート".
// - Evan's bio: Sogang University is 西江大学校, its official Japanese name;
//   "graduated from" is written as "…の出身で" (the usual Japanese way to say
//   someone graduated from a university). "whether communication will hold
//   together" becomes "言葉の壁で困らないか" (will the language barrier be a problem).
// - Yoyo's "accounting background" is "会計を学んだ" (ZH: 会计专业背景);
//   Kevin's "studied English" is "英語を学んだ".
// - Tantan: "Hunan" is 湖南省 in the bio and 湖南 in the role and tag;
//   Fenghuang is 鳳凰, as on the Japanese product pages (鳳凰古城).
//   "a route that looks simple on paper" is "行程表の上では簡単に見えるルート"
//   (on the itinerary sheet).
// - Tantan and Kevin: "practical experience" is 現場の経験 / 現場経験.
// - Vivi: "the practical side of the trip" is 旅の段取り.
// - trust.body "trip agreement" is 旅行の合意書.
// - trust.points[0] "Read the brief" is "ご要望を把握する"; "identifies" is 見分けます.
// - Vivi's value "feel heard, informed and looked after" is restructured as
//   "声が届き、状況がわかり、見守られている。旅行者がそう感じられるよう支えます。"
// - Role lines use "／" between the two halves, the usual Japanese
//   business-card form, instead of "&".
// - Alt texts: "in Thailand" / "in Malaysia" / "in China" kept; Putra Mosque is
//   プトラ・モスク. Evan "reading in a bookshop" is "書店で本に見入るEvan"
//   (absorbed in a book).
// - homeLink "Meet the people behind the plan" is "計画を支えるメンバーを見る".
// - memberStoryLinks: "Read" / "See" are both "…を見る".
// - Wording avoids kanji that the current font subset lacks (see the report),
//   which is why several of the choices above use a more common word.
