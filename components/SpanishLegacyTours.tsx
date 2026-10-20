import { SpanishSiteHeader, SpanishSiteFooter, SpanishTourHeader } from './SpanishChrome';
import { destinationEditionCityLink } from '../lib/destinationEditions';
import { TerracottaHalfDayPage } from './TerracottaHalfDayPage';
import { TerracottaHalfDaySend } from './TerracottaHalfDaySend';
import { ZhangjiajiePrivateTourPreviewPage, type ZhangjiajieTourEdition } from './ZhangjiajiePrivateTourPreviewPage';
import { ZhangjiajieTourComparisonLink } from './ZhangjiajieTourComparisonLink';
import { TourPriceScope } from './TourPriceScope';
import { TourWhatsAppLink } from './TourWhatsAppLink';
import { spanishLanguagePaths, spanishGuideLanguageNote } from '../lib/spanishSite';
import { spanishHalfDayCopy, spanishHalfDayPath, spanishHalfDaySlug, spanishLegacyZhangjiajie, spanishLegacyZhangjiajiePath, spanishLegacyZhangjiajieSlug, spanishLegacyPricing } from '../lib/spanishLegacyTours';
import { spanishClassicCopy, spanishClassicPricing, spanishZhangjiajieComparison } from '../lib/spanishLegacyPresentation';
import { spanishCommercialCopy } from '../lib/spanishTourPresentation';
import { spanishZhangjiajieAnswer, spanishZhangjiajieSales, type SpanishZhangjiajiePricing } from '../lib/spanish-sales/legacy-zhangjiajie';
import { SpanishSalesBlock, SpanishTourAnswer } from './SpanishSalesBlock';

function TourSchema({path,title,description,itinerary,faq}:{path:string;title:string;description:string;itinerary:readonly {title:string;body:string}[];faq:readonly {question:string;answer:string}[]}) {
 const url=`https://homegroundchina.com${path}`;
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,inLanguage:'es'},
  {'@type':'TouristTrip','@id':`${url}#trip`,url,name:title,description,touristType:'Viajeros de un circuito privado',itinerary:{'@type':'ItemList',numberOfItems:itinerary.length,itemListElement:itinerary.map((day,index)=>({'@type':'ListItem',position:index+1,name:day.title,description:day.body}))}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Inicio',item:'https://homegroundchina.com/es/'},{'@type':'ListItem',position:2,name:'Viajes',item:'https://homegroundchina.com/es/tours/'},{'@type':'ListItem',position:3,name:title,item:url}]},
  {'@type':'FAQPage','@id':`${url}#faq`,inLanguage:'es',mainEntity:faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>;
}

/** The same half-day page and sending interaction as EN/ZH/KO, with Spanish copy. */
export function SpanishTerracottaHalfDayPage(){
 const copy=spanishHalfDayCopy;
 const message=[copy.message.opening,'',`${copy.message.date}:`,`${copy.message.travellers}:`,`${copy.message.hotel}:`,'Me interesa un guía de habla española (suplemento por presupuestar):','',`${copy.message.page}: https://homegroundchina.com${spanishHalfDayPath}`].join('\n');
 return <>
  <TerracottaHalfDayPage locale="en" edition={{language:'es',copy,homePath:'/es/',guideNote:spanishGuideLanguageNote,
   header:<SpanishSiteHeader currentPath={spanishHalfDayPath} contactHref={`${spanishHalfDayPath}#half-day-enquiry`} languagePaths={spanishLanguagePaths(`/tours/${spanishHalfDaySlug}/`,spanishHalfDayPath)}/>,
   footer:<SpanishSiteFooter currentPath={spanishHalfDayPath}/>,
   send:<TerracottaHalfDaySend locale="en" edition={{language:'es',copy,message,homePath:'/es/'}}/>,
  }}/>
  <TourSchema path={spanishHalfDayPath} title={copy.title} description={copy.description} itinerary={copy.stops} faq={copy.faq}/>
 </>;
}

/** Source classic-tour layout, live price window, stay grid and enquiry links. */

/** The Zhangjiajie city page in this edition's language once it exists, otherwise the English one (marked). */
const zhangjiajieCity = destinationEditionCityLink('es', 'zhangjiajie');
export function SpanishLegacyZhangjiajiePage(){
 const pricing=spanishClassicPricing();
 const salesPricing:SpanishZhangjiajiePricing={tiers:pricing.tiers.map(tier=>({name:tier.name,base:tier.formattedPrice,six:tier.formattedSixPersonPrice})),validFromLabel:pricing.validFromLabel,validUntilLabel:pricing.validUntilLabel};
 const sales=spanishZhangjiajieSales(salesPricing);
 const edition:ZhangjiajieTourEdition={
  language:'es',copy:spanishClassicCopy,pricing,commercialCopy:spanishCommercialCopy,
  answer:<SpanishTourAnswer answer={spanishZhangjiajieAnswer(salesPricing)}/>,
  sales:<SpanishSalesBlock copy={sales} path={spanishLegacyZhangjiajiePath}/>,
  extraFaq:sales.faq,
  homePath:'/es/',canonicalPath:spanishLegacyZhangjiajiePath,
  header:<SpanishTourHeader tourSlug={spanishLegacyZhangjiajieSlug}/>,footer:<SpanishSiteFooter currentPath={spanishLegacyZhangjiajiePath}/>,
  whatsAppLink:<TourWhatsAppLink locale="en" slug={spanishLegacyZhangjiajieSlug} edition={{language:'es',label:'Hablar por WhatsApp',title:spanishLegacyZhangjiajie.title,path:spanishLegacyZhangjiajiePath,packageLabels:Object.fromEntries(spanishLegacyPricing.tiers.map(t=>[t.id,t.name])),guideNote:'Me interesa un guía de habla española (suplemento por presupuestar):'}}/>,
  priceScope:<TourPriceScope route="zhangjiajie" locale="en" detailsHref="#scope-title" edition={{copy:{title:'Lo esencial sobre el precio',included:'Incluido',separate:'Aparte',confirm:'Antes del pago',details:'Ver todos los servicios incluidos y no incluidos'},content:{included:'Tres noches en la categoría elegida; transporte privado en destino y traslados acordados; guía de habla inglesa los días 2 y 3; entradas de adulto y transportes dentro de los recintos indicados en la confirmación.',separate:'Viaje de ida y vuelta a Zhangjiajie, almuerzos y cenas, actividades opcionales; suplementos por habitación individual, condiciones para niños y vehículo de categoría superior.',confirm:'El alojamiento, la habitación, el desayuno, el vehículo y el servicio de guía. Las fotos muestran posibles alojamientos; tu habitación se confirma para tus fechas.'}}}/>,
  comparison:<ZhangjiajieTourComparisonLink currentRoute="classic" locale="en" edition={{copy:spanishZhangjiajieComparison,paths:{classic:spanishLegacyZhangjiajiePath,forest:'/es/tours/zhangjiajie-forest-4-day-private-tour/',ancientTowns:'/es/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/'}}}/>,
  dayTitles:spanishLegacyZhangjiajie.itinerary.map(day=>day.title),
  routePhotos:{2:{alt:'El ascensor Bailong junto a los acantilados de arenisca del parque forestal de Zhangjiajie',caption:'El ascensor Bailong, en el corazón del parque forestal'},3:{alt:'El puente de cristal cruza el Gran Cañón de Zhangjiajie',caption:'El puente de cristal del Gran Cañón'},4:{alt:'El arco natural de Tianmen en lo alto de su escalinata',caption:'Tianmen: un arco entre el cielo y la montaña'}},
  photoCopy:{title:'Créditos fotográficos',local:'Estas fotografías proceden de la biblioteca de imágenes del proyecto Homeground y su propietario ha autorizado su uso en este sitio. Solo se han recortado, redimensionado o convertido de formato.'},
  ui:{tourHub:'Viajes',checkPrices:'Consultar el precio para mis fechas',heroAlt:'La luz del sol ilumina los picos de arenisca y los valles boscosos del parque forestal de Zhangjiajie',dayPrefix:'Día',creditPrefix:'Foto: ',cropped:' · recortada',accommodationReference:'Ejemplo de alojamiento',touristType:'Primera visita a Zhangjiajie',groupStayInquiry:'Consultar este alojamiento para mi grupo'},
  planningContext:{destinations:[{id:'zhangjiajie',href:zhangjiajieCity.href,label:zhangjiajieCity.english?'Descubrir Zhangjiajie (en inglés)':'Descubrir Zhangjiajie'}],guides:[{id:'es-guides',href:'/es/guias/',label:'Preparar tu viaje a China'},{id:'es-services',href:'/es/services/',label:'Elegir la ayuda que necesitas'}],relatedProducts:[{id:'forest',href:'/es/tours/zhangjiajie-forest-4-day-private-tour/',label:'Zhangjiajie: cuatro días en el bosque'},{id:'towns',href:'/es/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/',label:'Zhangjiajie, Furong y Fenghuang en siete días'}]},
 };
 return <ZhangjiajiePrivateTourPreviewPage locale="en" published edition={edition}/>;
}
