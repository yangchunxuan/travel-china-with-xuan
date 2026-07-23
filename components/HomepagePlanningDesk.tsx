"use client";

import {
  ArrowRight,
  Check,
  Compass,
  FileCheck2,
  Handshake,
  MapPinned,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getHomepagePlanningDeskCopy,
  type HomepagePlanningIntentId,
  type HomepagePlanningIntentOption,
} from "../lib/homepagePlanningDesk";
import styles from "./HomegroundHomePage.module.css";

const intentIcons = {
  "itinerary-review": FileCheck2,
  "route-build": MapPinned,
  "full-trip-support": Handshake,
  explore: Compass,
} as const;

function IntentOptionContent({
  option,
  compact = false,
}: {
  option: HomepagePlanningIntentOption;
  compact?: boolean;
}) {
  const Icon = intentIcons[option.id];

  return (
    <>
      <span className={styles.intentOptionIcon} aria-hidden="true">
        <Icon size={compact ? 18 : 21} strokeWidth={1.8} />
      </span>
      <span className={styles.intentOptionBody}>
        {!compact && (
          <span className={styles.intentStatement}>{option.statement}</span>
        )}
        <span className={styles.intentOptionHeading}>
          <strong>{option.label}</strong>
          <span>{option.priceLabel}</span>
        </span>
        <span className={styles.intentSummary}>{option.summary}</span>
        <span
          className={`${styles.intentScope} ${
            compact ? styles.intentScopeCompact : ""
          }`}
        >
          {option.scope}
        </span>
      </span>
    </>
  );
}

export function HomepagePlanningIntentSelector({
  locale,
  value,
  onContinue,
  onCancel,
}: {
  locale: HomegroundLocale;
  value: HomepagePlanningIntentId | null;
  onContinue: (intent: HomepagePlanningIntentId) => void;
  onCancel?: () => void;
}) {
  const copy = getHomepagePlanningDeskCopy(locale);
  const [draft, setDraft] = useState<HomepagePlanningIntentId | "">(
    value ?? "",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(value ?? "");
    setError("");
  }, [value]);

  const paidOptions = useMemo(
    () => copy.options.filter((option) => option.kind === "paid"),
    [copy.options],
  );
  const freeOption = copy.options.find((option) => option.kind === "free")!;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft) {
      setError(copy.requiredError);
      return;
    }

    setError("");
    onContinue(draft);
  };

  const renderOption = (option: HomepagePlanningIntentOption) => {
    const selected = draft === option.id;
    return (
      <label
        className={`${styles.intentOption} ${
          option.kind === "free" ? styles.intentOptionFree : ""
        }`}
        data-selected={selected ? "true" : undefined}
        key={option.id}
      >
        <input
          type="radio"
          name="homeground-planning-intent"
          value={option.id}
          checked={selected}
          onChange={() => {
            setDraft(option.id);
            setError("");
          }}
        />
        <span className={styles.intentRadio} aria-hidden="true">
          {selected && <Check size={13} strokeWidth={3} />}
        </span>
        <IntentOptionContent option={option} />
      </label>
    );
  };

  return (
    <div className={styles.intentView} data-planning-view="intent">
      <header className={styles.intentHeader}>
        <p className={styles.intentEyebrow}>{copy.eyebrow}</p>
        <h2 id="planning-intent-title" tabIndex={-1}>
          {copy.title}
        </h2>
        <p>{copy.intro}</p>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset className={styles.intentFieldset}>
          <legend className={styles.srOnly}>{copy.title}</legend>
          <div className={styles.intentPaidGrid}>
            {paidOptions.map(renderOption)}
          </div>
          <div className={styles.intentFreeRow}>{renderOption(freeOption)}</div>
        </fieldset>

        <p
          className={styles.intentError}
          aria-live="polite"
          aria-atomic="true"
        >
          {error}
        </p>

        <div className={styles.intentActions}>
          {onCancel && (
            <button
              className={styles.intentSecondaryButton}
              type="button"
              onClick={onCancel}
            >
              {copy.keepCurrent}
            </button>
          )}
          <button className={styles.intentContinueButton} type="submit">
            {copy.continue}
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </form>

      <p className={styles.intentBoundary}>{copy.boundary}</p>
    </div>
  );
}

export function HomepageSelectedIntent({
  locale,
  value,
  onChange,
  changeButtonId,
  priceLabelOverride,
  scopeOverride,
  disabled = false,
}: {
  locale: HomegroundLocale;
  value: HomepagePlanningIntentId;
  onChange: () => void;
  changeButtonId?: string;
  priceLabelOverride?: string;
  scopeOverride?: string;
  disabled?: boolean;
}) {
  const copy = getHomepagePlanningDeskCopy(locale);
  const option = copy.options.find((candidate) => candidate.id === value)!;
  const displayedOption = {
    ...option,
    priceLabel: priceLabelOverride ?? option.priceLabel,
    scope: scopeOverride ?? option.scope,
  };

  return (
    <aside
      className={styles.selectedIntent}
      data-planning-intent={value}
      aria-label={copy.selectedLabel}
    >
      <div>
        <span className={styles.selectedIntentLabel}>{copy.selectedLabel}</span>
        <IntentOptionContent option={displayedOption} compact />
      </div>
      <button
        id={changeButtonId}
        type="button"
        onClick={onChange}
        disabled={disabled}
      >
        {copy.change}
      </button>
      <p className={styles.selectedIntentBoundary}>{copy.boundary}</p>
    </aside>
  );
}

export function HomepagePlanningUpgrade({
  locale,
  onSelect,
}: {
  locale: HomegroundLocale;
  onSelect: (intent: HomepagePlanningIntentId) => void;
}) {
  const copy = getHomepagePlanningDeskCopy(locale);
  const options = copy.options.filter((option) => option.kind === "paid");

  return (
    <section className={styles.planningUpgrade} aria-labelledby="planning-upgrade-title">
      <p className={styles.intentEyebrow}>{copy.freeUpgrade.eyebrow}</p>
      <h3 id="planning-upgrade-title">{copy.freeUpgrade.title}</h3>
      <p>{copy.freeUpgrade.body}</p>
      <div
        className={styles.planningUpgradeOptions}
        role="group"
        aria-label={copy.freeUpgrade.optionLabel}
      >
        {options.map((option) => {
          const Icon = intentIcons[option.id];
          return (
            <button
              type="button"
              onClick={() => onSelect(option.id)}
              key={option.id}
            >
              <Icon aria-hidden="true" size={19} />
              <span>
                <strong>{option.label}</strong>
                <small>{option.priceLabel}</small>
              </span>
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
