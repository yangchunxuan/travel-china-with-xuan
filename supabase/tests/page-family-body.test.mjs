import assert from "node:assert/strict";
import test from "node:test";
import { assertStructuredPageBody } from "../../lib/content-system/page-body.ts";

const validBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "A decision-first introduction." },
    { id: "decision", type: "heading", level: 2, text: "Choose the route" },
    {
      id: "comparison",
      type: "comparison",
      columns: [
        { heading: "Day trip", body: "Return to the same hotel." },
        { heading: "Overnight", body: "Keep the evening and morning." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources",
      items: [{ label: "Official source", url: "https://example.com" }],
    },
  ],
};

test("structured page family body accepts supported semantic blocks", () => {
  assert.equal(assertStructuredPageBody(validBody).blocks.length, 4);
});

test("structured page family body rejects an empty article", () => {
  assert.throws(
    () => assertStructuredPageBody({ schemaVersion: "1.0.0", blocks: [] }),
    /at least one block/,
  );
});

test("structured page family body rejects duplicate ids", () => {
  assert.throws(
    () =>
      assertStructuredPageBody({
        schemaVersion: "1.0.0",
        blocks: [
          { id: "same", type: "paragraph", text: "One" },
          { id: "same", type: "paragraph", text: "Two" },
        ],
      }),
    /Duplicate body block id/,
  );
});

test("structured page family body rejects malformed tables", () => {
  assert.throws(
    () =>
      assertStructuredPageBody({
        schemaVersion: "1.0.0",
        blocks: [
          {
            id: "table",
            type: "table",
            caption: "Transfer comparison",
            columns: ["Route", "Time"],
            rows: [["Train"]],
          },
        ],
      }),
    /rows must match/,
  );
});

test("structured page family body rejects unsafe nested values before rendering", () => {
  for (const block of [
    {
      id: "comparison",
      type: "comparison",
      columns: [null, { heading: "Overnight", body: "Stay." }],
    },
    {
      id: "table",
      type: "table",
      caption: "Transfer comparison",
      columns: ["Route", "Time"],
      rows: [["Train", { hours: 4 }]],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources",
      items: [null],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources",
      items: [{ label: "Local file", url: "file:///tmp/source" }],
    },
  ]) {
    assert.throws(() =>
      assertStructuredPageBody({ schemaVersion: "1.0.0", blocks: [block] }),
    );
  }
});

test("structured page family body rejects unknown properties at every level", () => {
  const fixtures = [
    { ...validBody, debug: true },
    {
      schemaVersion: "1.0.0",
      blocks: [{ id: "lead", type: "lead", text: "Hello", html: "<b>Hello</b>" }],
    },
    {
      schemaVersion: "1.0.0",
      blocks: [
        {
          id: "comparison",
          type: "comparison",
          columns: [
            { heading: "One", body: "Body", trackingId: "one" },
            { heading: "Two", body: "Body" },
          ],
        },
      ],
    },
    {
      schemaVersion: "1.0.0",
      blocks: [
        {
          id: "sources",
          type: "sources",
          title: "Sources",
          items: [
            { label: "Official", url: "https://example.com", note: "extra" },
          ],
        },
      ],
    },
  ];

  for (const fixture of fixtures) {
    assert.throws(() => assertStructuredPageBody(fixture));
  }
});
