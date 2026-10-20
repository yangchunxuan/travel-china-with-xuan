import { TravelServicesHubPage, type TravelServicesHubEdition } from './TravelServicesHubPage';
import { SpanishSiteFooter, SpanishSiteHeader } from './SpanishChrome';
import { spanishLanguagePaths } from '../lib/spanishSite';
import { spanishCoreCopy } from '../lib/spanishCoreCopy';
import { SpanishHubSales } from './SpanishServiceSales';
import { attractionReservationServiceFeeCny } from '../lib/attractionReservations';
const path='/es/services/', origin='https://homegroundchina.com';
const hrefs={tours:'/es/tours/',guides:'/es/services/private-english-speaking-guides/',reservations:'/es/services/china-attraction-reservations/',support:'/es/services/full-trip-support/'} as const;
export const spanishServicesHubCopy: TravelServicesHubEdition['copy'] = {
  breadcrumb:'Ruta de navegación',overview:'Todos los servicios',choicesEyebrow:'Partimos de lo que ya has preparado',choicesTitle:'Elige la ayuda que de verdad necesitas.',
  choicesBody:'Compara nuestros viajes privados o cuéntanos tus fechas, cuántas personas viajan y qué necesitas organizar. Confirmamos los servicios disponibles y el presupuesto antes de reservar.',
  cards:[
    {id:'tours',eyebrow:'Itinerarios publicados',title:'Compara los viajes privados',body:'Consulta los programas día a día, los precios de partida, los servicios incluidos y las condiciones de reserva.',action:'Comparar viajes'},
    {id:'guides',eyebrow:'Un guía en los días en que aporta más',title:'Guías privados de habla inglesa',body:'Shanghái, Pekín, Xi’an y Zhangjiajie: consulta el precio de un guía de habla inglesa para una jornada de 8 horas. El número de viajeros, el recorrido y el transporte se confirman por separado. También hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto.',action:'Servicios y precios de los guías'},
    {id:'reservations',eyebrow:'¿Ya tienes fechas? Reserva cuanto antes.',title:'Tus entradas en China, sin complicaciones',body:'Olvídate de las aplicaciones en chino y de las prisas cuando se abre la venta. Reservamos en el sistema de cada lugar, a nombre de tu pasaporte. Envíanos tus fechas pronto para prepararlo antes de la apertura. La gestión cuesta {fee} por persona y lugar, más la entrada a su precio oficial, sin recargo.',action:'Enviar mis fechas para reservar'},
    {id:'support',eyebrow:'De la idea al viaje sobre el terreno',title:'Organiza el viaje completo',body:'Conectamos el itinerario con los hoteles, las entradas, los traslados y la coordinación local necesarios para hacerlo realidad.',action:'Ver la asistencia completa'},
  ],
  methodEyebrow:'Nuestra forma de trabajar',methodTitle:'Conoce cómo planificamos antes de confiarnos tu viaje.',methodBody:'Te explicamos qué puedes seguir organizando por tu cuenta, qué hace falta comprobar y de qué se ocupará Homeground antes de empezar un servicio de pago.',methodAction:'Cómo preparamos un viaje',adviceAction:'Resolver primero una duda práctica',
};
export function SpanishServicesPage() {
  const languagePaths=spanishLanguagePaths('/services/',path);
  const edition:TravelServicesHubEdition={
    language:'es',homePath:'/es/',homeLabel:'Inicio',skipLink:'Ir al contenido',
    header:<SpanishSiteHeader currentPath={path} languagePaths={languagePaths}/>,footer:<SpanishSiteFooter currentPath={path}/>,copy:spanishServicesHubCopy,
    section:{navLabel:'Servicios',shortLabel:'Servicios',eyebrow:'Guías · traslados · asistencia local',title:'Asistencia local donde marca la diferencia.',description:'Guía privado, traslados, selección de hoteles, diseño de ruta o coordinación durante el viaje: elegimos contigo lo que necesitas después de conocer tus planes.',scopeTitle:'¿Dónde te vendría bien una mano?',scope:['¿Un guía privado para un día más complejo?','¿Ayuda con traslados, hoteles o reservas?','¿Una persona que coordine toda la ruta?']},
    serviceHref:id=>hrefs[id],planningHref:'/es/studio/',guidesHref:'/es/guias/',salesSection:<SpanishHubSales hub="services"/>,
    additionalServiceLinks:[{href:'/es/services/private-car-and-driver/',label:'Coche con conductor en cualquier ciudad de China continental'}],feeLabel:`${new Intl.NumberFormat('es-ES').format(attractionReservationServiceFeeCny)} CNY`,
    schema:{'@context':'https://schema.org','@graph':[
      {'@type':'CollectionPage','@id':`${origin}${path}#webpage`,url:`${origin}${path}`,name:spanishCoreCopy.services.title,description:spanishCoreCopy.services.description,inLanguage:'es',sameAs:languagePaths.map(item=>`${origin}${item.path}`),mainEntity:{'@id':`${origin}${path}#services`}},
      {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Inicio',item:`${origin}/es/`},{'@type':'ListItem',position:2,name:'Servicios',item:`${origin}${path}`}]},
      {'@type':'ItemList','@id':`${origin}${path}#services`,numberOfItems:spanishServicesHubCopy.cards.length,itemListElement:spanishServicesHubCopy.cards.map((card,index)=>({'@type':'ListItem',position:index+1,name:card.title,url:`${origin}${hrefs[card.id]}`}))},
    ]},
  };
  return <TravelServicesHubPage locale="en" edition={edition}/>;
}
