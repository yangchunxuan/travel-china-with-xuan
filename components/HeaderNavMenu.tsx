"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Compass, MapPin, Route, Ticket, UserRound } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type {
  HomegroundPrimaryNavigationItem,
  HomegroundSubmenuId,
  HomegroundSubmenuItem,
} from "../lib/homegroundNavigationModel";
import styles from "./HomegroundHeader.module.css";

const menuIcons = {
  cities: MapPin,
  inspiration: Compass,
  "attraction-tickets": Ticket,
  "english-guides": UserRound,
  "trip-support": Route,
} satisfies Record<HomegroundSubmenuId, typeof Ticket>;

/**
 * Hover intent: just long enough that a pointer sweeping across the nav does
 * not flash the menu, short enough that a deliberate hover feels instant.
 */
const openDelayMs = 60;
const closeDelayMs = 150;

/**
 * One menu open at a time: opening one tells the others to close at once
 * (no fade, so two panels never overlap), and moving from one open menu to
 * another skips the open delay, as Stripe and Vercel do.
 */
const menuOpenEvent = "homeground:nav-menu-open";
let openMenuId: string | null = null;

/** A menu link with a query (a homepage planner preset) needs a document load. */
export function MenuLink({ href, children, ...props }: {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-current"?: "page" | "location";
  onClick?: () => void;
  onFocus?: (event: ReactFocusEvent<HTMLAnchorElement>) => void;
  onPointerEnter?: (event: ReactPointerEvent<HTMLAnchorElement>) => void;
}) {
  return href.includes("?")
    ? <a href={href} {...props}>{children}</a>
    : <Link href={href} {...props}>{children}</Link>;
}

/**
 * A desktop primary item with a menu, after x.ai's "Products" menu. Every
 * menu works the same way: the label opens the item's own page ("Services"
 * opens Full Trip Planning & Ground Support, "Destinations" the city index),
 * and a panel beneath it lists the rows. Disclosure-navigation pattern: the
 * panel opens on hover (short intent
 * delay) or from the chevron button; a hover-opened menu that is then clicked
 * stays open; on touch the first tap on the label opens the panel instead of
 * leaving the page. Escape closes it (and returns focus when focus was in
 * it); so do an outside click and focus leaving. One highlight glides
 * between the rows the pointer or keyboard reaches, starting where it last
 * was instead of sweeping in from the top; reduced motion turns movement off
 * (HomegroundHeader.module.css).
 */
export function HeaderNavMenu({
  item,
  entries,
  toggleLabel,
  ariaCurrent,
  active,
  onNavigate,
}: {
  item: HomegroundPrimaryNavigationItem;
  entries: readonly HomegroundSubmenuItem[];
  toggleLabel: string;
  ariaCurrent: "page" | "location" | undefined;
  active: boolean;
  /** The row chosen, or null for the item's own label. */
  onNavigate: (target: HomegroundSubmenuId | null) => void;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  // Set when another menu took over, so this one disappears without a fade.
  const [replaced, setReplaced] = useState(false);
  const [highlight, setHighlight] = useState<{ top: number; height: number; shown: boolean; glide: boolean }>({ top: 0, height: 0, shown: false, glide: false });
  const openedBy = useRef<"hover" | "click" | null>(null);
  const lastPointer = useRef<string>("mouse");
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);

  function show(next: boolean) {
    if (next) {
      setReplaced(false);
      openMenuId = panelId;
      window.dispatchEvent(new CustomEvent(menuOpenEvent, { detail: panelId }));
    } else if (openMenuId === panelId) {
      openMenuId = null;
    }
    setOpen(next);
  }

  function setMenu(next: boolean, by: "hover" | "click" | null = null) {
    window.clearTimeout(timer.current);
    openedBy.current = next ? by : null;
    show(next);
  }

  function schedule(next: boolean, delay: number) {
    window.clearTimeout(timer.current);
    const wait = next && openMenuId !== null && openMenuId !== panelId ? 0 : delay;
    timer.current = window.setTimeout(() => {
      if (!next && openedBy.current === "click") return;
      openedBy.current = next ? (openedBy.current ?? "hover") : null;
      show(next);
    }, wait);
  }

  useEffect(() => () => {
    window.clearTimeout(timer.current);
    if (openMenuId === panelId) openMenuId = null;
  }, [panelId]);

  useEffect(() => {
    const onOtherMenu = (event: Event) => {
      if ((event as CustomEvent<string>).detail === panelId) return;
      window.clearTimeout(timer.current);
      openedBy.current = null;
      setReplaced(true);
      setOpen(false);
    };
    window.addEventListener(menuOpenEvent, onOtherMenu);
    return () => window.removeEventListener(menuOpenEvent, onOtherMenu);
  }, [panelId]);

  useEffect(() => {
    if (!open) {
      setHighlight((current) => ({ ...current, shown: false, glide: false }));
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const focusWasInside = groupRef.current?.contains(document.activeElement) ?? false;
      setMenu(false);
      if (focusWasInside) buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && groupRef.current?.contains(event.target)) return;
      setMenu(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  /**
   * Show the highlight on a row; the first row reached after opening is placed
   * without a glide. It measures the row's <li>, whose offset parent is the
   * list wrapper (the link's would be its own rising, transformed row).
   */
  function place(target: HTMLElement) {
    const row = target.closest("li") ?? target;
    setHighlight((current) => ({ top: row.offsetTop, height: row.offsetHeight, shown: true, glide: current.shown }));
  }
  const hideHighlight = () => setHighlight((current) => ({ ...current, shown: false, glide: false }));

  const entryPath = (href: string) => href.split(/[?#]/u)[0];
  // The row's own page is "page"; a page under it (a theme under Travel
  // Inspiration) is its "location". The row for the item's own page is never
  // marked, as the item itself already is.
  const rowCurrent = (href: string) => {
    if (href.includes("?") || href === item.href) return undefined;
    const path = entryPath(href);
    return path === pathname ? "page" : pathname?.startsWith(path) ? "location" : undefined;
  };

  return (
    <div
      className={styles.navGroup}
      data-open={open ? "true" : undefined}
      data-replaced={replaced ? "true" : undefined}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setMenu(false);
      }}
      onPointerDown={(event) => {
        lastPointer.current = event.pointerType;
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") schedule(true, openDelayMs);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") schedule(false, closeDelayMs);
      }}
      ref={groupRef}
    >
      <Link
        aria-current={ariaCurrent}
        data-active={active ? "true" : undefined}
        href={item.href}
        onClick={(event) => {
          // Touch has no hover: the first tap shows the menu; a second tap
          // (or the row for the same page) opens the page.
          if (lastPointer.current !== "mouse" && !open) {
            event.preventDefault();
            setMenu(true, "click");
            return;
          }
          setMenu(false);
          onNavigate(null);
        }}
      >
        {item.label}
      </Link>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={toggleLabel}
        className={styles.navGroupToggle}
        onClick={() => {
          // A menu the pointer opened stays open when its chevron is then clicked.
          if (open && openedBy.current === "hover") {
            openedBy.current = "click";
            return;
          }
          setMenu(!open, "click");
        }}
        ref={buttonRef}
        type="button"
      >
        <ChevronDown aria-hidden="true" size={14} strokeWidth={2.2} />
      </button>
      <div className={styles.menuPanel} id={panelId}>
        <div className={styles.menuSurface}>
          <div
            className={styles.menuListWrap}
            data-glide={highlight.glide ? "true" : undefined}
            data-highlight={highlight.shown ? "true" : undefined}
            onBlur={(event) => {
              if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) hideHighlight();
            }}
            onPointerLeave={hideHighlight}
            style={{ "--hl-y": `${highlight.top}px`, "--hl-h": `${highlight.height}px` } as CSSProperties}
          >
            <span aria-hidden="true" className={styles.menuHighlight} />
            <ul className={styles.menuList}>
              {entries.map((entry, index) => {
                const Icon = menuIcons[entry.id];
                return (
                  <li key={entry.id} style={{ "--i": index } as CSSProperties}>
                    <MenuLink
                      aria-current={rowCurrent(entry.href)}
                      className={styles.menuItem}
                      href={entry.href}
                      onClick={() => {
                        setMenu(false);
                        onNavigate(entry.id);
                      }}
                      onFocus={(event) => place(event.currentTarget)}
                      onPointerEnter={(event) => place(event.currentTarget)}
                    >
                      <span aria-hidden="true" className={styles.menuIcon}>
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className={styles.menuText}>
                        <strong>{entry.label}</strong>
                        <small>{entry.description}</small>
                      </span>
                    </MenuLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
