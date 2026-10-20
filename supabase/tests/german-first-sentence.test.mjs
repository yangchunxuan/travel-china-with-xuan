import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { germanFirstSentence } from "../../lib/germanFirstSentence.ts";
import { getGermanTourCatalog } from "../../lib/germanTourCatalog.ts";

test("a day number before a month does not end the sentence", () => {
  assert.equal(germanFirstSentence("Reisetermine: 10.–23. April, 8.–21. Mai oder 9.–22. Oktober 2027. Die Gruppe wird ab 8 Teilnehmern bestätigt."), "Reisetermine: 10.–23. April, 8.–21. Mai oder 9.–22. Oktober 2027.");
  assert.equal(germanFirstSentence("Reisetermine: 19. Mai–4. Juni und 1.–17. September 2027. Danach mehr."), "Reisetermine: 19. Mai–4. Juni und 1.–17. September 2027.");
  assert.equal(germanFirstSentence("Zwei Reisen 2027: 12.–26. Juni und 11.–25. September. Weitere Termine auf Anfrage."), "Zwei Reisen 2027: 12.–26. Juni und 11.–25. September.");
});

test("a number at the end of a sentence still ends it", () => {
  assert.equal(germanFirstSentence("Peking 3, Xi’an 2 und Shanghai 2. Hotelnamen werden bestätigt."), "Peking 3, Xi’an 2 und Shanghai 2.");
  assert.equal(germanFirstSentence("Harbin an Tag 1 und 2. Die Nächte von Tag 3 und 6 im Zug."), "Harbin an Tag 1 und 2.");
  assert.equal(germanFirstSentence("Wirklich? Ja."), "Wirklich?");
  assert.equal(germanFirstSentence("Ohne Punkt"), "Ohne Punkt");
});

test("no German tour card is cut between a day number and its month", () => {
  const month = /^(?:Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)(?!\p{L})/u;
  let checked = 0;
  for (const tour of Object.values(getGermanTourCatalog())) {
    for (const field of ["lede", "hotelNote", "summary"]) {
      const text = tour?.[field];
      if (typeof text !== "string") continue;
      const rest = text.slice(germanFirstSentence(text).length).trim();
      assert.doesNotMatch(rest, month, `${tour.slug ?? "tour"} ${field} is cut before a month: ${germanFirstSentence(text)}`);
      checked += 1;
    }
  }
  assert.ok(checked > 100, `checked ${checked} German tour texts`);
});

test("the German tours hub, and the collection pages built from its catalogue, use this sentence rule", async () => {
  const hub = await readFile(new URL("../../components/GermanToursHubPage.tsx", import.meta.url), "utf8");
  assert.match(hub, /const firstSentence=germanFirstSentence;/u);
  assert.doesNotMatch(hub, /\[\.!\?\]\(\?:\\s\|\$\)/u);
});
