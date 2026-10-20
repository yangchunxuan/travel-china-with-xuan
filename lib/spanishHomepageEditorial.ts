import { getHomepagePrivateTourItems, type HomepagePrivateTourItem } from './homepagePrivateTourCatalog';
import { getHomepageGuideChapters, type HomepageGuideChapter } from './homepageEditorial';
import { getSpanishTourCatalog } from './spanishTourCatalog';
import { buildPrivateTourDetailHref } from './privateTourInquiryContext';
const tourAppeals: Readonly<Record<string,{appeal:string;alt:string}>>={
  'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour':{appeal:'La Gran Muralla, los Guerreros de Terracota, los pandas, el río Li y Shanghái en un viaje privado de trece días.',alt:'Visitantes en la Gran Muralla de Mutianyu'},
  'beijing-highlights-5-day-private-tour':{appeal:'Tres días de visitas para conocer la Gran Muralla de Badaling y la Ciudad Prohibida, sujeto a la confirmación de las reservas necesarias y el mismo hotel cada noche.',alt:'Monumentos históricos del eje imperial de Pekín'},
  'suzhou-tongli-hangzhou-shanghai-12-day-private-tour':{appeal:'Los jardines de Suzhou, una noche entre los canales de Tongli, el Lago del Oeste y los campos de té. Después, cinco noches para explorar los barrios y museos de Shanghái.',alt:'El Lago del Oeste y las colinas arboladas de Hangzhou'},
  'chengdu-pandas-sanxingdui-5-day-private-tour':{appeal:'Ver los pandas a primera hora, dedicar buena parte de un día a Sanxingdui y sentarse a tomar té en el Parque del Pueblo, sin cambiar de hotel en Chengdu.',alt:'Un panda en el centro de investigación de Chengdu'},
  'xian-terracotta-warriors-5-day-private-tour':{appeal:'Recorrer las murallas de Xi’an, dedicar un día a los Guerreros de Terracota y al Palacio Huaqing, y conocer la Gran Mezquita y el barrio musulmán con tu guía.',alt:'Murallas y tejados históricos de Xi’an'},
  'guilin-yangshuo-5-day-private-tour':{appeal:'Navegar por el río Li entre montañas kársticas hasta Yangshuo, pasar allí dos noches y reservar un día completo para el campo junto al río Yulong.',alt:'Balsas de bambú en el río Yulong, entre las montañas kársticas de Yangshuo'},
};
const serviceLabels:Readonly<Record<string,string>>={'With hotels and breakfast':'Hoteles y desayunos incluidos','Self-guided · private driver & remote support':'Sin guía presencial','Private tour':'Viaje privado'};
export function getSpanishHomepageProducts():readonly HomepagePrivateTourItem[]{
  const catalog=new Map(getSpanishTourCatalog().map(tour=>[tour.slug,tour]));
  return getHomepagePrivateTourItems('en').map(item=>{
    const tour=catalog.get(item.id),copy=tourAppeals[item.id];
    if(!tour||!copy) throw new Error(`Missing Spanish homepage tour: ${item.id}`);
    const selectedPackage=tour.packages.find(option=>option.id===item.startingPrice?.selection?.packageId);
    const startingRow=selectedPackage?.rows.find(row=>row.travelers===item.startingPrice?.travelers),twoTravellerRow=selectedPackage?.rows.find(row=>row.travelers===2);
    if(item.startingPrice&&(!startingRow||!serviceLabels[item.startingPrice.serviceLabel])) throw new Error(`Missing Spanish homepage price: ${item.id}`);
    if(item.twoTravellerPrice&&!twoTravellerRow) throw new Error(`Missing Spanish two-person price: ${item.id}`);
    // A card showing only one price opens that exact published group size.
    // Cards showing a two-traveller price keep the source's two-person entry.
    const href=item.startingPrice?.selection&&!item.twoTravellerPrice
      ? buildPrivateTourDetailHref(tour.path,tour.slug,item.startingPrice.selection)
      : `/es${item.href}`;
    return {...item,title:tour.title,appeal:copy.appeal,href,image:{...item.image,alt:copy.alt},startingPrice:item.startingPrice&&startingRow?{...item.startingPrice,formatted:startingRow.formatted,serviceLabel:serviceLabels[item.startingPrice.serviceLabel]}:null,...(item.twoTravellerPrice&&twoTravellerRow?{twoTravellerPrice:{formatted:twoTravellerRow.formatted}}:{})};
  });
}
const guideTitles:Readonly<Record<string,string>>={
  'is-your-china-itinerary-too-rushed':'¿Tu itinerario por China deja tiempo para disfrutar?',
  'china-regional-food-route':'Viajar por las cocinas regionales de China: cómo trazar la ruta',
  'china-itinerary-with-older-parents':'Viajar a China con padres mayores: qué ritmo elegir',
  'beijing-south-station-to-capital-or-daxing-airport':'De Pekín Sur al aeropuerto de Daxing o de la Capital',
  'guilin-airport-or-railway-station-arrival-guide':'Llegar a Guilin: qué aeropuerto o estación elegir',
  'shenzhen-airport-railway-station-border-port-selector':'Llegar a Shenzhen: aeropuerto, estación o paso fronterizo',
  'zhangjiajie-city-or-wulingyuan-hotel-base':'Dónde alojarte: ciudad de Zhangjiajie o Wulingyuan',
  'beijing-where-to-stay-first-trip':'Primer viaje a Pekín: qué barrio elegir',
  'yangshuo-town-or-yulong-river-where-to-stay':'Yangshuo: centro del pueblo o campo junto al río Yulong',
};
export function getSpanishHomepageGuideChapters():readonly HomepageGuideChapter[]{
  return getHomepageGuideChapters('en').map(chapter=>({...chapter,guides:chapter.guides.map(guide=>{
    const title=guideTitles[guide.id];if(!title)throw new Error(`Missing Spanish homepage guide label: ${guide.id}`);
    if(guide.id==='yangshuo-town-or-yulong-river-where-to-stay')return {...guide,title,eyebrow:'Consejos prácticos',href:'/es/guias/yangshuo-town-or-yulong-river-where-to-stay/',linkLabel:'Leer el artículo en español'};
    return {...guide,title,eyebrow:'Consejos prácticos',linkLabel:'Leer el artículo en inglés'};
  })}));
}
