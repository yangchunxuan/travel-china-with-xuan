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
import { usePrivateTourSelection, useSelectedPrivateTourInquiryHref } from "./PrivateTourSelection";
import { isJiangnanTour } from "../lib/tourContactDraft";
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

type DeckStyle = CSSProperties & { "--deck-depth": number };

export function ShanghaiJiangnanHeroDeck({
  product,
}: {
  product: LocalizedPrivateTourProduct;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const copy = interactionCopy[product.locale];
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
}: {
  product: LocalizedPrivateTourProduct;
  inquiryHref: string;
}) {
  const hasPublishedPrice = product.packages.some(
    (tourPackage) => tourPackage.rows.length > 0,
  );
  if (!hasPublishedPrice) {
    return (
      <div className={styles.priceConsole}>
        <div className={styles.priceResult}>
          <span>{interactionCopy[product.locale].quoteOnlyTitle}</span>
          <p>{interactionCopy[product.locale].quoteOnlyBody}</p>
        </div>
        <div className={styles.priceConsoleActions}>
          <GuideCtaLink
            className={styles.primaryAction}
            guideId={product.id}
            href={inquiryHref}
            locale={product.locale}
            position="header"
          >
            {interactionCopy[product.locale].requestQuote}
            <ArrowRight aria-hidden="true" size={18} />
          </GuideCtaLink>
        </div>
      </div>
    );
  }
  return (
    <PublishedPrivateTourPriceConsole
      inquiryHref={inquiryHref}
      product={product}
    />
  );
}

function PublishedPrivateTourPriceConsole({
  product,
  inquiryHref,
}: {
  product: LocalizedPrivateTourProduct;
  inquiryHref: string;
}) {
  const selectionContext = usePrivateTourSelection();
  if (!selectionContext) throw new Error("Private tour price needs selection context");
  const { selection, setSelection } = selectionContext;
  const packageId = selection.packageId;
  const travellers = selection.travelers;
  const selectedInquiryHref = useSelectedPrivateTourInquiryHref(inquiryHref) ?? inquiryHref;
  const copy = interactionCopy[product.locale];
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
        <p>{copy.chooseGroup}</p>
        <div
          className={styles.priceChoices}
          role="group"
          aria-label={copy.chooseGroup}
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
              <span>{copy.group(row.travelers)}</span>
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
          {copy.perPerson} · {copy.group(activeRow.travelers)} ·{" "}
          {copy.privateTour} · {tourPackage.label} · {copy.flightsSeparate}
        </small>
      </div>

      {product.slug === "beijing-highlights-5-day-private-tour" ? (
        <TourPriceScope route="beijing" locale={product.locale} detailsHref="#tour-price-details" />
      ) : null}

      <div className={styles.priceConsoleActions}>
        <GuideCtaLink
          className={styles.primaryAction}
          guideId={product.id}
          href={selectedInquiryHref}
          locale={product.locale}
          position="header"
        >
          {copy.checkDates}
          <ArrowRight aria-hidden="true" size={17} />
        </GuideCtaLink>
        <TourWhatsAppLink locale={product.locale} slug={product.slug} />
        <div className={styles.otherGroupCopy}>
          <strong>{copy.otherGroups}</strong>
          <span>{copy.otherGroupsBody}</span>
          <GuideCtaLink
            guideId={product.id}
            href={isJiangnanTour(product.slug) ? inquiryHref : selectedInquiryHref}
            locale={product.locale}
            position="inline"
          >
            {copy.requestQuote}
            <ArrowRight aria-hidden="true" size={15} />
          </GuideCtaLink>
        </div>
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
}: {
  product: LocalizedPrivateTourProduct;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const explorerRef = useRef<HTMLDivElement>(null);
  const copy = interactionCopy[product.locale];
  const routeMedia = useMemo(
    () =>
      product.itinerary.map((day) => {
        const assigned = product.routeMedia.find(
          (group) => group.day === day.day,
        );
        return assigned?.variants.length ? assigned : null;
      }),
    [product.itinerary, product.routeMedia],
  );
  const activeDay = product.itinerary[activeIndex] ?? product.itinerary[0];
  const activeImage = routeMedia[activeIndex]?.variants[0]?.image;

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

      {activeImage ? (
        <figure className={styles.routeMedia}>
          <div className={styles.routeImageFrame}>
            <Image
              alt={activeImage.alt}
              fill
              key={`${activeIndex}-${activeImage.src}`}
              sizes="(max-width: 860px) 92vw, 48vw"
              src={activeImage.src}
              style={{ objectPosition: activeImage.objectPosition }}
            />
          </div>
          <figcaption>{activeImage.caption}</figcaption>
        </figure>
      ) : (
        <aside
          aria-live="polite"
          className={`${styles.routeMedia} ${styles.routeMediaEmpty}`}
        >
          <span>{copy.dayLabel(activeDay.day)}</span>
          <strong>{activeDay.title}</strong>
        </aside>
      )}
    </div>
  );
}
