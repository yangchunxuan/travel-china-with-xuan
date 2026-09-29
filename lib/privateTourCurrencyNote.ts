/**
 * One-line currency and settlement disclosure shown under a tour's published
 * price. Korean and English pages show amounts converted from (or set against)
 * the CNY price basis; Chinese pages show CNY itself, so their note concerns
 * only the payment currency. Kept free of product data so the client price
 * console can import it without the catalogue. The Japanese note is in
 * lib/japaneseCurrencyNote.ts and reaches the console through its copy prop.
 */
export const privateTourCurrencyNote = {
  en: "Prices are shown in USD. We confirm the payment currency, exchange rate and total in your written quote before you pay.",
  zh: "价格以人民币计；如需以其他币种付款，币种与汇率在付款前的书面报价中确认。",
  ko: "원화 금액은 참고용 환산가입니다. 결제 통화와 적용 환율은 결제 전 서면 견적에서 확정합니다.",
} as const satisfies Readonly<Record<"en" | "zh" | "ko", string>>;
