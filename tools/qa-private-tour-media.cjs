/* Read-only browser acceptance of the shared tour photo module. */
const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');

const repo = path.resolve(__dirname, '..');
const base = process.env.TOUR_MEDIA_QA_BASE || 'http://127.0.0.1:4174';
const destination = process.env.TOUR_MEDIA_QA_OUTPUT || path.resolve(repo, '../product-photo-module-qa-20261002');
const productSlugs = [
  'beijing-highlights-5-day-private-tour',
  'shanghai-suzhou-hangzhou-6-day-private-tour',
  'beijing-xian-chengdu-guilin-shanghai-14-day-private-tour',
  'china-grand-tour-21-day-private-tour',
  'beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour',
];
const selectedSlugs = process.env.TOUR_MEDIA_QA_SLUGS?.split(',') || productSlugs;
const locales = process.env.TOUR_MEDIA_QA_LOCALES?.split(',') || ['en', 'zh', 'ko', 'ja'];
const sizes = process.env.TOUR_MEDIA_QA_SIZES?.split(',') || ['desktop', 'mobile'];
const selection = {
  explorer: '[data-route-explorer], div[class*="_routeExplorer_"]',
  day: '[data-route-day]',
  desktopMedia: 'figure[class*="_routeMedia_"]',
  mobileMedia: 'figure[class*="_routeMobileMedia_"]',
  hero: '[data-tour-hero], figure[class*="_heroDeck_"]',
  prev: '[data-photo-prev]',
  next: '[data-photo-next]',
  counter: '[data-photo-counter]',
  daySelect: '[data-route-day-select], h3 button, button[class*="_routeDayTitle_"]',
};

// Read the actual authored product data, independently of any module fallback.
function readFixtures() {
  const productUrl = pathToFileURL(path.join(repo, 'lib/privateTourProducts.ts')).href;
  const japaneseUrl = pathToFileURL(path.join(repo, 'lib/localizeJapanesePrivateTourProduct.ts')).href;
  const expression = `
    import { privateTourProducts, localizePrivateTourProduct } from ${JSON.stringify(productUrl)};
    import { localizeJapanesePrivateTourProduct } from ${JSON.stringify(japaneseUrl)};
    const slugs = ${JSON.stringify(selectedSlugs)};
    const locales = ${JSON.stringify(locales)};
    const fixtures = [];
    for (const slug of slugs) {
      const product = privateTourProducts.find(item => item.slug === slug);
      if (!product) throw new Error('Product not found: ' + slug);
      for (const locale of locales) {
        const item = locale === 'ja' ? localizeJapanesePrivateTourProduct(product) : localizePrivateTourProduct(product, locale);
        const byDay = new Map();
        for (const group of item.routeMedia) {
          const variants = byDay.get(group.day) || [];
          for (const variant of group.variants) if (!variants.some(existing => existing.image.src === variant.image.src)) variants.push(variant);
          byDay.set(group.day, variants);
        }
        const media = [...byDay].map(([day, variants]) => ({day, variants}));
        fixtures.push({ slug, locale, path: item.path, itinerary: item.itinerary, heroImage: item.heroImage, gallery: item.gallery, routeMedia: media, routePhotoFallback: item.routePhotoFallback });
      }
    }
    console.log(JSON.stringify(fixtures));`;
  return JSON.parse(execFileSync(process.execPath, ['--experimental-strip-types', '--no-warnings', '--loader', pathToFileURL(path.join(repo, 'tools/ts-extension-loader.mjs')).href, '--input-type=module', '-e', expression], { cwd: repo, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }));
}

function normalizedImageSource(value) {
  if (!value) return null;
  const url = new URL(value, base);
  if (url.pathname === '/_next/image') return url.searchParams.get('url');
  return url.pathname.replace(/\.w(?:640|1024|1280)\.webp$/, '.webp');
}

function isResponsiveSourceOf(actual, source) {
  const url = new URL(actual, base);
  const actualPath = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
  return actualPath === source || [640, 1024, 1280].some(width => actualPath === source.replace(/\.(?:webp|jpe?g|png)$/i, `.w${width}.webp`));
}

async function imageState(locator) {
  return locator.evaluate(element => {
    const activeSpan = element.querySelector('[data-active="true"], [data-hero-active="true"], [class*="_deckCard_"]:not([aria-hidden="true"])');
    const image = (activeSpan || element).querySelector('img');
    return {
      source: image?.getAttribute('data-source-src') || image?.getAttribute('data-source') || image?.closest('[data-source-src]')?.getAttribute('data-source-src') || image?.closest('[data-source]')?.getAttribute('data-source') || image?.getAttribute('src') || null,
      actualSource: image?.currentSrc || image?.src || null,
      alt: image?.alt || null,
      naturalWidth: image?.naturalWidth || 0,
      complete: image?.complete || false,
      caption: element.querySelector('figcaption')?.textContent?.trim() || null,
      text: element.textContent?.trim(),
    };
  });
}

async function checkImage(locator, expected, label, row) {
  await locator.waitFor({ state: 'visible' });
  await locator.locator('img').first().waitFor({ state: 'attached', timeout: 3000 });
  await locator.evaluate(element => {
    const active = element.querySelector('[data-active="true"], [data-hero-active="true"], [class*="_deckCard_"]:not([aria-hidden="true"])') || element;
    return Promise.all(Array.from(active.querySelectorAll('img'), image => image.complete ? Promise.resolve() : new Promise(resolve => { image.addEventListener('load', resolve, { once: true }); image.addEventListener('error', resolve, { once: true }); setTimeout(resolve, 2500); })));
  });
  const state = await imageState(locator);
  const source = normalizedImageSource(state.source);
  assert.ok(state.complete && state.naturalWidth > 0, `${label}: image did not load ${state.actualSource}`);
  assert.ok(isResponsiveSourceOf(state.actualSource, source), `${label}: loaded pixels correspond to the image's data source`);
  if (expected) {
    assert.equal(source, expected.src, `${label}: selected day/scene must show its authored image`);
    assert.ok(isResponsiveSourceOf(state.actualSource, expected.src), `${label}: actual loaded image must correspond to its declared authored source`);
    assert.equal(state.alt, expected.alt, `${label}: selected image alt matches localized content`);
    assert.equal(state.caption, expected.caption, `${label}: caption matches selected scene`);
  }
  row.media.push({ label, ...state, source });
  return state;
}

async function assertWidths(page, label, row) {
  const widths = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(widths.document <= widths.viewport + 1 && widths.body <= widths.viewport + 1, `${label}: horizontal overflow ${JSON.stringify(widths)}`);
  row.widths.push({ label, ...widths });
}

async function scrollDay(page, day, index) {
  await day.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + bounds.top + Math.min(bounds.height / 2, innerHeight / 4) - innerHeight * 0.42, behavior: 'instant' });
  });
  await page.waitForFunction(expected => document.querySelector(`[data-route-day="${expected}"]`)?.getAttribute('aria-current') === 'step', index, { timeout: 3500 });
}

async function testSceneTabs(page, media, expectedGroup, label, row) {
  if (!expectedGroup || expectedGroup.variants.length < 2) return;
  const tabs = media.locator('[role="group"] button, [role="tablist"] button');
  assert.equal(await tabs.count(), expectedGroup.variants.length, `${label}: every scene has a button`);
  for (let scene = 0; scene < expectedGroup.variants.length; scene++) {
    await tabs.nth(scene).click();
    await page.waitForFunction(({ source, caption, mediaSelector, scene }) => {
      const candidates = Array.from(document.querySelectorAll(mediaSelector)).filter(item => item.getBoundingClientRect().width > 0 && getComputedStyle(item).display !== 'none');
      return candidates.some(element => element.querySelector('figcaption')?.textContent?.trim() === caption && Boolean(element.querySelector('[aria-pressed="true"], [aria-selected="true"]')));
    }, { source: expectedGroup.variants[scene].image.src, caption: expectedGroup.variants[scene].image.caption, mediaSelector: selection.desktopMedia + ', ' + selection.mobileMedia, scene }, { timeout: 2500 });
    await checkImage(media, expectedGroup.variants[scene].image, `${label} scene ${scene + 1}`, row);
  }
  await tabs.first().click();
}

async function testHero(page, fixture, row) {
  const hero = page.locator(selection.hero).first();
  await hero.scrollIntoViewIfNeeded();
  // Hover pauses autoplay, making button and caption checks deterministic.
  await hero.hover();
  const before = await imageState(hero);
  const stage = hero.locator('button[class*="_deckStage_"]');
  assert.equal(await stage.count(), 1, 'Hero retains the original clickable photo stack');
  assert.equal(await hero.locator('[data-photo-next], [data-photo-prev], [data-photo-counter], [class*="_deckControls_"]').count(), 0, 'No added controls or counter');
  await stage.click();
  await page.waitForFunction(({ selector, previous }) => {
    const active = document.querySelector(selector)?.querySelector('[class*="_deckCard_"]:not([aria-hidden="true"])');
    return active?.getAttribute('data-source-src') !== previous;
  }, { selector: selection.hero, previous: normalizedImageSource(before.source) }, { timeout: 2000 });
  const after = await checkImage(hero, null, 'Hero photo click', row);
  const authoredSources = new Set([fixture.heroImage, ...fixture.gallery, ...fixture.routeMedia.flatMap(group => group.variants.map(item => item.image))].map(image => image.src));
  assert.ok(authoredSources.has(normalizedImageSource(after.source)), 'Hero next uses an authored product image');
  assert.equal(Number(await hero.getAttribute('data-photo-count')), authoredSources.size, 'Hero includes every unique verified product photo');
  await hero.screenshot({ path: path.join(destination, `${fixture.locale}-${row.size}-${fixture.slug}-hero.png`) });
  row.hero = { initialSource: normalizedImageSource(before.source), nextSource: normalizedImageSource(after.source), controlsRemoved: true };
}

async function runCase(browser, fixture, size) {
  const viewport = size === 'desktop' ? { width: 1365, height: 980 } : { width: 390, height: 844 };
  const context = await browser.newContext({ viewport, locale: { en: 'en-GB', zh: 'zh-CN', ko: 'ko-KR', ja: 'ja-JP' }[fixture.locale] });
  const row = { slug: fixture.slug, locale: fixture.locale, size, path: fixture.path, assertions: [], media: [], widths: [], errors: [], failedLocal: [], externalBlocked: [] };
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(base).origin || ['data:', 'blob:'].includes(url.protocol)) return route.continue();
    row.externalBlocked.push(url.origin);
    return route.abort();
  });
  const page = await context.newPage();
  page.on('pageerror', error => row.errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) row.failedLocal.push(`${response.status()} ${response.url()}`); });
  try {
    const response = await page.goto(base + fixture.path, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200, 'Product route returns HTTP 200');
    await page.evaluate(() => document.fonts.ready);
    const necessaryOnly = page.getByRole('button', { name: /^(Necessary only|仅使用必要功能|필수 기능만)$/ });
    if (await necessaryOnly.count()) await necessaryOnly.click();
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    await assertWidths(page, 'initial', row);
    await testHero(page, fixture, row);
    const explorer = page.locator(selection.explorer).first();
    assert.equal(await explorer.count(), 1, 'One shared route explorer');
    const days = explorer.locator(selection.day);
    assert.equal(await days.count(), fixture.itinerary.length, 'Every itinerary day appears');
    for (let index = 0; index < fixture.itinerary.length; index++) {
      const day = days.nth(index);
      const dayNumber = fixture.itinerary[index].day;
      const expectedGroup = fixture.routeMedia.find(item => item.day === dayNumber);
      if (size === 'desktop') {
        await scrollDay(page, day, index);
        const media = explorer.locator(selection.desktopMedia).first();
        if (expectedGroup?.variants.length) {
          await checkImage(media, expectedGroup.variants[0].image, `Day ${dayNumber} scroll`, row);
          await testSceneTabs(page, media, expectedGroup, `Day ${dayNumber}`, row);
        } else {
          assert.equal(await media.locator('img').count(), 0, `Day ${dayNumber}: intentional blank has no neighboring-place photo`);
        }
      } else {
        await day.scrollIntoViewIfNeeded();
        const media = day.locator(selection.mobileMedia).first();
        if (expectedGroup?.variants.length) {
          await checkImage(media, expectedGroup.variants[0].image, `Day ${dayNumber} mobile`, row);
          await testSceneTabs(page, media, expectedGroup, `Day ${dayNumber}`, row);
        } else {
          assert.equal(await media.locator('img').count(), 0, `Day ${dayNumber}: intentional blank has no neighboring-place photo`);
        }
      }
    }
    row.assertions.push(`All ${fixture.itinerary.length} days show their assigned images; scene selectors tested`);
    if (size === 'desktop') {
      for (let index = fixture.itinerary.length - 1; index >= 0; index--) {
        await scrollDay(page, days.nth(index), index);
        const expectedGroup = fixture.routeMedia.find(item => item.day === fixture.itinerary[index].day);
        if (expectedGroup?.variants.length) await checkImage(explorer.locator(selection.desktopMedia).first(), expectedGroup.variants[0].image, `Day ${index + 1} reverse scroll`, row);
        else assert.equal(await explorer.locator(selection.desktopMedia).first().locator('img').count(), 0, 'Reverse scroll preserves intentional day blank');
      }
      row.assertions.push('Reverse scrolling keeps day title, source image and caption synchronized');
    }
    const target = Math.min(fixture.itinerary.length - 1, Math.max(1, Math.floor(fixture.itinerary.length / 2)));
    const targetDay = days.nth(target);
    if (size === 'desktop') {
      const select = targetDay.locator(selection.daySelect);
      assert.equal(await select.count(), 1, 'Each day heading has one accessible select control');
      await select.focus();
      await page.waitForFunction(index => document.querySelector(`[data-route-day="${index}"]`)?.getAttribute('aria-current') === 'step', target, { timeout: 2500 });
      await page.waitForTimeout(80);
      assert.equal(await targetDay.getAttribute('aria-current'), 'step', 'Focused day remains selected after pending scroll frames');
      await select.click();
      await page.waitForFunction(index => document.querySelector(`[data-route-day="${index}"]`)?.getAttribute('aria-current') === 'step', target, { timeout: 2500 });
      if (fixture.routeMedia.find(item => item.day === target + 1)?.variants.length) await checkImage(explorer.locator(selection.desktopMedia).first(), fixture.routeMedia.find(item => item.day === target + 1).variants[0].image, 'Clicked day heading', row);
      const afterSelection = Math.min(fixture.itinerary.length - 1, target + 1);
      await scrollDay(page, days.nth(afterSelection), afterSelection);
      const nextGroup = fixture.routeMedia.find(item => item.day === afterSelection + 1);
      if (nextGroup?.variants.length) await checkImage(explorer.locator(selection.desktopMedia).first(), nextGroup.variants[0].image, 'Scroll resumes after clicked heading', row);
      row.assertions.push('Focus/click selects its heading and subsequent user scroll resumes automatic day selection');
    }
    await assertWidths(page, 'after all days', row);
    if (size === 'desktop') await scrollDay(page, targetDay, target);
    else await targetDay.scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
    const screenshot = `${fixture.locale}-${size}-${fixture.slug}.png`;
    await page.screenshot({ path: path.join(destination, screenshot), fullPage: false });
    row.screenshot = screenshot;
    assert.deepEqual(row.errors, [], 'No JavaScript runtime exceptions');
    assert.deepEqual(row.failedLocal, [], 'No failed local assets or image HTTP responses');
    row.status = 'passed';
  } catch (error) {
    row.status = 'failed';
    row.failure = error.message;
    const screenshot = `failed-${fixture.locale}-${size}-${fixture.slug}.png`;
    await page.screenshot({ path: path.join(destination, screenshot), fullPage: false }).catch(() => {});
    row.screenshot = screenshot;
  } finally {
    row.externalBlocked = [...new Set(row.externalBlocked)];
    await context.close();
  }
  console.log(`${row.status.toUpperCase()} ${fixture.locale}/${size}/${fixture.slug}${row.failure ? ': ' + row.failure : ''}`);
  return row;
}

async function runSpecialCases(browser, fixture) {
  const results = [];
  for (const mode of ['resize', 'reduced-motion', 'broken-image', 'broken-route-image']) {
    const context = await browser.newContext({ viewport: { width: 1365, height: 980 }, reducedMotion: mode === 'reduced-motion' ? 'reduce' : 'no-preference' });
    const row = { mode, status: 'pending', errors: [], intentionalFailures: [], assertions: [] };
    let brokenRequests = 0;
    const failureDay = fixture.routeMedia.find(group => group.day > 1 && group.day < fixture.itinerary.length) || fixture.routeMedia[0];
    const failureSources = new Set(failureDay?.variants.map(variant => variant.image.src) || []);
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== new URL(base).origin && !['data:', 'blob:'].includes(url.protocol)) return route.abort();
      if ((mode === 'broken-image' && normalizedImageSource(url.href) === fixture.heroImage.src) || (mode === 'broken-route-image' && failureSources.has(normalizedImageSource(url.href)))) {
        brokenRequests++;
        row.intentionalFailures.push(url.pathname);
        return route.fulfill({ status: 404, contentType: 'text/plain', body: 'Intentional QA image failure' });
      }
      return route.continue();
    });
    const page = await context.newPage();
    page.on('pageerror', error => row.errors.push(error.message));
    try {
      await page.goto(base + fixture.path, { waitUntil: 'networkidle' });
      const necessaryOnly = page.getByRole('button', { name: /^(Necessary only|仅使用必要功能|필수 기능만)$/ });
      if (await necessaryOnly.count()) await necessaryOnly.click();
      await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
      const hero = page.locator(selection.hero).first();
      if (mode === 'resize') {
        const days = page.locator(selection.explorer).first().locator(selection.day);
        for (const width of [759, 761, 390, 1365]) {
          await page.setViewportSize({ width, height: 980 });
          const index = Math.min(fixture.itinerary.length - 1, width <= 760 ? 1 : 3);
          const day = days.nth(index);
          if (width > 760) {
            await scrollDay(page, day, index);
            const authored = fixture.routeMedia.find(group => group.day === index + 1);
            if (authored?.variants.length) {
              await checkImage(page.locator(selection.explorer).first().locator(selection.desktopMedia).first(), authored.variants[0].image, `Resize to ${width}`, { media: [] });
            }
          } else {
            await day.scrollIntoViewIfNeeded();
            assert.ok(await day.locator(selection.mobileMedia).first().isVisible(), 'Mobile day media becomes visible after resize');
          }
          await assertWidths(page, `resize ${width}`, { widths: [] });
        }
        row.assertions.push('Crossed the 760px layout breakpoint in both directions without reload; desktop scroll selection remains active');
      } else if (mode === 'reduced-motion') {
        await hero.scrollIntoViewIfNeeded();
        await page.mouse.move(1, 1);
        const first = await imageState(hero);
        await page.waitForTimeout(6100);
        const later = await imageState(hero);
        assert.equal(first.source, later.source, 'Reduced motion disables automatic photo cycling');
        await hero.locator('button[class*="_deckStage_"]').click();
        await page.waitForTimeout(120);
        assert.notEqual((await imageState(hero)).source, first.source, 'Reduced motion retains manual photo controls');
        row.assertions.push('No automatic transition with prefers-reduced-motion; clicking the original photo stack still works');
      } else if (mode === 'broken-route-image') {
        assert.ok(failureDay, 'A dated photo exists for intentional failure check');
        const explorer = page.locator(selection.explorer).first();
        await scrollDay(page, explorer.locator(selection.day).nth(failureDay.day - 1), failureDay.day - 1);
        const media = explorer.locator(selection.desktopMedia).first();
        await page.waitForFunction(() => document.querySelector('[data-route-photo="desktop"] [data-source-src]')?.getAttribute('data-source-src') === '', null, { timeout: 3000 });
        assert.equal(await media.locator('img').count(), 0, 'Broken day photo shows a placeholder rather than another destination');
        assert.ok((await media.locator('figcaption').textContent())?.trim(), 'Broken day photo explains that the image is unavailable');
        const settledCount = brokenRequests;
        await page.waitForTimeout(1000);
        assert.equal(brokenRequests, settledCount, 'Broken day photo does not retry indefinitely');
        assert.ok(brokenRequests <= 12, 'Bounded bad day photo requests');
        const healthyDay = fixture.routeMedia.find(group => group.day !== failureDay.day && !group.variants.some(variant => failureSources.has(variant.image.src)));
        if (healthyDay) {
          await scrollDay(page, explorer.locator(selection.day).nth(healthyDay.day - 1), healthyDay.day - 1);
          await checkImage(media, healthyDay.variants[0].image, 'Navigate from unavailable day photo', {media: []});
        }
        row.assertions.push(`Broken day photo handled with a placeholder, ${brokenRequests} bounded requests and working navigation`);
      } else {
        await hero.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1800);
        const settledCount = brokenRequests;
        await page.waitForTimeout(1300);
        assert.equal(brokenRequests, settledCount, 'Broken-image handling does not repeatedly retry the missing source');
        assert.ok(brokenRequests <= 12, `Bounded missing-image requests (${brokenRequests})`);
        assert.ok(await hero.locator('button[class*="_deckStage_"]').isEnabled(), 'Original photo stack remains clickable after an image fails');
        await hero.locator('button[class*="_deckStage_"]').click();
        await checkImage(hero, null, 'After missing image', { media: [] });
        row.assertions.push(`Intentional missing hero image requested ${brokenRequests} times; bounded handling and usable navigation`);
      }
      assert.deepEqual(row.errors, [], 'No browser exceptions in special case');
      row.status = 'passed';
    } catch (error) { row.status = 'failed'; row.failure = error.message; }
    await page.screenshot({ path: path.join(destination, `${mode}.png`) }).catch(() => {});
    await context.close();
    console.log(`${row.status.toUpperCase()} ${mode}${row.failure ? ': ' + row.failure : ''}`);
    results.push(row);
  }
  return results;
}

(async () => {
  await fs.mkdir(destination, { recursive: true });
  const fixtures = readFixtures();
  const browser = await chromium.launch({ executablePath: process.env.CHROME_BINARY, headless: true });
  const results = [];
  let special = [];
  try {
    if (!process.env.TOUR_MEDIA_QA_SPECIAL_ONLY) for (const fixture of fixtures) for (const size of sizes) {
      results.push(await runCase(browser, fixture, size));
      await fs.writeFile(path.join(destination, 'progress.json'), JSON.stringify({base, queryTime: new Date().toISOString(), cases: results}, null, 2));
    }
    if (!process.env.TOUR_MEDIA_QA_SKIP_SPECIAL) special = await runSpecialCases(browser, fixtures.find(item => item.slug === 'beijing-highlights-5-day-private-tour' && item.locale === 'en') || fixtures[0]);
  } finally { await browser.close(); }
  const failed = [...results, ...special].filter(item => item.status === 'failed');
  const report = { base, queryTime: new Date().toISOString(), cases: results, specialCases: special, passed: results.length + special.length - failed.length, failed: failed.length };
  await fs.writeFile(path.join(destination, 'results.json'), JSON.stringify(report, null, 2));
  const lines = ['# 产品图片模块浏览器验收', '', `地址：${base}`, `查询时间：${new Date().toISOString()}（UTC）`, '', `常规 ${results.length} 项，特殊 ${special.length} 项；通过 ${report.passed} 项，失败 ${report.failed} 项。`, '', '仅访问本地产品页面；外站请求已拦截，未登录用户 Chrome、未发送询价或消息。', '', '| 产品 | 语言 | 视口 | 结果 | 检查说明 |', '|---|---|---|---|---|', ...results.map(item => `| ${item.slug} | ${item.locale} | ${item.size} | ${item.status} | ${(item.failure || item.assertions.join('; ')).replaceAll('|', '\\|').replaceAll('\n', ' ')} |`), '', ...special.map(item => `- ${item.mode}: ${item.status} — ${item.failure || item.assertions.join('; ')}`)];
  await fs.writeFile(path.join(destination, 'report.md'), lines.join('\n'));
  console.log(JSON.stringify({ status: failed.length ? 'failed' : 'passed', base, destination, passed: report.passed, failed: report.failed }, null, 2));
  if (failed.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
