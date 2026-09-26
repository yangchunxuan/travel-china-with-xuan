"use client";

import type { ReactNode } from "react";
import { trackEvent } from "../lib/analytics";
import { usePrivateTourSelection } from "./PrivateTourSelection";

export type JapaneseContactHrefs = Readonly<{
  whatsapp: Readonly<Record<string, string>>;
  email: Readonly<Record<string, string>>;
}>;

/** Japanese contact links use the same selected package and group as every tour page. */
export function JapaneseTourContactLink({
  channel = "whatsapp",
  className,
  children,
  ignoreSelection = false,
  hrefs,
}: {
  channel?: "whatsapp" | "email";
  className?: string;
  children: ReactNode;
  ignoreSelection?: boolean;
  hrefs: JapaneseContactHrefs;
}) {
  const selected = usePrivateTourSelection();
  const travelers = ignoreSelection ? undefined : selected?.selection.travelers;
  const packageKey = selected && travelers
    ? `${selected.selection.packageId}:${travelers}`
    : "other";
  const href = hrefs[channel][packageKey]
    ?? (travelers ? hrefs[channel][String(travelers)] : undefined)
    ?? hrefs[channel].other;
  return (
    <a
      className={className}
      href={href}
      rel={channel === "whatsapp" ? "noopener noreferrer" : undefined}
      target={channel === "whatsapp" ? "_blank" : undefined}
      onClick={() => trackEvent("contact_option_clicked", {
        channel,
        page_language: "ja",
      }, {
        firstPartyContext: {
          productSlug: selected?.slug,
          packageId: selected?.selection.packageId,
          travelers,
          surface: "product",
        },
      })}
    >
      {children}
    </a>
  );
}
