import type { SpanishGuide } from "../spanishGuideTypes";

export const tarjetaDeLlegadaChina: SpanishGuide = {
  slug: "tarjeta-de-llegada-china",
  sourceGuideId: "china-online-arrival-card",
  title: "Tarjeta de llegada a China: formulario digital gratis",
  headline: "Tarjeta de llegada digital a China: el formulario oficial, gratis y en español",
  description:
    "Casi todos los extranjeros rellenan la tarjeta de llegada a China. Es gratis, está en español y se hace en línea antes de volar. Pasos, plazos y webs falsas.",
  navTitle: "Tarjeta de llegada",
  heroImage: {
    src: "/images/guides/china-online-arrival-card/hero-1600.jpg",
    width: 1600,
    height: 1000,
    alt: "Vestíbulo de llegadas de la Terminal 1 del Aeropuerto Internacional de Pekín-Capital, fotografiado en noviembre de 2016 como imagen general de una llegada",
    credit: {
      text: "Foto: Tyg728, redimensionada por Homeground.",
      sourceLabel: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Beijing_Capital_International_Airport_T1_Arrival_hall_20161124.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  datePublished: "2026-10-11",
  dateModified: "2026-10-11",
  sourceReviewedDate: "2026-09-24",
  // Almost every visitor fills in the card, so every Spanish tour page links this guide.
  general: true,
  tourSlugs: [
    "beijing-xian-shanghai-8-day-private-tour",
    "beijing-xian-guilin-shanghai-10-day-private-tour",
  ],
  body: {
    schemaVersion: "1.0.0",
    blocks: [
      {
        id: "lead",
        type: "lead",
        text: "Casi todos los visitantes extranjeros tienen que rellenar la tarjeta de llegada a China, también quienes entran sin visado. Es gratuita y, desde el 20 de noviembre de 2025, se puede hacer en línea antes de volar: en la web de la Administración Nacional de Inmigración (s.nia.gov.cn/ArrivalCardFillingPC/), en su aplicación NIA 12367 o en su miniprograma dentro de WeChat o Alipay. El formulario web está en 13 idiomas, entre ellos el español (comprobado el 11 de octubre de 2026). Rellénela cuando tenga reservados el vuelo y el primer hotel; China no fija ningún plazo de 24 o 72 horas. Si no puede, se hace en el aeropuerto con un código QR, una máquina o una tarjeta en papel. La tarjeta registra su viaje; no es un visado.",
      },
      {
        id: "official-free",
        type: "callout",
        tone: "warning",
        title: "El formulario oficial no cuesta nada",
        body: "Empiece siempre en s.nia.gov.cn/ArrivalCardFillingPC/, en la aplicación NIA 12367 o en su miniprograma de WeChat o Alipay. Una web que cobra por la tarjeta de llegada, vende una aprobación urgente o pide un pago con tarjeta no es el servicio gratuito del gobierno. Deténgase antes de pagar y abra usted mismo la dirección oficial.",
        link: { href: "https://s.nia.gov.cn/ArrivalCardFillingPC/", label: "Abrir la tarjeta de llegada oficial y gratuita" },
      },
      { id: "timing-heading", type: "heading", level: 2, text: "Cuándo rellenarla: no hay plazo de 24 ni de 72 horas" },
      {
        id: "timing-copy",
        type: "paragraph",
        text: "Rellénela cuando tenga reservados el vuelo y el hotel de la primera noche y falten menos de tres meses para la llegada. El anuncio de la Administración Nacional de Inmigración no fija ningún plazo, y el selector de fecha de entrada del formulario web ofrecía fechas hasta tres meses vista cuando lo comprobamos. Recomendamos la semana anterior al vuelo: deja tiempo para corregir un error y poco para que cambien los planes. Los plazos de 72 y de 24 horas que citan algunas guías no proceden de la administración china. No invente un número de vuelo ni un hotel para enviarla antes.",
      },
      { id: "where-heading", type: "heading", level: 2, text: "Dónde se rellena: web, aplicación, WeChat, Alipay o en el aeropuerto" },
      {
        id: "channel-comparison",
        type: "comparison",
        columns: [
          {
            heading: "En línea, antes de viajar",
            items: [
              "Web: s.nia.gov.cn/ArrivalCardFillingPC/ en un ordenador, o s.nia.gov.cn/ArrivalCardFillingPhone/ en el móvil",
              "13 idiomas en el menú Language, entre ellos español, inglés y chino",
              "La aplicación NIA 12367 (移民局12367 en chino), o su miniprograma dentro de WeChat o Alipay",
              "Guarde el justificante sin conexión; también le llega una copia por correo electrónico",
            ],
          },
          {
            heading: "En el aeropuerto, en formato electrónico",
            items: [
              "Escanee el código QR oficial o use una máquina de autoservicio",
              "Tenga a mano el pasaporte y los datos del vuelo",
              "Pregunte al personal de frontera si los pasos o el idioma no están claros",
              "Rellenarla antes no evita la cola del control",
            ],
          },
          {
            heading: "En papel, en el aeropuerto",
            items: [
              "La administración indica que las tarjetas en papel siguen disponibles",
              "Copie con exactitud los datos del pasaporte y del vuelo",
              "Corrija un error de forma visible o pida otra tarjeta",
              "Es su alternativa si fallan el teléfono, la red o la web",
            ],
          },
        ],
      },
      { id: "prepare-heading", type: "heading", level: 2, text: "Qué tener a mano" },
      {
        id: "prepare-list",
        type: "list",
        items: [
          "El pasaporte de cada viajero: el formulario lee la página de la foto.",
          "El número de vuelo, el aeropuerto de llegada y la fecha local de llegada.",
          "La dirección completa del primer hotel, tal como figura en la confirmación de la reserva.",
          "Su teléfono y su correo electrónico, y el vuelo de vuelta o de continuación si ya está reservado.",
          "Los países o regiones que ha visitado en los últimos dos años.",
        ],
      },
      { id: "steps-heading", type: "heading", level: 2, text: "Cómo rellenarla, pantalla a pantalla" },
      {
        id: "steps-list",
        type: "list",
        ordered: true,
        items: [
          "Abra s.nia.gov.cn/ArrivalCardFillingPC/ (o /ArrivalCardFillingPhone/ en el móvil) desde un enlace guardado, o use la aplicación NIA 12367 o el miniprograma. Elija Español en el menú Language, seleccione la declaración de entrada y lea la lista de exenciones.",
          "Fotografíe la página de datos del pasaporte. El formulario lee sus datos; compruebe cada letra, número y fecha con el pasaporte.",
          "Datos básicos: tipo de documento, nombre, sexo, fecha de nacimiento, nacionalidad y número de pasaporte; cómo llega (avión, tren, barco o carretera), el número de vuelo, tren o barco, y la ciudad y el puesto de entrada; su teléfono y su correo electrónico.",
          "Tipo de entrada: el formulario pregunta si tiene un visado u otro permiso de entrada en vigor. Si entra sin visado, responda que no y elija la política de exención de visado que el formulario ofrezca para su pasaporte. Si le dice que no cumple los requisitos, deténgase y revise su pasaporte y su viaje.",
          "Datos personales: otros nombres, otra nacionalidad si la tiene, país y ciudad de nacimiento, y si este pasaporte se ha perdido o lo han robado alguna vez.",
          "Datos del viaje: motivo (turismo u ocio en unas vacaciones), fecha de entrada, ciudades que va a visitar y por las que transita, países o regiones visitados en los últimos dos años, su salida confirmada si está reservada y la dirección completa del primer alojamiento. También pregunta si le invita una empresa o una persona en China; en unas vacaciones, responda que no.",
          "Acompañantes: puede añadir acompañantes (la lista admite hasta diez), así que un adulto puede rellenar la tarjeta de toda la familia. Introduzca los datos del pasaporte de cada persona; no copie el número de pasaporte ni la dirección de una en la ficha de otra.",
          "Firme en el recuadro de la pantalla y envíe. Recibe un justificante de la declaración de entrada en pantalla y por correo electrónico. Guárdelo sin conexión y lleve el pasaporte y las reservas de vuelo y hotel: los agentes siguen inspeccionando a todo el mundo.",
        ],
      },
      {
        id: "steps-note",
        type: "paragraph",
        text: "Si el formulario en vivo difiere de estos pasos, siga su redacción y responda solo a lo que pregunte. Comprobamos los pasos el 24 de septiembre de 2026; el vídeo oficial figura en las fuentes. No envíe una copia de su pasaporte a Homeground ni a un intermediario no oficial para que le rellenen la tarjeta.",
      },
      { id: "change-heading", type: "heading", level: 2, text: "Qué hacer si cambian los datos o falla el formulario" },
      {
        id: "recovery-table",
        type: "table",
        caption: "Si cambian sus planes o algo sale mal",
        columns: ["Problema", "Qué hacer primero", "Si eso no funciona"],
        rows: [
          [
            "Cambia el vuelo o la fecha de llegada",
            "Vuelva a abrir el servicio oficial y corrija la tarjeta, o envíe una nueva si se lo permite.",
            "Lleve la reserva nueva y el justificante antiguo, y dígaselo al agente en el mostrador.",
          ],
          [
            "Cambia el primer hotel",
            "Actualice la dirección del mismo modo, con la nueva confirmación de la reserva.",
            "Enseñe la nueva reserva en el mostrador; rellene una tarjeta en papel si el agente se lo pide.",
          ],
          [
            "Un error en el nombre, el número o la fecha de caducidad del pasaporte",
            "No viaje con un error conocido: corríjalo o envíe una tarjeta nueva por el servicio oficial.",
            "Llame a la línea de inmigración 12367, o pregunte a los agentes en el puesto fronterizo.",
          ],
          [
            "La web no carga o el teléfono no tiene datos",
            "Pruebe con otra conexión y teclee usted la dirección en lugar de pulsar un anuncio del buscador.",
            "En el aeropuerto, escanee el código QR oficial, use una máquina de autoservicio o pida una tarjeta en papel.",
          ],
          [
            "No guardó el justificante",
            "Busque la copia que le llegó por correo o vuelva a abrir el servicio oficial. No pague nunca a una web por recuperarlo.",
            "Si el agente no encuentra su tarjeta, rellénela de nuevo en el aeropuerto.",
          ],
        ],
      },
      { id: "who-heading", type: "heading", level: 2, text: "Quién no necesita la tarjeta de llegada" },
      {
        id: "who-copy",
        type: "paragraph",
        text: "El formulario oficial enumera ocho exenciones, y ninguna cubre unas vacaciones normales, tampoco en un viaje privado o en un circuito organizado en el que cada viajero entra con su propio pasaporte.",
      },
      {
        id: "who-list",
        type: "list",
        items: [
          "Titulares de una tarjeta de residencia permanente de extranjero en China.",
          "Titulares no chinos del permiso de viaje a China continental para residentes de Hong Kong y Macao.",
          "Miembros de un grupo turístico formal exento de visado, o titulares de un visado de grupo: regímenes organizados por una agencia registrada, como los grupos de crucero.",
          "Tránsito directo de menos de 24 horas sin salir de la zona restringida del puesto fronterizo.",
          "Pasajeros que entran y salen en el mismo crucero.",
          "Viajeros que usan los canales electrónicos de paso rápido, reservados a quienes cumplen sus requisitos.",
          "Empleados extranjeros de medios de transporte que cruzan la frontera.",
          "Viajeros acogidos formalmente a la presentación centralizada de documentos de entrada y salida.",
        ],
      },
      { id: "fraud-heading", type: "heading", level: 2, text: "Si ha caído en una web falsa o de pago" },
      {
        id: "fraud-list",
        type: "list",
        ordered: true,
        items: [
          "Corte la sesión. No envíe más imágenes del pasaporte, datos de pago, códigos de verificación ni selfis.",
          "Haga una captura de la dirección de la web, el importe, la hora y cualquier recibo o mensaje; los necesitará para reclamar la devolución.",
          "Si introdujo los datos de su tarjeta, llame a su banco al número que figura en la tarjeta y pida que la bloqueen y que disputen el cargo.",
          "Cambie cualquier contraseña que haya reutilizado en esa web.",
          "Abra el servicio oficial tecleando la dirección del gobierno y envíe allí la información correcta. Un recibo de pago de otra web no es un justificante oficial.",
          "Para dudas sobre la tarjeta de llegada, la línea de inmigración de China es el 12367.",
        ],
      },
      { id: "boundary-heading", type: "heading", level: 2, text: "Lo que la tarjeta de llegada no cubre" },
      {
        id: "boundary-list",
        type: "list",
        items: [
          "El permiso para entrar: eso depende del visado o de la exención de visado, de su pasaporte y de la decisión del agente de frontera. Una tarjeta enviada no garantiza la entrada ni una cola más rápida.",
          "La aduana va aparte: declare alimentos, medicamentos, efectivo por encima de los límites o mercancías sujetas a derechos en el canal rojo; si no, pase por el canal verde.",
          "El registro del alojamiento: los hoteles le registran ante la policía al hacer la entrada. Si se aloja con familiares o en una casa particular, usted o su anfitrión deben registrar la estancia en 24 horas. Desde el 21 de septiembre de 2026 existe en todo el país un registro en línea para estancias fuera de hoteles, y el registro presencial en la comisaría local sigue disponible.",
        ],
      },
      {
        id: "next",
        type: "internal-links",
        title: "Siga preparando el viaje",
        items: [
          {
            label: "¿Visado para China con pasaporte español?",
            href: "/es/guias/visado-china-espanoles/",
            description: "30 días sin visado hasta el 31 de diciembre de 2026: qué cubre y qué no.",
          },
          {
            label: "Cómo pagar en China",
            href: "/es/guias/como-pagar-en-china/",
            description: "Alipay, WeChat Pay, tarjeta y efectivo, con las comisiones y los límites de 2026.",
          },
          {
            label: "Viajes privados a China con precio publicado",
            href: "/es/tours/",
            description: "Rutas privadas con el itinerario día a día y el precio por persona.",
          },
        ],
      },
      {
        id: "faq",
        type: "faq",
        title: "Preguntas sobre la tarjeta de llegada a China",
        items: [
          {
            question: "¿Existe una tarjeta de llegada digital para China?",
            answer:
              "Sí. Desde el 20 de noviembre de 2025, la Administración Nacional de Inmigración de China ofrece una tarjeta de llegada en línea y gratuita en s.nia.gov.cn/ArrivalCardFillingPC/, en la aplicación NIA 12367 y en sus miniprogramas dentro de WeChat y Alipay. Se rellena antes de volar, cuando el vuelo y el primer hotel están reservados; si no, se hace en el aeropuerto con el código QR, una máquina o una tarjeta en papel.",
          },
          {
            question: "¿La tarjeta de llegada a China está en español?",
            answer:
              "Sí. El menú Language del formulario web oficial ofrecía 13 idiomas cuando lo comprobamos el 11 de octubre de 2026, entre ellos español, inglés, francés y chino.",
          },
          {
            question: "¿Los españoles tienen que rellenar la tarjeta de llegada si entran sin visado?",
            answer:
              "Sí. Entrar sin visado no exime de la tarjeta de llegada, y viajar en un circuito o en un viaje privado tampoco: la exención de grupo se refiere a regímenes formales de grupo exento de visado. Rellénela en línea antes del vuelo o en el aeropuerto si la web no carga.",
          },
          {
            question: "¿Cuándo hay que rellenar la tarjeta de llegada?",
            answer:
              "Cuando tenga reservados el vuelo y el primer hotel. China no fija ningún plazo de 24 o 72 horas, y el formulario web ofrece fechas de entrada hasta tres meses vista. Recomendamos la semana anterior al vuelo, que deja tiempo para corregir errores.",
          },
          {
            question: "¿Puedo rellenar la tarjeta de llegada de toda mi familia?",
            answer:
              "Sí. El formulario oficial permite añadir acompañantes (la lista admite hasta diez), así que un adulto puede añadir a sus familiares. Introduzca los datos del pasaporte de cada persona; todos pasan igualmente el control de frontera.",
          },
          {
            question: "¿Hace falta una tarjeta nueva cada vez que se entra en China?",
            answer:
              "Sí. La tarjeta registra una entrada: su fecha, su puesto fronterizo y su vuelo o tren. Después de una escapada a Hong Kong o Macao, por ejemplo, se rellena una tarjeta nueva para la siguiente entrada en China continental.",
          },
          {
            question: "¿La tarjeta de llegada en línea es gratis?",
            answer:
              "Sí. El servicio oficial de la Administración Nacional de Inmigración no cuesta nada. Una web que cobra, vende una aprobación urgente o pide un pago con tarjeta no es el servicio oficial: deténgase antes de pagar y abra usted mismo s.nia.gov.cn/ArrivalCardFillingPC/.",
          },
          {
            question: "¿Es obligatoria la tarjeta de llegada digital?",
            answer:
              "La tarjeta de llegada es obligatoria para casi todos los visitantes extranjeros. Rellenarla en línea no lo es: se puede hacer en el aeropuerto con el código QR, una máquina o una tarjeta en papel. Hacerla antes de volar solo quita una tarea en la sala de llegadas.",
          },
        ],
      },
      {
        id: "sources",
        type: "sources",
        title: "Fuentes oficiales",
        items: [
          {
            label: "Servicio oficial de la tarjeta de llegada en línea: instrucciones, ocho exenciones y formulario",
            url: "https://s.nia.gov.cn/ArrivalCardFillingPC/",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-10-11",
          },
          {
            label: "Anuncio de 2025 sobre la tarjeta de llegada en línea",
            url: "https://en.nia.gov.cn/n147413/c187308/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Cómo enviar la tarjeta de llegada en línea (vídeo oficial)",
            url: "https://en.nia.gov.cn/n147418/n147463/c195170/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Aviso sobre webs fraudulentas de la tarjeta de llegada",
            url: "https://en.nia.gov.cn/n147418/n147463/c191530/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Regímenes de entrada sin visado para grupos y por regiones (actualizado el 20 de agosto de 2026)",
            url: "https://en.nia.gov.cn/n147418/n147463/c180637/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Ley de Administración de Entradas y Salidas, artículo 39: registro del alojamiento en 24 horas",
            url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-09-24",
          },
          {
            label: "Registro en línea en todo el país para estancias fuera de hoteles desde el 21 de septiembre de 2026",
            url: "https://www.nia.gov.cn/n897453/c1806111/content.html",
            publisher: "Administración Nacional de Inmigración de China",
            reviewedAt: "2026-09-25",
          },
          {
            label: "Fotografía de cabecera: vestíbulo de llegadas de la Terminal 1 de Pekín-Capital, de Tyg728 (CC BY-SA 4.0)",
            url: "https://commons.wikimedia.org/wiki/File:Beijing_Capital_International_Airport_T1_Arrival_hall_20161124.jpg",
            publisher: "Wikimedia Commons",
            reviewedAt: "2026-08-20",
          },
        ],
      },
    ],
  },
};
