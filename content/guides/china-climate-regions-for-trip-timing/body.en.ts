import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "There is no single best-weather month for all of China. For a multi-region trip, protect the stop whose experience is easiest to lose to heat, rain, cold, visibility or elevation; then accept merely workable weather elsewhere. This method is for choosing a date window, not predicting the weather on your travel days."
    },
    {
      id: "quick-choice",
      type: "comparison",
      title: "Start with the constraint that can break the trip",
      columns: [
        { heading: "Choose for an outdoor anchor", body: "Let a mountain, long walking day, landscape view or water-based activity claim the date window first." },
        { heading: "Choose for human tolerance", body: "Prioritise the traveller least able to handle heat, cold, humidity, poor air or rapid elevation change." },
        { heading: "Choose for fixed dates", body: "If leave dates cannot move, change the route or activity mix instead of searching for a fictional nationwide sweet spot." }
      ]
    },
    {
      id: "official-boundary-heading",
      type: "heading",
      level: 2,
      text: "What the official climate evidence can—and cannot—tell you"
    },
    {
      id: "official-boundary",
      type: "paragraph",
      text: "China Meteorological Administration material describes a country with complex climate types shaped by latitude, land–sea position, monsoon influence and topography. That supports regional screening: a northern inland city, a humid southern city and a plateau extension should not inherit one national average. Historical climate describes recurring conditions, however; it cannot promise the rain, temperature or visibility of one future week."
    },
    {
      id: "route-zones-heading",
      type: "heading",
      level: 2,
      text: "Translate a city list into travel exposures"
    },
    {
      id: "route-zones",
      type: "table",
      caption: "Use exposures rather than broad labels such as north and south",
      columns: ["Exposure", "What it changes", "Question to ask"],
      rows: [
        ["Humid monsoon-influenced stop", "Rain plan, drying time, heat load and the value of indoor alternatives", "Would a wet or hot day remove the main reason for coming?"],
        ["Dry inland or northern stop", "Day–night range, wind, sun exposure and colder seasonal edges", "Can the group layer clothing and still sustain the planned walking?"],
        ["High-elevation stop", "Temperature, weather volatility and recovery margin", "Can the first day stay flexible, and is there a lower-elevation fallback?"],
        ["Mountain or visibility-dependent stop", "Views, trail access and transport reliability", "Can it move within the itinerary if the short-range forecast is poor?"],
        ["Large city with indoor depth", "More substitutes when weather turns", "Which museums, markets or neighbourhood activities can replace an exposed day?" ]
      ]
    },
    {
      id: "decision-variables-heading",
      type: "heading",
      level: 2,
      text: "The six variables that decide the window"
    },
    {
      id: "decision-variables",
      type: "list",
      ordered: false,
      items: [
        "Irreplaceability: a famous stop is not automatically the anchor; the anchor is the experience that has no satisfying weather-proof substitute.",
        "Exposure duration: two hours outside and a full-day hike should not receive the same weather weight.",
        "Traveller tolerance: children, older travellers and people sensitive to heat or elevation may set the practical limit for the whole group.",
        "Flexibility: an outdoor stop with two movable days is safer than one locked to a timed arrival and immediate departure.",
        "Operating season: a climate window is useless if the attraction, road or service is closed or restricted; confirm the named operator separately.",
        "Holiday pressure: pleasant weather can overlap heavy domestic travel. Make the public-holiday decision after the climate screen, not as a substitute for it."
      ]
    },
    {
      id: "workflow-heading",
      type: "heading",
      level: 2,
      text: "A practical date-selection workflow"
    },
    {
      id: "workflow",
      type: "list",
      ordered: true,
      items: [
        "Write one sentence for what would make each stop worth the journey. This prevents a generic climate label from replacing the real trip purpose.",
        "Mark each priority as weather-critical, weather-sensitive or weather-tolerant. A mountain sunrise may be critical; a city food route may only be sensitive.",
        "Add elevation and the amount of continuous outdoor time. Treat a rapid move to higher terrain as its own planning constraint.",
        "Choose two or three candidate windows for the hardest stop using long-term official climate context, not a precise forecast months ahead.",
        "Test the other stops for acceptable conditions. Reject a window only when it breaks a core activity or traveller limit—not because another month looks marginally nicer.",
        "Check the official holiday calendar and named attraction operating notices. Then choose the window with the fewest severe conflicts.",
        "Near travel, replace climate assumptions with official forecasts and local notices. Move flexible outdoor days before cancelling an entire region."
      ]
    },
    {
      id: "example-heading",
      type: "heading",
      level: 2,
      text: "Planning example: city, landscape and plateau"
    },
    {
      id: "example",
      type: "callout",
      tone: "neutral",
      title: "An example, not a forecast or recommended itinerary",
      body: "Suppose a route combines a museum-rich eastern city, a rain-sensitive mountain landscape and a higher-elevation extension. Give the mountain first claim on the broad window, protect a flexible day around it, and keep the city as the weather-tolerant section. Then ask whether the plateau conditions and recovery margin suit the group. If they do not, remove that extension rather than forcing one date to serve three incompatible exposures."
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Common planning failures and better responses",
      columns: ["Failure", "Why it fails", "Recovery"],
      rows: [
        ["Using a national monthly average", "It smooths out regional and elevation differences that travellers actually feel.", "Compare the route's specific exposures and hardest activity."],
        ["Treating climate as a forecast", "Averages cannot confirm one week's rain or visibility.", "Recheck official forecasts close to departure and retain movable days."],
        ["Packing for the warmest city", "The coldest or wettest segment then controls comfort.", "Build a layering and rain plan around the route extremes."],
        ["Choosing perfect weather but a major holiday", "Transport and attraction pressure may erase the expected benefit.", "Cross-check the official holiday calendar before booking fixed inventory."],
        ["Keeping every region", "The itinerary becomes a compromise in which no anchor receives enough margin.", "Cut the climate outlier or replace its exposed activity." ]
      ]
    },
    {
      id: "switch-heading",
      type: "heading",
      level: 2,
      text: "When to choose a different route instead of different dates"
    },
    {
      id: "switch-rule",
      type: "paragraph",
      text: "Keep the dates and change the route when leave, school or event dates are fixed; when one outlier region creates most of the packing and recovery burden; or when the group cannot tolerate the hardest exposure. Move the dates when the trip is built around one seasonal outdoor experience and the rest of the route can follow. Neither choice is a failure: the goal is a coherent trip, not collecting regions."
    },
    {
      id: "booking-checklist-heading",
      type: "heading",
      level: 2,
      text: "Before committing non-refundable bookings"
    },
    {
      id: "booking-checklist",
      type: "list",
      ordered: false,
      items: [
        "The route's weather-critical experience and a realistic substitute are written down.",
        "Elevation and recovery time appear in the itinerary, not only on the packing list.",
        "Every exposed stop has either a movable day, an indoor fallback or flexible cancellation terms.",
        "The official holiday calendar and named attraction or transport notices have been checked.",
        "The group has a plan for rain, heat, cold and poor visibility at the route's extremes."
      ]
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Recheck close to travel",
      body: "This guide deliberately avoids city-by-month forecasts. Use the China Meteorological Administration and the relevant local meteorological bureau for current forecasts and warnings; use the named attraction or operator for closures. A forecast update can change day order even when the regional strategy remains sound."
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide covers",
      body: "This guide explains how to screen climate regions when timing a multi-region China trip. It does not replace a city-specific seasonal guide, a live forecast, a medical assessment for elevation, or the public-holiday calendar."
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Need a climate-screened route?",
      body: "Send your fixed or flexible dates, travellers, candidate regions and the outdoor experience you most want to protect. A useful review should identify the climate outlier and fallback, not promise perfect weather."
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { label: "Make the October timing decision", href: "/guides/china-in-october-golden-week-or-later/", description: "Use the month-specific guide for National Day and regional weather." },
        { label: "Check the official holiday calendar", href: "/guides/china-public-holidays-travel-calendar/", description: "Climate suitability does not remove holiday pressure." },
        { label: "Compare shoulder-season value", href: "/guides/china-shoulder-season-value-tradeoff/", description: "Add price, daylight and operating limits after the climate screen." },
        { label: "Separate tiankeng from wild sinkholes", href: "/guides/china-tiankeng-sinkholes-explained/", description: "Learn what tiankeng means in geology, how public scenic sites differ from research locations, and what access evidence to check before visiting." },
        { label: "Read the 24 solar terms without treating them as forecasts", href: "/guides/china-24-solar-terms-weather-food-daily-life/", description: "Separate astronomical markers, regional weather, seasonal food and current conditions before changing a trip." },
        { label: "Use the Qinling–Huaihe zone as a transition, not a weather wall", href: "/guides/qinling-huaihe-transition-zone/", description: "Compare west–east terrain, current forecasts and traveller-specific conditions before drawing a north–south conclusion." },
        { label: "Walk Nanming from day to night", href: "/guides/guiyang-nanming-old-city-day-to-night-walk/", description: "Walk from the old-city lanes to Jiaxiu Pavilion, the Nanming River and Qingyun Market in an order that follows daylight, evening lights and meal energy." },
        { label: "Separate Wenchang's space sites", href: "/guides/wenchang-commercial-space-city/", description: "Distinguish Wenchang's national launch site, commercial launch center and aerospace development—and verify any visitor arrangement afresh." },
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        { label: "China climate types and characteristics", url: "https://www.cma.gov.cn/2011xzt/2017zt/20170720/2017072004/201707200101/202111/t20211103_4148108.html", publisher: "China Meteorological Administration", reviewedAt: "2026-08-12" },
        { label: "Main characteristics of China's climate", url: "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html", publisher: "China Meteorological Administration", reviewedAt: "2026-08-12" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
