"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./HomepageGuideRail.module.css";

const noExcludedItemIds: readonly string[] = [];

export interface HomepageGuideRailImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface HomepageGuideRailItemBase<Category extends string> {
  id: string;
  category: Category;
  title: string;
  eyebrow: string;
  description: string;
  image: HomepageGuideRailImage;
  href: string;
  linkLabel: string;
}

export type HomepageGuideRailItem<Category extends string = string> =
  | (HomepageGuideRailItemBase<Category> & { kind: "tour" })
  | (HomepageGuideRailItemBase<Category> & { kind: "guide" });

export interface HomepageGuideRailControlLabels {
  allCategories: string;
  categoryFilter: string;
}

export interface HomepageGuideRailProps<Category extends string = string> {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: readonly HomepageGuideRailItem<Category>[];
  catalogUrl?: string;
  excludedItemIds?: readonly string[];
  categoryLabels: Readonly<Record<Category, string>>;
  controlLabels: HomepageGuideRailControlLabels;
  viewAllHref?: string;
  viewAllLabel?: string;
  onItemClick?: (item: HomepageGuideRailItem<Category>) => void;
}

/**
 * A native horizontal list for localized tours and editorial guides.
 *
 * Scrolling, snapping and links keep their browser behavior. The component
 * adds category filters without autoplay, clones or analytics dependencies.
 */
export function HomepageGuideRail<Category extends string = string>({
  id,
  eyebrow,
  title,
  description,
  items,
  catalogUrl,
  excludedItemIds = noExcludedItemIds,
  categoryLabels,
  controlLabels,
  viewAllHref,
  viewAllLabel,
  onItemClick,
}: HomepageGuideRailProps<Category>) {
  const generatedId = useId().replaceAll(":", "");
  const sectionId = id ?? `homepage-guide-rail-${generatedId}`;
  const titleId = `${sectionId}-title`;
  const listId = `${sectionId}-items`;
  const listRef = useRef<HTMLOListElement>(null);
  const catalogRequestStartedRef = useRef(false);
  const excludedItemIdSet = useMemo(
    () => new Set(excludedItemIds),
    [excludedItemIds],
  );
  const initialItems = useMemo(
    () => items.filter((item) => !excludedItemIdSet.has(item.id)),
    [excludedItemIdSet, items],
  );
  const [catalogItems, setCatalogItems] = useState(initialItems);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const itemCategories = new Set(catalogItems.map((item) => item.category));
  const visibleCategories = (
    Object.entries(categoryLabels) as [Category, string][]
  ).filter(([category]) => itemCategories.has(category));
  const activeCategoryIsAvailable =
    activeCategory === null || itemCategories.has(activeCategory);
  const resolvedCategory = activeCategoryIsAvailable ? activeCategory : null;
  const visibleItems =
    resolvedCategory === null
      ? catalogItems
      : catalogItems.filter((item) => item.category === resolvedCategory);

  const ensureCompleteCatalog = useCallback(async () => {
    if (!catalogUrl || catalogRequestStartedRef.current) return;

    catalogRequestStartedRef.current = true;
    try {
      const response = await fetch(catalogUrl, {
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Guide catalog request failed");
      const payload: unknown = await response.json();
      if (!Array.isArray(payload)) throw new Error("Guide catalog was invalid");
      const completeItems = payload
        .filter(
          (item): item is HomepageGuideRailItem<Category> =>
            Boolean(item) &&
            typeof item === "object" &&
            "id" in item &&
            typeof item.id === "string" &&
            "kind" in item &&
            (item.kind === "tour" || item.kind === "guide") &&
            "category" in item &&
            typeof item.category === "string" &&
            "title" in item &&
            typeof item.title === "string" &&
            "eyebrow" in item &&
            typeof item.eyebrow === "string" &&
            "description" in item &&
            typeof item.description === "string" &&
            "href" in item &&
            typeof item.href === "string" &&
            item.href.startsWith("/") &&
            "linkLabel" in item &&
            typeof item.linkLabel === "string" &&
            "image" in item &&
            Boolean(item.image) &&
            typeof item.image === "object" &&
            "src" in item.image &&
            typeof item.image.src === "string" &&
            item.image.src.startsWith("/") &&
            "alt" in item.image &&
            typeof item.image.alt === "string" &&
            "width" in item.image &&
            typeof item.image.width === "number" &&
            "height" in item.image &&
            typeof item.image.height === "number",
        )
        .filter((item) => !excludedItemIdSet.has(item.id));
      if (completeItems.length < initialItems.length) {
        throw new Error("Guide catalog was incomplete");
      }
      setCatalogItems(completeItems);
    } catch {
      catalogRequestStartedRef.current = false;
    }
  }, [catalogUrl, excludedItemIdSet, initialItems.length]);

  useEffect(() => {
    setCatalogItems(initialItems);
    catalogRequestStartedRef.current = false;
  }, [initialItems]);

  const updateCatalogProgress = useCallback(() => {
    const list = listRef.current;

    if (!list) return;

    const maximumScroll = Math.max(0, list.scrollWidth - list.clientWidth);
    const currentScroll = Math.min(
      maximumScroll,
      Math.max(0, list.scrollLeft),
    );
    if (maximumScroll - currentScroll <= list.clientWidth * 1.25) {
      void ensureCompleteCatalog();
    }
  }, [ensureCompleteCatalog]);

  useEffect(() => {
    if (!activeCategoryIsAvailable) {
      setActiveCategory(null);
    }
  }, [activeCategoryIsAvailable]);

  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    list.scrollLeft = 0;
    updateCatalogProgress();
  }, [resolvedCategory, updateCatalogProgress]);

  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    let animationFrame: number | null = null;
    const queueCatalogProgressUpdate = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateCatalogProgress();
      });
    };

    queueCatalogProgressUpdate();
    list.addEventListener("scroll", queueCatalogProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", queueCatalogProgressUpdate);

    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(queueCatalogProgressUpdate)
        : null;
    resizeObserver?.observe(list);

    return () => {
      list.removeEventListener("scroll", queueCatalogProgressUpdate);
      window.removeEventListener("resize", queueCatalogProgressUpdate);
      resizeObserver?.disconnect();

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [updateCatalogProgress]);

  useEffect(() => {
    updateCatalogProgress();
  }, [updateCatalogProgress, visibleItems.length]);

  return (
    <section
      aria-labelledby={titleId}
      className={styles.section}
      id={sectionId}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.introduction}>
            {eyebrow ? <p className={styles.sectionEyebrow}>{eyebrow}</p> : null}
            <h2 id={titleId}>{title}</h2>
            {description ? (
              <p className={styles.sectionDescription}>{description}</p>
            ) : null}
          </div>

          <div className={styles.toolbar}>
            {visibleCategories.length > 0 ? (
              <div
                aria-label={controlLabels.categoryFilter}
                className={styles.categories}
                role="group"
              >
                <button
                  aria-controls={listId}
                  aria-pressed={resolvedCategory === null}
                  className={styles.categoryButton}
                  onClick={() => {
                    setActiveCategory(null);
                    void ensureCompleteCatalog();
                  }}
                  type="button"
                >
                  {controlLabels.allCategories}
                </button>
                {visibleCategories.map(([category, label]) => (
                  <button
                    aria-controls={listId}
                    aria-pressed={resolvedCategory === category}
                    className={styles.categoryButton}
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      void ensureCompleteCatalog();
                    }}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}

            <div className={styles.actions}>
              {viewAllHref && viewAllLabel ? (
                <a className={styles.viewAll} href={viewAllHref}>
                  {viewAllLabel}
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <ol
          aria-labelledby={titleId}
          className={styles.list}
          id={listId}
          ref={listRef}
        >
          {visibleItems.map((item) => (
            <li
              className={styles.item}
              data-category={item.category}
              data-kind={item.kind}
              key={`${item.kind}:${item.id}`}
            >
              <a
                className={styles.card}
                href={item.href}
                onClick={() => onItemClick?.(item)}
              >
                <span className={styles.imageFrame}>
                  <img
                    alt={item.image.alt}
                    className={styles.image}
                    decoding="async"
                    height={item.image.height}
                    loading="lazy"
                    src={item.image.src}
                    width={item.image.width}
                  />
                </span>
                <div className={styles.cardContent}>
                  <span className={styles.cardEyebrow}>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <span className={styles.cardLinkLabel}>
                    <span>{item.linkLabel}</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
