import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import { parseAdminTraffic } from '../../lib/adminClient.ts';
const visible = (count = 5) => ({ count, suppressed: false });
const bucket = (label) => ({ bucketType: 'value', label, ...visible() });
const product = 'beijing-highlights-5-day-private-tour';
function fixture() {
  return {
    contractVersion: 'homeground-admin-traffic.v2',
    generatedAt: '2026-09-05T08:00:00.000Z', timezone: 'Asia/Shanghai',
    window: { days: 30, startsAt: '2026-08-06T08:00:00.000Z', endsAt: '2026-09-05T08:00:00.000Z' },
    totals: Object.fromEntries(['sessions','pageViews','contactClickAttempts','emailFormStarts','attributedEnquiries','unknownSourceSessions','productViews','productSelections','formSubmitAttempts','formSubmitFailures','formSubmitUncertain'].map(key => [key, visible()])),
    dimensions: { sources: [], campaigns: [], pages: [], products: [bucket(product)], productSelections: [bucket(`${product}|no-guide|4`)] },
    recentSessions: [],
    limits: { minimumVisibleCount: 5, maximumRecentSessions: 12, recentSessionsMinimumEligibleCount: 5, perSessionEventsIncluded: false, timeResolution: 'day', linkedInquirySessionsExcluded: true, sessionLabelScope: 'current_30_day_window' },
    notice: { scope: 'Consented anonymous sessions; not people, customers, or market share.', clickMeaning: 'A contact-channel click does not prove that a message was sent.' },
  };
}
test('admin v2 retains product metrics and v1 leaves unavailable metrics absent', () => {
  const current = parseAdminTraffic(fixture());
  assert.equal(current.totals.productViews.count, 5);
  assert.equal(current.dimensions.productSelections[0].label, `${product}|no-guide|4`);
  const legacy = fixture(); legacy.contractVersion = 'homeground-admin-traffic.v1';
  for (const key of ['productViews','productSelections','formSubmitAttempts','formSubmitFailures','formSubmitUncertain']) delete legacy.totals[key];
  delete legacy.dimensions.products; delete legacy.dimensions.productSelections;
  const parsed = parseAdminTraffic(legacy);
  assert.equal(parsed.totals.formSubmitFailures, undefined);
  assert.equal(parsed.dimensions.products, undefined);
});
test('admin rejects arbitrary product names, invalid combinations and low-volume disclosures', () => {
  for (const label of ['customer@example.com', `${product}|standard-guided|4`, `${product}|no-guide|3`, `${product}|no-guide|04`, `${product}|no-guide|4|extra`]) {
    const value = fixture(); value.dimensions.productSelections[0].label = label;
    assert.throws(() => parseAdminTraffic(value), { kind: 'contract' });
  }
  for (const key of ['products', 'productSelections']) {
    const value = fixture(); value.dimensions[key][0] = { bucketType: 'unknown', label: null, ...visible() };
    assert.throws(() => parseAdminTraffic(value), { kind: 'contract' });
    value.dimensions[key][0] = { bucketType: 'value', label: key === 'products' ? product : `${product}|no-guide|4`, count: 2, suppressed: false };
    assert.throws(() => parseAdminTraffic(value), { kind: 'contract' });
    value.dimensions[key][0] = { bucketType: 'suppressed', label: null, count: null, suppressed: true };
    assert.doesNotThrow(() => parseAdminTraffic(value));
  }
});
test('admin requires complete v2 metrics and refuses private identifiers or extra dimensions', () => {
  for (const mutation of [v => delete v.totals.formSubmitUncertain, v => v.totals.customerEmail = 'x@example.com', v => v.dimensions.products[0].sessionHash = 'secret', v => v.dimensions.individualTimeline = []]) {
    const value = fixture(); mutation(value);
    assert.throws(() => parseAdminTraffic(value), { kind: 'contract' });
  }
});

test('admin labels preserve merged-count and collection-window limits', async () => {
  const source = await readFile(new URL('../../components/admin/AdminInsightsPage.tsx', import.meta.url), 'utf8');
  const parsed = ts.createSourceFile('AdminInsightsPage.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const formatter = parsed.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'trafficCountCopy');
  assert.ok(formatter, 'exercise the count label used by the actual admin page');
  const javascript = ts.transpileModule(formatter.getText(parsed), {
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const countCopy = vm.runInNewContext(`${javascript}\ntrafficCountCopy`, { numberFormatter: new Intl.NumberFormat('zh-CN') });
  const response = fixture();
  for (const dimension of ['sources', 'campaigns', 'pages', 'products', 'productSelections']) {
    response.dimensions[dimension] = [{ bucketType: 'suppressed', label: null, count: null, suppressed: true }];
  }
  for (const dimension of Object.values(parseAdminTraffic(response).dimensions)) {
    assert.equal(countCopy(dimension[0]), '已隐藏', 'a merged placeholder may represent several 1–4-count groups');
  }
  assert.equal(countCopy({ count: null, suppressed: true }), '少于 5（已隐藏）', 'one suppressed total is genuinely below five');
  assert.equal(countCopy({ bucketType: 'unknown', label: null, count: null, suppressed: true }), '少于 5（已隐藏）', 'Unknown is one real bucket');
  assert.equal(countCopy(visible(0)), '0');
  assert.equal(countCopy(visible(12)), '12');
  const sectionSource = name => parsed.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === name)?.getText(parsed);
  assert.match(sectionSource('TrafficSection'), /查询窗口/);
  assert.match(sectionSource('TrafficSection'), /新指标从上线后开始记录；旧版访问不会补记为产品浏览、产品选择或提交记录。/);
  assert.doesNotMatch(sectionSource('TrafficSection'), /实际覆盖日期/);
  assert.match(sectionSource('SummarySection'), /实际覆盖日期/, 'saved-submission coverage retains its observed first-record date');
});
