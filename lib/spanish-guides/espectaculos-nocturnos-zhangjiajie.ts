import type { SpanishGuide } from "../spanishGuideTypes";

export const espectaculosNocturnosZhangjiajie: SpanishGuide = {
  slug: "espectaculos-nocturnos-zhangjiajie",
  sourceGuideId: "best-zhangjiajie-night-show",
  title: "Espectáculos nocturnos en Zhangjiajie: cuál elegir",
  headline: "Espectáculos de noche en Zhangjiajie: Tianmen Fox Fairy, Charming Xiangxi o Eternal Love",
  description:
    "Tianmen Fox Fairy, Charming Xiangxi o Eternal Love: qué espectáculo nocturno de Zhangjiajie encaja según su hotel, el día que ha tenido y la mañana siguiente.",
  navTitle: "Espectáculos en Zhangjiajie",
  heroImage: {
    src: "/images/guides/best-zhangjiajie-night-show/night-show-decision-1536.webp",
    width: 1536,
    height: 1024,
    alt: "Ilustración de una montaña de noche con una puerta iluminada cerca de la cima, una larga escalera hasta ella y la luna",
  },
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  sourceReviewedDate: "2026-10-19",
  tourSlugs: [
    "zhangjiajie-forest-4-day-private-tour",
    "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  ],
  offers: [
    {
      id: "zhangjiajie-4-day",
      afterBlockId: "compare-note",
      kind: "tour",
      tourSlug: "zhangjiajie-4-day-private-tour",
      label: "Zhangjiajie en 4 días",
      note: "Si su viaje cae en un festivo chino, lo difícil es el día, no la noche. El distrito de Wulingyuan pidió disculpas públicamente por las largas esperas del 2 de mayo de 2025 en los ascensores, teleféricos y autobuses del parque, y un visitante que estuvo allí el 2 y el 3 de mayo sumó más de 9 horas de cola en dos días, unas dos de ellas para subir en el ascensor Bailong. En nuestro viaje de 4 días, el guía planifica la hora de entrada y el sentido de la visita del Parque Forestal para entrar temprano, antes de las horas de más gente. El viaje incluye también el puente de cristal del Gran Cañón y la montaña Tianmen, con vehículo privado. Los espectáculos no están incluidos; si quiere ir a uno, le organizamos el coche de esa noche.",
      action: "Ver el itinerario y el precio",
    },
    {
      id: "zhangjiajie-forest-4-day",
      afterBlockId: "car-copy",
      kind: "tour",
      tourSlug: "zhangjiajie-forest-4-day-private-tour",
      label: "Bosques de Zhangjiajie en 4 días",
      note: "Si prefiere dormir junto al parque, este es su viaje: tres noches en Wulingyuan, donde están Charming Xiangxi y Eternal Love, con guía de habla inglesa todo el día del Parque Forestal. La noche de llegada incluye 72 Qilou, la Torre de las 72 Maravillas, con traslado privado de ida y vuelta, y el día 3, la montaña Tianmen, o el lago Baofeng si hace mal tiempo. A diferencia del otro viaje de 4 días, no incluye el puente de cristal.",
      action: "Ver el itinerario y el precio",
    },
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "No hay un espectáculo mejor para todos. Si duerme en la ciudad de Zhangjiajie y quiere una historia al aire libre, mire primero Tianmen Fox Fairy, en el cañón de la montaña Tianmen. Si duerme en Wulingyuan, junto al Parque Forestal, compare Charming Xiangxi, un programa de música y danzas populares del oeste de Hunan, con Eternal Love, una gran producción de teatro. Y si el grupo está cansado o al día siguiente madruga, la mejor opción es no ir a ninguno.",
      },
      {
        id: "decision-grid",
        type: "comparison",
        title: "Empiece por dónde duerme",
        columns: [
          {
            heading: "Hotel en la ciudad",
            body: "Mire primero Tianmen Fox Fairy.",
            items: ["Solo si la temporada, el tiempo y la vuelta al hotel funcionan en su fecha"],
          },
          {
            heading: "Hotel en Wulingyuan",
            body: "Compare dos formatos cercanos.",
            items: ["Danzas populares en Charming Xiangxi o gran teatro en Eternal Love"],
          },
          {
            heading: "Madrugón al día siguiente",
            body: "Primero, dormir.",
            items: ["Un buen espectáculo puede ser una mala decisión para el viaje"],
          },
        ],
      },
      { id: "compare-heading", type: "heading", level: 2, text: "Los tres espectáculos, comparados" },
      {
        id: "compare-table",
        type: "table",
        caption: "Formato y consecuencia para la ruta",
        columns: ["Espectáculo", "Formato", "Hotel más cómodo", "Para quién", "Riesgo principal"],
        rows: [
          ["Tianmen Fox Fairy (天门狐仙)", "Historia de amor al aire libre en un escenario natural de montaña", "Ciudad de Zhangjiajie", "Quien quiere el paisaje real y una sola historia continua", "Temporada, lluvia, temperatura, visibilidad de los subtítulos y vuelta tardía"],
          ["Charming Xiangxi (魅力湘西)", "Programa de música, danza y costumbres populares del oeste de Hunan", "Wulingyuan", "Quien prefiere números cortos, vestuario y música popular", "Cansancio después del parque, sesiones que cambian y apoyo en inglés desigual"],
          ["Eternal Love (张家界千古情)", "Gran producción de teatro dentro de un parque de espectáculos", "Wulingyuan", "Quien busca tecnología escénica y un teatro cubierto", "El parque entero ocupa más tiempo que el espectáculo principal"],
        ],
      },
      {
        id: "compare-note",
        type: "paragraph",
        text: "La tabla no incluye precios ni horarios a propósito: son datos de reserva para una fecha concreta. Las sesiones, el programa, las pantallas de subtítulos, los planos de asientos, las normas para niños y lo que pasa si llueve hay que comprobarlos para el día de su visita.",
      },
      {
        id: "how-to-book",
        type: "callout",
        tone: "decision",
        title: "Cómo se reserva",
        body: "Escríbanos en español por WhatsApp o por correo con sus fechas, el número de viajeros y el viaje o el traslado que le interesa. Respondemos en un plazo de 12 horas con el presupuesto completo por escrito. Y el mismo planificador le atiende de principio a fin: desde esa primera respuesta hasta el último día del viaje. Los guías hablan inglés y, si prefiere hacer el viaje en español, hay guía de habla hispana disponible en todas las ciudades de la ruta, con un suplemento según ciudad y temporada, que confirmamos en su presupuesto. Para reservar se paga un 30 % de depósito mediante un enlace de pago seguro de VBill, que acepta tarjetas de América Latina; el resto, al llegar. Somos una agencia de viajes con licencia en Pekín (L-BJ10587). Los guías y los conductores son nuestros, y no hay paradas obligatorias en tiendas: el tiempo del viaje es para lo que usted vino a ver.",
      },
      { id: "need-heading", type: "heading", level: 2, text: "Antes de comparar entradas: ¿necesita un espectáculo?" },
      {
        id: "need-copy",
        type: "paragraph",
        text: "Un espectáculo en Zhangjiajie es opcional. La pregunta no es solo si vale lo que cuesta la entrada, sino si la noche entera mejora el viaje una vez sumados el día de visitas, la cena, la entrada, la salida entre la multitud y la mañana siguiente. Saltárselos suele ser sensato cuando:",
      },
      {
        id: "skip-list",
        type: "list",
        items: [
          "el grupo viene de un día exigente en el Parque Forestal o en la montaña Tianmen;",
          "esa noche tiene que cambiar de hotel o cruzar entre Wulingyuan y la ciudad;",
          "viajan padres mayores, niños pequeños o alguien con poca movilidad que necesita descansar;",
          "al día siguiente hay una entrada temprana al parque, un tren o un vuelo;",
          "el tiempo pone en duda el espectáculo al aire libre o solo queda una sesión tardía.",
        ],
      },
      { id: "evening-heading", type: "heading", level: 2, text: "Elija el espectáculo por la noche entera" },
      {
        id: "evening-table",
        type: "table",
        caption: "Dónde acaba el día, dónde duerme y qué pasa mañana",
        columns: ["Fin del día y hotel", "Mañana siguiente", "Lo más realista"],
        rows: [
          ["Termina el Parque Forestal; duerme en Wulingyuan", "Otro día normal de parque", "Comparar Charming Xiangxi y Eternal Love; no ir si el grupo está agotado"],
          ["Termina el Parque Forestal; se muda a la ciudad", "Entrada temprana a Tianmen", "Normalmente, ningún espectáculo: la cena, el cambio de hotel y dormir ya llenan la noche"],
          ["Termina el día en Tianmen; duerme en la ciudad", "Salida tarde o día de viaje", "Tianmen Fox Fairy, si la temporada, el tiempo y el traslado funcionan"],
          ["Noche de llegada tras un viaje largo", "Entrada temprana al parque", "Cenar y descansar: con un retraso, un espectáculo con hora fija se complica"],
          ["Wulingyuan con niños", "Día más tranquilo", "Comparar el tiempo total de Eternal Love con la sesión y el final reales de Charming Xiangxi"],
        ],
      },
      {
        id: "base-copy",
        type: "paragraph",
        text: "La ciudad de Zhangjiajie sirve para la montaña Tianmen y las conexiones de tren; Wulingyuan, para el Parque Forestal Nacional y el Gran Cañón. Según la guía de transporte del gobierno de Hunan, entre la ciudad y Wulingyuan hay unos 40 minutos por carretera en condiciones normales. Tómelo como una escala de distancia, no como el tiempo de vuelta al hotel después de un espectáculo lleno.",
      },
      { id: "shows-heading", type: "heading", level: 2, text: "Qué ofrece cada espectáculo" },
      { id: "fox-heading", type: "heading", level: 3, text: "Tianmen Fox Fairy: la historia al aire libre" },
      {
        id: "fox-copy",
        type: "paragraph",
        text: "Este gran musical en vivo usa el cañón de la montaña Tianmen como escenario natural y cuenta la historia de amor entre un hombre y un espíritu zorro. Es de temporada: la de 2026 empezó el 13 de marzo y la de 2025 terminó en diciembre, lo que no garantiza las fechas de los años siguientes. Encaja si valora el escenario real más que un teatro, prefiere una sola historia a una serie de números y duerme en la ciudad con energía para una noche entera.",
      },
      {
        id: "fox-subtitles",
        type: "paragraph",
        text: "Se habla de pantallas con subtítulos en inglés, pero no pudimos confirmar un plano de asientos actual con la posición de la pantalla. Si el inglés es imprescindible, pida a la taquilla del recinto el plano de su sesión con la pantalla marcada; el teléfono publicado por los medios oficiales del distrito de Yongding es el +86 744 8956666, en un aviso de 2023, así que confirme primero que habla con la taquilla actual. Pregunte también por los asientos cubiertos y qué pasa si llueve.",
      },
      { id: "xiangxi-heading", type: "heading", level: 3, text: "Charming Xiangxi: música y danzas populares" },
      {
        id: "xiangxi-copy",
        type: "paragraph",
        text: "En Wulingyuan, Charming Xiangxi presenta una serie de números de música, danza, vestuario y costumbres del oeste de Hunan, no un único drama continuo. Los medios oficiales locales contaron cuatro sesiones algunos días punta de la Fiesta de la Primavera de 2026: el horario crece con la demanda, pero cuatro sesiones no son lo normal. Su gran ventaja suele ser la ubicación, aunque eso no hace que una noche después del parque sea descansada. Pregunte qué partes funcionan esa noche y cuáles tienen apoyo visible en inglés desde su asiento.",
      },
      { id: "eternal-heading", type: "heading", level: 3, text: "Eternal Love: el gran teatro" },
      {
        id: "eternal-copy",
        type: "paragraph",
        text: "La producción de Songcheng en Wulingyuan combina la historia y las leyendas de Zhangjiajie con grandes efectos de luz, sonido y escenario. El espectáculo principal está dentro de un parque de espectáculos más amplio, así que la noche útil es más larga que la función. Es la opción de escenario más controlado de las tres, pero el propio operador avisa de que los espectáculos y las actividades pueden ajustarse o cancelarse por el tiempo o las condiciones del recinto. Confirme el horario del parque, la sesión principal y las normas para niños.",
      },
      {
        id: "qilou-callout",
        type: "callout",
        tone: "neutral",
        title: "¿Y la Torre de las 72 Maravillas?",
        body: "La Torre de las 72 Maravillas (七十二奇楼, también llamada 72 Qilou o 72 Wonder Tower) es un recinto nocturno del centro de la ciudad con arquitectura, luces, comida y tiendas, no un cuarto espectáculo con asiento fijo. Es más flexible, pero plantea las mismas preguntas: dónde está el hotel, cuánto cansancio hay y a qué hora acabará la noche.",
      },
      { id: "chain-heading", type: "heading", level: 2, text: "Un espectáculo de una hora no ocupa una hora" },
      {
        id: "chain-list",
        type: "list",
        ordered: true,
        items: [
          "Termina la visita del día",
          "Vuelta al hotel o traslado entre zonas",
          "Cena",
          "Recogida de entradas y margen para entrar",
          "Espectáculo o tiempo en el parque",
          "Salida entre la multitud",
          "Vuelta al hotel",
        ],
      },
      {
        id: "chain-copy",
        type: "paragraph",
        text: "Antes de comprar, apunte la noche entera, paso a paso. Lo que decide es esa noche completa sumada a la hora a la que empieza el día siguiente; a veces, un espectáculo menos llamativo es mejor porque encaja con el hotel y deja intacto el día siguiente.",
      },
      {
        id: "car-copy",
        type: "paragraph",
        text: "La vuelta es lo que más se complica: al terminar, todo el público sale a la vez y hay que encontrar transporte de noche, y entre la ciudad y Wulingyuan hay unos 40 minutos por carretera. Reserve un coche con conductor para esa noche: le esperamos a la salida y le llevamos al hotel. Los conductores son nuestros, el precio se confirma por escrito antes de pagar y respondemos en un plazo de 12 horas.",
        link: {
          label: "Reserve un coche con conductor para esa noche",
          href: "/es/services/private-car-and-driver/#car-enquiry",
        },
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre los espectáculos de Zhangjiajie",
        items: [
          {
            question: "¿Cuál es el mejor espectáculo de Zhangjiajie?",
            answer: "No hay uno mejor para todos. Tianmen Fox Fairy es la historia al aire libre, Charming Xiangxi el programa de danzas populares y Eternal Love el gran teatro. La respuesta cambia con el hotel, lo que cuesta la noche entera y la mañana siguiente.",
          },
          {
            question: "¿Merece la pena Tianmen Fox Fairy?",
            answer: "Puede merecerla si va por el escenario natural del cañón y la historia continua, y si la fecha, el tiempo y la vuelta al hotel funcionan. Es peor opción desde Wulingyuan o antes de un madrugón.",
          },
          {
            question: "¿Tianmen Fox Fairy tiene subtítulos en inglés?",
            answer: "Se habla de pantallas con subtítulos en inglés, pero no pudimos confirmar un plano actual con su posición. Si el inglés es imprescindible, pida a la taquilla el plano de su sesión con la pantalla marcada antes de pagar.",
          },
          {
            question: "¿Eternal Love es a cubierto?",
            answer: "El espectáculo principal es en un teatro, pero el parque de alrededor tiene otras actividades. El operador avisa de que los espectáculos y las actividades pueden ajustarse o cancelarse por el tiempo o las condiciones del recinto.",
          },
          {
            question: "¿Se puede ver un espectáculo después del Parque Forestal?",
            answer: "A menudo sí, si el hotel y el teatro están en Wulingyuan. Aun así, sume la salida del parque, la cena, la entrada, la función, la salida y la vuelta. Después de un día duro, descansar puede ser la mejor decisión.",
          },
          {
            question: "¿Qué pasa si llueve?",
            answer: "Depende del espectáculo. Tianmen Fox Fairy es el más expuesto, al aire libre; Charming Xiangxi puede tener partes exteriores y el parque de Eternal Love también puede cambiar. Pida las condiciones de cambio y reembolso vigentes antes de pagar.",
          },
        ],
      },
      {
        id: "next-links",
        type: "internal-links",
        title: "Prepare antes los días en Zhangjiajie",
        items: [
          {
            label: "Montañas de Avatar en Zhangjiajie",
            href: "/es/guias/montanas-de-avatar-china/",
            description: "El Parque Forestal Nacional, sus miradores y cuántos días hacen falta.",
          },
          {
            label: "Puente de cristal de Zhangjiajie, pasarelas de Tianmen o Parque Forestal",
            href: "/es/guias/puente-de-cristal-zhangjiajie/",
            description: "Tres lugares distintos con entradas distintas.",
          },
          {
            label: "Entradas a la montaña Tianmen",
            href: "/es/guias/tianmen-mountain-tickets-and-routes/",
            description: "La ruta que se vende, precios y punto de inicio.",
          },
          {
            label: "Zhangjiajie en 4 días: picos de arenisca, puente de cristal y montaña Tianmen",
            href: "/es/tours/zhangjiajie-4-day-private-tour/",
            description: "Viaje privado con precio publicado por persona.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes",
        items: [
          {
            label: "El distrito de Wulingyuan pide disculpas por las largas esperas del 2 de mayo de 2025",
            url: "https://m.gmw.cn/2025-05/04/content_1304029265.htm",
            publisher: "Guangming Online, del Centro de Medios del distrito de Wulingyuan",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Crónica de un visitante: más de 9 horas de espera en dos días, el 2 y el 3 de mayo de 2025",
            url: "https://www.36kr.com/p/3280487039377538",
            publisher: "36Kr",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Transporte en Wulingyuan: distancia por carretera desde la ciudad",
            url: "https://whhlyt.hunan.gov.cn/whhlyt/wldh2022jt/202208/t20220823_27716245.html",
            publisher: "Departamento de Cultura y Turismo de Hunan",
            reviewedAt: "2026-07-22",
          },
          {
            label: "Tianmen Fox Fairy: formato del espectáculo",
            url: "https://www.hnzjj.com/index.php/Ticket/show/13.html",
            publisher: "Plataforma de turismo de Zhangjiajie",
            reviewedAt: "2026-07-22",
          },
          {
            label: "Tianmen Fox Fairy: primera función de la temporada 2026, el 13 de marzo",
            url: "https://cn.chinadaily.com.cn/a/202603/15/WS69b678bfa310942cc49a3343.html",
            publisher: "China Daily",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Tianmen Fox Fairy: inicio de la temporada 2026",
            url: "https://www.zjj.gov.cn/c33/20260317/i1147792.html",
            publisher: "Gobierno municipal de Zhangjiajie",
            reviewedAt: "2026-07-22",
          },
          {
            label: "Tianmen Fox Fairy: fin de la temporada 2025",
            url: "https://www.zjj.gov.cn/c32/20251220/i1131089.html",
            publisher: "Gobierno municipal de Zhangjiajie",
            reviewedAt: "2026-07-22",
          },
          {
            label: "Charming Xiangxi: sesiones en los días punta de 2026",
            url: "https://www.wlynews.cn/content/646046/52/15709922.html",
            publisher: "Centro de Medios del distrito de Wulingyuan",
            reviewedAt: "2026-07-22",
          },
          {
            label: "Zhangjiajie Eternal Love: dirección y aviso sobre cambios por el tiempo",
            url: "https://www.songcn.com/show/9",
            publisher: "Songcheng",
            reviewedAt: "2026-10-19",
          },
          {
            label: "Teléfono de reservas publicado de Tianmen Fox Fairy (aviso de 2023)",
            url: "https://m.voc.com.cn/rmt/article/5921014.html",
            publisher: "Medios oficiales del distrito de Yongding",
            reviewedAt: "2026-09-09",
          },
        ],
      },
    ],
  },
};
