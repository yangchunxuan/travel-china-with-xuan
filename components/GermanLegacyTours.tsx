import { GermanSiteHeader, GermanSiteFooter, GermanTourHeader } from './GermanChrome';
import { TerracottaHalfDayPage } from './TerracottaHalfDayPage';
import { TerracottaHalfDaySend } from './TerracottaHalfDaySend';
import { ZhangjiajiePrivateTourPreviewPage, type ZhangjiajieTourEdition } from './ZhangjiajiePrivateTourPreviewPage';
import { ZhangjiajieTourComparisonLink } from './ZhangjiajieTourComparisonLink';
import { TourPriceScope } from './TourPriceScope';
import { TourWhatsAppLink } from './TourWhatsAppLink';
import { germanLanguagePaths, germanGuideLanguageNote } from '../lib/germanSite';
import { germanHalfDayCopy, germanHalfDayPath, germanHalfDaySlug, germanLegacyZhangjiajie, germanLegacyZhangjiajiePath, germanLegacyZhangjiajieSlug, germanLegacyPricing } from '../lib/germanLegacyTours';
import { germanClassicCopy, germanClassicPricing, germanZhangjiajieComparison } from '../lib/germanLegacyPresentation';
import { germanCommercialCopy } from '../lib/germanTourPresentation';

function TourSchema({path,title,description,itinerary,faq}:{path:string;title:string;description:string;itinerary:readonly {title:string;body:string}[];faq:readonly {question:string;answer:string}[]}) {
 const url=`https://homegroundchina.com${path}`;
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,inLanguage:'de'},
  {'@type':'TouristTrip','@id':`${url}#trip`,url,name:title,description,touristType:'Reisende auf einer Privatreise',itinerary:{'@type':'ItemList',numberOfItems:itinerary.length,itemListElement:itinerary.map((day,index)=>({'@type':'ListItem',position:index+1,name:day.title,description:day.body}))}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Startseite',item:'https://homegroundchina.com/de/'},{'@type':'ListItem',position:2,name:'Reisen',item:'https://homegroundchina.com/de/tours/'},{'@type':'ListItem',position:3,name:title,item:url}]},
  {'@type':'FAQPage','@id':`${url}#faq`,inLanguage:'de',mainEntity:faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>;
}

/** The same half-day page and sending interaction as EN/ZH/KO, with German copy. */
export function GermanTerracottaHalfDayPage(){
 const copy=germanHalfDayCopy;
 const message=[copy.message.opening,'',`${copy.message.date} :`,`${copy.message.travellers} :`,`${copy.message.hotel} :`,'Gewünschte Sprache der Reiseleitung (Verfügbarkeit und Preis bitte bestätigen):','',`${copy.message.page} : https://homegroundchina.com${germanHalfDayPath}`].join('\n');
 return <>
  <TerracottaHalfDayPage locale="en" edition={{language:'de',copy,homePath:'/de/',guideNote:germanGuideLanguageNote,
   header:<GermanSiteHeader currentPath={germanHalfDayPath} contactHref={`${germanHalfDayPath}#half-day-enquiry`} languagePaths={germanLanguagePaths(`/tours/${germanHalfDaySlug}/`,germanHalfDayPath)}/>,
   footer:<GermanSiteFooter currentPath={germanHalfDayPath}/>,
   send:<TerracottaHalfDaySend locale="en" edition={{language:'de',copy,message,homePath:'/de/'}}/>,
  }}/>
  <TourSchema path={germanHalfDayPath} title={copy.title} description={copy.description} itinerary={copy.stops} faq={copy.faq}/>
 </>;
}

/** Source classic-tour layout, live price window, stay grid and enquiry links. */
export function GermanLegacyZhangjiajiePage(){
 const edition:ZhangjiajieTourEdition={
  language:'de',copy:germanClassicCopy,pricing:germanClassicPricing(),commercialCopy:germanCommercialCopy,
  homePath:'/de/',canonicalPath:germanLegacyZhangjiajiePath,
  header:<GermanTourHeader tourSlug={germanLegacyZhangjiajieSlug}/>,footer:<GermanSiteFooter currentPath={germanLegacyZhangjiajiePath}/>,
  whatsAppLink:<TourWhatsAppLink locale="en" slug={germanLegacyZhangjiajieSlug} edition={{language:'de',label:'Auf WhatsApp schreiben',title:germanLegacyZhangjiajie.title,path:germanLegacyZhangjiajiePath,packageLabels:Object.fromEntries(germanLegacyPricing.tiers.map(t=>[t.id,t.name])),guideNote:'Gewünschte Sprache der Reiseleitung (Verfügbarkeit und Preis bitte bestätigen):'}}/>,
  priceScope:<TourPriceScope route="zhangjiajie" locale="en" detailsHref="#scope-title" edition={{copy:{title:'Die wichtigsten Preisbedingungen',included:'Enthalten',separate:'Zusätzlich einplanen',confirm:'Vor der Zahlung',details:'Alle enthaltenen und ausgeschlossenen Leistungen ansehen'},content:{included:'Drei Nächte in der gewählten Kategorie; privater Transport vor Ort und vereinbarte Transfers; englischsprachige Reiseleitung an Tag 2 und 3; Erwachsenentickets und Transporte innerhalb der Sehenswürdigkeiten gemäß Bestätigung.',separate:'An- und Abreise nach Zhangjiajie, Mittag- und Abendessen, optionale Aktivitäten; Aufpreise für Einzelzimmer, Kinder und Fahrzeugupgrades. Deutschsprachige Reiseleitung ist nicht enthalten; Verfügbarkeit und Preis müssen separat bestätigt werden.',confirm:'Unterkunft, Zimmer, Frühstück, Fahrzeug und Begleitung. Die Fotos zeigen mögliche Unterkünfte; Ihr Zimmer wird für Ihre Daten bestätigt.'}}}/>,
  comparison:<ZhangjiajieTourComparisonLink currentRoute="classic" locale="en" edition={{copy:germanZhangjiajieComparison,paths:{classic:germanLegacyZhangjiajiePath,forest:'/de/tours/zhangjiajie-forest-4-day-private-tour/',ancientTowns:'/de/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/'}}}/>,
  dayTitles:germanLegacyZhangjiajie.itinerary.map(day=>day.title),
  routePhotos:{2:{alt:'Der Bailong-Aufzug führt an den Sandsteinklippen im Waldpark Zhangjiajie entlang',caption:'Der Bailong-Aufzug im Herzen des Waldparks'},3:{alt:'Die Glasbrücke überspannt den Grand Canyon von Zhangjiajie',caption:'Die Glasbrücke im Grand Canyon'},4:{alt:'Der natürliche Tianmen-Felsbogen am oberen Ende seiner Treppe',caption:'Tianmen: ein Felsbogen zwischen Himmel und Berg'}},
  photoCopy:{title:'Bildnachweise',local:'Diese Fotos stammen aus dem Bildarchiv des Homeground-Projekts. Der Eigentümer hat ihre Nutzung auf dieser Website erlaubt. Es wurden nur Zuschnitt, Größenänderung und Formatkonvertierung vorgenommen.'},
  ui:{tourHub:'Reisen',checkPrices:'Preis für meine Daten prüfen',heroAlt:'Sonnenlicht beleuchtet Sandsteingipfel und bewaldete Täler im Waldpark Zhangjiajie',dayPrefix:'Tag',creditPrefix:'Foto: ',cropped:' · zugeschnitten',accommodationReference:'Unterkunftsbeispiel',touristType:'Erster Besuch in Zhangjiajie',groupStayInquiry:'Diese Unterkunft für meine Gruppe anfragen'},
  planningContext:{destinations:[{id:'zhangjiajie',href:'/destinations/zhangjiajie/',label:'Zhangjiajie entdecken (Englisch)'}],guides:[{id:'de-guides',href:'/de/guides/',label:'Ihre China-Reise vorbereiten'},{id:'de-services',href:'/de/services/',label:'Passende Begleitung wählen'}],relatedProducts:[{id:'forest',href:'/de/tours/zhangjiajie-forest-4-day-private-tour/',label:'Zhangjiajie: Waldpark-Reise in vier Tagen'},{id:'towns',href:'/de/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/',label:'Zhangjiajie, Furong und Fenghuang in sieben Tagen'}]},
 };
 return <ZhangjiajiePrivateTourPreviewPage locale="en" published edition={edition}/>;
}
