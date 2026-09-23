"use client";

import {
  Fragment,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type {
  PrivateTourFacetItem,
  PrivateTourFacetOption,
  PrivateTourFacets,
} from "../lib/privateTourCatalogFacets";
import { RollingNumber } from "./motion/RollingNumber";
import styles from "./PrivateToursHubPage.module.css";

export interface PrivateTourCatalogFilterLabels {
  readonly group: string;
  readonly region: string;
  readonly length: string;
  readonly price: string;
  readonly all: string;
  readonly reset: string;
  /** Template with {shown} and {total} placeholders. */
  readonly count: string;
  readonly empty: string;
}

type FacetKey = "region" | "length" | "price";
type Selection = Readonly<Record<FacetKey, string | null>>;

const emptySelection: Selection = { region: null, length: null, price: null };
const facetKeys: readonly FacetKey[] = ["region", "length", "price"];

function matches(item: PrivateTourFacetItem, selection: Selection, ignore?: FacetKey) {
  return facetKeys.every(
    (key) => key === ignore || selection[key] === null || item[key] === selection[key],
  );
}

function FacetGroup({
  label,
  allLabel,
  options,
  facet,
  items,
  selection,
  onChange,
  firstPillRef,
}: {
  label: string;
  allLabel: string;
  options: readonly PrivateTourFacetOption[];
  facet: FacetKey;
  items: readonly PrivateTourFacetItem[];
  selection: Selection;
  onChange: (next: string | null) => void;
  firstPillRef?: RefObject<HTMLButtonElement | null>;
}) {
  const labelId = useId();
  const value = selection[facet];
  // Counts follow the other active filters, so a pill never promises routes
  // that the current combination would hide.
  const pool = items.filter((item) => matches(item, selection, facet));
  const countFor = (id: string) => pool.filter((item) => item[facet] === id).length;
  return (
    <div className={styles.filterGroup} role="group" aria-labelledby={labelId}>
      <span id={labelId}>{label}</span>
      <div className={styles.filterPills}>
        <button
          type="button"
          className={styles.filterPill}
          aria-pressed={value === null}
          data-all=""
          onClick={() => onChange(null)}
          ref={firstPillRef}
        >
          {allLabel}
          <small><span className={styles.visuallyHidden}>, </span>{pool.length}</small>
        </button>
        {options.map((option) => {
          const count = countFor(option.id);
          const unavailable = count === 0 && value !== option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={styles.filterPill}
              aria-disabled={unavailable || undefined}
              aria-pressed={value === option.id}
              onClick={() => {
                if (unavailable) return;
                onChange(value === option.id ? null : option.id);
              }}
            >
              {option.label}
              <small><span className={styles.visuallyHidden}>, </span>{count}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** "Showing {shown} of {total} routes" with the shown number rolling. */
function CountLine({ template, shown, total }: { template: string; shown: number; total: number }) {
  const parts = template.split(/(\{shown\}|\{total\})/u);
  return (
    <span>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {part === "{shown}" ? (
            <RollingNumber value={shown} />
          ) : part === "{total}" ? (
            String(total)
          ) : (
            part
          )}
        </Fragment>
      ))}
    </span>
  );
}

/**
 * Pure front-end narrowing of the tour list. The list itself is rendered on
 * the server and passed in as children, so every card, link and price is in
 * the static HTML; this component only toggles data attributes that the
 * stylesheet uses to hide non-matching cards. Nothing here reads or writes
 * the URL. Each change flips `data-pass` so the remaining cards replay a
 * short entrance, staggered in their visible order.
 */
export function PrivateTourCatalogFilter({
  children,
  facets,
  labels,
}: {
  children: ReactNode;
  facets: PrivateTourFacets;
  labels: PrivateTourCatalogFilterLabels;
}) {
  const [selection, setSelection] = useState<Selection>(emptySelection);
  const [pass, setPass] = useState<"a" | "b" | null>(null);
  const [open, setOpen] = useState(false);
  const groupsId = useId();
  const listRef = useRef<HTMLOListElement>(null);
  const firstPillRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const total = facets.items.length;
  const shown = facets.items.filter((item) => matches(item, selection)).length;
  const activeCount = facetKeys.filter((key) => selection[key] !== null).length;
  const isFiltered = activeCount > 0;

  // Stagger the re-entrance by each card's position among the visible cards,
  // not its catalog position, so the first visible card always leads.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let visibleIndex = 0;
    list.querySelectorAll<HTMLLIElement>(":scope > li[data-tour-id]").forEach((item) => {
      const facetItem = facets.items.find((candidate) => candidate.id === item.dataset.tourId);
      const visible = facetItem ? matches(facetItem, selection) : true;
      item.style.setProperty("--pass-index", String(visible ? visibleIndex++ : 0));
    });
  }, [selection, facets.items]);

  const apply = (next: Selection) => {
    setSelection(next);
    setPass((current) => (current === "a" ? "b" : "a"));
  };
  const update = (key: FacetKey) => (value: string | null) =>
    apply({ ...selection, [key]: value });
  const reset = () => {
    apply(emptySelection);
    // The reset control disappears once nothing is filtered; keep focus on
    // the filters instead of letting it fall back to the page. On phones the
    // pills may be folded away, so the toggle takes focus instead.
    const pill = firstPillRef.current;
    const pillVisible = pill ? (pill.checkVisibility?.({ visibilityProperty: true }) ?? true) : false;
    (pillVisible ? pill : toggleRef.current)?.focus({ preventScroll: true });
  };
  const countText = labels.count
    .replace("{shown}", String(shown))
    .replace("{total}", String(total));

  return (
    <>
      <div className={styles.filterBar} role="group" aria-label={labels.group}>
        {/* Phones start with the three pill groups folded behind one button. */}
        <button
          type="button"
          className={styles.filterToggle}
          aria-expanded={open}
          aria-controls={groupsId}
          onClick={() => setOpen((current) => !current)}
          ref={toggleRef}
        >
          <span className={styles.filterToggleLabel}>
            {labels.group}
            {activeCount > 0 ? <small className={styles.filterBadge}>{activeCount}</small> : null}
          </span>
          <span aria-hidden="true" className={styles.filterToggleIcon}>+</span>
        </button>
        <div id={groupsId} className={styles.filterGroups} data-open={open ? "true" : "false"}>
          <div className={styles.filterGroupsInner}>
            <FacetGroup
              label={labels.region}
              allLabel={labels.all}
              options={facets.regions}
              facet="region"
              items={facets.items}
              selection={selection}
              onChange={update("region")}
              firstPillRef={firstPillRef}
            />
            <FacetGroup
              label={labels.length}
              allLabel={labels.all}
              options={facets.lengths}
              facet="length"
              items={facets.items}
              selection={selection}
              onChange={update("length")}
            />
            <FacetGroup
              label={labels.price}
              allLabel={labels.all}
              options={facets.prices}
              facet="price"
              items={facets.items}
              selection={selection}
              onChange={update("price")}
            />
          </div>
        </div>
        {/* The visible count rolls; screen readers get one clean sentence. */}
        <div className={styles.filterCount}>
          <span aria-hidden="true">
            <CountLine template={labels.count} shown={shown} total={total} />
          </span>
          {isFiltered && (
            <button
              type="button"
              className={styles.filterReset}
              onClick={reset}
            >
              {labels.reset}
            </button>
          )}
          <span aria-atomic="true" aria-live="polite" className={styles.visuallyHidden}>
            {countText}
          </span>
        </div>
      </div>
      <ol
        className={styles.quickList}
        data-pass={pass ?? undefined}
        data-region={selection.region ?? undefined}
        data-length={selection.length ?? undefined}
        data-price={selection.price ?? undefined}
        ref={listRef}
      >
        {children}
      </ol>
      {shown === 0 && (
        <div className={styles.filterEmpty}>
          <p>{labels.empty}</p>
          <button type="button" className={styles.filterEmptyReset} onClick={reset}>
            {labels.reset}
          </button>
        </div>
      )}
    </>
  );
}
