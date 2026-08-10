export type PageBodyBlock =
  | {
      readonly id: string;
      readonly type: "lead";
      readonly text: string;
    }
  | {
      readonly id: string;
      readonly type: "heading";
      readonly level: 2 | 3;
      readonly text: string;
    }
  | {
      readonly id: string;
      readonly type: "paragraph";
      readonly text: string;
    }
  | {
      readonly id: string;
      readonly type: "figure";
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
      readonly caption?: string;
    }
  | {
      readonly id: string;
      readonly type: "list";
      readonly ordered?: boolean;
      readonly items: readonly string[];
    }
  | {
      readonly id: string;
      readonly type: "callout";
      readonly title?: string;
      readonly body: string;
      readonly tone?: "neutral" | "decision" | "warning";
    }
  | {
      readonly id: string;
      readonly type: "comparison";
      readonly title?: string;
      readonly columns: readonly {
        readonly heading: string;
        readonly body?: string;
        readonly items?: readonly string[];
      }[];
    }
  | {
      readonly id: string;
      readonly type: "table";
      readonly caption: string;
      readonly columns: readonly string[];
      readonly rows: readonly (readonly string[])[];
    }
  | {
      readonly id: string;
      readonly type: "internal-links";
      readonly title: string;
      readonly items: readonly {
        readonly label: string;
        readonly href: string;
        readonly description?: string;
      }[];
    }
  | {
      readonly id: string;
      readonly type: "sources";
      readonly title: string;
      readonly items: readonly {
        readonly label: string;
        readonly url: string;
        readonly publisher?: string;
        readonly reviewedAt?: string;
      }[];
    };

export interface StructuredPageBody {
  readonly schemaVersion: "1.0.0";
  readonly blocks: readonly PageBodyBlock[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
): boolean {
  const allowed = new Set(allowedKeys);
  return Object.keys(value).every((key) => allowed.has(key));
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function optionalNonEmpty(value: unknown): value is string | undefined {
  return value === undefined || nonEmpty(value);
}

function validHttpUrl(value: unknown): value is string {
  if (!nonEmpty(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validInternalPath(value: unknown): value is string {
  return nonEmpty(value) && value.startsWith("/") && !value.startsWith("//");
}

function validIsoDate(value: unknown): value is string | undefined {
  if (value === undefined) return true;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export function assertStructuredPageBody(value: unknown): StructuredPageBody {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ["schemaVersion", "blocks"]) ||
    value.schemaVersion !== "1.0.0" ||
    !Array.isArray(value.blocks) ||
    value.blocks.length === 0
  ) {
    throw new Error(
      "Structured page body must use schemaVersion 1.0.0 and contain at least one block.",
    );
  }

  const seenIds = new Set<string>();
  value.blocks.forEach((candidate, index) => {
    if (!isRecord(candidate) || !nonEmpty(candidate.id) || !nonEmpty(candidate.type)) {
      throw new Error(`Body block ${index} needs a non-empty id and type.`);
    }
    if (seenIds.has(candidate.id)) {
      throw new Error(`Duplicate body block id: ${candidate.id}.`);
    }
    seenIds.add(candidate.id);

    const allowedBlockKeys: Record<string, readonly string[]> = {
      lead: ["id", "type", "text"],
      heading: ["id", "type", "level", "text"],
      paragraph: ["id", "type", "text"],
      figure: ["id", "type", "src", "alt", "width", "height", "caption"],
      list: ["id", "type", "ordered", "items"],
      callout: ["id", "type", "title", "body", "tone"],
      comparison: ["id", "type", "title", "columns"],
      table: ["id", "type", "caption", "columns", "rows"],
      "internal-links": ["id", "type", "title", "items"],
      sources: ["id", "type", "title", "items"],
    };
    const allowedKeys = allowedBlockKeys[candidate.type];
    if (!allowedKeys || !hasOnlyKeys(candidate, allowedKeys)) {
      throw new Error(`Body block ${candidate.id} contains unsupported properties or type.`);
    }

    switch (candidate.type) {
      case "lead":
      case "paragraph":
        if (!nonEmpty(candidate.text)) throw new Error(`${candidate.id} needs text.`);
        break;
      case "figure":
        if (
          !validInternalPath(candidate.src) ||
          !nonEmpty(candidate.alt) ||
          !Number.isInteger(candidate.width) ||
          (candidate.width as number) <= 0 ||
          !Number.isInteger(candidate.height) ||
          (candidate.height as number) <= 0 ||
          !optionalNonEmpty(candidate.caption)
        ) {
          throw new Error(`${candidate.id} needs a local image path, alt text and positive dimensions.`);
        }
        break;
      case "heading":
        if (!nonEmpty(candidate.text) || (candidate.level !== 2 && candidate.level !== 3)) {
          throw new Error(`${candidate.id} needs text and heading level 2 or 3.`);
        }
        break;
      case "list":
        if (!Array.isArray(candidate.items) || candidate.items.length === 0 || !candidate.items.every(nonEmpty)) {
          throw new Error(`${candidate.id} needs at least one non-empty list item.`);
        }
        if (candidate.ordered !== undefined && typeof candidate.ordered !== "boolean") {
          throw new Error(`${candidate.id} ordered must be a boolean when supplied.`);
        }
        break;
      case "callout":
        if (!nonEmpty(candidate.body)) throw new Error(`${candidate.id} needs callout body text.`);
        if (!optionalNonEmpty(candidate.title)) throw new Error(`${candidate.id} title must be non-empty when supplied.`);
        if (
          candidate.tone !== undefined &&
          !["neutral", "decision", "warning"].includes(candidate.tone as string)
        ) {
          throw new Error(`${candidate.id} uses an unsupported callout tone.`);
        }
        break;
      case "comparison":
        if (!Array.isArray(candidate.columns) || candidate.columns.length < 2) {
          throw new Error(`${candidate.id} needs at least two comparison columns.`);
        }
        if (!optionalNonEmpty(candidate.title)) {
          throw new Error(`${candidate.id} title must be non-empty when supplied.`);
        }
        if (
          !candidate.columns.every(
            (column) =>
              isRecord(column) &&
              hasOnlyKeys(column, ["heading", "body", "items"]) &&
              nonEmpty(column.heading) &&
              optionalNonEmpty(column.body) &&
              (column.items === undefined ||
                (Array.isArray(column.items) &&
                  column.items.length > 0 &&
                  column.items.every(nonEmpty))) &&
              (nonEmpty(column.body) ||
                (Array.isArray(column.items) && column.items.length > 0)),
          )
        ) {
          throw new Error(`${candidate.id} comparison columns need a heading and body or items.`);
        }
        break;
      case "table": {
        if (
          !nonEmpty(candidate.caption) ||
          !Array.isArray(candidate.columns) ||
          candidate.columns.length < 2 ||
          !candidate.columns.every(nonEmpty)
        ) {
          throw new Error(`${candidate.id} needs a caption and at least two columns.`);
        }
        const columnCount = candidate.columns.length;
        if (
          !Array.isArray(candidate.rows) ||
          candidate.rows.length === 0 ||
          candidate.rows.some(
            (row) =>
              !Array.isArray(row) ||
              row.length !== columnCount ||
              !row.every((cell) => typeof cell === "string"),
          )
        ) {
          throw new Error(`${candidate.id} rows must match the table column count.`);
        }
        break;
      }
      case "internal-links":
        if (
          !nonEmpty(candidate.title) ||
          !Array.isArray(candidate.items) ||
          candidate.items.length === 0 ||
          !candidate.items.every(
            (item) =>
              isRecord(item) &&
              hasOnlyKeys(item, ["label", "href", "description"]) &&
              nonEmpty(item.label) &&
              validInternalPath(item.href) &&
              optionalNonEmpty(item.description),
          )
        ) {
          throw new Error(`${candidate.id} needs at least one valid internal link.`);
        }
        break;
      case "sources":
        if (
          !nonEmpty(candidate.title) ||
          !Array.isArray(candidate.items) ||
          candidate.items.length === 0 ||
          !candidate.items.every(
            (source) =>
              isRecord(source) &&
              hasOnlyKeys(source, ["label", "url", "publisher", "reviewedAt"]) &&
              nonEmpty(source.label) &&
              validHttpUrl(source.url) &&
              optionalNonEmpty(source.publisher) &&
              validIsoDate(source.reviewedAt),
          )
        ) {
          throw new Error(`${candidate.id} needs a title and at least one source.`);
        }
        break;
      default:
        throw new Error(`Unsupported body block type: ${candidate.type}.`);
    }
  });

  return value as unknown as StructuredPageBody;
}
