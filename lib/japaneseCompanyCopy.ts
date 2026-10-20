import type { HomegroundCompanyEditionCopy } from "./homegroundCompanyEditions";

const companyName = "盛世美达（北京）国际旅行社有限公司";

/**
 * /ja/company/: the English /company/ page (lib/homegroundCompanyI18n.ts)
 * translated, as lib/homegroundCompanyEditions.ts does for French, Spanish,
 * German and Arabic. Registered facts (the company name, licence L-BJ10587,
 * the issuing and registering authorities, the dates, the 30% deposit) are
 * copied exactly; only the prose is translated. Kept in a Japanese-only file
 * so its text stays out of the Chinese serif font subset.
 *
 * Translation notes:
 * - Service, sight and city names are the Japanese edition's own: プライベート
 *   英語ガイド and 旅行プランニング・現地サポート as the Japanese service pages
 *   name them, 故宮（紫禁城） and 兵馬俑 as the Japanese sight cards do.
 * - "A friend has come from afar." is the Analects line the Chinese page
 *   quotes (有朋自远方来), given in its usual Japanese reading.
 * - The licensing bodies follow the Japanese business-information page's
 *   wording (文化観光, 訪中旅行（インバウンド）).
 */
export const japaneseCompanyCopy: HomegroundCompanyEditionCopy = {
  path: "/ja/company/",
  skipLink: "本文へ移動",
  metadata: {
    title: "Homeground Chinaについて：私たちの使命と価値観",
    description:
      "Homeground Chinaは、北京の旅行業許可を持つ旅行会社です（旅行業許可番号 L-BJ10587）。2003年から旅行の仕事を続けています。中国はあなたらしく、難しいところは私たちに。安心してお任せいただける理由、お手伝いの範囲の選び方、私たちがこの仕事をする理由をご紹介します。",
    openGraphTitle: "Homeground Chinaについて",
  },
  navLabel: "私たちの使命",
  eyebrow: "会社案内",
  title: "中国は、あなたらしく。難しいところは、私たちに。",
  titleLines: ["中国は、あなたらしく。", "難しいところは、私たちに。"],
  intro:
    "Homeground Chinaは、北京の旅行業許可を持つ旅行会社です。自分のやり方で中国を旅したい方を、私たちが支えます。必要なのがチケットだけなら、私たちが予約します。ガイドが必要なら、1日単位で予約できます。旅をまるごと任せたいなら、最初のメールから帰国の日まで、一人の担当者がお世話します。",
  teamAction: "チームを知る",
  credentialsAction: "許可証と登記情報",
  proof: {
    label: "数字で見るHomeground",
    since: "旅行の仕事を始めた年",
    people: "チームのメンバー数",
    tours: "公開中のプライベートツアー数",
    languages: "サイトの対応言語数",
  },
  reasons: {
    eyebrow: "安心してお任せいただける理由",
    title: "お約束できる6つのこと",
    items: [
      { title: "最初から最後まで、一人の担当者", body: "最初のメールから帰国の日まで、同じプランナーがお世話します。途中で担当が替わることはありません。" },
      { title: "いつでも連絡がつきます", body: "中国に滞在中に何かあれば、WeChatかWhatsAppで直接メッセージをお送りください。" },
      { title: "ガイドとドライバーは自社で手配", body: "ガイドとドライバーは私たち自身が手配し、お客様の旅をほかの現地手配会社に任せることはありません。" },
      { title: "ショッピングの立ち寄りも、隠れた費用もありません", body: "お見積もりには含まれる内容をすべて明記し、ショッピングに立ち寄る旅程は一つもありません。" },
      { title: "旅行業許可を持つ旅行会社", body: `${companyName}。旅行業許可番号 L-BJ10587、北京市文化観光局の発行です。` },
      { title: "お支払いは会社へ、残金は到着後に", body: "30%の手付金は、当社のAlipay加盟店口座にお支払いいただきます。残金は中国に到着してからのお支払いです。" },
    ],
  },
  help: {
    eyebrow: "お手伝いの範囲",
    title: "どこまで任せるかは、あなたが決められます",
    tickets: {
      title: "チケットはお任せください",
      body: "故宮（紫禁城）や兵馬俑も、予定に入れたままで大丈夫です。パスポートのお名前での予約は私たちが行います。発売前に準備できるよう、日程が決まったらすぐにお送りください。",
      link: "チケットの予約を依頼する",
    },
    guide: {
      title: "1日単位のガイド",
      body: "上海・北京・西安・張家界で、資格を持つプライベートガイドを1日単位で予約できます。",
      link: "プライベート英語ガイド",
    },
    trip: {
      title: "旅のすべて",
      body: "ルート、ホテル、車、ガイド、チケットをまとめて手配し、中国に着いてからもそばでお手伝いします。",
      link: "旅行プランニング・現地サポート",
    },
  },
  why: {
    eyebrow: "この仕事をする理由",
    title: "朋あり、遠方より来たる。",
    body: "人が旅をして出会うほど、互いの誤解は少なくなると私たちは信じています。いちばんよいのは、実際に来て自分の足で歩き、ふつうの人々が暮らす中国を見ることです。私たちの仕事は、そんな旅に踏み出す人を一人でも多く後押しすることです。",
    values: [
      { title: "まず、本当のことを", body: "その場所が実際にどうなのか、費用はいくらか、私たちにできないことは何か。お支払いの前にお伝えします。" },
      { title: "友人を迎えるように", body: "あなたのペース、興味、一緒に旅する人に合わせて計画します。地元を訪ねてきた友人のためにそうするように。" },
      { title: "現地に根ざして", body: "Homegroundは「home ground（ホームグラウンド）」という意味です。中国は私たちの地元。何かあれば、ここにいる誰かが対応します。" },
    ],
  },
  cities: {
    eyebrow: "私たちが活動する都市",
    title: "私たちのホームグラウンド",
    intro: "どの都市にも、このサイトで公開している都市ガイドとプライベートツアーがあります。",
  },
  timeline: {
    eyebrow: "これまでの歩み",
    title: "ここまでの道のり",
    items: [
      { date: "2003年", title: "旅行の仕事を始める", body: "それ以来、国内旅行、海外旅行、訪中旅行（インバウンド）と、旅行の仕事を続けてきました。" },
      { date: "2025年1月", title: "北京の旅行会社を登記", body: `${companyName}を、昌平区の市場監督管理局に登記しました。` },
      { date: "2025年", title: "旅行業許可 L-BJ10587", body: "北京市文化観光局から、国内旅行と訪中旅行（インバウンド）の旅行業許可を受けました。" },
      { date: "2026年", title: "homegroundchina.comを公開", body: "英語・中国語・韓国語で、都市ガイド、旅のアドバイス、プライベートツアーを公開しました。" },
      { date: "2026年10月", title: "チームづくり", body: "中国各地で、旅行アドバイザー、ガイド、コンテンツスタッフの採用を始めます。" },
    ],
  },
  next: {
    eyebrow: "さらに詳しく",
    title: "私たちのことを知り、書類を確かめてください",
    team: { title: "チームを知る", body: "あなたの旅を計画するプランナーと、実行できる計画かどうかの見極め方。" },
    credentials: { title: "許可証と登記情報", body: "登記している情報と、それを確認できる公式の登録サイト。" },
    careers: { title: "採用情報（中国語）", body: "旅行アドバイザー、ガイド、コンテンツスタッフを募集しています。" },
  },
  cityNames: { beijing: "北京", shanghai: "上海", xian: "西安", chengdu: "成都", guangzhou: "広州", hangzhou: "杭州", zhangjiajie: "張家界", chongqing: "重慶" },
  englishMarker: "（英語）",
};
