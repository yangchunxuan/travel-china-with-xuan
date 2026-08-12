import type { StructuredPageBody } from "@/lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Urtiin Duu (乌日汀哆, usually called 长调民歌 in Chinese) is Mongolian ‘long song’: a vocal tradition whose sustained melodic lines, ornament and flexible rhythm can make a few words unfold over an unexpectedly long span. UNESCO recognizes it jointly for Mongolia and China. In Inner Mongolia, your first encounter may be a focused recital, an intangible-heritage presentation, a theatre work or a tourist show. The useful question is not whether a stage looks ‘traditional’, but whether the organizer tells you what is being sung, by whom and in what programme context."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "What is the safest first choice?",
      body: "Choose an official theatre, public cultural institution, recognized heritage programme or named ensemble whose current programme explicitly lists 长调 or Urtiin Duu and identifies at least the singer or song. A mixed production can be a credible introduction if long song is named, but it is not the same as a dedicated recital. Reconfirm the exact date and ticket with the organizer.",
      tone: "decision"
    },
    {
      id: "distinctions-heading",
      type: "heading",
      level: 2,
      text: "Separate four sounds that promotional pages often bundle"
    },
    {
      id: "form-comparison",
      type: "comparison",
      title: "What the label should—and should not—tell you",
      columns: [
        {"heading": "Urtiin Duu / long song", "body": "Extended, ornamented vocal phrases, a wide range and flexible pulse; the verbal text may move slowly. Regional and performer differences matter. Morin Khuur may accompany it, but accompaniment is not required for the label."},
        {"heading": "Bogino Duu / short song", "body": "The other major Mongolian song form named by UNESCO. Its more compact melodic and textual movement should not be treated as a failed or shortened long song."},
        {"heading": "Khoomei / throat singing", "body": "A distinct vocal practice in which overtone effects are central. It may share a concert with long song, but an overtone passage does not prove that the item is Urtiin Duu."},
        {"heading": "Mixed grassland show", "body": "May combine song, Morin Khuur, dance, horses, acrobatics and amplified theatre. It can contain long song, yet costumes, scenery and a grassland title do not identify the vocal form."}
      ]
    },
    {
      id: "credibility-heading",
      type: "heading",
      level: 2,
      text: "Run a six-point programme check"
    },
    {
      id: "credibility-table",
      type: "table",
      caption: "Evidence to find before paying for a ticket",
      columns: ["Check", "Stronger signal", "Weak or missing signal"],
      rows: [
        ["Organizer", "Official theatre, cultural centre, heritage authority, conservatory or named professional ensemble", "Anonymous reseller or repost with no originating institution"],
        ["Form", "Programme explicitly says 长调、长调民歌 or Urtiin Duu", "Only ‘Mongolian music’, ‘ethnic song’ or ‘grassland spectacle’"],
        ["People", "Singer, ensemble, tradition bearer or artistic team is named", "Only models, costumes or a generic cast image"],
        ["Content", "At least one song title, repertoire note or segment description", "A promotional slogan with no running order"],
        ["Context", "Explains whether this is a recital, heritage demonstration, gala item or mixed production", "Calls every component ‘original ecology’ without defining it"],
        ["Currency", "Date, venue and ticket channel appear on the organizer’s current page", "Old poster, undated short video or schedule copied by a travel seller"]
      ]
    },
    {
      id: "booking-heading",
      type: "heading",
      level: 2,
      text: "Choose and verify in one short workflow"
    },
    {
      id: "booking-list",
      type: "list",
      ordered: true,
      items: [
        "Search the official organizer or venue first, then use ticket platforms only to transact. Save the originating programme page.",
        "Find the exact words 长调, 长调民歌 or Urtiin Duu. If only 马头琴 (Morin Khuur) appears, you have confirmed an instrument, not long song.",
        "Record the singer or ensemble and one song title. If no title is published, ask whether a long-song item is definitely in that performance.",
        "Identify the format. A ten-minute item inside a two-hour spectacle offers a sample; a recital or themed programme allows comparison across pieces.",
        "Confirm language support only if you need it. Translated lyrics can help, but long song can be followed through breath, contour and ornament without a full surtitled text.",
        "Recheck date, venue, start time, seat, refund terms and any real-name ticket rule on the day before travel. A current institution does not make an old poster current."
      ]
    },
    {
      id: "listening-heading",
      type: "heading",
      level: 2,
      text: "Listen across the performance, not for one exotic effect"
    },
    {
      id: "listening-timeline",
      type: "table",
      caption: "A first-listen timeline",
      columns: ["Moment", "Listen for", "Avoid concluding"],
      rows: [
        ["Before the first phrase", "Song title, singer, regional context and whether accompaniment is announced", "That the costume alone identifies a place or lineage"],
        ["Opening phrase", "How the singer enters the pitch and stretches the first syllables", "That a slow tempo by itself defines long song"],
        ["First long line", "Sustained breath, melodic expansion and ornamental turns often described in Chinese as 诺古拉", "That every ornament follows one national template"],
        ["Middle", "Changes of register, tension and release, and the relationship with Morin Khuur if present", "That the instrument is merely background or that it proves the vocal genre"],
        ["Cadence", "How the line settles, pauses and leaves resonance before applause", "That louder or higher automatically means more credible"],
        ["Afterward", "Compare the programme note with what you heard and retain the exact item name", "That the whole mixed show was Urtiin Duu because one segment was"]
      ]
    },
    {
      id: "current-example",
      type: "callout",
      title: "Current example: read the format before the title",
      body: "A 2026 announcement from Inner Mongolia Art Theatre described the season of Qian Gu Ma Song (《千古马颂》) as running from 1 May to 7 October, with horses, music, dance, acrobatics and other stage elements. That makes it a broad mixed production, not evidence of a dedicated long-song recital. If its current programme explicitly names a long-song item, treat that item as an introduction within the larger show. Season and performance details were checked on 13 August 2026 and still require organizer confirmation for a particular date.",
      tone: "neutral"
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two travellers, two valid first performances"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "Match the programme to the attention you can give",
      columns: [
        {"heading": "One free evening in Hohhot", "body": "Prefer a named theatre or public cultural venue with one confirmed long-song item. A mixed concert is acceptable when its programme is transparent. Arrive knowing the singer or song, then use the listening timeline for that segment rather than judging the entire evening as one genre."},
        {"heading": "Music-focused trip", "body": "Look for a dedicated recital, conservatory event, heritage week or programme with several named singers and pieces. Compare regional or individual phrasing only when the organizer provides those identities. Add a Morin Khuur performance as a related form, not as a substitute automatically labelled long song."}
      ]
    },
    {
      id: "after-heading",
      type: "heading",
      level: 2,
      text: "Continue understanding after the applause"
    },
    {
      id: "after-list",
      type: "list",
      items: [
        "Save the official programme, item title, singer and date; clips without this context quickly become untraceable.",
        "Ask the venue whether a programme note, talk or public workshop explains the song text and regional tradition.",
        "Listen to a second named performance of the same piece before deciding that one singer’s ornament is a universal rule.",
        "If filming is permitted, record only a short personal reference and respect performer, venue and audience rules. A ticket does not grant publication rights.",
        "Use UNESCO and China’s intangible-heritage records for form-level context, while treating a specific stage arrangement as the artistic choice of that production."
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "Recover when the programme is vague or changes"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Common failure and the next useful action",
      columns: ["Problem", "Recovery"],
      rows: [
        ["The seller says ‘Mongolian show’ but cannot name a form", "Ask for the organizer’s programme. If long song is not stated, buy only if you still want the mixed show."],
        ["A Morin Khuur player appears but no singer does", "Enjoy it as a related instrumental performance; do not relabel it Urtiin Duu."],
        ["The advertised singer or item is substituted", "Request the revised running order and decide whether the remaining programme still meets your purpose."],
        ["The event is cancelled", "Use the official theatre or cultural-agency calendar for another named event; avoid an unverified reseller’s replacement promise."],
        ["No translation is available", "Follow phrase length, register, ornament, pauses and accompaniment; seek an official text afterward rather than relying on auto-captioning Mongolian lyrics."],
        ["Photography is forbidden", "Keep written programme details and listen. Do not mistake lack of personal footage for lack of evidence."]
      ]
    },
    {
      id: "boundary-callout",
      type: "callout",
      title: "Credible does not mean frozen",
      body: "Microphones, concert halls and contemporary arrangements do not automatically invalidate a living tradition. Conversely, outdoor scenery, horses, deel-style clothing or the word ‘heritage’ do not guarantee that a vocal item is long song. Homeground’s judgment is about transparent identification and a traceable programme, not a purity score for performers or communities.",
      tone: "warning"
    },
    {
      id: "links",
      type: "internal-links",
      title: "Plan other live cultural encounters",
      items: [
        {"label": "Browse Homeground’s China guides", "href": "/guides/", "description": "Return to the complete guide collection."},
        {"label": "Choose a first Foshan lion-dance performance", "href": "/guides/foshan-lion-dance-first-performance-workflow/", "description": "Use another organizer-and-programme verification workflow."},
        {"label": "Check China’s public-holiday travel calendar", "href": "/guides/china-public-holidays-travel-calendar/", "description": "Anticipate festival crowds and schedule changes."},
        {"label": "Prepare payment for tickets in China", "href": "/guides/how-to-pay-in-china-as-a-tourist/", "description": "Keep a backup method when buying current performances."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and institutional sources checked on 13 August 2026",
      items: [
        {"label": "Urtiin Duu, traditional folk long song", "url": "https://ich.unesco.org/en/RL/urtiin-duu-traditional-folk-long-song-00115", "publisher": "UNESCO Intangible Cultural Heritage", "reviewedAt": "2026-08-13"},
        {"label": "Mongolian long song project record", "url": "https://www.ihchina.cn/project_details/12410.html", "publisher": "China Intangible Cultural Heritage Network", "reviewedAt": "2026-08-13"},
        {"label": "Traditional music of the Morin Khuur", "url": "https://ich.unesco.org/en/RL/traditional-music-of-the-morin-khuur-00068", "publisher": "UNESCO Intangible Cultural Heritage", "reviewedAt": "2026-08-13"},
        {"label": "Inner Mongolia Art Theatre", "url": "https://www.nmgysjygw.cn/", "publisher": "Inner Mongolia Art Theatre", "reviewedAt": "2026-08-13"},
        {"label": "2026 season announcement for Qian Gu Ma Song", "url": "https://www.nmg.news.cn/20260117/43bec76a82594f209a9224759a314329/c.html", "publisher": "Xinhua Net Inner Mongolia", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
