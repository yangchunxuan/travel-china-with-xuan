/**
 * One-line currency and settlement disclosure shown under a tour's published
 * price. Korean and English pages show amounts converted from (or set against)
 * the CNY price basis; Chinese pages show CNY itself, so their note concerns
 * only the payment currency. Kept free of product data so the client price
 * console can import it without the catalogue. The Japanese note is in
 * lib/japaneseCurrencyNote.ts and reaches the console through its copy prop.
 */
export const privateTourCurrencyNote = {
  en: "USD amounts are indicative. We confirm the payment currency, exchange rate and final total in your written quote before you pay.",
  zh: "价格以人民币计；如需以其他币种付款，币种与汇率在付款前的书面报价中确认。",
  ko: "원화 금액은 참고용 환산가입니다. 결제 통화와 적용 환율은 결제 전 서면 견적에서 확정합니다.",
} as const satisfies Readonly<Record<"en" | "zh" | "ko", string>>;

/**
 * The note under the published price on tour pages: what the figure is (a
 * per-person starting price for the group size shown), what changes it, and
 * that the written quote sent before payment is the price that counts. The
 * currency sentence follows in the same paragraph. Pages with no published
 * price do not render the price console, so they never show this.
 */
export const privateTourPublishedPriceNote = {
  en: "This is a per-person starting price for the group size shown. Holidays, group size and room type change it; the final price is the one in your written quote before you pay. USD amounts are indicative; the quote also confirms the currency and exchange rate.",
  zh: "页面价格是按所列人数计算的每人起价；节假日、人数或房型不同会调整，最终价格以付款前的书面报价为准。价格以人民币计；如需以其他币种付款，币种与汇率也在书面报价中确认。",
  ko: "이 페이지의 가격은 표시된 인원 기준 1인 시작가입니다. 공휴일, 인원, 객실 유형에 따라 달라지며, 최종 가격은 결제 전 서면 견적을 기준으로 합니다. 원화 금액은 참고용 환산가이며, 결제 통화와 적용 환율도 서면 견적에서 확정합니다.",
} as const satisfies Readonly<Record<"en" | "zh" | "ko", string>>;
