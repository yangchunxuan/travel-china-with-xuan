"use client";

import { Fragment, useId, useState, type ReactNode } from "react";
import type {
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

function FacetGroup({
  label,
  allLabel,
  options,
  total,
  value,
  onChange,
}: {
  label: string;
  allLabel: string;
  options: readonly PrivateTourFacetOption[];
  total: number;
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const labelId = useId();
  return (
    <div className={styles.filterGroup} role="group" aria-labelledby={labelId}>
      <span id={labelId}>{label}</span>
      <button
        type="button"
        className={styles.filterPill}
        aria-pressed={value === null}
        onClick={() => onChange(null)}
      >
        {allLabel}
        <small>{total}</small>
      </button>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={styles.filterPill}
          aria-pressed={value === option.id}
          onClick={() => onChange(value === option.id ? null : option.id)}
        >
          {option.label}
          <small>{option.count}</small>
        </button>
      ))}
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
 * short staggered entrance.
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
  const total = facets.items.length;
  const shown = facets.items.filter(
    (item) =>
      (selection.region === null || item.region === selection.region) &&
      (selection.length === null || item.length === selection.length) &&
      (selection.price === null || item.price === selection.price),
  ).length;
  const isFiltered =
    selection.region !== null ||
    selection.length !== null ||
    selection.price !== null;

  const apply = (next: Selection) => {
    setSelection(next);
    setPass((current) => (current === "a" ? "b" : "a"));
  };
  const update = (key: FacetKey) => (value: string | null) =>
    apply({ ...selection, [key]: value });

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
        >
          {labels.group}
          <span aria-hidden="true">+</span>
        </button>
        <div id={groupsId} className={styles.filterGroups} data-open={open ? "true" : "false"}>
          <div className={styles.filterGroupsInner}>
            <FacetGroup
              label={labels.region}
              allLabel={labels.all}
              options={facets.regions}
              total={total}
              value={selection.region}
              onChange={update("region")}
            />
            <FacetGroup
              label={labels.length}
              allLabel={labels.all}
              options={facets.lengths}
              total={total}
              value={selection.length}
              onChange={update("length")}
            />
            <FacetGroup
              label={labels.price}
              allLabel={labels.all}
              options={facets.prices}
              total={total}
              value={selection.price}
              onChange={update("price")}
            />
          </div>
        </div>
        <p className={styles.filterCount} aria-live="polite">
          <CountLine template={labels.count} shown={shown} total={total} />
          {isFiltered && (
            <button
              type="button"
              className={styles.filterReset}
              onClick={() => apply(emptySelection)}
            >
              {labels.reset}
            </button>
          )}
        </p>
      </div>
      <ol
        className={styles.quickList}
        data-pass={pass ?? undefined}
        data-region={selection.region ?? undefined}
        data-length={selection.length ?? undefined}
        data-price={selection.price ?? undefined}
      >
        {children}
      </ol>
      {shown === 0 && <p className={styles.filterEmpty}>{labels.empty}</p>}
    </>
  );
}
