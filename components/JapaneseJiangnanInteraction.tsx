"use client";

import { ArrowRight, Mail } from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { jaPilotEmailHref, jaPilotWhatsAppHref } from "../lib/jaPilot";
import styles from "./ShanghaiJiangnanImaginePage.module.css";

type Travelers = 2 | 4 | 6;
type Price = Readonly<{ travelers: Travelers; cnyPerPerson: number }>;

const selectionContext = createContext<{
  travelers: Travelers;
  choose: (travelers: Travelers) => void;
} | null>(null);

function fromUrl(): Travelers {
  const value = new URLSearchParams(window.location.search).get("travelers");
  return value === "4" ? 4 : value === "6" ? 6 : 2;
}

export function JapaneseTourSelectionBoundary({ children }: { children: ReactNode }) {
  const [travelers, setTravelers] = useState<Travelers>(2);
  useEffect(() => {
    const sync = () => setTravelers(fromUrl());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const choose = (next: Travelers) => {
    setTravelers(next);
    const url = new URL(window.location.href);
    url.searchParams.set("travelers", String(next));
    window.history.replaceState(window.history.state, "", url);
  };
  return <selectionContext.Provider value={{ travelers, choose }}>{children}</selectionContext.Provider>;
}

export function useJapaneseTourTravelers() {
  return useContext(selectionContext)?.travelers ?? null;
}

function useSelection() {
  const selection = useContext(selectionContext);
  if (!selection) throw new Error("Japanese tour selection is unavailable");
  return selection;
}

const money = new Intl.NumberFormat("ja-JP");

export function JapaneseJiangnanPriceConsole({ prices }: { prices: readonly Price[] }) {
  const { travelers, choose } = useSelection();
  const selected = prices.find((price) => price.travelers === travelers) ?? prices[0];
  if (!selected) return null;

  return (
    <div className={styles.priceConsole}>
      <div className={styles.priceConsoleTop}>
        <p>人数を選ぶ</p>
        <div className={styles.priceChoices} role="group" aria-label="同行人数を選ぶ">
          {prices.map((price) => (
            <button
              aria-pressed={price.travelers === travelers}
              key={price.travelers}
              onClick={() => choose(price.travelers)}
              type="button"
            >
              <span>{price.travelers}名で参加</span>
              <strong>CNY {money.format(price.cnyPerPerson)}</strong>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.priceResult} aria-live="polite">
        <span>選択した人数の公開開始料金</span>
        <strong key={travelers}>CNY {money.format(selected.cnyPerPerson)}</strong>
        <small>1名あたり · {travelers}名で参加 · 日本語ガイド込み · 航空券別</small>
      </div>
      <div className={styles.priceConsoleActions}>
        <a
          className={styles.primaryAction}
          href={jaPilotWhatsAppHref("tour", travelers)}
          rel="noopener noreferrer"
          target="_blank"
        >
          日程を相談する <ArrowRight aria-hidden="true" size={17} />
        </a>
        <div className={styles.otherGroupCopy}>
          <strong>他の人数で旅行しますか？</strong>
          <span>日付、部屋割り、荷物に合う車両を確認して、書面で総額をご案内します。</span>
          <a href={jaPilotWhatsAppHref("tour")} rel="noopener noreferrer" target="_blank">
            別の人数を相談する <ArrowRight aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function JapaneseJiangnanFinalActions() {
  const { travelers } = useSelection();
  return (
    <div className={styles.finalActions}>
      <a className={styles.finalPrimary} href={jaPilotWhatsAppHref("tour", travelers)} rel="noopener noreferrer" target="_blank">
        この旅を相談する <ArrowRight aria-hidden="true" size={18} />
      </a>
      <a className={styles.finalEmail} href={jaPilotEmailHref("tour", travelers)}>
        <Mail aria-hidden="true" size={16} /> メールで相談する
      </a>
    </div>
  );
}
