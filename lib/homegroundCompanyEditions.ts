import type { DestinationHubId } from "./destinationHubs";
import type { HomegroundCompanyCopy } from "./homegroundCompanyI18n";

/**
 * /fr/company/, /es/company/, /de/company/ and /ar/company/: the English
 * /company/ page translated. Registered facts (the company name, licence
 * L-BJ10587, the issuing and registering authorities, the dates, the 30%
 * deposit) are copied exactly; only the prose is translated. Like the English
 * page, these stay noindex and out of the sitemap until the owner approves the
 * copy.
 */
export type HomegroundCompanyEditionLocale = "fr" | "es" | "de" | "ar";
export const homegroundCompanyEditionLocales = ["fr", "es", "de", "ar"] as const satisfies readonly HomegroundCompanyEditionLocale[];

export interface HomegroundCompanyEditionCopy extends HomegroundCompanyCopy {
  readonly skipLink: string;
  /** City guides have no page in this language yet: each tile names the city and says it opens in English. */
  readonly cityNames: Readonly<Record<DestinationHubId, string>>;
  readonly englishMarker: string;
}

const nb = " ";
const companyName = "盛世美达（北京）国际旅行社有限公司";

const french: HomegroundCompanyEditionCopy = {
  path: "/fr/company/",
  skipLink: "Aller au contenu",
  metadata: {
    title: `À propos de Homeground China${nb}: notre mission et nos valeurs`,
    description: `Homeground China est une agence de voyages agréée à Pékin (L-BJ10587), active dans le voyage depuis 2003. Découvrez la Chine à votre façon et laissez-nous le plus difficile${nb}: pourquoi vous pouvez compter sur nous, l’aide que vous pouvez demander et pourquoi nous faisons ce métier.`,
    openGraphTitle: "À propos de Homeground China",
  },
  navLabel: "Notre engagement",
  eyebrow: "L’entreprise",
  title: "Découvrez la Chine à votre façon. Laissez-nous le plus difficile.",
  intro: `Homeground China est une agence de voyages agréée, basée à Pékin. Nous soutenons celles et ceux qui veulent découvrir la Chine à leur façon${nb}: s’il ne vous manque qu’un billet, nous le réservons${nb}; si vous voulez un guide, vous le réservez à la journée${nb}; si vous voulez nous confier tout le voyage, une seule personne s’en occupe, de votre premier e-mail jusqu’à votre vol retour.`,
  teamAction: "Rencontrer l’équipe",
  credentialsAction: "Licences et immatriculation",
  proof: {
    label: "Homeground en chiffres",
    since: "L’année de nos débuts dans le voyage",
    people: "Personnes dans l’équipe",
    tours: "Circuits privés publiés",
    languages: "Langues sur ce site",
  },
  reasons: {
    eyebrow: "Pourquoi compter sur nous",
    title: "Six points sur lesquels vous pouvez compter",
    items: [
      { title: "Un seul interlocuteur, du début à la fin", body: "De votre premier e-mail jusqu’à votre vol retour, le même conseiller s’occupe de vous. Aucun relais." },
      { title: "Toujours joignables", body: "Si quelque chose se présente pendant votre séjour en Chine, écrivez-nous directement sur WeChat ou WhatsApp." },
      { title: "Nos propres guides et chauffeurs", body: "Nous affectons nous-mêmes les guides et les chauffeurs, et ne confions jamais votre voyage à une autre agence réceptive." },
      { title: "Pas d’arrêts shopping, pas de frais cachés", body: "Chaque devis indique précisément ce qu’il comprend, et aucun itinéraire ne comporte d’arrêts shopping." },
      { title: "Une agence de voyages agréée", body: `${companyName}, licence d’agence de voyages L-BJ10587, délivrée par le Bureau municipal de la culture et du tourisme de Pékin.` },
      { title: "Paiement à l’entreprise, solde à l’arrivée", body: `Un acompte de 30${nb}% est versé sur le compte marchand Alipay de l’entreprise. Le solde est réglé après votre arrivée en Chine.` },
    ],
  },
  help: {
    eyebrow: "Le niveau d’aide",
    title: "C’est vous qui choisissez l’aide dont vous avez besoin",
    tickets: {
      title: "Vos billets, on s’en occupe",
      body: "Gardez la Cité interdite ou l’armée de terre cuite dans vos projets. Nous nous chargeons de la réservation au nom inscrit sur le passeport. Envoyez vos dates dès qu’elles sont fixées, pour que nous puissions nous préparer avant l’ouverture des ventes.",
      link: "Nous confier vos billets",
    },
    guide: {
      title: "Un guide à la journée",
      body: "Un guide privé titulaire d’une licence, réservé à la journée, à Shanghai, Pékin, Xi’an ou Zhangjiajie.",
      link: "Guides anglophones privés",
    },
    trip: {
      title: "Tout le voyage",
      body: "Itinéraire, hôtels, voiture, guide et billets organisés ensemble, et quelqu’un à vos côtés une fois en Chine.",
      link: "Organisation complète et assistance sur place",
    },
  },
  why: {
    eyebrow: "Pourquoi nous faisons ce métier",
    title: "Un ami est venu de loin.",
    body: "Nous pensons que plus les gens voyagent et se rencontrent, moins il y a de malentendus entre eux. Le meilleur moyen, c’est de venir et de parcourir le pays soi-même, et de voir la Chine où vivent les gens ordinaires. Notre rôle est d’aider davantage de personnes à oser voyager ainsi.",
    values: [
      { title: "La vérité d’abord", body: `Ce qu’un lieu est vraiment, ce qu’il coûte et ce que nous ne pouvons pas faire${nb}: nous vous le disons avant que vous payiez.` },
      { title: "Accueilli comme un ami", body: "Organisé selon votre rythme, vos centres d’intérêt et les personnes avec qui vous voyagez, comme nous le ferions pour un ami venu nous rendre visite." },
      { title: "Les pieds sur le terrain", body: `Homeground veut dire «${nb}home ground${nb}», notre terrain. La Chine, c’est chez nous${nb}: quand un imprévu survient, quelqu’un est là.` },
    ],
  },
  cities: {
    eyebrow: "Là où nous travaillons",
    title: "Notre terrain",
    intro: "Chacune a un guide de ville publié et des circuits privés sur ce site.",
  },
  timeline: {
    eyebrow: "Notre histoire",
    title: "Notre parcours jusqu’ici",
    items: [
      { date: "2003", title: "Nos débuts dans le voyage", body: `Depuis, nous travaillons dans le voyage${nb}: tourisme intérieur, voyages à l’étranger et accueil de voyageurs venus de l’étranger.` },
      { date: "Janvier 2025", title: "Notre agence de Pékin est immatriculée", body: `${companyName} est immatriculée auprès de l’administration de régulation du marché du district de Changping.` },
      { date: "2025", title: "Licence d’agence de voyages L-BJ10587", body: "Agréée par le Bureau municipal de la culture et du tourisme de Pékin pour le tourisme intérieur et réceptif." },
      { date: "2026", title: "Lancement de homegroundchina.com", body: "Des guides de villes, des conseils de voyage et des circuits privés en anglais, en chinois et en coréen." },
      { date: "Octobre 2026", title: "L’équipe s’agrandit", body: "Nous commençons à recruter des conseillers voyage, des guides et des chargés de contenu dans toute la Chine." },
    ],
  },
  next: {
    eyebrow: "Pour aller plus loin",
    title: "Découvrez qui nous sommes et vérifiez nos documents",
    team: { title: "Rencontrer l’équipe", body: "Les conseillers qui préparent votre voyage, et notre façon de juger qu’un programme est réalisable." },
    credentials: { title: "Licences et immatriculation", body: "Nos informations officielles, avec les registres où vous pouvez les vérifier." },
    careers: { title: "Recrutement (en chinois)", body: "Nous recrutons des conseillers voyage, des guides et des chargés de contenu." },
  },
  cityNames: { beijing: "Pékin", shanghai: "Shanghai", xian: "Xi’an", chengdu: "Chengdu", guangzhou: "Canton", hangzhou: "Hangzhou", zhangjiajie: "Zhangjiajie", chongqing: "Chongqing" },
  englishMarker: "(en anglais)",
};

const spanish: HomegroundCompanyEditionCopy = {
  path: "/es/company/",
  skipLink: "Saltar al contenido",
  metadata: {
    title: "Sobre Homeground China: nuestra misión y valores",
    description: "Homeground China es una agencia de viajes con licencia en Pekín (L-BJ10587), que trabaja en viajes desde 2003. Descubre China a tu manera y déjanos la parte difícil: por qué puedes contar con nosotros, cuánta ayuda puedes pedir y por qué hacemos esto.",
    openGraphTitle: "Sobre Homeground China",
  },
  navLabel: "Nuestro compromiso",
  eyebrow: "Empresa",
  title: "Descubre China a tu manera. Déjanos la parte difícil.",
  intro: "Homeground China es una agencia de viajes con licencia en Pekín. Apoyamos a quienes quieren descubrir China a su manera: si solo necesitas una entrada, la reservamos; si quieres un guía, lo reservas por días; si quieres delegar todo el viaje, una misma persona se ocupa de él desde tu primer correo hasta tu vuelo de regreso.",
  teamAction: "Conoce al equipo",
  credentialsAction: "Licencias y registro",
  proof: {
    label: "Homeground en cifras",
    since: "El año en que empezamos en los viajes",
    people: "Personas en el equipo",
    tours: "Viajes privados publicados",
    languages: "Idiomas en este sitio",
  },
  reasons: {
    eyebrow: "Por qué puedes contar con nosotros",
    title: "Seis cosas con las que puedes contar",
    items: [
      { title: "Una sola persona, de principio a fin", body: "Desde tu primer correo hasta tu vuelo de regreso, te atiende la misma persona. Sin traspasos." },
      { title: "Siempre localizables", body: "Si surge algo mientras estás en China, escríbenos directamente por WeChat o WhatsApp." },
      { title: "Guías y conductores propios", body: "Asignamos nosotros mismos a los guías y conductores, y nunca pasamos tu viaje a otra agencia receptiva." },
      { title: "Sin paradas de compras ni costes ocultos", body: "Cada presupuesto indica exactamente lo que incluye, y ningún itinerario tiene paradas de compras." },
      { title: "Una agencia de viajes con licencia", body: `${companyName}, licencia de agencia de viajes L-BJ10587, expedida por la Oficina Municipal de Cultura y Turismo de Pekín.` },
      { title: "Pagas a la empresa; el resto, al llegar", body: `Un depósito del 30${nb}% se abona en la cuenta comercial de Alipay de la empresa. El resto se paga cuando llegas a China.` },
    ],
  },
  help: {
    eyebrow: "Cuánta ayuda",
    title: "Tú decides cuánta ayuda necesitas",
    tickets: {
      title: "Tus entradas, resueltas",
      body: "Mantén la Ciudad Prohibida o los Guerreros de Terracota en tus planes. Nos ocupamos de la reserva a nombre del pasaporte. Envía tus fechas en cuanto las tengas, para que podamos prepararlo todo antes de que salgan las entradas.",
      link: "Encárganos tus entradas",
    },
    guide: {
      title: "Un guía por días",
      body: "Un guía privado con licencia, reservado por días, en Shanghái, Pekín, Xi’an o Zhangjiajie.",
      link: "Guías privados en inglés",
    },
    trip: {
      title: "Todo el viaje",
      body: "Ruta, hoteles, coche, guía y entradas organizados juntos, y alguien a tu lado cuando estés en China.",
      link: "Organización completa del viaje y asistencia en destino",
    },
  },
  why: {
    eyebrow: "Por qué lo hacemos",
    title: "Un amigo ha venido de lejos.",
    body: "Creemos que cuanto más viaja y se conoce la gente, menos malentendidos hay entre ella. La mejor manera es venir y recorrerlo uno mismo, y ver la China en la que vive la gente corriente. Lo que hacemos es ayudar a que más personas se atrevan a viajar así.",
    values: [
      { title: "La verdad, primero", body: "Cómo es realmente un lugar, cuánto cuesta y lo que no podemos hacer: te lo decimos antes de que pagues." },
      { title: "Recibido como un amigo", body: "Planificado según tu ritmo, tus intereses y las personas con las que viajas, como lo haríamos para un amigo que viene a visitarnos." },
      { title: "Con los pies en el terreno", body: "Homeground significa «home ground», nuestro terreno. China es nuestra casa: cuando surge algo, hay alguien aquí." },
    ],
  },
  cities: {
    eyebrow: "Dónde trabajamos",
    title: "Nuestro terreno",
    intro: "Cada una tiene una guía de ciudad publicada y viajes privados en este sitio.",
  },
  timeline: {
    eyebrow: "Nuestra historia hasta hoy",
    title: "Cómo llegamos hasta aquí",
    items: [
      { date: "2003", title: "Empezamos en los viajes", body: "Desde entonces trabajamos en el sector: viajes nacionales, emisores y receptivos." },
      { date: "Enero de 2025", title: "Se registra nuestra agencia en Pekín", body: `${companyName} queda registrada ante la autoridad de regulación del mercado del distrito de Changping.` },
      { date: "2025", title: "Licencia de agencia de viajes L-BJ10587", body: "Con licencia de la Oficina Municipal de Cultura y Turismo de Pekín para turismo nacional y receptivo." },
      { date: "2026", title: "Se lanza homegroundchina.com", body: "Guías de ciudades, consejos de viaje y viajes privados en inglés, chino y coreano." },
      { date: "Octubre de 2026", title: "Ampliamos el equipo", body: "Empezamos a contratar asesores de viajes, guías y personal de contenidos en toda China." },
    ],
  },
  next: {
    eyebrow: "Sigue leyendo",
    title: "Descubre quiénes somos y comprueba nuestros documentos",
    team: { title: "Conoce al equipo", body: "Las personas que planifican tu viaje y cómo valoramos si un plan es viable." },
    credentials: { title: "Licencias y registro", body: "Nuestros datos registrales, con los registros oficiales donde puedes comprobarlos." },
    careers: { title: "Empleo (en chino)", body: "Buscamos asesores de viajes, guías y personal de contenidos." },
  },
  cityNames: { beijing: "Pekín", shanghai: "Shanghái", xian: "Xi’an", chengdu: "Chengdu", guangzhou: "Cantón", hangzhou: "Hangzhou", zhangjiajie: "Zhangjiajie", chongqing: "Chongqing" },
  englishMarker: "(en inglés)",
};

const german: HomegroundCompanyEditionCopy = {
  path: "/de/company/",
  skipLink: "Zum Inhalt",
  metadata: {
    title: "Über Homeground China: unsere Mission und unsere Werte",
    description: "Homeground China ist ein lizenzierter Reiseveranstalter in Peking (L-BJ10587) und seit 2003 in der Reisebranche tätig. China auf Ihre Weise erleben, das Schwierige übernehmen wir: warum Sie sich auf uns verlassen können, wie viel Unterstützung Sie bekommen können und warum wir das tun.",
    openGraphTitle: "Über Homeground China",
  },
  navLabel: "Unser Anspruch",
  eyebrow: "Unternehmen",
  title: "China auf Ihre Weise erleben. Das Schwierige übernehmen wir.",
  intro: "Homeground China ist ein lizenzierter Reiseveranstalter in Peking. Wir unterstützen Menschen, die China auf ihre eigene Weise erleben möchten: Brauchen Sie nur ein Ticket, buchen wir es; möchten Sie eine Reiseleitung, buchen Sie sie tageweise; möchten Sie die ganze Reise abgeben, kümmert sich eine Person darum, von Ihrer ersten E-Mail bis zu Ihrem Rückflug.",
  teamAction: "Das Team kennenlernen",
  credentialsAction: "Lizenzen und Registrierung",
  proof: {
    label: "Homeground in Zahlen",
    since: "Das Jahr unseres Einstiegs in die Reisebranche",
    people: "Menschen im Team",
    tours: "Veröffentlichte private Reisen",
    languages: "Sprachen auf dieser Website",
  },
  reasons: {
    eyebrow: "Warum Sie sich auf uns verlassen können",
    title: "Sechs Dinge, auf die Sie sich verlassen können",
    items: [
      { title: "Eine Person, von Anfang bis Ende", body: "Von Ihrer ersten E-Mail bis zu Ihrem Rückflug betreut Sie dieselbe Ansprechperson. Keine Übergaben." },
      { title: "Immer erreichbar", body: "Wenn während Ihres Aufenthalts in China etwas ist, schreiben Sie uns direkt über WeChat oder WhatsApp." },
      { title: "Eigene Reiseleitungen und Fahrer", body: "Wir teilen Reiseleitungen und Fahrer selbst ein und geben Ihre Reise nie an eine andere Agentur vor Ort weiter." },
      { title: "Keine Shoppingstopps, keine versteckten Kosten", body: "Jedes Angebot nennt genau, was es enthält, und kein Reiseverlauf enthält Shoppingstopps." },
      { title: "Ein lizenzierter Reiseveranstalter", body: `${companyName}, Reiseveranstalterlizenz L-BJ10587, ausgestellt vom Städtischen Amt für Kultur und Tourismus Peking.` },
      { title: "Zahlung an das Unternehmen, Restbetrag nach Ankunft", body: `Eine Anzahlung von 30${nb}% geht auf das Alipay-Händlerkonto des Unternehmens. Der Restbetrag wird nach Ihrer Ankunft in China bezahlt.` },
    ],
  },
  help: {
    eyebrow: "Wie viel Unterstützung",
    title: "Sie entscheiden, wie viel Unterstützung Sie brauchen",
    tickets: {
      title: "Ihre Tickets, für Sie erledigt",
      body: "Behalten Sie die Verbotene Stadt oder die Terrakotta-Armee in Ihren Plänen. Wir übernehmen die Buchung auf den Namen im Reisepass. Senden Sie uns Ihre Termine, sobald sie feststehen, damit wir alles vorbereiten können, bevor der Ticketverkauf beginnt.",
      link: "Tickets buchen lassen",
    },
    guide: {
      title: "Reiseleitung tageweise",
      body: "Eine lizenzierte private Reiseleitung, tageweise gebucht, in Shanghai, Peking, Xi’an oder Zhangjiajie.",
      link: "Private englischsprachige Reiseleitung",
    },
    trip: {
      title: "Die ganze Reise",
      body: "Route, Hotels, Wagen, Reiseleitung und Tickets zusammen organisiert, und jemand ist für Sie da, sobald Sie in China sind.",
      link: "Komplette Reiseplanung und Betreuung vor Ort",
    },
  },
  why: {
    eyebrow: "Warum wir das tun",
    title: "Ein Freund ist aus der Ferne gekommen.",
    body: "Wir glauben: Je mehr Menschen reisen und sich begegnen, desto weniger Missverständnisse gibt es zwischen ihnen. Am besten kommt man selbst und erkundet das Land auf eigenen Füßen, um das China zu sehen, in dem ganz normale Menschen leben. Unsere Aufgabe ist es, mehr Menschen den Mut zu geben, so zu reisen.",
    values: [
      { title: "Wahrheit zuerst", body: "Wie ein Ort wirklich ist, was er kostet und was wir nicht leisten können: Das sagen wir Ihnen, bevor Sie bezahlen." },
      { title: "Empfangen wie ein Freund", body: "Geplant nach Ihrem Tempo, Ihren Interessen und den Menschen, mit denen Sie reisen, so wie wir es für einen Freund tun würden, der uns zu Hause besucht." },
      { title: "Mit beiden Beinen vor Ort", body: "Homeground bedeutet „home ground“, unser Heimatboden. China ist unser Zuhause: Wenn etwas ist, ist jemand da." },
    ],
  },
  cities: {
    eyebrow: "Wo wir arbeiten",
    title: "Unser Heimatboden",
    intro: "Zu jeder Stadt gibt es auf dieser Website einen veröffentlichten Stadtführer und private Reisen.",
  },
  timeline: {
    eyebrow: "Unsere Geschichte bisher",
    title: "Wie wir hierhergekommen sind",
    items: [
      { date: "2003", title: "Einstieg in die Reisebranche", body: "Seitdem arbeiten wir im Tourismus: Inlandsreisen, Auslandsreisen und Incoming-Reisen." },
      { date: "Januar 2025", title: "Unser Pekinger Reiseveranstalter wird eingetragen", body: `${companyName} wird bei der Marktaufsichtsbehörde des Bezirks Changping eingetragen.` },
      { date: "2025", title: "Reiseveranstalterlizenz L-BJ10587", body: "Vom Städtischen Amt für Kultur und Tourismus Peking für Inlands- und Incoming-Tourismus lizenziert." },
      { date: "2026", title: "homegroundchina.com geht online", body: "Stadtführer, Reisetipps und private Reisen auf Englisch, Chinesisch und Koreanisch." },
      { date: "Oktober 2026", title: "Das Team wächst", body: "Wir beginnen, in ganz China Reiseberatung, Reiseleitungen und Content-Mitarbeitende einzustellen." },
    ],
  },
  next: {
    eyebrow: "Weiterlesen",
    title: "Lernen Sie uns kennen und prüfen Sie unsere Unterlagen",
    team: { title: "Das Team kennenlernen", body: "Die Menschen, die Ihre Reise planen, und wie wir beurteilen, ob ein Plan funktioniert." },
    credentials: { title: "Lizenzen und Registrierung", body: "Unsere eingetragenen Angaben, mit den offiziellen Registern, in denen Sie sie prüfen können." },
    careers: { title: "Karriere (Chinesisch)", body: "Wir suchen Reiseberatung, Reiseleitungen und Content-Mitarbeitende." },
  },
  cityNames: { beijing: "Peking", shanghai: "Shanghai", xian: "Xi’an", chengdu: "Chengdu", guangzhou: "Guangzhou", hangzhou: "Hangzhou", zhangjiajie: "Zhangjiajie", chongqing: "Chongqing" },
  englishMarker: "(Englisch)",
};

const arabic: HomegroundCompanyEditionCopy = {
  path: "/ar/company/",
  skipLink: "انتقل إلى المحتوى",
  metadata: {
    title: "عن Homeground China: رسالتنا وقيمنا",
    description: "Homeground China وكالة سفر مرخّصة في بكين (L-BJ10587)، تعمل في مجال السفر منذ 2003. استكشف الصين على طريقتك واترك لنا الأجزاء الصعبة: لماذا يمكنك الاعتماد علينا، وما مقدار المساعدة الذي يمكنك طلبه، ولماذا نقوم بهذا العمل.",
    openGraphTitle: "عن Homeground China",
  },
  navLabel: "نهجنا",
  eyebrow: "الشركة",
  title: "استكشف الصين على طريقتك. واترك لنا الأجزاء الصعبة.",
  intro: "Homeground China وكالة سفر مرخّصة في بكين. نساند من يريد أن يرى الصين على طريقته: إذا كنت تحتاج إلى تذكرة فقط، نحجزها لك؛ وإذا أردت مرشدًا، تحجزه باليوم؛ وإذا أردت أن تسلّمنا الرحلة كلها، يتولاها شخص واحد من أول رسالة بريد إلكتروني حتى عودتك إلى بلدك.",
  teamAction: "تعرّف على الفريق",
  credentialsAction: "التراخيص والتسجيل",
  proof: {
    label: "Homeground بالأرقام",
    since: "سنة بدايتنا في مجال السفر",
    people: "عدد أعضاء الفريق",
    tours: "رحلات خاصة منشورة",
    languages: "لغات هذا الموقع",
  },
  reasons: {
    eyebrow: "لماذا يمكنك الاعتماد علينا",
    title: "ستة أمور يمكنك الاعتماد عليها",
    items: [
      { title: "شخص واحد من البداية إلى النهاية", body: "من أول رسالة بريد إلكتروني حتى عودتك إلى بلدك، يتولى أمرك منسّق الرحلة نفسه، دون تحويلك من شخص إلى آخر." },
      { title: "متاحون دائمًا", body: "إذا طرأ أي أمر أثناء وجودك في الصين، راسلنا مباشرة عبر WeChat أو WhatsApp." },
      { title: "مرشدونا وسائقونا", body: "نعيّن المرشدين والسائقين بأنفسنا، ولا نحيل رحلتك أبدًا إلى وكالة محلية أخرى." },
      { title: "لا توقفات للتسوق ولا تكاليف خفية", body: "يوضّح كل عرض سعر بدقة ما يشمله، ولا يتضمن أي برنامج توقفات للتسوق." },
      { title: "وكالة سفر مرخّصة", body: `${companyName}، ترخيص وكالة السفر L-BJ10587، صادر عن مكتب الثقافة والسياحة في بلدية بكين.` },
      { title: "الدفع للشركة، والباقي عند الوصول", body: "يُدفع عربون بنسبة 30% إلى حساب التاجر الخاص بالشركة على Alipay، ويُسدَّد الباقي بعد وصولك إلى الصين." },
    ],
  },
  help: {
    eyebrow: "مقدار المساعدة",
    title: "أنت من يقرر مقدار المساعدة التي تحتاجها",
    tickets: {
      title: "تذاكرك في أيدٍ أمينة",
      body: "أبقِ المدينة المحرمة أو جيش التيراكوتا ضمن خططك. نتولى الحجز بالاسم الوارد في جواز السفر. أرسل مواعيدك فور تحديدها حتى نستعد قبل فتح حجز التذاكر.",
      link: "دعنا نحجز تذاكرك",
    },
    guide: {
      title: "مرشد باليوم",
      body: "مرشد خاص مرخّص، يُحجز باليوم، في شنغهاي أو بكين أو شيآن أو تشانغجياجيه.",
      link: "مرشد خاص باللغة الإنجليزية",
    },
    trip: {
      title: "الرحلة كاملة",
      body: "المسار والفنادق والسيارة والمرشد والتذاكر مرتّبة معًا، وشخص إلى جانبك بعد وصولك إلى الصين.",
      link: "تخطيط الرحلة كاملة والدعم الميداني",
    },
  },
  why: {
    eyebrow: "لماذا نقوم بهذا",
    title: "جاء صديق من بعيد.",
    body: "نؤمن بأنه كلما سافر الناس والتقوا أكثر، قلّ سوء الفهم بينهم. وأفضل طريقة هي أن تأتي وتمشي بنفسك، وترى الصين التي يعيش فيها الناس العاديون. وما نقوم به هو مساعدة المزيد من الناس على أن يجرؤوا على السفر بهذه الطريقة.",
    values: [
      { title: "الحقيقة أولًا", body: "كيف يبدو المكان فعلًا، وكم يكلّف، وما لا نستطيع القيام به: نخبرك بذلك قبل أن تدفع." },
      { title: "ضيافة كما للصديق", body: "نخطط وفق وتيرتك واهتماماتك ورفاق سفرك، كما نفعل لصديق يزورنا في بلدنا." },
      { title: "على أرض الواقع", body: "Homeground تعني «home ground»، أي أرضنا. الصين بلدنا: إذا طرأ أمر، فهناك من هو هنا." },
    ],
  },
  cities: {
    eyebrow: "أين نعمل",
    title: "أرضنا",
    intro: "لكل منها دليل مدينة منشور ورحلات خاصة على هذا الموقع.",
  },
  timeline: {
    eyebrow: "قصتنا حتى الآن",
    title: "كيف وصلنا إلى هنا",
    items: [
      { date: "2003", title: "البداية في مجال السفر", body: "منذ ذلك الحين نعمل في السفر: السياحة الداخلية، والسفر إلى الخارج، واستقبال الزوار من الخارج." },
      { date: "يناير 2025", title: "تسجيل وكالتنا في بكين", body: `سُجّلت ${companyName} لدى هيئة تنظيم السوق في منطقة تشانغبينغ.` },
      { date: "2025", title: "ترخيص وكالة السفر L-BJ10587", body: "مرخّصة من مكتب الثقافة والسياحة في بلدية بكين للسياحة الداخلية واستقبال السياح من الخارج." },
      { date: "2026", title: "إطلاق homegroundchina.com", body: "أدلة المدن ونصائح السفر والرحلات الخاصة بالإنجليزية والصينية والكورية." },
      { date: "أكتوبر 2026", title: "بناء الفريق", body: "نبدأ توظيف مستشاري سفر ومرشدين وفريق محتوى في أنحاء الصين." },
    ],
  },
  next: {
    eyebrow: "تابع القراءة",
    title: "تعرّف علينا وتحقق من وثائقنا",
    team: { title: "تعرّف على الفريق", body: "المخططون الذين يقفون وراء رحلتك، وكيف نحكم على أن الخطة قابلة للتنفيذ." },
    credentials: { title: "التراخيص والتسجيل", body: "بيانات تسجيلنا، مع السجلات الرسمية التي يمكنك التحقق منها فيها." },
    careers: { title: "الوظائف (بالصينية)", body: "نوظّف مستشاري سفر ومرشدين وفريق محتوى." },
  },
  cityNames: { beijing: "بكين", shanghai: "شنغهاي", xian: "شيآن", chengdu: "تشنغدو", guangzhou: "قوانغتشو", hangzhou: "هانغتشو", zhangjiajie: "تشانغجياجيه", chongqing: "تشونغتشينغ" },
  englishMarker: "(بالإنجليزية)",
};

const copy: Record<HomegroundCompanyEditionLocale, HomegroundCompanyEditionCopy> = { fr: french, es: spanish, de: german, ar: arabic };

export function getHomegroundCompanyEditionCopy(edition: HomegroundCompanyEditionLocale): HomegroundCompanyEditionCopy {
  return copy[edition];
}
