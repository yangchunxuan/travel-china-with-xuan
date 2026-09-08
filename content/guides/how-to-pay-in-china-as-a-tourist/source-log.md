# Targeted payment-answer supplement — 2026-09-09

Scope: the two directly observed payment questions, in `body.en.ts`, `body.zh.ts`, `body.ko.ts`. Added `google-wallet-*` and `wechat-top-up-*`; appended four official sources. Only `dateModified` becomes 2026-09-09. The previous whole-page `sourceReviewedDate` remains 2026-08-10; source heading now shows individual review dates. Fees, limits, payment configuration and other payment products were not changed. This is a local content supplement; publication and traffic require separate evidence.

## Actual query evidence

GSC Web, all countries and devices, 2026-08-09 to 2026-09-05. Source: `/Users/yangchunxuan/Desktop/Homeground-SEO/independent-audit-2026-09-09/recovered-tool-output/gsc-query-tail-all460-current.json`.

- Overall row 654: `can you use google wallet in china`, 0 clicks / 1 impression / 0% CTR / position 54.0.
- Overall row 709: `does google pay work in china`, 0 / 1 / 0% / 60.0.
- Overall row 644: `how to top up wechat wallet`, 0 / 1 / 0% / 53.0.

These are small-sample observations of actual questions, not evidence of substantial demand or promised traffic. They are functional payment questions for China, unlike the unrelated Google Flights brand-navigation terms in the Surfer list.

## Primary evidence and exact boundaries

1. [Google Wallet supported bank/card markets](https://support.google.com/wallet/answer/12059326?co=GENIE.CountryCode%3DHK&hl=en-GB), read 2026-09-09. The country selector lists Hong Kong and Macau separately, and does not list mainland China. This establishes the published bank/card market scope. It does **not** establish that every foreign card configured elsewhere fails at every mainland terminal.
2. [Google Wallet tap-to-pay instructions](https://support.google.com/wallet/answer/12060043?hl=en), read 2026-09-09. Requires NFC, a supported payment method and suitable contactless/Google Pay terminal. Supports checking the actual card and merchant, not a universal mainland success or failure claim. A local wallet QR logo alone is insufficient evidence that Google Pay is accepted.
3. [Google Pay country/feature availability](https://support.google.com/googlepay/answer/12429287?hl=en), read 2026-09-09. Separates online/in-app participating checkouts, contactless Wallet and other features. Used to distinguish a Google Pay checkout button from everyday local QR acceptance.
4. [Weixin Pay User Service Agreement, 20260330 edition](https://posts.tenpay.com/posts/cbddf0af6088c4080432b952163ea238.html), Appendix 2, read 2026-09-09. Browser-search retrieval returned the exact clause; direct public HTML retrieval then succeeded after the web opener timed out. International-card service supports qualifying merchant purchases. The cited balance/top-up/transfer restriction expressly concerns users with only international cards linked **and without completed real-name verification**. That qualification is retained. No promise that verification unlocks every balance/transfer function is added.
5. [Alipay+ official mainland visitor guidance](https://www.alipayplus.com/pay-in-the-chinese-mainland/), re-read 2026-09-09, especially its international-card FAQ. Supports card-funded daily purchases and exclusion of personal transfers/red packets from the international-card route. This is an existing source; its original source-list review date is not silently broadened to cover every linked product.

The direct answer distinguishes paying a supported merchant from loading a stored wallet balance. It neither recommends an unofficial cash-for-wallet exchange nor treats a personal transfer as a payment fallback. Specific account eligibility stays with the official account interface and provider.

## Validation

The existing structured-body validator passed all three bodies. Block order/IDs and new source URLs match across EN/ZH/KO. Metadata JSON parses, with only `dateModified` changed; difference whitespace checks pass. Registry generation, complete build, deployment and live checks belong to the root integration step.
