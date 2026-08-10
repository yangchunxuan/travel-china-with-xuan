# Homeground article production — Lite

This is the working convention for new guides. The existing 19 guides stay where they are.

## One article, one folder

Create `content/guides/<article-id>/` and put its files there. Two computers can add two different folders and merge without both editing a central article list.

For the normal shared layout:

```text
content/guides/example-guide/
├── metadata.json
├── body.en.ts
├── body.zh.ts       # only when that version is ready
└── body.ko.ts       # only when that version is ready

public/images/guides/example-guide/
└── hero-1600.webp
```

Use `layout: { "mode": "template", "templateId": "editorial-v1" }`. Body files default-export a `StructuredPageBody`. The shared route supplies the header, breadcrumb, H1, hero, Article schema, CTA and footer.

If the article needs a genuinely different composition, use `layout: { "mode": "bespoke" }` and add its own component and matching route under `app/(default)/guides/<article-id>/` and/or `app/(localized)/[locale]/guides/<article-id>/`. The validator checks that the route exists. There is no approval form and no artificial template-fit gate.

## Minimal metadata example

```json
{
  "id": "example-guide",
  "type": "planning",
  "pillar": "routes-and-pace",
  "audienceMarkets": ["global"],
  "format": "decision-guide",
  "topics": ["trip-planning"],
  "destinations": ["china"],
  "heroImagePath": "/images/guides/example-guide/hero-1600.webp",
  "heroImageUrl": "https://homegroundchina.com/images/guides/example-guide/hero-1600.webp",
  "imageWidth": 1600,
  "imageHeight": 1000,
  "datePublished": "2026-08-10",
  "dateModified": "2026-08-10",
  "sourceReviewedDate": "2026-08-10",
  "search": {
    "section": "plan",
    "family": "combined-decision",
    "primaryIntent": "plan"
  },
  "layout": { "mode": "template", "templateId": "editorial-v1" },
  "locales": {
    "en": {
      "path": "/guides/example-guide/",
      "title": "Search title",
      "headline": "Visible article headline",
      "description": "A concise description used in search and the shared hero.",
      "heroAlt": "A useful description of the hero photograph.",
      "navTitle": "Short guide name",
      "featuredLinkLabel": "Read the guide",
      "openGraphLocale": "en_US",
      "cardTags": ["China", "Trip planning"]
    }
  }
}
```

## Commands

```bash
npm run guide:generate
npm run typecheck
npm run build
```

The first command validates every independent folder and creates temporary registry files under `lib/generated/`. Never edit or commit those generated files. Normal install, test, type-check and build commands regenerate them automatically.

Before opening a PR, confirm the article at 320px and desktop width. Keep one article (or one inseparable language set) per PR. No GitHub issue lease, manual registry edit or central merge ritual is required.
