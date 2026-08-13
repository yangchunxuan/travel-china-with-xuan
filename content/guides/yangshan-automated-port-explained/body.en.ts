import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Yangshan Phase IV is useful to understand not because machines have replaced an entire port, but because it makes coordination visible. A container is handed between a vessel, a quay crane, a vehicle, a yard crane and eventually another transport link. Software plans and dispatches those handoffs; people supervise the system and step in when the plan meets weather, damaged equipment or an unusual box. Follow that chain and the word “automated” becomes specific rather than magical."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "What does “automated port” mean at Yangshan?",
      body: "At Yangshan Phase IV, automated and remotely controlled equipment performs much of the repetitive container movement inside a controlled terminal. A terminal operating system (TOS) organizes the work; an equipment control system (ECS) turns plans into coordinated equipment tasks; cranes and automated guided vehicles execute movements; human planners, remote operators, safety staff, technicians and exception handlers remain part of the operation. It is an automated terminal, not a workerless port and not an AI system making every decision on its own.",
      tone: "decision"
    },
    {
      id: "scope-heading",
      type: "heading",
      level: 2,
      text: "First, locate the system you are reading"
    },
    {
      id: "scope",
      type: "paragraph",
      text: "Phase IV sits at the western end of the Yangshan Deep-Water Port area, south of the Donghai Bridge, and is operated by Shanghai International Port Group’s Shangdong branch. The operator records trial operation from 10 December 2017, seven berths, a 2,350-metre quay and a currently published design capacity of 6.3 million TEU a year. Those figures describe this terminal, not the whole Yangshan complex or the whole Port of Shanghai. Later throughput records and equipment counts are dated operating snapshots, not permanent design facts."
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "The container chain: five handoffs, not one robot"
    },
    {
      id: "chain-table",
      type: "table",
      caption: "A simplified vessel-to-yard movement at Yangshan Phase IV",
      columns: ["Stage", "What physically happens", "What must be coordinated"],
      rows: [
        ["1. Vessel plan", "A box has a known position aboard and a planned destination ashore", "Berth, crane sequence, weight and stow constraints"],
        ["2. Quayside lift", "A double-trolley quay crane transfers the box through the ship-to-shore handoff", "Crane position, safe transfer and the receiving vehicle"],
        ["3. Horizontal move", "An automated guided vehicle (AGV) carries the box on the terminal’s closed transport network", "Route, intersections, conflicts, battery state and arrival timing"],
        ["4. Yard handoff", "An automated rail-mounted gantry crane receives and stacks the box", "Yard slot, stack order, retrieval sequence and equipment availability"],
        ["5. Next leg", "The box later leaves by a landside or another vessel connection, depending on its journey", "Release status, gate or vessel schedule, and the reverse retrieval chain"]
      ]
    },
    {
      id: "inbound-heading",
      type: "heading",
      level: 2,
      text: "Inbound: from ship to a usable yard position"
    },
    {
      id: "inbound",
      type: "list",
      ordered: true,
      items: [
        "The vessel and terminal exchange operational information before discharge. The TOS uses the berth and vessel plan to sequence work rather than treating every box as interchangeable.",
        "The quay crane lifts the assigned container. “Remote controlled” and “automatic” are not identical: some cycles can be automated while a remote operator handles a difficult alignment or exception.",
        "The AGV receives a transport task inside the terminal. It is specialized port equipment on a controlled network, not a driverless truck licensed to roam Shanghai’s public roads.",
        "The ECS coordinates the AGV arrival with the yard crane so one machine does not wait unnecessarily for the other. A route may change when traffic, equipment state or a conflict changes.",
        "The yard crane places the box in a planned slot. The nearest empty space is not always best: later retrieval order, box attributes and future workloads shape the choice."
      ]
    },
    {
      id: "outbound-heading",
      type: "heading",
      level: 2,
      text: "Outbound and transshipment: the chain runs in reverse, but not always to the gate"
    },
    {
      id: "outbound",
      type: "paragraph",
      text: "For an export box, planning begins before the yard crane retrieves it. The box must reach the quay in the right sequence for the vessel’s stow plan, so an early move can be as disruptive as a late one. A transshipment container may move from one vessel call to another without a normal local-delivery journey. An import container bound inland follows a different release and landside handoff. This is why “a container passes through Yangshan” does not describe one universal route or dwell time."
    },
    {
      id: "tos-ecs-heading",
      type: "heading",
      level: 2,
      text: "TOS, ECS and equipment do different jobs"
    },
    {
      id: "tos-ecs",
      type: "comparison",
      title: "Plan, coordinate, execute",
      columns: [
        {
          heading: "TOS: decide the work",
          items: [
            "Maintains business and container-task information",
            "Builds vessel, berth, yard and production plans",
            "Assigns priorities and sends work instructions downstream",
            "Replans when the operational picture changes"
          ]
        },
        {
          heading: "ECS: orchestrate the machines",
          items: [
            "Breaks work into executable equipment tasks",
            "Coordinates quayside, horizontal, yard and gate interfaces",
            "Manages AGV routes, conflicts, queues and charging constraints",
            "Reports equipment state, alarms and exceptions"
          ]
        },
        {
          heading: "Equipment: move the box",
          items: [
            "Quay cranes perform vessel-side transfers",
            "AGVs perform horizontal transport",
            "Rail-mounted yard cranes stack and retrieve",
            "Sensors and controls verify position and operating state"
          ]
        }
      ]
    },
    {
      id: "human-heading",
      type: "heading",
      level: 2,
      text: "Where people remain in the loop"
    },
    {
      id: "human-table",
      type: "table",
      caption: "Automation shifts human work rather than deleting it",
      columns: ["Human role", "Normal contribution", "When intervention matters"],
      rows: [
        ["Planners and controllers", "Set rules, review vessel and yard plans, watch flow", "Late vessel, changed workload or a plan that no longer fits"],
        ["Remote crane operators", "Supervise and remotely control designated crane work", "Difficult landing, obstruction, poor visibility or abnormal alignment"],
        ["Equipment and safety controllers", "Monitor status, traffic, alarms and controlled-area safety", "Stopped vehicle, blocked route or safety alarm"],
        ["Maintenance teams", "Inspect, repair and return machinery or systems to service", "Sensor, communications, mechanical or power fault"],
        ["Operational exception staff", "Resolve container, instruction and handoff mismatches", "Damaged box, unreadable data or task conflict"]
      ]
    },
    {
      id: "not-workerless",
      type: "callout",
      title: "A useful correction: automation is conditional",
      body: "China’s official technical standard for automated container terminals explicitly includes monitoring, alarms, fault handling and manual or remote intervention. The system is designed to carry out routine work consistently and to expose abnormal states—not to pretend abnormalities never occur. A photograph with no workers in frame therefore does not prove that nobody is operating, supervising or maintaining the terminal.",
      tone: "neutral"
    },
    {
      id: "conditions-heading",
      type: "heading",
      level: 2,
      text: "Conditions that can change the “automatic” path"
    },
    {
      id: "conditions-table",
      type: "table",
      caption: "Why the same container chain can produce a different plan",
      columns: ["Changing condition", "System response", "Possible human response"],
      rows: [
        ["Wind, visibility or other operating limits", "Slow, pause or resequence affected work", "Confirm safe limits and authorize recovery"],
        ["Vessel arrival or stow-plan change", "Recalculate crane and vehicle tasks", "Approve priorities and coordinate with the vessel"],
        ["AGV battery or route conflict", "Assign charging, another route or another vehicle", "Investigate recurring fault or isolate an unsafe area"],
        ["Crane or communications alarm", "Stop or divert dependent tasks", "Remote control, repair or controlled restart"],
        ["Container-data mismatch or physical exception", "Hold the task and flag it", "Verify identity, condition and correct instruction"]
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two containers show two different systems"
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Follow the next leg before judging performance",
      columns: [
        {
          heading: "A transshipment box",
          body: "It is discharged, stored for a connecting vessel and later retrieved in that vessel’s loading order. The yard position balances current discharge efficiency against the future connection. Its story is ship–yard–ship; a public-road truck may never be involved."
        },
        {
          heading: "An import box with an exception",
          body: "It moves toward a yard position, but a data mismatch or equipment alarm stops the task. Software holds or reallocates dependent moves; staff verify the box or fault; equipment resumes only after a controlled resolution. Recovery is part of the system, not evidence that automation was fictitious."
        }
      ]
    },
    {
      id: "access-heading",
      type: "heading",
      level: 2,
      text: "Can travellers visit Yangshan Phase IV?"
    },
    {
      id: "access",
      type: "callout",
      title: "Do not arrive expecting walk-in admission",
      body: "As of 13 August 2026, we found no current official public ticket, reservation or walk-in page for Phase IV. It is an operating, access-controlled international port. Officially organized and invited delegations do sometimes visit, but that is not evidence of general tourist access. Treat only current confirmation from the operator or an official organizer as permission; a viewpoint, bridge crossing, exhibition or photograph does not grant terminal-yard entry.",
      tone: "warning"
    },
    {
      id: "access-list",
      type: "list",
      items: [
        "Do not rely on old tourism pages, reposted opening hours or a travel agency’s historic itinerary without current operator confirmation.",
        "Do not approach working gates, follow staff vehicles, stop on restricted roads or cross barriers to obtain a closer view.",
        "Do not fly a drone or publish access details, staff credentials, live control screens or security-sensitive layouts.",
        "If an organizer offers a visit, ask in writing who authorizes access, what identification is required, where photography is permitted and whether the visit can be cancelled for operations or security."
      ]
    },
    {
      id: "learning-heading",
      type: "heading",
      level: 2,
      text: "If access is unavailable, you can still learn the system"
    },
    {
      id: "learning",
      type: "list",
      ordered: true,
      items: [
        "Start with the operator’s Phase IV overview and the Ministry of Transport’s automated-terminal standard. Draw the five handoffs and label TOS, ECS, equipment and human responsibility separately.",
        "Use an exact, dated Phase IV photograph or official video to identify quay cranes, horizontal vehicles and yard blocks. Do not substitute a generic Yangshan view and call it Phase IV.",
        "Compare the official operating description with academic work on AGV scheduling, buffers and charging. A model explains a decision problem; its experimental assumptions are not proof of the live terminal’s current settings.",
        "Check current official exhibitions or organized public programs in Shanghai before travel. If none is confirmed, choose a legal public learning venue or online material rather than improvising access around a working port."
      ]
    },
    {
      id: "reading-heading",
      type: "heading",
      level: 2,
      text: "How to read the hero image honestly"
    },
    {
      id: "reading",
      type: "paragraph",
      text: "A useful image should be verified as Phase IV and show at least two parts of the chain: for example, quayside cranes and the horizontal-transport area, or AGVs and yard cranes. Its caption should name the date and source. It should not claim “zero humans,” infer live operating status from a still frame or reveal a detailed security layout. Until a real image with documented reuse rights is secured, the abstract process diagram supplied with this draft is only an editorial fallback, not documentary evidence."
    },
    {
      id: "dynamic-check",
      type: "callout",
      title: "Date every scale claim",
      body: "The operator reported that Phase IV handled more than 8 million TEU in 2025 and described 155 AGVs in an August 2025 article. Those are useful dated snapshots, not timeless specifications. Before publication or reuse, recheck capacity, throughput, fleet counts, operating rules, public programs and image rights. Core and dynamic facts on this page were reviewed on 13 August 2026.",
      tone: "neutral"
    },
    {
      id: "links",
      type: "internal-links",
      title: "Plan the Shanghai context around the port story",
      items: [
        {
          label: "Browse contemporary culture and industry stories",
          href: "/culture/",
          description: "Place Yangshan within Homeground’s wider coverage of contemporary China."
        },
        {
          label: "Choose between Pudong and Hongqiao airports",
          href: "/guides/shanghai-pudong-or-hongqiao-airport/",
          description: "Make the practical airport decision separately from any port-learning plan."
        },
        {
          label: "Order Shanghai, Suzhou, Hangzhou and Nanjing",
          href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/",
          description: "Build a regional route without assuming terminal access."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and academic sources checked on 13 August 2026",
      items: [
        {
          label: "Company and Yangshan Phase IV overview",
          url: "https://shangdong.portshanghai.com.cn/gsjjOurCompany/index.jhtml",
          publisher: "Shanghai International Port Group Shangdong Branch",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Automated container-terminal design code announcement",
          url: "https://xxgk.mot.gov.cn/jigou/syj/202106/t20210630_3610854.html",
          publisher: "Ministry of Transport of the People’s Republic of China",
          reviewedAt: "2026-08-13"
        },
        {
          label: "JTS/T 199—2021 Design Code for Automated Container Terminal",
          url: "https://big5.mot.gov.cn/gate/big5/mwtis.mot.gov.cn/sygcjsgl/adjunct/downloadAll?fileId=d8c59cad60c74b6cacaef0851c59b692",
          publisher: "Ministry of Transport of the People’s Republic of China",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Yangshan Phase IV automation-system briefing",
          url: "https://www.shanghai.gov.cn/nw9820/20200906/0001-9820_1160523.html",
          publisher: "Shanghai Municipal People’s Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Yangshan port-area management rules effective in 2026",
          url: "https://jtw.sh.gov.cn/2025ngfxwj/20251231/8406248818ab4ddb86b9527379a02a7e.html",
          publisher: "Shanghai Municipal Transportation Commission",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Phase IV passes 8 million TEU in 2025",
          url: "https://shangdong.portshanghai.com.cn/xwtg/5109.jhtml",
          publisher: "Shanghai International Port Group Shangdong Branch",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Phase IV AGV fleet operating snapshot, August 2025",
          url: "https://shangdong.portshanghai.com.cn/xwtg/4807.jhtml",
          publisher: "Shanghai International Port Group Shangdong Branch",
          reviewedAt: "2026-08-13"
        },
        {
          label: "AGV scheduling with charging and battery swapping at Yangshan Phase IV",
          url: "https://doi.org/10.3390/jmse12020305",
          publisher: "Journal of Marine Science and Engineering / Shanghai Maritime University",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Officially organized delegation visit to Yangshan Phase IV",
          url: "https://japanese.shanghai.gov.cn/ja-Latest-WhatsNew/20260509/fd38d18e47884b8690de97b847febb93.html",
          publisher: "Shanghai Municipal People’s Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Hero image: Yangshan container port in 2013 by Acstar, CC0; cropped and resized",
          url: "https://commons.wikimedia.org/wiki/File:Yangshan_Intermodal_Container_Port.JPG",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
