import { FrenchSiteHeader, FrenchSiteFooter, FrenchTourHeader } from './FrenchChrome';
import { destinationEditionCityLink } from '../lib/destinationEditions';
import { TerracottaHalfDayPage } from './TerracottaHalfDayPage';
import { TerracottaHalfDaySend } from './TerracottaHalfDaySend';
import { ZhangjiajiePrivateTourPreviewPage, type ZhangjiajieTourEdition } from './ZhangjiajiePrivateTourPreviewPage';
import { ZhangjiajieTourComparisonLink } from './ZhangjiajieTourComparisonLink';
import { TourPriceScope } from './TourPriceScope';
import { TourWhatsAppLink } from './TourWhatsAppLink';
import { frenchLanguagePaths, frenchGuideLanguageNote } from '../lib/frenchSite';
import { frenchHalfDayCopy, frenchHalfDayPath, frenchHalfDaySlug, frenchLegacyZhangjiajie, frenchLegacyZhangjiajiePath, frenchLegacyZhangjiajieSlug, frenchLegacyPricing } from '../lib/frenchLegacyTours';
import { frenchClassicCopy, frenchClassicPricing, frenchZhangjiajieComparison } from '../lib/frenchLegacyPresentation';
import { frenchCommercialCopy } from '../lib/frenchTourPresentation';

function TourSchema({path,title,description,itinerary,faq}:{path:string;title:string;description:string;itinerary:readonly {title:string;body:string}[];faq:readonly {question:string;answer:string}[]}) {
 const url=`https://homegroundchina.com${path}`;
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,inLanguage:'fr'},
  {'@type':'TouristTrip','@id':`${url}#trip`,url,name:title,description,touristType:'Voyageurs en circuit privé',itinerary:{'@type':'ItemList',numberOfItems:itinerary.length,itemListElement:itinerary.map((day,index)=>({'@type':'ListItem',position:index+1,name:day.title,description:day.body}))}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:'https://homegroundchina.com/fr/'},{'@type':'ListItem',position:2,name:'Circuits',item:'https://homegroundchina.com/fr/tours/'},{'@type':'ListItem',position:3,name:title,item:url}]},
  {'@type':'FAQPage','@id':`${url}#faq`,inLanguage:'fr',mainEntity:faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>;
}

/** The same half-day page and sending interaction as EN/ZH/KO, with French copy. */
export function FrenchTerracottaHalfDayPage(){
 const copy=frenchHalfDayCopy;
 const message=[copy.message.opening,'',`${copy.message.date} :`,`${copy.message.travellers} :`,`${copy.message.hotel} :`,'Guide francophone souhaité (supplément sur devis) :','',`${copy.message.page} : https://homegroundchina.com${frenchHalfDayPath}`].join('\n');
 return <>
  <TerracottaHalfDayPage locale="en" edition={{language:'fr',copy,homePath:'/fr/',guideNote:frenchGuideLanguageNote,
   header:<FrenchSiteHeader currentPath={frenchHalfDayPath} contactHref={`${frenchHalfDayPath}#half-day-enquiry`} languagePaths={frenchLanguagePaths(`/tours/${frenchHalfDaySlug}/`,frenchHalfDayPath)}/>,
   footer:<FrenchSiteFooter currentPath={frenchHalfDayPath}/>,
   send:<TerracottaHalfDaySend locale="en" edition={{language:'fr',copy,message,homePath:'/fr/'}}/>,
  }}/>
  <TourSchema path={frenchHalfDayPath} title={copy.title} description={copy.description} itinerary={copy.stops} faq={copy.faq}/>
 </>;
}

/** Source classic-tour layout, live price window, stay grid and enquiry links. */
/** The Zhangjiajie city page in this edition's language once it exists, otherwise the English one (marked). */
const zhangjiajieCity = destinationEditionCityLink('fr', 'zhangjiajie');
export function FrenchLegacyZhangjiajiePage(){
 const edition:ZhangjiajieTourEdition={
  language:'fr',copy:frenchClassicCopy,pricing:frenchClassicPricing(),commercialCopy:frenchCommercialCopy,
  homePath:'/fr/',canonicalPath:frenchLegacyZhangjiajiePath,
  header:<FrenchTourHeader tourSlug={frenchLegacyZhangjiajieSlug}/>,footer:<FrenchSiteFooter currentPath={frenchLegacyZhangjiajiePath}/>,
  whatsAppLink:<TourWhatsAppLink locale="en" slug={frenchLegacyZhangjiajieSlug} edition={{language:'fr',label:'Échanger sur WhatsApp',title:frenchLegacyZhangjiajie.title,path:frenchLegacyZhangjiajiePath,packageLabels:Object.fromEntries(frenchLegacyPricing.tiers.map(t=>[t.id,t.name])),guideNote:'Guide francophone souhaité (supplément sur devis) :'}}/>,
  priceScope:<TourPriceScope route="zhangjiajie" locale="en" detailsHref="#scope-title" edition={{copy:{title:'Les points essentiels du tarif',included:'Inclus',separate:'À prévoir en plus',confirm:'Avant paiement',details:'Voir toutes les prestations incluses et non incluses'},content:{included:'Trois nuits dans la catégorie choisie ; transports locaux privés et transferts convenus ; guide anglophone les jours 2 et 3 ; billets adultes et transports dans les sites indiqués dans la confirmation.',separate:'Voyage aller-retour à Zhangjiajie, déjeuners et dîners, activités facultatives ; différences pour chambre individuelle, enfants et véhicule supérieur. Guide francophone en supplément, sur devis.',confirm:'L’établissement, la chambre, le petit-déjeuner, le véhicule et l’accompagnement. Les photos montrent des hébergements possibles ; votre chambre est confirmée pour vos dates.'}}}/>,
  comparison:<ZhangjiajieTourComparisonLink currentRoute="classic" locale="en" edition={{copy:frenchZhangjiajieComparison,paths:{classic:frenchLegacyZhangjiajiePath,forest:'/fr/tours/zhangjiajie-forest-4-day-private-tour/',ancientTowns:'/fr/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/'}}}/>,
  dayTitles:frenchLegacyZhangjiajie.itinerary.map(day=>day.title),
  routePhotos:{2:{alt:'L’ascenseur Bailong longe les falaises de grès du parc forestier de Zhangjiajie',caption:'L’ascenseur Bailong, au cœur du parc forestier'},3:{alt:'Le pont de verre traverse le Grand Canyon de Zhangjiajie',caption:'Le pont de verre du Grand Canyon'},4:{alt:'L’arche naturelle de Tianmen au sommet de son escalier',caption:'Tianmen : une arche entre ciel et montagne'}},
  photoCopy:{title:'Crédits photographiques',local:'Ces photographies proviennent de la photothèque du projet Homeground et leur utilisation sur ce site a été autorisée par son propriétaire. Seuls le recadrage, le redimensionnement et la conversion de format ont été effectués.'},
  ui:{tourHub:'Circuits',checkPrices:'Vérifier le prix pour mes dates',heroAlt:'La lumière du soleil éclaire les pics de grès et les vallées boisées du parc forestier de Zhangjiajie',dayPrefix:'Jour',creditPrefix:'Photo : ',cropped:' · recadrée',accommodationReference:'Exemple d’hébergement',touristType:'Première découverte de Zhangjiajie',groupStayInquiry:'Demander cet hébergement pour mon groupe'},
  planningContext:{destinations:[{id:'zhangjiajie',href:zhangjiajieCity.href,label:zhangjiajieCity.english?'Découvrir Zhangjiajie (en anglais)':'Découvrir Zhangjiajie'}],guides:[{id:'fr-guides',href:'/fr/guides/',label:'Préparer votre voyage en Chine'},{id:'fr-services',href:'/fr/services/',label:'Choisir votre accompagnement'}],relatedProducts:[{id:'forest',href:'/fr/tours/zhangjiajie-forest-4-day-private-tour/',label:'Zhangjiajie : le circuit Forêt en quatre jours'},{id:'towns',href:'/fr/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/',label:'Zhangjiajie, Furong et Fenghuang en sept jours'}]},
 };
 return <ZhangjiajiePrivateTourPreviewPage locale="en" published edition={edition}/>;
}
