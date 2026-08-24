"use client";

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
  PrivateTourLocale,
} from "../lib/privateTourProducts";
import { GuideCtaLink } from "./GuideCtaLink";
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
    routeLabel: string;
    routeScenes: string;
    dayLabel: (day: number) => string;
  }
> = {
  en: {
    nextPhoto: "Show the next journey photograph",
    choosePackage: "Choose a service option",
    chooseGroup: "Choose a published group size",
    publishedPrice: "Published starting price",
    perPerson: "per person",
    group: (count) => `${count} travellers`,
    privateTour: "private tour",
    flightsSeparate: "flights not included",
    checkDates: "Check my dates",
    otherGroups: "A different group size?",
    otherGroupsBody:
      "We recheck the rooms, luggage and vehicle before sending a written quote.",
    requestQuote: "Request a checked quote",
    routeLabel: "Choose a day to change the journey photograph",
    routeScenes: "Journey scenes",
    dayLabel: (day) => `Day ${day}`,
  },
  zh: {
    nextPhoto: "切换到下一张行程照片",
    choosePackage: "选择服务版本",
    chooseGroup: "选择公开报价人数",
    publishedPrice: "公开参考起价",
    perPerson: "每人",
    group: (count) => `${count} 人同行`,
    privateTour: "私家团",
    flightsSeparate: "往返机票另计",
    checkDates: "按我的日期确认",
    otherGroups: "不是 2 人或 4 人？",
    otherGroupsBody: "我们会按实际房间、行李和车型重新核价，并发出书面报价。",
    requestQuote: "联系人工核价",
    routeLabel: "选择一天，切换对应的行程照片",
    routeScenes: "当天场景",
    dayLabel: (day) => `第 ${day} 天`,
  },
  ko: {
    nextPhoto: "다음 여행 사진 보기",
    choosePackage: "서비스 유형 선택",
    chooseGroup: "공개 가격 인원 선택",
    publishedPrice: "공개 참고 시작가",
    perPerson: "1인",
    group: (count) => `${count}명 기준`,
    privateTour: "프라이빗 투어",
    flightsSeparate: "항공권 별도",
    checkDates: "내 날짜로 확인하기",
    otherGroups: "2명 또는 4명이 아닌가요?",
    otherGroupsBody:
      "실제 객실, 수하물과 차량을 다시 확인한 뒤 서면 견적을 드립니다.",
    requestQuote: "인원별 견적 요청하기",
    routeLabel: "날짜를 선택해 여행 사진을 바꾸세요",
    routeScenes: "오늘의 장면",
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
  const [packageId, setPackageId] = useState(product.packages[0].id);
  const [travellers, setTravellers] = useState(2);
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
                  onClick={() => setPackageId(candidate.id)}
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
              onClick={() => setTravellers(row.travelers)}
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

      <div className={styles.priceConsoleActions}>
        <GuideCtaLink
          className={styles.primaryAction}
          guideId={product.id}
          href={inquiryHref}
          locale={product.locale}
          position="header"
        >
          {copy.checkDates}
          <ArrowRight aria-hidden="true" size={17} />
        </GuideCtaLink>
        <div className={styles.otherGroupCopy}>
          <strong>{copy.otherGroups}</strong>
          <span>{copy.otherGroupsBody}</span>
          <GuideCtaLink
            guideId={product.id}
            href={inquiryHref}
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
