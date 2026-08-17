import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  getTourGuideDecisionCopy,
  tourGuideDecisionGuideId,
  type TourGuideDecisionCopy,
} from "../lib/tourGuideDecisionI18n";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { LegacyEditorialByline } from "./LegacyEditorialByline";
import { GuideCtaLink } from "./GuideCtaLink";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ChinaTourGuideDecisionPage.module.css";

const SITE_URL = "https://homegroundchina.com";

function createStructuredData(
  locale: HomegroundLocale,
  copy: TourGuideDecisionCopy,
  guide: ReturnType<typeof getGuideEntry>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema(locale),
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: copy.metadata.headline,
        description: copy.metadata.schemaDescription,
        image: {
          "@type": "ImageObject",
          url: guide.heroImageUrl,
          width: guide.imageWidth,
          height: guide.imageHeight,
          caption: copy.metadata.heroAlt,
        },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: copy.metadata.inLanguage,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        mainEntityOfPage: guide.canonicalUrl,
        citation: copy.sources.map((source) => source.url),
        about: copy.metadata.about,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guide.canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: `${SITE_URL}${copy.homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.guides,
            item: `${SITE_URL}${copy.guidesPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.breadcrumb.current,
            item: guide.canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${guide.canonicalUrl}#faq`,
        inLanguage: copy.metadata.inLanguage,
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

function EditorialSection({
  copy,
  eyebrow,
  soft = false,
}: {
  copy: TourGuideDecisionCopy["independent"];
  eyebrow: string;
  soft?: boolean;
}) {
  return (
    <section className={`${styles.section} ${soft ? styles.sectionSoft : ""}`}>
      <div className={styles.splitSection}>
        <div>
          <p className={styles.sectionEyebrow}>{eyebrow}</p>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
        </div>
        <div className={styles.sectionBody}>
          <p className={styles.sectionIntro}>{copy.intro}</p>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {copy.items.length > 0 ? (
            <>
              <p className={styles.listLabel}>{copy.listLabel}</p>
              <ul className={styles.bulletList}>
                {copy.items.map((point) => (
                  <li key={point.slice(0, 48)}>{point}</li>
                ))}
              </ul>
            </>
          ) : null}
          <p className={styles.closing}>{copy.closing}</p>
        </div>
      </div>
    </section>
  );
}

function PlannerCta({
  copy,
  href,
  locale,
  position,
}: {
  copy: TourGuideDecisionCopy["earlyCta"];
  href: string;
  locale: HomegroundLocale;
  position: "inline" | "footer";
}) {
  return (
    <div className={styles.ctaCard}>
      <div>
        <p className={styles.ctaEyebrow}>{copy.label}</p>
        <h2 className={styles.ctaTitle}>{copy.title}</h2>
        <p className={styles.ctaDetail}>{copy.detail}</p>
      </div>
      <GuideCtaLink
        className={styles.ctaButton}
        guideId={tourGuideDecisionGuideId}
        href={href}
        locale={locale}
        position={position}
      >
        {copy.button}
        <ArrowRight aria-hidden="true" size={18} />
      </GuideCtaLink>
    </div>
  );
}

export function ChinaTourGuideDecisionPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getTourGuideDecisionCopy(locale);
  const guide = getGuideEntry(tourGuideDecisionGuideId, locale);
  const structuredData = createStructuredData(locale, copy, guide);
  const ui = {
    en: {
      breadcrumb: "Breadcrumb",
      bestFor: "Best for",
      notFor: "Does not solve",
      support: "Choose the role",
      days: "Decide by the day",
      independent: "Independent time",
      guide: "Selected guide days",
      driver: "Transport-only help",
      fullTrip: "Joined-up support",
      hybrid: "A mixed trip",
      checklist: "Before you pay",
      related: "Continue planning",
      relatedAction: "Read guide",
      faq: "Practical questions",
      sources: "Sources and evidence",
      sourcesIntro:
        "Official sources support the operational facts below. Traveller discussions are used only to identify recurring questions and individual experiences.",
    },
    zh: {
      breadcrumb: "面包屑导航",
      bestFor: "适合",
      notFor: "不能解决",
      support: "先选对角色",
      days: "按天判断",
      independent: "独立旅行",
      guide: "关键日导游",
      driver: "只解决交通",
      fullTrip: "贯穿全程的协助",
      hybrid: "混合式旅行",
      checklist: "付款前确认",
      related: "继续规划",
      relatedAction: "阅读指南",
      faq: "实际问题",
      sources: "资料与证据",
      sourcesIntro:
        "以下官方来源用于核实操作事实；游客讨论只用于识别反复出现的问题与个别体验，不代表普遍结果。",
    },
    ko: {
      breadcrumb: "이동 경로",
      bestFor: "잘 맞는 경우",
      notFor: "해결하지 못하는 것",
      support: "역할부터 고르기",
      days: "하루씩 판단하기",
      independent: "자유 일정",
      guide: "필요한 날의 가이드",
      driver: "교통만 지원",
      fullTrip: "연결된 전체 지원",
      hybrid: "혼합형 여행",
      checklist: "결제 전 확인",
      related: "다음 계획",
      relatedAction: "가이드 읽기",
      faq: "실전 질문",
      sources: "자료와 근거",
      sourcesIntro:
        "공식 출처는 운영상 사실을 확인하는 데 사용했습니다. 여행자 토론은 반복되는 질문과 개별 경험을 파악하는 참고 자료일 뿐 보편적인 결과를 뜻하지 않습니다.",
    },
  }[locale];

  return (
    <div className={styles.pageRoot} lang={copy.htmlLang}>
      <a className={styles.skipLink} href="#tour-guide-decision-main">
        {copy.skipLink}
      </a>

      <HomegroundHeader
        guideId={tourGuideDecisionGuideId}
        locale={locale}
        pageContext="guide"
      />

      <main className={styles.main} id="tour-guide-decision-main" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label={ui.breadcrumb}>
                <ol>
                  <li>
                    <Link href={copy.homePath}>{copy.breadcrumb.home}</Link>
                  </li>
                  <li>
                    <span aria-hidden="true">/</span>
                    <Link href={copy.guidesPath}>{copy.breadcrumb.guides}</Link>
                  </li>
                  <li aria-current="page">
                    <span aria-hidden="true">/</span>
                    {copy.breadcrumb.current}
                  </li>
                </ol>
              </nav>

              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1 className={styles.heroTitle}>{copy.metadata.headline}</h1>
              {copy.hero.lead.map((paragraph) => (
                <p className={styles.heroLead} key={paragraph.slice(0, 40)}>
                  {paragraph}
                </p>
              ))}
              <LegacyEditorialByline
                guideId={guide.id}
                locale={locale}
                reviewedAt={guide.sourceReviewedDate}
              />
            </div>

            <figure className={styles.heroMedia}>
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/guides/china-tour-guide-decision/longmen-caves-480.webp 480w, /images/guides/china-tour-guide-decision/longmen-caves-768.webp 768w, /images/guides/china-tour-guide-decision/longmen-caves-1200.webp 1200w"
                  sizes="(max-width: 1024px) 100vw, 53vw"
                />
                <img
                  alt={copy.hero.imageAlt}
                  decoding="async"
                  fetchPriority="high"
                  height={2104}
                  src="/images/guides/china-tour-guide-decision/longmen-caves-1200.webp"
                  width={3456}
                />
              </picture>
            </figure>
          </header>

          <section className={styles.answerBand}>
            <div className={styles.answerInner}>
              <h2 className={styles.answerTitle}>{copy.shortAnswer.title}</h2>
              <div className={styles.answerCopy}>
                {copy.shortAnswer.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                <p className={styles.answerPrinciple}>
                  {copy.shortAnswer.principle}
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionEyebrow}>{ui.support}</p>
                <h2 className={styles.sectionTitle}>
                  {copy.supportTypes.title}
                </h2>
              </div>
              <p className={styles.sectionIntro}>{copy.supportTypes.intro}</p>
            </div>

            <div className={styles.supportGrid}>
              {copy.supportTypes.items.map((item) => (
                <article className={styles.supportCard} key={item.name}>
                  <h3 className={styles.supportName}>{item.name}</h3>
                  <p className={styles.supportLabel}>{ui.bestFor}</p>
                  <p className={styles.supportText}>{item.bestFor}</p>
                  <p className={styles.supportLabel}>{ui.notFor}</p>
                  <p className={styles.supportText}>{item.notFor}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionSoft}`}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionEyebrow}>{ui.days}</p>
                <h2 className={styles.sectionTitle}>
                  {copy.dayDecision.title}
                </h2>
              </div>
              <p className={styles.sectionIntro}>{copy.dayDecision.intro}</p>
            </div>

            <ul className={styles.decisionList}>
              {copy.dayDecision.items.map((item) => (
                <li className={styles.decisionRow} key={item.title}>
                  <p className={styles.decisionLabel}>{item.label}</p>
                  <h3 className={styles.decisionTitle}>{item.title}</h3>
                  <p className={styles.decisionBody}>
                    <strong>{item.decision}</strong> {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <PlannerCta
              copy={copy.earlyCta}
              href={copy.plannerHref}
              locale={locale}
              position="inline"
            />
          </section>

          <EditorialSection copy={copy.independent} eyebrow={ui.independent} />
          <EditorialSection copy={copy.guideWorth} eyebrow={ui.guide} soft />
          <EditorialSection copy={copy.driverEnough} eyebrow={ui.driver} />

          <section className={styles.fullTrip}>
            <div className={styles.fullTripInner}>
              <div>
                <p className={styles.sectionEyebrow}>{ui.fullTrip}</p>
                <h2 className={styles.fullTripTitle}>{copy.fullTrip.title}</h2>
              </div>
              <div className={styles.fullTripCopy}>
                <p>{copy.fullTrip.intro}</p>
                {copy.fullTrip.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                <p className={styles.listLabelOnDark}>
                  {copy.fullTrip.listLabel}
                </p>
                <ul className={styles.fullTripList}>
                  {copy.fullTrip.items.map((point) => (
                    <li key={point.slice(0, 48)}>{point}</li>
                  ))}
                </ul>
                <p className={styles.fullTripClosing}>
                  {copy.fullTrip.closing}
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.splitSection}>
              <div>
                <p className={styles.sectionEyebrow}>{ui.hybrid}</p>
                <h2 className={styles.sectionTitle}>{copy.hybrid.title}</h2>
              </div>
              <div>
                <p className={styles.hybridIntro}>{copy.hybrid.intro}</p>
                {copy.hybrid.paragraphs.map((paragraph) => (
                  <p
                    className={styles.hybridIntro}
                    key={paragraph.slice(0, 40)}
                  >
                    {paragraph}
                  </p>
                ))}
                <p className={styles.listLabel}>{copy.hybrid.listLabel}</p>
                <div className={styles.hybridMap}>
                  {copy.hybrid.items.map((step, index) => (
                    <div className={styles.hybridStep} key={step}>
                      <div className={styles.hybridMarker} aria-hidden="true">
                        {index + 1}
                      </div>
                      <div className={styles.hybridContent}>
                        <h3 className={styles.hybridTitle}>{step}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <p className={styles.closing}>{copy.hybrid.closing}</p>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionSoft}`}>
            <div className={styles.splitSection}>
              <div>
                <p className={styles.sectionEyebrow}>{ui.checklist}</p>
                <h2 className={styles.sectionTitle}>{copy.checklist.title}</h2>
              </div>
              <div>
                <p className={styles.checklistIntro}>{copy.checklist.intro}</p>
                <ul className={styles.checklist}>
                  {copy.checklist.items.map((item) => (
                    <li className={styles.checkItem} key={item}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <p className={styles.sectionEyebrow}>{ui.related}</p>
            <h2 className={styles.sectionTitle}>{copy.related.title}</h2>
            <div className={styles.relatedGrid}>
              {copy.related.items.map((item) => (
                <Link
                  className={styles.relatedCard}
                  href={item.href}
                  key={item.href}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className={styles.relatedAction}>
                    {ui.relatedAction}
                    <ArrowRight aria-hidden="true" size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section
            className={`${styles.section} ${styles.sectionSoft}`}
            id="faq"
          >
            <div className={styles.faqLayout}>
              <div>
                <p className={styles.sectionEyebrow}>{ui.faq}</p>
                <h2 className={styles.faqTitle}>{copy.faq.title}</h2>
              </div>
              <div className={styles.faqList}>
                {copy.faq.items.map((item) => (
                  <details className={styles.faqItem} key={item.question}>
                    <summary>{item.question}</summary>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sources}>
              <p className={styles.sectionEyebrow}>{ui.sources}</p>
              <p className={styles.sourcesIntro}>{ui.sourcesIntro}</p>
              <ul className={styles.sourceList}>
                {copy.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} rel="noreferrer" target="_blank">
                      {source.title}{" "}
                      <ExternalLink aria-hidden="true" size={13} />
                    </a>
                    <p className={styles.sourceNote}>{source.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.finalCta}>
            <div className={styles.finalInner}>
              <div>
                <p className={styles.ctaEyebrow}>{copy.finalCta.label}</p>
                <h2 className={styles.finalTitle}>{copy.finalCta.title}</h2>
                <p className={styles.finalDetail}>{copy.finalCta.detail}</p>
              </div>
              <GuideCtaLink
                className={styles.ctaButton}
                guideId={tourGuideDecisionGuideId}
                href={copy.plannerHref}
                locale={locale}
                position="footer"
              >
                {copy.finalCta.button}
                <ArrowRight aria-hidden="true" size={18} />
              </GuideCtaLink>
            </div>
          </section>
        </article>
      </main>

      <HomegroundFooter locale={locale} />

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </div>
  );
}
