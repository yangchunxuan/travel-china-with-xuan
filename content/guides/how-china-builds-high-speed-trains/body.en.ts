import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "A Chinese high-speed train is not assembled by placing a finished shell on wheels. Large aluminium profiles become roof, sidewall and underframe structures; controlled welding and dimensional inspection create the carbody; bogies, traction, braking, control, doors, cables and interiors are integrated; then the train is commissioned and tested at component, vehicle, laboratory and track levels. The exact sequence and test programme depend on the train platform and acceptance standard."},
  {id: "production-chain", type: "table", caption: "From material to accepted train", columns: ["Stage", "Work", "What must be proved"], rows: [
    ["Profiles and panels", "Prepare and machine aluminium structural parts.", "Material identity and dimensions."],
    ["Carbody welding", "Join sidewalls, roof, underframe and ends with qualified processes.", "Geometry, weld quality and low distortion."],
    ["Shell completion", "Inspect seams, corrosion protection, interfaces and water paths.", "A sound, dimensionally controlled body."],
    ["System integration", "Install bogies, brakes, traction, electrical, control, doors and interior systems.", "Interfaces work as a complete vehicle."],
    ["Static commissioning", "Power, communicate and exercise systems while stationary.", "Functions and fault protection respond correctly."],
    ["Dynamic validation", "Run defined tests in laboratories, on test tracks and approved railway lines.", "Ride, braking, current collection, signalling and other acceptance results meet the applicable programme."]
  ]},
  {id: "aluminium", type: "heading", level: 2, text: "Why the carbody begins with large aluminium structures"},
  {id: "aluminium-copy", type: "paragraph", text: "High-speed rolling stock needs a light, stiff and repeatable structure. Manufacturers use long aluminium-alloy extrusions so large portions of a sidewall, roof or floor can be formed with fewer separate pieces. Friction-stir welding, arc welding and laser-related processes may be used in different joints and factories. The engineering problem is not simply making a seam: heat, clamping and weld order affect distortion, residual stress and final fit."},
  {id: "quality-gates", type: "comparison", title: "Two kinds of quality gate", columns: [
    {heading: "The shell must be right", items: ["Measure length, width, diagonals and interface points.", "Inspect welds with the specified methods.", "Check sealing and structural requirements before access becomes difficult."]},
    {heading: "The systems must work together", items: ["Verify power and data networks, doors, brakes and alarms.", "Confirm bogie and carbody interfaces.", "Test normal commands, protective logic and defined fault cases."]}
  ]},
  {id: "test-pyramid", type: "heading", level: 2, text: "A test track is one layer, not the whole proof"},
  {id: "test-details", type: "paragraph", text: "China's National Railway Test Center combines laboratories with a 61.1-kilometre ring test line. Whole-train test specifications and project-specific acceptance plans define what must be measured. A test train can also run on an operating or dedicated railway under controlled authority. Public footage of one fast run therefore cannot establish that every subsystem, scenario or service condition has passed; acceptance is an evidence package, not a speed headline."},
  {id: "what-footage-means", type: "table", caption: "How to read common factory and test footage", columns: ["Image", "Likely stage", "Do not assume"], rows: [
    ["Bare silver shell", "Carbody manufacture or inspection.", "That traction or passenger systems are installed."],
    ["Completed car on temporary supports", "System installation or static commissioning.", "That it is accepted for railway operation."],
    ["Train running on a ring", "A defined dynamic test.", "That the recorded speed is its commercial service speed."],
    ["Prototype at an exhibition", "A physical research or engineering vehicle exists.", "That tickets or a passenger route exist."]
  ]},
  {id: "traveller-scenarios", type: "comparison", title: "Two traveller questions this process answers", columns: [
    {heading: "“Why does a new model take so long?”", body: "Manufacturing a shell is only one milestone. Integration, fault finding, repeated tests, documentation and regulatory acceptance remain before passenger service."},
    {heading: "“Does a 600 km/h report describe my next train?”", body: "No. A prototype roll-out or test result is not a ticketed service. Check the actual railway operator and timetable rather than converting a research speed into a travel promise."}
  ]},
  {id: "limits", type: "callout", title: "Fact boundary", body: "This is a manufacturing and validation explainer, not a rider guide, factory-tour promise or claim that every Chinese train uses the same process. Plant access, supplier details, test plans and acceptance states are project-specific. Source review: 13 August 2026.", tone: "warning"},
  {id: "internal-links", type: "internal-links", title: "Move from engineering to an actual journey", items: [
    {label: "China high-speed rail: first-trip guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Use the published passenger guide for tickets, stations and boarding."},
    {label: "Night train or daytime high-speed rail", href: "/guides/china-night-train-or-daytime-high-speed-rail/", description: "Compare the travel-day trade-off rather than vehicle technology."},
    {label: "Why high-speed stations can be far from the old city", href: "/guides/why-china-high-speed-stations-are-far-away/", description: "Understand the planning behind the station location."}
  ]},
  {id: "sources", type: "sources", title: "Primary and technical sources", items: [
    {label: "High-speed train manufacturing base and capabilities", url: "https://www.crrcgc.cc/sfgf/36_2205/36_2206/index.html", publisher: "CRRC", reviewedAt: "2026-08-13"},
    {label: "Whole-train test specification", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202204/t20220405_289315.shtml", publisher: "National Railway Administration", reviewedAt: "2026-08-13"},
    {label: "National Railway Test Center facilities", url: "https://www.rails.cn/channel.php?channelid=202&page=1", publisher: "China Academy of Railway Sciences", reviewedAt: "2026-08-13"},
    {label: "Aluminium-alloy carbody welding deformation study", url: "https://umt1998.tongji.edu.cn/article/doi/10.16037/j.1007-869x.2025.02.030", publisher: "Urban Mass Transit", reviewedAt: "2026-08-13"},
    {label: "Residual stress in high-speed train aluminium welds", url: "https://xnjdxb.swjtu.edu.cn/en/article/doi/10.3969/j.issn.0258-2724.2012.04.013", publisher: "Journal of Southwest Jiaotong University", reviewedAt: "2026-08-13"}
  ]}
]};
export default body;
