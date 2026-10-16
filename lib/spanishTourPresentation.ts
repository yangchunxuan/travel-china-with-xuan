import type { LocalizedPrivateTourProduct } from './privateTourProducts';
import { spanishTourContactNote, spanishEmailHref, spanishGuideLanguageNote, spanishPublishedPriceNote, spanishSite, spanishWhatsAppHref } from './spanishSite';
import { spanishGuidesForTour } from './spanishGuides';
export function spanishTourPageCopy(product: LocalizedPrivateTourProduct) {
  const groups = [...new Set(product.packages.flatMap(p => p.rows.map(r => r.travelers)))].sort((a,b) => a-b);
  const format = product.tourFormat === 'small-group' ? 'GRUPO REDUCIDO' : 'VIAJE PRIVADO';
  const fixed = product.slug === 'zhangjiajie-forest-4-day-private-tour';
  return {
    htmlLang: 'es', skipLink: 'Ir al itinerario', breadcrumbLabel: 'Ruta de navegación', homeLabel: 'Inicio', productLabel: 'Viajes a China',
    heroMeta: `${product.days} DÍAS / ${product.nights} NOCHES · ${format} · SIN PARADAS COMERCIALES`, heroPromise: product.eyebrow,
    facts: product.facts?.length ? product.facts : [
      { label: 'Duración', value: `${product.days} días · ${product.nights} noches` },
      { label: 'Guía', value: 'Según la opción elegida · español con suplemento' },
      { label: 'Alojamiento', value: `${product.nights} noches · hoteles confirmados por escrito` },
      { label: 'Precio', value: groups.length ? `Publicado para ${groups.join(', ')} viajeros` : 'Según fechas y grupo' },
    ],
    overviewEyebrow: 'La esencia del viaje', overviewTitle: product.eyebrow, overviewBody: product.summary,
    routeEyebrow: 'Día a día', routeTitle: 'Así transcurre tu viaje.',
    routeBody: 'La llegada, las visitas y la salida se detallan a continuación. Los horarios, las reservas nominativas y las condiciones del lugar pueden requerir ajustes. Hablaremos contigo antes de hacer un cambio importante.',
    serviceEyebrow: 'Los detalles que importan', serviceTitle: 'Dónde dormir, cómo moverte y quién te acompaña.',
    serviceBody: `Los servicios y los días con guía son los de la opción elegida. Comprobamos su disponibilidad para tus fechas antes del pago. ${spanishGuideLanguageNote}`,
    hotelTitle: 'Dónde te alojarás', transportTitle: 'Guías, transporte y visitas',
    scopeEyebrow: 'Antes de reservar', scopeTitle: 'Qué se paga aparte y qué confirmamos por escrito.', exclusionsTitle: 'No incluido', confirmedTitle: 'Confirmado por escrito',
    confirmations: ['Tus fechas y los detalles de llegada y salida', 'Los alojamientos, el reparto de habitaciones y el transporte', 'Los servicios disponibles, el idioma del guía y el total antes de pagar'],
    finalEyebrow: 'El siguiente paso', finalTitle: fixed ? '¿Te encaja esta ruta? Consultemos tus fechas.' : 'Hablemos de tu viaje.',
    finalBody: fixed ? 'Cuéntanos tus fechas, cuántas personas viajan y qué alojamiento prefieres. Comprobaremos la disponibilidad de esta opción y te enviaremos un presupuesto por escrito.' : 'Comparte tus fechas, el número de viajeros y lo que te gustaría hacer. Revisaremos las opciones y te enviaremos un presupuesto detallado.',
    contact: 'Pedir presupuesto', email: 'Escribir por correo',
  };
}
export const spanishPriceCopy = {
  choosePackage: 'Elige una opción', chooseGroup: 'Número de viajeros', publishedPrice: 'Precio para la opción elegida', perPerson: 'por persona', groupUnit: ' viajeros', privateTour: 'viaje privado',
  flightsSeparate: 'vuelos no incluidos', internationalFlightsSeparate: 'vuelos internacionales no incluidos', priceBasis: 'Precio por persona', twinShare: 'con dos personas por habitación', smallGroup: 'grupo reducido',
  checkDates: 'Consultar mis fechas', otherGroups: '¿Viaja otro número de personas?', otherGroupsBody: 'Comprobamos las habitaciones necesarias y la capacidad del vehículo, incluido el equipaje, antes de enviar el presupuesto.',
  requestQuote: 'Pedir presupuesto', quoteOnlyTitle: 'Un presupuesto para tus fechas y tu grupo', quoteOnlyBody: 'Este viaje se ofrece con presupuesto personalizado. Indica las fechas, el número de viajeros y las habitaciones que necesitas: recibirás una propuesta por escrito antes de pagar.',
  emailLabel: 'Escribir por correo', whatsappLabel: 'Hablar por WhatsApp', draftNote: spanishTourContactNote, currencyNote: `${spanishPublishedPriceNote} ${spanishGuideLanguageNote}`,
} as const;
export const spanishPhotoCopy = { nextPhoto: 'Ver la siguiente fotografía', routeLabel: 'Elige un día para ver sus fotografías', routeScenes: 'En imágenes', dayUnit: '', dayPrefix: 'Día ', controls: 'es' } as const;
export const spanishPhotoCreditCopy = { title: 'Créditos de las fotografías', intro: 'Las fotografías externas se acreditan a continuación. Los cambios se limitan al recorte, al tamaño y al formato. Las adaptaciones de fotos CC BY-SA conservan la licencia indicada.', by: 'Foto de', localNote: 'Las demás fotografías proceden del archivo de Homeground y su propietario ha autorizado su uso en esta web.' };
export const spanishBeforeYouChooseTitle = 'Antes de elegir este viaje';
export const spanishCommercialCopy = { productLabel: 'Para seguir preparando el viaje', productTitle: 'Guías y rutas que te ayudan a elegir.', productBody: 'Consulta consejos prácticos, opciones de asistencia local y otros itinerarios publicados.', destinations: 'Destinos', guides: 'Guías prácticas', related: 'Otros viajes' };
export function spanishTourPlanningContext(slug: string) {
  return {
    destinations: [] as {id:string;href:string;label:string}[],
    guides: [...spanishGuidesForTour(slug).map(guide => ({id:guide.slug,href:guide.path,label:guide.navTitle})), {id:'es-services',href:'/es/services/',label:'La ayuda que necesitas en China'}],
    relatedProducts: [{id:'es-tour-hub',href:spanishSite.tours,label:'Todos los viajes y sus precios'}],
  };
}
export function spanishTourContactHrefs(product: LocalizedPrivateTourProduct) {
  const whatsapp: Record<string,string> = {}, email: Record<string,string> = {};
  const add = (key: string, option = '', travelers?: number) => {
    const message = ['Hola, me interesa este viaje.', `Viaje: ${product.title}`, option ? `Opción: ${option}` : '', `Número de viajeros: ${travelers ?? ''}`, 'Fechas aproximadas:', 'Guía en español (con suplemento):', `Página: https://homegroundchina.com${product.path}`].filter(Boolean).join('\n');
    whatsapp[key] = spanishWhatsAppHref(message); email[key] = spanishEmailHref(`Consulta: ${product.title}`, message);
  };
  add('other');
  product.packages.forEach(p => p.rows.forEach(r => add(`${p.id}:${r.travelers}`,p.label,r.travelers)));
  return {whatsapp,email};
}