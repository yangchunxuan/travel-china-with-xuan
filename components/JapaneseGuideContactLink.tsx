"use client";

import type { MouseEvent, ReactNode } from "react";
import { openJapaneseContact } from "../lib/japaneseContactFlow";

/** Keeps a working mailto fallback while opening the on-site inquiry flow. */
export function JapaneseGuideContactLink({
  className,
  emailHref,
  whatsappHref,
  children,
}: {
  className?: string;
  emailHref: string;
  whatsappHref: string;
  children: ReactNode;
}) {
  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (openJapaneseContact({ emailHref, whatsappHref })) event.preventDefault();
  };
  return <a className={className} href={emailHref} onClick={open}>{children}</a>;
}
