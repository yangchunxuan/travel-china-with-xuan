import { attractionReservationServiceFeeCny } from './attractionReservations';
import { privateGuideRates } from './privateGuideServices';

const guideFromCny = Math.min(...Object.values(privateGuideRates).map(rate => rate.standardCny));

export const spanishCoreCopy = {
  services: { title: 'Servicios en China: entradas, guía privado, coche con conductor y viaje a medida', description: `Guía de habla hispana en todas las ciudades (suplemento según ciudad y temporada, confirmado en tu presupuesto) o de habla inglesa desde ${guideFromCny} CNY al día; reserva de entradas por ${attractionReservationServiceFeeCny} CNY por persona y lugar; coche con conductor en toda China continental y viajes a medida. Equipo local con licencia.` },
  studio: { title: 'El equipo de Homeground China y nuestra forma de viajar', description: 'Conoce al equipo local de Homeground y cómo preparamos itinerarios, coordinamos servicios y acompañamos a los viajeros en China.' },
  'business-information': { title: 'Homeground China: empresa, registro y licencia', description: 'Consulta la empresa que opera Homeground China, su registro y licencia de agencia de viajes, las copias de los documentos y las condiciones que confirmamos antes del pago.' },
  contact: {
    title: 'Contacta con Homeground para tu viaje a China',
    description: 'Cuéntanos tus fechas, cuántas personas viajan y qué te gustaría conocer. Presupuesto personalizado y servicios confirmados por escrito. Guía en español con suplemento.',
    eyebrow: 'Empecemos por tu idea',
    intro: '¿Hay una ruta que te gusta o todavía estás eligiendo destinos? Escríbenos con lo que tengas pensado. Puedes contarnos tu viaje en español.',
  },
};
export type SpanishCorePageId = keyof typeof spanishCoreCopy;
