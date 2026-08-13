import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "China's twenty-four solar terms are fixed markers in the annual solar cycle and a living framework for remembering seasonal change, farm work and community practice. For a traveller, a term name is a clue to ask what this place notices or does at this time—not a promise that rain, frost, snow or warmth will appear on your visit.",
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "The traveller's rule",
      body: "Use the solar term to interpret what you see; use a current local forecast to decide what to wear and whether an outdoor plan works. When a dish or event is labelled with a solar term, verify the locality, the community or venue presenting it, and the date. The label alone does not make the practice nationwide, ancient or guaranteed today.",
    },
    {
      id: "scope-heading",
      type: "heading",
      level: 2,
      text: "One calendar, three different kinds of meaning",
    },
    {
      id: "scope-table",
      type: "table",
      caption: "Keep these layers separate before interpreting a solar-term reference",
      columns: ["Layer", "What is stable", "What varies", "Traveller use"],
      rows: [
        ["Astronomical marker", "The sequence and 15-degree spacing of the sun's apparent longitude", "The exact civil-calendar time from year to year", "Identify where the date sits in the annual cycle"],
        ["Environmental memory", "Names preserve observations of season, weather, phenology and farm work", "Actual conditions by latitude, altitude, monsoon, coast and year", "Notice the question behind the name, then check local evidence"],
        ["Living cultural practice", "Communities transmit foodways, sayings, rituals and events linked to terms", "Who observes them, how, where and whether visitors can join", "Ask for the local owner and current arrangements"],
      ],
    },
    {
      id: "heritage-context",
      type: "paragraph",
      text: "UNESCO inscribed the element in 2016 as knowledge and practices developed through observation of the sun's annual motion. Its description places the origin in the Yellow River reaches, notes that it was progressively applied across China, and records continuing use in agriculture and daily routines. That nationwide reach does not erase regional variation: UNESCO itself names particular community festivals rather than one uniform national performance.",
    },
    {
      id: "mechanics-heading",
      type: "heading",
      level: 2,
      text: "A solar term is an astronomical threshold, not a weather event",
    },
    {
      id: "mechanics",
      type: "paragraph",
      text: "The China Meteorological Administration explains the modern system by the sun's apparent position along the ecliptic: each 15 degrees marks another term. Strictly, the threshold is a moment rather than a whole day. In ordinary speech, however, people may use the name for the date or the roughly two-week interval before the next term. If a timetable, exhibition or ceremony matters, use its stated civil date and time instead of calculating from a translated term name.",
    },
    {
      id: "names-heading",
      type: "heading",
      level: 2,
      text: "Read the names as an old observation index",
    },
    {
      id: "name-families",
      type: "table",
      caption: "Four useful name families—descriptive, not a daily forecast",
      columns: ["Family", "Examples", "What the name points toward", "Safe traveller interpretation"],
      rows: [
        ["Seasonal turning points", "Beginning of Spring, Summer, Autumn and Winter", "A position in the annual seasonal cycle", "The named season may not match local thermal conditions yet"],
        ["Solar geometry", "Spring and Autumn Equinox; Summer and Winter Solstice", "Changes in daylight and the sun's annual position", "Daylight meaning travels better than a temperature assumption"],
        ["Moisture and temperature language", "Rain Water, White Dew, Frost's Descent, Minor and Major Snow", "Remembered tendencies and visible phenomena", "Look for local evidence; do not expect the named event on cue"],
        ["Phenology and farm work", "Awakening of Insects, Grain Rain, Grain Full, Grain in Ear", "Biological signs and agricultural timing", "Ask which crop, habitat and local calendar the speaker means"],
      ],
    },
    {
      id: "forecast-warning",
      type: "callout",
      tone: "warning",
      title: "“Beginning of Spring” does not certify spring weather",
      body: "China spans large differences in latitude, elevation, continentality and monsoon exposure. The CMA explicitly warns that seasonal conditions differ greatly by region. A peer-reviewed study using observations from 549 stations also found changes in climatic thresholds and timing over 1960–2008. Neither the historic name nor a national average can replace a city-level forecast for your dates.",
    },
    {
      id: "weather-heading",
      type: "heading",
      level: 2,
      text: "Turn a poetic weather word into a practical check",
    },
    {
      id: "weather-check",
      type: "table",
      caption: "From term name to travel decision",
      columns: ["You see", "Do not conclude", "Check instead", "Recovery"],
      rows: [
        ["Minor Snow on a calendar", "Snow will fall here", "Local forecast, elevation and road or park notices", "Keep a weather-independent indoor option"],
        ["Rain Water in a caption", "The day will be wet", "Hourly precipitation and the venue's surface conditions", "Move the exposed walk; keep the cultural visit"],
        ["Beginning of Autumn on a menu", "Hot weather has ended", "Heat alerts, shade and evening temperature", "Shorten midday outdoor time"],
        ["Frost's Descent at a farm", "Every field has had frost", "Crop stage, local minimum temperature and the farmer's explanation", "Describe what is observed, not what the name predicts"],
      ],
    },
    {
      id: "food-heading",
      type: "heading",
      level: 2,
      text: "A solar-term dish can mean three different things",
    },
    {
      id: "food-meaning",
      type: "comparison",
      title: "Identify the claim before repeating it",
      columns: [
        {
          heading: "Seasonal ingredient",
          body: "A crop, fish or preserved food is available or valued at this stage of a local production cycle. Ask where it came from and whether the season is current.",
        },
        {
          heading: "Community custom",
          body: "A household or locality associates a food with the term. For Winter Solstice, official CMA material records different foods across regions, which is evidence of plurality, not one national menu.",
        },
        {
          heading: "Commercial theme",
          body: "A restaurant, hotel or shop may create a limited menu around a familiar term. Enjoy it, but do not present a marketing label as proof of an old or universal practice.",
        },
      ],
    },
    {
      id: "food-questions",
      type: "list",
      items: [
        "Is this dish linked to the term in this locality, or is it a broader seasonal menu?",
        "Who describes the link: a community bearer, museum, producer, restaurant or social-media post?",
        "Is the ingredient actually local and in season, or only the name of the promotion?",
        "Does the explanation make a medical claim? If so, treat it as a cultural belief unless reliable health evidence is supplied.",
        "Can dietary restrictions and allergens be confirmed independently of the cultural story?",
      ],
    },
    {
      id: "health-boundary",
      type: "callout",
      tone: "warning",
      title: "This is not seasonal health advice",
      body: "Phrases such as “nourishing,” “dispelling dampness” or “preventing illness” may appear in menus and local explanations. This guide records them only as cultural language. It does not recommend a food, herb or routine to treat or prevent a medical condition; travellers should use appropriate clinical advice for health decisions.",
    },
    {
      id: "activities-heading",
      type: "heading",
      level: 2,
      text: "Local activity needs a named place and present-day host",
    },
    {
      id: "activities",
      type: "paragraph",
      text: "UNESCO's record cites examples including a Beginning of Spring ritual in Jiuhua and the Zhuang First Frost Festival. China's national intangible-heritage database separately documents Anren's Spring Equinox community practice. These examples show how a shared calendar supports distinct local expressions. They do not establish a daily tourist show, open access or an identical event in another town. Check the responsible cultural bureau, museum, community organisation or venue for the current year, and respect restrictions on ritual space and photography.",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two travellers, two defensible readings",
    },
    {
      id: "scenarios",
      type: "comparison",
      columns: [
        {
          heading: "Scenario 1: Winter Solstice food in two cities",
          items: [
            "A traveller sees dumplings promoted in one city and glutinous-rice foods in another.",
            "The strong conclusion is regional variation around the same term—not that one dish is the authentic national rule.",
            "They ask about ingredients and local association, then make dietary decisions from the actual recipe.",
          ],
        },
        {
          heading: "Scenario 2: Awakening of Insects during a cold spell",
          items: [
            "A museum panel explains phenological memory while the day's forecast remains cold.",
            "There is no contradiction: the astronomical marker is fixed, while local biology and weather respond to place and year.",
            "The traveller keeps the museum interpretation and changes the outdoor plan using current conditions.",
          ],
        },
      ],
    },
    {
      id: "workflow-heading",
      type: "heading",
      level: 2,
      text: "A five-step field method",
    },
    {
      id: "workflow",
      type: "list",
      ordered: true,
      items: [
        "Name the solar term and confirm the exact civil date from a reliable calendar for the year of travel.",
        "Separate the astronomical marker from the local weather, crop or phenological claim being made.",
        "Locate the claim: city, village, altitude, venue, community and producer all matter.",
        "Classify what you see as observation, community explanation, institutional interpretation or commercial promotion.",
        "Before attending or eating, verify the current host, access, schedule, ingredients and a workable alternative.",
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the expected scene is absent",
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "Keep the cultural question even when the planned evidence disappears",
      columns: ["Failure", "What it means", "Better next move"],
      rows: [
        ["The field is at a different crop stage", "Local conditions or farm choices differ from the simplified calendar", "Ask the producer what stage is visible now; do not stage a false solar-term scene"],
        ["The announced event is not running", "A heritage listing is not an operating calendar", "Use a museum or documented exhibition and recheck the community's official notice"],
        ["The seasonal dish is sold out", "Availability is not guaranteed by the term", "Ask for another locally explained seasonal ingredient, not a supposedly equivalent national dish"],
        ["The weather contradicts the name", "The name is not a forecast", "Use current weather for the day and keep the name as historical-cultural context"],
      ],
    },
    {
      id: "final-check",
      type: "callout",
      tone: "neutral",
      title: "Final verification before travel",
      body: "Check the exact term date, city forecast, local venue or community notice, visitor access, photography rules and food ingredients close to the visit. Dynamic arrangements were reviewed for editorial boundaries on 13 August 2026, but this page does not claim that any named event, crop stage or menu is currently available.",
    },
    {
      id: "human-help",
      type: "callout",
      tone: "decision",
      title: "Want a human to place the right seasonal stop?",
      body: "Leave your travel dates, party size and rough budget. A Homeground planner can help identify which local practice is current and fit one evidence-based seasonal experience into the route.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning with context",
      items: [
        { "label": "Explore China beyond a checklist", "href": "/explore/", "description": "Return to the published culture and experience collection." },
        { "label": "Decide whether you need a tour guide", "href": "/guides/do-you-need-a-tour-guide-in-china/", "description": "Use interpretation help where local context or live verification changes the experience." },
        { "label": "Check whether the itinerary is too rushed", "href": "/guides/is-your-china-itinerary-too-rushed/", "description": "Protect enough time to observe rather than racing through a seasonal stop." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and academic sources",
      items: [
        { "label": "The Twenty-Four Solar Terms—Representative List entry", "url": "https://ich.unesco.org/en/RL/the-twenty-four-solar-terms-knowledge-in-china-of-time-and-practices-developed-through-observation-of-the-sun-s-annual-motion-00647", "publisher": "UNESCO Intangible Cultural Heritage", "reviewedAt": "2026-08-13" },
        { "label": "Origins and naming of the 24 solar terms", "url": "https://www.cma.gov.cn/2011xzt/essjqzt/jqhz/jqhz02/201312/t20131213_233949.html", "publisher": "China Meteorological Administration", "reviewedAt": "2026-08-13" },
        { "label": "China's Twenty-Four Solar Terms added to UNESCO's Representative List", "url": "https://www.mct.gov.cn/gtb/index.jsp?url=https%3A%2F%2Fwww.mct.gov.cn%2Fwhzx%2Fbnsj%2Fdwwhllj%2F201612%2Ft20161214_773196.html", "publisher": "Ministry of Culture and Tourism of the PRC", "reviewedAt": "2026-08-13" },
        { "label": "Twenty-Four Solar Terms: Anren Spring Equinox community practice", "url": "https://www.ihchina.cn/project_details/15064.html", "publisher": "China Intangible Cultural Heritage Network", "reviewedAt": "2026-08-13" },
        { "label": "Winter Solstice solar-term feature and regional customs", "url": "https://www.cma.gov.cn/ztbd/2025zt/24jq/dongzhi/index.html", "publisher": "China Meteorological Administration", "reviewedAt": "2026-08-13" },
        { "label": "Climatic changes in the Twenty-four Solar Terms during 1960–2008", "url": "https://link.springer.com/article/10.1007/s11434-011-4724-4", "publisher": "Science Bulletin / Springer Nature", "reviewedAt": "2026-08-13" },
        { "label": "Hero image: Beginning of Summer drummers in Banshan by Uuongkinghe, CC BY-SA 4.0; cropped and resized", "url": "https://commons.wikimedia.org/wiki/File:%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%8A%82%E6%B0%94%E4%BB%A4%E9%BC%93_202405051009.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
