"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Route, Ticket, UserRound } from "lucide-react";
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
  HomegroundServiceNavigationId,
  HomegroundServiceNavigationItem,
} from "../lib/homegroundNavigationModel";
import styles from "./HomegroundHeader.module.css";

const serviceIcons = {
  "attraction-tickets": Ticket,
  "english-guides": UserRound,
  "trip-support": Route,
} satisfies Record<HomegroundServiceNavigationId, typeof Ticket>;

/**
 * Hover intent: just long enough that a pointer sweeping across the nav does
 * not flash the menu, short enough that a deliberate hover feels instant.
 */
const openDelayMs = 60;
const closeDelayMs = 150;

/** A service link with a query (full-trip support presets the homepage planner) needs a document load. */
export function ServiceLink({ href, children, ...props }: {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-current"?: "page";
  onClick?: () => void;
  onFocus?: (event: ReactFocusEvent<HTMLAnchorElement>) => void;
  onPointerEnter?: (event: ReactPointerEvent<HTMLAnchorElement>) => void;
}) {
  return href.includes("?")
    ? <a href={href} {...props}>{children}</a>
    : <Link href={href} {...props}>{children}</Link>;
}

/**
 * The desktop "Services" item, after x.ai's "Products" menu: the label links
 * to Full Trip Planning & Ground Support (which also routes to the other
 * services), and every standalone service sits in a panel beneath it. Disclosure-navigation pattern: the panel opens on hover (short intent
 * delay) or from the chevron button; a hover-opened menu that is then clicked
 * stays open; on touch the first tap on the label opens the panel instead of
 * leaving the page. Escape closes it (and returns focus when focus was in
 * it); so do an outside click and focus leaving. One highlight glides
 * between the rows the pointer or keyboard reaches, starting where it last
 * was instead of sweeping in from the top; reduced motion turns movement off
 * (HomegroundHeader.module.css).
 */
export function HeaderServicesMenu({
  item,
  services,
  toggleLabel,
  ariaCurrent,
  active,
  onNavigate,
}: {
  item: HomegroundPrimaryNavigationItem;
  services: readonly HomegroundServiceNavigationItem[];
  toggleLabel: string;
  ariaCurrent: "page" | "location" | undefined;
  active: boolean;
  onNavigate: (target: HomegroundServiceNavigationId | "services") => void;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<{ top: number; height: number; shown: boolean; glide: boolean }>({ top: 0, height: 0, shown: false, glide: false });
  const openedBy = useRef<"hover" | "click" | null>(null);
  const lastPointer = useRef<string>("mouse");
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);

  function setMenu(next: boolean, by: "hover" | "click" | null = null) {
    window.clearTimeout(timer.current);
    openedBy.current = next ? by : null;
    setOpen(next);
  }

  function schedule(next: boolean, delay: number) {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (!next && openedBy.current === "click") return;
      openedBy.current = next ? (openedBy.current ?? "hover") : null;
      setOpen(next);
    }, delay);
  }

  useEffect(() => () => window.clearTimeout(timer.current), []);

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

  const servicePath = (href: string) => href.split(/[?#]/u)[0];

  return (
    <div
      className={styles.navGroup}
      data-open={open ? "true" : undefined}
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
          // Touch has no hover: the first tap shows the services; a second tap
          // (or the full-trip row) opens the page.
          if (lastPointer.current !== "mouse" && !open) {
            event.preventDefault();
            setMenu(true, "click");
            return;
          }
          setMenu(false);
          onNavigate("services");
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
      <div className={styles.servicesPanel} id={panelId}>
        <div className={styles.servicesSurface}>
          <div
            className={styles.servicesListWrap}
            data-glide={highlight.glide ? "true" : undefined}
            data-highlight={highlight.shown ? "true" : undefined}
            onBlur={(event) => {
              if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) hideHighlight();
            }}
            onPointerLeave={hideHighlight}
            style={{ "--hl-y": `${highlight.top}px`, "--hl-h": `${highlight.height}px` } as CSSProperties}
          >
            <span aria-hidden="true" className={styles.servicesHighlight} />
            <ul className={styles.servicesList}>
              {services.map((service, index) => {
                const Icon = serviceIcons[service.id];
                return (
                  <li key={service.id} style={{ "--i": index } as CSSProperties}>
                    <ServiceLink
                      aria-current={!service.href.includes("?") && service.href !== item.href && servicePath(service.href) === pathname ? "page" : undefined}
                      className={styles.servicesItem}
                      href={service.href}
                      onClick={() => {
                        setMenu(false);
                        onNavigate(service.id);
                      }}
                      onFocus={(event) => place(event.currentTarget)}
                      onPointerEnter={(event) => place(event.currentTarget)}
                    >
                      <span aria-hidden="true" className={styles.servicesIcon}>
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className={styles.servicesText}>
                        <strong>{service.label}</strong>
                        <small>{service.description}</small>
                      </span>
                    </ServiceLink>
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
