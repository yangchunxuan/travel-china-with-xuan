import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const repositoryRoot = new URL("../../", import.meta.url);
const source = (path) => readFile(new URL(path, repositoryRoot), "utf8");

test("secondary hubs use the homepage white, ink and neutral surface system", async () => {
  const [platform, guides, search, entry, destination, geography] = await Promise.all([
    source("components/SearchPlatformHubPage.module.css"),
    source("components/GuidesHubPage.module.css"),
    source("components/GuideSearchResultsPage.module.css"),
    source("components/ChinaEntryGuidesPage.module.css"),
    source("components/content/DestinationHubPage.module.css"),
    source("components/content/DestinationGeographyDiagram.module.css"),
  ]);

  for (const styles of [platform, guides, search, entry, destination]) {
    assert.match(styles, /#fff/);
    assert.match(styles, /#f5f5f4/);
    assert.match(styles, /#0a0a0a/);
    assert.match(styles, /#d5d9e2/);
  }

  assert.match(
    platform,
    /\.platformMap \{[\s\S]{0,160}background: var\(--hub-soft\)[\s\S]{0,160}color: var\(--hub-ink\)/,
  );
  assert.doesNotMatch(
    platform,
    /\.platformMap \{[\s\S]{0,160}background: var\(--hub-ink\)/,
  );
  assert.match(
    guides,
    /\.entryCollection \{[\s\S]{0,140}background: var\(--guides-soft\)/,
  );
  assert.match(
    guides,
    /\.cta \{[\s\S]{0,140}background: var\(--guides-paper\)/,
  );
  assert.match(
    search,
    /\.plannerHandoff \{[\s\S]{0,180}background: var\(--guides-soft\)/,
  );
  assert.match(platform, /\.secondaryAction \{\s*border: 1px solid var\(--hub-muted\)/);
  assert.match(
    entry,
    /\.rulePanel \{[\s\S]{0,180}background: var\(--entry-soft\)[\s\S]{0,140}color: var\(--entry-ink\)/,
  );
  assert.match(
    entry,
    /\.cta \{[\s\S]{0,140}background: var\(--entry-paper\)/,
  );
  assert.match(
    destination,
    /\.destinationRoot \.destinationCta \{[\s\S]{0,180}background: var\(--hg-color-soft\)/,
  );
  assert.match(geography, /background: #f5f5f4/);
  assert.doesNotMatch(geography, /#f7f5f0/);
});

test("studio, service, product and utility pages keep dark color to actions and the footer", async () => {
  const [studio, review, tour, privacy, legal, author] = await Promise.all([
    source("components/HomegroundStudioPage.module.css"),
    source("components/ChinaItineraryReviewPage.module.css"),
    source("components/ZhangjiajiePrivateTourPreviewPage.module.css"),
    source("components/HomegroundPrivacyPage.module.css"),
    source("components/HomegroundLegalPage.module.css"),
    source("components/EditorialAuthorPage.module.css"),
  ]);

  assert.match(
    studio,
    /\.trustSection \{[\s\S]{0,160}background: var\(--studio-warm\)[\s\S]{0,160}color: var\(--studio-ink\)/,
  );
  assert.match(
    studio,
    /\.ctaSection \{[\s\S]{0,160}background: #fff/,
  );
  assert.match(studio, /\.ctaGrid \.ctaSecondary \{[\s\S]{0,100}border: 1px solid var\(--studio-muted\)/);
  assert.match(
    review,
    /\.finalCta \{[\s\S]{0,160}background: var\(--review-sand\)[\s\S]{0,160}color: var\(--review-ink\)/,
  );
  assert.match(review, /\.finalSecondaryButton \{[\s\S]{0,100}border: 1px solid var\(--review-muted\)/);
  assert.match(
    tour,
    /\.previewRoot \.finalCta > a \{[\s\S]{0,100}background: var\(--hg-color-ink\)[\s\S]{0,80}color: #fff/,
  );
  assert.match(privacy, /--privacy-paper: #fff/);
  assert.match(legal, /--legal-paper: #fff/);
  assert.match(author, /--paper: #fff/);
});

test("localized collection titles wrap on narrow screens without changing article or homepage styles", async () => {
  const [platform, homepage, editorial, destinationPage] = await Promise.all([
    source("components/SearchPlatformHubPage.module.css"),
    source("components/HomepageShowcase.module.css"),
    source("components/content/EditorialGuidePage.module.css"),
    source("components/content/DestinationHubPage.tsx"),
  ]);

  assert.match(
    platform,
    /\.hubPage\[data-homeground-locale="zh"\] \.hero h1\.segmentedTitle \{[\s\S]{0,180}overflow-wrap: anywhere;[\s\S]{0,100}word-break: normal;/,
  );
  assert.match(homepage, /--showcase-canvas: #fff/);
  assert.match(
    editorial,
    /\.cta \{[\s\S]{0,120}background: var\(--hg-color-ink\)/,
  );
  assert.match(destinationPage, /destinationStyles\.destinationRoot/);
  assert.match(destinationPage, /destinationStyles\.destinationCta/);
});
