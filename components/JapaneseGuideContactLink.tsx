"use client";

import type { MouseEvent, ReactNode } from "react";
import { openJapaneseContact } from "../lib/japaneseContactFlow";

/**
 * Opens the on-site inquiry flow. Without it the link still works: it opens
 * `href`, by default a mailto draft.
 */
export function JapaneseGuideContactLink({
  className,
  emailHref,
  whatsappHref,
  href = emailHref,
  children,
}: {
  className?: string;
  emailHref: string;
  whatsappHref: string;
  href?: string;
  children: ReactNode;
}) {
  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (openJapaneseContact({ emailHref, whatsappHref })) event.preventDefault();
  };
  return <a className={className} href={href} onClick={open}>{children}</a>;
}
