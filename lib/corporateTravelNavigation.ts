import { corporateLocale, corporatePath } from "./corporateTravelLocalePaths.ts";
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
    pathSegment: "corporate-travel/";
    href: string;
  };
  menu: {
    toggle: string;
    entries: {
      id: CorporatePurpose;
      label: string;
      description: string;
      pathSegment: `corporate-travel/#${CorporatePurpose}`;
      href: string;
    }[];
  };
}

// These are the three purposes on every localized corporate hub, in its order.
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
    description: "公司旅行、奖励旅游与小型会议",
    toggle: "打开企业旅行菜单",
    purposes: {
      "company-trips": { label: "公司旅行与团建", description: "员工出游、共同体验与团队相聚" },
      "incentive-travel": { label: "奖励旅游", description: "肯定成就，感谢团队" },
      "meetings-retreats": { label: "小型会议与团队相聚", description: "公司自行主持会议，并安排共同出游" },
    },
  },
  ko: {
    label: "기업 여행",
    description: "회사 여행, 포상 여행, 소규모 회의 안내",
    toggle: "기업 여행 메뉴 열기",
    purposes: {
      "company-trips": { label: "회사 여행·팀 빌딩", description: "직원 여행과 함께하는 체험" },
      "incentive-travel": { label: "포상 여행", description: "팀의 성과를 인정하고 감사를 전하는 여행" },
      "meetings-retreats": { label: "소규모 회의·워크숍", description: "회사에서 진행하는 회의와 팀 여행" },
    },
  },
  ja: {
    label: "企業向け旅行",
    description: "社員旅行、報奨旅行、少人数の会議をご案内",
    toggle: "企業向け旅行メニューを開く",
    purposes: {
      "company-trips": { label: "社員旅行・チームビルディング", description: "同僚と体験を共有し、交流する旅" },
      "incentive-travel": { label: "インセンティブ旅行", description: "チームの成果を祝い、感謝を伝える旅" },
      "meetings-retreats": { label: "少人数の会議・リトリート", description: "自社で進める会議とチームの旅を組み合わせる" },
    },
  },
  es: {
    label: "Empresas",
    description: "Viajes de empresa, incentivos y pequeñas reuniones",
    toggle: "Abrir el menú de viajes de empresa",
    purposes: {
      "company-trips": { label: "Viajes de empresa y actividades de equipo", description: "Viajes para empleados y experiencias compartidas" },
      "incentive-travel": { label: "Viajes de incentivo", description: "Reconocer los logros y agradecer al equipo" },
      "meetings-retreats": { label: "Pequeñas reuniones y retiros de equipo", description: "Reuniones dirigidas por la empresa y tiempo juntos" },
    },
  },
  fr: {
    label: "Entreprises",
    description: "Voyages d’entreprise, récompenses et petites réunions",
    toggle: "Ouvrir le menu des voyages d’entreprise",
    purposes: {
      "company-trips": { label: "Voyages d’entreprise et cohésion d’équipe", description: "Voyages entre collègues et expériences partagées" },
      "incentive-travel": { label: "Voyages de récompense", description: "Célébrer les réussites et remercier votre équipe" },
      "meetings-retreats": { label: "Petites réunions et séjours d’équipe", description: "Réunions animées par votre entreprise et temps partagé" },
    },
  },
  de: {
    label: "Firmenreisen",
    description: "Firmenreisen, Incentive-Reisen und kleine Tagungen",
    toggle: "Menü für Firmenreisen öffnen",
    purposes: {
      "company-trips": { label: "Firmenreisen und Teambuilding", description: "Reisen mit Kollegen und gemeinsame Erlebnisse" },
      "incentive-travel": { label: "Incentive-Reisen", description: "Erfolge würdigen und Ihrem Team danken" },
      "meetings-retreats": { label: "Kleine Tagungen und Team-Retreats", description: "Eigene Besprechungen und gemeinsame Zeit auf Reisen" },
    },
  },
  ar: {
    label: "رحلات الشركات",
    description: "رحلات الشركات والرحلات التحفيزية والاجتماعات الصغيرة",
    toggle: "افتح قائمة رحلات الشركات",
    purposes: {
      "company-trips": { label: "رحلات الشركات وبناء الفريق", description: "رحلات للموظفين وتجارب مشتركة ووقت معاً" },
      "incentive-travel": { label: "رحلات تحفيزية", description: "الاحتفاء بالإنجازات وتقدير جهود الفريق" },
      "meetings-retreats": { label: "اجتماعات صغيرة وملتقيات الفريق", description: "اجتماعات تديرها شركتكم ووقت مشترك خلال الرحلة" },
    },
  },
};

/** Every edition links to its own equivalent corporate pages. */
export function getCorporateTravelNavigation(language: string): CorporateTravelNavigation {
  const code = corporateLocale(language);
  const hub = corporatePath(code);
  const copy = copyByLanguage[Object.hasOwn(copyByLanguage, code) ? code as CorporateLanguage : "en"];
  return {
    item: {
      id: "corporate", label: copy.label, description: copy.description,
      pathSegment: "corporate-travel/", href: hub,
    },
    menu: {
      toggle: copy.toggle,
      entries: purposes.map(id => ({
        id, ...copy.purposes[id],
        pathSegment: `corporate-travel/#${id}`,
        href: `${hub}#${id}`,
      })),
    },
  };
}
