import { homegroundBusiness } from "./homegroundBusiness";
import type {
  HomegroundLegalCopy,
  HomegroundLegalPageId,
} from "./homegroundLegalI18n";
import { travelAgencyCertificateHolder } from "./homegroundTravelAgencyCredentials";

/**
 * Japanese copy for the business information, terms and refund & delivery
 * pages. The English copy in lib/homegroundLegalI18n.ts and
 * lib/homegroundTravelAgencyCredentials.ts is the source of truth; section
 * order, ids and every fact follow it. Japanese readers have no website form
 * and contact Homeground by WhatsApp or email, so form wording is adapted
 * (see the notes at the end of this file).
 */
export type JapaneseLegalCopy = Omit<HomegroundLegalCopy, "locale"> & {
  locale: "ja";
};

type JapaneseLegalSection = JapaneseLegalCopy["sections"][number];

const holder = travelAgencyCertificateHolder;

const reviewedValue = "2026年7月24日";
const businessReviewedValue = "2026年9月15日";

// Official registry names stay in Chinese, exactly as the Chinese copy names them.
const enterpriseRegistryName = "国家企业信用信息公示系统";
const tourismRegistryName = "全国旅游监管服务平台";

const enterpriseRegistryDetail = `中国の国家企業信用情報公示システムです（中国語のサイト）。統一社会信用コード ${homegroundBusiness.unifiedSocialCreditCode} で検索してください。`;

// The English copy repeats this notice on all three pages.
const currentServicesNotice =
  "ルート確認とルート作成の単体の有料サービスは、提供を終了しました。すでにお引き受けしているサービスには、引き続き当初の書面による合意が適用されます。プライベートツアーの手配内容、含まれるサービス、料金、お支払い条件は、ご予約の前に書面で確認します。";

function shared(
  pageId: HomegroundLegalPageId,
  pageLabel: string,
): Pick<
  JapaneseLegalCopy,
  | "htmlLang"
  | "locale"
  | "pageId"
  | "pagePath"
  | "homePath"
  | "languageShort"
  | "navigation"
  | "skipLink"
  | "relatedLabel"
  | "related"
> {
  return {
    htmlLang: "ja",
    locale: "ja",
    pageId,
    pagePath: `/ja/${pageId}/`,
    homePath: "/ja/",
    languageShort: "日本語",
    navigation: {
      homeLabel: "Homeground China ホーム",
      languageLabel: "ページの表示言語を選ぶ",
      pageLabel,
      homeCta: "旅の相談をする",
    },
    skipLink: "本文へ移動",
    relatedLabel: "事業者・サービスに関する情報",
    related: {
      business: "事業者情報",
      terms: "利用規約",
      refund: "返金・提供条件",
      privacy: "プライバシーポリシー",
      contact: "メールで問い合わせる",
    },
  };
}

const travelAgencyCredentialsSection: JapaneseLegalSection = {
  id: "travel-agency-credentials",
  title: "旅行業許可と許可証・証明書",
  paragraphs: [
    "Homeground の運営会社は、中国における国内旅行と訪中旅行（インバウンド）の業務について、以下の許可証・証明書を保有しています。",
  ],
  facts: [
    {
      label: "運営会社",
      value: holder.registeredName,
      detail: holder.englishName,
    },
    { label: "統一社会信用コード", value: holder.unifiedSocialCreditCode },
    { label: "旅行業許可番号", value: holder.travelAgencyLicenceNumber },
    {
      label: "許可文書番号",
      value: homegroundBusiness.travelAgencyPermitDocumentNumber,
    },
    { label: "許可業務", value: "中国国内旅行と訪中旅行（インバウンド）" },
    {
      label: "旅行業許可証",
      value: "旅行業許可証の画像を見る",
      href: holder.travelAgencyLicencePath,
    },
    {
      label: "営業許可証",
      value: "営業許可証の画像を見る",
      href: holder.businessLicencePath,
    },
    {
      label: "旅行業許可を公式サイトで確認",
      value: tourismRegistryName,
      detail:
        "中国文化観光部の全国旅行監督管理サービスプラットフォームです（中国語のサイト）。上記の運営会社（許可証の名義人）の中国語の正式名称で検索してください。",
      href: homegroundBusiness.travelAgencyRegistryUrl,
      external: true,
    },
    {
      label: "企業登記を公式サイトで確認",
      value: enterpriseRegistryName,
      detail: enterpriseRegistryDetail,
      href: homegroundBusiness.registryUrl,
      external: true,
    },
  ],
};

const businessInformation: JapaneseLegalCopy = {
  ...shared("business-information", "事業者情報"),
  metadata: {
    title: "事業者情報 | Homeground China",
    description:
      "Homeground を運営する登記事業者、旅行業許可証と営業許可証の画像、旅行サービスとお支払いの確認方法をご案内します。",
  },
  hero: {
    eyebrow: "事業者情報",
    title: "Homeground を運営する会社",
    intro:
      "Homeground は、中国本土の北京で法に基づいて登記された旅行会社が運営する、中国旅行のブランドです。同社の旅行業許可は、中国国内旅行と訪中旅行（インバウンド）を対象としています。",
    reviewedLabel: "最終確認日",
    reviewedValue: businessReviewedValue,
  },
  callout: {
    label: "わかりやすい始め方",
    title: "登記内容を確認できる事業者が、お支払いの前にサービスの範囲を明確にします。",
    body:
      "まずは WhatsApp またはメールで、旅のご希望をまとめてお送りください。Homeground がご要望を整理し、次のステップを書面でお知らせします。お引き受けする場合は、お支払いの前に、サービス内容、料金、範囲、提供の時期、お支払いに関する詳細をお示しします。",
  },
  sections: [
    {
      id: "registered-details",
      title: "登記情報",
      facts: [
        { label: "登記上の名称", value: homegroundBusiness.registeredName },
        {
          label: "統一社会信用コード",
          value: homegroundBusiness.unifiedSocialCreditCode,
        },
        {
          label: "法定代表者",
          value: homegroundBusiness.legalRepresentative,
        },
        {
          label: "登記上の住所",
          value: homegroundBusiness.registeredAddress,
        },
        {
          label: "登記機関",
          value: homegroundBusiness.registrationAuthority,
        },
        { label: "設立日", value: homegroundBusiness.registrationDate },
        {
          label: "公的な企業情報公示システム",
          value: enterpriseRegistryName,
          detail: enterpriseRegistryDetail,
          href: homegroundBusiness.registryUrl,
          external: true,
        },
      ],
    },
    travelAgencyCredentialsSection,
    {
      id: "current-services",
      title: "Homeground が現在提供しているサービス",
      cards: [
        {
          title: "旅全体の計画と現地サポート",
          body:
            "旅全体のご相談を Homeground にお寄せください。まず日程、旅行される方、重視したいこと、必要なサポートを伺い、そのうえで実行可能な次のステップ、サービスの範囲、ご提案の内容を確認します。",
        },
      ],
      paragraphs: [currentServicesNotice],
    },
    {
      id: "how-it-starts",
      title: "旅のご相談の進み方",
      numbered: [
        "WhatsApp またはメールで、旅のご希望を無料でお送りいただきます。",
        "Homeground が、旅のご要望と手配できる内容を確認します。",
        "お支払いの前に、運営事業者、サービス内容、料金と通貨、含まれる業務、ご用意いただく資料、提供日、適用される条件を記載した確認書を、書面でお送りします。",
        "お支払い方法は別途ご案内します。",
        "お支払いが確認でき、必要な資料がすべてそろった後に作業を始めます。",
      ],
    },
    {
      id: "payment-records",
      title: "お支払いの記録と連絡先",
      paragraphs: [
        "お問い合わせの WhatsApp やメールで、カード情報、銀行のログイン情報、決済用の QR コードを送らないでください。お支払いの前に、受取人の名義が書面のサービス確認書と一致しているかをご確認ください。発行できる請求書または領収書については、お支払いの前にお知らせします。",
      ],
      facts: [
        {
          label: "サービスと個人情報に関するメール",
          value: homegroundBusiness.serviceEmail,
          href: `mailto:${homegroundBusiness.serviceEmail}`,
        },
        {
          label: "登記上の住所",
          value: homegroundBusiness.registeredAddress,
        },
      ],
    },
  ],
};

const terms: JapaneseLegalCopy = {
  ...shared("terms", "利用規約"),
  metadata: {
    title: "利用規約 | Homeground China",
    description:
      "Homeground のウェブサイトの利用、プライベートツアーのお問い合わせ、お引き受けしたサービスに適用される規約です。",
  },
  hero: {
    eyebrow: "サービス規約",
    title: "お支払いの前に、範囲を明確に",
    intro: currentServicesNotice,
    reviewedLabel: "最終確認日",
    reviewedValue,
  },
  callout: {
    label: "基本原則",
    title: "ご相談を送っただけでは、予約は成立しません。",
    body:
      "ご予約が確定するのは、Homeground が旅行内容の確認書を書面でお送りし、お客様がその内容に同意され、ご案内した方法によるお支払いを Homeground が受領した後に限ります。すでにお引き受けしているサービスには、当初の書面による条件が引き続き適用されます。",
  },
  sections: [
    {
      id: "consultation-scope",
      title: "1. 現在のサービスと既存の合意",
      paragraphs: [currentServicesNotice],
    },
    {
      id: "not-included",
      title: "2. 含まれないもの",
      paragraphs: [
        "お問い合わせには、予約、チケットの仮押さえ、旅行中のサポートは含まれません。Homeground が手配するものと、お客様ご自身で手配するものは、書面の旅行合意書で明確にします。",
      ],
    },
    {
      id: "full-trip",
      title: "3. 旅全体の計画とサポート",
      paragraphs: [
        "「旅全体の計画と現地サポート」についてご相談をお送りいただくと、計画づくりのためのやり取りが始まります。Homeground はまず、ルート、旅行される方、重視したいこと、必要なサポートを確認します。",
        "ご相談を先に進める場合は、お支払いの前に、書面のご提案でサービス内容、実際に担当する事業者、契約の当事者、範囲、料金、お支払い先を明示します。",
      ],
    },
    {
      id: "confirmation",
      title: "4. お支払い前の書面での確認",
      bullets: [
        "登記上の運営事業者とサービス内容",
        "確定した範囲と含まれないもの",
        "総額と通貨",
        "お客様にご用意いただく資料",
        "提供日と提供の形式",
        "含まれる訂正・修正",
        "お支払い先とお支払い方法",
        "キャンセル、返金、提供に関する条件",
      ],
      paragraphs: [
        "当サイトでは現在、オンライン決済を提供していません。お問い合わせの WhatsApp やメールで、カード、銀行口座、決済の認証情報を決して送らないでください。",
      ],
    },
    {
      id: "traveller-responsibilities",
      title: "5. お客様の責任",
      paragraphs: [
        "旅行に関する情報は、漏れなく正確にお知らせください。予約済みのものや期限が決まっているものは、はっきりとお示しください。日程、同行者、目的地、制約条件が変わった場合は、速やかにご連絡ください。お送りいただく資料は、お客様が使用する権利を持つものに限ります。",
        "お問い合わせの WhatsApp やメールで、パスポートや身分証明書の画像、銀行口座やカードの情報、決済用の QR コード、一部を伏せていない予約番号を送らないでください。",
      ],
    },
    {
      id: "delivery",
      title: "6. 提供と訂正",
      paragraphs: [
        "お支払いと必要な資料の両方がそろった後、確認書に記載した日付に従って提供します。合意した範囲の中で明らかな誤りや漏れがあれば、速やかにお知らせください。その対応は、「返金・提供条件」とその取引の確認書に基づいて行います。",
      ],
    },
    {
      id: "changing-information",
      title: "7. 変わる可能性のある旅行情報",
      paragraphs: [
        "交通機関、営業時間、空き状況、天候、入国に関する規則、第三者の料金は変わることがあります。ご相談の過程で再確認が必要な項目をお示しすることはありますが、入場、在庫、運賃、天候、第三者によるサービスの履行を保証するものではありません。",
        "本規約のいかなる内容も、法律上排除できない権利を制限するものではありません。",
      ],
    },
    {
      id: "personal-use",
      title: "8. 個人での利用",
      paragraphs: [
        "有料のルート資料は、お客様ご自身の旅行計画のためにのみご利用いただけます。ご自身の同行者や、予約済みの関係事業者と共有することはできますが、転売、再公開、または他のプランナーの成果物として示すことはできません。",
      ],
    },
    {
      id: "privacy-contact",
      title: "9. 個人情報とお問い合わせ先",
      paragraphs: [
        `個人情報は「プライバシーポリシー」に従って取り扱います。取引に関するご質問は、注文番号などお取引を特定できる情報を添えて、${homegroundBusiness.serviceEmail} までお送りください。`,
      ],
    },
  ],
};

const refundDelivery: JapaneseLegalCopy = {
  ...shared("refund-delivery", "返金・提供条件"),
  metadata: {
    title: "返金・提供条件 | Homeground China",
    description:
      "Homeground がお引き受けした書面による旅程コンサルティングについて、提供、キャンセル、訂正、返金の各段階をご案内します。",
  },
  hero: {
    eyebrow: "返金・提供条件",
    title: "提供日と条件は、お支払いの前に確定します",
    intro: currentServicesNotice,
    reviewedLabel: "最終確認日",
    reviewedValue,
  },
  callout: {
    label: "オンライン決済について",
    title: "当サイトには、オンライン決済の機能はありません。",
    body:
      "WhatsApp やメールでのご相談は無料です。お支払い方法のご案内は、範囲、料金、提供と返金の条件を書面で確認した後に限り、別途お送りします。",
  },
  sections: [
    {
      id: "delivery",
      title: "1. 提供までの流れ",
      numbered: [
        "WhatsApp またはメールで、旅のご相談を無料でお送りいただきます。",
        "Homeground が、ご依頼の範囲とお引き受けに適しているかを確認します。",
        "お支払いの前に、書面のサービス確認書をお受け取りいただきます。",
        "作業は、お支払いと必要な資料がすべてそろってから始めます。",
        "成果物は、確認書に記載した形式で、合意したメールアドレスにお送りします。",
      ],
      paragraphs: [
        "すべてのご依頼に共通する納期のお約束はありません。取引ごとの提供日は、お支払いの前に確認します。必要な情報のご提供が遅れた場合や、ご依頼の内容が大きく変わった場合は、提供日または範囲を改めて合意する必要があります。",
        "提供の遅れが見込まれる場合、Homeground はその理由をご説明し、サービス確認書と適用される法律のもとで可能な、変更後の提供日またはその他の対応をご提案します。",
      ],
    },
    {
      id: "cancellation",
      title: "2. キャンセルと返金の各段階",
      cards: [
        {
          title: "お支払い前",
          body: "まだお支払いをいただいていないため、費用の負担なく中止できます。",
        },
        {
          title: "お支払い後、作業開始前",
          body:
            "メールでキャンセルをお申し出いただけます。すでに受領したコンサルティング料金は返金します。",
        },
        {
          title: "個別の作業を始めた後",
          body:
            "返金については、すでに完了した作業と確認書に基づいて判断します。お支払いの前に明示していなかった返金不可の段階や金額を、お支払いの後に新たに設けることはできません。",
        },
        {
          title: "Homeground が提供できない場合",
          body:
            "提供できなかったコンサルティングについて、お支払いいただいた料金を返金します。",
        },
      ],
    },
    {
      id: "corrections",
      title: "3. 訂正と旅行計画の変更",
      cards: [
        {
          title: "合意した範囲が実質的に満たされていない場合",
          body:
            "速やかに Homeground へご連絡ください。範囲内の明らかな誤りや漏れは、まず訂正します。重大な問題を合理的に訂正できない場合は、確認書と適用される法律に基づき、適切な一部または全額の返金を検討します。",
        },
        {
          title: "お客様が旅行内容を変更した場合",
          body:
            "後から日程、目的地、同行者、重視したいことが変わった場合は、範囲、料金、提供日を改めて定める必要が生じることがあります。これは、当初のサービスが履行されなかったことを自動的に意味するものではありません。",
        },
        {
          title: "第三者の情報が変わった場合",
          body:
            "情報に確認した日付が正確に記載されていた場合や、再確認が必要と示されていた場合は、その後の運賃、空き状況、営業や入場のルール、天候、第三者の運営の変化だけで、提供の不履行となることはありません。",
        },
      ],
    },
    {
      id: "request",
      title: "4. 返金・訂正のご依頼方法",
      paragraphs: [
        `できる限り、取引の際にお使いの連絡先から ${homegroundBusiness.serviceEmail} へメールでお送りください。注文番号、ご購入いただいたサービス、問題の概要をご記載ください。`,
        "承認された返金は、可能な限り元のお支払い方法に返金します。処理にかかる期間の目安は、返金を承認した時点でお知らせします。これらの規定は、法律により強制的に適用される権利を制限するものではありません。",
      ],
    },
  ],
};

export const japaneseLegalCopy: Record<HomegroundLegalPageId, JapaneseLegalCopy> = {
  "business-information": businessInformation,
  terms,
  "refund-delivery": refundDelivery,
};

export function getJapaneseLegalCopy(
  pageId: HomegroundLegalPageId,
): JapaneseLegalCopy {
  return japaneseLegalCopy[pageId];
}

// Adaptation notes:
// navigation.homeCta: EN "Start my trip brief" becomes 旅の相談をする, because Japanese readers have no website form.
// related.contact: EN "Email Homeground" is written as メールで問い合わせる (the link is a mailto link).
// Business callout body: "Start with one trip brief" becomes sending your trip wishes by WhatsApp or email.
// Business "How a trip enquiry moves forward" step 1: "You submit a trip brief at no charge" becomes sending your trip wishes by WhatsApp or email at no charge.
// Business "Payment records and contact": "through the website enquiry form" becomes お問い合わせの WhatsApp やメールで (inquiry messages by WhatsApp or email).
// Business registry facts: registry names stay in Chinese (国家企业信用信息公示系统, 全国旅游监管服务平台, from the Chinese copy); each detail adds a Japanese gloss, and the licence lookup gloss combines the EN value (China Ministry of Culture and Tourism) with the Chinese platform name.
// Business "Licensed services": the value is written in Japanese (中国国内旅行と訪中旅行（インバウンド）), matching the EN wording rather than the Chinese scope string.
// Terms callout title: "Submitting a trip brief is not an order" becomes ご相談をお送りいただいただけでは、予約は成立しません.
// Terms section 3: "A Full Trip Planning & Ground Support submission" becomes sending a consultation about 旅全体の計画と現地サポート.
// Terms section 4: "Never submit payment credentials through the enquiry form" becomes a warning not to send them in inquiry messages by WhatsApp or email; "payment credentials" is spelled out as card, bank account and payment credential information, following the Chinese copy.
// Terms section 5: "Do not submit ... through the website form" becomes a warning not to send those items in inquiry messages by WhatsApp or email.
// Refund callout body: "A trip brief is free to submit" becomes consulting by WhatsApp or email is free.
// Terms section 9: "enquiry or order reference" becomes 注文番号などお取引を特定できる情報, because WhatsApp and email enquiries have no enquiry number.
// Refund section 1 step 1: "Submit a trip brief at no charge" becomes sending your trip consultation by WhatsApp or email at no charge.
