"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "../lib/analytics";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import styles from "./FirstTripTenCityMapPage.module.css";

export interface LinkableAssetDownload {
  readonly label: string;
  readonly description: string;
  readonly href: string;
  readonly format: string;
  readonly contentKind: string;
}

export function LinkableAssetActions({
  assets,
  citation,
  copy,
  guideId,
  locale,
}: {
  assets: readonly LinkableAssetDownload[];
  citation: string;
  copy: {
    readonly citationLabel: string;
    readonly copyButton: string;
    readonly copiedButton: string;
    readonly copiedStatus: string;
  };
  guideId: string;
  locale: HomegroundLocale;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      trackEvent("linkable_asset_citation_copied", {
        guide_id: guideId,
        page_language: locale,
        content_kind: "editorial-citation",
        cta_position: "inline",
      });
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.assetActions}>
      <div className={styles.downloadGrid}>
        {assets.map((asset) => (
          <a
            download
            href={asset.href}
            key={asset.href}
            onClick={() => {
              trackEvent("linkable_asset_download_clicked", {
                guide_id: guideId,
                page_language: locale,
                content_kind: asset.contentKind,
                cta_position: "inline",
              });
            }}
          >
            <span className={styles.downloadIcon} aria-hidden="true">
              <Download size={19} />
            </span>
            <span>
              <strong>{asset.label}</strong>
              <small>{asset.description}</small>
            </span>
            <b>{asset.format}</b>
          </a>
        ))}
      </div>

      <div className={styles.citationBox}>
        <div>
          <p className={styles.miniLabel}>{copy.citationLabel}</p>
          <p>{citation}</p>
        </div>
        <button type="button" onClick={copyCitation}>
          {copied ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
          {copied ? copy.copiedButton : copy.copyButton}
        </button>
        <span className={styles.copyStatus} aria-live="polite">
          {copied ? copy.copiedStatus : ""}
        </span>
      </div>
    </div>
  );
}
