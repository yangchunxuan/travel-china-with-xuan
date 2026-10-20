const months = "Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember";

/**
 * The first sentence of German copy. A day number such as "23." before a month
 * ("10.–23. April") is a date, not the end of a sentence.
 */
const sentence = new RegExp(`^.*?(?:[!?]|(?<!\\d)\\.|(?<=\\d)\\.(?!\\s+(?:${months})(?!\\p{L})))(?:\\s|$)`, "u");

export function germanFirstSentence(text: string): string {
  return text.match(sentence)?.[0]?.trim() ?? text;
}
