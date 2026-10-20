import type { TravelInspirationCopy } from "./travelInspirationI18n";

/**
 * Travel Inspiration in the French, Spanish, German, Arabic and Japanese
 * editions: the same words as lib/travelInspirationI18n.ts, translated from
 * the English, plus the word for the Destinations step of the breadcrumb.
 * Every edition has the hub; the theme pages stay English, so a theme card
 * links the English page with the edition's marker
 * (lib/editionEnglishMarker.ts). The Japanese words also name the themes on
 * the Japanese city pages.
 */
export type TravelInspirationEditionLocale = "fr" | "es" | "de" | "ar" | "ja";

export interface TravelInspirationEditionCopy extends TravelInspirationCopy {
  /** The Destinations step of the breadcrumb (the English city index, /explore/). */
  destinations: string;
}

/** Arabic counts its nouns: one, two, three to ten, eleven and up. */
function arabicCount(count: number, forms: { one: string; two: string; few: string; many: string }) {
  if (count === 1) return forms.one;
  if (count === 2) return forms.two;
  return `${count} ${count >= 3 && count <= 10 ? forms.few : forms.many}`;
}

const french: TravelInspirationEditionCopy = {
  home: "Accueil",
  destinations: "Destinations",
  fromCities: { lead: "Ou partez d’un thème :", label: "Idées de voyage" },
  breadcrumb: "Fil d’Ariane",
  hub: {
    metadata: {
      title: "Idées de voyage en Chine, classées par thème",
      description:
        "Des idées de voyage en Chine par thème, chacune avec des itinéraires privés tout prêts, ainsi que les points forts de huit villes.",
    },
    h1: "Idées de voyage",
    lede: "Vous ne savez pas par où commencer ? Choisissez un thème : chacun propose des itinéraires tout prêts. Ou partez d’une ville.",
    themesTitle: "Par thème",
    themeAction: "Voir les itinéraires",
    routeCount: (count) => (count === 1 ? "1 itinéraire" : `${count} itinéraires`),
    citiesTitle: "Par ville",
    citiesLede: "Une ligne par ville. Ouvrez-en une pour voir comment organiser vos journées sur place.",
    allCities: "Comparer les villes",
    ctaTitle: "Aucun thème ne vous convient ?",
    ctaBody: "Dites-nous où vous voulez aller et pour combien de temps : nous concevrons tout le voyage autour de vous.",
    allTours: "Tous nos circuits",
  },
  theme: {
    facts: (routes, min, max) => `${routes} itinéraires privés · ${min} à ${max} jours`,
    jumpToRoutes: "Voir les itinéraires",
    routesTitle: "Les itinéraires selon la durée du voyage",
    tourAction: "Programme et prix",
    planTile: {
      title: "Aucun ne vous convient ?",
      titleOne: "Envie d’un autre voyage ?",
      body: "Indiquez-nous votre nombre de jours et vos villes : nous concevrons le voyage autour de vous.",
      action: "Le préparer avec nous",
    },
  },
  cities: {
    beijing: "Grande Muraille, Cité interdite et hutongs",
    shanghai: "Le Bund, les vieilles ruelles et une escapade facile à Suzhou",
    xian: "Armée de terre cuite, remparts, quartier musulman",
    chengdu: "Pandas, maisons de thé et cuisine du Sichuan",
    guangzhou: "Dim sum du matin, vieilles rues à arcades et rivière des Perles",
    hangzhou: "Le lac de l’Ouest et les collines de thé de Longjing",
    zhangjiajie: "Forêts de piliers de grès et mont Tianmen",
    chongqing: "Une ville à flanc de colline, la fondue chinoise et le Yangtsé",
  },
  themes: {
    "first-time-in-china": {
      metadata: {
        title: "Premier voyage en Chine : itinéraires privés selon la durée",
        description:
          "Vous préparez un premier voyage en Chine ? Partez du temps dont vous disposez : Pékin, Xi’an et Shanghai en une semaine, la rivière Li à Guilin en dix jours, une croisière sur le Yangtsé en douze jours, les pandas en deux semaines. Chaque itinéraire a son programme et son prix publiés.",
      },
      name: "Premier voyage en Chine",
      teaser: "Des itinéraires privés tout prêts pour un premier voyage, classés selon le temps dont vous disposez.",
      imageAlt: "Une section restaurée de la Grande Muraille sur des crêtes, au nord de Pékin",
      h1Lines: ["Premier voyage en Chine ?", "De combien de temps disposez-vous ?"],
      lede:
        "La Grande Muraille, l’armée de terre cuite et le Bund de Shanghai : voilà ce que viennent voir la plupart des voyageurs lors d’un premier séjour. Voici des itinéraires privés tout prêts, classés par durée, chacun avec son programme et son prix sur sa propre page.",
      groups: {
        week: {
          title: "Environ une semaine",
          note: "Le classique : Pékin, Xi’an et Shanghai. Pour rester dans une seule région, choisissez Shanghai avec Suzhou et Hangzhou, ou Pékin seul.",
        },
        "ten-days": {
          title: "Environ dix jours",
          note: "Ajoutez aux trois villes la rivière Li, à Guilin, ou remplacez Shanghai par Hong Kong et rentrez en avion depuis là-bas.",
        },
        "two-weeks": {
          title: "De 12 jours à deux semaines",
          note: "Plus de nuits dans chaque ville, ou en plus une croisière sur le Yangtsé ou les pandas de Chengdu.",
        },
      },
      citiesTitle: "Les villes de ces itinéraires",
      citiesLede: "Envie de découvrir une ville avant de choisir un itinéraire ?",
      servicesTitle: "D’autres villes, ou une autre durée ?",
      servicesLede: "Si aucun itinéraire ne convient, nous pouvons en concevoir un pour vous. Ou réservez seulement vos billets de visite, ou seulement un guide.",
    },
  },
};

const spanish: TravelInspirationEditionCopy = {
  home: "Inicio",
  destinations: "Destinos",
  fromCities: { lead: "O empieza por un tema:", label: "Ideas de viaje" },
  breadcrumb: "Ruta de navegación",
  hub: {
    metadata: {
      title: "Ideas de viaje por China, por temas",
      description:
        "Ideas para viajar por China por temas, cada una con rutas privadas ya preparadas, y lo mejor de cada una de ocho ciudades.",
    },
    h1: "Ideas de viaje",
    lede: "¿No sabes por dónde empezar? Elige un tema: cada uno trae rutas ya preparadas. O empieza por una ciudad.",
    themesTitle: "Por tema",
    themeAction: "Ver las rutas",
    routeCount: (count) => (count === 1 ? "1 ruta" : `${count} rutas`),
    citiesTitle: "Por ciudad",
    citiesLede: "Una línea sobre cada ciudad. Abre una para ver cómo organizar allí tus días.",
    allCities: "Comparar ciudades",
    ctaTitle: "¿Ningún tema te encaja?",
    ctaBody: "Dinos adónde quieres ir y durante cuánto tiempo, y planificaremos todo el viaje a tu medida.",
    allTours: "Todos los viajes",
  },
  theme: {
    facts: (routes, min, max) => `${routes} rutas privadas · ${min}–${max} días`,
    jumpToRoutes: "Ver las rutas",
    routesTitle: "Rutas según la duración del viaje",
    tourAction: "Itinerario y precio",
    planTile: {
      title: "¿Ninguna te convence?",
      titleOne: "¿Quieres otro viaje?",
      body: "Dinos cuántos días tienes y qué ciudades quieres ver, y planificaremos el viaje a tu medida.",
      action: "Planificarlo con nosotros",
    },
  },
  cities: {
    beijing: "Gran Muralla, Ciudad Prohibida y hutongs",
    shanghai: "El Bund, callejones antiguos y una escapada fácil a Suzhou",
    xian: "Guerreros de Terracota, muralla y barrio musulmán",
    chengdu: "Pandas, casas de té y comida de Sichuan",
    guangzhou: "Mañanas de dim sum, calles antiguas con soportales y el río de las Perlas",
    hangzhou: "El Lago del Oeste y las colinas de té de Longjing",
    zhangjiajie: "Bosques de pilares de arenisca y la montaña Tianmen",
    chongqing: "Una ciudad en las laderas, el hotpot y el Yangtsé",
  },
  themes: {
    "first-time-in-china": {
      metadata: {
        title: "Primer viaje a China: rutas privadas según la duración",
        description:
          "¿Preparas tu primer viaje a China? Empieza por el tiempo que tienes: Pekín, Xi’an y Shanghái en una semana; el río Li de Guilin en diez días; un crucero por el Yangtsé en doce días; los pandas en dos semanas. Cada ruta tiene su itinerario y su precio publicados.",
      },
      name: "Primer viaje a China",
      teaser: "Rutas privadas ya preparadas para un primer viaje, ordenadas según el tiempo que tengas.",
      imageAlt: "Un tramo restaurado de la Gran Muralla sobre crestas montañosas al norte de Pekín",
      h1Lines: ["¿Tu primer viaje a China?", "¿Cuánto tiempo tienes?"],
      lede:
        "La Gran Muralla, los Guerreros de Terracota y el Bund de Shanghái son lo que viene a ver la mayoría de quienes visitan China por primera vez. Aquí tienes rutas privadas ya preparadas según la duración del viaje, cada una con su itinerario y su precio en su propia página.",
      groups: {
        week: {
          title: "Alrededor de una semana",
          note: "El clásico es Pekín, Xi’an y Shanghái. Para quedarte en una sola región, elige Shanghái con Suzhou y Hangzhou, o solo Pekín.",
        },
        "ten-days": {
          title: "Alrededor de diez días",
          note: "Añade el río Li de Guilin a las tres ciudades, o cambia Shanghái por Hong Kong y vuelve a casa en avión desde allí.",
        },
        "two-weeks": {
          title: "De 12 días a dos semanas",
          note: "Más noches en cada ciudad, o añade un crucero por el Yangtsé o los pandas de Chengdu.",
        },
      },
      citiesTitle: "Ciudades de estas rutas",
      citiesLede: "¿Quieres ver cómo es una ciudad antes de elegir una ruta?",
      servicesTitle: "¿Otras ciudades u otra duración?",
      servicesLede: "Si ninguna ruta te encaja, podemos planificar una a tu medida. O reserva solo las entradas de las visitas, o solo un guía.",
    },
  },
};

const german: TravelInspirationEditionCopy = {
  home: "Startseite",
  destinations: "Reiseziele",
  fromCities: { lead: "Oder beginnen Sie mit einem Thema:", label: "Reiseideen" },
  breadcrumb: "Brotkrümelnavigation",
  hub: {
    metadata: {
      title: "Reiseideen für China nach Themen",
      description:
        "Reiseideen für China nach Themen, jeweils mit fertig geplanten privaten Routen, und wofür sich jede von acht Städten am besten eignet.",
    },
    h1: "Reiseideen",
    lede: "Sie wissen nicht, wo Sie anfangen sollen? Wählen Sie ein Thema: Zu jedem gibt es fertig geplante Routen. Oder beginnen Sie mit einer Stadt.",
    themesTitle: "Nach Thema",
    themeAction: "Routen ansehen",
    routeCount: (count) => (count === 1 ? "1 Route" : `${count} Routen`),
    citiesTitle: "Nach Stadt",
    citiesLede: "Eine Zeile zu jeder Stadt. Öffnen Sie eine, um zu sehen, wie Sie Ihre Tage dort planen.",
    allCities: "Städte vergleichen",
    ctaTitle: "Kein Thema passt?",
    ctaBody: "Sagen Sie uns, wohin Sie möchten und für wie lange, und wir planen die ganze Reise rund um Sie.",
    allTours: "Alle Reisen",
  },
  theme: {
    facts: (routes, min, max) => `${routes} private Routen · ${min}–${max} Tage`,
    jumpToRoutes: "Routen ansehen",
    routesTitle: "Routen nach Reisedauer",
    tourAction: "Reiseverlauf und Preis",
    planTile: {
      title: "Nichts Passendes dabei?",
      titleOne: "Lieber eine andere Reise?",
      body: "Nennen Sie uns Ihre Reisetage und Städte, und wir planen die Reise rund um Sie.",
      action: "Mit uns planen",
    },
  },
  cities: {
    beijing: "Große Mauer, Verbotene Stadt und Hutongs",
    shanghai: "Der Bund, alte Gassen und ein einfacher Ausflug nach Suzhou",
    xian: "Terrakotta-Armee, Stadtmauer, muslimisches Viertel",
    chengdu: "Pandas, Teehäuser und Sichuan-Küche",
    guangzhou: "Dim Sum am Morgen, alte Arkadenstraßen und der Perlfluss",
    hangzhou: "Der Westsee und die Teehügel von Longjing",
    zhangjiajie: "Sandsteinsäulenwälder und der Tianmen-Berg",
    chongqing: "Eine Stadt am Hang, Feuertopf und der Jangtse",
  },
  themes: {
    "first-time-in-china": {
      metadata: {
        title: "Erste Chinareise: private Routen nach Reisedauer",
        description:
          "Sie planen Ihre erste Reise nach China? Beginnen Sie mit der Zeit, die Sie haben: Peking, Xi’an und Shanghai in einer Woche, der Li-Fluss bei Guilin in zehn Tagen, eine Jangtse-Kreuzfahrt in zwölf Tagen, Pandas in zwei Wochen. Jede Route hat einen veröffentlichten Reiseverlauf und Preis.",
      },
      name: "Zum ersten Mal in China",
      teaser: "Fertig geplante private Routen für eine erste Reise, sortiert nach der Zeit, die Sie haben.",
      imageAlt: "Ein restaurierter Abschnitt der Großen Mauer auf Bergkämmen nördlich von Peking",
      h1Lines: ["Zum ersten Mal in China?", "Wie viel Zeit haben Sie?"],
      lede:
        "Die Große Mauer, die Terrakotta-Armee und der Bund in Shanghai: Dafür kommen die meisten, die China zum ersten Mal besuchen. Hier finden Sie fertig geplante private Routen nach Reisedauer, jede mit Reiseverlauf und Preis auf ihrer eigenen Seite.",
      groups: {
        week: {
          title: "Etwa eine Woche",
          note: "Der Klassiker ist Peking, Xi’an und Shanghai. Wer in einer Region bleiben möchte, wählt Shanghai mit Suzhou und Hangzhou oder Peking allein.",
        },
        "ten-days": {
          title: "Etwa zehn Tage",
          note: "Ergänzen Sie die drei Städte um den Li-Fluss bei Guilin, oder tauschen Sie Shanghai gegen Hongkong und fliegen Sie von dort nach Hause.",
        },
        "two-weeks": {
          title: "12 Tage bis zwei Wochen",
          note: "Mehr Nächte in jeder Stadt, oder zusätzlich eine Jangtse-Kreuzfahrt oder die Pandas von Chengdu.",
        },
      },
      citiesTitle: "Städte auf diesen Routen",
      citiesLede: "Möchten Sie eine Stadt kennenlernen, bevor Sie eine Route wählen?",
      servicesTitle: "Andere Städte oder eine andere Dauer?",
      servicesLede: "Passt keine Route, planen wir eine rund um Sie. Oder buchen Sie nur Eintrittskarten oder nur eine Reiseleitung.",
    },
  },
};

const arabic: TravelInspirationEditionCopy = {
  home: "الرئيسية",
  destinations: "الوجهات",
  fromCities: { lead: "أو ابدأ بموضوع:", label: "أفكار السفر" },
  breadcrumb: "مسار الصفحة",
  hub: {
    metadata: {
      title: "أفكار للسفر إلى الصين حسب الموضوع",
      description:
        "أفكار للسفر إلى الصين حسب الموضوع، لكل منها برامج خاصة جاهزة، إضافة إلى أبرز ما تتميز به كل مدينة من ثماني مدن.",
    },
    h1: "أفكار السفر",
    lede: "لا تعرف من أين تبدأ؟ اختر موضوعاً، فلكل موضوع برامج جاهزة. أو ابدأ بمدينة.",
    themesTitle: "حسب الموضوع",
    themeAction: "اطّلع على البرامج",
    routeCount: (count) => arabicCount(count, { one: "برنامج واحد", two: "برنامجان", few: "برامج", many: "برنامجاً" }),
    citiesTitle: "حسب المدينة",
    citiesLede: "سطر واحد عن كل مدينة. افتح إحداها لترى كيف تخطط أيامك فيها.",
    allCities: "قارن بين المدن",
    ctaTitle: "لم تجد موضوعاً يناسبك؟",
    ctaBody: "أخبرنا إلى أين تريد الذهاب وكم من الوقت لديك، وسنخطط الرحلة كلها على مقاسك.",
    allTours: "جميع الرحلات",
  },
  theme: {
    facts: (routes, min, max) => `${arabicCount(routes, { one: "برنامج خاص واحد", two: "برنامجان خاصان", few: "برامج خاصة", many: "برنامجاً خاصاً" })} · ${min}–${max} ${max >= 3 && max <= 10 ? "أيام" : "يوماً"}`,
    jumpToRoutes: "اطّلع على البرامج",
    routesTitle: "البرامج حسب مدة الرحلة",
    tourAction: "البرنامج والسعر",
    planTile: {
      title: "لا يناسبك أي منها؟",
      titleOne: "تريد رحلة مختلفة؟",
      body: "أخبرنا بعدد أيامك والمدن التي تريدها، وسنخطط الرحلة على مقاسك.",
      action: "خطّطها معنا",
    },
  },
  cities: {
    beijing: "سور الصين العظيم والمدينة المحرمة وأزقة الهوتونغ",
    shanghai: "البوند والأزقة القديمة ورحلة سهلة إلى سوتشو",
    xian: "جيش التيراكوتا وسور المدينة والحي المسلم",
    chengdu: "الباندا وبيوت الشاي ومطبخ سيتشوان",
    guangzhou: "صباحات الديم سم والشوارع القديمة ذات الأروقة ونهر اللؤلؤ",
    hangzhou: "البحيرة الغربية وتلال شاي لونغجينغ",
    zhangjiajie: "غابات أعمدة الحجر الرملي وجبل تيانمن",
    chongqing: "مدينة على السفوح، والقِدر الساخن، ونهر اليانغتسي",
  },
  themes: {
    "first-time-in-china": {
      metadata: {
        title: "رحلتك الأولى إلى الصين: برامج خاصة حسب مدة الرحلة",
        description:
          "تخطط لرحلتك الأولى إلى الصين؟ ابدأ بالمدة المتاحة لك: بكين وشيآن وشنغهاي في أسبوع، ونهر لي في قويلين في عشرة أيام، ورحلة نهرية على اليانغتسي في اثني عشر يوماً، والباندا في أسبوعين. لكل برنامج مسار وسعر منشوران.",
      },
      name: "رحلتك الأولى إلى الصين",
      teaser: "برامج خاصة جاهزة لرحلة أولى، مرتبة حسب الوقت المتاح لك.",
      imageAlt: "جزء مرمَّم من سور الصين العظيم على قمم الجبال شمال بكين",
      h1Lines: ["رحلتك الأولى إلى الصين؟", "كم من الوقت لديك؟"],
      lede:
        "سور الصين العظيم وجيش التيراكوتا والبوند في شنغهاي هي ما يأتي من أجله معظم الزوار في رحلتهم الأولى. فيما يلي برامج خاصة جاهزة حسب مدة الرحلة، لكل منها مسارها وسعرها في صفحتها الخاصة.",
      groups: {
        week: {
          title: "نحو أسبوع",
          note: "البرنامج الكلاسيكي هو بكين وشيآن وشنغهاي. وللبقاء في منطقة واحدة، اختر شنغهاي مع سوتشو وهانغتشو، أو بكين وحدها.",
        },
        "ten-days": {
          title: "نحو عشرة أيام",
          note: "أضف نهر لي في قويلين إلى المدن الثلاث، أو ضع هونغ كونغ مكان شنغهاي وعُد بالطائرة من هناك.",
        },
        "two-weeks": {
          title: "من 12 يوماً إلى أسبوعين",
          note: "ليالٍ أكثر في كل مدينة، أو أضف رحلة نهرية على اليانغتسي أو باندا تشنغدو.",
        },
      },
      citiesTitle: "المدن في هذه البرامج",
      citiesLede: "تريد أن ترى كيف تبدو مدينة ما قبل أن تختار برنامجاً؟",
      servicesTitle: "مدن أخرى أو مدة مختلفة؟",
      servicesLede: "إذا لم يناسبك أي برنامج، يمكننا تخطيط برنامج على مقاسك. أو احجز تذاكر المعالم فقط، أو مرشداً فقط.",
    },
  },
};

const japanese: TravelInspirationEditionCopy = {
  home: "ホーム",
  destinations: "目的地",
  fromCities: { lead: "テーマから探すこともできます：", label: "旅のアイデア" },
  breadcrumb: "現在地",
  hub: {
    metadata: {
      title: "中国旅行のアイデア：テーマで選ぶ旅",
      description:
        "テーマ別の中国旅行のアイデア。テーマごとにすぐ選べるプライベートルートがあり、8つの都市それぞれの魅力も紹介します。",
    },
    h1: "旅のアイデア",
    lede: "どこから始めればよいか迷ったら、テーマを選んでください。テーマごとにすぐ選べるルートがあります。都市から探すこともできます。",
    themesTitle: "テーマ別",
    themeAction: "ルートを見る",
    routeCount: (count) => `${count}本のルート`,
    citiesTitle: "都市別",
    citiesLede: "各都市の特徴をひとことで。都市のページを開くと、現地での日程の組み方がわかります。",
    allCities: "都市を比べる",
    ctaTitle: "合うテーマがありませんか？",
    ctaBody: "行きたい場所と日数を教えてください。あなたに合わせて旅全体を計画します。",
    allTours: "ツアー一覧",
  },
  theme: {
    facts: (routes, min, max) => `${routes}本のプライベートルート · ${min}〜${max}日間`,
    jumpToRoutes: "ルートを見る",
    routesTitle: "旅の日数別のルート",
    tourAction: "旅程と料金",
    planTile: {
      title: "合うものがありませんか？",
      titleOne: "別の旅をお考えですか？",
      body: "日数と都市を教えていただければ、あなたに合わせて旅を計画します。",
      action: "一緒に計画する",
    },
  },
  cities: {
    beijing: "万里の長城、故宮、胡同",
    shanghai: "外灘、古い路地、蘇州への手軽な小旅行",
    xian: "兵馬俑、城壁、回族街",
    chengdu: "パンダ、茶館、四川料理",
    guangzhou: "朝の飲茶、騎楼の古い街並み、珠江",
    hangzhou: "西湖と龍井の茶畑の丘",
    zhangjiajie: "砂岩の石柱の森と天門山",
    chongqing: "坂の街、火鍋、長江",
  },
  themes: {
    "first-time-in-china": {
      metadata: {
        title: "はじめての中国旅行：日数で選ぶプライベートルート",
        description:
          "はじめての中国旅行を計画中なら、まずは日数から。1週間なら北京・西安・上海、10日間なら桂林の漓江、12日間なら長江クルーズ、2週間ならパンダまで。各ルートに旅程と料金を掲載しています。",
      },
      name: "はじめての中国",
      teaser: "はじめての旅にすぐ選べるプライベートルートを、日数別にご紹介します。",
      imageAlt: "北京の北、山の尾根に続く修復された万里の長城",
      h1Lines: ["はじめての中国ですか？", "日数はどのくらいですか？"],
      lede:
        "万里の長城、兵馬俑、上海の外灘は、はじめて中国を訪れる人の多くが目当てにする場所です。以下は日数別のプライベートルートで、それぞれのページに旅程と料金を掲載しています。",
      groups: {
        week: {
          title: "1週間前後",
          note: "定番は北京・西安・上海。1つの地域にとどまるなら、上海と蘇州・杭州、または北京だけの旅を。",
        },
        "ten-days": {
          title: "10日前後",
          note: "3都市に桂林の漓江を加えるか、上海の代わりに香港を訪れ、そこから帰国します。",
        },
        "two-weeks": {
          title: "12日〜2週間",
          note: "各都市の滞在を延ばすか、長江クルーズや成都のパンダを加えます。",
        },
      },
      citiesTitle: "これらのルートで訪れる都市",
      citiesLede: "ルートを選ぶ前に、都市の様子を見てみませんか？",
      servicesTitle: "ほかの都市や日数をご希望ですか？",
      servicesLede: "合うルートがなければ、あなたに合わせて計画します。観光チケットだけ、ガイドだけのご依頼もできます。",
    },
  },
};

const copy: Readonly<Record<TravelInspirationEditionLocale, TravelInspirationEditionCopy>> = {
  fr: french,
  es: spanish,
  de: german,
  ar: arabic,
  ja: japanese,
};

export function getTravelInspirationEditionCopy(language: TravelInspirationEditionLocale): TravelInspirationEditionCopy {
  return copy[language];
}
