"use client";

import {
  ArrowRight,
  Check,
  Compass,
  FileCheck2,
  Handshake,
  MapPinned,
  MessageCircleMore,
} from "lucide-react";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getHomepagePlanningDeskCopy,
  type HomepagePlanningIntentId,
  type HomepagePlanningIntentOption,
  type HomepageStarterIntentId,
} from "../lib/homepagePlanningDesk";
import styles from "./HomegroundHomePage.module.css";

const intentIcons = {
  conversation: MessageCircleMore,
  "itinerary-review": FileCheck2,
  "route-build": MapPinned,
  "full-trip-support": Handshake,
  explore: Compass,
} as const;

function IntentOptionContent({
  option,
  compact = false,
  showScope = true,
}: {
  option: HomepagePlanningIntentOption;
  compact?: boolean;
  showScope?: boolean;
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
        {showScope && (
          <span
            className={`${styles.intentScope} ${
              compact ? styles.intentScopeCompact : ""
            }`}
          >
            {option.scope}
          </span>
        )}
      </span>
    </>
  );
}

const unsafeStarterNoteCharacters =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069\uD800-\uDFFF]/gu;

export const maximumStarterNoteLength = 900;

export function sanitizeStarterNote(value: string): string {
  return value
    .normalize("NFC")
    .replace(unsafeStarterNoteCharacters, "")
    .slice(0, maximumStarterNoteLength);
}

export function HomepagePlanningIntentSelector({
  locale,
  value,
  starterValue,
  starterNote = "",
  onStarterNoteChange,
  onContinue,
  onCancel,
}: {
  locale: HomegroundLocale;
  value: HomepagePlanningIntentId | null;
  starterValue?: HomepageStarterIntentId | null;
  starterNote?: string;
  onStarterNoteChange?: (note: string) => void;
  onContinue: (
    intent: HomepagePlanningIntentId,
    starterIntent?: HomepageStarterIntentId,
  ) => void;
  onCancel?: () => void;
}) {
  const copy = getHomepagePlanningDeskCopy(locale);
  const [draft, setDraft] = useState<HomepageStarterIntentId | "">(
    starterValue && starterValue !== "open-text" ? starterValue : "",
  );
  const [error, setError] = useState("");
  const paidOptions = copy.options.filter(
    (option) => option.kind === "paid",
  );
  const freeOption = copy.options.find((option) => option.id === "explore")!;

  useEffect(() => {
    setDraft(
      starterValue && starterValue !== "open-text" ? starterValue : "",
    );
    setError("");
  }, [starterValue, value]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasNote = starterNote.trim().length > 0;
    if (!draft && !hasNote) {
      setError(copy.requiredError);
      return;
    }

    const selectedPrompt = draft
      ? copy.starterPrompts.find((prompt) => prompt.id === draft)
      : null;
    if (draft && !selectedPrompt) {
      setError(copy.requiredError);
      return;
    }

    setError("");
    if (selectedPrompt) {
      onContinue(selectedPrompt.planningIntent, selectedPrompt.id);
      return;
    }
    onContinue("conversation", "open-text");
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

      <form
        className={styles.intentForm}
        data-has-selection={draft ? "true" : undefined}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset
          className={styles.intentFieldset}
          aria-describedby={error ? "planning-intent-error" : undefined}
        >
          <legend className={styles.srOnly}>{copy.title}</legend>
          <div className={styles.intentStarterGrid}>
            {copy.starterPrompts.map((prompt) => {
              const selected = draft === prompt.id;
              return (
                <label
                  className={styles.intentStarterOption}
                  data-selected={selected ? "true" : undefined}
                  key={prompt.id}
                >
                  <input
                    type="radio"
                    name="homeground-planning-start"
                    value={prompt.id}
                    checked={selected}
                    onChange={() => {
                      setDraft(prompt.id);
                      setError("");
                    }}
                  />
                  <span className={styles.intentRadio} aria-hidden="true">
                    {selected && <Check size={13} strokeWidth={3} />}
                  </span>
                  <span>{prompt.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className={styles.intentNoteField}>
          <label htmlFor="planning-intent-note">
            {copy.noteLabel}{" "}
            <span className={styles.intentNoteOptional}>
              {copy.noteOptionalTag}
            </span>
          </label>
          <textarea
            id="planning-intent-note"
            name="starterNote"
            dir="auto"
            rows={3}
            maxLength={maximumStarterNoteLength}
            value={starterNote}
            aria-describedby="planning-intent-note-hint"
            onChange={(event) => {
              onStarterNoteChange?.(
                sanitizeStarterNote(event.target.value),
              );
              setError("");
            }}
          />
          <small id="planning-intent-note-hint">{copy.noteHint}</small>
        </div>

        <p
          id="planning-intent-error"
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

      <section
        className={styles.intentServiceShortcuts}
        aria-labelledby="planning-service-shortcuts-title"
      >
        <div className={styles.intentServiceShortcutsHeader}>
          <h3 id="planning-service-shortcuts-title">
            {copy.serviceShortcutLabel}
          </h3>
          <p>{copy.serviceShortcutIntro}</p>
        </div>
        <div className={styles.intentServiceShortcutList}>
          {paidOptions.map((option) => {
            const Icon = intentIcons[option.id];
            return (
              <button
                type="button"
                className={styles.intentServiceShortcut}
                onClick={() => onContinue(option.id)}
                key={option.id}
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                <span>{option.label}</span>
                <strong>{option.priceLabel}</strong>
                <ArrowRight aria-hidden="true" size={17} />
              </button>
            );
          })}
        </div>
        <p className={styles.intentSharedScope}>{copy.fixedPriceScope}</p>
      </section>

      <button
        type="button"
        className={styles.intentFreeTool}
        onClick={() => onContinue(freeOption.id)}
      >
        <span>
          <Compass aria-hidden="true" size={18} strokeWidth={1.8} />
          <span>
            <strong>{copy.freeToolLabel}</strong>
            <small>{copy.freeToolMeta}</small>
          </span>
        </span>
        <ArrowRight aria-hidden="true" size={17} />
      </button>
    </div>
  );
}

export function HomepageSelectedIntent({
  locale,
  value,
  onChange,
  changeButtonId,
  priceLabelOverride,
  summaryOverride,
  scopeOverride,
  disabled = false,
}: {
  locale: HomegroundLocale;
  value: HomepagePlanningIntentId;
  onChange: () => void;
  changeButtonId?: string;
  priceLabelOverride?: string;
  summaryOverride?: string;
  scopeOverride?: string;
  disabled?: boolean;
}) {
  const copy = getHomepagePlanningDeskCopy(locale);
  const option = copy.options.find((candidate) => candidate.id === value)!;
  const displayedOption = {
    ...option,
    priceLabel: priceLabelOverride ?? option.priceLabel,
    summary: summaryOverride ?? option.summary,
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
      <button
        type="button"
        className={styles.planningUpgradeConversation}
        onClick={() => onSelect("conversation")}
      >
        <MessageCircleMore aria-hidden="true" size={19} />
        <span>
          <strong>{copy.freeUpgrade.conversationLabel}</strong>
          <small>{copy.freeUpgrade.conversationMeta}</small>
        </span>
        <ArrowRight aria-hidden="true" size={17} />
      </button>
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
