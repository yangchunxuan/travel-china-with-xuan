import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import test from "node:test";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createDefaultSupplierSharingPreference,
  findForbiddenPublicStayFields,
  findForbiddenPublicStayGuaranteeClaims,
  stayCityIds,
  stayNetworkSchemaVersion,
  validatePropertyVerificationSnapshot,
  validatePublicStayAreaDecision,
  validateStayQuoteSnapshot,
  validateStayRequirement,
} from "../../lib/stayNetworkContract.ts";

const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "../..");

const localized = (en, zh = "经复核的中文说明。", ko = "검토된 한국어 설명입니다.") => ({
  en,
  "zh-Hans": zh,
  ko,
});

function validPublicRecord() {
  const fit = (level) => ({
    level,
    conditions: [localized("This conclusion changes with the confirmed daily route.")],
  });

  return {
    schemaVersion: stayNetworkSchemaVersion,
    recordKind: "stay-area-decision",
    cityId: "beijing",
    areaId: "qianmen",
    names: localized("Qianmen", "前门", "첸먼"),
    canonicalOwner: {
      route: "/guides/beijing/qianmen-stay-decision/",
      disposition: "existing-owner",
      contentId: "hg-topic-example",
    },
    decisionJobs: ["first-trip-base", "railway-arrival-departure"],
    gatewayRelations: [
      {
        gatewayId: "beijing-capital-airport",
        gatewayKind: "airport",
        relationship: "one-transfer",
        conditions: [localized("Check the current operating timetable before travel.")],
        sourceIds: ["src-airport-transit"],
      },
    ],
    attractionClusterRelations: [
      {
        clusterId: "central-historic-core",
        relationship: "walkable-core",
        conditions: [localized("Walking distance varies by the selected block and entrance.")],
        sourceIds: ["src-city-map"],
      },
    ],
    accessContext: {
      terrain: "mostly-flat",
      lastMile: "pedestrian-zone",
      vehicleAccess: "variable",
      conditions: [localized("Confirm the exact vehicle drop-off point for the travel date.")],
    },
    travellerFit: {
      firstTime: fit("strong"),
      family: fit("conditional"),
      olderTravellers: fit("conditional"),
      mobilityNeeds: fit("task-specific"),
    },
    tradeoffs: [localized("Central access can mean a longer last mile on pedestrian streets.")],
    sourceIds: ["src-city-map", "src-airport-transit"],
    sourceReviewedDate: "2026-08-20",
    recheckTriggers: [localized("Recheck after a transport opening, closure, or routing change.")],
    imageAssetIds: ["stay-beijing-qianmen-street-context"],
    status: "draft",
  };
}

function validRequirement() {
  return {
    schemaVersion: stayNetworkSchemaVersion,
    recordKind: "stay-requirement",
    requestKind: "room-verification",
    cityIds: ["shanghai", "hangzhou"],
    stayWindows: [
      { cityId: "shanghai", checkInDate: "2026-10-03", checkOutDate: "2026-10-06" },
      { cityId: "hangzhou", checkInDate: "2026-10-06", checkOutDate: "2026-10-08" },
    ],
    arrival: { nodeKind: "airport", nodeId: "shanghai-pudong-airport", timeBand: "late" },
    departure: { nodeKind: "railway-station", nodeId: "hangzhou-east-station", timeBand: "morning" },
    party: { adults: 2, childrenAgesAtTravel: [8], roomCount: 1 },
    roomNeeds: {
      bedConfiguration: "two-beds",
      connectingRooms: "not-needed",
      needIds: ["step-free-route", "shower-seat"],
    },
    mobility: {
      stepFreeRequired: true,
      mobilityAid: "manual-wheelchair",
      maxContinuousWalkMeters: 150,
      minimumDoorWidthMm: 800,
    },
    luggage: "large",
    travelDocumentClass: "foreign-passport",
    budget: { currency: "CNY", minimumPerRoomNight: null, maximumPerRoomNight: 1200 },
    recovery: {
      hasExistingBooking: false,
      bookingChannel: "none",
      problem: "none",
      evidenceHeld: ["none"],
    },
    originContentId: "stay-accessible-room-verification",
    locale: "en",
    replyContact: { channel: "email", value: "traveller@example.test" },
    supplierSharing: createDefaultSupplierSharingPreference(),
  };
}

function validVerification() {
  return {
    schemaVersion: stayNetworkSchemaVersion,
    recordKind: "property-verification",
    requestRef: "req_internal_123",
    internalPropertyRef: "prop_internal_456",
    internalSupplierRef: null,
    foreignGuestHandling: {
      legalRule: {
        sourceId: "official-national-lodging-rule",
        reviewedAt: "2026-08-20",
        scope: "national",
      },
      platformDisplay: {
        status: "shown-compatible",
        platformRef: "platform-observation-123",
        observedAt: "2026-08-20T02:00:00.000Z",
      },
      propertyConfirmation: {
        status: "unable-to-confirm",
        channel: "phone",
        checkedAt: "2026-08-20T03:00:00.000Z",
        expiresAt: "2026-08-27T03:00:00.000Z",
      },
    },
    accessChain: [
      { segment: "street-to-entrance", status: "verified", evidenceRefIds: ["evidence-entrance-photo"] },
      { segment: "bathroom", status: "partly-verified", evidenceRefIds: ["evidence-bathroom-measurements"] },
    ],
    verifiedAt: "2026-08-20T03:00:00.000Z",
    expiresAt: "2026-08-27T03:00:00.000Z",
    sourceRefIds: ["official-national-lodging-rule", "property-contact-log-123"],
  };
}

function validQuote() {
  return {
    schemaVersion: stayNetworkSchemaVersion,
    recordKind: "stay-quote",
    requestRef: "req_internal_123",
    internalPropertyRef: "prop_internal_456",
    internalSupplierRef: "supplier_internal_789",
    roomCategoryRef: "supplier-room-category-a",
    currency: "CNY",
    amount: 980,
    taxAndFeeStatus: "included",
    breakfastStatus: "optional",
    cancellationSummary: "Request-scoped terms supplied in writing; recheck before acceptance.",
    requestScopedAvailability: "confirmed-at-check",
    receivedAt: "2026-08-20T04:00:00.000Z",
    validUntil: "2026-08-21T04:00:00.000Z",
  };
}

test("contract uses the exact ten stay-city IDs and no grouped destination IDs", () => {
  assert.deepEqual(stayCityIds, [
    "beijing",
    "shanghai",
    "xian",
    "chengdu",
    "guangzhou",
    "zhangjiajie",
    "hangzhou",
    "chongqing",
    "guilin",
    "shenzhen",
  ]);
  for (const grouped of ["guilin-yangshuo", "hangzhou-suzhou", "guangzhou-shenzhen"]) {
    assert.equal(stayCityIds.includes(grouped), false);
  }
});

test("valid public area decision passes without property, price, inventory, PII, or guarantees", () => {
  const result = validatePublicStayAreaDecision(validPublicRecord());
  assert.equal(result.ok, true, result.ok ? "" : result.issues.join("\n"));
});

test("public guard rejects property, supplier, price, inventory, acceptance, PII, and guarantee fields", () => {
  const forbiddenExamples = [
    ["propertyId", "prop-123"],
    ["hotelName", "Example Hotel"],
    ["supplierRef", "supplier-123"],
    ["price", 900],
    ["availability", "available"],
    ["acceptsForeigners", true],
    ["passportNumber", "P123456"],
    ["bookingReference", "ORDER-123"],
    ["roomNumber", "1808"],
    ["guaranteedAccessible", true],
  ];

  for (const [key, payload] of forbiddenExamples) {
    const record = validPublicRecord();
    record.publicLeak = { [key]: payload };
    assert.deepEqual(findForbiddenPublicStayFields(record), [`publicLeak.${key}`]);
    const result = validatePublicStayAreaDecision(record);
    assert.equal(result.ok, false, `${key} must be rejected`);
    assert.match(result.issues.join("\n"), /forbidden in public stay data/);
  }
});

test("public guard rejects positive guarantee copy but permits explicit non-guarantee caveats", () => {
  const guaranteed = validPublicRecord();
  guaranteed.tradeoffs = [localized("Guaranteed accessible room and availability.")];
  assert.deepEqual(findForbiddenPublicStayGuaranteeClaims(guaranteed), ["tradeoffs[0].en"]);
  assert.equal(validatePublicStayAreaDecision(guaranteed).ok, false);

  const caveated = validPublicRecord();
  caveated.tradeoffs = [localized("An area-level fit does not guarantee an accessible room.")];
  assert.deepEqual(findForbiddenPublicStayGuaranteeClaims(caveated), []);
  assert.equal(validatePublicStayAreaDecision(caveated).ok, true);
});

test("supplier sharing is private, purpose-limited, and defaults to false", () => {
  const defaults = createDefaultSupplierSharingPreference();
  assert.deepEqual(defaults, {
    authorized: false,
    allowedRecipientKinds: [],
    allowedFieldGroups: [],
    purpose: null,
    consentAt: null,
  });
  assert.equal(validateStayRequirement(validRequirement()).ok, true);

  const invalid = validRequirement();
  invalid.supplierSharing.allowedRecipientKinds = ["property"];
  assert.equal(validateStayRequirement(invalid).ok, false, "sharing fields must stay empty before consent");
});

test("private requirement accepts exact cities and rejects grouped destination IDs", () => {
  const invalid = validRequirement();
  invalid.cityIds = ["guangzhou-shenzhen"];
  assert.equal(validateStayRequirement(invalid).ok, false);
  assert.match(validateStayRequirement(invalid).issues.join("\n"), /exact stay-city IDs/);
});

test("foreign-guest verification keeps law, platform display, and property execution separate", () => {
  const snapshot = validVerification();
  const result = validatePropertyVerificationSnapshot(snapshot);
  assert.equal(result.ok, true, result.ok ? "" : result.issues.join("\n"));
  assert.equal(snapshot.foreignGuestHandling.legalRule.scope, "national");
  assert.equal(snapshot.foreignGuestHandling.platformDisplay.status, "shown-compatible");
  assert.equal(snapshot.foreignGuestHandling.propertyConfirmation.status, "unable-to-confirm");

  const collapsed = validVerification();
  collapsed.foreignGuestHandling.acceptsForeigners = true;
  assert.equal(validatePropertyVerificationSnapshot(collapsed).ok, false, "a combined acceptance flag must not replace the three layers");

  const missingLayer = validVerification();
  delete missingLayer.foreignGuestHandling.propertyConfirmation;
  assert.equal(validatePropertyVerificationSnapshot(missingLayer).ok, false);
});

test("request-scoped quote validates privately but is rejected as public data", () => {
  const quote = validQuote();
  assert.equal(validateStayQuoteSnapshot(quote).ok, true);

  const publicRecord = validPublicRecord();
  publicRecord.quote = quote;
  const result = validatePublicStayAreaDecision(publicRecord);
  assert.equal(result.ok, false);
  assert.match(result.issues.join("\n"), /forbidden in public stay data/);
});

async function sourceFilesUnder(path) {
  try {
    const details = await stat(path);
    if (details.isFile()) return [path];
  } catch {
    return [];
  }
  const files = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const target = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFilesUnder(target));
    else if ([".ts", ".tsx", ".js", ".jsx", ".json", ".mdx"].includes(extname(entry.name))) files.push(target);
  }
  return files;
}

test("restricted stay contract is not wired into public content, client UI, or analytics", async () => {
  const roots = [
    resolve(repositoryRoot, "app"),
    resolve(repositoryRoot, "components"),
    resolve(repositoryRoot, "content"),
    resolve(repositoryRoot, "lib/analytics.ts"),
  ];
  const files = (await Promise.all(roots.map(sourceFilesUnder))).flat();
  for (const path of files) {
    const source = await readFile(path, "utf8");
    assert.doesNotMatch(source, /stayNetworkContract|internalPropertyRef|internalSupplierRef/, `restricted stay contract leaked into ${path}`);
  }
});

const networkOwnerSlugs = [
  "china-hotel-near-metro",
  "china-accessible-hotel-room-verification",
  "foreigners-china-hotel",
  "china-last-night-before-international-flight",
];

function blockSignature(source) {
  return [...source.matchAll(/\{\s*id:\s*"([^"]+)"\s*,\s*type:\s*"([^"]+)"/gu)]
    .map((match) => `${match[1]}:${match[2]}`);
}

test("the four nationwide stay-owner link targets exist", async () => {
  for (const slug of networkOwnerSlugs) {
    const metadata = await stat(resolve(repositoryRoot, `content/guides/${slug}/metadata.json`));
    assert.equal(metadata.isFile(), true, `${slug} metadata must exist`);
  }
});

test("ten-city matrix contains every exact city once", async () => {
  const source = await readFile(resolve(repositoryRoot, "docs/stay-network/ten-city-stay-matrix.md"), "utf8");
  const labels = ["Beijing", "Shanghai", "Xi'an", "Chengdu", "Guangzhou", "Zhangjiajie", "Hangzhou", "Chongqing", "Guilin", "Shenzhen"];
  for (const label of labels) {
    const rows = source.match(new RegExp(`^\\| ${label.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")} \\|`, "gmu")) ?? [];
    assert.equal(rows.length, 1, `${label} must appear in exactly one matrix row`);
  }
});

test("five established Hubs keep locale parity and the four stay handoffs", async () => {
  for (const city of ["beijing", "shanghai", "xian", "chengdu", "guangzhou"]) {
    const localeSources = {};
    for (const locale of ["en", "zh", "ko"]) {
      const source = await readFile(resolve(repositoryRoot, `content/destinations/${city}/body.${locale}.ts`), "utf8");
      localeSources[locale] = source;
      assert.match(source, /id:\s*"stay-quote-handoff"/u, `${city}/${locale} needs the stay quote handoff`);
      assert.match(source, /\/#planner-contact/u, `${city}/${locale} needs the human planner route`);
      for (const slug of networkOwnerSlugs) {
        const prefix = locale === "en" ? "" : `/${locale}`;
        assert.match(source, new RegExp(`href:\\s*"${prefix}/guides/${slug}/"`, "u"), `${city}/${locale} must link ${slug}`);
      }
    }
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.zh), `${city} EN/ZH block parity`);
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.ko), `${city} EN/KO block parity`);
  }
});

test("five city stay owners keep locale parity and the four national owners", async () => {
  const owners = {
    "shanghai-where-to-stay-first-trip": "2026-08-12",
    "xian-where-to-stay-city-wall-or-dayanta": "2026-08-12",
    "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba": "2026-08-12",
    "shenzhen-where-to-stay-futian-luohu-nanshan": "2026-08-13",
    "zhangjiajie-city-or-wulingyuan-hotel-base": "2026-08-13",
  };
  for (const [owner, expectedSourceDate] of Object.entries(owners)) {
    const localeSources = {};
    for (const locale of ["en", "zh", "ko"]) {
      const source = await readFile(resolve(repositoryRoot, `content/guides/${owner}/body.${locale}.ts`), "utf8");
      localeSources[locale] = source;
      assert.match(source, owner.startsWith("zhangjiajie-") ? /id:\s*"consult"/u : /id:\s*"stay-quote-handoff"/u, `${owner}/${locale} needs one human handoff`);
      for (const slug of networkOwnerSlugs) {
        const prefix = locale === "en" ? "" : `/${locale}`;
        assert.match(source, new RegExp(`href:\\s*"${prefix}/guides/${slug}/"`, "u"), `${owner}/${locale} must link ${slug}`);
      }
    }
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.zh), `${owner} EN/ZH block parity`);
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.ko), `${owner} EN/KO block parity`);
    const metadata = JSON.parse(await readFile(resolve(repositoryRoot, `content/guides/${owner}/metadata.json`), "utf8"));
    assert.equal(metadata.dateModified, "2026-08-20");
    assert.equal(metadata.sourceReviewedDate, expectedSourceDate, `${owner} must not imply a fresh factual review`);
  }
});

test("Hangzhou and Zhangjiajie shared Hub builders carry trilingual stay handoffs", async () => {
  for (const city of ["hangzhou", "zhangjiajie"]) {
    const source = await readFile(resolve(repositoryRoot, `content/destinations/${city}/body.shared.ts`), "utf8");
    assert.match(source, /id:\s*"stay-owners"/u);
    assert.match(source, /id:\s*"stay-quote-handoff"/u);
    for (const slug of networkOwnerSlugs) {
      const occurrences = source.match(new RegExp(`"${slug}"`, "gu")) ?? [];
      assert.equal(occurrences.length, 3, `${city} must carry ${slug} once in each locale copy`);
    }
  }
});

test("policy review dates preserve complete versus partial rechecks", async () => {
  const foreigners = JSON.parse(await readFile(resolve(repositoryRoot, "content/guides/foreigners-china-hotel/metadata.json"), "utf8"));
  const foreignersLog = await readFile(resolve(repositoryRoot, "content/guides/foreigners-china-hotel/source-log.md"), "utf8");
  const accessible = JSON.parse(await readFile(resolve(repositoryRoot, "content/guides/china-accessible-hotel-room-verification/metadata.json"), "utf8"));
  const lastNight = JSON.parse(await readFile(resolve(repositoryRoot, "content/guides/china-last-night-before-international-flight/metadata.json"), "utf8"));
  const lastNightLog = await readFile(resolve(repositoryRoot, "content/guides/china-last-night-before-international-flight/source-log.md"), "utf8");

  assert.equal(foreigners.sourceReviewedDate, "2026-08-20");
  assert.match(foreignersLog, /all seven official URLs/u);
  assert.equal(accessible.sourceReviewedDate, "2026-08-20");
  assert.equal(lastNight.dateModified, "2026-08-20");
  assert.equal(lastNight.sourceReviewedDate, "2026-08-11");
  assert.match(lastNightLog, /not a page-complete factual re-review/u);
  assert.match(lastNightLog, /Shanghai Airport Authority page did not return a usable page/u);
});
