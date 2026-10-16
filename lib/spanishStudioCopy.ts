import { getHomegroundStudioCopy, type HomegroundStudioCopy } from './homegroundStudioI18n';
import { spanishGuideLanguageNote } from './spanishSite';

const original = getHomegroundStudioCopy('en');
const members: Record<string, Omit<HomegroundStudioCopy['members'][number], 'image'> & { alt: string }> = {
  evan: {
    id: 'evan', name: 'Evan', role: 'Dirección de viajes y coordinación intercultural',
    value: 'Convertir las dudas de un primer viaje a China en opciones claras que podamos valorar juntos.',
    bio: 'Graduado por la Universidad Sogang de Corea, Evan también ha vivido en Taiwán, Tailandia y Malasia. Esa experiencia le ayuda a entender las preguntas de quienes preparan su primer viaje a China: qué ciudades elegir, si los traslados son realistas o cómo será la comunicación. Define las líneas principales del viaje y explica las decisiones más complejas en inglés o coreano.',
    tags: ['Inglés', 'Coreano', 'Comunicación intercultural', 'Viajes entre varias ciudades'], alt: 'Evan leyendo en una librería',
  },
  yoyo: {
    id: 'yoyo', name: 'Yoyo', role: 'Diseño de itinerarios y coordinación de los detalles',
    value: 'Dar forma a tus ideas, aunque todavía estén dispersas, para construir un recorrido coherente.',
    bio: 'Su formación en contabilidad dio a Yoyo el gusto por las cosas bien organizadas. Convierte las primeras ideas en itinerarios realizables, comprobando el número de noches, las conexiones entre ciudades y los detalles que suelen pasarse por alto. Su experiencia con viajeros, especialmente en Pekín, la lleva a preguntarse siempre si el programa encaja realmente con quienes lo van a recorrer.',
    tags: ['Diseño del recorrido', 'Distribución de las noches', 'Revisión de los detalles', 'Conexiones entre ciudades'], alt: 'Yoyo junto a un lago de montaña durante un viaje por China',
  },
  tantan: {
    id: 'tantan', name: 'Tantan', role: 'Diseño de viajes y coordinación en Hunan',
    value: 'Tener en cuenta lo que ocurre sobre el terreno al preparar cada itinerario por Zhangjiajie.',
    bio: 'Tantan combina la preparación de viajes con su coordinación en Hunan, especialmente en Zhangjiajie, Changsha y Fenghuang. Sabe que un trayecto aparentemente sencillo sobre el papel puede complicarse por el tiempo en carretera, las colas o la meteorología. Su trabajo consiste en comprobar que el programa también funciona una vez allí.',
    tags: ['Zhangjiajie', 'Changsha', 'Fenghuang', 'Coordinación en Hunan'], alt: 'Tantan sonriendo junto a un elefante durante un viaje a Tailandia',
  },
  kevin: {
    id: 'kevin', name: 'Kevin', role: 'Diseño de viajes y organización local',
    value: 'Detectar problemas de coordinación antes de que afecten a un día de viaje.',
    bio: 'Kevin estudió inglés y empezó a trabajar como guía local y en la organización de viajes mientras estaba en la universidad, acumulando alrededor de cuatro años de experiencia práctica. Conoce las distintas etapas, desde la llegada y los traslados urbanos hasta la comunicación con los viajeros y el desarrollo de la estancia. Identifica dónde hace falta una coordinación especial entre las personas implicadas y comprueba que un programa atractivo siga siendo realizable cuando llega el viajero.',
    tags: ['Asistencia en inglés', 'Organización local', 'Seguimiento del viaje', 'Comprobación de los servicios'], alt: 'Kevin frente a la mezquita Putra durante un viaje a Malasia',
  },
  vivi: {
    id: 'vivi', name: 'Vivi', role: 'Atención al viajero y coordinación local',
    value: 'Ayudar a que cada viajero se sienta escuchado, informado y acompañado.',
    bio: 'Vivi aporta su experiencia en la atención al viajero y una forma cercana de comunicarse. Además de las visitas, se ocupa de que las respuestas lleguen a tiempo, la coordinación entre equipos sea clara y las peticiones de los viajeros se tengan en cuenta. Participa en las conversaciones y la organización local, prestando atención personal a los aspectos prácticos de la estancia.',
    tags: ['Comunicación con viajeros', 'Coordinación local', 'Enlace entre equipos', 'Asistencia durante el viaje'], alt: 'Vivi tomando una bebida durante una pausa en un viaje',
  },
};

export const spanishStudioCopy: HomegroundStudioCopy = {
  path: '/es/studio/',
  metadata: { title: 'Cómo prepara Homeground tu viaje a China', description: 'Tus fechas, tus intereses y tus reservas se convierten en un itinerario coherente, con servicios definidos por escrito y un equipo local a tu lado.', openGraphTitle: 'Cómo prepara Homeground un viaje a China' },
  eyebrow: 'Cómo preparamos tu viaje',
  title: 'De tus ideas a un viaje que funciona.',
  intro: 'Cuéntanos qué está decidido, qué te importa y qué falta por resolver. Un asesor principal construye un recorrido coherente, comprueba que funcione sobre el terreno y detalla el trabajo necesario antes de comenzar cualquier servicio de pago.',
  overview: {
    title: 'De la primera conversación al programa escrito',
    stages: [
      { label: '01 / Tu proyecto', title: 'Partir de tu situación', detail: 'Fechas, viajeros, lugares imprescindibles, ritmo, movilidad, reservas hechas y preguntas pendientes.' },
      { label: '02 / Nuestro trabajo', title: 'Escuchar, comprobar y dejarlo por escrito', detail: 'Un asesor revisa qué conexiones encajan, qué puede dar problemas y qué decisiones conviene tomar primero.' },
      { label: '03 / Tu programa', title: 'Organización y servicios concretos', detail: 'Recibes el documento acordado para tu viaje, con los servicios definidos juntos, en lugar de una lista genérica de lugares que visitar.' },
    ],
    termsLabel: '04 / Los plazos', termsTitle: 'Acordar los plazos antes de empezar un servicio de pago',
    terms: [{ label: 'Plazo', value: 'Fecha de entrega del documento acordado confirmada antes del pago' }],
  },
  collageLabel: 'Cinco integrantes del equipo Homeground China', peopleEyebrow: 'Quién se ocupa de cada detalle',
  peopleTitle: 'Distintas experiencias, un viaje preparado en equipo.',
  peopleIntro: 'Tu asesor principal mantiene el hilo de las conversaciones. Según lo que necesite el viaje, el resto del equipo aporta su conocimiento de los itinerarios, los destinos, la organización local y la atención al viajero.',
  peopleDetailsLabel: 'Trayectoria y experiencia',
  proof: { label: 'Homeground en cifras', people: 'personas en el equipo Homeground', guides: 'guías prácticas publicadas', tours: 'viajes publicados', languages: 'idiomas del sitio web' },
  members: original.members.map(member => {
    const { alt, ...text } = members[member.id];
    return { ...text, image: { ...member.image, alt } };
  }),
  trust: {
    eyebrow: 'Nuestra forma de trabajar', title: 'Qué ocurre después de tu primer mensaje.',
    body: 'Mantienes un interlocutor principal que conoce el viaje completo. La confirmación de viaje detalla qué organiza Homeground y qué asistencia está incluida durante la estancia.',
    inputsTitle: 'Lo que necesitamos saber',
    inputs: ['Fechas y puntos de llegada y salida', 'Quién viaja, el ritmo deseado y las necesidades de movilidad y habitaciones', 'Los lugares imprescindibles y las etapas a las que podrías renunciar', 'Las reservas ya hechas, una orientación de presupuesto y las decisiones que deban tomarse antes de una fecha concreta'],
    stepsTitle: 'Lo que hacemos',
    points: [
      { title: 'Entender tu proyecto', detail: 'Distinguimos lo que está fijado, lo que admite cambios y los datos que faltan y pueden afectar al recorrido.' },
      { title: 'Revisar el viaje completo', detail: 'Estudiamos juntos el orden de las ciudades, las noches, los traslados, el ritmo y las condiciones locales para que las etapas encajen.' },
      { title: 'Confirmar antes de comenzar un servicio de pago', detail: 'Detallamos por escrito el servicio adecuado, lo que incluye, el presupuesto y los siguientes pasos.' },
    ],
    deliverablesTitle: 'Lo que recibes',
    deliverables: ['Para un acompañamiento completo: un documento específico de tu viaje que detalla la preparación, las reservas y la asistencia local', 'Las condiciones de partida, las alternativas que valorar y las próximas decisiones para el servicio acordado'],
    boundary: `La primera consulta sobre un viaje privado es gratuita. Confirmamos la organización, los servicios incluidos y el presupuesto para tus fechas y tu grupo antes de reservar. ${spanishGuideLanguageNote}`,
  },
  cta: { label: 'El siguiente paso', title: '¿Qué lugares no te quieres perder?', body: 'Escríbenos por WhatsApp o deja tu correo electrónico. Un asesor te ayuda a concretar lo que falta por decidir y el siguiente paso. Los servicios de pago solo empiezan después de acordar qué incluyen, su precio y sus plazos.', button: 'Hablar de mi viaje con un asesor', secondaryButton: 'Ver todos los servicios' },
  homeLink: 'Conocer al equipo que prepara tu viaje',
};
