import { encode, type QrCodeGenerateResult } from "uqr";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { whatsappQrCandidates } from "./contactCard.ts";

const maximumComfortableVersion = 15;

/** Keep the exact draft when it fits, otherwise try the existing shorter drafts.
 * A long Unicode note can exceed the encoder's capacity before we reach a
 * shorter candidate. If the whole first line itself exceeds version 15,
 * retain its facts in the smallest encodable candidate instead of truncating
 * them. The original computer/app link is never changed.
 */
export function selectWhatsAppQr(href: string): { href: string; qr: QrCodeGenerateResult } | null {
  let smallest: { href: string; qr: QrCodeGenerateResult } | null = null;
  for (const candidate of whatsappQrCandidates(href)) {
    try {
      const qr = encode(candidate, { ecc: "M", border: 0 });
      if (qr.version <= maximumComfortableVersion) return { href: candidate, qr };
      if (!smallest || qr.version < smallest.qr.version) smallest = { href: candidate, qr };
    } catch {
      // Try the next candidate; an oversized draft must not crash the card.
    }
  }
  return smallest;
}
