import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "China's shoulder season is not one nationwide bargain window. A date offers value only when the route's core activities still work, public-holiday pressure is acceptable, daylight and transport fit, and the actual flexible booking basket is better—not merely cheaper—than the peak alternative. Compare specific dates and regions; do not buy a generic spring or autumn label." },
  { id: "quick-choice", type: "comparison", title: "What are you trading?", columns: [
    { heading: "Peak conditions", body: "Pay more or accept demand pressure when a seasonal landscape or activity is the trip's main reason." },
    { heading: "Shoulder balance", body: "Choose when moderate uncertainty is acceptable and flexible bookings preserve the upside." },
    { heading: "Deep off-season", body: "Choose only after confirming operating hours, transport, weather tolerance and the value of shorter or quieter days." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "Two official checks come before price" },
  { id: "official", type: "paragraph", text: "China Meteorological Administration explains that the country's climate varies with latitude, land–sea position, monsoon influence and topography, so one shoulder-season label cannot describe every route. The State Council publishes the official holiday arrangement for each year; in 2026 it specifies the dates and adjusted workdays for major public holidays. Check that current calendar because a seemingly quiet week can border a concentrated travel period." },
  { id: "value-heading", type: "heading", level: 2, text: "Define value for this trip" },
  { id: "value", type: "table", caption: "A lower price is useful only if the trip still delivers", columns: ["Variable", "Question", "Evidence to collect"], rows: [
    ["Core experience", "Does the activity still operate and remain worth doing?", "Named attraction or operator notice"],
    ["Climate exposure", "Would rain, heat, cold, wind or visibility remove the purpose?", "Official climate context, then current forecast near travel"],
    ["Holiday pressure", "Does the date overlap or sit beside a major movement period?", "Current State Council holiday calendar and operator notices"],
    ["Daylight and pace", "Can the planned outdoor day fit without rushed starts and returns?", "Sunrise/sunset and operating hours for the exact date"],
    ["Transport", "Are useful services running at workable times?", "Current 12306, carrier or local operator search"],
    ["Booking basket", "What is the total after flexibility, baggage and poor-weather alternatives?", "Like-for-like checkout conditions, not a headline price"]
  ] },
  { id: "route-screen-heading", type: "heading", level: 2, text: "Screen each stop separately" },
  { id: "route-screen", type: "list", ordered: true, items: [
    "Write one non-substitutable reason for every stop. If the reason is vague, do not let it control the dates.",
    "Classify the stop as weather-critical, operating-season-critical or broadly tolerant.",
    "For the hardest stop, identify a peak window and two adjacent candidate windows from reliable climate and operator information.",
    "Check whether the other regions remain acceptable in each candidate. A mixed route may have different shoulder periods.",
    "Overlay the current public-holiday calendar and any major local event that has a reliable first-party source.",
    "Compare the completed booking basket for the remaining dates, including cancellation conditions and the cost of a fallback day.",
    "Choose the date with the best protected experience, not the largest unsupported discount claim."
  ] },
  { id: "examples-heading", type: "heading", level: 2, text: "Three honest shoulder-season outcomes" },
  { id: "examples", type: "table", caption: "Examples explain decisions; they do not claim live prices or weather", columns: ["Trip purpose", "Possible outcome", "Reason"], rows: [
    ["Museum, neighbourhood and food route", "Shoulder period may be strong", "Indoor depth and flexible days can absorb more weather variation"],
    ["Visibility-dependent mountain trip", "Peak or flexible shoulder dates", "Saving matters less if poor visibility removes the central experience"],
    ["Multi-region route with plateau extension", "Split the route or change dates", "One national label may hide incompatible climate and recovery needs"]
  ] },
  { id: "booking-heading", type: "heading", level: 2, text: "Book in the order of irreversibility" },
  { id: "booking", type: "list", ordered: true, items: [
    "Confirm passports, leave dates and the official holiday calendar.",
    "Confirm that the core seasonal experience and route are feasible, without treating a historical pattern as a forecast.",
    "Compare gateways and refundable or changeable long-haul options before locking internal hotels.",
    "Reserve the scarce anchor with conditions you understand, then build flexible nights around it.",
    "Keep weather-sensitive days movable and delay non-refundable secondary activities where practical.",
    "Near travel, replace assumptions with official forecasts, operating notices and current transport searches."
  ] },
  { id: "failure-heading", type: "heading", level: 2, text: "False savings and how to repair them" },
  { id: "failure", type: "table", caption: "Cheap can become poor value", columns: ["False saving", "Hidden cost", "Repair"], rows: [
    ["Lowest room rate far from useful transport", "Daily taxi or metro time consumes the difference", "Compare door-to-door hotel value"],
    ["Non-refundable rate in volatile weather", "One closed or poor-visibility day cannot move", "Price flexibility and keep the anchor movable"],
    ["Quiet dates beside a major holiday", "Transport pressure may start before or end after the official days", "Check operator notices and add margin"],
    ["Keeping a seasonal stop out of season", "The trip pays transport and hotel costs for reduced experience", "Replace the activity or remove the stop"],
    ["Cheap flight with bags and strict changes", "The completed basket exceeds the apparent saving", "Compare like-for-like fare products"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to pay for peak—and when to go quieter" },
  { id: "switch-rule", type: "paragraph", text: "Choose peak dates when one seasonal activity is the trip's defining reason and failure would make the journey feel wasted. Choose shoulder dates when the route has substitutes, the group tolerates uncertainty and flexible bookings keep the downside small. Choose a different region when the available dates break the core experience; no discount repairs a route that no longer answers the traveller's task." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "The core experience and the condition that would make it fail are explicit.",
    "Every region has been screened separately rather than inheriting one season label.",
    "The current official holiday calendar is overlaid on the candidate dates.",
    "Operating hours and transport are confirmed from named first-party sources.",
    "The price comparison includes flexibility, baggage, location and fallback costs."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Recheck the year and the route", body: "Holiday dates, operating schedules, fares and forecasts are dynamic. This guide does not promise a discount, crowd level or weather. Recheck the current year's official calendar and each named operator before booking." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide compares the value trade-off between peak, shoulder and deeper off-season dates. Use the climate-region guide for multi-region weather screening, the holiday calendar for named annual dates, and destination guides for local seasonal experiences." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Want two date windows compared?", body: "Send candidate dates, regions, core experience and the flexible versus non-refundable booking options. A useful comparison should show what value is protected and what risk is being accepted." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [
    { label: "Screen the route by climate region", href: "/guides/china-climate-regions-for-trip-timing/", description: "Check whether one date window fits the hardest stop." },
    { label: "Check official public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "A low-season label can be overturned by a national holiday." },
    { label: "Place timing inside the full budget", href: "/guides/how-much-does-a-china-trip-cost/", description: "Compare transport, hotels and flexibility together." },
    { label: "Choose a Huangshan base", href: "/guides/huangshan-summit-or-gateway-base/", description: "Compare summit lodging, Tangkou, the hot-spring area and Huangshan city by sunrise, transfer gates, luggage, weather and onward rail." },
    { label: "Choose a Yellow Sea wetland base", href: "/guides/northern-jiangsu-yellow-sea-wetland-coast/", description: "Separate Yancheng's dispersed wetland areas, choose Dongtai, Dafeng or the city as a practical base, and plan ethical birding with a no-sighting alternative." },
    { label: "Choose a Yuanyang terrace route", href: "/guides/yuanyang-rice-terraces-viewpoint-and-village-route/", description: "Choose among Duoyishu, Bada and Laohuzui, pair one viewpoint with a respectful village visit, and keep a worthwhile alternative for cloudy weather." },
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "Main characteristics of China's climate", url: "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html", publisher: "China Meteorological Administration", reviewedAt: "2026-08-12" },
    { label: "China's official public holidays for 2026", url: "https://english.www.gov.cn/policies/featured/202511/04/content_WS6909c915c6d00ca5f9a074f7.html", publisher: "State Council of the People's Republic of China", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
