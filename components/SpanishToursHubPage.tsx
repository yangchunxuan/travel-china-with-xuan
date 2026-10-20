import { PrivateToursHubPage, type PrivateToursHubEdition } from './PrivateToursHubPage';
import { SpanishSiteHeader, SpanishSiteFooter } from './SpanishChrome';
import { getSpanishTourCatalog } from '../lib/spanishTourCatalog';
import { getPublishedPrivateTourCatalog, type PublishedPrivateTourCatalogItem } from '../lib/publishedPrivateTourCatalog';
import { getPrivateTourFacets } from '../lib/privateTourCatalogFacets';
import { spanishLanguagePaths, spanishGuideLanguageNote, spanishGuideLanguageBadge, spanishPublishedPriceNote } from '../lib/spanishSite';
import { SpanishHubSales } from './SpanishServiceSales';
import { spanishLegacyTourCards, spanishHalfDaySlug, spanishLegacyZhangjiajieSlug } from '../lib/spanishLegacyTours';
import { buildPrivateTourDetailHref } from '../lib/privateTourInquiryContext';
const placeNames: Readonly<Record<string,string>> = {
 'Beijing':'Pekín',"Xi'an":'Xi’an','Shanghai':'Shanghái','Guangzhou':'Cantón','Panda Base':'Centro de pandas','Terracotta Warriors':'Guerreros de Terracota','City Wall':'Muralla de Xi’an','Muslim Quarter':'Barrio musulmán','Three Natural Bridges':'Tres Puentes Naturales','Li River':'Río Li','Songhua River':'Río Songhua','Ice and Snow World':'Ice and Snow World','Suzhou day trip':'Excursión a Suzhou','Forbidden City':'Ciudad Prohibida','Great Wall':'Gran Muralla','Golden Whip Stream':'Arroyo del Látigo Dorado','Tianmen Mountain':'Montaña Tianmen','Furong Town':'Furong',"Nan'ao Island":'Isla de Nan’ao','Huizhou villages':'Pueblos de Huizhou','Wangxian Valley':'Valle de Wangxian','Changbaishan Resort':'Complejo de Changbaishan','North Slope':'Vertiente norte','Shanghai Disneyland':'Disneyland Shanghái','Hanging Temple':'Monasterio Colgante','Yangtze Three Gorges':'Tres Gargantas del Yangtsé','Urumqi':'Urumqi','Sayram Lake':'Lago Sayram','Mergel River':'Río Mergel','Stone Forest':'Bosque de Piedra','Science and Technology Museum':'Museo de Ciencia y Tecnología','Yangtze River':'Río Yangtsé','Yangtze':'Yangtsé','Snow Town':'Xuexiang','Changbai Mountain':'Montaña Changbai','Arctic Village':'Pueblo Ártico','Wanda Resort':'Complejo de esquí de Wanda','Glass Bridge':'Puente de Cristal',
};
const esRoute=(route:string)=>route.split(' · ').map(place=>placeNames[place]??place).join(' · ');
const money=(amount:number,currency:string)=>new Intl.NumberFormat('es-ES',{style:'currency',currency,currencyDisplay:'code',maximumFractionDigits:0}).format(amount);
const firstSentence=(text:string)=>text.match(/^.*?[.!?](?:\s|$)/u)?.[0]?.trim()??text;
const guideLabels:Readonly<Record<string,string>>={
 'English-speaking guide':'Guía de habla inglesa',
 'English-speaking guide on land':'Guía de habla inglesa en las etapas terrestres',
 'English guide or no on-site guide':'Con guía en inglés o sin guía presencial, según la opción',
 'Guide language confirmed in quote':'Idioma del guía confirmado en el presupuesto',
 'English-speaking driver-host':'Conductor acompañante de habla inglesa',
};
/** Search title and description for /es/tours/, aimed at Spanish buying queries. */
export const spanishToursTitle = 'Tours privados por China con precio: circuitos y viajes a medida';
export const spanishToursDescription = 'Tours privados por China con precio publicado por persona: circuitos de 8 a 14 días por Pekín, Xi’an y Shanghái, Zhangjiajie, Guilin y más. Guías en inglés y equipo local con licencia.';
export function getSpanishPublishedTourCatalog():readonly PublishedPrivateTourCatalogItem[] {
 const translated=new Map(getSpanishTourCatalog().map(tour=>[tour.slug,tour]));
 const products=getPublishedPrivateTourCatalog('en').map(source=>{
  const tour=translated.get(source.slug), legacy=spanishLegacyTourCards.find(item=>item.slug===source.slug);
  if(!tour&&!legacy) throw new Error(`Missing Spanish catalogue copy: ${source.slug}`);
  const starting=source.startingPrice;
  const packageLabel=tour?.packages.find(p=>p.id===starting?.selection?.packageId)?.label;
  const guide=source.slug===spanishLegacyZhangjiajieSlug?`Guía en inglés los días 2 y 3. ${spanishGuideLanguageBadge}.`:`${guideLabels[source.guideLanguage]??(()=>{throw new Error(`Missing Spanish guide label: ${source.guideLanguage}`)})()}.${source.tourFormat==='small-group'?'':` ${spanishGuideLanguageBadge}.`}`;
  const validity=source.slug==='harbin-winter-5-day-private-tour'?'Llegadas de domingo a jueves, del 6 de enero al 5 de febrero de 2027, excepto festivos y una vez abiertos los principales recintos de hielo.':source.slug===spanishLegacyZhangjiajieSlug?'Precios publicados del 6 de septiembre al 30 de diciembre de 2026 (UTC+8); sujetos a reconfirmación para tus fechas.':undefined;
  const href=tour?.path??legacy!.path;
  // Match a sole displayed price; retain the source entry for dual-price cards.
  const startingPriceHref=starting?.selection&&!source.twoTravellerPrice
    ? buildPrivateTourDetailHref(href,source.slug,starting.selection)
    : `/es${source.startingPriceHref}`;
  return {...source,title:tour?.title??legacy!.title,description:tour?.metadataDescription??legacy!.summary,href,startingPriceHref,image:{...source.image,alt:tour?.heroImage.alt??legacy!.image.alt},
   comparison:{route:esRoute(source.comparison.route),appeal:firstSentence(tour?.lede??legacy!.summary),pace:firstSentence(tour?.hotelNote??'Tres noches en la categoría elegida; hotel y habitaciones por confirmar para tus fechas.'),fit:tour?firstSentence(tour.summary):'Una primera visita al parque forestal, el Puente de Cristal y Tianmen.',highlights:tour?.highlights??['Parque forestal','Puente de Cristal','Montaña Tianmen']},
   startingPrice:starting?{...starting,formatted:money(starting.amount,starting.currency),serviceLabel:packageLabel??'Hotel en la ciudad · guía en inglés los días 2 y 3',...(validity?{validityNote:validity}:{})}:null,
   ...(source.twoTravellerPrice?{twoTravellerPrice:{...source.twoTravellerPrice,formatted:money(source.twoTravellerPrice.amount,source.twoTravellerPrice.currency)}}:{}),guideLanguage:guide,
  };
 });
 const half=spanishLegacyTourCards[1];
 return [...products,{id:half.slug,slug:half.slug,source:'structured-tour',title:half.title,description:half.summary,days:half.days,nights:half.nights,href:half.path,startingPriceHref:half.path,paths:{en:`/tours/${half.slug}/`,zh:`/zh/tours/${half.slug}/`,ko:`/ko/tours/${half.slug}/`},image:half.image,comparison:{route:'Xi’an · Guerreros de Terracota',appeal:'Una visita privada centrada en el museo, con vehículo y conductor independientes del guía de habla inglesa.',pace:'Unas 5–6 horas desde el hotel, con 2,5–3 horas en el museo.',fit:'Para conocer los Guerreros de Terracota sin contratar un viaje completo.',highlights:['Traslado privado','Guía en inglés en el museo','Entradas nominativas']},startingPrice:null,hasServiceChoice:false,guideLanguage:`Guía en inglés en el museo. ${spanishGuideLanguageBadge}.`,shoppingStops:false,dateModified:products[0].dateModified}];
}
export function SpanishToursHubPage() {
 const products=getSpanishPublishedTourCatalog(), count=products.length;
 const startingPrices=[['beijing-highlights-5-day-private-tour','Pekín en 5 días'],['beijing-xian-shanghai-8-day-private-tour','Pekín, Xi’an y Shanghái en 8 días']].flatMap(([slug,name])=>{const price=products.find(p=>p.slug===slug)?.startingPrice;return price?[`${name}, desde ${price.formatted}`]:[];});
 const sourceFacets=getPrivateTourFacets(products,'en','A consultar');
 const regionLabels:Record<string,string>={east:'Este de China',southwest:'Suroeste',south:'Sur de China',north:'Norte y noroeste',northeast:'Noreste',central:'China central',multi:'Varias regiones'};
 const lengthLabels:Record<string,string>={short:'De medio día a 5 días',medium:'6 días',long:'De 7 a 21 días'};
 const priceLabels:Record<string,string>={low:'Menos de 550 USD',mid:'De 550 a 1000 USD',high:'Más de 1000 USD',quote:'A consultar'};
 const edition:PrivateToursHubEdition={
  language:'es',products,home:{path:'/es/',skipLink:'Ir a los viajes'},header:<SpanishSiteHeader currentPath="/es/tours/" languagePaths={spanishLanguagePaths('/tours/','/es/tours/')}/>,footer:<SpanishSiteFooter currentPath="/es/tours/"/>,
  facets:{...sourceFacets,regions:sourceFacets.regions.map(o=>({...o,label:regionLabels[o.id]})),lengths:sourceFacets.lengths.map(o=>({...o,label:lengthLabels[o.id]})),prices:sourceFacets.prices.map(o=>({...o,label:priceLabels[o.id]}))},
  plannerPath:'/es/#planner-contact',originalImageSlugs:[spanishHalfDaySlug],salesSection:<SpanishHubSales hub="tours"/>,schemaOffers:true,
  copy:{htmlLang:'es',path:'/es/tours/',metadata:{title:spanishToursTitle,description:spanishToursDescription,openGraphTitle:`${count} tours privados por China con precio`},
   breadcrumbLabel:'Ruta de navegación',breadcrumbHome:'Inicio',breadcrumbCurrent:'Viajes',eyebrow:`${count} ITINERARIOS Y VISITAS POR CHINA`,title:'China, a tu manera.',introduction:'Unos días en una región o un recorrido por el país: compara las etapas, el ritmo y los precios. Cada viaje detalla sus servicios antes de preparar tu presupuesto.',heroAction:`Comparar los ${count} itinerarios`,
   quickCompareEyebrow:'TODOS LOS ITINERARIOS',quickCompareTitle:'Encuentra el viaje que va contigo.',quickCompareIntroduction:'Compara la duración, las etapas, los alojamientos y el precio para tu grupo.',priceBasisNote:`${spanishPublishedPriceNote} ${spanishGuideLanguageNote}`,quickFitLabel:'En pocas palabras',quickMovementLabel:'Alojamiento y ritmo',quickAction:'Ver itinerario',
   catalogEyebrow:'EL CATÁLOGO COMPLETO',catalogTitle:`${count} formas de descubrir China.`,catalogIntroduction:'Abre un viaje para consultar el programa día a día, los servicios y las opciones disponibles.',
   tourCount:(n:number)=>`${n} itinerarios publicados`,duration:(days:number,nights:number)=>days<1?'Medio día':`${days} días · ${nights} noches`,startingPriceLabel:'Desde',quoteOnlyLabel:'A consultar',quoteOnlyBody:'Según fechas, habitaciones y grupo',perPersonLabel:'por persona',groupBasis:(n:number)=>`para ${n} viajeros`,twinShareBasis:'en habitación doble',partySize:(n:number)=>`${n} viajeros`,perPersonPriceNote:'Precios por persona',paceLabel:'Ritmo y alojamiento',fitLabel:'En pocas palabras',highlightsLabel:'Lo más destacado',viewLabel:'Descubrir este viaje',
   finalEyebrow:'¿YA TIENES UNA IDEA?',finalTitle:'Hablemos de tu viaje.',finalBody:'Dinos tus fechas, cuántas personas viajan y qué rutas te interesan. Revisamos qué se puede adaptar antes de enviarte un presupuesto por escrito. Las rutas de programa fijo mantienen los servicios anunciados.',finalAction:'Preparar mi viaje',
   statsRoutes:'Itinerarios publicados',statsRegions:'Regiones por descubrir',statsLengths:'Duración en días',statsShopping:'Viajes con paradas comerciales anunciadas',filterGroupLabel:'Filtrar viajes',filterRegionLabel:'Región',filterLengthLabel:'Duración',filterPriceLabel:'Precio de partida (USD)',filterAll:'Todos',filterReset:'Borrar filtros',filterCount:'{shown} de {total} itinerarios',filterEmpty:'No hay viajes que coincidan con estos filtros. Prueba con una búsqueda más amplia.'},
  priorityCopy:{eyebrow:'POR DÓNDE EMPEZAR',title:'Distintas maneras de acercarte a China.',introduction:`Desde los grandes hitos de un primer viaje hasta los días tranquilos de Jiangnan. Empieza por lo que más te atraiga${startingPrices.length?`: ${startingPrices.join('; ')} (precios por persona con 6 viajeros)`:''}.`},
  priorityReasons:{'beijing-xian-shanghai-8-day-private-tour':'Tres grandes ciudades para conocer China por primera vez en ocho días.','beijing-xian-chengdu-guilin-shanghai-13-day-private-tour':'Historia imperial, pandas y paisajes del sur, con apoyo adaptado a cada etapa.','beijing-xian-chengdu-guilin-shanghai-14-day-private-tour':'Catorce días en privado de Pekín a Shanghái, pasando por Chengdu y Guilin.','beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour':'Grandes lugares históricos y dos paisajes inolvidables: Zhangjiajie y Guilin.','beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour':'Una salida en grupo reducido, con las fechas y condiciones de la opción publicada.','suzhou-tongli-hangzhou-shanghai-12-day-private-tour':'Jardines, canales, té y vida de barrio: doce días para disfrutar Jiangnan sin prisas.'},
  arrivalPlanning:{eyebrow:'ANTES DE RESERVAR',title:'Prepara tu viaje a China desde tu país.',introduction:'Nuestros viajes comienzan en China. Elige un itinerario y después concretaremos por escrito dónde encontrarnos, los traslados y los servicios para tus fechas y tu grupo.',
   questions:[{title:'¿Dónde empieza el viaje?',body:'Los vuelos internacionales no están incluidos. Cuéntanos desde dónde sales y qué vuelos estás mirando: comprobamos la recepción, el traslado de llegada y el programa del primer día antes de reservar.'},{title:'¿Cómo comparo los precios?',body:'Cada precio mantiene la moneda mostrada, USD o CNY, sin conversión a euros. Algunos importes en dólares se calculan a partir de una tarifa en yuanes; otras opciones tienen un precio fijo en dólares. Compara también el número de viajeros y las habitaciones indicadas. El presupuesto confirma la moneda de pago, el cambio aplicable y el total.'},{title:'¿Puedo viajar con un guía en español?',body:'Sí. Hay guía de habla hispana en todas las ciudades, con un suplemento según ciudad y temporada, que confirmamos en tu presupuesto. Los precios publicados incluyen el guía de habla inglesa de cada viaje; revisa los días guiados: Pekín ofrece también una opción sin guía presencial, y la ruta clásica de Zhangjiajie incluye guía en inglés los días 2 y 3. Los guías y los conductores son nuestros, no subcontratados.'},{title:'¿Y si viajo con niños o prefiero un ritmo tranquilo?',body:'Indica las edades de los niños, cuánto sueles caminar, qué escaleras prefieres evitar y las habitaciones que necesitas. Estudiaremos las opciones antes del presupuesto; las rutas fijas mantienen las visitas y el transporte anunciados.'}],
   preparationLabel:'Para preparar el viaje',links:[{href:'/es/guias/visado-china-espanoles/',label:'Visado y entrada en China con pasaporte español'},{href:'/es/services/',label:'Elige la ayuda que necesitas'},{href:'/es/guias/',label:'Guías prácticas antes de reservar'}]},
 };
 return <PrivateToursHubPage locale="en" edition={edition}/>;
}
