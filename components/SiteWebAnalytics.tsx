import Script from "next/script";

/**
 * Cookieless visit counting, kept deliberately separate from `SiteAnalytics`.
 *
 * The two answer different questions and carry different costs. GA identifies a
 * returning visitor, which needs storage on the device, which is what triggers
 * the consent requirement — so it stays switched off behind its own flag until
 * a consent mechanism exists. This one stores nothing on the device and does
 * not identify anybody: it counts page views and referrers in aggregate, so the
 * banner requirement does not apply to it, and no visitor becomes invisible by
 * refusing.
 *
 * That is enough to answer the question paid traffic makes urgent — did people
 * arrive and leave immediately, read and never start the brief, or start it and
 * stop partway? Those need different fixes and are otherwise indistinguishable
 * from "spent the budget, got no enquiries". What it cannot do is recognise the
 * same person across visits or devices; first-party enquiry attribution already
 * covers the visitors who matter commercially, so that gap is affordable.
 *
 * Not needing consent is not the same as needing no disclosure. The privacy
 * notice has to describe this, and
 * `supabase/tests/analytics-privacy-consistency.test.mjs` fails if the notice
 * still denies collection while this component can render.
 *
 * Absent a token the component renders nothing at all, so the site behaves
 * exactly as it did before until the owner has an account to point it at.
 */
const beaconToken =
  process.env.NEXT_PUBLIC_HOMEGROUND_WEB_ANALYTICS_TOKEN?.trim() ?? "";

/**
 * The token names a dashboard to report into and ships in the page source by
 * design; it is not a secret. Rejecting anything but the documented shape keeps
 * a stray build value from becoming an attacker-chosen script attribute.
 */
const beaconTokenPattern = /^[A-Za-z0-9]{16,64}$/;

export function SiteWebAnalytics() {
  if (!beaconTokenPattern.test(beaconToken)) return null;

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: beaconToken })}
    />
  );
}
