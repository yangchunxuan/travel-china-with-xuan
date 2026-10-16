import { getHomegroundCopy, type HomegroundCopy } from './homegroundI18n';
import { getHomepageShowcaseCopy } from './homepageShowcaseI18n';
import { getHomepagePlanningDeskCopy, type HomepagePlanningDeskCopy } from './homepagePlanningDesk';
import type { HomepageProductShowcaseTemplateCopy } from '../components/HomepageProductShowcase';
import type { PlanningScopeCopy } from './homegroundPlanningScopeI18n';
import { spanishContactEdition } from './spanishContactEdition';

const original = getHomegroundCopy('en');

/** Shared home layout; the enquiry service keeps its existing locale contract. */
export const spanishHomeCopy: HomegroundCopy = {
  ...original,
  htmlLang: 'es', path: '/es/', languageName: 'Español', languageShort: 'ES',
  skipLink: 'Ir al contenido',
  businessDescriptor: 'Agencia de viajes en China',
  brandTagline: 'China, a tu manera. Estamos contigo.',
  schemaDescription: 'Homeground China es una agencia de viajes en China especializada en viajes privados a medida: itinerarios, alojamiento, reservas, transporte y asistencia local. El guía en español se presupuesta aparte.',
  hero: {
    ...original.hero,
    eyebrow: 'Viajes privados y a medida por China',
    title: 'China, a tu manera. Estamos contigo.',
    socialImageAlt: 'Una torre de esquina de la Ciudad Prohibida de Pekín reflejada en el foso',
  },
  guides: { ...original.guides, viewAllLabel: 'Todos los consejos de viaje' },
  faq: {
    eyebrow: 'Tus preguntas', title: 'Algunas respuestas antes de viajar.', intro: '',
    items: [
      {
        question: '¿Son viajes privados o salidas en grupos pequeños?',
        answer: 'La mayoría de nuestros viajes son privados. Cuando el programa incluye guía o vehículo privado, ese servicio está reservado para ti y tus acompañantes en los días indicados. Los viajes identificados como «grupo pequeño» salen en fechas fijas con otros viajeros. Algunos viajes privados también incluyen trenes, cruceros o transportes compartidos dentro de los recintos; estos trayectos se indican en la página del viaje y en la confirmación escrita. El tipo de viaje, los servicios y el precio se confirman antes del pago. Nunca te incorporamos a un grupo compartido sin tu acuerdo. Podemos organizar un guía en español con suplemento, sujeto a presupuesto y disponibilidad.',
      },
      {
        question: '¿Qué sucede después de mi primer mensaje?',
        answer: 'Un asesor empieza por conocer tu proyecto y los aspectos en los que necesitas ayuda. Si decides seguir adelante con nosotros, confirmamos los servicios, lo que incluyen y su precio antes de comenzar cualquier trabajo de pago.',
      },
      {
        question: '¿Quién se encarga de las reservas y los servicios durante el viaje?',
        answer: 'Depende del acompañamiento elegido. Antes de empezar, dejamos por escrito qué organiza Homeground, qué servicios prestan nuestros colaboradores locales y qué reservas siguen a tu cargo.',
      },
      {
        question: '¿Se puede adaptar el viaje para niños, familiares mayores o personas con movilidad reducida?',
        answer: 'Sí. Cuéntanos desde el principio lo que necesitas: tiempo de caminata, escaleras, salidas tempranas, distribución de habitaciones, alimentación o pausas. Lo tenemos en cuenta al diseñar el recorrido y organizar cada jornada.',
      },
      {
        question: '¿Puedo contactar si todavía no tengo claro el viaje?',
        answer: 'Por supuesto. Indica las fechas, el número de viajeros y las ciudades que ya hayas elegido, si las hay. A partir de esa conversación podremos concretar juntos el resto del viaje.',
      },
      {
        question: '¿Y si ya he reservado vuelos, hoteles o parte del viaje?',
        answer: 'No necesitas empezar de cero. Organizamos el resto del recorrido en torno a las reservas confirmadas y señalamos los horarios incompatibles, los traslados difíciles o los detalles que faltan por resolver.',
      },
      {
        question: '¿Puedo pedir ayuda solo para una parte del viaje?',
        answer: 'Sí. Puedes confiarnos el viaje completo o solo lo que resulte difícil de organizar: elegir las etapas, coordinar conexiones, decidir dónde alojarte o preparar un tramo concreto del itinerario.',
      },
    ],
  },
};

export const spanishHomepageShowcaseCopy: ReturnType<typeof getHomepageShowcaseCopy> = {
  heroBody: 'Elige un itinerario que encaje contigo y lo adaptamos a tus fechas.',
  heroHeadline: {
    fixedLines: ['China, a tu manera.'], joiner: ' ',
    phrases: ['Estamos contigo.', 'Un viaje bien pensado.', 'Tiempo para disfrutar.', 'Nos ocupamos del resto.'],
  },
  heroPrimary: 'Comparar viajes privados', heroSecondary: 'Hablar de mi viaje',
  heroDestinationPrompt: '¿Todavía estás eligiendo las etapas?', heroDestinationAction: 'Explorar destinos (en inglés)',
  guidePaths: { listLabel: 'Consejos para preparar un viaje a China', items: [
    { id: 'stay', title: 'Elegir dónde alojarse' },
    { id: 'transport', title: 'Preparar la llegada' },
    { id: 'plan', title: 'Encontrar el ritmo adecuado' },
  ] },
  planning: {
    eyebrow: 'Un equipo local, cuando lo necesitas',
    title: 'Mantén lo que ya has reservado. Déjanos organizar el resto.',
    body: 'Homeground es una agencia de viajes en China especializada en viajes privados a medida. Conserva los vuelos o los hoteles que ya tengas: podemos organizar el resto del viaje o ayudarte con una sola etapa difícil de preparar.',
    teamAction: 'Conocer al equipo Homeground',
  },
};

export const spanishHomepageProductCopy: HomepageProductShowcaseTemplateCopy = {
  eyebrow: 'Algunas ideas para empezar',
  title: 'De las antiguas capitales a los ríos del sur.',
  intro: 'Compara las etapas y los precios y descubre el viaje que encaja contigo. Guía en español con suplemento, bajo presupuesto.',
  countLabel: '{count} viajes', durationLabel: '{days} días · {nights} noches',
  productLabel: 'Viaje privado', startingPriceLabel: 'Precio publicado desde',
  quoteOnlyLabel: 'Bajo presupuesto', quoteOnlyNote: 'Según las fechas y el grupo',
  perPersonLabel: 'por persona', groupBasis: 'para un grupo de {travelers} viajeros',
  actionLabel: 'Descubrir este viaje', hubActionLabel: 'Comparar todos los viajes por China',
  productListLabel: 'Viajes privados de Homeground China',
};

export const spanishPlanningScopeCopy: PlanningScopeCopy = {
  htmlLang: 'es',
  title: 'Un viaje a China, bien pensado de principio a fin.',
  titleLines: ['Un viaje a China, ', 'bien pensado de principio a fin.'],
  body: 'Organizamos el orden de las etapas, las zonas donde alojarse, los trayectos entre ciudades, las reservas y el ritmo de cada día según tus fechas, tus intereses y las personas que viajan contigo.',
  values: ['Etapas ajustadas al tiempo disponible', 'Conexiones que encajan entre sí', 'Un ritmo adecuado para tu grupo'],
  cta: 'Hablar de mi viaje',
};

const originalDesk = getHomepagePlanningDeskCopy('en');
export const spanishHomepagePlanningCopy: HomepagePlanningDeskCopy = {
  ...originalDesk,
  contactPanelLabel: 'WhatsApp, Messenger o correo electrónico',
  contactNoPayment: 'Contactarnos no tiene coste.',
  contactStart: {
    ...originalDesk.contactStart,
    ...spanishContactEdition.desk,
    whatsappEyebrow: 'Directamente con nosotros', whatsappTitle: 'Conversar por WhatsApp',
    messengerLead: '¿Prefieres Facebook?', emailEyebrow: 'Solo necesitamos un dato',
    emailSuccessTitle: 'Hemos guardado tu correo electrónico.',
    emailSuccessBody: 'Un asesor de Homeground ya puede responderte. Aquí no se han recogido detalles del itinerario.',
    referenceLabel: 'Referencia', emailFallbackAction: 'Escribirnos directamente',
  },
};
