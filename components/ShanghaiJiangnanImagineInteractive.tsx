"use client";

import { TourWhatsAppLink } from "./TourWhatsAppLink";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";
import type {
  LocalizedPrivateTourProduct,
  PrivateTourPriceTier,
  PrivateTourLocale,
} from "../lib/privateTourProducts";
import { GuideCtaLink } from "./GuideCtaLink";
import { TourPriceScope } from "./TourPriceScope";
import { JapaneseTourContactLink, type JapaneseContactHrefs } from "./JapaneseJiangnanInteraction";
import tourContactStyles from "./TourContactPanel.module.css";
import { usePrivateTourSelection, useSelectedPrivateTourInquiryHref } from "./PrivateTourSelection";
import { isJiangnanTour } from "../lib/tourContactDraft";
import { privateTourCurrencyNote } from "../lib/privateTourCurrencyNote";
import styles from "./ShanghaiJiangnanImaginePage.module.css";

const interactionCopy: Record<
  PrivateTourLocale,
  {
    nextPhoto: string;
    choosePackage: string;
    chooseGroup: string;
    publishedPrice: string;
    perPerson: string;
    group: (count: number) => string;
    privateTour: string;
    flightsSeparate: string;
    checkDates: string;
    otherGroups: string;
    otherGroupsBody: string;
    requestQuote: string;
    quoteOnlyTitle: string;
    quoteOnlyBody: string;
    routeLabel: string;
    routeScenes: string;
    dayLabel: (day: number) => string;
  }
> = {
  en: {
    nextPhoto: "Show the next journey photograph",
    choosePackage: "Choose a service option",
    chooseGroup: "Choose group size",
    publishedPrice: "Published price for selected group",
    perPerson: "per person",
    group: (count) => `${count} travellers`,
    privateTour: "private tour",
    flightsSeparate: "flights not included",
    checkDates: "Request a quote",
    otherGroups: "Need a different group size?",
    otherGroupsBody:
      "We confirm room needs, luggage count and a suitable vehicle before sending a written quote.",
    requestQuote: "Plan this journey",
    quoteOnlyTitle: "Price confirmed for your dates and group",
    quoteOnlyBody:
      "This route has no stable public price. Share your dates, group size and room needs for one written total before payment.",
    routeLabel: "Choose a day to change the journey photograph",
    routeScenes: "Journey scenes",
    dayLabel: (day) => `Day ${day}`,
  },
  zh: {
    nextPhoto: "切换到下一张行程照片",
    choosePackage: "选择服务版本",
    chooseGroup: "选择同行人数",
    publishedPrice: "当前人数公开价",
    perPerson: "每人",
    group: (count) => `${count} 人同行`,
    privateTour: "私家团",
    flightsSeparate: "往返机票另计",
    checkDates: "获取专属报价",
    otherGroups: "需要其他同行人数？",
    otherGroupsBody: "我们会确认房间需求、行李数量和适用车型，再发出书面报价。",
    requestQuote: "规划这条路线",
    quoteOnlyTitle: "按日期和人数确认价格",
    quoteOnlyBody:
      "这条路线没有稳定公开价。请提供日期、人数和房间需求，我们会在付款前给出一份书面总价。",
    routeLabel: "选择一天，切换对应的行程照片",
    routeScenes: "当天场景",
    dayLabel: (day) => `第 ${day} 天`,
  },
  ko: {
    nextPhoto: "다음 여행 사진 보기",
    choosePackage: "여행 유형 선택",
    chooseGroup: "인원 선택",
    publishedPrice: "선택 인원 공개가",
    perPerson: "1인",
    group: (count) => `${count}명 기준`,
    privateTour: "프라이빗 투어",
    flightsSeparate: "항공권 별도",
    checkDates: "맞춤 견적 요청",
    otherGroups: "다른 인원으로 여행하나요?",
    otherGroupsBody:
      "객실 조건, 수하물 수량과 알맞은 차량을 확인한 뒤 서면 견적을 드립니다.",
    requestQuote: "이 여정 계획하기",
    quoteOnlyTitle: "날짜와 인원에 맞춰 가격을 확인합니다",
    quoteOnlyBody:
      "이 일정은 고정 공개가가 없습니다. 날짜, 인원과 객실 조건을 알려 주시면 결제 전 서면 총액을 안내합니다.",
    routeLabel: "일자를 선택해 해당 여행 사진을 보세요",
    routeScenes: "선택한 날의 장면",
    dayLabel: (day) => `${day}일차`,
  },
};

/**
 * The selected-price line names the tour type and the service once: a package
 * label that already contains the type ("프라이빗 투어 패키지", "私家团标准版")
 * replaces it, and an identical label is not repeated.
 */
export function privateTourPriceBasisLabels(
  tourFormatLabel: string,
  packageLabel: string,
): readonly string[] {
  const format = tourFormatLabel.trim();
  const service = packageLabel.trim();
  if (!service) return format ? [format] : [];
  if (!format) return [service];
  const formatKey = format.toLocaleLowerCase();
  const serviceKey = service.toLocaleLowerCase();
  if (serviceKey === formatKey) return [format];
  if (serviceKey.includes(formatKey)) {
    // Mid-sentence in English, "Private tour package" reads "private tour package".
    return [format === formatKey && service[0] !== serviceKey[0]
      ? serviceKey[0] + service.slice(1)
      : service];
  }
  if (formatKey.includes(serviceKey)) return [format];
  return [format, service];
}

type PhotoCopy = Readonly<{
  nextPhoto: string;
  routeLabel: string;
  routeScenes: string;
  dayUnit: string;
}>;

const previewCaption: Record<PrivateTourLocale, (alt: string) => string> = {
  en: (alt) =>
    `${alt} — Tour photo preview only. This does not confirm this day's sights, arrangements or actual conditions.`,
  zh: (alt) =>
    `${alt}｜本行程实景预览；不代表这一天的景点、已确认安排或实际情况。`,
  ko: (alt) =>
    `${alt} — 이 여행의 사진 미리보기입니다. 해당 날짜의 관광지, 확정 일정 또는 실제 현장 상황을 뜻하지 않습니다.`,
};

// Shown when a route declines photos of other places (routePhotoFallback: false).
const noDayPhotoCopy: Record<PrivateTourLocale, string> = {
  en: "We have no verified photo of this day's places yet, so none is shown.",
  zh: "这一天的地点暂时没有经过核实的照片，因此不配图。",
  ko: "이날 방문지의 확인된 사진이 아직 없어 사진을 싣지 않았습니다.",
};

const japanesePreviewCaption = (alt: string) =>
  `${alt}｜この旅の写真プレビューです。この日の行き先、確定した行程や実際の現地状況を示すものではありません。`;

const beijingArrivalTitles = new Set([
  "Arrive in Beijing",
  "抵达北京",
  "베이징 도착",
  "北京到着",
  "北京に到着",
]);
const beijingArrivalPhoto = "/images/tours/beijing-highlights-5-day-private-tour/arrival-beijing-city-1600.webp";
const beijingArrivalAlt: Record<PrivateTourLocale, string> = {
  en: "Beijing CBD roads and skyline at night",
  zh: "北京 CBD 夜间道路与城市天际线",
  ko: "밤의 베이징 CBD 도로와 스카이라인",
};
const beijingArrivalPreviewLabel: Record<PrivateTourLocale, string> = {
  en: "Beijing city journey preview. ",
  zh: "北京城市行程预览。",
  ko: "베이징 도심 여행 미리보기. ",
};

/** Scoped copy supplied by the Japanese page; pricing and selection stay shared. */
export type JapanesePriceCopy = Readonly<{
  choosePackage: string;
  chooseGroup: string;
  publishedPrice: string;
  perPerson: string;
  groupUnit: string;
  privateTour: string;
  flightsSeparate?: string;
  internationalFlightsSeparate?: string;
  priceBasis?: string;
  twinShare?: string;
  smallGroup?: string;
  checkDates: string;
  otherGroups: string;
  otherGroupsBody: string;
  requestQuote: string;
  quoteOnlyTitle?: string;
  quoteOnlyBody?: string;
  emailLabel: string;
  /** Japanese only: says the WhatsApp/email buttons open a draft that is not sent yet. */
  draftNote?: string;
  /** Currency and settlement note shown under the selected price. */
  currencyNote?: string;
}>;

// Fixed-departure small groups price one twin-share place, and long-haul
// routes include their domestic flights; everything else keeps the copy above.
const formatCopy: Record<
  PrivateTourLocale,
  {
    priceBasis: string;
    twinShare: string;
    smallGroup: string;
    internationalFlightsSeparate: string;
  }
> = {
  en: {
    priceBasis: "Price per person",
    twinShare: "Twin share",
    smallGroup: "small group",
    internationalFlightsSeparate: "international flights not included",
  },
  zh: {
    priceBasis: "每人价格",
    twinShare: "双人同住",
    smallGroup: "小团",
    internationalFlightsSeparate: "国际机票另计",
  },
  ko: {
    priceBasis: "1인 요금",
    twinShare: "2인 1실",
    smallGroup: "소규모 그룹",
    internationalFlightsSeparate: "국제선 항공권 별도",
  },
};

type DeckStyle = CSSProperties & { "--deck-depth": number };

export function ShanghaiJiangnanHeroDeck({
  product,
  photoCopy,
}: {
  product: LocalizedPrivateTourProduct;
  photoCopy?: PhotoCopy;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const copy = photoCopy ?? interactionCopy[product.locale];
  const images = useMemo(
    () => [product.heroImage, ...product.gallery],
    [product.gallery, product.heroImage],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (paused || reducedMotion || images.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  const move = (delta: number) => {
    setActiveIndex(
      (current) => (current + delta + images.length) % images.length,
    );
  };
  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  };

  return (
    <figure
      className={styles.heroDeck}
      onBlurCapture={handleBlur}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        aria-label={`${copy.nextPhoto}: ${images[(activeIndex + 1) % images.length].alt}`}
        className={styles.deckStage}
        type="button"
        onClick={() => move(1)}
      >
        {images.map((image, index) => {
          const depth = (index - activeIndex + images.length) % images.length;
          const visible = depth < Math.min(4, images.length);
          return (
            <span
              aria-hidden={depth === 0 ? undefined : "true"}
              className={styles.deckCard}
              data-visible={visible ? "true" : "false"}
              key={image.src}
              style={{ "--deck-depth": depth } as DeckStyle}
            >
              <Image
                alt={depth === 0 ? image.alt : ""}
                fetchPriority={index === 0 ? "high" : undefined}
                fill
                priority={index === 0}
                sizes="(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 500px"
                src={image.src}
                style={{ objectPosition: image.objectPosition }}
              />
            </span>
          );
        })}
      </button>
      <figcaption className={styles.deckCaption}>
        <span aria-live="polite">{images[activeIndex].caption}</span>
      </figcaption>
    </figure>
  );
}

export function ShanghaiJiangnanPriceConsole({
  product,
  inquiryHref,
  japaneseCopy,
  japaneseContactHrefs,
}: {
  product: LocalizedPrivateTourProduct;
  inquiryHref: string;
  japaneseCopy?: JapanesePriceCopy;
  japaneseContactHrefs?: JapaneseContactHrefs;
}) {
  const hasPublishedPrice = product.packages.some(
    (tourPackage) => tourPackage.rows.length > 0,
  );
  if (!hasPublishedPrice) {
    return (
      <div className={styles.priceConsole}>
        <div className={styles.priceResult}>
          <span>{japaneseCopy?.quoteOnlyTitle ?? interactionCopy[product.locale].quoteOnlyTitle}</span>
          <p>{japaneseCopy?.quoteOnlyBody ?? interactionCopy[product.locale].quoteOnlyBody}</p>
        </div>
        <div className={styles.priceConsoleActions}>
          {japaneseCopy && japaneseContactHrefs ? <JapaneseTourContactLink
            className={styles.primaryAction}
            hrefs={japaneseContactHrefs}
          >
            {japaneseCopy.requestQuote}
            <ArrowRight aria-hidden="true" size={18} />
          </JapaneseTourContactLink> : <GuideCtaLink
            className={styles.primaryAction}
            guideId={product.id}
            href={inquiryHref}
            locale={product.locale}
            position="header"
          >
            {interactionCopy[product.locale].requestQuote}
            <ArrowRight aria-hidden="true" size={18} />
          </GuideCtaLink>}
          {japaneseCopy?.draftNote ? <p className={styles.draftNote}>{japaneseCopy.draftNote}</p> : null}
        </div>
      </div>
    );
  }
  return (
    <PublishedPrivateTourPriceConsole
      inquiryHref={inquiryHref}
      product={product}
      japaneseCopy={japaneseCopy}
      japaneseContactHrefs={japaneseContactHrefs}
    />
  );
}

function PublishedPrivateTourPriceConsole({
  product,
  inquiryHref,
  japaneseCopy,
  japaneseContactHrefs,
}: {
  product: LocalizedPrivateTourProduct;
  inquiryHref: string;
  japaneseCopy?: JapanesePriceCopy;
  japaneseContactHrefs?: JapaneseContactHrefs;
}) {
  const selectionContext = usePrivateTourSelection();
  if (!selectionContext) throw new Error("Private tour price needs selection context");
  const { selection, setSelection } = selectionContext;
  const packageId = selection.packageId;
  const travellers = selection.travelers;
  const selectedInquiryHref = useSelectedPrivateTourInquiryHref(inquiryHref) ?? inquiryHref;
  const copy = japaneseCopy
    ? {
        ...interactionCopy.en,
        ...japaneseCopy,
        group: (count: number) => `${count}${japaneseCopy.groupUnit}`,
      }
    : interactionCopy[product.locale];
  const format = japaneseCopy ? {
    priceBasis: japaneseCopy.priceBasis ?? japaneseCopy.chooseGroup,
    twinShare: japaneseCopy.twinShare ?? "2名1室",
    smallGroup: japaneseCopy.smallGroup ?? "少人数グループ",
    internationalFlightsSeparate: japaneseCopy.internationalFlightsSeparate ?? "",
  } : formatCopy[product.locale];
  const smallGroup = product.tourFormat === "small-group";
  const chooseGroup = smallGroup ? format.priceBasis : copy.chooseGroup;
  const groupLabel = (count: number) => (smallGroup ? format.twinShare : copy.group(count));
  const tourFormatLabel = smallGroup ? format.smallGroup : copy.privateTour;
  const flightsLabel = product.includesDomesticFlights
    ? format.internationalFlightsSeparate
    : copy.flightsSeparate;
  const tourPackage =
    product.packages.find((candidate) => candidate.id === packageId) ??
    product.packages[0];
  const activeRow =
    tourPackage.rows.find((row) => row.travelers === travellers) ??
    tourPackage.rows[0];

  return (
    <div className={styles.priceConsole}>
      <div className={styles.priceConsoleTop}>
        {product.packages.length > 1 ? (
          <div className={styles.packagePicker}>
            <p>{copy.choosePackage}</p>
            <div
              aria-label={copy.choosePackage}
              className={styles.packageChoices}
              role="group"
            >
              {product.packages.map((candidate) => (
                <button
                  aria-pressed={candidate.id === tourPackage.id}
                  key={candidate.id}
                  type="button"
                  onClick={() => setSelection({ ...selection, packageId: candidate.id })}
                >
                  {candidate.label}
                </button>
              ))}
            </div>
            <p className={styles.packageSummary}>{tourPackage.summary}</p>
          </div>
        ) : null}
        <p>{chooseGroup}</p>
        <div
          className={styles.priceChoices}
          role="group"
          aria-label={chooseGroup}
        >
          {tourPackage.rows.map((row) => (
            <button
              aria-pressed={row.travelers === travellers}
              key={row.travelers}
              type="button"
              onClick={() =>
                setSelection({
                  ...selection,
                  travelers: row.travelers as PrivateTourPriceTier["travelers"],
                })
              }
            >
              <span>{groupLabel(row.travelers)}</span>
              <strong>{row.formatted}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.priceResult} aria-live="polite">
        <span>{copy.publishedPrice}</span>
        <strong key={`${activeRow.travelers}-${activeRow.formatted}`}>
          {activeRow.formatted}
        </strong>
        <small>
          {[
            copy.perPerson,
            groupLabel(activeRow.travelers),
            ...privateTourPriceBasisLabels(tourFormatLabel, tourPackage.label),
            ...(flightsLabel ? [flightsLabel] : []),
          ].join(" · ")}
        </small>
      </div>
      {/* Outside the live region: the note is static and need not be re-read. */}
      {japaneseCopy && !japaneseCopy.currencyNote ? null : (
        <p className={styles.currencyNote}>
          {japaneseCopy ? japaneseCopy.currencyNote : privateTourCurrencyNote[product.locale]}
        </p>
      )}

      {product.slug === "beijing-highlights-5-day-private-tour" && !japaneseCopy ? (
        <TourPriceScope route="beijing" locale={product.locale} detailsHref="#tour-price-details" />
      ) : null}

      <div className={styles.priceConsoleActions}>
        {japaneseCopy && japaneseContactHrefs ? <JapaneseTourContactLink className={styles.primaryAction} hrefs={japaneseContactHrefs}>
          {copy.checkDates}
          <ArrowRight aria-hidden="true" size={17} />
        </JapaneseTourContactLink> : <GuideCtaLink
          className={styles.primaryAction}
          guideId={product.id}
          href={selectedInquiryHref}
          locale={product.locale}
          position="header"
        >
          {copy.checkDates}
          <ArrowRight aria-hidden="true" size={17} />
        </GuideCtaLink>}
        {japaneseCopy && japaneseContactHrefs ? <JapaneseTourContactLink channel="email" className={tourContactStyles.secondaryLink} hrefs={japaneseContactHrefs}>
          {japaneseCopy.emailLabel}
        </JapaneseTourContactLink> : <TourWhatsAppLink locale={product.locale} slug={product.slug} />}
        <div className={styles.otherGroupCopy}>
          <strong>{copy.otherGroups}</strong>
          <span>{copy.otherGroupsBody}</span>
          {japaneseCopy && japaneseContactHrefs ? <JapaneseTourContactLink ignoreSelection hrefs={japaneseContactHrefs}>
            {copy.requestQuote}
            <ArrowRight aria-hidden="true" size={15} />
          </JapaneseTourContactLink> : <GuideCtaLink
            guideId={product.id}
            href={isJiangnanTour(product.slug) ? inquiryHref : selectedInquiryHref}
            locale={product.locale}
            position="inline"
          >
            {copy.requestQuote}
            <ArrowRight aria-hidden="true" size={15} />
          </GuideCtaLink>}
        </div>
        {japaneseCopy?.draftNote ? <p className={styles.draftNote}>{japaneseCopy.draftNote}</p> : null}
      </div>
    </div>
  );
}

function ShanghaiJiangnanMobileDayMedia({
  dayLabel,
  scenesLabel,
  variants,
}: {
  dayLabel: string;
  scenesLabel: string;
  variants: LocalizedPrivateTourProduct["routeMedia"][number]["variants"];
}) {
  const [activeVariant, setActiveVariant] = useState(0);
  const selected = variants[activeVariant] ?? variants[0];

  if (!selected) return null;

  return (
    <figure className={styles.routeMobileMedia}>
      <div className={styles.routeMobileStage}>
        {variants.map((variant, index) => {
          const active = index === activeVariant;
          return (
            <span
              aria-hidden={active ? undefined : "true"}
              data-active={active ? "true" : "false"}
              key={variant.image.src}
            >
              <Image
                alt={active ? variant.image.alt : ""}
                fill
                sizes="(max-width: 760px) 92vw, 1px"
                src={variant.image.src}
                style={{ objectPosition: variant.image.objectPosition }}
              />
            </span>
          );
        })}
      </div>

      {variants.length > 1 ? (
        <div
          aria-label={`${dayLabel} · ${scenesLabel}`}
          className={styles.routeMediaTabs}
          role="group"
        >
          {variants.map((variant, index) => (
            <button
              aria-pressed={index === activeVariant}
              key={`${variant.image.src}-tab`}
              type="button"
              onClick={() => setActiveVariant(index)}
            >
              {variant.label}
            </button>
          ))}
        </div>
      ) : null}

      <figcaption aria-live="polite">{selected.image.caption}</figcaption>
    </figure>
  );
}

export function ShanghaiJiangnanRouteExplorer({
  product,
  photoCopy,
}: {
  product: LocalizedPrivateTourProduct;
  photoCopy?: PhotoCopy;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const explorerRef = useRef<HTMLDivElement>(null);
  const copy = photoCopy
    ? { ...photoCopy, dayLabel: (day: number) => `${day}${photoCopy.dayUnit}` }
    : interactionCopy[product.locale];
  const routeMedia = useMemo(() => {
    const datedPhotos = product.routeMedia.flatMap((group) =>
      group.variants.map((variant) => ({ day: group.day, image: variant.image })),
    );
    const previewPhotos = [...datedPhotos, { day: 1, image: product.heroImage }];
    const genericPhotos = [product.heroImage, ...product.gallery];
    const describePreview = photoCopy
      ? japanesePreviewCaption
      : previewCaption[product.locale];

    return product.itinerary.map((day, index) => {
      const assigned = product.routeMedia.find(
        (group) => group.day === day.day,
      );
      const authored = assigned?.variants.length ? assigned : null;
      if (authored) return authored;
      // A photo of another place would read as this day's scene.
      if (product.routePhotoFallback === false) return null;

      if (day.day === 1 && beijingArrivalTitles.has(day.title)) {
        const alt = photoCopy
          ? "夜の北京CBDの道路と街の景色"
          : beijingArrivalAlt[product.locale];
        const label = photoCopy
          ? "北京の街の旅程プレビュー。"
          : beijingArrivalPreviewLabel[product.locale];
        return {
          day: day.day,
          variants: [{
            label: copy.routeScenes,
            image: {
              src: beijingArrivalPhoto,
              width: 1600,
              height: 1000,
              objectPosition: "50% 50%",
              alt,
              caption: `${label}${describePreview(alt)}`,
            },
          }],
        };
      }

      // Gallery photos have no day assignment. Use them only when the route
      // has no dated photos; otherwise the closest dated scene (or the hero
      // for the opening day) is the least arbitrary preview.
      const nearest = previewPhotos.reduce((best, candidate) =>
        Math.abs(candidate.day - day.day) < Math.abs(best.day - day.day)
          ? candidate
          : best,
      );
      const source = datedPhotos.length
        ? nearest.image
        : genericPhotos[index % genericPhotos.length];
      return {
        day: day.day,
        variants: [{
          label: copy.routeScenes,
          image: { ...source, caption: describePreview(source.alt) },
        }],
      };
    });
  }, [
    copy.routeScenes,
    photoCopy,
    product.gallery,
    product.heroImage,
    product.itinerary,
    product.locale,
    product.routeMedia,
    product.routePhotoFallback,
  ]);
  const withoutDayPhoto = product.routePhotoFallback === false && !routeMedia[activeIndex];
  const activeImage = routeMedia[activeIndex]?.variants[0]?.image ?? product.heroImage;

  useEffect(() => {
    const explorer = explorerRef.current;
    if (!explorer || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(max-width: 760px)").matches) return;

    const days = Array.from(
      explorer.querySelectorAll<HTMLElement>("[data-route-day]"),
    );
    const visibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });
        const mostVisible = Array.from(visibility.entries()).sort(
          (left, right) => right[1] - left[1],
        )[0];
        if (!mostVisible || mostVisible[1] <= 0) return;
        const nextIndex = Number(
          (mostVisible[0] as HTMLElement).dataset.routeDay ?? 0,
        );
        setActiveIndex(nextIndex);
      },
      {
        rootMargin: "-22% 0px -32% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8],
      },
    );

    days.forEach((day) => observer.observe(day));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.routeExplorer} ref={explorerRef}>
      <ol aria-label={copy.routeLabel} className={styles.routeList}>
        {product.itinerary.map((day, index) => {
          const dayMedia = routeMedia[index];

          return (
            <li
              aria-current={activeIndex === index ? "step" : undefined}
              data-route-day={index}
              key={day.day}
            >
              <article className={styles.routeDay}>
                <div className={styles.routeDayMeta}>
                  <span className={styles.routeDayNumber}>
                    {String(day.day).padStart(2, "0")}
                  </span>
                  <small>{copy.dayLabel(day.day)}</small>
                </div>
                <h3>{day.title}</h3>
                <p>{day.description}</p>
                {dayMedia ? (
                  <ShanghaiJiangnanMobileDayMedia
                    dayLabel={copy.dayLabel(day.day)}
                    scenesLabel={copy.routeScenes}
                    variants={dayMedia.variants}
                  />
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>

      <figure className={styles.routeMedia}>
        <div className={styles.routeImageFrame} data-empty={withoutDayPhoto ? "true" : undefined}>
          {withoutDayPhoto ? null : <Image
            alt={activeImage.alt}
            fill
            key={`${activeIndex}-${activeImage.src}`}
            sizes="(max-width: 860px) 92vw, 48vw"
            src={activeImage.src}
            style={{ objectPosition: activeImage.objectPosition }}
          />}
        </div>
        <figcaption>{withoutDayPhoto ? noDayPhotoCopy[product.locale] : activeImage.caption}</figcaption>
      </figure>
    </div>
  );
}
