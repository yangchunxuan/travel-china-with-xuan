import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "This article follows a representative production chain for an aluminium-bodied Chinese high-speed EMU, not a universal recipe for every train. In that chain, large aluminium profiles become roof, sidewall and underframe structures; controlled welding and dimensional inspection create the carbody; bogies, traction, braking, control, doors, cables and interiors are integrated; then the train is commissioned and tested at component, vehicle, laboratory and track levels. Other platforms, materials and process orders can differ."},
  {id: "production-chain", type: "table", caption: "A representative aluminium-bodied train: from material to validation", columns: ["Stage", "Work", "What must be proved"], rows: [
    ["Profiles and panels", "Prepare and machine aluminium structural parts.", "Material identity and dimensions."],
    ["Carbody welding", "Join sidewalls, roof, underframe and ends with qualified processes.", "Geometry, weld quality and low distortion."],
    ["Shell completion", "Inspect seams, corrosion protection, interfaces and water paths.", "A sound, dimensionally controlled body."],
    ["System integration", "Install bogies, brakes, traction, electrical, control, doors and interior systems.", "Interfaces work as a complete vehicle."],
    ["Static commissioning", "Power, communicate and exercise systems while stationary.", "Functions and fault protection respond correctly."],
    ["Dynamic validation", "Run defined tests in laboratories, on test tracks and approved railway lines.", "Ride, braking, current collection, signalling and other acceptance results meet the applicable programme."]
  ]},
  {id: "aluminium", type: "heading", level: 2, text: "Why this representative carbody begins with large aluminium structures"},
  {id: "aluminium-copy", type: "paragraph", text: "For many aluminium-bodied high-speed vehicles, long aluminium-alloy extrusions allow large portions of a sidewall, roof or floor to be formed with fewer separate pieces while meeting the need for a light, stiff and repeatable structure. Friction-stir welding, arc welding and laser-related processes may be used in different joints and factories. The engineering problem is not simply making a seam: heat, clamping and weld order affect distortion, residual stress and final fit. This does not establish aluminium or one welding sequence as universal across every Chinese train platform."},
  {id: "quality-gates", type: "comparison", title: "Two kinds of quality gate", columns: [
    {heading: "The shell must be right", items: ["Measure length, width, diagonals and interface points.", "Inspect welds with the specified methods.", "Check sealing and structural requirements before access becomes difficult."]},
    {heading: "The systems must work together", items: ["Verify power and data networks, doors, brakes and alarms.", "Confirm bogie and carbody interfaces.", "Test normal commands, protective logic and defined fault cases."]}
  ]},
  {id: "test-pyramid", type: "heading", level: 2, text: "A test track is one layer, not the whole proof"},
  {id: "test-details", type: "paragraph", text: "China's national railway test centre combines laboratory and dedicated-track testing. A historical 2008 whole-train test specification illustrates the breadth of defined measurement, but it is not cited here as current 2026 acceptance law; the applicable current standards and project-specific acceptance plan must be confirmed for each platform. Public footage of one fast run therefore cannot establish that every subsystem, scenario or service condition has passed: acceptance is an evidence package, not a speed headline."},
  {id: "what-footage-means", type: "table", caption: "How to read common factory and test footage", columns: ["Image", "Likely stage", "Do not assume"], rows: [
    ["Bare silver shell", "Carbody manufacture or inspection.", "That traction or passenger systems are installed."],
    ["Completed car on temporary supports", "System installation or static commissioning.", "That it is accepted for railway operation."],
    ["Train running on a ring", "A defined dynamic test.", "That the recorded speed is its commercial service speed."],
    ["Prototype at an exhibition", "A physical research or engineering vehicle exists.", "That tickets or a passenger route exist."]
  ]},
  {id: "traveller-scenarios", type: "table", caption: "Four milestones that headlines often collapse into one", columns: ["Milestone", "What it establishes", "What it does not establish"], rows: [
    ["Carbody completed", "The principal structural shell has been made and inspected to that stage.", "A complete powered passenger vehicle."],
    ["Trainset rolls off the line", "The physical trainset has reached a factory milestone.", "Regulatory acceptance or a public start date."],
    ["Test run completed", "Defined measurements were collected under stated conditions.", "Every test has passed or the recorded speed will be used in service."],
    ["Commercial service begins", "A named operator runs a named route under an official timetable and ticket channel.", "That every research feature or maximum test speed is used on every trip."]
  ]},
  {id: "why-tests-repeat", type: "paragraph", text: "Testing repeats because a train is a coupled system. A door, brake controller or software change can affect interfaces elsewhere; a result found during dynamic testing can send the train back for adjustment and another defined run. Factory completion, engineering validation and approval or acceptance for passenger service are separate milestones rather than one ceremonial launch."},
  {id: "maglev-fact-check", type: "callout", title: "Myth check: 600 km/h maglev is not a bookable service", body: "Official material checked on 13 August 2026 describes research, engineering vehicles and a future demonstration sequence—not a named public route, timetable or ticket product. Do not confuse those programmes with the commercial Shanghai airport maglev.", tone: "warning"},
  {id: "limits", type: "callout", title: "Fact boundary", body: "This is a manufacturing and validation explainer, not a rider guide, factory-tour promise or claim that every Chinese train uses the same process. Plant access, supplier details, test plans and acceptance states are project-specific. Source review: 13 August 2026.", tone: "warning"},
  {id: "help", type: "callout", title: "Does a technology headline affect your journey?", body: "Send Homeground the report, publication date and the route you hope to travel. We can separate a component, prototype, test vehicle and commercial service before it changes an itinerary; only the named operator can confirm live trains and tickets.", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "Move from engineering to an actual journey", items: [
    {label: "China high-speed rail: first-trip guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Use the published passenger guide for tickets, stations and boarding."},
    {label: "Night train or daytime high-speed rail", href: "/guides/china-night-train-or-daytime-high-speed-rail/", description: "Compare the travel-day trade-off rather than vehicle technology."},
    {label: "Why high-speed stations can be far from the old city", href: "/guides/why-china-high-speed-stations-are-far-away/", description: "Understand the planning behind the station location."},
    { label: "Compare Qingdao’s rail-manufacturing story with its other industries", href: "/guides/qingdao-brands-built-an-industrial-city/", description: "Use the same evidence boundary for factories, corporate museums and public viewpoints; heritage display is not proof of current production." },
    { label: "Read Yangshan as an automated transport system", href: "/guides/yangshan-automated-port-explained/", description: "Compare planning, control, machine movement and human work with rail manufacturing while keeping access and operating claims site-specific." }
  ]},
  {id: "sources", type: "sources", title: "Primary and technical sources", items: [
    {label: "600 km/h maglev engineering and demonstration sequence", url: "https://www.ncsti.gov.cn/kjdt/kjrd/202603/t20260327_242172.html", publisher: "National Science and Technology Innovation Center", reviewedAt: "2026-08-13"},
    {label: "600 km/h maglev system roll-out", url: "https://crrcgc.cc/crrcgc/2024-09/24/article_2024092413441231508.html", publisher: "CRRC", reviewedAt: "2026-08-13"},
    {label: "Current commercial Shanghai airport maglev", url: "https://english.shanghai.gov.cn/en-Transportation/20240102/44f499a17b324b25996f2d58fcbf5f23.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Superconducting engineering prototype and commercialisation boundary", url: "https://jtj.wuhan.gov.cn/jtzx/zwdt/202507/t20250714_2619883.shtml", publisher: "Wuhan Transport Bureau", reviewedAt: "2026-08-13"},
    {label: "High-speed train manufacturing base and capabilities", url: "https://www.crrcgc.cc/sfgf/36_2205/36_2206/index.html", publisher: "CRRC", reviewedAt: "2026-08-13"},
    {label: "Historical whole-train test specification (2008)", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202204/t20220405_289315.shtml", publisher: "National Railway Administration", reviewedAt: "2026-08-13"},
    {label: "National Railway Test Center facilities", url: "https://www.rails.cn/channel.php?channelid=202&page=1", publisher: "China Academy of Railway Sciences", reviewedAt: "2026-08-13"},
    {label: "Aluminium-alloy carbody welding deformation study", url: "https://umt1998.tongji.edu.cn/article/doi/10.16037/j.1007-869x.2025.02.030", publisher: "Urban Mass Transit", reviewedAt: "2026-08-13"},
    {label: "Residual stress in high-speed train aluminium welds", url: "https://xnjdxb.swjtu.edu.cn/en/article/doi/10.3969/j.issn.0258-2724.2012.04.013", publisher: "Journal of Southwest Jiaotong University", reviewedAt: "2026-08-13"},
    {label: "Hero photograph: CRH6 rail vehicle body at CRRC Qingdao Sifang — N509FZ, 3 October 2019 (cropped)", url: "https://commons.wikimedia.org/wiki/File:Truck_transporting_CRH6_at_CRRC_Qingdao_Sifang_(20191003131702).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13"},
    {label: "CC BY-SA 4.0 licence for the cropped hero photograph", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};
export default body;
