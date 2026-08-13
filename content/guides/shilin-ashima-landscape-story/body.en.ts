import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "At Ashima Rock in the Minor Stone Forest, one pillar invites two questions. Geology asks how carbonate rock was fractured and dissolved into the form you see. Sani Yi oral tradition, edited texts, a 1964 film and scenic-area naming explain why people see Ashima in it. Neither reading cancels the other, but they are not interchangeable: legend does not explain karst, and a human-looking outline does not prove Ashima was a documented historical person. Begin among the denser formations of the Major Stone Forest to read the rock, then use the Minor Stone Forest to test how viewpoint, story and naming make a cultural landmark.",
    },
    {
      id: "evidence-layers-heading",
      type: "heading",
      level: 2,
      text: "Before looking for Ashima, separate four kinds of evidence",
    },
    {
      id: "evidence-layers",
      type: "table",
      caption: "Four layers that should not be collapsed into one",
      columns: ["Layer", "What it can establish", "What it cannot establish"],
      rows: [
        [
          "Geology and material evidence",
          "The material, fractures, dissolution and physical development of the pillars.",
          "It cannot identify a pillar as a person or confirm a story.",
        ],
        [
          "Living oral tradition",
          "Ashima belongs to a Sani Yi narrative tradition told, recited and sung in multiple versions.",
          "It is not a civil record proving one identifiable historical woman.",
        ],
        [
          "Edited literature and film",
          "Editors and filmmakers made choices that carried Ashima far beyond Shilin.",
          "One printed or filmed plot cannot stand for every oral version.",
        ],
        [
          "Tourism presentation",
          "Names, signs, sculptures and displays show how Ashima is presented now.",
          "A modern label or show is not evidence for geology or unchanged practice.",
        ],
      ],
    },
    {
      id: "two-readings",
      type: "callout",
      title: "Keep both readings, but do not use one as proof for the other",
      body:
        "The pillar is physically real, and the cultural association is also real as a history of storytelling and recognition. The error is to say either that the legend formed the karst or that the rock's resemblance proves the legend happened literally. Homeground's planning judgment is that visitors understand the site better when they carry both questions and keep the answers separate.",
      tone: "decision",
    },
    {
      id: "geology-heading",
      type: "heading",
      level: 2,
      text: "What shaped Stone Forest—and what did not?",
    },
    {
      id: "geology-explanation",
      type: "paragraph",
      text:
        "The useful sequence is material, structure and water. UNESCO describes carbonate rocks deposited in a shallow-marine environment, then affected by uplift and fracturing. Water worked along joints, dissolving rock and enlarging separations through a long, multi-stage history. This produced pillars, grooves, fissures and gaps. It does not give the individual Ashima silhouette one birthday or exact rock history. “A girl became stone” belongs to narrative, not physical explanation.",
    },
    {
      id: "geology-onsite",
      type: "paragraph",
      text:
        "In the Major Stone Forest, do not chase named shapes immediately. Look for repeated features: vertical joints dividing a mass, deepened channels, horizontal bedding and gaps that change the apparent scale of neighboring pillars. Move from one wide view to a public-path close view. Repeated structure across several rocks is stronger evidence of process than resemblance to a person or animal.",
    },
    {
      id: "geology-observation",
      type: "list",
      items: [
        "Compare a dense cluster with an isolated pillar. Ask what dissolved or what separation widened.",
        "Study edges, grooves and fissures from the path; texture can explain dissolution better than a silhouette.",
        "If a current geology panel is available, check its evidence, then return to the rock. A designation sign identifies a place; it does not explain formation.",
      ],
    },
    {
      id: "major-stone-forest-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/major-stone-forest-karst-1400.webp",
      alt: "Limestone pinnacles, trees and a public path at Shilin Stone Forest.",
      width: 1400,
      height: 1050,
      caption:
        "This wider Shilin view helps compare spacing, pinnacles and public-route scale; it does not show that a story created the rock.",
    },
    {
      id: "unesco-boundary-warning",
      type: "callout",
      title: "Do not enlarge a UNESCO label",
      body:
        "Shilin UNESCO Global Geopark provides the broad geological framework. The South China Karst World Heritage property is a separate serial property with mapped components at Naigu Stone Forest and Suyishan/Suogeyi in Shilin. Do not assume that every named rock—or Ashima Rock specifically—is itself an individually listed World Heritage component.",
      tone: "warning",
    },
    {
      id: "geopark-sign-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/geopark-designation-sign-1400.webp",
      alt: "A national geopark and national scenic-area designation sign at Shilin Stone Forest.",
      width: 1400,
      height: 1053,
      caption:
        "This designation sign is not a formation-process panel. Read each official emblem for the status it actually names.",
    },
    {
      id: "oral-tradition-heading",
      type: "heading",
      level: 2,
      text: "Who is Ashima if she was not a documented historical person?",
    },
    {
      id: "oral-tradition-explanation",
      type: "paragraph",
      text:
        "The national intangible-cultural-heritage record identifies Ashima as a narrative tradition of the Sani, a branch of the Yi people associated with Shilin. It was created in the Sani language and has been transmitted through spoken and sung performance. Familiar tellings place a young woman called Ashima in conflict with coercive marriage and powerful opponents; separation, attempted rescue, loss and transformation or echo can organize the story. That outline is a doorway, not a single authorized script. Character relationships, episodes, endings and performance contexts can vary.",
    },
    {
      id: "oral-tradition-meaning",
      type: "paragraph",
      text:
        "Oral tradition is not a defective book waiting for one final text. Teller, community, language, occasion and audience can shape emphasis. Researchers also describe interaction between oral telling and bimo manuscripts before modern editing. Heritage recognition concerns a continuing tradition; it does not turn one plot into an eyewitness biography or prove a precise duration of Sani settlement.",
    },
    {
      id: "oral-tradition-caution",
      type: "callout",
      title: "Use “a version,” not “the original story”",
      body:
        "If a sign, guide or display gives one plot, treat it as the version being presented there. It may be useful and carefully documented without cancelling other tellings. Ask who produced the interpretation, which medium it summarizes and whether it acknowledges variation.",
      tone: "neutral",
    },
    {
      id: "ashima-script-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/ashima-sani-script-1400.webp",
      alt: "The name Ashima written in Sani Yi script.",
      width: 1400,
      height: 438,
      caption:
        "The Sani Yi name points to a transmission history beyond the best-known Chinese plot and film image.",
    },
    {
      id: "ashima-manuscript-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/ashima-manuscript-display-1050.webp",
      alt: "A Yi-script manuscript labelled “Story of Ashima” and “Shilin County” in the Yunnan Nationalities Museum in Kunming.",
      width: 1050,
      height: 1400,
      caption:
        "The 2011 display label identifies the left manuscript as a Yi-script “Story of Ashima” from Shilin County. It documents a written-transmission and museum-presentation layer, not an original or single authoritative version, and it does not establish that the object remains on view today. Photo: Daderot / Wikimedia Commons, public domain; resized and converted to WebP.",
    },
    {
      id: "adaptation-heading",
      type: "heading",
      level: 2,
      text: "Why can the printed poem and the film tell different stories?",
    },
    {
      id: "adaptation-explanation",
      type: "paragraph",
      text:
        "Chinese-language collection and edited publication began in the early 1950s. Print widened circulation, but selection, ordering, translation and editing were interventions—not a recording of every local variant. The 1964 film adapted again. The Hong Kong Film Archive notes a major change: Ahei, Ashima's brother in the edited source it discusses, became her screen lover. Scholarship also shows different endings among representative oral, edited and film forms.",
    },
    {
      id: "adaptation-meaning",
      type: "paragraph",
      text:
        "The film still mattered: it introduced Ashima widely and strengthened her association with Yunnan's landscape. Influence, however, is not historical priority. At Shilin, label a remembered romance, costume or transformation as film or later presentation when that is its source; do not project it backwards as the single Sani account. A film still is neither needed nor cleared for this guide.",
    },
    {
      id: "adaptation-test",
      type: "comparison",
      title: "Two quick tests for a label or display",
      columns: [
        {
          heading: "When it describes oral tradition",
          body:
            "Ask whose version or performance context is being summarized, which language or textual form it uses, and whether the wording acknowledges variation.",
        },
        {
          heading: "When it describes the film",
          body:
            "Treat the romance, costume, song arrangement, setting and ending as cinematic choices unless another source independently supports that detail for a particular Sani version.",
        },
      ],
    },
    {
      id: "ashima-rock-heading",
      type: "heading",
      level: 2,
      text: "How should you look at Ashima Rock?",
    },
    {
      id: "ashima-rock-explanation",
      type: "paragraph",
      text:
        "The scenic-area institution places Ashima Rock in the Minor Stone Forest. It is a natural formation, not a carved statue. Recognition depends on a favorable public viewing angle: from one position, the upper outline can suggest a human profile, headdress, posture and a load on the back; from another, it returns to an irregular pillar among other rock. That change is not a failure of the attraction. It exposes the mechanism by which geology, viewpoint, a supplied name and a story already present in the viewer's mind create recognition together.",
    },
    {
      id: "ashima-looking-method",
      type: "list",
      ordered: true,
      items: [
        "From the permitted path, first see the whole pillar with neighboring rock, vegetation and open space.",
        "Compare two safe viewpoints and find where the human-like outline becomes clearest.",
        "Separate what is visible from what the name supplies. “Profile,” “shoulder” or “posture” may be observations; “this is Ashima” is the cultural identification.",
        "Check whether a current label gives geology, story, adaptation or only a scenic name.",
        "Take one contextual photograph before a tight crop so the formation is not mistaken for a carved monument.",
      ],
    },
    {
      id: "ashima-rock-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/ashima-rock-portrait-1200.webp",
      alt: "Ashima Rock and surrounding pinnacles seen from a favorable public viewing angle in the Minor Stone Forest.",
      width: 803,
      height: 1200,
      caption:
        "A favorable angle makes the resemblance legible; it does not make the pillar carved or the narrative geological.",
    },
    {
      id: "viewing-angle-warning",
      type: "callout",
      title: "A favorable angle is not necessarily a marked angle",
      body:
        "An official archive says visitors were shown the formation from one angle, but that does not prove a current sign marks the exact photo position. Follow the present route and barriers. A caption or alt text should say “seen from a favorable public viewing angle,” not “from the marked viewing angle.”",
      tone: "warning",
    },
    {
      id: "field-route-heading",
      type: "heading",
      level: 2,
      text: "A field-reading sequence from the Major to the Minor Stone Forest",
    },
    {
      id: "field-route-intro",
      type: "paragraph",
      text:
        "This is a sequence for understanding, not an entrance map. Follow current routing, closures and staff directions even if they change the order or keep you from a planned observation. The goal is to arrive at Ashima Rock with physical evidence in mind, rather than beginning with a silhouette and turning every formation into a character. For most visitors, the exercise works without adding a museum, performance or long lecture.",
    },
    {
      id: "field-route",
      type: "list",
      ordered: true,
      items: [
        "In one Major Stone Forest cluster, study joints, grooves, gaps and scale before reading a scenic name. Restate the process: carbonate rock, fracture, water, dissolution, separation.",
        "Use a geology panel if available. Separate formation explanation from direction or designation; photograph and translate only where current rules permit.",
        "Test one named formation other than Ashima from two angles. Make the naming process visible before meeting the familiar story.",
        "In the Minor Stone Forest, compare spacing, background and sightline with the denser area rather than declaring one simply more beautiful.",
        "At Ashima Rock, use the viewing method above and give the wider geology as much attention as the profile.",
        "In any verified-open cultural display, check whether oral tradition, edited text, film and tourism are separated. Record mixed wording; do not convert it into history.",
      ],
    },
    {
      id: "route-limit",
      type: "callout",
      title: "The route must still work with no exhibition or performance",
      body:
        "Official sources mention an Ashima display in a Geopark Museum and a separate display in a county-town tourism service centre, but current pages do not cross-identify the venues or confirm addresses, hours and access. Do not build the day around either. Rock, viewpoint and careful label-reading carry the essential task.",
      tone: "warning",
    },
    {
      id: "sani-embroidery-figure",
      type: "figure",
      src: "/images/guides/shilin-ashima-landscape-story/shilin-sani-embroidery-1400.webp",
      alt: "A close view of a Sani embroidery textile photographed in Shilin County.",
      width: 1400,
      height: 1053,
      caption:
        "This documented Shilin Sani embroidery cannot stand for every maker, period or use, or prove an episode in the narrative.",
    },
    {
      id: "traveler-choice-heading",
      type: "heading",
      level: 2,
      text: "Who should spend extra time on the story—and who can keep it brief?",
    },
    {
      id: "traveler-choice",
      type: "comparison",
      columns: [
        {
          heading: "You came mainly for geology",
          body:
            "Give the Major Stone Forest priority, then use Ashima Rock as a final test of how people name landforms. You do not need a performance or a long plot summary to understand the cultural layer.",
        },
        {
          heading: "You know the film or follow oral traditions",
          body:
            "Reserve more attention for wording on labels and displays. Ask whether each detail belongs to a Sani telling, a twentieth-century edited text, the 1964 film or current scenic presentation.",
        },
        {
          heading: "Your time, energy or mobility is limited",
          body:
            "Choose one geological comparison and the Ashima viewpoint rather than collecting every named formation. Confirm the current accessible route with the operator; this article does not promise a step-free path.",
        },
      ],
    },
    {
      id: "traveler-scenarios",
      type: "paragraph",
      text:
        "A family can turn face-finding into a useful game: name what an outline suggests, then find a crack or groove needing geological explanation. A film-aware visitor can note one remembered relationship or ending, then check whether onsite wording calls it film, edited text or oral tradition. Quick-photo visitors may keep this brief; anyone expecting a verified biography or guaranteed show should reset that expectation.",
    },
    {
      id: "misunderstanding-heading",
      type: "heading",
      level: 2,
      text: "What should you not assume, stage or photograph?",
    },
    {
      id: "misunderstandings",
      type: "list",
      items: [
        "Do not present Ashima as independently proved history; call her a figure in Sani Yi oral tradition.",
        "Do not use flood or transformation episodes to explain karst.",
        "Do not make one printed or filmed relationship the only oral version.",
        "Do not make costume, souvenir, sculpture or visitor show a complete record of Sani life.",
        "Do not climb, touch rock or leave the route for a photograph. Follow current notices.",
        "Do not assume a public show permits portraits or recording. Obtain consent and respect restricted contexts.",
      ],
    },
    {
      id: "respect-callout",
      type: "callout",
      title: "Interpretation is not permission",
      body:
        "Learning that Ashima is living cultural heritage does not make community members, performers or cultural objects freely available as photographic props. Prefer landscape, signs and authorized displays when personal consent or publication rights are unclear. Do not ask someone to stage a ritual or pose as “Ashima” for an explanatory photograph.",
      tone: "warning",
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "What if the exhibition, performance or viewpoint fails?",
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "Keep the interpretive task intact when conditions change",
      columns: ["Problem", "Recovery"],
      rows: [
        [
          "A named exhibition space is closed or cannot be identified with confidence.",
          "Do not substitute a similarly named hall. Concentrate on rock, label language and viewpoint.",
        ],
        [
          "There is no performance.",
          "Nothing essential has failed. Compare the heritage record with scenic naming and modern presentation.",
        ],
        [
          "The favorable viewpoint is crowded.",
          "Wait outside the narrow flow, or test angle and naming on another formation. Return only if routing permits.",
        ],
        [
          "Rain, mist or flat light weakens the silhouette.",
          "Inspect fissures, grooves and neighboring rock. Do not leave the path for a clearer outline.",
        ],
        [
          "A route or area is temporarily closed.",
          "Follow the official alternative. Success means preserving evidence layers, not reaching every stop.",
        ],
      ],
    },
    {
      id: "final-checklist",
      type: "list",
      items: [
        "Can I explain the pillars without using the legend as geology?",
        "Can I describe Ashima without claiming a proven historical biography?",
        "Do I know whether a detail came from oral tradition, edited literature, film or tourism presentation?",
        "Did I compare more than one safe viewing angle and retain the rock's wider context?",
        "Have I checked current routes, optional displays and onsite rules with the operator rather than relying on this evergreen interpretation guide?",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the Yunnan and landscape planning",
      items: [
        {
          label: "Place Kunming and Shilin within a wider Yunnan route",
          href: "/guides/kunming-dali-lijiang-shangri-la-route-order/",
          description:
            "Decide where this cultural stop belongs without turning the present guide into station-to-gate transport advice.",
        },
        {
          label: "Compare another kind of Chinese karst landform",
          href: "/guides/china-tiankeng-sinkholes-explained/",
          description:
            "Learn a separate evidence vocabulary for tiankeng without treating a giant sinkhole and Shilin's pinnacles as the same formation.",
        },
        {
          label: "Read another Yunnan landscape without losing living culture",
          href: "/guides/yuanyang-rice-terraces-viewpoint-and-village-route/",
          description:
            "Use the Yuanyang guide to balance viewpoint choice, agricultural heritage and respect for residents rather than treating people as scenery.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official, heritage, academic and image sources reviewed on 13–14 August 2026",
      items: [
        {
          label: "Shilin UNESCO Global Geopark — geology and current institutional description",
          url: "https://www.unesco.org/en/iggp/shilin-unesco-global-geopark",
          publisher: "UNESCO",
          reviewedAt: "2026-08-13",
        },
        {
          label: "South China Karst — serial World Heritage property and mapped components",
          url: "https://whc.unesco.org/en/list/1248",
          publisher: "UNESCO World Heritage Centre",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Ashima — national intangible cultural heritage project record",
          url: "https://www.ihchina.cn/project_details/12241.html",
          publisher: "China Intangible Cultural Heritage Network / China Intangible Cultural Heritage Museum",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Transmission and textual forms of Ashima",
          url: "https://www.cssn.cn/wx/wx_mzwx/202208/t20220802_5443066.shtml",
          publisher: "Chinese Social Sciences Net",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Performance context and variation in the Ashima tradition",
          url: "https://chinafolklore.org/web/?NewsID=4176",
          publisher: "China Folklore Society",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Comparing oral, edited and film versions of Ashima",
          url: "https://xb.ynau.edu.cn/jwk_sk/cn/article/pdf/preview/10.3969/j.issn.1004-390X%28s%29.2018.01.018.pdf",
          publisher: "Journal of Yunnan Agricultural University (Social Science)",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Ashima (1964) — film-archive adaptation note",
          url: "https://www.filmarchive.gov.hk/en/web/hkfa/2025/sh/pe-event-2025-sh-fs-film01.html",
          publisher: "Hong Kong Film Archive",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Major and Minor Stone Forest — current visitor-facing landscape description",
          url: "https://shilingeopark.com/public/park/en-US/detail-447-28203.html",
          publisher: "Shilin UNESCO Global Geopark",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Ashima Rock — official location in the Minor Stone Forest",
          url: "https://park.shilin.com.cn/public/park/zh-CHS/detail-428-538.html",
          publisher: "Shilin scenic-area institution",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Ashima Rock hero: LHOON, CC BY-SA 2.0; cropped and converted to WebP",
          url: "https://commons.wikimedia.org/wiki/File:Ashima_rock_2.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Yi-script Story of Ashima display: Daderot, public domain; resized and converted to WebP",
          url: "https://commons.wikimedia.org/wiki/File:Manuscripts_in_the_Yunnan_Nationalities_Museum_-_DSC03920.JPG",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-14",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
