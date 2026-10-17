import { buildPrivateTourDetailHref } from '../lib/privateTourInquiryContext';
import { PrivateToursHubPage, type PrivateToursHubEdition } from './PrivateToursHubPage';
import { GermanSiteHeader, GermanSiteFooter } from './GermanChrome';
import { getGermanTourCatalog } from '../lib/germanTourCatalog';
import { getPublishedPrivateTourCatalog, type PublishedPrivateTourCatalogItem } from '../lib/publishedPrivateTourCatalog';
import { getPrivateTourFacets } from '../lib/privateTourCatalogFacets';
import { germanLanguagePaths, germanGuideLanguageNote, germanGuideLanguageBadge, germanPublishedPriceNote } from '../lib/germanSite';
import { germanLegacyTourCards, germanHalfDaySlug, germanLegacyZhangjiajieSlug } from '../lib/germanLegacyTours';

const placeNames: Readonly<Record<string,string>> = {
 'Beijing':'Peking', "Xi'an":'Xi’an','Guangzhou':'Guangzhou','Panda Base':'Panda-Aufzuchtstation', 'Terracotta Warriors':'Terrakotta-Armee', 'City Wall':'Stadtmauer', 'Muslim Quarter':'Muslimisches Viertel', 'Three Natural Bridges':'Drei natürliche Brücken', 'Li River':'Li-Fluss', 'Songhua River':'Songhua-Fluss', 'Ice and Snow World':'Ice and Snow World', 'Suzhou day trip':'Suzhou (Tagesausflug)', 'Forbidden City':'Verbotene Stadt', 'Great Wall':'Große Mauer', 'Golden Whip Stream':'Golden Whip Stream', 'Tianmen Mountain':'Tianmen-Berg', 'Furong Town':'Furong', "Nan'ao Island":'Nan’ao-Insel', 'Huizhou villages':'Huizhou-Dörfer', 'Wangxian Valley':'Wangxian-Tal', 'Changbaishan Resort':'Changbaishan-Resort', 'North Slope':'Nordhang', 'Shanghai Disneyland':'Disneyland Shanghai', 'Hanging Temple':'Hängendes Kloster', 'Yangtze Three Gorges':'Drei Schluchten des Jangtse', 'Urumqi':'Ürümqi', 'Sayram Lake':'Sayram-See', 'Mergel River':'Mergel-Fluss', 'Stone Forest':'Steinwald', 'Science and Technology Museum':'Wissenschafts- und Technikmuseum', 'Yangtze River':'Jangtse', 'Yangtze':'Jangtse', 'Snow Town':'Xuexiang', 'Changbai Mountain':'Changbai-Berg', 'Arctic Village':'Arktisches Dorf', 'Wanda Resort':'Wanda-Resort', 'Glass Bridge':'Glasbrücke',
};
const deRoute=(route:string)=>route.split(' · ').map(place=>placeNames[place]??place).join(' · ');
const money=(amount:number,currency:string)=>new Intl.NumberFormat('de-DE',{style:'currency',currency,currencyDisplay:'code',maximumFractionDigits:0}).format(amount);
const firstSentence=(text:string)=>text.match(/^.*?[.!?](?:\s|$)/u)?.[0]?.trim()??text;
const guideLabels:Readonly<Record<string,string>>={
 'English-speaking guide':'Englischsprachige Reiseleitung',
 'English-speaking guide on land':'Englischsprachige Reiseleitung an Land',
 'English guide or no on-site guide':'Englischsprachige Reiseleitung oder Variante ohne Guide vor Ort',
 'Guide language confirmed in quote':'Sprache der Reiseleitung im Angebot bestätigt',
 'English-speaking driver-host':'Englischsprachiger Fahrer und Gastgeber',
};

/** Source catalogue order, amounts, party-size entry and currency are retained. */
export function getGermanPublishedTourCatalog(): readonly PublishedPrivateTourCatalogItem[] {
 const translated = new Map(getGermanTourCatalog().map(tour=>[tour.slug,tour]));
 const products = getPublishedPrivateTourCatalog('en').map(source=>{
  const tour=translated.get(source.slug);
  const legacy=germanLegacyTourCards.find(item=>item.slug===source.slug);
  if(!tour&&!legacy) throw new Error(`Missing German catalogue copy: ${source.slug}`);
  const starting = source.startingPrice;
  const packageLabel=tour?.packages.find(p=>p.id===starting?.selection?.packageId)?.label;
  const guide = source.slug===germanLegacyZhangjiajieSlug
   ? 'Englischsprachige Reiseleitung an Tag 2 und 3. Deutschsprachige Reiseleitung ist nicht im Preis enthalten.'
   : `${guideLabels[source.guideLanguage] ?? (()=>{throw new Error(`Missing German guide label: ${source.guideLanguage}`)})()}. ${germanGuideLanguageBadge}`;
  const validity=source.slug==='harbin-winter-5-day-private-tour'
   ? 'Ankünfte von Sonntag bis Donnerstag, 6. Januar bis 5. Februar 2027, außer an Feiertagen und nach Öffnung der wichtigsten Eisattraktionen.'
   : source.slug===germanLegacyZhangjiajieSlug ? 'Veröffentlichte Preise vom 6. September bis 30. Dezember 2026 (UTC+8); für Ihre Daten erneut zu bestätigen.' : undefined;
  return {...source,title:tour?.title??legacy!.title,description:tour?.metadataDescription??legacy!.summary,href:tour?.path??legacy!.path,startingPriceHref:starting?.selection&&!source.twoTravellerPrice
    ? buildPrivateTourDetailHref(tour?.path??legacy!.path,source.slug,starting.selection)
    : `/de${source.startingPriceHref}`,
   image:{...source.image,alt:tour?.heroImage.alt??legacy!.image.alt},
   comparison:{route:deRoute(source.comparison.route),appeal:firstSentence(tour?.lede??legacy!.summary),pace:firstSentence(tour?.hotelNote??'Drei Nächte in der gewählten Kategorie; Hotel und Zimmer für Ihre Daten zu bestätigen.'),fit:tour ? firstSentence(tour.summary) : 'Ein erster Besuch von Waldpark, Glasbrücke und Tianmen.',highlights:tour?.highlights??['Waldpark','Glasbrücke','Tianmen-Berg']},
   startingPrice:starting?{...starting,formatted:money(starting.amount,starting.currency),serviceLabel:packageLabel??'Stadthotel · englischsprachige Reiseleitung an Tag 2 und 3',...(validity?{validityNote:validity}:{})}:null,
   ...(source.twoTravellerPrice?{twoTravellerPrice:{...source.twoTravellerPrice,formatted:money(source.twoTravellerPrice.amount,source.twoTravellerPrice.currency)}}:{}),guideLanguage:guide,
  };
 });
 const half=germanLegacyTourCards[1];
 return [...products,{id:half.slug,slug:half.slug,source:'structured-tour',title:half.title,description:half.summary,days:half.days,nights:half.nights,href:half.path,startingPriceHref:half.path,paths:{en:`/tours/${half.slug}/`,zh:`/zh/tours/${half.slug}/`,ko:`/ko/tours/${half.slug}/`},image:half.image,comparison:{route:'Xi’an · Terrakotta-Armee',appeal:'Ein privater Museumsbesuch mit Fahrzeug und einem Fahrer, der von der englischsprachigen Reiseleitung getrennt ist.',pace:'Etwa 5–6 Stunden ab Ihrem Hotel, davon 2,5–3 Stunden im Museum.',fit:'Die Terrakotta-Armee entdecken, ohne eine mehrtägige Reise zu buchen.',highlights:['Privater Transfer','Englischsprachige Reiseleitung im Museum','Personalisierte Tickets']},startingPrice:null,hasServiceChoice:false,guideLanguage:`Englischsprachige Reiseleitung im Museum. ${germanGuideLanguageBadge}`,shoppingStops:false,dateModified:products[0].dateModified}];
}

export function GermanToursHubPage(){
 const products=getGermanPublishedTourCatalog();
 const count=products.length;
 const sourceFacets=getPrivateTourFacets(products,'en','Auf Anfrage');
 const regionLabels:Record<string,string>={east:'Ostchina',southwest:'Südwestchina',south:'Südchina',north:'Nord- und Nordwestchina',northeast:'Nordostchina',central:'Zentralchina',multi:'Mehrere Regionen'};
 const lengthLabels:Record<string,string>={short:'Halber Tag bis 5 Tage',medium:'6 Tage',long:'7–21 Tage'};
 const priceLabels:Record<string,string>={low:'Unter 550 USD',mid:'550–1.000 USD',high:'Über 1.000 USD',quote:'Auf Anfrage'};
 const edition:PrivateToursHubEdition={
  language:'de',products,home:{path:'/de/',skipLink:'Zu den Reisen'},
  header:<GermanSiteHeader currentPath="/de/tours/" languagePaths={germanLanguagePaths('/tours/','/de/tours/')}/>,footer:<GermanSiteFooter currentPath="/de/tours/"/>,
  facets:{...sourceFacets,regions:sourceFacets.regions.map(o=>({...o,label:regionLabels[o.id]})),lengths:sourceFacets.lengths.map(o=>({...o,label:lengthLabels[o.id]})),prices:sourceFacets.prices.map(o=>({...o,label:priceLabels[o.id]}))},
  plannerPath:'/de/#planner-contact',originalImageSlugs:[germanHalfDaySlug],
  copy:{htmlLang:'de',path:'/de/tours/',metadata:{title:'China-Privatreisen: Routen und Preise',description:`Vergleichen Sie ${count} China-Reisen und Ausflüge: Stationen, Hotels, Preise und Leistungen. Deutschsprachige Reiseleitung ist nicht im Preis enthalten.`,openGraphTitle:`${count} Wege, China zu entdecken`},breadcrumbLabel:'Seitennavigation',breadcrumbHome:'Startseite',breadcrumbCurrent:'Reisen',eyebrow:`${count} CHINA-REISEN UND AUSFLÜGE`,title:'China nach Ihren Vorstellungen.',introduction:'Einige Tage in einer Region oder quer durchs Land: Vergleichen Sie Stationen, Reisetempo und Preise. Jede Reise beschreibt die enthaltenen Leistungen als Grundlage Ihres Angebots.',heroAction:`${count} Routen vergleichen`,quickCompareEyebrow:'ALLE ROUTEN',quickCompareTitle:'Finden Sie die Reise, die zu Ihnen passt.',quickCompareIntroduction:'Vergleichen Sie Reisedauer, Stationen, Unterkünfte und Preise für Ihre Gruppe.',priceBasisNote:`${germanPublishedPriceNote} ${germanGuideLanguageNote}`,quickFitLabel:'Für wen geeignet?',quickMovementLabel:'Unterkünfte und Tempo',quickAction:'Route ansehen',catalogEyebrow:'ALLE REISEN',catalogTitle:`${count} Wege, China zu entdecken.`,catalogIntroduction:'Öffnen Sie eine Reise für das Tagesprogramm, die Leistungen und die Varianten.',tourCount:(n:number)=>`${n} veröffentlichte Routen`,duration:(days:number,nights:number)=>days<1?'Ein halber Tag':`${days} Tage · ${nights} Nächte`,startingPriceLabel:'Ab',quoteOnlyLabel:'Auf Anfrage',quoteOnlyBody:'Je nach Datum, Zimmern und Reisegruppe',perPersonLabel:'pro Person',groupBasis:(n:number)=>`bei ${n} Reisenden`,twinShareBasis:'im Doppelzimmer',partySize:(n:number)=>`${n} Reisende`,perPersonPriceNote:'Preise pro Person',paceLabel:'Tempo und Unterkünfte',fitLabel:'Für wen geeignet?',highlightsLabel:'Höhepunkte',viewLabel:'Diese Reise ansehen',finalEyebrow:'EINE IDEE NIMMT GESTALT AN?',finalTitle:'Sprechen wir über Ihre Reise.',finalBody:'Nennen Sie Daten, Personenzahl und interessante Routen. Wir prüfen mögliche Anpassungen, bevor wir ein schriftliches Angebot senden. Bei Reisen mit festem Programm bleiben die veröffentlichten Leistungen bestehen.',finalAction:'Reise planen',statsRoutes:'Veröffentlichte Routen',statsRegions:'Regionen entdecken',statsLengths:'Dauer in Tagen',statsShopping:'Reisen mit angegebenen Einkaufsstopps',filterGroupLabel:'Reisen filtern',filterRegionLabel:'Region',filterLengthLabel:'Dauer',filterPriceLabel:'Einstiegspreis (USD)',filterAll:'Alle',filterReset:'Filter zurücksetzen',filterCount:'{shown} von {total} Routen',filterEmpty:'Keine Reise passt zu diesen Kriterien. Versuchen Sie eine breitere Suche.'},
  priorityCopy:{eyebrow:'ZUM EINSTIEG',title:'Einige Wege, China kennenzulernen.',introduction:'Von den großen Stationen einer ersten China-Reise bis zu ruhigeren Tagen in Jiangnan: Wählen Sie zunächst, was Sie anspricht.'},
  priorityReasons:{'beijing-xian-shanghai-8-day-private-tour':'Drei große Stationen für einen ersten Einblick in acht Tagen.','beijing-xian-chengdu-guilin-shanghai-13-day-private-tour':'Kaisergeschichte, Pandas und Landschaften im Süden, mit passender Begleitung an jeder Station.','beijing-xian-chengdu-guilin-shanghai-14-day-private-tour':'Vierzehn Tage privat von Peking über Chengdu und Guilin nach Shanghai.','beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour':'Große historische Stätten und zwei eindrucksvolle Landschaften: Zhangjiajie und Guilin.','beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour':'Eine Kleingruppenreise mit den veröffentlichten Abreiseterminen und Bedingungen.','suzhou-tongli-hangzhou-shanghai-12-day-private-tour':'Gärten, Kanäle, Tee und Stadtviertel: zwölf Tage, um Jiangnan in Ruhe kennenzulernen.'},
  arrivalPlanning:{eyebrow:'VOR DER BUCHUNG',title:'Ihre China-Reise vorbereiten.',introduction:'Unsere Reisen beginnen in China. Wählen Sie eine Route. Anschließend bestätigen wir Treffpunkt, Transfers und Leistungen für Ihre Daten und Reisegruppe schriftlich.',questions:[{title:'Wo beginnt die Reise?',body:'Internationale Flüge sind nicht enthalten. Nennen Sie Ihren Abreiseort und die geplanten Flüge. Wir prüfen Abholung, Ankunftstransfer und Programm des ersten Tages vor der Buchung.'},{title:'Wie lassen sich Preise vergleichen?',body:'Preise bleiben in der angezeigten Währung, USD oder CNY, ohne Umrechnung in Euro. Einige Dollarbeträge werden aus dem Yuan-Grundpreis berechnet; andere Varianten haben feste Dollarpreise. Vergleichen Sie auch die angegebene Personenzahl und Zimmerbelegung. Das Angebot nennt Zahlungswährung, geltenden Wechselkurs und Gesamtbetrag.'},{title:'Ist deutschsprachige Reiseleitung enthalten?',body:'Nein. Die veröffentlichten Preise umfassen die Begleitung der beschriebenen Variante. Falls Sie Deutsch wünschen, müssen Verfügbarkeit und ein gesonderter Preis vor der Buchung bestätigt werden. Prüfen Sie die geführten Tage: Peking bietet auch eine Variante ohne Guide; die klassische Zhangjiajie-Reise enthält englischsprachige Reiseleitung nur an Tag 2 und 3.'},{title:'Was gilt für Kinder oder ein ruhigeres Tempo?',body:'Nennen Sie das Alter der Kinder, Ihr Gehtempo, Treppen, die Sie vermeiden möchten, und gewünschte Zimmer. Wir prüfen die Möglichkeiten vor dem Angebot. Feste Routen behalten die veröffentlichten Besichtigungen und Transportleistungen.'}],preparationLabel:'Vor der Abreise',links:[{href:'/guides/china-entry-requirements/',label:'Einreise nach China (Englisch)'},{href:'/de/services/',label:'Passende Begleitung wählen'},{href:'/de/guides/',label:'Tipps vor der Buchung'}]},
 };
 return <PrivateToursHubPage locale="en" edition={edition}/>;
}
