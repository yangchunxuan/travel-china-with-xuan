import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "To hear nanyin in Quanzhou, begin with a current, dated listing published by the city rather than a schedule copied from a travel page. That official listing controls the venue, start time, stated duration and price for your performance. You will hear slow melodies on a bamboo dongxiao and a crooked-neck lute held flat across the lap, with ballads sung in the Quanzhou dialect. This page explains how to find the listing, what to listen for, and which claims about nanyin you should not believe.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The short version",
      tone: "decision",
      body: "Nanyin theatre programmes appear in two places the city publishes: the culture bureau's schedule for a named month and the municipal government's city-calendar entries. Start with the current month's official schedule, then open the dated entry for your programme if one is available. The current official listing for your performance - not any historical example on this page - controls its venue, start time, stated duration and price.",
    },
    {
      id: "hear-heading",
      type: "heading",
      level: 2,
      text: "What you are actually going to hear",
    },
    {
      id: "hear-p1",
      type: "paragraph",
      text: "UNESCO, which inscribed nanyin on the Representative List in 2009, describes it as a musical performing art central to the culture of the Minnan people of southern Fujian and to Minnan communities overseas, built on slow, simple and elegant melodies. Two instruments are singled out as distinctive: a bamboo flute called the dongxiao, and a crooked-neck lute called the pipa which is played horizontally rather than upright. Around them sit more ordinary wind, string and percussion instruments. The character UNESCO emphasises is measured, simple and elegant rather than hurried.",
    },
    {
      id: "hear-p2",
      type: "paragraph",
      text: "The repertoire divides into three, and knowing which one you are hearing is most of what a first-time listener needs. UNESCO puts it as one purely instrumental component, one that includes voice, and one of ballads accompanied by the ensemble and sung in the Quanzhou dialect. The Fujian provincial government's own account of the form gives the three their Chinese names and describes how they behave in performance.",
    },
    {
      id: "hear-table",
      type: "table",
      caption: "The three parts of the repertoire, and how each behaves on stage",
      columns: ["Part", "What it is", "Where it usually falls", "What to listen for"],
      rows: [
        [
          "Zhi (the suites)",
          "Long pieces that have words and a score and mark the pipa fingering, but which are generally played rather than sung",
          "Opening. The provincial account describes it as placed at the start as pure ensemble playing",
          "The whole group settling into one tempo. This is the piece that tells you how slow the evening will be",
        ],
        [
          "Pu (the instrumental scores)",
          "Purely instrumental pieces with titles, mostly depicting seasons, flowers, birds, insects, grasses and horses",
          "Often closing. In the programme the province documents, the evening ended with the score Plum Blossom Melody",
          "No voice at all - which is why this is the part that needs no dialect from you",
        ],
        [
          "Qu (the songs)",
          "The most numerous category by far, wide-ranging in subject: longing, landscape, religion and much else",
          "Through the middle, alternating with instrumental items",
          "Whether one singer holds the clappers alone, or four take turns. Both are documented forms",
        ],
      ],
    },
    {
      id: "hear-p3",
      type: "paragraph",
      text: "That last row matters more than it looks. UNESCO's own description gives two formats for the sung ballads - a sole singer who also plays clappers, or a group of four who perform in turn - so a performance with one singer is not a reduced version of a performance with four. Anyone who tells you nanyin has one fixed ensemble is describing a photograph, not the tradition.",
    },
    {
      id: "who-heading",
      type: "heading",
      level: 2,
      text: "Who performs it, and in what kind of room",
    },
    {
      id: "who-p1",
      type: "paragraph",
      text: "The ticketed performances a visitor is most likely to attend are given by the municipal Quanzhou Nanyin Inheritance Centre. The June 2026 monthly schedule and a May 2026 city-calendar example name the Nanyin Art Garden; older official material also documents a small theatre. Let the current listing decide your venue. A January 2025 provincial account described that small theatre as an upstairs room that at the time had no modern stage lighting or sound system, with the audience at very close range, and named for a shrine inside it - nanyin practitioners revere Meng Chang as the founding patron of the music, the same figure UNESCO names as the god of music worshipped at spring and autumn ceremonies. Performers there were described with a gilded lion under their feet and palace lanterns beside them.",
    },
    {
      id: "who-p2",
      type: "paragraph",
      text: "The professional troupe is the visible tip of something much wider. The provincial account counts more than four hundred nanyin societies in the city, more than seventy transmission sites and over six thousand people working in performance, and describes amateur clubs meeting in temple courtyards - one such society, mostly retirees, takes its name from a classical nanyin score. Nanyin entered Quanzhou's primary and secondary classrooms in 1989, and the local teachers' university runs what it describes as the country's first nanyin undergraduate degree and master's programme. A national-level tradition-bearer born in 1946 is quoted saying Quanzhou families sing it at month-old banquets, birthdays, weddings and funerals - from birth to death.",
    },
    {
      id: "who-callout",
      type: "callout",
      title: "A theatre ticket is one context, not the context",
      tone: "neutral",
      body: "UNESCO records nanyin as performed at spring and autumn ceremonies, at weddings and funerals, and during festivities in courtyards, markets and streets. The provincial account adds red-brick houses, teahouses and guesthouses to the list of places it is heard. A ticketed programme is a real and convenient way in, and it is also the most formal setting the music has. If you hear it drifting out of a temple courtyard while you are walking, that is not a lesser version of what you paid for.",
    },
    {
      id: "find-heading",
      type: "heading",
      level: 2,
      text: "Finding a real date",
    },
    {
      id: "find-p1",
      type: "paragraph",
      text: "This is the part most visitors get wrong, because nanyin listings are widely copied and rarely dated. Quanzhou publishes its own, in two forms, and both are worth learning to read because they answer different questions.",
    },
    {
      id: "find-table",
      type: "table",
      caption: "The two official sources, and what each one settles",
      columns: ["Source", "What it is", "What it settles", "What it will not tell you"],
      rows: [
        [
          "The culture bureau's monthly performance schedule",
          "A table of public-welfare performances by the municipal arts troupes for one named month, published in advance",
          "Whether nanyin is running at all in that month, on which dates, at which venue, at what time, for what stated duration and price",
          "Anything about a month it does not cover, or about availability - it is a schedule, not a booking system",
        ],
        [
          "The municipal government's city-calendar entries",
          "One short page per production, giving date, venue, troupe, duration, ticket price and an enquiry telephone number",
          "The specifics of one named programme, including how long it runs and what the tiers cost",
          "Whether that programme repeats later, or what else is on that week",
        ],
      ],
    },
    {
      id: "find-p2",
      type: "paragraph",
      text: "Read the current month's official schedule first to find out whether anything is on, then look for the city-calendar entry for the specific programme you want. For planning, the current dated official listing controls; the older examples in the source list only show how these channels have been used. If two official pages differ, use the newer entry's enquiry channel to confirm.",
    },
    {
      id: "find-list",
      type: "list",
      items: [
        "The dated official examples cited below, spanning July 2025 to June 2026, listed seventy minutes. That is a historical sample, not a standard or a prediction: use the duration in your current listing.",
        "Those same examples include afternoon and evening starts, while one special-event entry offered six time slots in a single day. There is no reliable venue-to-time rule; use the start time in your current listing.",
        "Prices varied across the cited historical examples. Read the price on the current listing rather than assuming a standard ticket.",
        "The city-calendar entries carry an enquiry telephone number. It is the right way to ask whether a run has sold out, and it is not reproduced here because published numbers change.",
        "Programme titles change. Start with the current monthly schedule; if you need to search further, use the venue and troupe shown there rather than an old title.",
      ],
    },
    {
      id: "watch-heading",
      type: "heading",
      level: 2,
      text: "Where to sit, and what to watch",
    },
    {
      id: "watch-p1",
      type: "paragraph",
      text: "Choose a seat for a comfortable view of the players. A January 2025 provincial feature described one small-theatre setup as close-range and without a modern sound system at that time. It does not establish today's equipment or acoustics, so use current venue and seating information rather than assuming amplification status.",
    },
    {
      id: "watch-p2",
      type: "paragraph",
      text: "The provincial account describes what it calls the most classic arrangement: the singer sits in the centre holding the clappers, the pipa and sanxian players sit to the right, and the dongxiao and erxian players to the left. Notice the word classic. It is a documented convention rather than a rule, and it sits alongside UNESCO's two vocal formats - so if the group in front of you is arranged differently, you are watching a variation, not a mistake.",
    },
    {
      id: "watch-list",
      items: [
        "The pipa is the thing to look at first. It is bent-necked and held flat across the lap like a guitar, not upright the way a modern pipa is played. Once you have seen it you can identify nanyin from across a courtyard.",
        "The clappers are not decoration. The player holding them sits centrally and sets the rhythm for everyone, closer to a conductor than a percussionist.",
        "The pipa leads the ensemble and plays the skeletal notes of the piece. The notation nanyin uses is even called the pipa fingering score - which tells you where the music's centre of gravity is.",
        "Watch the dongxiao player's breathing rather than their fingers. The long lines are the point, and they are what makes the tempo feel deliberate rather than slow.",
        "The room can be part of the experience. A January 2025 feature described the small theatre's shrine and lanterns, and said that room then had no modern sound system. Treat that as a description of that setting at that time, not as a guarantee about today's equipment.",
      ],
      type: "list",
    },
    {
      id: "dialect-heading",
      type: "heading",
      level: 2,
      text: "Following it without the dialect",
    },
    {
      id: "dialect-p1",
      type: "paragraph",
      text: "The sung ballads are in the Quanzhou dialect, and no amount of Mandarin will get you through them. This is not a problem to solve so much as a fact to plan around, and there are three honest ways to do it.",
    },
    {
      id: "dialect-list",
      items: [
        "Use the instrumental items as your anchor. The purely instrumental scores carry titles about seasons, flowers, birds and horses, and they ask nothing of your language at all. If you are going to concentrate hard for fifteen minutes, spend it there.",
        "Read the programme's item list before it starts, not during. Knowing that the opening is ensemble playing and the closing is an instrumental score tells you the arc without a word of text.",
        "Accept the middle. The songs are the largest part of the repertoire and the part you will understand least, and sitting inside something you cannot parse is a legitimate way to hear music.",
      ],
      type: "list",
    },
    {
      id: "dialect-p2",
      type: "paragraph",
      text: "One local view is worth carrying in. The tradition-bearer quoted by the province says that learning nanyin is learning Minnan speech, and that overseas families send children to study it precisely because the language comes with it. The dialect is not a barrier bolted onto the music. It is part of what the music is for.",
    },
    {
      id: "claims-heading",
      type: "heading",
      level: 2,
      text: "Four claims to handle carefully",
    },
    {
      id: "claims-p1",
      type: "paragraph",
      text: "Nanyin attracts superlatives, and some of them are repeated so often that they have stopped being checked. Here is what the sources actually support.",
    },
    {
      id: "claims-table",
      type: "table",
      caption: "What is commonly said, and what is actually documented",
      columns: ["The claim you will meet", "What the sources support"],
      rows: [
        [
          "That nanyin is Tang-dynasty music preserved intact",
          "The provincial account reports that scholars generally hold nanyin to be closely related to Tang and Song music and among the oldest surviving Chinese genres, and that specific instruments retain older forms - the dongxiao is described as following the Tang chiba system, the sanxian as derived from a Qin and Han drum, the erxian as keeping the basic shape of an early bowed instrument. That is a set of attributed positions and organological observations, not a claim that a Tang repertoire survives unchanged",
        ],
        [
          "That it has been performed unbroken for a thousand years",
          "The official sources cited below do not support that wording. What is documented is that migration from the Central Plains across several dynasties brought musical culture into the Minnan region, where it fused with local music; that more than three thousand scores and songs have been collected and organised; and that the form is alive now, in societies, schools and a professional troupe",
        ],
        [
          "That there is one correct ensemble",
          "UNESCO documents two vocal formats, one singer with clappers or four in turn. The provincial account calls the five-position seating the most classic form, which is a description of a convention",
        ],
        [
          "That it is a frozen museum piece",
          "The same troupe's new works have won national quyi awards, a nanyin-based song reached the national Spring Festival broadcast in 2023, and UNESCO's own file records urban development as a threatening factor - which is a statement about a living practice under pressure, not a preserved object",
        ],
      ],
    },
    {
      id: "repair-heading",
      type: "heading",
      level: 2,
      text: "When it does not work out",
    },
    {
      id: "repair-table",
      type: "table",
      caption: "Four situations and what to do about each",
      columns: ["The situation", "What to do"],
      rows: [
        [
          "Nothing is scheduled while you are in Quanzhou",
          "Widen from the theatre to the ecosystem. The city has hundreds of amateur societies and dozens of transmission sites, and the provincial account names the municipal intangible heritage museum and a cultural salon among the places nanyin is heard. Ask at the venue or the museum rather than concluding the music is unavailable that week",
        ],
        [
          "You want to hear it the way locals do, not in a theatre",
          "That is the older setting, and it is documented: temple courtyards, festivities, weddings and funerals. It cannot be booked, and turning up at somebody's family ceremony is not the answer. Walking the old city in the evening is",
        ],
        [
          "You have a listing but cannot tell whether seats remain",
          "The city-calendar entry for the production carries an enquiry number. Use that rather than a resale page. Nothing on this page can tell you today's availability",
        ],
        [
          "You booked at the wrong theatre",
          "Quanzhou's municipal schedule programmes several troupes at once, and the puppet theatres, the Gaojia opera house and the Liyuan opera theatre are separate venues with separate companies. Check the troupe name on your listing, not just the word Quanzhou",
        ],
      ],
    },
    {
      id: "limits-heading",
      type: "heading",
      level: 2,
      text: "What this page will not publish",
    },
    {
      id: "limits-list",
      items: [
        "Do not rely on a copied performance calendar. Programmes, dates and prices change, and an old listing can leave you at a dark theatre.",
        "No ticket prices. Prices varied across the cited historical examples, so the current official listing is the only safe source for your performance.",
        "No booking, no resale links, no claim that we can secure seats.",
        "No history of nanyin beyond what is needed to hear it well. The origin story is a genuine scholarly subject and this is a guide to attending a performance.",
      ],
      type: "list",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Read next",
      items: [
        {
          label: "Quanzhou string puppetry for a first audience",
          href: "/guides/quanzhou-string-puppetry-first-audience/",
          description: "The other Quanzhou performing art on the same municipal schedule, with a different troupe and its own theatres.",
        },
        {
          label: "A first Foshan lion dance performance",
          href: "/guides/foshan-lion-dance-first-performance-workflow/",
          description: "The same problem in a very different art form: finding a real performance rather than a copied schedule.",
        },
        {
          label: "A first Inner Mongolian long song performance",
          href: "/guides/inner-mongolia-long-song-first-performance/",
          description: "Another listed vocal tradition where the room and the language shape what you hear.",
        },
        {
          label: "Sichuan opera face-changing, with context",
          href: "/guides/sichuan-opera-face-changing-with-context/",
          description: "Another performance a visitor meets first as a spectacle, and what changes when you know the frame.",
        },
        {
          label: "How to choose a Fujian tulou cluster",
          href: "/guides/fujian-tulou-cluster-selection/",
          description: "Choosing which tulou cluster to add if Quanzhou is part of a wider Fujian trip.",
        },
        {
          label: "Qiaopi letters, remittances and migration",
          href: "/guides/qiaopi-letters-remittances-and-migration/",
          description: "The overseas Minnan connection that explains why nanyin is also heard across South-East Asia.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources",
      items: [
        {
          label: "Nanyin, Representative List of the Intangible Cultural Heritage of Humanity (file 00199)",
          url: "https://ich.unesco.org/en/RL/nanyin-00199",
          publisher: "UNESCO",
          reviewedAt: "2026-08-23",
        },
        {
          label: "Hear a piece of nanyin: a thousand years of elegance",
          url: "https://www.fj.gov.cn/zwgk/ztzl/sxzygwzxsgzx/sdjj/wvjj/202501/t20250117_6703931.htm",
          publisher: "Fujian Provincial People's Government portal",
          reviewedAt: "2026-08-23",
        },
        {
          label: "June schedule of public-welfare performances by Quanzhou municipal state-owned arts troupes",
          url: "https://cbtb.quanzhou.gov.cn/xwdt/bjdt/202606/t20260601_3296534.htm",
          publisher: "Quanzhou Municipal Bureau of Culture, Radio, Television and Tourism",
          reviewedAt: "2026-08-23",
        },
        {
          label: "City calendar: Nanyin Meets Puppetry",
          url: "https://www.quanzhou.gov.cn/lyb/csrl/202604/t20260424_3286252.htm",
          publisher: "Quanzhou Municipal People's Government",
          reviewedAt: "2026-08-23",
        },
        {
          label: "City calendar: a nanyin programme at the Nanyin Art Garden",
          url: "https://www.quanzhou.gov.cn/lyb/csrl/202604/t20260424_3286287.htm",
          publisher: "Quanzhou Municipal People's Government",
          reviewedAt: "2026-08-23",
        },
        {
          label: "City calendar: a public-welfare nanyin programme",
          url: "https://www.quanzhou.gov.cn/lyb/csrl/202604/t20260424_3286281.htm",
          publisher: "Quanzhou Municipal People's Government",
          reviewedAt: "2026-08-23",
        },
        {
          label: "City calendar: a nanyin study programme",
          url: "https://www.quanzhou.gov.cn/lyb/csrl/202507/t20250729_3194354.htm",
          publisher: "Quanzhou Municipal People's Government",
          reviewedAt: "2026-08-23",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
