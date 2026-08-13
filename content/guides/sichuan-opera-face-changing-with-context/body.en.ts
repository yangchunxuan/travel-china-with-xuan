import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Face-changing is part of Sichuan opera, but it is not a substitute name for the whole form. A useful first performance lets you notice how an actor speaks, sings, moves and builds a character, with or without rapid mask changes. Choose by the named troupe, excerpt and programme format—not by the largest mask photograph on a ticket page. A well-identified visitor programme can be an accessible first encounter as long as you know what it promises.",
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "Look for context before spectacle",
      body: "Prefer a listing that names the producer or troupe, venue, date, excerpts or acts, approximate duration and booking terms. It is stronger if performers, synopsis and language support are identified. Reconfirm the running order directly before attending because live casts and acts change.",
    },
    {
      id: "three-questions",
      type: "list",
      ordered: true,
      items: [
        "Which troupe, company or producer is performing?",
        "Is this a Sichuan-opera excerpt evening, a mixed visitor programme or a substantial play?",
        "Which named scene or other performance elements are currently included?",
      ],
    },
    { id: "formats-heading", type: "heading", level: 2, text: "Three formats, not three grades of purity" },
    {
      id: "formats",
      type: "table",
      caption: "Know the performance contract before choosing",
      columns: ["Format", "What you may receive", "Best for", "Main limitation"],
      rows: [
        ["Full play or substantial production", "A sustained story, role development, singing, speech and ensemble work", "Travellers ready to read a synopsis and stay with one work", "Language and length may be demanding; face-changing may not appear"],
        ["Curated excerpts or opera-focused evening", "Several named scenes selected to show contrasting roles or skills", "The strongest general first choice", "Transitions may be abbreviated; verify how much context is provided"],
        ["Visitor-oriented mixed programme", "Short opera scenes or techniques combined with music, puppetry, acrobatics or other acts", "A limited evening or a group with mixed interests", "It is not evidence that you have seen a complete Sichuan opera"],
      ],
    },
    {
      id: "formats-boundary",
      type: "paragraph",
      text: "These are formats, not authenticity rankings. Skilled performers may work in more than one, and a tourism setting does not prove a lack of training. Conversely, ornate décor and an 'authentic face-changing' label do not identify a work. No answer to the three questions does not automatically mean poor artists; it means the buyer cannot yet judge the format. An honest description matters more than how traditional the venue looks.",
    },
    { id: "context-heading", type: "heading", level: 2, text: "What sits around face-changing" },
    {
      id: "context-vocabulary",
      type: "paragraph",
      text: "China's national intangible-cultural-heritage record describes Sichuan opera through five principal tune systems: gaoqiang (高腔), huqin (胡琴), tanxi (弹戏), kunqu (昆曲) and dengdiao (灯调). That does not mean every programme samples all five. A play or excerpt uses what its story and production require, and regional lineages and companies do not sound identical. The official record establishes a vocabulary; it does not turn a first-time viewer into a classifier by ear.",
    },
    {
      id: "context-actor",
      type: "paragraph",
      text: "Listen beyond melody. Spoken delivery can carry plot and social position; singing shapes a character's emotional turn; percussion marks entrances, movement, tension and comic timing. Pace, gaze, walking patterns, sleeves, fans and other props can establish a role before a translated synopsis catches up. The performance is actor-centred: voice, rhythm and controlled movement work together. Do not decode every costume colour as a fixed national code without the production's own explanation.",
    },
    {
      id: "face-changing-boundary",
      type: "callout",
      tone: "warning",
      title: "One technique, not the whole form",
      body: "Bianlian (变脸) is one special technique inside a larger performance vocabulary. Its dramatic value depends on the character and scene, not the number of changes. Homeground does not explain guarded mechanics, invite frame-by-frame filming or treat a list of effects as a substitute for the name of the work.",
    },
    { id: "timeline-heading", type: "heading", level: 2, text: "A six-part viewing timeline" },
    {
      id: "timeline",
      type: "table",
      caption: "Move from identification to an evidence-based observation",
      columns: ["Moment", "What to do", "What it prevents"],
      rows: [
        ["Before the lights go down", "Save the current first-party programme; note the troupe, work or excerpt, venue and duration; read a short synopsis", "Depending on a reseller title or trying to learn every character biography"],
        ["At the entrance", "Check the venue notice or ask whether the announced cast and acts still apply", "Treating a normal live substitution as evidence against the whole form"],
        ["Opening minutes", "Watch pace, posture, gaze, entrances and the response of musicians or other actors", "Reducing the scene to costume symbols before reading the actor"],
        ["Speech and singing", "Track who addresses whom, when the vocal mode changes and what response follows", "Spending the performance staring continuously at machine translation"],
        ["A special technique", "Ask what changes in the scene—identity, mood, threat, concealment or revelation", "Counting effects without relating them to performance"],
        ["After the close", "Record one named excerpt, one actorly choice and one sound or movement cue", "Leaving with only the statement that the masks were fast"],
      ],
    },
    { id: "credibility-heading", type: "heading", level: 2, text: "Test a programme with a modest evidence ladder" },
    {
      id: "credibility",
      type: "comparison",
      title: "Identification is more useful than prestige language",
      columns: [
        { heading: "Strong identification", items: ["Named troupe or producer", "Named play or excerpts", "Cast or performers when supplied", "Venue, date and direct announcement or booking channel"] },
        { heading: "Useful support", items: ["Synopsis or programme note", "Approximate duration", "Language support and photography rules", "An honest mixed- or excerpt-format label"] },
        { heading: "Weak signals on their own", items: ["Ornate theatre décor", "'Centuries old' without a named work", "A close-up mask photograph", "A reseller review or concierge assurance"] },
      ],
    },
    {
      id: "repertoire-check",
      type: "paragraph",
      text: "The repertoire dictionary maintained through the Sichuan Provincial Academy of Arts can help confirm that a Chinese title belongs to recorded repertoire. It cannot guarantee which version, length, staging or cast you will see. A dated professional programme can establish that a named production was announced on that date; it cannot freeze a future run. Official recognition documents the form but does not certify every commercial performance.",
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "Two practical first-evening choices" },
    {
      id: "scenarios",
      type: "comparison",
      title: "Choose according to preparation and time",
      columns: [
        { heading: "One night and little Chinese", body: "Choose a clearly labelled excerpt or mixed programme with a direct channel, stated duration and a synopsis or introduction. Treat face-changing as one act, then deliberately watch one vocal or comic scene for movement and percussion. This is a sensible first encounter, not a survey of the form." },
        { heading: "Theatre matters enough to prepare", body: "Look for a professional troupe or publicly announced production that names the play and cast. Read the synopsis, allow a longer evening and accept that the strongest choice may not include face-changing. Continuity lets characters and musical decisions develop instead of resetting every few minutes." },
      ],
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "Recover when the evening differs from the listing" },
    {
      id: "recovery",
      type: "table",
      caption: "Protect the viewing task without blaming performers for stale sales copy",
      columns: ["Problem", "Immediate response", "Evidence boundary"],
      rows: [
        ["The advertised face-changing act is removed", "Ask whether the change was announced and whether the seller's stated exchange or refund terms apply; if staying, follow one named excerpt", "A programme change does not discredit the other performers or the form"],
        ["There are no English surtitles", "Request a Chinese programme or permitted synopsis; identify names and the basic conflict before switching the screen off", "Machine translation is orientation, not an authoritative script"],
        ["A mixed show was mistaken for a full opera", "Record which segments were identified as Sichuan opera and use the troupe or excerpt name to choose a longer production later", "Do not call an accurately described mixed programme fraudulent after the fact"],
        ["Sound or crowd intensity is difficult", "Ask before the show about seating farther from speakers and whether temporary exit is allowed; carry hearing protection if needed", "A teahouse or small venue is not automatically quiet"],
        ["Photography is restricted", "Follow venue and performer rules; use an authorized programme or approved media link", "Other audience members filming do not create permission"],
      ],
    },
    { id: "conclusion-heading", type: "heading", level: 2, text: "What the evidence lets you conclude" },
    {
      id: "conclusion",
      type: "paragraph",
      text: "The ICH record supports documented tune systems, performance characteristics and techniques. A dated programme supports that a named production was announced; a direct venue statement supports what that operator said on the review date. None proves a future cast is unchanged, one production is 'most authentic' or a short demonstration represents the whole tradition. After the show, try to name the format, at least one excerpt or troupe, and what face-changing did inside—or outside—a dramatic scene. That is a foundation for a second performance, not merely a viral image.",
    },
    {
      id: "help",
      type: "callout",
      tone: "neutral",
      title: "Need a current performance checked?",
      body: "Send Homeground your date, city, language needs and tolerance for a longer theatre evening. A human planner can verify a first-party listing without promising that one spectacular act represents the whole form. Programmes, casts, times, language support, ticket terms and photography rules were reviewed on 13 August 2026 and must be rechecked for the performance date.",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue reading live performance in context",
      items: [
        { label: "Choose a first Inner Mongolian long-song performance", href: "/guides/inner-mongolia-long-song-first-performance/", description: "Use the same discipline of identifying format, performers and listening task." },
        { label: "Read a first Foshan lion-dance performance", href: "/guides/foshan-lion-dance-first-performance-workflow/", description: "Prepare for a live form without treating a viral technique as the whole tradition." },
        { label: "Order Beijing, Xi'an and Chengdu", href: "/guides/beijing-xian-chengdu-route-order/", description: "Decide where a Chengdu performance fits in the larger trip." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and independent sources",
      items: [
        { label: "Sichuan opera national intangible-cultural-heritage record", url: "https://www.ihchina.cn/Article/Index/detail?id=13161", publisher: "China Intangible Cultural Heritage Network", reviewedAt: "2026-08-13" },
        { label: "Sichuan Provincial Academy of Arts", url: "https://www.scyishu.org.cn/", publisher: "Sichuan Provincial Academy of Arts", reviewedAt: "2026-08-13" },
        { label: "2023 Sichuan opera showcase repertoire review", url: "https://www.scyishu.org.cn/index.php?a=show&c=index&catid=112&id=497&m=content", publisher: "Sichuan Provincial Academy of Arts", reviewedAt: "2026-08-13" },
        { label: "2026 Sichuan Opera Hundred Shows", url: "https://www.yscz.org.cn/Home/News?id=db65b602-adf7-4c54-a144-8c7f09c2e270", publisher: "National Arts Fund centre", reviewedAt: "2026-08-13" },
        { label: "Sichuan culture and tourism official channel", url: "https://wlt.sc.gov.cn/", publisher: "Sichuan Department of Culture and Tourism", reviewedAt: "2026-08-13" },
        { label: "Academic chapter on actor craft in Sichuan opera", url: "https://academic.oup.com/hong-kong-scholarship-online/book/22201/chapter-abstract/182370455", publisher: "Oxford Academic", reviewedAt: "2026-08-13" },
        { label: "Hero photograph: Sichuan opera performance in Chengdu, 2018", url: "https://commons.wikimedia.org/wiki/File:Sichuan_opera_Chengdu.jpg", publisher: "Wikimedia Commons — Xiquinho Silva", reviewedAt: "2026-08-13" },
        { label: "CC BY 2.0 licence for the hero photograph", url: "https://creativecommons.org/licenses/by/2.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
