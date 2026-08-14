import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {schemaVersion:"1.0.0",blocks:[
  {id:"lead",type:"lead",text:"China's dramatic karst depressions are often grouped online under the word tiankeng—literally ‘heavenly pit’. Geologists use the term more narrowly than travel captions do. A scientifically identified tiankeng is not automatically a public attraction, and a place called ‘tiankeng’ by a tour operator is not automatically evidence of geological classification. Before planning a visit, check three things separately: the geological identity, the site's legal visitor status and a current managed route."},
  {id:"answer",type:"callout",title:"The short answer",body:"Visit only a formal scenic site or another place whose current local authority/operator publishes a lawful public route. Stay on platforms, stairs and marked paths. Never use coordinates, drone footage or an exploration post as permission to descend into a wild depression. If the scientific name, operator, entrance and current access cannot all be verified, treat the site as research context rather than a destination.",tone:"decision"},
  {id:"definition-heading",type:"heading",level:2,text:"Gate one: is it a tiankeng in the geological sense?"},
  {id:"definition",type:"paragraph",text:"Chinese geological sources and international cave science describe tiankeng as an exceptionally large, steep-sided karst negative landform with substantial depth and volume, normally connected to underground drainage and formed by dissolution and collapse processes. Published classification uses measurable morphology, not simply a spectacular hole. Definitions and thresholds have developed through research, so this guide avoids declaring any unnamed depression a tiankeng from photographs alone."},
  {id:"terms",type:"table",caption:"Related words are not interchangeable",columns:["Term","Useful meaning","Visitor implication"],rows:[
    ["Sinkhole / doline","A broad family of closed karst depressions covering many sizes and origins.","Most sinkholes are not tiankeng; scientific interest does not imply public access."],
    ["Tiankeng","A very large, deep and steep karst depression meeting specialist morphological context.","Use a geological survey, peer-reviewed source or authoritative geopark interpretation for the label."],
    ["Cave or underground river","Subsurface passages and drainage that may be connected to a tiankeng.","Separate cave routes, equipment and closures may apply; a viewpoint ticket does not authorize exploration."],
    ["Scenic-area name containing 天坑","A visitor/marketing name that may refer to a landscape complex.","Check which landform is interpreted and which route the ticket actually covers." ]
  ]},
  {id:"status-heading",type:"heading",level:2,text:"Gate two: what is the site's visitor status?"},
  {id:"status",type:"table",caption:"Four access classes",columns:["Class","Evidence required","What a traveller may do","Red flag"],rows:[
    ["Formal scenic site","Current government/operator page, named entrance, managed route and published safety rules.","Use the ticketed or public route under current conditions.","Old hours copied by a reseller after a closure or renovation."],
    ["Geopark or protected-area interpretation point","Current public boundary, entrance and trail notice from the managing authority.","Use only the named public trail or viewpoint.","Assuming the whole reserve or geopark is open because one centre is open."],
    ["Research/discovery site","Geological survey or paper confirms the landform, but no current public operator route exists.","Learn from sources; do not convert scientific coordinates into an itinerary.","Media footage of an expedition is presented as a hiking guide."],
    ["Unverified ‘wild tiankeng’","Social post, map label, local nickname or coordinate without authority/operator evidence.","Do not visit or publish directions.","Promises of ‘secret’, ‘free’, ‘no ticket’ or self-guided descent." ]
  ]},
  {id:"examples-heading",type:"heading",level:2,text:"Use examples to understand classes, not to collect pits"},
  {id:"examples",type:"comparison",title:"Two named sites with different visitor evidence",columns:[
    {heading:"Xiaozhai Tiankeng, Fengjie, Chongqing",items:["Verified status: A scientifically important named tiankeng with official planning and interpretation context; this review did not establish a current operated public route.","Planning lesson: Keep Xiaozhai as geology and planning context unless a named operator publishes a current public route.","Do not infer: A planning consultation proves that new visitor facilities or routes have opened."]},
    {heading:"Dashiwei Tiankeng Group Scenic Area, Leye, Guangxi",items:["Verified status: A formally rated 4A scenic area. Its exact entrance, open route and operating status still require a current operator recheck.","Planning lesson: Formal scenic-area status makes Dashiwei a stronger public-site candidate, but it does not freeze routes, hours or closures.","Do not infer: A 4A rating proves that every depression, stairway or cave route is open today."]}
  ]},
  {id:"choose-heading",type:"heading",level:2,text:"A five-question site-selection filter"},
  {id:"choose",type:"list",items:["Classification: which geological survey, peer-reviewed work or authoritative geopark explanation identifies the landform?","Operator: which named public authority or scenic operator manages the exact entrance today?","Route: does it publish a current platform, stairs, trail, shuttle or guided route rather than only destination promotion?","Conditions: what do current notices say about weather, maintenance, rockfall, flooding, fire or capacity controls?","Recovery: is there a useful surface-level or indoor alternative if cloud, rain, closure or mobility makes the main view impossible?" ]},
  {id:"effort-heading",type:"heading",level:2,text:"The rim, the descent and the cave are different physical tasks"},
  {id:"effort",type:"table",caption:"Match the route layer to the traveller",columns:["Route layer","Typical demand","Verification needed","Stop rule"],rows:[
    ["Authorized rim viewpoint","Shorter access but may include exposed platforms, steps and long transfers.","Step-free claim, barrier height, weather closure and actual distance from transport.","Skip exposed platforms in lightning, dangerous wind or operator closure."],
    ["Managed stair descent","Sustained ascent/descent, humidity and a hard return climb.","Step count/elevation, handrails, rest points, one-way rules and last admission.","Turn back at the first official return point if knees, heat or timing deteriorate."],
    ["Managed cave/underground route","Wet surface, darkness, temperature change and sometimes separate transport/equipment.","Separate ticket/route, current flooding closure, footwear and guide requirement.","Do not continue past a closure or leave the lit route."],
    ["Technical exploration","Rope, cave rescue and scientific/expedition competence.","Formal authorization, qualified team and rescue plan.","Outside the scope of independent tourism." ]
  ]},
  {id:"scenarios-heading",type:"heading",level:2,text:"Two travellers should choose differently"},
  {id:"scenarios",type:"comparison",title:"Match site, not reputation",columns:[
    {heading:"Geology-curious first visitor",items:["Priority: Clear interpretation plus one managed viewpoint that shows scale and morphology.","Plan: One formal site, enough time to read maps and compare rim/underground drainage.","Reject: A remote coordinate whose only value is rarity."]},
    {heading:"Parent travelling with an older adult",items:["Priority: Verified access, railings, rest, toilets and a surface-level recovery option.","Plan: Rim or visitor-centre layer first; descent only after checking stairs and return effort.","Reject: A route described merely as ‘easy’ without measurable access evidence."]}
  ]},
  {id:"ecology-heading",type:"heading",level:2,text:"A tiankeng is habitat, not an adventure set"},
  {id:"ecology",type:"list",items:["Deep depressions can hold distinctive humidity, light and temperature gradients and support specialized plant communities; UNESCO's overview emphasizes their ecological research value.","Stay behind railings and on managed paths so fragile soils, vegetation and cave entrances are not trampled.","Do not throw objects, use loud sound to test echoes, feed wildlife or remove rocks and plants.","Avoid geotagging an unprotected sensitive site; visibility can increase disturbance without creating rescue or management capacity.","Use toilets and waste facilities before long remote transfers and carry all waste out.","Photography does not justify leaning over barriers, climbing for scale or sending a drone into a depression."]},
  {id:"weather-heading",type:"heading",level:2,text:"Karst weather changes the route, not just the photograph"},
  {id:"weather",type:"paragraph",text:"Rain can increase slip, runoff, rockfall and underground-flood risk; fog can remove the scale view that justified a long transfer; heat and humidity amplify the return climb. These are conditional risks, not predictions for every site. Use the operator's same-day notice and local weather warning, then protect a cancellable plan. Never interpret ‘open’ as proof that every side trail or lower route is safe."},
  {id:"failure-heading",type:"heading",level:2,text:"If access or weather changes"},
  {id:"failure",type:"table",caption:"Keep the geology focus without forcing the route",columns:["Change","What to do","Useful result"],rows:[
    ["Fog hides the depression","Use the visitor centre, geological profile, scale model and rim vegetation; wait only within your transport margin.","Understand formation and habitat without inventing a view."],
    ["Lower route closes after rain","Remain on the explicitly open surface route or leave; do not follow footprints around a barrier.","See why drainage and collapse terrain require management."],
    ["Traveller cannot manage the stairs","Use a verified rim/centre layer or choose another formal karst site with documented access.","Geological interpretation without physical overreach."],
    ["No current operator information exists","Remove the destination and retain it only as reading/research context.","Accurate status is more useful than a risky coordinate." ]
  ]},
  {id:"verify-heading",type:"heading",level:2,text:"Final verification checklist"},
  {id:"verify",type:"list",items:["Scientific or authoritative basis for the tiankeng label","Exact current managing authority/operator and Chinese entrance","Current public route rather than a research coordinate","Opening, ticket/booking and last-entry information from the operator","Weather, maintenance, flood, rockfall and fire notices","Measurable stairs, elevation and accessibility—not ‘easy’","Return transport and an earlier surface-level exit","No wild descent, drone, barrier crossing or sensitive-site geotag"]},
  {id:"help",type:"callout",title:"Need one karst site that is both meaningful and manageable?",body:"Tell Homeground which region is already on your route, your mobility limits and whether geology, scale or photography matters most. A real planner can help choose a formal public site and recheck the current route instead of sending you to an unverified coordinate.",tone:"neutral"},
  {id:"links",type:"internal-links",title:"Plan nature access responsibly",items:[
    {label:"Choose public gateways in the Qilian Mountains",href:"/guides/qilian-mountains-public-gateways-and-access/",description:"Apply the same boundary discipline to a large protected landscape."},
    {label:"Understand China's climate regions",href:"/guides/china-climate-regions-for-trip-timing/",description:"Do not transfer one region's weather conclusion to every karst area."},
    {label:"Plan wheelchair-accessible routes in China",href:"/guides/wheelchair-accessible-china-route-planning/",description:"Replace vague accessibility labels with measurable route evidence."},
    {label:"Separate geology from the Ashima story at Shilin",href:"/guides/shilin-ashima-landscape-story/",description:"Read one managed karst landscape without turning a named rock or oral tradition into a geological explanation."}
  ]},
  {id:"sources",type:"sources",title:"Official and independent sources",items:[
    {label:"Hero image — Xiaozhai Tiankeng from the southern rim, November 2009; historical view only, not proof of an authorized or current route",url:"https://commons.wikimedia.org/wiki/File:Xiaozhaitiankeng.jpg",publisher:"Brookqi — PD-self; attribution only, no endorsement implied",reviewedAt:"2026-08-13"},
    {label:"Tiankeng geological survey reporting",url:"https://www.cgs.gov.cn/ywdt/dwdt/202205/t20220513_834899.html",publisher:"China Geological Survey",reviewedAt:"2026-08-13"},
    {label:"Tiankeng discovery and karst context",url:"https://www.cgs.gov.cn/ywdt/dwdt/201612/t20161209_827370.html",publisher:"China Geological Survey",reviewedAt:"2026-08-13"},
    {label:"China's heavenly pits: ecology and research",url:"https://www.unesco.org/en/articles/chinas-heavenly-pits-dive-unknown",publisher:"UNESCO",reviewedAt:"2026-08-13"},
    {label:"Dashiwei Tiankeng Group Scenic Area formal 4A classification",url:"https://wlt.gxzf.gov.cn/zfxxgk/wjzl/btjzcwj/t19719409.shtml",publisher:"Guangxi Department of Culture and Tourism",reviewedAt:"2026-08-13"},
    {label:"Tiankeng terminology in cave science",url:"https://bcra.org.uk/pub/candks.oldformat/v32_2.html",publisher:"British Cave Research Association",reviewedAt:"2026-08-13"}
  ]}
]} as const satisfies StructuredPageBody;

export default body;
