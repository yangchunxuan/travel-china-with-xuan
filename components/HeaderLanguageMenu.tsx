"use client";

import { ChevronDown } from "lucide-react";
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { menuOpenEvent } from "./HeaderNavMenu";
import styles from "./HomegroundHeader.module.css";

/** Each language named in its own language, as the desktop language menu shows it. */
export const languageEndonyms: Readonly<Record<string, string>> = {
  en: "English",
  zh: "中文",
  "zh-Hans": "中文",
  ko: "한국어",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
};

/**
 * Desktop language switcher. The header shows only the language in use, with
 * the short rust line it always had; its chevron opens one short list of this
 * page's editions, each in its own language, so a new edition adds a row
 * instead of crowding the header. It shares the nav menus' panel and their
 * one-menu-at-a-time rule. It opens on click (a pointer passing over the
 * header should not drop a list of languages); Escape, an outside click,
 * focus leaving or choosing a language closes it. The mobile menu keeps its
 * own language list.
 */
export function HeaderLanguageMenu({
  label,
  lang,
  ariaLabel,
  hidden = false,
  children,
}: {
  /** The language in use, in its own language. */
  label: string;
  lang: string;
  ariaLabel: string;
  hidden?: boolean;
  children: ReactNode;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [replaced, setReplaced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const items = Children.toArray(children).filter(isValidElement);

  useEffect(() => {
    const onOtherMenu = (event: Event) => {
      if ((event as CustomEvent<string>).detail === panelId) return;
      setReplaced(true);
      setOpen(false);
    };
    window.addEventListener(menuOpenEvent, onOtherMenu);
    return () => window.removeEventListener(menuOpenEvent, onOtherMenu);
  }, [panelId]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const focusWasInside = rootRef.current?.contains(document.activeElement) ?? false;
      setOpen(false);
      if (focusWasInside) buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && rootRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth < 1180) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <nav
      aria-label={ariaLabel}
      className={styles.languageNav}
      data-open={open ? "true" : undefined}
      data-replaced={replaced ? "true" : undefined}
      hidden={hidden}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
      }}
      ref={rootRef}
      style={hidden ? { display: "none" } : undefined}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className={styles.languageMenuButton}
        lang={lang}
        onClick={() => {
          if (!open) {
            setReplaced(false);
            window.dispatchEvent(new CustomEvent(menuOpenEvent, { detail: panelId }));
          }
          setOpen(!open);
        }}
        ref={buttonRef}
        type="button"
      >
        <span>{label}</span>
        <ChevronDown aria-hidden="true" size={14} strokeWidth={2.2} />
      </button>
      <div className={styles.languageMenuPanel} id={panelId} inert={!open}>
        <ul className={styles.languageMenuList}>
          {items.map((item, index) => (
            <li key={item.key ?? index} style={{ "--i": index } as CSSProperties}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
