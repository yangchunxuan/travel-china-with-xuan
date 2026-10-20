import type { GuidesHubCopy } from '../app/(default)/guides/guidesHubI18n';
import type { GuidesHubEdition } from '../components/GuidesHubPage';

/**
 * /ja/guides/: the English guides hub (/guides/) in Japanese, rendered by
 * GuidesHubPage as the French, German and Arabic hubs are. Facts, numbers and
 * dates are the English page's; names are the Japanese edition's own
 * (張家界国家森林公園, 慕田峪長城, 氷雪大世界, 北坡). A link to a page that
 * stays English says （英語）.
 */
export const japaneseGuidesHubCopy: GuidesHubCopy = {
  path: '/ja/guides/',
  metadata: {
    title: '中国旅行の実用ガイド | Homeground China',
    description: '入国、支払い、スマートフォンのアプリ、移動、ホテル、旅行の時期、無理のないルートづくりまで。中国旅行に役立つ実用的なヒントをまとめています。',
    openGraphTitle: '中国旅行の実用ガイド',
  },
  eyebrow: '旅の疑問に、実用的な答えを',
  title: '中国旅行の実用ガイド',
  introduction: 'まずは目の前の準備から始めましょう。入国、支払い、スマートフォンの設定、移動、ホテル、旅行の時期、旅程のペース。どの項目からも、詳しい答えのあるガイドへ進めます。',
  languageLabel: 'ガイドの言語',
  destinationAction: '目的地から選ぶ',
  catalogEyebrow: 'ガイド一覧から探す',
  catalogTitle: '1日全体を見渡して計画する。',
  catalogIntroduction: 'どのガイドも、計画のための判断から始まります。何が無理なく収まるか、移動にいくらかかるか、どの点が旅の残りを左右するか。',
  guideCount: (count) => `ガイド${count}本`,
  // Only page 1 is in Japanese; the later pages are the English hub's. The
  // numbered pages stay as short as the English ones (hreflang="en"), and the
  // status line says once that they are English.
  pagination: {
    label: 'ガイド一覧のページ',
    status: (page, pageCount, guideCount) => `${page} / ${pageCount}ページ · ガイド${guideCount}本 · 2ページ目以降は英語`,
    previous: '前へ',
    next: '次へ（英語）',
    page: (page) => `${page}ページ`,
    pageTitle: (page) => `${page}ページ`,
  },
  libraryNav: { label: 'ガイドのコレクションを見る', planning: 'ルートと旅の計画', entry: '入国とビザ免除のルール' },
  countryGuide: {
    eyebrow: '時間を節約する6つのヒント',
    title: 'いま決めたいことから始めましょう。',
    introduction: '次に決めることに合ったヒントを選んでください。行き先を選んでいる段階なら、目的地を比べましょう。',
    decisions: {
      plan: { title: '都市を増やす前に、使える日数を数える。', body: '到着、出発、長距離移動の時間を先に確保し、休む余裕のある都市の順番を選びましょう。' },
      'when-to-go': { title: '予約の前に、旅行の日程を確認する。', body: '祝日、天候、季節の景色、混雑は、実際の選択を左右するときにだけ考えれば十分です。' },
      transport: { title: 'どの移動も、ドアからドアまでで比べる。', body: '列車や飛行機の時間だけでなく、空港や駅までの移動、保安検査、待ち時間、最後の移動まで含めましょう。' },
      stay: { title: 'ホテルより先に、エリアを選ぶ。', body: '観光の日の移動時間が短くなる拠点を選び、そのうえで部屋と外国パスポートでの宿泊条件を確認しましょう。' },
      essentials: { title: '入国、支払い、モバイル通信を確かめる。', body: '到着前に、入国の方法、予備の支払い手段、インターネット接続、欠かせない予約を確認しましょう。' },
      culture: { title: '都市ごとに、土地のテーマをひとつ。', body: '食、歴史、いまに続く伝統のどれかひとつを、実際に訪れられる場所でたどりましょう。' },
    },
  },
  entrySection: {
    eyebrow: '入国のルール',
    title: 'ルートを組む前に、入国の方法を確認しましょう。',
    introduction: 'パスポート、渡航目的、フライトのルート別に、公式情報源に基づいて解説します。Homeground はビザ申請の代行や、個人の入国資格の判断は行いません。',
    action: '中国入国ガイドを開く',
  },
  updatedLabel: '更新日',
  readLabel: 'ガイドを読む（英語）',
  formatLabels: {
    itinerary: '旅程',
    'route-analysis': 'ルート分析',
    transport: '移動',
    'decision-guide': '選び方ガイド',
    'field-note': '現地メモ',
    'planning-guide': '計画ガイド',
  },
  topicLabels: {
    'itinerary-design': '旅程づくり',
    pace: 'ペース',
    transport: '移動',
    attractions: '見どころ',
    evenings: '夜の過ごし方',
    'trip-planning': '旅の計画',
    'on-the-ground': '現地で',
    accommodation: '宿泊',
  },
  destinationLabels: { china: '中国', beijing: '北京', xian: '西安', zhangjiajie: '張家界', shanghai: '上海' },
  cta: {
    eyebrow: '記事の先の計画も',
    title: '検討中の旅を、そのままご相談ください。',
    body: 'WhatsApp でご連絡いただくか、メールアドレスをお知らせください。Homeground のプランナーが日程、優先したいこと、いまのルート案についてご相談をうかがい、有料の作業を始める前に内容と料金を確認します。',
    action: '中国旅行のプランナーに相談する',
  },
};

/** The section pages (/plan/ and the others) stay English, so their links say so. */
export const japaneseGuideSectionLabels: Readonly<Record<string, string>> = {
  explore: '目的地（英語）', plan: '初めての中国旅行プランナー（英語）',
  transport: '中国での移動（英語）', 'when-to-go': '旅行の時期（英語）',
  stay: '泊まる場所（英語）', essentials: '中国旅行の基本（英語）',
  culture: '食と文化（英語）', tools: 'ツール（英語）', services: '旅のサービス（英語）',
};

/** A card's section, as the English short label (Places, First trip, Transport). */
export const japaneseGuideCardSectionLabels: Readonly<Record<string, string>> = {
  explore: '見どころ', plan: '初めての旅', transport: '移動', 'when-to-go': '時期',
  stay: '宿泊', essentials: '基本情報', culture: '文化', tools: 'ツール', services: 'サービス',
};

/** The search band searches the English guides. */
export const japaneseGuidesSearchTitle = '知りたいことを、英語で検索。';

/** Tags for the cards whose words come from a Japanese guide (the Tianmen guide). */
export const japaneseGuideCardTags: Readonly<Record<string, readonly string[]>> = {
  'tianmen-mountain-tickets-and-routes': ['チケット料金', 'A・B・Cルート', '入口'],
};

/** The English guides on the hub's first page; each opens the English guide. */
export const japaneseGuideCardCopy: GuidesHubEdition['guideCopy'] = {
  'zhangjiajie-itinerary': {
    headline: '張家界は2日・3日・4日でどこまで回れるか',
    description: '2日・3日・4日の現実的な張家界の旅程。公園を回る順番、丸1日を充てる日と泊数の決め方、省いてよい場所、鳳凰を組み込めるタイミングまで具体的に示します。',
    cardImageAlt: '張家界国家森林公園で、霧の中にそびえる砂岩の柱。', cardTags: ['張家界', '旅程づくり', 'ペース'],
  },
  'zhangjiajie-national-forest-park-tickets-and-entrances': {
    headline: '張家界国家森林公園：正しいチケットを買い、入口を選び、交通をつなぐ',
    description: '入場料はRMB 165、園内シャトルバス込みでRMB 236、4日間有効（2026年8月確認）。最初に入るゲート、パスポートでの予約、ロープウェイとエレベーターを解説します。',
    cardImageAlt: '2016年8月に撮影した、張家界国家森林公園の石英砂岩の柱。', cardTags: ['張家界', '公園のチケット', '入口'],
  },
  'china-family-private-tours': {
    headline: '家族で中国へ：子ども連れのためのプライベートツアー',
    description: '8〜14日間の5つのルートで巡る、家族向けのプライベートツアー。大人6名なら大人1名USD 1,190から。専属のガイドと車で、ご家族のペースで旅できます。お子さまの料金は年齢に応じてお見積もりします。',
    cardImageAlt: '成都のパンダ基地で、木の台に座る若いジャイアントパンダ', cardTags: ['家族向けルート', '公開料金', '専属ガイド'],
  },
  'guilin-airport-or-railway-station-arrival-guide': {
    headline: '桂林に着くなら：空港か、どの鉄道駅か',
    description: '桂林の中心部に泊まるなら、まず桂林駅に着く使いやすい列車を比べましょう。陽朔に泊まる場合は、空港や駅を選ぶ前にホテルまでの移動全体を確認しましょう。',
    cardImageAlt: '入口の上に中国語と英語の駅名が掲げられた桂林駅の正面。', cardTags: ['桂林', '空港', '鉄道駅'],
  },
  'china-private-tour-prices': {
    headline: '中国のプライベートツアーはいくらかかるか',
    description: '4〜21日間の中国プライベートツアー44本の、1名あたりの公開料金。6名参加でUSD 250から、2名参加でUSD 5,920まで。1日あたりの費用も比べられます。',
    cardImageAlt: '大理石の基壇の上に建つ故宮の殿舎', cardTags: ['公開料金', '人数別', '1名あたり・現地手配'],
  },
  'yangshuo-china': {
    headline: '陽朔：西街、遇龍河、興坪と、何泊するか',
    description: '陽朔は桂林の南、漓江沿いのカルストの山々に囲まれた小さな町です。無料で楽しめること、いかだと夜のショーの料金、何日滞在するかをまとめます。',
    cardImageAlt: '陽朔の田園で、カルストの山々の下、静かな水面に映る古い石のアーチ橋', cardTags: ['広西', '陽朔', '漓江'],
  },
  'mutianyu-great-wall-tickets': {
    headline: '慕田峪長城のチケット：料金、ロープウェイ、パスポートでの予約',
    description: '2026年10月11日に確認した公式ショップの慕田峪長城のチケット：入場料RMB 40、シャトルバス15、ロープウェイ100または140。パスポートでの予約、払い戻し、営業時間も解説します。',
    cardImageAlt: '秋、望楼を過ぎて木々に覆われた尾根に続く慕田峪長城', cardTags: ['チケット料金', 'ロープウェイ', 'パスポートでの予約'],
  },
  'zhangjiajie-glass-bridge-tickets': {
    headline: '張家界ガラス橋のチケット：料金、ルート、パスポートでの予約',
    description: '張家界大峡谷のガラス橋のチケットは、公式ショップでRMB 175（2026年10月11日確認）。AルートとBルート、営業時間、パスポートでの予約、払い戻し、追加オプションを解説します。',
    cardImageAlt: '張家界大峡谷の上に架かる白い吊り橋、ガラス橋を渡る人々', cardTags: ['チケット料金', 'A・Bルート', 'パスポートでの予約'],
  },
  'singapore-to-zhangjiajie-itinerary': {
    headline: 'シンガポールから張家界へ：5日・6日・7日',
    description: 'シンガポールから長沙またはDYG経由で張家界へ。5日・6日・7日のルート、森林公園に丸1日を充てる日、ホテルの泊数、帰りのフライトを比べます。',
    cardImageAlt: '2016年8月に撮影した、張家界国家森林公園の砂岩の柱と緑の谷', cardTags: ['シンガポール発', '5日・6日・7日', '飛行機と鉄道'],
  },
  'do-you-need-a-tour-guide-in-china': {
    headline: '中国でガイドは必要？それとも別のサポートが合う？',
    description: 'たいていの日は必要ありません。故宮や兵馬俑のような場所ではガイドが役立ち、ほかの日はドライバーや計画のサポートで解決できます。選び方をまとめます。',
    cardImageAlt: '洛陽の龍門石窟で、岩に彫られた歴史ある仏像。', cardTags: ['中国', '旅の計画', '現地で'],
  },
  'avatar-mountains-zhangjiajie': {
    headline: '張家界のアバターの山々：どこで見るか、費用、何日必要か',
    description: 'アバターの山々とは、張家界の砂岩の柱のことです。ハレルヤ山の場所、チケットの料金、公園が示す1日ルート、計画すべき日数を確認できます。',
    cardImageAlt: '張家界国家森林公園で、頂に松林をいただく切り立った砂岩の柱の間を漂う霧', cardTags: ['張家界', 'アバターの山々', '袁家界'],
  },
  'changbai-mountain-heaven-lake': {
    headline: '長白山：天池、北坡か西坡か、チケット料金、冬の訪問',
    description: '吉林省の長白山は、火口に天池をたたえる休火山です。北坡と西坡のどちらにするか、チケットとバスの料金、予約のルール、冬の訪問について解説します。',
    cardImageAlt: '晴れた空の下で深い青をたたえる長白山の火口の天池と、雪の残る対岸の峰々', cardTags: ['吉林', '長白山', '天池'],
  },
  'dali-old-town-erhai-lake': {
    headline: '大理：古城、洱海、三塔と、3日間の配分',
    description: '雲南省の大理は、蒼山と洱海の間にある古い町です。無料で楽しめること、三塔とロープウェイの料金、何日滞在するかをまとめます。',
    cardImageAlt: '雪をいただく蒼山を背にした、大理・崇聖寺の三塔', cardTags: ['雲南', '大理', '洱海'],
  },
  'dazu-rock-carvings': {
    headline: '大足石刻：宝頂山か北山か、チケットと開館時間、重慶からの日帰り',
    description: '重慶近郊の大足石刻は、9〜13世紀の磨崖彫刻が残るユネスコ世界遺産です。5つの見学地のどれを見るか、チケット、開館時間、日帰りの方法を解説します。',
    cardImageAlt: '大足・宝頂山で、張り出した岩の下に座像と立像が何段にも並ぶ彩色の磨崖彫刻', cardTags: ['重慶', '大足', '世界遺産'],
  },
  'dunhuang-china': {
    headline: '敦煌：莫高窟、月牙泉、砂漠の西線と、何日滞在するか',
    description: '敦煌は、莫高窟と月牙泉のあるシルクロードのオアシスです。最初に予約すべきもの、チケット料金と開館時間、砂漠をめぐる西線、滞在日数をまとめます。',
    cardImageAlt: '敦煌・鳴沙山の砂丘の上から見た月牙泉とその楼閣。下の砂の上に観光客が小さく見える', cardTags: ['甘粛', '敦煌', 'シルクロード'],
  },
  'fenghuang-ancient-town': {
    headline: '鳳凰古城：無料で見られるもの、チケットが必要なもの、張家界からの行き方',
    description: '鳳凰古城の通りは無料ですが、古城内の見どころと沱江の舟は有料です。料金、営業時間、高速鉄道駅からのリニア、滞在の長さを解説します。',
    cardImageAlt: '朝の光の中、鳳凰古城の沱江に映る木造の吊脚楼と万名塔', cardTags: ['湖南', '鳳凰', 'チケット'],
  },
  'furong-ancient-town': {
    headline: '芙蓉鎮：滝の上の町、いつ行くか、張家界からの行き方',
    description: '湖南省西部の芙蓉鎮は、高さ60mの滝の上にある町です。チケット、08:00〜深夜0時の営業時間、夜の明かりまで残りたい理由、行き方を解説します。',
    cardImageAlt: '曇りの日の芙蓉鎮。滝と川の上に建つ木造の吊脚楼', cardTags: ['湖南', '芙蓉鎮', '夜の訪問'],
  },
  'halal-food-muslim-travel-china': {
    headline: '中国はムスリムにやさしい？都市別のハラール料理、店の確かめ方、モスク、ツアー',
    description: '西安、北京の牛街、中国北西部では見つけやすく、景勝地では少なめです。ハラール表示の読み方、4つのハラール基準、機内食、ツアーの計画を解説します。',
    cardImageAlt: '西安の回民街。高い木々の下、牛肉麺、肉夾饃、羊肉スープの看板が並ぶ濡れた石畳の通り', cardTags: ['ハラール', 'ムスリムの旅', '食'],
  },
  'hanging-temple-datong': {
    headline: '大同近郊の懸空寺：2026年に高所エリアのチケットを取る方法と、なしで見られるもの',
    description: '懸空寺の高所エリアに入るチケットは、2026年4月から1日2,475枚のみの販売です。2種類のチケットの仕組み、外国人旅行者が知っておきたいこと、旅程への組み込み方を解説します。',
    cardImageAlt: '切り立った崖に建つ懸空寺の瑠璃瓦の屋根と木造のバルコニー。回廊には参観者の姿', cardTags: ['大同', '懸空寺', 'チケット'],
  },
  'harbin-ice-festival': {
    headline: 'ハルビン氷祭り2026–27：開幕時期、料金、訪れ方',
    description: '氷雪大世界は過去3シーズンとも12月17〜21日に開幕し、昨冬の大人料金はRMB 328でした。日程、料金、天候、移動を解説します。',
    cardImageAlt: '2025–26年シーズンに上から見たハルビン氷雪大世界の長い氷の滑り台と、その奥の凍った松花江', cardTags: ['ハルビン', '氷雪大世界', '12月〜2月'],
  },
  'huangshan-yellow-mountain': {
    headline: '黄山：2026年のチケット、ロープウェイ、宏村と、何日必要か',
    description: '安徽省の黄山は、花崗岩の峰々が連なる世界遺産です。2026年のチケットとロープウェイの料金、入山ゲート、宏村、滞在の長さを解説します。',
    cardImageAlt: '低い日差しの中、雲海の上にそびえ、岩棚に松が生える黄山の花崗岩の峰', cardTags: ['安徽', '黄山', '宏村'],
  },
  'jingdezhen-china': {
    headline: '景徳鎮：2026年の世界遺産登録の対象、見どころ、滞在の長さ',
    description: '江西省の景徳鎮は千年にわたって磁器を作り続け、2026年7月に世界遺産に登録されました。見どころ、料金、開館時間、滞在日数を解説します。',
    cardImageAlt: '景徳鎮で木造の上屋の下にある古いれんが造りの薪窯と、そばに積まれた薪と粘土の匣鉢', cardTags: ['江西', '景徳鎮', '世界遺産'],
  },
  'jiuzhaigou-valley': {
    headline: '九寨溝：予約の方法、費用、ベストシーズン、3つの谷をめぐるルート',
    description: '繁忙期の九寨溝はRMB 190、バスはさらにRMB 90で、1日の受け入れは41,000人までです。パスポートでの予約、開園時間、ベストシーズン、1日のルートを解説します。',
    cardImageAlt: '秋の森に囲まれた九寨溝・五花海のターコイズ色の水と、水中に沈む木の幹', cardTags: ['九寨溝', 'チケット', '四川'],
  },
};
