import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  computeGuideBaselineContractSha256,
  generateGuideRegistry,
  validateGuideRepositorySnapshot,
} from "../../tools/generate-guide-registry.mjs";

test("guide registry check is semantic across LF and CRLF worktrees", async () => {
  const fixture = await createFixture();
  const { registryOutput, bodiesOutput } = fixture.options;
  const generated = await generateGuideRegistry(fixture.options);
  assert.ok(generated.guideCount > 0);
  for (const filePath of [registryOutput, bodiesOutput]) {
    const content = await readFile(filePath, "utf8");
    await writeFile(filePath, content.replaceAll("\n", "\r\n"), "utf8");
  }

  const checked = await generateGuideRegistry({ ...fixture.options, check: true });
  assert.equal(checked.guideCount, generated.guideCount);
});

test("a pending material update to a frozen URL blocks the production generator", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "homeground-guide-update-gate-"));
  const guidesRoot = path.resolve(import.meta.dirname, "../../content/guides");
  await assert.rejects(
    generateGuideRegistry({
      guidesRoot,
      registryOutput: path.join(root, "registry.ts"),
      bodiesOutput: path.join(root, "bodies.ts"),
    }),
    /material update to a frozen baseline URL.*atomic release/u,
  );
});

test("an update-existing candidate rejects half-approved state and accepts one atomic release", async () => {
  const fixture = await createFixture();
  makeFixtureUpdateCandidate(fixture);
  fixture.governance.candidates[0].centralDecision = "approved";
  await writeFile(
    fixture.options.governancePath,
    JSON.stringify(fixture.governance),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(fixture.options),
    /material update to a frozen baseline URL.*atomic release/u,
  );

  fixture.metadata.editorialStatus = "approved";
  fixture.metadata.indexApproved = true;
  fixture.governance.candidates[0].approvedReleaseDate = fixture.metadata.dateModified;
  await Promise.all([
    writeFile(
      path.join(fixture.directory, "metadata.json"),
      JSON.stringify(fixture.metadata),
      "utf8",
    ),
    writeFile(
      fixture.options.governancePath,
      JSON.stringify(fixture.governance),
      "utf8",
    ),
  ]);
  await generateGuideRegistry(fixture.options);
});

test("an update-existing candidate cannot rewrite the frozen original publication date", async () => {
  const fixture = await createFixture();
  makeFixtureUpdateCandidate(fixture);
  fixture.governance.candidates[0].centralDecision = "approved";
  fixture.metadata.editorialStatus = "approved";
  fixture.metadata.indexApproved = true;
  fixture.governance.candidates[0].approvedReleaseDate = fixture.metadata.dateModified;
  fixture.metadata.datePublished = "2025-01-01";
  await Promise.all([
    writeFile(
      path.join(fixture.directory, "metadata.json"),
      JSON.stringify(fixture.metadata),
      "utf8",
    ),
    writeFile(
      fixture.options.governancePath,
      JSON.stringify(fixture.governance),
      "utf8",
    ),
  ]);

  await assert.rejects(
    generateGuideRegistry(fixture.options),
    /datePublished must remain 2026-09-04 for update-existing/u,
  );
});

test("the frozen baseline digest rejects a synchronized publication-date rewrite", async () => {
  const fixture = await createFixture();
  makeFixtureUpdateCandidate(fixture);
  const forgedDate = "2025-01-01";
  fixture.metadata.datePublished = forgedDate;
  fixture.governance.candidates[0].baselinePublishedDate = forgedDate;
  fixture.governance.baseline.publishedDatesByGuideId["sample-guide"] = forgedDate;
  await Promise.all([
    writeFile(
      path.join(fixture.directory, "metadata.json"),
      JSON.stringify(fixture.metadata),
      "utf8",
    ),
    writeFile(
      fixture.options.governancePath,
      JSON.stringify(fixture.governance),
      "utf8",
    ),
  ]);

  await assert.rejects(
    generateGuideRegistry(fixture.options),
    /frozen baseline contract digest mismatch/u,
  );
});

test("a new candidate release date is mandatory, exact and absent before index approval", async () => {
  const approved = await createFixture();
  approved.metadata.editorialStatus = "approved";
  approved.metadata.indexApproved = true;
  approved.governance.candidates[0].centralDecision = "approved";
  approved.governance.candidates[0].approvedReleaseDate = approved.metadata.datePublished;
  await Promise.all([
    writeFile(path.join(approved.directory, "metadata.json"), JSON.stringify(approved.metadata), "utf8"),
    writeFile(approved.options.governancePath, JSON.stringify(approved.governance), "utf8"),
  ]);
  await generateGuideRegistry(approved.options);

  const mismatch = await createFixture();
  mismatch.metadata.editorialStatus = "approved";
  mismatch.metadata.indexApproved = true;
  mismatch.governance.candidates[0].centralDecision = "approved";
  mismatch.governance.candidates[0].approvedReleaseDate = "2026-09-03";
  await Promise.all([
    writeFile(path.join(mismatch.directory, "metadata.json"), JSON.stringify(mismatch.metadata), "utf8"),
    writeFile(mismatch.options.governancePath, JSON.stringify(mismatch.governance), "utf8"),
  ]);
  await assert.rejects(
    generateGuideRegistry(mismatch.options),
    /datePublished must equal candidate approvedReleaseDate/u,
  );

  const premature = await createFixture();
  premature.governance.candidates[0].approvedReleaseDate = "2026-09-04";
  await writeFile(
    premature.options.governancePath,
    JSON.stringify(premature.governance),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(premature.options),
    /omit candidate approvedReleaseDate while indexApproved is false/u,
  );
});

test("verification, content and approved release dates reject UTC tomorrow", async () => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const futureVerification = await createFixture();
  futureVerification.metadata.lastVerified = tomorrow;
  futureVerification.metadata.sourceReviewedDate = tomorrow;
  await writeFile(
    path.join(futureVerification.directory, "metadata.json"),
    JSON.stringify(futureVerification.metadata),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(futureVerification.options),
    /lastVerified cannot be in the future/u,
  );

  const futureRelease = await createFixture();
  futureRelease.metadata.editorialStatus = "approved";
  futureRelease.metadata.indexApproved = true;
  futureRelease.governance.candidates[0].centralDecision = "approved";
  futureRelease.governance.candidates[0].approvedReleaseDate = tomorrow;
  await Promise.all([
    writeFile(
      path.join(futureRelease.directory, "metadata.json"),
      JSON.stringify(futureRelease.metadata),
      "utf8",
    ),
    writeFile(
      futureRelease.options.governancePath,
      JSON.stringify(futureRelease.governance),
      "utf8",
    ),
  ]);
  await assert.rejects(
    generateGuideRegistry(futureRelease.options),
    /approvedReleaseDate cannot be in the future/u,
  );

  for (const field of ["datePublished", "dateModified"]) {
    const futureContentDate = await createFixture();
    futureContentDate.metadata[field] = tomorrow;
    if (field === "datePublished") futureContentDate.metadata.dateModified = tomorrow;
    await writeFile(
      path.join(futureContentDate.directory, "metadata.json"),
      JSON.stringify(futureContentDate.metadata),
      "utf8",
    );
    await assert.rejects(
      generateGuideRegistry(futureContentDate.options),
      new RegExp(`${field} cannot be in the future`, "u"),
    );
  }
});

test("dateModified cannot precede datePublished", async () => {
  const fixture = await createFixture();
  fixture.metadata.datePublished = "2026-09-04";
  fixture.metadata.dateModified = "2026-09-03";
  await writeFile(
    path.join(fixture.directory, "metadata.json"),
    JSON.stringify(fixture.metadata),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(fixture.options),
    /dateModified cannot be earlier than datePublished/u,
  );
});

test("candidateAction is a closed enum with exact baseline semantics", async () => {
  const invalid = await createFixture();
  invalid.governance.candidates[0].candidateAction = "create-new";
  await writeFile(
    invalid.options.governancePath,
    JSON.stringify(invalid.governance),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(invalid.options),
    /invalid candidateAction "create-new"/u,
  );

  const explicitNew = await createFixture();
  explicitNew.governance.candidates[0].candidateAction = "new";
  await writeFile(
    explicitNew.options.governancePath,
    JSON.stringify(explicitNew.governance),
    "utf8",
  );
  await generateGuideRegistry(explicitNew.options);

  const newWithBaselineDate = await createFixture();
  newWithBaselineDate.governance.candidates[0].baselinePublishedDate =
    newWithBaselineDate.metadata.datePublished;
  await writeFile(
    newWithBaselineDate.options.governancePath,
    JSON.stringify(newWithBaselineDate.governance),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(newWithBaselineDate.options),
    /baselinePublishedDate is only valid for update-existing/u,
  );

  const updateWithoutBaselineDate = await createFixture();
  updateWithoutBaselineDate.governance.baseline.independentGuideIds = ["sample-guide"];
  updateWithoutBaselineDate.governance.candidates[0].candidateAction = "update-existing";
  syncFixtureBaselineContract(updateWithoutBaselineDate);
  await writeFile(
    updateWithoutBaselineDate.options.governancePath,
    JSON.stringify(updateWithoutBaselineDate.governance),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(updateWithoutBaselineDate.options),
    /needs a frozen baseline publication date for update-existing/u,
  );

  const falseUpdate = await createFixture();
  falseUpdate.governance.candidates[0].candidateAction = "update-existing";
  await writeFile(
    falseUpdate.options.governancePath,
    JSON.stringify(falseUpdate.governance),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(falseUpdate.options),
    /update-existing for a frozen baseline identity and new or omitted for a new identity/u,
  );
});

test("the frozen baseline rejects a same-count identity substitution without network access", async () => {
  const fixture = await createFixture();
  makeFixtureUpdateCandidate(fixture);

  fixture.governance.baseline.independentGuideIds = ["substituted-guide"];
  fixture.governance.baseline.publishedDatesByGuideId = {
    "substituted-guide": fixture.metadata.datePublished,
  };
  await writeFile(
    fixture.options.governancePath,
    JSON.stringify(fixture.governance),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(fixture.options),
    /frozen baseline contract digest mismatch/u,
  );
});

test("a pending baseline update cannot mask a later guide validation failure", async () => {
  const fixture = await createFixture();
  makeFixtureUpdateCandidate(fixture);

  const laterId = "z-later-guide";
  const laterDirectory = path.join(fixture.guidesRoot, laterId);
  const laterMetadata = structuredClone(fixture.metadata);
  laterMetadata.id = laterId;
  laterMetadata.candidateId = "test-candidate-02";
  for (const [locale, localized] of Object.entries(laterMetadata.locales)) {
    localized.path = `${locale === "en" ? "" : `/${locale}`}/guides/${laterId}/`;
  }
  fixture.governance.candidates.push({
    candidateId: laterMetadata.candidateId,
    guideId: laterId,
    centralDecision: "pending",
    assignmentSource: "test",
  });
  await mkdir(laterDirectory, { recursive: true });
  await Promise.all([
    writeFile(
      fixture.options.governancePath,
      JSON.stringify(fixture.governance),
      "utf8",
    ),
    writeFile(
      path.join(laterDirectory, "metadata.json"),
      JSON.stringify(laterMetadata),
      "utf8",
    ),
    writeFile(
      path.join(laterDirectory, "body.en.ts"),
      fixture.body([{ id: "first", type: "prose" }]),
      "utf8",
    ),
    writeFile(
      path.join(laterDirectory, "body.zh.ts"),
      fixture.body([{ id: "first", type: "prose" }]),
      "utf8",
    ),
    writeFile(
      path.join(laterDirectory, "body.ko.ts"),
      fixture.body([{ id: "wrong", type: "prose" }]),
      "utf8",
    ),
  ]);

  await assert.rejects(
    generateGuideRegistry(fixture.options),
    /z-later-guide.*structured body block parity failed/u,
  );
});

test("check mode reports stale outputs and a pending update together", async () => {
  const fixture = await createFixture();
  makeFixtureUpdateCandidate(fixture);
  await writeFile(
    fixture.options.governancePath,
    JSON.stringify(fixture.governance),
    "utf8",
  );

  await assert.rejects(
    generateGuideRegistry({ ...fixture.options, check: true }),
    (error) => {
      assert.match(error.message, /Generated guide file is missing or stale/u);
      assert.match(error.message, /material update to a frozen baseline URL.*atomic release/u);
      return true;
    },
  );
});

test("the shared validator fails closed while preserving pending update deployment blocks", async () => {
  const pendingUpdate = await createFixture();
  makeFixtureUpdateCandidate(pendingUpdate);
  await writeFile(
    pendingUpdate.options.governancePath,
    JSON.stringify(pendingUpdate.governance),
    "utf8",
  );
  const snapshot = await validateGuideRepositorySnapshot({
    guidesRoot: pendingUpdate.options.guidesRoot,
    governancePath: pendingUpdate.options.governancePath,
    entityRegistryPath: pendingUpdate.options.entityRegistryPath,
    expectedBaselineSourceCommit: pendingUpdate.options.expectedBaselineSourceCommit,
    expectedBaselineContractSha256: pendingUpdate.options.expectedBaselineContractSha256,
  });
  assert.deepEqual(snapshot.deploymentBlocks, ["sample-guide"]);

  const invalid = await createFixture();
  invalid.metadata.dateModified = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  await writeFile(
    path.join(invalid.directory, "metadata.json"),
    JSON.stringify(invalid.metadata),
    "utf8",
  );
  await assert.rejects(
    validateGuideRepositorySnapshot({
      guidesRoot: invalid.options.guidesRoot,
      governancePath: invalid.options.governancePath,
      entityRegistryPath: invalid.options.entityRegistryPath,
      expectedBaselineSourceCommit: invalid.options.expectedBaselineSourceCommit,
      expectedBaselineContractSha256: invalid.options.expectedBaselineContractSha256,
    }),
    /dateModified cannot be in the future/u,
  );
});

async function createFixture() {
  const root = await mkdtemp(path.join(tmpdir(), "homeground-guide-gate-fixture-"));
  const guidesRoot = path.join(root, "content", "guides");
  const directory = path.join(guidesRoot, "sample-guide");
  const publicRoot = path.join(root, "public", "images");
  const libRoot = path.join(root, "lib");
  await Promise.all([
    mkdir(directory, { recursive: true }),
    mkdir(publicRoot, { recursive: true }),
    mkdir(libRoot, { recursive: true }),
  ]);
  await writeFile(path.join(publicRoot, "sample.webp"), "fixture", "utf8");
  const localeEntry = (locale) => ({
    path: `${locale === "en" ? "" : `/${locale}`}/guides/sample-guide/`,
    title: `${locale} title`,
    headline: `${locale} headline`,
    description: `${locale} description`,
    heroAlt: `${locale} alt`,
    navTitle: `${locale} nav`,
    featuredLinkLabel: `${locale} link`,
    openGraphLocale: locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ko_KR",
    cardTags: [locale],
  });
  const metadata = {
    id: "sample-guide",
    candidateId: "test-candidate-01",
    editorialStatus: "provisional",
    primaryCollectionId: "explore-cities-neighborhoods",
    primaryEntityId: "city-sample",
    secondaryEntityIds: ["country-china"],
    freshnessClass: "high",
    lastVerified: "2026-09-04",
    indexApproved: false,
    type: "planning",
    pillar: "explore-cities-neighborhoods",
    audienceMarkets: ["global"],
    format: "decision-guide",
    topics: ["sample"],
    destinations: ["sample"],
    heroImagePath: "/images/sample.webp",
    heroImageUrl: "https://homegroundchina.com/images/sample.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-09-04",
    dateModified: "2026-09-04",
    sourceReviewedDate: "2026-09-04",
    search: { section: "explore", family: "task", primaryIntent: "execute" },
    layout: { mode: "template", templateId: "editorial-v1" },
    locales: { en: localeEntry("en"), zh: localeEntry("zh"), ko: localeEntry("ko") },
  };
  const governance = {
    schemaVersion: "1.0.0",
    baselineSourceCommit: "0".repeat(40),
    controlledValues: {
      editorialStatuses: ["provisional", "approved", "retired"],
      freshnessClasses: ["low", "medium", "high", "critical"],
      collectionIds: ["explore-cities-neighborhoods"],
    },
    baseline: {
      independentGuideIds: [],
      legacyGuideIds: [],
      publishedDatesByGuideId: {},
    },
    candidates: [{
      candidateId: "test-candidate-01",
      guideId: "sample-guide",
      centralDecision: "pending",
      assignmentSource: "test",
    }],
  };
  const entities = ["city-sample", "country-china"].map((id) => ({
    schemaVersion: "1.0.0",
    recordType: "entity",
    data: { id },
  }));
  const body = (blocks) => `export default ${JSON.stringify({ schemaVersion: "1.0.0", blocks })};\n`;
  await Promise.all([
    writeFile(path.join(directory, "metadata.json"), JSON.stringify(metadata), "utf8"),
    writeFile(path.join(root, "content", "guide-governance.json"), JSON.stringify(governance), "utf8"),
    writeFile(
      path.join(libRoot, "guideRegistry.ts"),
      "export const legacyGuideRegistry = [] as const satisfies readonly GuideEntry[];\n",
      "utf8",
    ),
    mkdir(path.join(root, "content", "entities"), { recursive: true }).then(() =>
      writeFile(path.join(root, "content", "entities", "core-places.json"), JSON.stringify(entities), "utf8"),
    ),
    ...["en", "zh", "ko"].map((locale) =>
      writeFile(
        path.join(directory, `body.${locale}.ts`),
        body([{ id: "first", type: "prose" }, { id: "second", type: "note" }]),
        "utf8",
      ),
    ),
  ]);
  return {
    root,
    guidesRoot,
    directory,
    metadata,
    governance,
    body,
    options: {
      guidesRoot,
      registryOutput: path.join(root, "registry.ts"),
      bodiesOutput: path.join(root, "bodies.ts"),
      governancePath: path.join(root, "content", "guide-governance.json"),
      entityRegistryPath: path.join(root, "content", "entities", "core-places.json"),
      expectedBaselineSourceCommit: governance.baselineSourceCommit,
      expectedBaselineContractSha256: computeGuideBaselineContractSha256(governance.baseline),
    },
  };
}

function syncFixtureBaselineContract(fixture) {
  fixture.options.expectedBaselineSourceCommit = fixture.governance.baselineSourceCommit;
  fixture.options.expectedBaselineContractSha256 =
    computeGuideBaselineContractSha256(fixture.governance.baseline);
}

function makeFixtureUpdateCandidate(fixture) {
  fixture.governance.baseline.independentGuideIds = ["sample-guide"];
  fixture.governance.baseline.publishedDatesByGuideId = {
    "sample-guide": fixture.metadata.datePublished,
  };
  fixture.governance.candidates[0].candidateAction = "update-existing";
  fixture.governance.candidates[0].baselinePublishedDate = fixture.metadata.datePublished;
  syncFixtureBaselineContract(fixture);
}

test("candidate governance rejects unknown values, false approvals and unverifiable dates", async (t) => {
  const cases = [
    ["unknown editorial status", (value) => { value.editorialStatus = "ready"; }, /editorialStatus is invalid/u],
    ["unknown collection", (value) => { value.primaryCollectionId = "explore-made-up"; }, /primaryCollectionId is unknown/u],
    ["wrong collection section", (value) => { value.primaryCollectionId = "explore-cities-neighborhoods"; value.search.section = "stay"; }, /belongs to explore, not stay/u],
    ["unknown entity", (value) => { value.primaryEntityId = "city-nowhere"; }, /unknown/u],
    ["invalid date", (value) => { value.lastVerified = "2026-02-30"; }, /real YYYY-MM-DD/u],
    ["verification drift", (value) => { value.lastVerified = "2026-09-03"; }, /must equal sourceReviewedDate/u],
    ["pending central approval", (value) => { value.editorialStatus = "approved"; value.indexApproved = true; }, /centralDecision is pending/u],
  ];
  for (const [name, mutate, expected] of cases) {
    await t.test(name, async () => {
      const fixture = await createFixture();
      mutate(fixture.metadata);
      await writeFile(
        path.join(fixture.directory, "metadata.json"),
        JSON.stringify(fixture.metadata),
        "utf8",
      );
      await assert.rejects(generateGuideRegistry(fixture.options), expected);
    });
  }
});

test("ordered structured block parity catches missing, reordered and changed types at the first mismatch", async (t) => {
  const mutations = [
    ["missing", [{ id: "first", type: "prose" }], /index 1: en=.*second.*ko=null/u],
    ["reordered", [{ id: "second", type: "note" }, { id: "first", type: "prose" }], /index 0: en=.*first.*ko=.*second/u],
    ["changed type", [{ id: "first", type: "warning" }, { id: "second", type: "note" }], /index 0: en=.*prose.*ko=.*warning/u],
  ];
  for (const [name, blocks, expected] of mutations) {
    await t.test(name, async () => {
      const fixture = await createFixture();
      await writeFile(
        path.join(fixture.directory, "body.ko.ts"),
        fixture.body(blocks),
        "utf8",
      );
      await assert.rejects(generateGuideRegistry(fixture.options), expected);
    });
  }
});

test("a genuinely single-locale candidate is allowed but a partial two-locale set is not", async () => {
  const single = await createFixture();
  delete single.metadata.locales.zh;
  delete single.metadata.locales.ko;
  await writeFile(
    path.join(single.directory, "metadata.json"),
    JSON.stringify(single.metadata),
    "utf8",
  );
  await generateGuideRegistry(single.options);

  const partial = await createFixture();
  delete partial.metadata.locales.ko;
  await writeFile(
    path.join(partial.directory, "metadata.json"),
    JSON.stringify(partial.metadata),
    "utf8",
  );
  await assert.rejects(
    generateGuideRegistry(partial.options),
    /single-locale or provide the complete en\/zh\/ko set/u,
  );
});
