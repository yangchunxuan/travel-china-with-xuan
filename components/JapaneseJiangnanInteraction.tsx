"use client";

import type { ReactNode } from "react";
import { trackEvent } from "../lib/analytics";
import { japaneseDirectWhatsAppEnabled, openJapaneseContact } from "../lib/japaneseContactFlow";
import { getPrivateTourInquiryContext, isZhangjiajieCustomGroupTour } from "../lib/privateTourInquiryContext";
import { openTourContactForContext } from "../lib/tourContact";
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
  direct = false,
  otherGroup = false,
  hrefs,
}: {
  channel?: "whatsapp" | "email";
  className?: string;
  children: ReactNode;
  ignoreSelection?: boolean;
  /** A plain chat link: never opens the on-site dialog. */
  direct?: boolean;
  /** Spanish pages: asks for a group size no published price covers, as the main tour pages do. */
  otherGroup?: boolean;
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
  const emailHref = hrefs.email[packageKey]
    ?? (travelers ? hrefs.email[String(travelers)] : undefined)
    ?? hrefs.email.other;
  const whatsappHref = hrefs.whatsapp[packageKey]
    ?? (travelers ? hrefs.whatsapp[String(travelers)] : undefined)
    ?? hrefs.whatsapp.other;
  const directWhatsapp = japaneseDirectWhatsAppEnabled();
  const fallbackHref = channel === "whatsapp" && !directWhatsapp ? emailHref : href;
  return (
    <a
      className={className}
      href={fallbackHref}
      rel={channel === "whatsapp" && directWhatsapp ? "noopener noreferrer" : undefined}
      target={channel === "whatsapp" && directWhatsapp ? "_blank" : undefined}
      onClick={(event) => {
        if (channel === "whatsapp" && !direct && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          const slug = selected?.slug ?? window.location.pathname.match(/^\/(?:ja|es)\/tours\/([^/]+)\/$/)?.[1];
          if (slug && window.location.pathname.startsWith("/es/")) {
            // Spanish tour pages open the main site's quote dialog (SpanishContactHost).
            const customGroup = otherGroup && isZhangjiajieCustomGroupTour(slug);
            openTourContactForContext(event, getPrivateTourInquiryContext(
              slug,
              "en",
              customGroup || ignoreSelection ? undefined : selected?.selection,
              customGroup ? {} : undefined,
            ));
          } else if (slug) {
            if (openJapaneseContact({
              slug,
              selection: ignoreSelection ? undefined : selected?.selection,
              whatsappHref,
              emailHref,
            })) event.preventDefault();
          }
          return;
        }
        trackEvent("contact_option_clicked", {
          channel: channel === "whatsapp" && !directWhatsapp ? "email" : channel,
          // Spanish tour pages reuse these links.
          page_language: window.location.pathname.startsWith("/es/") ? "es" : "ja",
        }, {
          firstPartyContext: {
            productSlug: selected?.slug,
            packageId: selected?.selection.packageId,
            travelers,
            surface: "product",
          },
        });
      }}
    >
      {children}
    </a>
  );
}
