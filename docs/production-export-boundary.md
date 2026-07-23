# Production export boundary

The public Homeground build contains the English, Simplified Chinese and Korean
homepages, privacy pages and production guides, together with their production
brand, font and media assets. Experimental composition and journey labs are
intentionally excluded from the deployed artifact.

The production guide routes are:

- `/guides/zhangjiajie-itinerary/`
- `/zh/guides/zhangjiajie-itinerary/`
- `/ko/guides/zhangjiajie-itinerary/`
- `/guides/best-zhangjiajie-night-show/`
- `/zh/guides/best-zhangjiajie-night-show/`
- `/ko/guides/best-zhangjiajie-night-show/`
- `/guides/beijing-zhangjiajie-shanghai-10-days/`
- `/zh/guides/beijing-zhangjiajie-shanghai-10-days/`
- `/ko/guides/beijing-zhangjiajie-shanghai-10-days/`
- `/guides/beijing-zhangjiajie-shanghai-transport/`
- `/zh/guides/beijing-zhangjiajie-shanghai-transport/`
- `/ko/guides/beijing-zhangjiajie-shanghai-transport/`

English remains unprefixed. Simplified Chinese uses `/zh/` with `zh-Hans`
language metadata, and Korean uses `/ko/` with `ko` language metadata.

## Ten-day guide release check

After producing `out/`, run:

```sh
node tools/check-ten-day-guide-export.mjs
```

The check reads `out/` without changing it and fails with a non-zero exit code
unless all of the following are true:

- the English, Simplified Chinese and Korean ten-day guide HTML files exist;
- every guide has the correct HTML language and a self-referencing canonical;
- every guide has one reciprocal `en`, `zh-Hans`, `ko` and `x-default`
  hreflang set, with `x-default` pointing to English;
- no localized guide contains a `noindex` directive;
- Article JSON-LD uses the localized page URL and matching `inLanguage`;
- `sitemap.xml` contains all three guide URLs with the same reciprocal
  hreflang set; and
- every root-path link in every exported HTML file resolves to a file in the
  static export.

The checker does not make network requests. External links, GitHub Pages custom
domain settings, DNS, HTTPS and the deployed response headers remain separate
release checks.

The `/admin/` HTML shell is not confidential and contains no enquiry data.
Without complete public Auth/API configuration it makes no business-data
request. With configuration present, the two read-only responses still require
an authenticated `aal2` session and the server-side Auth user UUID allow-list.
See `docs/admin-insights-deployment.md`; do not describe an unlinked URL,
`robots.txt` or `noindex` as access control.

## What stays recoverable

- Lab components remain under `components/`.
- Original lab assets remain under their existing `public/*-lab/` directories.
- Each disabled Next route is kept next to its original route as
  `page.lab.tsx`.

No source artwork is removed. `npm run build` runs
`tools/prune-production-export.mjs` after Next finishes and removes only the
generated lab copies inside `out/`. The ten-day guide checker is a separate
post-build validation command; it does not prune or write any exported files.

## Re-enable a lab locally

Rename the selected `page.lab.tsx` file to `page.tsx`, then run `npm run dev`.
Rename it back before committing a production release. The post-build pruning
step is a second safety boundary: even if a lab route is accidentally enabled,
its route and public asset root are removed from `out/`.

The protected export roots are:

- `beijing-composition-lab`
- `journey-lab`
- `journey-lab-cc`
- `journey-lab-v1`
- `journey-lab-v2`
- `journey-lab-v3`
- `motion-lab`
- `waterway-lab`
