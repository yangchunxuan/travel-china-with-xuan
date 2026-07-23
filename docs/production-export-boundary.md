# Production export boundary

The public Homeground build contains the three localized homepages, their
privacy pages, and production brand, font, and homepage media. Experimental
composition and journey labs are intentionally excluded from the deployed
artifact.

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
generated lab copies inside `out/`.

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
