# Homeground China brand entity system

Status: current implementation baseline

Updated: 14 October 2026 (company schema draft; not a deployment record)

Owner-confirmed business category: **travel agency**

## Production read-back — 23 August 2026

PR [#89](https://github.com/yangchunxuan/travel-china-with-xuan/pull/89)
is deployed at
`5bd15583c7c03dadc819d19bb4fc2c7f3ceb1b9e`. The English homepage was
confirmed indexed in Search Console, the 670-URL sitemap was submitted, and
one English-homepage re-index request was accepted. Do not repeatedly request
indexing for `/`; monitor the branded result at 7, 14 and 28 days instead.

`/zh/` and `/ko/` passed live static checks, but this read-back does not claim
that separate Search Console URL Inspection requests were submitted for those
two URLs. The complete production, measurement and hold record is
[`docs/release-notes/search-analytics-privacy-production-release-20260823.md`](./release-notes/search-analytics-privacy-production-release-20260823.md).

## Canonical identity

- Brand name: `Homeground China`
- Corporate schema type: `Organization`
- Global English slogan: `China, your way. We’ve got your back.`
- Organization ID: `https://homegroundchina.com/#organization`
- Website ID: `https://homegroundchina.com/#website`
- Website fallback name: `homegroundchina.com`
- Social alternate name already in public use: `Homeground China Journeys`

The brand name is never translated or shortened to `Homeground` on public
headers and footers. The English slogan is the canonical slogan. Chinese and
Korean homepages use natural local-language versions as their H1.

## Homepage hierarchy

The homepage must communicate three different things without merging them:

1. `Homeground China` — who the visitor is dealing with.
2. `China Travel Agency` — what kind of business it is.
3. `China, your way. We’ve got your back.` — how the brand approaches travel.

The English homepage title is:

`Homeground China | China Travel Agency for Tailor-Made Trips`

Chinese and Korean homepages use equivalent travel-agency descriptors. All
three keep self-referencing canonicals and reciprocal `en`, `zh-Hans`, `ko`
and `x-default` alternates.

## Structured-data rules

- One shared `Organization` node owns the brand name, slogan, logo and verified
  social profiles.
- One shared `WebSite` node is named `Homeground China` and points to the
  `Organization` as publisher.
- Hubs and services reuse those shared nodes; they do not create a second
  `WebSite` called `Homeground` or a partial Organization.
- Editorial people remain on author and article surfaces. They are not placed
  in the homepage identity graph merely to make the brand look person-led.
- The logo URL is the stable, crawlable `/icon.svg` asset.
- `sameAs` contains only verified, controlled public accounts. New accounts are
  added only after their exact profile URLs are confirmed.
- No licence or permit number is inferred. Formal identifiers continue to come
  only from the verified business-data source.

### Corporate identity and registered address

The 14 October Semrush audit reported missing `address` on the shared
`TravelAgency` markup. `TravelAgency` inherits `LocalBusiness`; Google's
[LocalBusiness requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business)
require the physical location of the business. The published address in
`homegroundBusiness` is a cluster registration address. It has not been
confirmed as a physical operating or visitor location.

Use `Organization` for the corporate entity, including `hiringOrganization`
on careers. This preserves the existing organization ID, legal name, licence,
registration code, logo, social profiles and publisher/provider references.
The visible business category remains **travel agency**. Do not invent a
physical location, map coordinates or opening hours to satisfy an audit.
The company AboutPage retains its existing registered postal address; this
does not establish a local storefront.

Google's [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization)
supports administrative identity with applicable, verified properties and
has no universally required properties. If a physical business location is
later verified, reassess the most specific applicable subtype and its required
fields. Do not use `additionalType: TravelAgency` to reintroduce a location
claim under the same ID.

Before publishing, inspect generated JSON-LD across the export for consistent
types, IDs and identifiers. After publishing, rerun the Semrush audit to check
this error class; local validation does not establish that all 893 reported
items have cleared or that search traffic has increased.

## Public-copy rules

Do not describe Homeground China as an independent trip-planning studio. A
team or editorial workspace may still be called a studio in a clearly local
context, but it cannot replace the business category.

Do not restore these superseded brand lines:

- `Independent China Trip Planning`
- `China, handled.`
- `China, shaped around you`
- `Travel China with Xuan`

## Release and search verification

Before merge:

- run the complete static test suite, TypeScript, font coverage, production
  audit and export build;
- inspect `/`, `/zh/` and `/ko/` at desktop and 390 px;
- confirm title, one H1, visible full brand name, canonical and hreflang;
- inspect the rendered JSON-LD for one website name and one corporate ID.

After deployment:

1. Inspect `/`, `/zh/` and `/ko/` in Google Search Console.
2. Confirm each page is indexable and Google selected the declared canonical.
3. Run a live test, then request indexing once for each homepage.
4. Resubmit the existing sitemap; do not create a second brand URL.
5. Align controlled social-profile display names, bios and homepage links with
   `Homeground China` and the canonical slogan.
6. Record branded-query impressions, clicks and visible title/site name after
   7, 14 and 28 days. Do not repeatedly request indexing.

For the 2026-08-23 release, steps 1–4 were completed for `/` and the sitemap as
described above; they were not recorded as separate `/zh/` and `/ko/` Search
Console submissions. Step 5 remains an external brand-alignment task and step
6 is the active monitoring task.

