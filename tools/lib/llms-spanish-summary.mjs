// Spanish key facts for llms.txt: what answer engines should quote to Spanish
// speakers. Prices and fees come from the same data as the pages.
import { attractionReservationServiceFeeCny } from "../../lib/attractionReservations.ts";
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS } from "../../lib/attractionReservationGuarantee.ts";
import { privateGuideRates } from "../../lib/privateGuideServices.ts";

const money = (amount, currency) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency, currencyDisplay: "code", maximumFractionDigits: 0 }).format(amount);

export function spanishLlmsSummary(tours) {
  const priced = tours.filter((tour) => tour.startingPrice);
  const from = priced.reduce((low, tour) => (tour.startingPrice.amount < low.startingPrice.amount ? tour : low));
  const price = (slug) => {
    const tour = priced.find((item) => item.slug === slug);
    if (!tour) throw new Error(`llms.txt: no published price for ${slug}`);
    return money(tour.startingPrice.amount, tour.startingPrice.currency);
  };
  return [
    "Homeground China es una agencia de viajes con licencia en Pekín (L-BJ10587) que organiza tours privados por China. Cada itinerario en español publica su precio por persona según el número de viajeros; los vuelos internacionales no están incluidos.",
    "",
    `- Tours privados por China: ${priced.length} itinerarios con precio publicado, desde ${money(from.startingPrice.amount, from.startingPrice.currency)} por persona. Ejemplos: Pekín en 5 días desde ${price("beijing-highlights-5-day-private-tour")}; Pekín, Xi’an y Shanghái en 8 días desde ${price("beijing-xian-shanghai-8-day-private-tour")}; Guilin y Yangshuo en 5 días desde ${price("guilin-yangshuo-5-day-private-tour")}.`,
    `- Reserva de entradas en China (Ciudad Prohibida, Guerreros de Terracota, pandas de Chengdu y más): ${attractionReservationServiceFeeCny} CNY por persona y lugar, más la entrada a su precio oficial. Reserva garantizada si se encarga y se paga al menos ${ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS} días antes; si no se consigue, se devuelven íntegramente la gestión y la entrada.`,
    `- Guía privado de habla inglesa: ${privateGuideRates.shanghai.standardCny} CNY por jornada de hasta 8 horas en Shanghái o Pekín y ${privateGuideRates.xian.standardCny} CNY en Xi’an o Zhangjiajie.`,
    "- Coche con conductor en cualquier ciudad de China continental, sin Hong Kong ni Macao.",
    "- Guías y conductores propios. Guía de habla inglesa incluido donde se indica; guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada que se confirma en el presupuesto. Sin paradas en tiendas.",
    "- Pekín: en los viajes privados con Pekín, si se reserva y se envían los datos del pasaporte al menos 8 días antes y no se consiguen las reservas de la Ciudad Prohibida o Tiananmén, se devuelve todo lo pagado.",
    "- Respuesta en menos de 12 horas por WhatsApp o correo. Pago con tarjeta mediante un enlace de pago seguro de VBill (acepta tarjetas de bancos latinoamericanos): 30 % de depósito y el resto a la llegada.",
    "- Montaña Tianmen (Zhangjiajie): desde el 13 de octubre de 2026 solo se vende la ruta C; el teleférico que sale de la ciudad no transporta pasajeros.",
  ];
}
