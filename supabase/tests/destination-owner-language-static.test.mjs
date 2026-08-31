import assert from "node:assert/strict";
import test from "node:test";

const reviewedBlocks = {
  beijing: {
    en: {
      "stay-links": "Compare Beijing bases in the detailed stay guides",
      "transport-links": "Continue with the detailed airport and station guides",
      "sight-links": "Open the detailed guide when you are ready to book",
      "route-links": "Continue with the detailed route guides",
    },
    zh: {
      "stay-links": "用详细住宿指南比较北京住宿区域",
      "transport-links": "继续查看机场与车站详细指南",
      "sight-links": "准备预订时，打开对应的详细指南",
      "route-links": "继续查看详细路线指南",
    },
  },
  shanghai: {
    en: {
      "stay-links": "Compare Shanghai bases in the detailed stay guide",
      "airport-links": "Continue with the detailed airport and transfer guides",
      "regional-links": "Choose a Yangtze Delta route with the detailed guides",
    },
    zh: {
      "stay-links": "用详细住宿指南比较上海住宿区域",
      "airport-links": "继续查看机场与接驳详细指南",
      "regional-links": "用详细指南选择长三角路线结构",
    },
  },
  xian: {
    en: {
      "stay-links": "Compare Xi'an bases in the detailed stay guide",
      "sight-links": "Open the detailed guide when you are ready to book",
      "route-links": "Continue with the detailed route guides",
    },
    zh: {
      "stay-links": "用详细住宿指南比较西安住宿区域",
      "sight-links": "准备预订时，打开对应的详细指南",
      "route-links": "继续查看详细路线指南",
    },
  },
};

const retiredInternalTitles = [
  "Choose the base with the accommodation owners",
  "Hand the gateway decision to its owner",
  "Open the execution owner when a cluster becomes a booking",
  "Continue with the route owners",
  "把住宿决定交给对应 owner",
  "把门户决定交给对应 owner",
  "当景点簇变成具体预订时，打开执行 owner",
  "继续交给路线 owner",
  "Choose the base with the accommodation owner",
  "Hand the arrival decision to its owner",
  "Decide the delta structure with its owners",
  "把抵达决定交给对应 owner",
  "长三角结构交给对应 owner",
  "Compare exact bases with the accommodation owner",
  "把具体基地比较交给住宿 owner",
];

for (const [city, locales] of Object.entries(reviewedBlocks)) {
  for (const [locale, expectedTitles] of Object.entries(locales)) {
    test(`${city} ${locale} exposes visitor-facing detailed-guide labels`, async () => {
      const { default: body } = await import(
        `../../content/destinations/${city}/body.${locale}.ts`
      );
      const expectedIds = Object.keys(expectedTitles);
      const blocks = body.blocks.filter(
        (block) => block.type === "internal-links" && expectedIds.includes(block.id),
      );

      assert.equal(blocks.length, expectedIds.length);
      for (const block of blocks) {
        assert.equal(block.title, expectedTitles[block.id]);
        assert.ok(block.items.length > 0, `${city}/${locale}/${block.id} keeps its CTAs`);
        for (const item of block.items) {
          assert.ok(item.href.endsWith("/"), `${item.href} remains canonical-slash shaped`);
          if (locale === "zh") {
            assert.match(item.href, /^\/zh\/guides\//u);
          } else {
            assert.match(item.href, /^\/guides\//u);
            assert.doesNotMatch(item.href, /^\/(?:zh|ko)\//u);
          }
        }
      }

      const serialized = JSON.stringify(body);
      for (const retired of retiredInternalTitles) {
        assert.equal(serialized.includes(retired), false, retired);
      }
    });
  }
}

test("Korean destination hubs remain free of internal owner terminology", async () => {
  for (const city of Object.keys(reviewedBlocks)) {
    const { default: body } = await import(
      `../../content/destinations/${city}/body.ko.ts`
    );
    const visibleTitles = body.blocks
      .filter((block) => block.type === "heading" || block.type === "internal-links")
      .map((block) => (block.type === "heading" ? block.text : block.title))
      .join("\n");
    assert.doesNotMatch(visibleTitles, /\bowner(?:s)?\b/iu, city);
  }
});
