// The quotable answer for each guide in llms.txt: the opening sentence of the
// guide's own lead, read from the exported page, so the line never says more
// than the page does. Nothing is paraphrased or summarised.

// Lead paragraphs, most specific first: the structured guide body's lead, the
// hand-built guides' hero lead or direct answer, then a standfirst (dek).
// Structured guides also have a dek, but it repeats the search description.
const leadClassPatterns = [
  /(?:^|\s)PageFamilyRenderer_lead__/u,
  /_(?:heroLead|directAnswer|lead)__/u,
  /_dek__/u,
];

// Short openers such as "Usually no." or "There is no single best section."
// keep the sentence that explains them.
const minimumAnswerLength = { zh: 45, ar: 90 };
const defaultMinimumAnswerLength = 100;
const maximumSentences = 3;
// The sentence splitter leaves the next sentence's opening quote on this one.
const trailingOpeners = /[\s“‘「『《（(]+$/u;

export function decodeHtml(text) {
  return text
    .replace(/&#x([0-9a-f]+);/giu, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/gu, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&quot;/gu, '"')
    .replace(/&lt;/gu, "<")
    .replace(/&gt;/gu, ">")
    .replace(/&nbsp;/gu, " ")
    .replace(/&amp;/gu, "&");
}

const plainText = (html) => decodeHtml(html.replace(/<!--[\s\S]*?-->/gu, "").replace(/<[^>]+>/gu, "")).replace(/\s+/gu, " ").trim();

/** The text of the guide's lead paragraph, or null when the page has none. */
export function guideLeadText(html) {
  const page = html.replace(/<script[\s\S]*?<\/script>/gu, "");
  const headingEnd = page.indexOf("</h1>");
  if (headingEnd === -1) return null;
  const paragraphs = [...page.slice(headingEnd).matchAll(/<p\b([^>]*)>([\s\S]*?)<\/p>/gu)].map((match) => ({
    className: match[1].match(/class="([^"]*)"/u)?.[1] ?? "",
    text: plainText(match[2]),
  }));
  for (const pattern of leadClassPatterns) {
    const lead = paragraphs.find((paragraph) => pattern.test(paragraph.className) && paragraph.text);
    if (lead) return lead.text;
  }
  return null;
}

/** The lead's first sentence, extended by the next ones while it is too short to stand alone. */
export function answerSentence(text, language) {
  const minimum = minimumAnswerLength[language] ?? defaultMinimumAnswerLength;
  const sentences = [...new Intl.Segmenter(language, { granularity: "sentence" }).segment(text)].map((part) => part.segment.trim()).filter(Boolean);
  let answer = "";
  for (const sentence of sentences.slice(0, maximumSentences)) {
    answer = answer ? `${answer}${language === "zh" ? "" : " "}${sentence}` : sentence;
    if (answer.replace(trailingOpeners, "").length >= minimum) break;
  }
  return answer.replace(trailingOpeners, "");
}

/** The quotable answer for one exported guide page; throws so a guide is never listed without one. */
export function guideAnswer(html, language, route) {
  const lead = guideLeadText(html);
  if (!lead) throw new Error(`llms.txt: ${route} has no lead paragraph to quote.`);
  return answerSentence(lead, language);
}
