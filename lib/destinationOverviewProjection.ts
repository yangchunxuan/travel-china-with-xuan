import type { StructuredPageBody } from "./content-system/page-body";
import type { DestinationHubId } from "./destinationHubs";
import type { HomegroundLocale } from "./homegroundI18n";

type PageBlock = StructuredPageBody["blocks"][number];
type HeadingBlock = Extract<PageBlock, { type: "heading" }>;
type TableBlock = Extract<PageBlock, { type: "table" }>;

export type DestinationOverviewSignalId =
  | "nights"
  | "stay"
  | "gateway"
  | "next";

export interface DestinationOverviewSignal {
  readonly id: DestinationOverviewSignalId;
  readonly sourceHeading: string;
  readonly summary: string;
  readonly emphasis?: string;
}

interface ProjectionDefinition {
  readonly nights: readonly string[];
  readonly stay: readonly string[];
  readonly gateway: readonly string[];
  readonly next: readonly string[];
}

/**
 * Source section ids are stable across EN/ZH/KO. This keeps the long-form
 * research bodies intact while the public city Hub renders only four
 * city-level decisions. Execution tables, recovery workflows, FAQs and
 * booking instructions stay out of the overview projection.
 */
const projectionDefinitions = {
  beijing: {
    nights: ["nights-heading"],
    stay: ["stay-heading"],
    gateway: ["gateways-heading"],
    next: ["next-heading"],
  },
  shanghai: {
    nights: ["days-heading"],
    stay: ["stay-heading"],
    gateway: ["airports-heading", "stations-heading"],
    next: ["delta-heading"],
  },
  xian: {
    nights: ["nights-heading"],
    stay: ["stay-heading"],
    gateway: ["gateways-heading"],
    next: ["next-heading"],
  },
  chengdu: {
    nights: ["nights-heading"],
    stay: ["stay-heading"],
    gateway: ["gateways-heading"],
    next: ["next-heading"],
  },
  guangzhou: {
    nights: ["decision-heading"],
    stay: ["stay-heading"],
    gateway: ["airport-heading", "stations-heading"],
    next: ["extensions-heading"],
  },
  hangzhou: {
    nights: ["nights-heading"],
    stay: ["stay-heading"],
    gateway: ["gateway-heading"],
    next: ["onward-heading"],
  },
  zhangjiajie: {
    nights: ["days-heading"],
    stay: ["base-heading"],
    gateway: ["gateway-heading"],
    next: ["onward-heading"],
  },
  chongqing: {
    nights: ["heading-012"],
    stay: ["heading-021"],
    gateway: ["heading-027"],
    next: ["heading-062"],
  },
} as const satisfies Record<DestinationHubId, ProjectionDefinition>;

const sourceSectionNumberPrefix = /^\s*\d+\s*[.．、)）]\s*/u;

function stripSourceSectionNumber(value: string) {
  const clean = value.replace(sourceSectionNumberPrefix, "").trim();
  return clean || value.trim();
}

function sectionBlocks(body: StructuredPageBody, headingId: string) {
  const start = body.blocks.findIndex(
    (block) => block.type === "heading" && block.id === headingId,
  );
  if (start < 0) return null;

  const heading = body.blocks[start] as HeadingBlock;
  const blocks: PageBlock[] = [];
  for (let index = start + 1; index < body.blocks.length; index += 1) {
    const block = body.blocks[index];
    if (block.type === "heading" && block.level === 2) break;
    blocks.push(block);
  }
  return { heading, blocks };
}

function preferredTableRow(table: TableBlock, signalId: DestinationOverviewSignalId) {
  if (signalId === "stay" || signalId === "next") return table.rows[0];

  const preferredPattern =
    /recommended|balanced|default|first visit|practical|two nights|three nights|4.?5|建议|推荐|默认|平衡|两晚|三晚|권장|기본|균형|2박|3박/iu;
  return (
    table.rows.find((row) => preferredPattern.test(row.join(" "))) ??
    table.rows[Math.floor(table.rows.length / 2)] ??
    table.rows[0]
  );
}

function trimSummary(
  value: string,
  locale: HomegroundLocale,
  maxWords = 80,
  maxCharacters = 170,
) {
  const clean = value.replace(/\s+/gu, " ").trim();
  if (locale === "zh") {
    if (clean.length <= maxCharacters) return clean;
    const candidate = clean.slice(0, maxCharacters);
    const boundary = Math.max(
      candidate.lastIndexOf("。"),
      candidate.lastIndexOf("；"),
      candidate.lastIndexOf("，"),
    );
    return `${candidate
      .slice(0, boundary > Math.floor(maxCharacters * 0.6) ? boundary + 1 : maxCharacters)
      .trim()}…`;
  }

  const words = clean.split(" ");
  return words.length <= maxWords
    ? clean
    : `${words.slice(0, maxWords).join(" ")}…`;
}

function extractSignal(
  body: StructuredPageBody,
  locale: HomegroundLocale,
  signalId: DestinationOverviewSignalId,
  headingIds: readonly string[],
): DestinationOverviewSignal {
  const sections = headingIds
    .map((headingId) => sectionBlocks(body, headingId))
    .filter((section): section is NonNullable<typeof section> => section !== null);

  if (sections.length === 0) {
    throw new Error(`Destination overview is missing its ${signalId} source section.`);
  }

  const sectionProse = sections.map(({ blocks }) =>
    blocks.flatMap((block) => {
      if (block.type === "paragraph") return [block.text];
      if (block.type === "callout") return [block.body];
      return [];
    }),
  );
  const prose = sectionProse.flat();
  const tables = sections.flatMap(({ blocks }) =>
    blocks.filter((block): block is TableBlock => block.type === "table"),
  );

  if ((signalId === "nights" || signalId === "stay" || signalId === "next") && tables[0]) {
    const row = preferredTableRow(tables[0], signalId);
    const [emphasis, ...rest] = row;
    return {
      id: signalId,
      sourceHeading: stripSourceSectionNumber(sections[0].heading.text),
      emphasis,
      summary: trimSummary(rest.join(" · "), locale),
    };
  }

  if (prose.length > 0) {
    const summary =
      signalId === "gateway" && sections.length > 1
        ? sectionProse
            .map((items) => trimSummary(items.join(" "), locale, 40, 85))
            .join(" ")
        : prose.join(" ");
    return {
      id: signalId,
      sourceHeading: sections
        .map(({ heading }) => stripSourceSectionNumber(heading.text))
        .join(" · "),
      summary: trimSummary(summary, locale),
    };
  }

  if (tables[0]) {
    const row = preferredTableRow(tables[0], signalId);
    const [emphasis, ...rest] = row;
    return {
      id: signalId,
      sourceHeading: stripSourceSectionNumber(sections[0].heading.text),
      emphasis,
      summary: trimSummary(rest.join(" · "), locale),
    };
  }

  throw new Error(`Destination overview cannot summarize its ${signalId} source section.`);
}

export function projectDestinationOverview(
  body: StructuredPageBody,
  hubId: DestinationHubId,
  locale: HomegroundLocale,
) {
  const definition = projectionDefinitions[hubId];
  return (Object.keys(definition) as DestinationOverviewSignalId[]).map((signalId) =>
    extractSignal(body, locale, signalId, definition[signalId]),
  );
}

/**
 * The opening argument is also projected. It keeps the lead and at most two
 * explanatory blocks from the first city-level section. A single coarse fit
 * table or decision list is permitted only when that source section has no
 * prose, and it is capped at four rows/items. A section already used by one
 * of the four signals is skipped here so the same decision cannot appear
 * twice. Nothing else from the long research body enters the city overview
 * DOM.
 */
export function projectDestinationOpening(
  body: StructuredPageBody,
  hubId: DestinationHubId,
): StructuredPageBody {
  const firstHeadingIndex = body.blocks.findIndex(
    (block) => block.type === "heading" && block.level === 2,
  );
  if (firstHeadingIndex < 0) {
    return {
      schemaVersion: body.schemaVersion,
      blocks: body.blocks.filter((block) => block.type === "lead").slice(0, 1),
    };
  }

  const nextHeadingIndex = body.blocks.findIndex(
    (block, index) =>
      index > firstHeadingIndex && block.type === "heading" && block.level === 2,
  );
  const sectionEnd = nextHeadingIndex < 0 ? body.blocks.length : nextHeadingIndex;
  const beforeHeading = body.blocks
    .slice(0, firstHeadingIndex)
    .filter((block) => block.type === "lead" || block.type === "callout")
    .slice(0, 2);
  // Guangzhou's registry summary already carries the same city-role argument
  // as the research lead. Drop that lead only from the rendered projection so
  // the source research remains intact and every other city keeps its opening.
  const projectedPrelude =
    hubId === "guangzhou"
      ? beforeHeading.filter((block) => block.type !== "lead")
      : beforeHeading;
  const heading = body.blocks[firstHeadingIndex] as HeadingBlock;
  const projectedHeading: HeadingBlock = {
    ...heading,
    text: stripSourceSectionNumber(heading.text),
  };
  const projectedSignalHeadingIds = new Set(
    Object.values(projectionDefinitions[hubId]).flat(),
  );
  if (projectedSignalHeadingIds.has(heading.id)) {
    return {
      schemaVersion: body.schemaVersion,
      blocks: projectedPrelude,
    };
  }

  const section = body.blocks.slice(firstHeadingIndex + 1, sectionEnd);
  const prose = section
    .filter((block) => block.type === "paragraph" || block.type === "callout")
    .slice(0, 2);
  const coarseTable = section.find((block): block is TableBlock => block.type === "table");
  const coarseList = section.find(
    (block): block is Extract<PageBlock, { type: "list" }> => block.type === "list",
  );
  const evidence =
    prose.length > 0
      ? prose
      : coarseTable
        ? [{ ...coarseTable, rows: coarseTable.rows.slice(0, 4) }]
        : coarseList
          ? [{ ...coarseList, items: coarseList.items.slice(0, 4) }]
          : [];

  return {
    schemaVersion: body.schemaVersion,
    blocks: [
      ...projectedPrelude,
      ...(evidence.length > 0 ? [projectedHeading, ...evidence] : []),
    ],
  };
}
