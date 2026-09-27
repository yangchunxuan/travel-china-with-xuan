import type { getEditorialAuthor } from "./editorialIdentity";
import { japaneseStudioCopy } from "./japaneseStudioCopy";

/**
 * Japanese copy for Evan's author page (/ja/studio/evan/), in the same shape
 * as one locale entry of editorialIdentity.ts. The English entry is the
 * source of truth; see the adaptation notes at the end of this file.
 */

type EditorialAuthor = ReturnType<typeof getEditorialAuthor>;

/** Turns the `as const` string literals of the source entries into plain strings. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly Widen<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: Widen<T[Key]> }
      : T;

/** One locale entry of profileCopy in editorialIdentity.ts. */
export type EditorialAuthorProfileCopy = Widen<EditorialAuthor["copy"]>;

/** The value getEditorialAuthor(locale) returns, with a Japanese profile. */
export type JapaneseEditorialAuthor = Omit<EditorialAuthor, "copy"> & {
  copy: EditorialAuthorProfileCopy;
};

export const JAPANESE_AUTHOR_PATH = "/ja/studio/evan/";

export const japaneseAuthorProfileCopy: EditorialAuthorProfileCopy = {
  title: "Evan（中国旅行ライター・旅行プランナー） | Homeground China",
  h1: "Evan",
  eyebrow: "記事の作成・事実確認・旅行の計画",
  introduction:
    "EvanはHomegroundの中国旅行ガイドを書き、内容を確認しています。重視しているのは、海外からの旅行者が出発前や旅行中に迫られる判断です。",
  methodTitle: "EvanはHomegroundのガイドをこう確認します",
  method: [
    "ありきたりの目的地紹介ではなく、旅行者が本当に解決したい疑問から始めます。",
    "変わりにくい背景情報と、改めて確認すべき予約のルール、運行時刻、入場の条件とを分けて書きます。",
    "答えを旅全体につなげます。だれが旅をするのか、どこから出発するのか、次に何が続くのか、そして最初の計画がうまくいかなかったらどうするのか。",
  ],
  focusTitle: "主なテーマ",
  focus: [
    "複数都市をめぐるルートの設計",
    "交通手段と到着時の判断",
    "初めての中国旅行で生まれる異文化の疑問",
    "英語・韓国語でのコミュニケーション",
  ],
  articlesTitle: "最近確認したガイド記事",
  studioLink: "Homegroundのチーム紹介へ",
};

// Name, role, bio, tags and photo come from the Evan entry of the Japanese
// studio copy, exactly as getEditorialAuthor takes them from the studio copy.
const evan = japaneseStudioCopy.members.find((member) => member.id === "evan");
if (!evan) throw new Error("Missing evan in the Japanese studio copy.");

export const japaneseEditorialAuthor: JapaneseEditorialAuthor = {
  id: "evan",
  name: evan.name,
  role: evan.role,
  bio: evan.bio,
  tags: evan.tags,
  image: evan.image,
  path: JAPANESE_AUTHOR_PATH,
  copy: japaneseAuthorProfileCopy,
};

/**
 * Strings and routes EditorialAuthorPage.tsx does not read from the author
 * entry: text hard-coded in the component, text it takes from other locale
 * maps, and the page-level values it derives from the locale.
 */
export const japaneseAuthorComponentStrings = {
  /** Page-level values (component: home.htmlLang, home.path). */
  htmlLang: "ja", // EN: "en"
  homePath: "/ja/", // EN: "/"
  /** Component: `${home.path}studio/`. */
  studioHref: "/ja/studio/", // EN: "/studio/"

  /** Skip link (homegroundI18n skipLink). */
  skipLink: "本文へ移動", // EN: "Skip to main content"

  /** Eyebrow above the method heading, hard-coded in every language. */
  methodEyebrow: "Homegroundの記事づくり", // EN: "Homeground editorial"
} as const;

// Adaptation notes:
// - title: "China travel writer" is 中国旅行ライター; the separators follow the
//   ZH title (｜) and the brand stays "Homeground" as in the source.
// - eyebrow "Writer · fact reviewer · trip planner" is written as three
//   activities, "記事の作成・事実確認・旅行の計画" (ZH 作者 · 事实核验 · 行程规划,
//   KO 작성 · 사실 검토 · 여행 설계 do the same).
// - "reviews" / "reviewed" is 確認 (checks), not 監修, which would claim a
//   formal supervisory role the source does not state.
// - introduction is split into two sentences: what Evan does, then what he
//   focuses on.
// - method[1] "access details" is 入場の条件 (admission), following ZH 开放信息
//   and KO 입장 정보.
// - method[2]: the list after the colon becomes its own sentence of questions.
// - focusTitle "Editorial focus" is 主なテーマ; "Cross-cultural first-trip
//   questions" names the trip: "初めての中国旅行で生まれる異文化の疑問"
//   (ZH 第一次来中国的跨文化问题, KO 첫 중국 여행의 문화 간 질문).
// - focus keeps "English and Korean" only; Japanese is not added, because this
//   describes Evan's own languages.
// - studioLink "Meet the full Homeground studio" is "Homegroundのチーム紹介へ",
//   so it does not suggest the page lists all 16 team members.
// - methodEyebrow "Homeground editorial" is "Homegroundの記事づくり" (how
//   Homeground makes its articles), because it heads the section on how guides
//   are checked.
// - "writes" is 書き / 記事の作成 (plain words for writing), and the wording avoids kanji
//   that the current font subset lacks (see the report).
// - role, bio, tags and photo alt: see the notes in japaneseStudioCopy.ts.
