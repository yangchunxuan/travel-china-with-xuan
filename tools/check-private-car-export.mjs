import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "parse5";

const base = "https://homegroundchina.com";
const routes = [
  ["en", "/services/private-car-and-driver/"],
  ["zh-Hans", "/zh/services/private-car-and-driver/"],
  ["ko", "/ko/services/private-car-and-driver/"],
];
function* walk(node) {
  yield node;
  for (const child of node.childNodes ?? []) yield* walk(child);
}
const attr = (node, key) => node.attrs?.find((item) => item.name.toLowerCase() === key)?.value;
const text = (node) => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join(" ");
const visibleText = (node) => ["script", "style"].includes(node.tagName) ? "" : node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(visibleText).join(" ");
const normalize = (value) => value.replace(/\s+/g, " ").trim();
const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const [locale, route] of routes) {
  const html = await readFile(`out${route}index.html`, "utf8");
  const nodes = [...walk(parse(html))];
  const links = nodes.filter((node) => node.tagName === "link");
  assert.equal(links.filter((node) => attr(node, "rel") === "canonical").length, 1);
  assert.equal(attr(links.find((node) => attr(node, "rel") === "canonical"), "href"), base + route);
  for (const [language, path] of [...routes, ["x-default", routes[0][1]]]) {
    assert.ok(links.some((node) => attr(node, "hreflang") === language && attr(node, "href") === base + path), `${route}: reciprocal alternate ${language}`);
  }
  const robots = nodes.find((node) => node.tagName === "meta" && attr(node, "name") === "robots");
  assert.doesNotMatch(attr(robots, "content") ?? "", /noindex|nofollow/);
  assert.equal(nodes.filter((node) => node.tagName === "h1").length, 1);
  const schema = nodes.filter((node) => node.tagName === "script" && attr(node, "type") === "application/ld+json")
    .flatMap((node) => { const value = JSON.parse(text(node)); return value["@graph"] ?? [value]; });
  const service = schema.find((node) => node["@type"] === "Service");
  assert.ok(service, `${route}: Service is server rendered`);
  assert.equal(service.provider["@id"], base + "/#organization");
  assert.equal(service.url, base + route);
  assert.ok(!service.offers, `${route}: custom quote never invents a fixed Offer`);
  const visible = normalize(visibleText(nodes[0]));
  const faq = schema.find((node) => node["@type"] === "FAQPage");
  assert.ok(faq?.mainEntity?.length, `${route}: visible questions have semantic answers`);
  for (const question of faq.mainEntity) {
    assert.ok(visible.includes(normalize(question.name)), `${route}: FAQ question is visible`);
    assert.ok(visible.includes(normalize(question.acceptedAnswer.text)), `${route}: FAQ answer matches visible copy`);
  }
  assert.equal(sitemap.split(`<loc>${base}${route}</loc>`).length - 1, 1, `${route}: canonical is in sitemap once`);
  console.log(`PASS ${locale}: canonical, alternates, indexability, visible Service/FAQ and sitemap`);
}
for (const guide of ["beijing-to-mutianyu-great-wall-transfer", "beijing-south-station-to-capital-or-daxing-airport", "guilin-airport-or-railway-station-arrival-guide"]) {
  for (const prefix of ["", "zh/", "ko/"]) {
    const html = await readFile(`out/${prefix}guides/${guide}/index.html`, "utf8");
    const nodes = [...walk(parse(html))];
    const cards = nodes.filter((node) => attr(node, "data-guide-car-service-cta") !== undefined);
    assert.equal(cards.length, 1, `${prefix}${guide}: one contextual car entry`);
    assert.ok([...walk(cards[0])].some((node) => node.tagName === "a" && attr(node, "href") === `/${prefix}services/private-car-and-driver/`));
    assert.ok(!nodes.some((node) => attr(node, "data-guide-service-cta") !== undefined), `${prefix}${guide}: no duplicate guide-service pitch`);
  }
}
console.log("PASS 9 transport-guide exports: one contextual car entry in each page language");
