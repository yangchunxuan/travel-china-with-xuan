import type { EntryRequirementsEditionCopy } from "./entryRequirementsEditionTypes.ts";

/** German translation of /guides/china-entry-requirements/. */
export const germanEntryRequirementsCopy: EntryRequirementsEditionCopy = {
  dateLocale: "de-DE",
  openGraphLocale: "de_DE",
  metadata: {
    title: "Einreise nach China: visumfreie Regeln nach Reisepass und Route",
    description:
      "Aktuelle Einreiseregeln für China nach Reisepass, Reisezweck und Route, darunter die visumfreie Einreise für britische Staatsangehörige 2026, Hinweise zum Visum für US-Bürger und eine Routenprüfung für den 240-Stunden-Transit.",
    socialImageAlt: "Die Chinesische Mauer auf einem Bergkamm bei Peking.",
  },
  skipLink: "Zu den Einreise-Ratgebern",
  breadcrumb: { label: "Brotkrümelnavigation", home: "Startseite", guides: "Reiseführer", current: "Einreise nach China" },
  hero: {
    eyebrow: "Die Einreise-Redaktion von Homeground",
    title: "Einreise nach China",
    lead:
      "Aktuelle Einreiseregeln nach Reisepass, Reisezweck und genauer Route. Beginnen Sie mit der Regel, die für Ihre Reise gilt – und planen Sie die Reiseroute dann um das herum, was bleibt.",
    boundary:
      "Reiseinformationen ausschließlich auf Grundlage offizieller Quellen. Homeground stellt keine Visumanträge, entscheidet nicht über die persönliche Berechtigung und verlangt nicht, dass Sie Ihren Reisepass hochladen.",
  },
  checks: {
    label: "Drei Prüfungen zur Einreise",
    intro: "Beginnen Sie mit drei Fakten",
    items: [
      { title: "Reisepass", detail: "Staatsangehörigkeit und genaue Art des Dokuments" },
      { title: "Reisezweck", detail: "Tourismus, Transit, Arbeit oder ein anderer Grund" },
      { title: "Route", detail: "Wo Sie einreisen und wohin Sie als Nächstes reisen" },
    ],
  },
  collection: {
    eyebrow: "Aktuelle Einreise-Ratgeber",
    title: "Wählen Sie den Pass und die Route, die Sie tatsächlich haben.",
    body:
      "Diese Seiten trennen veröffentlichte Fakten von der Auslegung für die Reiseplanung und zeigen ihre Prüfdaten sichtbar an.",
    latestReview: "Letzte Quellenprüfung",
    checked: "geprüft am {date}",
    readEnglishGuide: "Ratgeber lesen (Englisch)",
  },
  ruleTypes: {
    eyebrow: "Warum die Route zählt",
    title: "„Visumfrei“ kann zwei sehr verschiedene Einreisewege bedeuten.",
    items: [
      {
        marker: "A",
        title: "Befreiung nach Reisepass",
        body:
          "Die veröffentlichte Regel geht von Staatsangehörigkeit, Passart, Reisezweck und Aufenthaltsdauer aus. Der aktuelle Ratgeber für das Vereinigte Königreich ist ein Beispiel dafür.",
      },
      {
        marker: "B",
        title: "Transit nach Route",
        body:
          "Das nächste bestätigte Land oder die nächste bestätigte Region kann darüber entscheiden, ob eine Transitbefreiung gilt. Die Routenprüfung für den 240-Stunden-Transit zeigt, warum eine Hin- und Rückreise und eine Weiterreise nicht dasselbe sind.",
      },
    ],
  },
  protocol: {
    eyebrow: "Wie wir veröffentlichen",
    title: "Seiten über Regeln brauchen ein Ablaufdatum.",
    items: [
      "Zuerst offizielle Quellen von Regierungen und Botschaften nutzen.",
      "Das Datum zeigen, an dem diese Quellen geprüft wurden.",
      "Die veröffentlichte Regel von der Auslegung für die Routenplanung trennen.",
      "Ungewöhnliche Pass- oder Rechtsfälle an die zuständige Behörde verweisen.",
    ],
  },
  cta: {
    eyebrow: "Wenn die Einreise geklärt ist",
    title: "Planen Sie jetzt die Reise, nicht die Formalitäten.",
    body:
      "Teilen Sie uns Ihre Reisedaten, Ihre Wünsche und die Route mit, die Sie bereits haben. Ein Reiseplaner von Homeground hilft Ihnen, den passenden Planungsumfang festzulegen, bevor kostenpflichtige Arbeit beginnt.",
    action: "Mit einem Reiseplaner sprechen",
  },
  guides: {
    "do-us-citizens-need-visa-china-2026": {
      label: "Ratgeber für US-Pässe",
      headline: "Brauchen US-Bürger 2026 ein Visum für China?",
      description:
        "Für einen gewöhnlichen Urlaub auf dem chinesischen Festland brauchen US-Pässe in der Regel ein L-Visum. Vergleichen Sie die 240-Stunden-Transitroute, Hainans regionale 30-Tage-Regelung und die Regeln für eine normale Hin- und Rückreise.",
      imageAlt: "Ankunftshalle des internationalen Flughafens Shanghai Pudong mit zweisprachigen Wegweisern über den Köpfen.",
    },
    "china-240-hour-visa-free-transit-route-check": {
      label: "Ratgeber für Transitrouten",
      headline: "Visumfreier 240-Stunden-Transit in China: Kommt Ihre Route infrage?",
      description:
        "Prüfen Sie die Route A–China–C, den berechtigten Reisepass, das bestätigte Weiterreiseticket, die festgelegten Grenzübergangsstellen und die zulässigen Aufenthaltsgebiete für den visumfreien 240-Stunden-Transit.",
      imageAlt: "Schema der Transitregel: Land oder Region A, dann das chinesische Festland, dann ein anderes Land oder eine andere Region C.",
    },
    "do-singaporeans-need-visa-china": {
      label: "Ratgeber für Pässe aus Singapur",
      headline: "Sie brauchen kein Visum für China. Hier ist die schwierigere Frage.",
      description:
        "Mit einem Reisepass aus Singapur reisen Sie 30 Tage visumfrei nach China ein. Das Visum ist in einem Absatz geklärt; die eigentliche Frage ist, was Sie mit der Zeit anfangen und wo eine China-Route gewonnen oder verloren wird.",
      imageAlt: "Sandsteinpfeiler, gestaffelt in einem tiefgrünen Tal im Nationalen Waldpark Zhangjiajie.",
    },
    "china-visa-free-uk-citizens-2026": {
      label: "Ratgeber für britische Pässe",
      headline: "Visumfrei nach China für britische Staatsangehörige 2026: Wann brauchen Sie trotzdem ein Visum?",
      description:
        "Ein praktischer Ratgeber zur 30-tägigen visumfreien Einreise nach China für britische Staatsangehörige 2026: Passarten, Zählung der Tage, Wiedereinreise nach einem Aufenthalt in Hongkong und wann weiterhin ein Visum nötig ist.",
      imageAlt: "Die Chinesische Mauer auf einem Bergkamm bei Peking im Frühling.",
    },
    "china-visa-free-canadian-citizens-2026": {
      label: "Ratgeber für kanadische Pässe",
      headline: "Visumfrei nach China für kanadische Staatsangehörige 2026: Wann brauchen Sie trotzdem ein Visum?",
      description:
        "Ein praktischer Ratgeber zur 30-tägigen visumfreien Einreise nach China für kanadische Staatsangehörige 2026: Passarten, Zählung der Tage, Wiedereinreise nach einem Aufenthalt in Hongkong und wann weiterhin ein Visum nötig ist.",
      imageAlt: "Die moderne Skyline von Peking mit dem China Zun Tower bei klarem Tageslicht.",
    },
    "china-visa-free-new-zealand-citizens-2026": {
      label: "Ratgeber für neuseeländische Pässe",
      headline: "Visumfrei nach China für neuseeländische Staatsangehörige 2026: Wann brauchen Sie trotzdem ein Visum?",
      description:
        "Ein praktischer Ratgeber zur 30-tägigen visumfreien Einreise nach China für neuseeländische Staatsangehörige 2026: Passarten, Zählung der Tage, Wiedereinreise nach einem Aufenthalt in Hongkong und wann weiterhin ein Visum nötig ist.",
      imageAlt: "Redaktionelle Zeitleiste zum Zeitraum der chinesischen Visumbefreiung für Neuseeland vom 30. November 2024 bis 31. Dezember 2026.",
    },
  },
};
