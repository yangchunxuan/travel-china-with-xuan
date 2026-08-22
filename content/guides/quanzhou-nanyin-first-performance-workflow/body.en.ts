import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "To hear nanyin in Quanzhou, find a dated listing published by the city rather than a schedule copied from a travel page, then turn up at one of two small rooms and sit close. The municipal troupe's programmes run about seventy minutes and start either mid-evening or mid-afternoon. You will hear slow melodies on a bamboo dongxiao and a crooked-neck lute held flat across the lap, with ballads sung in the Quanzhou dialect. This page explains how to find a real date, what the seventy minutes contains, and which claims about nanyin you should not believe.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The short version",
      tone: "decision",
      body: "Nanyin in a theatre is programmed by the Quanzhou Nanyin Inheritance Centre, and the dates appear in two places the city itself publishes: the culture bureau's monthly schedule of public-welfare performances, and the municipal government's city-calendar entries. Both name the venue, the troupe, the duration and the ticket price for that specific run. Check them for your dates, in that order. Do not plan around any calendar that is not dated, including this page - which deliberately publishes no dates at all.",
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
      text: "UNESCO, which inscribed nanyin on the Representative List in 2009, describes it as a musical performing art central to the culture of the Minnan people of southern Fujian and to Minnan communities overseas, built on slow, simple and elegant melodies. Two instruments are singled out as distinctive: a bamboo flute called the dongxiao, and a crooked-neck lute called the pipa which is played horizontally rather than upright. Around them sit more ordinary wind, string and percussion instruments. Nothing is amplified in the way a modern concert is, and nothing is fast.",
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
      text: "The ticketed performances a visitor is most likely to attend are given by the Quanzhou Nanyin Inheritance Centre, the municipal troupe, in two rooms that both carry nanyin in their names: a larger hall and a small theatre. The small one is unusually small. The provincial account describes a room on the upper floor with no modern stage lighting or sound system, where the audience sits at no distance at all, and which is named for a shrine inside it - nanyin practitioners revere Meng Chang as the founding patron of the music, the same figure UNESCO names as the god of music worshipped at spring and autumn ceremonies. Performers there play with a gilded lion under their feet and palace lanterns beside them.",
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
      body: "UNESCO records nanyin as performed at spring and autumn ceremonies, at weddings and funerals, and during festivities in courtyards, markets and streets. The provincial account adds red-brick houses, teahouses and guesthouses to the list of places it is heard. A ticketed seventy-minute programme is a real and convenient way in, and it is also the most formal setting the music has. If you hear it drifting out of a temple courtyard while you are walking, that is not a lesser version of what you paid for.",
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
          "Whether nanyin is running at all in that month, on which dates, in which of the two rooms, at what time and price",
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
      text: "Read the monthly schedule first to find out whether anything is on, then look for the city-calendar entry for the specific programme you want. Both are published by city bodies, which is the point: a listing that survives contact with a government website is a listing someone is accountable for.",
    },
    {
      id: "find-list",
      type: "list",
      items: [
        "Every nanyin entry in the sample of official listings consulted for this page ran seventy minutes. Treat that as the shape of the evening, not as a guarantee for yours.",
        "Start times in those listings were mid-evening for the larger hall and mid-afternoon for the small theatre. Check which room your listing names, because it changes when your day ends.",
        "Prices differed between programmes in the same month, and public-welfare performances were cheaper than the main-hall runs. Read the price on the listing rather than assuming a standard ticket.",
        "The city-calendar entries carry an enquiry telephone number. It is the right way to ask whether a run has sold out, and it is not reproduced here because published numbers change.",
        "Programme titles change constantly. Do not search for a title you saw somewhere; search for the venue and the troupe.",
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
      text: "Sit close. This is music built for a room, and in the small theatre there is no amplification to carry it to the back. If you have a choice of tier, the cheaper seats in a small room are often better than the same money spent on distance in a large one.",
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
        "The room itself is part of it. In the small theatre, the shrine, the lanterns and the absence of a sound system are not a heritage set dressing - they are the working conditions the music was written for.",
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
          "No source consulted here says that. What is documented is that migration from the Central Plains across several dynasties brought musical culture into the Minnan region, where it fused with local music; that more than three thousand scores and songs have been collected and organised; and that the form is alive now, in societies, schools and a professional troupe",
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
        "No performance calendar, permanent or otherwise. Programmes, dates and prices change every month, and a copied calendar is the single most common reason visitors arrive at a dark theatre.",
        "No ticket prices. Prices differed between programmes in the same month in the listings consulted, so any figure printed here would be wrong for most readers.",
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
          label: "Xiamen, Quanzhou and the Fujian tulou in one route",
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
          reviewedAt: "2026-08-22",
        },
        {
          label: "Hear a piece of nanyin: a thousand years of elegance",
          url: "https://www.fj.gov.cn/zwgk/ztzl/sxzygwzxsgzx/sdjj/wvjj/202501/t20250117_6703931.htm",
          publisher: "Fujian Provincial People's Government portal",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Monthly schedule of public-welfare performances by Quanzhou municipal arts troupes",
          url: "https://cbtb.quanzhou.gov.cn/xwdt/bjdt/202502/t20250226_3143384.htm",
          publisher: "Quanzhou Municipal Bureau of Culture, Radio, Television and Tourism",
          reviewedAt: "2026-08-22",
        },
        {
          label: "City calendar: a nanyin programme at the Nanyin Art Garden",
          url: "https://www.quanzhou.gov.cn/lyb/csrl/202604/t20260424_3286287.htm",
          publisher: "Quanzhou Municipal People's Government",
          reviewedAt: "2026-08-22",
        },
        {
          label: "City calendar: a public-welfare nanyin programme",
          url: "https://www.quanzhou.gov.cn/lyb/csrl/202604/t20260424_3286281.htm",
          publisher: "Quanzhou Municipal People's Government",
          reviewedAt: "2026-08-22",
        },
        {
          label: "City calendar: a nanyin study programme",
          url: "https://www.quanzhou.gov.cn/lyb/csrl/202507/t20250729_3194354.htm",
          publisher: "Quanzhou Municipal People's Government",
          reviewedAt: "2026-08-22",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
