import type { SpanishTourCopy } from "../spanishTourCopyTypes";
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { spanishTourCopyB } from "./batch-b.ts";

const day = (title: string, description: string) => ({ title, description });
const qa = (question: string, answer: string) => ({ question, answer });
const image = (label: string, alt = label, caption = label) => ({ label, alt, caption });
const scene = (day: number, ...variants: ReturnType<typeof image>[]) => ({ day, variants });

/** The 15-day classic repeats the first twelve days of the 14-day private classic. */
const classic14 = spanishTourCopyB["beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"];

/** Day texts reworded after the 20 October 2026 sales review; the 14-day page keeps its own. */
const dayText: Readonly<Record<number, string>> = {
  0: "En el aeropuerto o la estación de Pekín que hayamos confirmado, el conductor te lleva directamente al hotel. El primer día queda libre después del viaje largo; las visitas empiezan cuando hayas descansado.",
  6: "El tren de segunda clase desde Xi’an a Chengdu tarda unas 3–4,5 horas. Queda la tarde para tomar té en el Parque del Pueblo y pasear por los callejones Kuanzhai.",
  7: "Llegamos a la Base de Investigación y Cría del Panda Gigante de Chengdu cerca de la hora de apertura, cuando los pandas suelen estar más activos. Para la tarde, elige antes de reservar entre el Museo de Sanxingdui, a una hora aproximadamente en cada sentido, y un paseo más tranquilo por el monasterio Wenshu.",
  10: "Si el nivel del agua y el operador lo permiten, recorre en balsa de bambú el tramo reservado del río Yulong. Después, conoce el campo en bicicleta o en vehículo, sin ningún tramo a pie obligatorio. Noche en Yangshuo.",
  11: "Primero hay una hora y media por carretera hasta el aeropuerto de Guilin; después, el vuelo confirmado en clase turista a Shanghái dura unas dos horas. Un conductor te recibe a la llegada. Si aún tienes energía, el Bund se ilumina al anochecer.",
};

function classic15(): SpanishTourCopy {
  return {
    title: "Pekín, Xi’an, Chengdu, Guilin, Shanghái y Suzhou: viaje privado de 15 días",
    metadataTitle: "China en 15 días: de Pekín a Shanghái y Suzhou en privado",
    metadataDescription: "15 días en privado: Gran Muralla, Terracota, pandas, río Li, Shanghái y Suzhou. Por persona: 3780 USD para 2 y 2410 para 6; vuelos nacionales incluidos.",
    eyebrow: "De Pekín a Shanghái en 15 días, con un día para los jardines de Suzhou",
    lede: "Para dos personas que comparten habitación de dos camas, este viaje privado de 15 días Pekín–Xi’an–Chengdu–Guilin–Shanghái cuesta desde 3780 USD por persona; los vuelos internacionales van aparte. Es la ruta clásica de 14 días con un día más: un día completo en Shanghái y una excursión a los jardines de Suzhou antes de volver a casa.",
    summary: "Catorce noches de hotel con desayuno. Los días de visita, un guía local y un vehículo son exclusivos para tu grupo en cada ciudad. Se incluyen las entradas indicadas, los traslados, dos trenes de segunda clase, dos vuelos en clase turista y el tren de ida y vuelta a Suzhou del día 14. Los días de viaje, un conductor te lleva a la salida y otro te recibe en el siguiente destino.",
    highlights: [
      "Cuatro noches en Pekín y la Gran Muralla en Mutianyu",
      "Los Guerreros de Terracota en Xi’an y los pandas de Chengdu a primera hora, cuando están más activos",
      "Crucero por el río Li hasta Yangshuo y dos noches en Yangshuo, entre picos kársticos",
      "Tres noches en Shanghái, un día completo con guía en la ciudad y una excursión en tren a los jardines de Suzhou",
    ],
    itinerary: [
      ...classic14.itinerary.slice(0, 12).map((item, index) => ({ ...item, description: dayText[index] ?? item.description })),
      day("El Bund, el Jardín Yu y la antigua Concesión Francesa", "Un día completo en Shanghái con tu guía: por la mañana, el Jardín Yu y el casco antiguo; después, el Bund, con las torres de Pudong al otro lado del río, y por la tarde las calles de plátanos de sombra de un barrio de la antigua Concesión Francesa."),
      day("Excursión a los jardines de Suzhou", "En tren de alta velocidad, Suzhou está a unos 30 minutos de Shanghái. En Suzhou, tu guía y tu vehículo privado te acompañan todo el día: visita un jardín confirmado para ese día, con la entrada incluida, pasea por los canales de la calle Pingjiang y vuelve a Shanghái en tren."),
      day("Salida de Shanghái", "El conductor te lleva al aeropuerto o a la estación de Shanghái que hayamos confirmado. El día de salida queda libre de visitas."),
    ],
    hotelNote: "Catorce noches compartiendo habitación de dos camas en hoteles con desayuno de nivel cuatro estrellas (4 diamantes en Trip.com, también llamado Ctrip): Pekín 4, Xi’an 2, Chengdu 2, Guilin 1, Yangshuo 2 y Shanghái 3. Los hoteles y los tipos de habitación se indican antes del pago.",
    serviceNote: "Los días de visita, un guía local de habla inglesa y un vehículo atienden solo a tu grupo. Se incluyen todos los traslados a aeropuertos y estaciones, las entradas principales indicadas, el crucero por el río Li con las maletas trasladadas por separado, una balsa de bambú en el Yulong y, el día 14, el tren de segunda clase de ida y vuelta a Suzhou, guía y vehículo privado allí y la entrada a un jardín. Los trayectos largos son en tren de segunda clase Pekín–Xi’an–Chengdu y vuelos en clase turista Chengdu–Guilin y Guilin–Shanghái. Los guías cambian en cada ciudad; los conductores realizan los traslados los días de viaje. Si prefieres un guía de habla hispana, lo hay en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.",
    bookingNote: classic14.bookingNote,
    exclusions: [
      "Vuelos internacionales de ida y vuelta a China",
      "Almuerzos, cenas y bebidas; todos los hoteles incluyen desayuno",
      "Seguro de viaje, visados, propinas y gastos personales",
      "Mejoras de habitación y suplementos de festivos",
      "Suplemento por habitación individual",
      "Equipaje facturado que exceda la franquicia incluida por la aerolínea",
    ],
    faq: [
      qa("¿Cuánto cuesta un viaje privado de 15 días por China?", "En esta ruta Pekín–Xi’an–Chengdu–Guilin–Shanghái con un día en Suzhou, dos personas compartiendo habitación de dos camas pagan 3780 USD cada una, 7560 USD en total. Para cuatro son 2660 USD por persona; para seis, 2410 USD. Incluye 14 noches con desayuno, guías y vehículos los días de visita, las entradas indicadas, dos trenes de alta velocidad, dos vuelos nacionales y el tren a Suzhou. Los vuelos internacionales, los almuerzos y las cenas van aparte; para otros tamaños de grupo te enviamos el precio por escrito."),
      qa("¿En qué se diferencia del viaje privado clásico de 14 días?", "Los doce primeros días son iguales. En el viaje privado de 14 días, el día 13 se elige entre Shanghái y Suzhou, y el día 14 es la salida. En este de 15 días, el día 13 es un día completo con guía en Shanghái, el día 14 vas a Suzhou y el día 15 queda para la salida, con una tercera noche de hotel en Shanghái."),
      qa("¿Cuál es la mejor época?", "Abril–mayo y septiembre–octubre ofrecen la combinación más cómoda para esta ruta. Julio y agosto son calurosos y húmedos en Xi’an y Guilin, y los pandas están menos activos. El nivel bajo del agua en invierno puede acortar el crucero por el Li. Trenes y monumentos están especialmente concurridos la primera semana de mayo y la de octubre."),
      qa("¿Se puede cambiar la ruta?", "Sí. Podemos presupuestar una versión con Zhangjiajie en lugar de Chengdu, Hangzhou en lugar de Suzhou o noches adicionales. La ruta modificada y su precio se confirman por escrito antes del pago."),
      qa("¿Hay paradas de compras?", "No. Este viaje privado de 15 días no tiene paradas de compras. Solo añadimos una visita o servicio después de que lo aceptes."),
    ],
    heroImage: { alt: "El skyline del paseo fluvial de Shanghái con la luz de la tarde", caption: "Shanghái cierra la ruta: tres noches, un día completo con guía en la ciudad y una excursión a Suzhou." },
    gallery: [{ alt: "La proa de una balsa de bambú en un río verde y tranquilo de Yangshuo, con bambú en las orillas y picos kársticos al fondo", caption: "Durante las dos noches en Yangshuo se incluye un paseo en balsa de bambú por el río Yulong." }],
    routeMedia: [
      ...classic14.routeMedia.slice(0, 12),
      scene(13,
        image("El Bund", "El Bund de Shanghái", "El Bund de Shanghái"),
        image("Jardín Yu", "Edificios tradicionales y estanque del Jardín Yu", "El Jardín Yu y el casco antiguo se visitan el día con guía en Shanghái."),
      ),
      scene(14,
        image("Jardín del Administrador Humilde", "Pabellón, estanque y vegetación del Jardín del Administrador Humilde en Suzhou", "Jardín del Administrador Humilde, en Suzhou. Confirmamos por escrito qué jardín se visita ese día."),
        image("Calle Pingjiang", "Puente de piedra y casas junto al canal en la calle Pingjiang", "Calle Pingjiang, en Suzhou"),
      ),
      scene(15, image("Shanghái", "Paseo fluvial tranquilo frente a los rascacielos de Shanghái", "Shanghái · Imagen del destino")),
    ],
    packages: [{ id: "standard-guided", label: "Viaje privado", summary: "Los días de visita, el guía y el vehículo son exclusivos para tu grupo. Hoteles, transporte, entradas y servicio de guía se detallan en la confirmación escrita antes del pago. Sin paradas de compras." }],
  };
}

export const spanishTourCopyD: Readonly<Record<string, SpanishTourCopy>> = {
  "beijing-xian-chengdu-guilin-shanghai-15-day-private-tour": classic15(),
};
