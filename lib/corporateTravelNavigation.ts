type CorporateLanguage = "en" | "zh" | "ko" | "ja" | "es" | "fr" | "de" | "ar";
type CorporatePurpose = "company-trips" | "incentive-travel" | "meetings-retreats";

interface NavigationCopy {
  label: string;
  description: string;
  toggle: string;
  purposes: Record<CorporatePurpose, { label: string; description: string }>;
}

interface CorporateTravelNavigation {
  item: {
    id: "corporate";
    label: string;
    description: string;
    pathSegment: "corporate-travel/" | "ja/corporate-travel/";
    href: "/corporate-travel/" | "/ja/corporate-travel/";
  };
  menu: {
    toggle: string;
    entries: {
      id: CorporatePurpose;
      label: string;
      description: string;
      pathSegment: `${"" | "ja/"}corporate-travel/#${CorporatePurpose}`;
      href: `/${"" | "ja/"}corporate-travel/#${CorporatePurpose}`;
    }[];
  };
}

// These are the three purposes on the existing English corporate hub, in its order.
const purposes: readonly CorporatePurpose[] = ["company-trips", "incentive-travel", "meetings-retreats"];
const copyByLanguage: Record<CorporateLanguage, NavigationCopy> = {
  en: {
    label: "For Companies",
    description: "Company trips, incentive travel and small meetings",
    toggle: "Open company travel menu",
    purposes: {
      "company-trips": { label: "Company trips & team building", description: "Staff trips, shared experiences and time together" },
      "incentive-travel": { label: "Incentive travel", description: "Recognise achievements and thank your team" },
      "meetings-retreats": { label: "Small meetings & retreats", description: "Company-led meetings with time away together" },
    },
  },
  zh: {
    label: "企业旅行",
    description: "公司旅行、奖励旅游与小型会议；英语页面",
    toggle: "打开企业旅行菜单",
    purposes: {
      "company-trips": { label: "公司旅行与团建", description: "员工出游、共同体验与团队相聚；英语页面" },
      "incentive-travel": { label: "奖励旅游", description: "肯定成就，感谢团队；英语页面" },
      "meetings-retreats": { label: "小型会议与团队相聚", description: "公司自行主持会议，并安排共同出游；英语页面" },
    },
  },
  ko: {
    label: "기업 여행",
    description: "회사 여행, 포상 여행, 소규모 회의 안내 · 영어 페이지",
    toggle: "기업 여행 메뉴 열기",
    purposes: {
      "company-trips": { label: "회사 여행·팀 빌딩", description: "직원 여행과 함께하는 체험 · 영어 페이지" },
      "incentive-travel": { label: "포상 여행", description: "팀의 성과를 인정하고 감사를 전하는 여행 · 영어 페이지" },
      "meetings-retreats": { label: "소규모 회의·워크숍", description: "회사에서 진행하는 회의와 팀 여행 · 영어 페이지" },
    },
  },
  ja: {
    label: "企業向け旅行",
    description: "社員旅行、報奨旅行、少人数の会議・チーム合宿",
    toggle: "企業向け旅行メニューを開く",
    purposes: {
      "company-trips": { label: "社員旅行・チームビルディング", description: "同僚と体験を共有し、交流する旅" },
      "incentive-travel": { label: "インセンティブ旅行", description: "チームの成果を祝い、感謝を伝える旅" },
      "meetings-retreats": { label: "少人数の会議・チーム合宿", description: "自社で進める会議と、チームで過ごす旅" },
    },
  },
  es: {
    label: "Empresas",
    description: "Viajes de empresa, incentivos y pequeñas reuniones; página en inglés",
    toggle: "Abrir el menú de viajes de empresa",
    purposes: {
      "company-trips": { label: "Viajes de empresa y actividades de equipo", description: "Viajes para empleados y experiencias compartidas; página en inglés" },
      "incentive-travel": { label: "Viajes de incentivo", description: "Reconocer los logros y agradecer al equipo; página en inglés" },
      "meetings-retreats": { label: "Pequeñas reuniones y retiros de equipo", description: "Reuniones dirigidas por la empresa y tiempo juntos; página en inglés" },
    },
  },
  fr: {
    label: "Entreprises",
    description: "Voyages d’entreprise, récompenses et petites réunions ; page en anglais",
    toggle: "Ouvrir le menu des voyages d’entreprise",
    purposes: {
      "company-trips": { label: "Voyages d’entreprise et cohésion d’équipe", description: "Voyages entre collègues et expériences partagées ; page en anglais" },
      "incentive-travel": { label: "Voyages de récompense", description: "Célébrer les réussites et remercier votre équipe ; page en anglais" },
      "meetings-retreats": { label: "Petites réunions et séjours d’équipe", description: "Réunions animées par votre entreprise et temps partagé ; page en anglais" },
    },
  },
  de: {
    label: "Firmenreisen",
    description: "Firmenreisen, Incentive-Reisen und kleine Tagungen; Seite auf Englisch",
    toggle: "Menü für Firmenreisen öffnen",
    purposes: {
      "company-trips": { label: "Firmenreisen und Teambuilding", description: "Reisen mit Kollegen und gemeinsame Erlebnisse; Seite auf Englisch" },
      "incentive-travel": { label: "Incentive-Reisen", description: "Erfolge würdigen und Ihrem Team danken; Seite auf Englisch" },
      "meetings-retreats": { label: "Kleine Tagungen und Team-Retreats", description: "Eigene Besprechungen und gemeinsame Zeit auf Reisen; Seite auf Englisch" },
    },
  },
  ar: {
    label: "رحلات الشركات",
    description: "رحلات الشركات والرحلات التحفيزية والاجتماعات الصغيرة؛ صفحة باللغة الإنجليزية",
    toggle: "افتح قائمة رحلات الشركات",
    purposes: {
      "company-trips": { label: "رحلات الشركات وبناء الفريق", description: "رحلات للموظفين وتجارب مشتركة ووقت معاً؛ صفحة باللغة الإنجليزية" },
      "incentive-travel": { label: "رحلات تحفيزية", description: "الاحتفاء بالإنجازات وتقدير جهود الفريق؛ صفحة باللغة الإنجليزية" },
      "meetings-retreats": { label: "اجتماعات صغيرة وملتقيات الفريق", description: "اجتماعات تديرها شركتكم ووقت مشترك خلال الرحلة؛ صفحة باللغة الإنجليزية" },
    },
  },
};

/** Link to a complete local edition; other languages disclose the English destination. */
export function getCorporateTravelNavigation(language: string): CorporateTravelNavigation {
  const code = language.trim().toLowerCase().split(/[-_]/u)[0];
  const copy = copyByLanguage[Object.hasOwn(copyByLanguage, code) ? code as CorporateLanguage : "en"];
  const prefix = code === "ja" ? "ja/" : "";
  return {
    item: {
      id: "corporate", label: copy.label, description: copy.description,
      pathSegment: `${prefix}corporate-travel/`, href: `/${prefix}corporate-travel/`,
    },
    menu: {
      toggle: copy.toggle,
      entries: purposes.map(id => ({
        id, ...copy.purposes[id],
        pathSegment: `${prefix}corporate-travel/#${id}`,
        href: `/${prefix}corporate-travel/#${id}`,
      })),
    },
  };
}
