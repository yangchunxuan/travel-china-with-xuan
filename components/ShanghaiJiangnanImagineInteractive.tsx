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
import { privateTourCurrencyNote } from "../lib/privateTourCurrencyNote";
import { collectPrivateTourPhotos, mergePrivateTourRouteMedia, pickVisibleRouteDay, privateTourImageSizes } from "../lib/privateTourMedia";
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

const mediaControlCopy = {
  en: { previous: "Previous photo", next: "Next photo", pause: "Pause slideshow", play: "Play slideshow", unavailable: "Photo unavailable", count: "Journey photographs" },
  zh: { previous: "上一张照片", next: "下一张照片", pause: "暂停轮播", play: "播放轮播", unavailable: "照片暂时无法显示", count: "行程照片" },
  ko: { previous: "이전 사진", next: "다음 사진", pause: "슬라이드쇼 일시 정지", play: "슬라이드쇼 재생", unavailable: "사진을 표시할 수 없습니다", count: "여행 사진" },
  ja: { previous: "前の写真", next: "次の写真", pause: "スライドショーを一時停止", play: "スライドショーを再生", unavailable: "写真を表示できません", count: "旅の写真" },
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
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [failedPhotos, setFailedPhotos] = useState<ReadonlySet<string>>(new Set());
  const copy = photoCopy ?? interactionCopy[product.locale];
  const controls = mediaControlCopy[photoCopy ? "ja" : product.locale];
  const images = useMemo(
    () => collectPrivateTourPhotos(product).filter((image) => !failedPhotos.has(image.src)),
    [product.gallery, product.heroImage, product.routeMedia, failedPhotos],
  );
  const currentIndex = images.length ? activeIndex % images.length : 0;
  const current = images[currentIndex];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || hidden || reducedMotion || images.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [images.length, paused, hidden, reducedMotion]);

  const move = (delta: number) => {
    if (!images.length) return;
    setActiveIndex((current) => (current + delta + images.length) % images.length);
  };
  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  };

  return (
    <figure
      className={styles.heroDeck}
      data-tour-hero
      data-photo-count={images.length}
      data-photo-index={currentIndex}
      onBlurCapture={handleBlur}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={(event) => setPaused(event.currentTarget.contains(document.activeElement))}
    >
      <button
        aria-label={images.length > 1 ? `${copy.nextPhoto}: ${images[(currentIndex + 1) % images.length].alt}` : controls.count}
        className={styles.deckStage}
        disabled={images.length < 2}
        type="button"
        onClick={() => move(1)}
      >
        {Array.from({ length: Math.min(4, images.length) }, (_, depth) => {
          const image = images[(currentIndex + depth) % images.length];
          return (
            <span
              aria-hidden={depth === 0 ? undefined : "true"}
              className={styles.deckCard}
              data-visible="true"
              data-source-src={image.src}
              key={image.src}
              style={{ "--deck-depth": depth } as DeckStyle}
            >
              <Image
                alt={depth === 0 ? image.alt : ""}
                fetchPriority={currentIndex === 0 && depth === 0 ? "high" : undefined}
                fill
                priority={currentIndex === 0 && depth === 0}
                sizes={privateTourImageSizes(image, "hero")}
                src={image.src}
                style={{ objectPosition: image.objectPosition, objectFit: image.height > image.width ? "contain" : "cover" }}
                onError={() => setFailedPhotos((existing) => new Set([...existing, image.src]))}
              />
            </span>
          );
        })}
        {!current ? <span className={styles.routeMediaEmpty}>{controls.unavailable}</span> : null}
      </button>
      <figcaption className={styles.deckCaption}>
        <span>{current?.caption ?? controls.unavailable}</span>
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
          {japaneseCopy && japaneseContactHrefs ? <JapaneseTourContactLink hrefs={japaneseContactHrefs}>
            {copy.requestQuote}
            <ArrowRight aria-hidden="true" size={15} />
          </JapaneseTourContactLink> : <GuideCtaLink
            guideId={product.id}
            href={selectedInquiryHref}
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

function ShanghaiJiangnanDayMedia({
  dayLabel,
  scenesLabel,
  variants,
  title,
  unavailable,
  mobile = true,
  onInteract,
}: {
  dayLabel: string;
  scenesLabel: string;
  variants: LocalizedPrivateTourProduct["routeMedia"][number]["variants"];
  title: string;
  unavailable: string;
  mobile?: boolean;
  onInteract?: () => void;
}) {
  const [activeVariant, setActiveVariant] = useState(0);
  const [failedPhotos, setFailedPhotos] = useState<ReadonlySet<string>>(new Set());
  const available = variants.filter((variant) => !failedPhotos.has(variant.image.src));
  const currentIndex = available.length ? activeVariant % available.length : 0;
  const selected = available[currentIndex];

  return (
    <figure className={mobile ? styles.routeMobileMedia : styles.routeMedia} data-route-photo={mobile ? "mobile" : "desktop"} onFocusCapture={onInteract} onPointerDownCapture={onInteract}>
      {!mobile ? <p className={styles.routePhotoHeading}>{dayLabel} · {title}</p> : null}
      <div className={mobile ? styles.routeMobileStage : styles.routeImageFrame} data-source-src={selected?.image.src ?? ""} data-empty={!selected ? "true" : undefined}>
        {selected ? (
            <span
              data-active="true"
              key={selected.image.src}
            >
              <Image
                alt={selected.image.alt}
                fill
                sizes={privateTourImageSizes(selected.image, mobile ? "day-mobile" : "day-desktop")}
                src={selected.image.src}
                style={{ objectPosition: selected.image.objectPosition, objectFit: selected.image.height > selected.image.width ? "contain" : "cover" }}
                onError={() => setFailedPhotos((existing) => new Set([...existing, selected.image.src]))}
              />
            </span>
        ) : <div className={styles.routeMediaEmpty}><span>{dayLabel}</span><strong>{title}</strong></div>}
      </div>

      {available.length > 1 ? (
        <div
          aria-label={`${dayLabel} · ${scenesLabel}`}
          className={styles.routeMediaTabs}
          role="group"
        >
          {available.map((variant, index) => (
            <button
              aria-pressed={index === currentIndex}
              data-route-scene={index}
              key={`${variant.image.src}-tab`}
              type="button"
              onClick={() => setActiveVariant(index)}
            >
              {variant.label}
            </button>
          ))}
        </div>
      ) : null}

      <figcaption aria-live="polite">{selected?.image.caption ?? (variants.length ? unavailable : "")}</figcaption>
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
  const manualSelectionRef = useRef<{ index: number; scrollY: number } | null>(null);
  const selectDay = (index: number) => {
    manualSelectionRef.current = { index, scrollY: window.scrollY };
    setActiveIndex(index);
  };
  const copy = photoCopy
    ? { ...photoCopy, dayLabel: (day: number) => `${day}${photoCopy.dayUnit}` }
    : interactionCopy[product.locale];
  const controls = mediaControlCopy[photoCopy ? "ja" : product.locale];
  const routeMedia = useMemo(() => {
    const groups = mergePrivateTourRouteMedia(product.routeMedia);
    return product.itinerary.map((day) => groups.find((group) => group.day === day.day) ?? null);
  }, [product.itinerary, product.routeMedia]);
  const activeDay = product.itinerary[activeIndex] ?? product.itinerary[0];

  useEffect(() => {
    const explorer = explorerRef.current;
    if (!explorer) return;

    const days = Array.from(
      explorer.querySelectorAll<HTMLElement>("[data-route-day]"),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const manual = manualSelectionRef.current;
      // A pending scroll frame from focusing a title must not undo that click.
      // Reading resumes following the viewport once the user scrolls again.
      if (manual && Math.abs(window.scrollY - manual.scrollY) < 1) return;
      manualSelectionRef.current = null;
      const bounds = explorer.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const anchor = Math.min(Math.max(140, window.innerHeight * 0.34), window.innerHeight * 0.6);
      const nextIndex = pickVisibleRouteDay(days.map((day, index) => {
        const rect = day.getBoundingClientRect();
        return { index, top: rect.top, bottom: rect.bottom };
      }), anchor);
      if (nextIndex !== null) setActiveIndex(nextIndex);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const resize = () => { manualSelectionRef.current = null; schedule(); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, [product.slug, product.itinerary.length]);

  return (
    <div className={styles.routeExplorer} data-route-explorer data-active-day={activeDay?.day} ref={explorerRef}>
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
                <h3><button className={styles.routeDaySelect} type="button" data-route-day-select={day.day} aria-label={`${copy.dayLabel(day.day)}: ${day.title}`} aria-pressed={activeIndex === index} onClick={() => selectDay(index)} onFocus={() => selectDay(index)}>{day.title}</button></h3>
                <p>{day.description}</p>
                {dayMedia ? (
                  <ShanghaiJiangnanDayMedia
                    key={day.day}
                    dayLabel={copy.dayLabel(day.day)}
                    scenesLabel={copy.routeScenes}
                    variants={dayMedia.variants}
                    title={day.title}
                    unavailable={controls.unavailable}
                  />
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>

      {activeDay ? <ShanghaiJiangnanDayMedia
        key={`desktop-${activeDay.day}`}
        dayLabel={copy.dayLabel(activeDay.day)}
        scenesLabel={copy.routeScenes}
        variants={routeMedia[activeIndex]?.variants ?? []}
        title={activeDay.title}
        unavailable={controls.unavailable}
        mobile={false}
        onInteract={() => selectDay(activeIndex)}
      /> : null}
    </div>
  );
}
