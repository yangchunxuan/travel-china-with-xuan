import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { japaneseCorporateTrips as corporateTrips, japaneseCorporateHubFaqs as corporateHubFaqs, japaneseCorporateHubPath as corporateHubPath, japaneseCorporateTripPath as corporateTripPath, japaneseCorporateGuideNote } from "../lib/japaneseCorporateTravel";
import { type CorporateFaq, type CorporateImage, type CorporateTrip } from "../lib/corporateTravelTypes";
import { CorporateTravelEnquiry } from "./CorporateTravelEnquiry";
import { JapaneseSiteHeader, JapaneseSiteFooter } from "./JapaneseTourChrome";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./CorporateTravelPages.module.css";

const purposes = [
  { id: "company-trips", number: "01", title: "社員旅行・チームビルディング", body: "いつもの職場を離れ、同僚と食卓を囲み、その土地に出会う。会話の生まれる余白を持った旅をつくります。", note: "社員旅行、チームの交流、リフレッシュの機会に。" },
  { id: "incentive-travel", number: "02", title: "インセンティブ旅行", body: "チームの成果を、思い出に残る旅でねぎらう。感謝を伝えたい方々に合わせて、宿と体験を丁寧に選びます。", note: "社員の表彰、営業の報奨、販売店への感謝の旅に。" },
  { id: "meetings-retreats", number: "03", title: "少人数の会議・チーム合宿", body: "落ち着いて話し合い、そのあと一緒に街へ。自社で進める会議と、中国を旅する時間を組み合わせます。", note: "経営チームの合宿、部門の計画会議、社内リトリートに。" },
];

function PageFrame({ children, mainId, path }: { children: ReactNode; mainId: string; path: string }) {
  return <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale="ja" lang="ja">
    <a className={localeStyles.skipLink} href={`#${mainId}`}>本文へ進む</a>
    <JapaneseSiteHeader currentPath={path} contactHref="#corporate-enquiry" contactMode="anchor" languagePaths={[{ label: "EN", lang: "en", path: path.replace(/^\/ja/, "") }, { label: "日本語", lang: "ja", path }]} />
    <main id={mainId} tabIndex={-1}>{children}</main>
    <JapaneseSiteFooter currentPath={path} />
  </div>;
}

function 現在地({ current }: { current?: string }) {
  return <nav className={styles.breadcrumb} aria-label="現在地"><ol>
    <li><Link href="/ja/">ホーム</Link></li>
    <li><span aria-hidden="true">/</span>{current ? <Link href={corporateHubPath}>企業向け旅行</Link> : <span aria-current="page">企業向け旅行</span>}</li>
    {current && <li aria-current="page"><span aria-hidden="true">/</span>{current}</li>}
  </ol></nav>;
}

function Photo({ photo, priority = false, className = "", sizes = "(max-width: 48rem) calc(100vw - 2rem), (max-width: 82rem) calc(100vw - 3rem), 77rem" }: { photo: CorporateImage; priority?: boolean; className?: string; sizes?: string }) {
  return <figure className={`${styles.photo} ${className}`}>
    <div className={styles.photoInner}><Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} /></div>
    <figcaption>{photo.caption}</figcaption>
  </figure>;
}

function Faqs({ faqs, title = "チームで出発する前に。" }: { faqs: CorporateFaq[]; title?: string }) {
  return <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="corporate-faq-title">
    <div className={styles.sectionHeading}><p className={styles.eyebrow}>よくあるご質問</p><h2 id="corporate-faq-title">{title}</h2></div>
    <dl className={styles.faqList}>{faqs.map((faq) => <div key={faq.question}><dt>{faq.question}</dt><dd>{faq.answer}</dd></div>)}</dl>
  </section>;
}

const photoCredits = [
  { file: "wulingyuan-peaks-1600.webp", subject: "武陵源の砂岩の峰々", author: "颐园居", source: "https://commons.wikimedia.org/wiki/File:Wulingyuan,_Zhangjiajie,_Hunan_20230702.jpg", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "tianzi-mountain-panorama-1600.webp", subject: "天子山のパノラマ", author: "Chensiyuan", source: "https://commons.wikimedia.org/wiki/File:1_tianzishan_wulingyuan_zhangjiajie_2012.jpg", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "golden-whip-stream-1600.webp", subject: "金鞭渓", author: "Levaby", source: "https://commons.wikimedia.org/wiki/File:%E5%BC%A0%E5%AE%B6%E7%95%8C%E9%87%91%E9%9E%AD%E6%BA%AA.jpg", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "zhangjiajie-hehua-airport-1600.webp", subject: "張家界荷花空港", author: "Martin Lewison", source: "https://commons.wikimedia.org/wiki/File:Zhangjiajie_Airport_(27796134377).jpg", licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { file: "suzhou-humble-garden-1600.webp", subject: "拙政園", author: "Chainwit.", source: "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg", licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0/" },
];

function PhotoCredits({ photos }: { photos: CorporateImage[] }) {
  const credits = photoCredits.filter((credit) => photos.some((photo) => photo.src.endsWith(credit.file)));
  if (!credits.length) return null;
  return <details className={styles.photoCredits}><summary>写真のクレジット</summary><p>写真は行程中の訪問先を紹介するものです。表示に合わせてサイズ変更やトリミングを行っています。</p><ul>{credits.map((credit) => <li key={credit.file}><a href={credit.source}>{credit.subject}</a> — {credit.author} / <a href={credit.licenceUrl} rel="license">{credit.licence}</a></li>)}</ul></details>;
}

function EnquirySection({ trip }: { trip?: CorporateTrip }) {
  return <CorporateTravelEnquiry initialTrip={trip?.slug} language="ja" />;
}

export function JapaneseCorporateTravelHubPage() {
  const hero = corporateTrips[0].hero;
  return <PageFrame mainId="corporate-main" path={corporateHubPath}>
    <header className={`${styles.container} ${styles.hero}`}>
      <現在地 />
      <div className={styles.heroHeading}><div><p className={styles.eyebrow}>チームで旅する中国</p><h1>中国の社員旅行・チーム合宿</h1></div><div className={styles.heroAside}><p className={styles.heroPromise}>チームが集まる、その時間を。<br />旅の手配は、私たちが。</p><p>社員旅行、インセンティブ旅行、少人数の会議。参加される方、目的、ご予算に合わせて企画します。</p><a className={styles.primaryLink} href="#corporate-enquiry">チームのご希望を相談する<span aria-hidden="true">↗</span></a></div></div>
      <Photo photo={hero} priority className={styles.hubHeroPhoto} />
      <div className={styles.heroFootnote}><span>企業ごとの貸切プログラム</span><span>世界各地の企業に対応</span><span>日程・ご予算に合わせて提案</span></div>
    </header>

    <div className={styles.container}>
      <section className={styles.section} aria-labelledby="corporate-purpose-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>三つの旅のかたち</p><h2 id="corporate-purpose-title">旅の目的から、<br />一緒に考えましょう。</h2></div><p>目的を大切にしながら、参加する人が楽しめる余白も残す。三つの切り口から、チームに合う旅を考えます。</p></div>
        <div className={styles.purposeGrid}>{purposes.map((purpose) => <article className={styles.purpose} id={purpose.id} key={purpose.id}><span className={styles.index}>{purpose.number}</span><h3>{purpose.title}</h3><p>{purpose.body}</p><p className={styles.smallNote}>{purpose.note}</p></article>)}</div>
      </section>

      <section className={styles.section} aria-labelledby="corporate-samples-title" id="sample-programmes">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>二つのモデルプラン</p><h2 id="corporate-samples-title">景色を変えて、<br />同じ体験を分かち合う。</h2></div><p>雰囲気の異なる二つの3泊4日プランをご用意しました。相談の出発点としてご覧ください。詳しい内容はチームに合わせて調整します。</p></div>
        <div className={styles.tripGrid}>{corporateTrips.map((trip, index) => <article className={styles.tripCard} key={trip.slug}>
          <Link className={styles.tripImageLink} href={corporateTripPath(trip.slug)} aria-label={`${trip.title}のモデルプランを見る`}><Photo photo={trip.hero} sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 82rem) calc((100vw - 5rem) / 2), 37.5rem" /></Link>
          <p className={styles.cardEyebrow}>{String(index + 1).padStart(2, "0")} / {trip.duration}</p><h3><Link href={corporateTripPath(trip.slug)}>{trip.title}</Link></h3><p>{trip.description}</p><Link className={styles.textLink} href={corporateTripPath(trip.slug)}>モデルプランを見る<span aria-hidden="true">→</span></Link>
        </article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.organizerSection}`} aria-labelledby="corporate-handles-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>幹事の方へ</p><h2 id="corporate-handles-title">一つの旅を、<br />細部までつなぐ。</h2><p>現地の手配を一つの計画にまとめ、出発前に担当範囲を明確にします。</p></div>
        <ol className={styles.handlesList}>
          <li><span>01</span><div><h3>無理のないルートとペース</h3><p>移動、共同の体験、会議、自由時間をバランスよく。天候が変わった場合の現実的な代替案も考えます。</p></div></li>
          <li><span>02</span><div><h3>宿泊・送迎・食事</h3><p>部屋割り、別々の便での到着、荷物、食事制限を伺い、日程に合う手配先を確認します。</p></div></li>
          <li><span>03</span><div><h3>貴社のプログラムを組み込む</h3><p>会議室、チームの会食、表彰の夕べなどもご相談ください。会場、機材、飲食の条件を確認し、個別にお見積もりします。</p></div></li>
          <li><span>04</span><div><h3>現地での連絡と調整</h3><p>ガイド、交通、現地サポートの内容と、旅行中に幹事の方が連絡する窓口を明確にします。</p></div></li>
        </ol>
      </section>

      <section className={`${styles.section} ${styles.quoteSection}`} aria-labelledby="corporate-quote-title">
        <div><p className={styles.eyebrow}>社内で検討しやすい提案書を</p><h2 id="corporate-quote-title">参加する人。<br />旅する日程。<br />明確なお見積もり。</h2></div>
        <div><p className={styles.largeBody}>1名1室か、ツインの2名1室か。落ち着いた会食か、表彰の夕べか。一つひとつの選択が、体験にも予算にも関わります。</p><p>人数、部屋割り、ホテル、交通、食事、体験、会議の要件を伺い、実際のプログラムに沿って見積もります。予約前に、サービスの範囲、総額、追加オプション、支払い・取消条件を書面でお伝えします。</p><p className={styles.smallNote}>{japaneseCorporateGuideNote}</p><p className={styles.smallNote}>モデルプランは定額のパッケージではありません。空き状況はご旅行日に合わせて確認し、提案のみで客室や会場が確保されることはありません。</p><a className={styles.textLink} href="#corporate-enquiry">ご希望を伝える<span aria-hidden="true">→</span></a></div>
      </section>

      <section className={styles.section} aria-labelledby="corporate-process-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>ご相談から出発まで</p><h2 id="corporate-process-title">四つのステップで。</h2></div><p>幹事の方には見通しを。参加する皆さまには、そのチームらしい旅を。</p></div>
        <ol className={styles.steps}><li><span>01</span><h3>目的をお聞かせください</h3><p>人数、日程、ご予算、旅で実現したいことを伺います。</p></li><li><span>02</span><h3>プランを一緒に検討</h3><p>ルートと手配内容、ご希望のオプションを確認します。</p></li><li><span>03</span><h3>手配と条件を確認</h3><p>お支払い前に空き状況、書面の見積もり、予約条件を確認します。</p></li><li><span>04</span><h3>出発に向けて準備</h3><p>部屋割り、到着便、参加者向けのご案内を整えます。</p></li></ol>
      </section>

      <aside className={styles.credentials} aria-label="Homegroundについて"><p>旅を企画するチームと事業者について、ご紹介します。</p><div><Link href="/ja/studio/">旅のつくり方<span aria-hidden="true">↗</span></Link><Link href="/ja/business-information/">事業者情報・許認可<span aria-hidden="true">↗</span></Link></div></aside>
      <Faqs faqs={corporateHubFaqs} />
      <PhotoCredits photos={corporateTrips.map((trip) => trip.hero)} />
      <EnquirySection />
    </div>
  </PageFrame>;
}

export function JapaneseCorporateTripPage({ trip }: { trip: CorporateTrip }) {
  return <PageFrame mainId="corporate-trip-main" path={corporateTripPath(trip.slug)}>
    <header className={`${styles.container} ${styles.hero} ${styles.detailHero}`}>
      <現在地 current={trip.title} />
      <p className={styles.eyebrow}>{trip.eyebrow}</p><h1>{trip.title}</h1>
      <div className={styles.detailIntro}><p className={styles.detailLede}>{trip.lede}</p><a className={styles.primaryLink} href="#corporate-enquiry">このプランを相談する<span aria-hidden="true">↗</span></a></div>
      <Photo photo={trip.hero} priority className={styles.detailHeroPhoto} />
      <dl className={styles.facts}><div><dt>日程</dt><dd>{trip.duration}</dd></div><div><dt>人数の目安</dt><dd>{trip.groupSize}</dd></div><div><dt>宿泊拠点</dt><dd>{trip.base}</dd></div><div><dt>旅行のかたち</dt><dd>{trip.format}</dd></div></dl>
    </header>
    <div className={styles.container}>
      <section className={`${styles.section} ${styles.storySection}`} aria-labelledby="corporate-story-title"><div><p className={styles.eyebrow}>この旅で大切にすること</p><h2 id="corporate-story-title">{trip.storyTitle}</h2></div><div><p className={styles.largeBody}>{trip.story}</p><div className={styles.highlightList}>{trip.highlights.map((highlight) => <div key={highlight.title}><h3>{highlight.title}</h3><p>{highlight.text}</p></div>)}</div></div></section>

      <section className={styles.section} aria-labelledby="corporate-itinerary-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>モデルプラン</p><h2 id="corporate-itinerary-title">ゆとりを持って巡る、4日間。</h2></div><p>チームの旅を考えるための一案です。日程、到着時刻、天候、ご希望に合わせて最終行程を決めます。</p></div>
        <nav className={styles.dayNav} aria-label="各日の行程へ">{trip.days.map((day, index) => <a href={`#day-${index + 1}`} key={day.title}><span>{index + 1}日目</span>{day.place}<span aria-hidden="true">↓</span></a>)}</nav>
        <div className={styles.dayList}>{trip.days.map((day, index) => <article className={styles.day} id={`day-${index + 1}`} key={day.title}>
          <div className={styles.dayText}><p className={styles.eyebrow}>{index + 1}日目 / {day.place}</p><h3>{day.title}</h3><p className={styles.daySummary}>{day.summary}</p><ul>{day.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
          <Photo photo={day.image} sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 82rem) calc((100vw - 6rem) / 2), 36rem" />
        </article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.staySection}`} aria-labelledby="corporate-stay-title"><div><p className={styles.eyebrow}>みんなが落ち着ける宿を</p><h2 id="corporate-stay-title">{trip.stay.title}</h2></div><div><p className={styles.largeBody}>{trip.stay.body}</p><ul className={styles.ruledList}>{trip.stay.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></section>

      <section className={styles.section} aria-labelledby="corporate-scope-title"><div className={styles.sectionIntro}><div><p className={styles.eyebrow}>手配の範囲を確認</p><h2 id="corporate-scope-title">含まれるものを、明確に。</h2></div><p>以下はご相談のための手配案です。最終の書面見積もりで、具体的に含まれる内容、追加オプション、予約条件を確認します。</p></div><p>{japaneseCorporateGuideNote}</p><div className={styles.scopeGrid}><div><h3>基本の手配案</h3><ul>{trip.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>追加で相談できること</h3><ul>{trip.options.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>基本プランに含まれないもの</h3><ul>{trip.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

      <section className={`${styles.section} ${styles.planningSection}`} aria-labelledby="corporate-planning-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>予約前に相談したいこと</p><h2 id="corporate-planning-title">参加される方に合わせて。</h2></div><div className={styles.planningNotes}>{trip.planningNotes.map((note) => <div key={note.title}><h3>{note.title}</h3><p>{note.body}</p></div>)}</div></section>

      <Faqs faqs={trip.faqs} title="このプランについてのご質問。" />
      <aside className={styles.related} aria-label="関連する実用ガイド"><p className={styles.eyebrow}>旅を考えるヒント</p><div>{trip.relatedGuides.map((guide) => <Link key={guide.href} href={guide.href}>{guide.label}<span aria-hidden="true">↗</span></Link>)}</div><Link className={styles.backLink} href={corporateHubPath}>← 中国の企業向け旅行を見る</Link></aside>
      <PhotoCredits photos={[trip.hero, ...trip.days.map((day) => day.image)]} />
      <EnquirySection trip={trip} />
    </div>
  </PageFrame>;
}
