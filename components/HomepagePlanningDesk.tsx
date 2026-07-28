"use client";

import {
  ArrowRight,
  FileCheck2,
  Handshake,
  MapPinned,
  MessageCircleMore,
} from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getHomepagePlanningDeskCopy,
  type HomepagePlanningIntentId,
  type HomepagePlanningIntentOption,
  type HomepageStarterIntentId,
} from "../lib/homepagePlanningDesk";
import styles from "./HomegroundHomePage.module.css";
import { HomepageQuickContact } from "./HomepageQuickContact";

const intentIcons = {
  conversation: MessageCircleMore,
  "itinerary-review": FileCheck2,
  "route-build": MapPinned,
  "full-trip-support": Handshake,
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
  contactOnly = false,
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
  contactOnly?: boolean;
}) {
  const copy = getHomepagePlanningDeskCopy(locale);
  const paidOptions = copy.options.filter(
    (option) => option.kind === "paid",
  );

  return (
    <div
      className={`${styles.intentView} ${
        contactOnly ? styles.intentViewContactOnly : ""
      }`}
      data-planning-view="intent"
    >
      <header className={styles.intentHeader}>
        <h2 id="planning-intent-title" tabIndex={-1}>
          {contactOnly ? copy.contactPanelLabel : copy.title}
        </h2>
      </header>

      <HomepageQuickContact
        locale={locale}
        copy={copy}
        onCancel={onCancel}
        variant={contactOnly ? "hero" : "default"}
      />

      {!contactOnly && (
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
        </section>
      )}
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
