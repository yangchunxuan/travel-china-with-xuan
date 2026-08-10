import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "The short answer is no: do not arrive with only one payment method. As checked on 10 August 2026, the least fragile setup for a foreign visitor is one mobile wallet with an eligible international card successfully linked and, where possible, tested (Alipay or Weixin Pay), one physical international card, and a small amount of RMB cash. For a family, two adults should each have an independent payment route.",
    },
    {
      id: "three-rails",
      type: "comparison",
      title: "Think in three payment rails, not one perfect app",
      columns: [
        {
          heading: "Mobile wallet",
          body: "Best for ordinary QR payments, transport and local services once the account and card work.",
          items: [
            "Fast and widely useful in daily life.",
            "Needs a charged phone, working data and a payment flow that accepts your card.",
            "A bound foreign card may support merchant purchases but not transfers, red packets or every mini-program.",
          ],
        },
        {
          heading: "Physical international card",
          body: "Best at merchants that visibly accept your card network, especially hotels, major shops and larger bookings.",
          items: [
            "Useful when an app, QR code or phone is unavailable.",
            "Acceptance depends on the merchant, terminal, network and issuer.",
            "Keep the card separate from the phone and know the PIN for ATM use.",
          ],
        },
        {
          heading: "RMB cash",
          body: "Best as a quiet fallback for small purchases, change, transport problems and a dead phone.",
          items: [
            "RMB remains usable; official policy continues to support cash acceptance.",
            "Some small merchants may not keep enough change, so carry sensible denominations.",
            "Cash is a backup, not a reason to carry your whole trip budget.",
          ],
        },
      ],
    },
    {
      id: "why-not-one",
      type: "paragraph",
      text:
        "No single route is universal. The Chinese government says overseas-card brands, payment limits and charging standards can vary by payment product, and the provider may need the issuing bank to verify the card. Alipay also says an international card linked to its wallet is for everyday mainland consumption, not personal transfers, red packets or financial services. That is why the right question is not “Which one app wins?” but “Which primary method works for me, and what still works if it does not?”",
    },
    {
      id: "before-you-fly",
      type: "heading",
      level: 2,
      text: "Before you fly: build a primary and a backup",
    },
    {
      id: "pre-departure-checklist",
      type: "list",
      ordered: true,
      items: [
        "Install the official Alipay and/or WeChat apps while you can still receive your usual SMS codes. You do not have to depend on both, but testing both gives you a better second route.",
        "Register with your international mobile number and complete the passport or identity prompts when the app asks for them. Keep the number active until the trip ends.",
        "Link an eligible international card. If possible, prepare a second card from another issuer or network rather than two cards that can fail for the same reason.",
        "Check with the issuing bank that overseas purchases, online or e-commerce payments and ATM withdrawals are allowed. Confirm how it handles one-time passwords and fraud alerts.",
        "If you have access to a legitimate supported merchant payment, complete a real low-value test after binding the card. Otherwise, finish the verification prompts and confirm that the card appears as available; a card that merely appears in the wallet is still not a guarantee that every payment will pass.",
        "Arrange data that works in China, a charger or power bank, a physical card and a small amount of RMB cash. Keep the backup card and cash somewhere different from the phone.",
      ],
    },
    {
      id: "working-plan-callout",
      type: "callout",
      title: "The useful test",
      body:
        "Before departure, write down which app is primary, which physical card is the first fallback, where the cash is, and how to contact the card issuer. If you cannot answer those four questions, the setup is not finished.",
      tone: "decision",
    },
    {
      id: "alipay-weixin-prep",
      type: "heading",
      level: 2,
      text: "Alipay and Weixin Pay: what to prepare before departure",
    },
    {
      id: "wallet-routes",
      type: "comparison",
      title: "The two main wallet routes are similar, but not identical",
      columns: [
        {
          heading: "Alipay",
          body:
            "Alipay's current international-traveller guidance says to register with a mobile number, bind an international card and use the wallet for everyday mainland consumption. It lists daily services such as transport, hotels and shopping, while excluding personal transfers, red packets and other financial services for international cards.",
          items: [
            "Use the international-visitor flow shown in the official app or help page.",
            "Have your passport and the legal name on the card ready if verification appears.",
            "Check the payment screen for the exact fee and exchange-rate information before confirming.",
          ],
        },
        {
          heading: "Weixin Pay",
          body:
            "Create or use a WeChat account, open Weixin Pay when prompted, add the international card and complete any identity check. Tencent and official government guidance describe passport-based setup for inbound visitors, but eligible card types and payment scenarios remain subject to the live payment page.",
          items: [
            "Keep access to the phone number used for WeChat account recovery and OTPs.",
            "Do not assume that merchant payment unlocks transfers, red packets or every mini-program.",
            "The 15 January 2026 Tenpay notice confirms the baseline international-card fee rule described below.",
          ],
        },
        {
          heading: "A home-wallet route",
          body:
            "The government guide lists selected overseas wallets, and Alipay+ says participating wallets can scan or show a cross-border payment code at supporting merchants. This is a country- and wallet-specific option, not a universal substitute for a card and cash backup.",
          items: [
            "Check your own wallet's China coverage, limits, identity rules and exchange rate.",
            "Look for the matching acceptance mark at the counter.",
            "Do not generalise a Malaysia, Singapore, Korea or other local-wallet result to every visitor.",
          ],
        },
      ],
    },
    {
      id: "which-wallet",
      type: "paragraph",
      text:
        "There is no evidence-based reason to promise that Alipay always works better than Weixin Pay, or the reverse, for every nationality and card. Make the app that binds and completes a test payment your primary wallet. If both work, keep both available; they are useful backups for each other, but neither removes the need for a physical card and cash.",
    },
    {
      id: "binding-failures",
      type: "heading",
      level: 2,
      text: "International cards, real-name checks and foreign phone numbers",
    },
    {
      id: "binding-explanation",
      type: "paragraph",
      text:
        "The official guidance is deliberately cautious: an overseas card must be verified by the issuer, and card brands, payment limits and fees vary by product. Government guidance lists Visa, Mastercard, UnionPay, American Express, JCB, Diners Club and Discover as supported brands in the broader visitor payment environment, but that does not mean every app, card type, country or merchant accepts every brand.",
    },
    {
      id: "common-binding-problems",
      type: "list",
      items: [
        "The bank blocks a new overseas or online transaction, asks for 3-D Secure or an OTP, or treats China as an unusual fraud pattern.",
        "The passport name, account name, cardholder name, document number or date of birth is entered in a format the provider cannot match.",
        "The card brand is supported in general but not for the particular service, mini-program, transport product or merchant route.",
        "An international phone number receives registration SMS but not a later recovery or risk-control message because roaming, filtering or the carrier has changed.",
        "The account can be created but a later risk review asks for more identity evidence. A successful registration is not a guarantee that every payment will pass.",
      ],
    },
    {
      id: "fix-binding",
      type: "callout",
      title: "If binding fails before departure",
      body:
        "Do not wait until the airport to discover whether the problem is the wallet, the card issuer or the phone number. Try the other wallet, another eligible card and the provider's official support route; keep the physical card and cash plan active while the cause is being checked.",
      tone: "warning",
    },
    {
      id: "direct-card",
      type: "heading",
      level: 2,
      text: "When is paying directly by card the better choice?",
    },
    {
      id: "direct-card-explanation",
      type: "paragraph",
      text:
        "Use a physical international card when the counter displays your network logo and the merchant confirms acceptance. This is often the cleaner option for a hotel deposit or large bill, an airport or railway ticket office, a major attraction, an international chain, a large mall or supermarket, a duty-free or tax-refund shop, and other merchants with established card terminals. China Railway's visitor guidance also allows foreign cards for some ticket purchases, but the exact route and station signage still matter.",
    },
    {
      id: "direct-card-limits",
      type: "table",
      caption: "Where a physical international card is more or less predictable",
      columns: ["Situation", "What to expect", "Good practice"],
      rows: [
        [
          "Hotel, major mall, chain or ticket counter",
          "More likely to have an international-card terminal, but not guaranteed.",
          "Ask before the transaction and keep the card ready for a deposit or pre-authorisation.",
        ],
        [
          "Street stall, small independent shop or rural service",
          "A local QR code or cash may be the only practical route.",
          "Use the wallet if it works; otherwise switch to RMB cash rather than assuming the card will work.",
        ],
        [
          "High-value purchase",
          "A direct card payment may avoid a mobile-wallet service limit, but the issuer can still decline it.",
          "Check the available credit, overseas setting and foreign-exchange cost first.",
        ],
      ],
    },
    {
      id: "dcc",
      type: "callout",
      title: "If the terminal offers your home currency",
      body:
        "That may be dynamic currency conversion rather than a free convenience. Visa says the terminal or ATM should show both currencies, the exchange rate and any extra markup, and give you a choice. Compare the displayed cost and your issuer's rate; paying in RMB is often the simpler default when you do not want the terminal to set the conversion.",
      tone: "neutral",
    },
    {
      id: "cash-still-works",
      type: "heading",
      level: 2,
      text: "Cash is still usable—and still worth carrying",
    },
    {
      id: "cash-explanation",
      type: "paragraph",
      text:
        "RMB cash has not disappeared. The PBOC, Ministry of Commerce and State Administration of Foreign Exchange continue to direct key commercial venues to accept diverse payment methods, keep cash ready and rectify cash-payment refusals. The visitor guide also explains how to exchange for small RMB notes. That does not mean every small merchant has change or that every transport gate will take a note, so treat cash as a practical backup rather than a universal ticket.",
    },
    {
      id: "cash-uses",
      type: "comparison",
      title: "Why a small cash reserve still earns its place",
      columns: [
        {
          heading: "Your phone is offline",
          body: "Cash keeps a meal, short ride or small purchase possible while you find data or charge the phone.",
        },
        {
          heading: "The QR route is unclear",
          body: "Cash lets you finish a transaction without guessing whether the code is a personal or merchant account.",
        },
        {
          heading: "The card is declined",
          body: "Cash buys time while the issuer or wallet support team checks a fraud block or verification issue.",
        },
      ],
    },
    {
      id: "atm-exchange-layers",
      type: "heading",
      level: 2,
      text: "ATM, currency exchange and bank limits are separate problems",
    },
    {
      id: "layered-cash-limits",
      type: "table",
      caption: "Three different places can limit access to RMB cash",
      columns: ["Layer", "What can stop the transaction", "What to check"],
      rows: [
        [
          "ATM or card network",
          "The machine may not show your network logo, may have a per-withdrawal cap or may impose an extra local restriction.",
          "Use an ATM with the matching logo, read the screen and keep the receipt. Shanghai's official visitor page says an ATM usually limits one withdrawal to RMB 3,000; UnionPay gives the same figure for cards issued outside mainland China.",
        ],
        [
          "Your issuing bank",
          "The bank may set a daily or monthly cash limit, block overseas use, require a PIN or charge a cash-advance or foreign-transaction fee.",
          "Ask the issuer before departure. This limit is independent of the ATM's limit.",
        ],
        [
          "Exchange counter or machine",
          "Available currencies, opening hours, rate and service charges vary by bank, airport, money changer and location.",
          "Use a marked bank or authorised exchange point, compare the displayed rate and keep the receipt.",
        ],
      ],
    },
    {
      id: "current-rules",
      type: "heading",
      level: 2,
      text: "2026 fees and limits: the numbers checked on 10 August 2026",
    },
    {
      id: "current-rules-table",
      type: "table",
      caption: "Current reference numbers are ceilings or provider rules—not a promise that every payment will pass",
      columns: ["Rule", "Current reference", "How to read it"],
      rows: [
        [
          "Mobile-wallet ceiling for overseas visitors",
          "Up to US$5,000 per transaction and US$50,000 cumulative per year when linking international cards to Alipay or Weixin Pay, as confirmed on the Shanghai government payment page updated 24 July 2026.",
          "These are regulatory ceilings. Your app, card issuer, merchant or specific service can apply a lower limit or refuse the transaction.",
        ],
        [
          "International-card fee",
          "Tenpay's 15 January 2026 notice says Weixin Pay transactions of RMB 200 or less, including RMB 200, are fee-free; above RMB 200, the fee is 3% of the full transaction amount. A 2024 Ministry of Commerce guide described the same structure for Alipay and Weixin Pay, but its Alipay evidence is older.",
          "For Weixin Pay, the 2026 Tenpay notice is the current cited rule. For Alipay, check the live payment page before confirming because its fee, promotion, payment route and your card issuer can change the final cost.",
        ],
        [
          "Temporary Weixin Pay promotion",
          "Tencent says eligible first-time international-card users may receive 90 consecutive calendar days from their first purchase in which the 3% fee is waived on qualifying daily spending up to an aggregate RMB 1,000.",
          "The 90 days start with the first purchase, and the RMB 1,000 is a daily aggregate promotion limit—not a per-transaction allowance. Confirm eligibility and the offer in your account before relying on it.",
        ],
        [
          "ATM cash withdrawal",
          "Shanghai's official page says an ATM usually imposes a single withdrawal limit of RMB 3,000; UnionPay's current mainland visitor page states RMB 3,000 per withdrawal for cards issued outside mainland China.",
          "A second withdrawal may still be blocked by your issuer's daily limit, the ATM's cash supply or another local restriction.",
        ],
        [
          "RMB brought into or out of China",
          "The current State Council visitor guide says each visitor may take up to RMB 20,000 in cash into or out of China each time.",
          "This is a customs and foreign-exchange rule, not a recommendation to carry that amount. Check the current official rule for your own circumstances.",
        ],
      ],
    },
    {
      id: "fees-beyond-provider",
      type: "paragraph",
      text:
        "The app fee is only one possible cost. Your bank may add a foreign-transaction fee, an exchange-rate spread, a cash-advance charge or an ATM fee; an ATM operator may add its own charge; and a merchant terminal may offer a marked-up currency conversion. Ask the issuing bank which of these it controls, and read the final confirmation screen rather than assuming “no Alipay fee” means “no cost anywhere.”",
    },
    {
      id: "recovery",
      type: "heading",
      level: 2,
      text: "When payment fails: a short recovery order",
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Recover without creating a duplicate charge or losing the trip's only payment route",
      columns: ["Problem", "First response", "Fallback"],
      rows: [
        [
          "QR scan fails or the screen hangs",
          "Check the transaction history before trying again. Confirm the amount and whether you are scanning the merchant's collection code or showing your payment code, then retry on a stable connection.",
          "Switch to the other wallet, a physical card if the logo is displayed, or RMB cash.",
        ],
        [
          "The card is declined or binding fails",
          "Stop repeated attempts. Check the issuer's overseas, online and fraud settings, available limit and OTP; then contact the wallet and issuer with the exact error.",
          "Use a second card or cash while the cause is being checked.",
        ],
        [
          "The phone has no data or battery",
          "Find a reliable connection, charge the phone and keep the transaction status visible before retrying.",
          "Use the physical card or cash. A second adult's independently prepared phone is the best family backup.",
        ],
        [
          "An ATM refuses the card",
          "Cancel, use a lower amount or another machine with the correct network logo. Do not hand the card to a stranger offering help.",
          "Use an authorised exchange counter, another card or the cash already carried, then call the issuer.",
        ],
        [
          "You are not sure whether you were charged",
          "Check the wallet or bank transaction history and ask the merchant to check its record before making a second payment.",
          "Use a different rail only after the first attempt is clearly failed or reversed.",
        ],
      ],
    },
    {
      id: "family-backup",
      type: "heading",
      level: 2,
      text: "Why a family should not rely on one person's phone",
    },
    {
      id: "family-explanation",
      type: "paragraph",
      text:
        "One phone can fail because of a flat battery, lost device, damaged screen, missing data, an OTP sent to another number, an account lock or a fraud review. A family does not need every child to hold a payment account, but at least two adults should have independent access to a working wallet or physical card. Split the backup cards and cash between bags, and never share a payment QR screenshot or card details in a group chat.",
    },
    {
      id: "minimum-viable-setup",
      type: "heading",
      level: 2,
      text: "The minimum viable payment combination before China",
    },
    {
      id: "minimum-viable-list",
      type: "list",
      ordered: true,
      items: [
        "One wallet—Alipay or Weixin Pay—successfully registered, identity-checked if requested and linked to an eligible card.",
        "One physical international card that you have confirmed for overseas purchases, plus a second issuer or network if your budget and wallet allow.",
        "A small reserve of RMB cash in useful denominations, kept separately from the phone.",
        "An active international phone number or data plan, charger or power bank, and the issuer and wallet support routes saved somewhere accessible.",
        "For a family, a second adult with an independently prepared phone, card or cash path.",
      ],
    },
    {
      id: "final-decision",
      type: "callout",
      title: "The practical answer",
      body:
        "One successfully tested wallet can be your primary method. It should not be your only method. The smallest robust combination is primary wallet + physical card + RMB cash; the safer family combination adds a second prepared phone and a second card.",
      tone: "decision",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Read next: entry, arrival and route planning",
      items: [
        {
          label: "China entry guides: visa-free rules by passport and route",
          href: "/guides/china-entry-requirements/",
          description: "Check the entry route separately from payment preparation.",
        },
        {
          label: "From Malaysia to Zhangjiajie: choose the gateway, hotel base and support",
          href: "/guides/zhangjiajie-from-malaysia/",
          description: "A destination-specific pre-departure reminder already includes payment, phone data and backup planning.",
        },
        {
          label: "Beijing, Zhangjiajie and Shanghai transport",
          href: "/guides/beijing-zhangjiajie-shanghai-transport/",
          description: "Use the route guide for the transport decisions that often require a separate payment check.",
        },
      ],
    },
    {
      id: "official-sources",
      type: "sources",
      title: "Official sources checked on 10 August 2026",
      items: [
        {
          label: "State Council of China — Guide to Working and Living in China: mobile payment, cash, exchange, hotels and transport",
          url: "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          publisher: "The State Council of the People's Republic of China",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Shanghai government — Payment methods for foreigners (updated 24 July 2026)",
          url: "https://english.shanghai.gov.cn/en-PaymentMethods/20240313/6f4e58272f1a4cea9aec59c518915bdf.html",
          publisher: "Shanghai Municipal Government; source credited to the PBOC Shanghai Head Office",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Alipay+ — Pay in the Chinese mainland: international cards, wallet scenes and current help",
          url: "https://www.alipayplus.com/pay-in-the-chinese-mainland/",
          publisher: "Ant International / Alipay+",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Tenpay — Notice on international-card payment service rules (15 January 2026)",
          url: "https://posts.tenpay.com/posts/9e70c66564910e6002958e997eabb18b.html",
          publisher: "Tenpay Payment Technology Co., Ltd.",
          reviewedAt: "2026-08-10",
        },
        {
          label: "China Ministry of Commerce — Guide for Foreign Businesspeople Working and Living in China (2024 edition)",
          url: "https://nsd.mofcom.gov.cn/tzyts/art/2024/art_a08888d0b9da42f083b00223edaf1de7.html",
          publisher: "Ministry of Commerce of the People's Republic of China",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Tencent — 2026 inbound-payment convenience measures",
          url: "https://www.tencent.com/zh-cn/articles/2202338.html",
          publisher: "Tencent",
          reviewedAt: "2026-08-10",
        },
        {
          label: "PBOC, Ministry of Commerce and SAFE — notice on diverse payment methods and cash acceptance",
          url: "https://www.pbc.gov.cn/en/3688241/3688663/3688666/2025080817504289341/2024050714151715381.pdf",
          publisher: "People's Bank of China, MOFCOM and SAFE",
          reviewedAt: "2026-08-10",
        },
        {
          label: "UnionPay International — Explore Mainland China Your Way: card acceptance and ATM reference",
          url: "https://www.unionpayintl.com/dynamic/ExploreMainlandChinaYourWay/en?currentPath=globalCard%2Fen",
          publisher: "UnionPay International",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Beijing government — overseas bank cards accepted by Weixin Pay and Alipay",
          url: "https://english.beijing.gov.cn/specials/paymentservices/howtopaybeijing/202404/t20240429_3647378.html",
          publisher: "Foreign Affairs Office of the People's Government of Beijing Municipality",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Visa — dynamic currency conversion and international-payment choices",
          url: "https://www.visa.com/en-us/personal/travel/dynamic-currency-conversion",
          publisher: "Visa",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Mastercard — ATM usage tips and issuer-limit reminders",
          url: "https://www.mastercard.com/cardholderservices/atm/usage_tips.html",
          publisher: "Mastercard",
          reviewedAt: "2026-08-10",
        },
      ],
    },
  ],
};

export default body;
