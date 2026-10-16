import { PrivateToursHubPage, type PrivateToursHubEdition } from './PrivateToursHubPage';
import { FrenchSiteHeader, FrenchSiteFooter } from './FrenchChrome';
import { getFrenchTourCatalog } from '../lib/frenchTourCatalog';
import { getPublishedPrivateTourCatalog, type PublishedPrivateTourCatalogItem } from '../lib/publishedPrivateTourCatalog';
import { getPrivateTourFacets } from '../lib/privateTourCatalogFacets';
import { frenchLanguagePaths, frenchGuideLanguageNote, frenchGuideLanguageBadge, frenchPublishedPriceNote } from '../lib/frenchSite';
import { frenchLegacyTourCards, frenchHalfDaySlug, frenchLegacyZhangjiajieSlug } from '../lib/frenchLegacyTours';

const placeNames: Readonly<Record<string,string>> = {
 'Beijing':'Pékin', "Xi'an":'Xi’an','Guangzhou':'Canton','Panda Base':'Base des pandas', 'Terracotta Warriors':'Armée de terre cuite', 'City Wall':'Remparts', 'Muslim Quarter':'Quartier musulman', 'Three Natural Bridges':'Trois ponts naturels', 'Li River':'Rivière Li', 'Songhua River':'Rivière Songhua', 'Ice and Snow World':'Parc Ice and Snow World', 'Suzhou day trip':'Suzhou (excursion)', 'Forbidden City':'Cité interdite', 'Great Wall':'Grande Muraille', 'Golden Whip Stream':'Ruisseau du Fouet d’or', 'Tianmen Mountain':'Mont Tianmen', 'Furong Town':'Furong', "Nan'ao Island":'Île de Nan’ao', 'Huizhou villages':'Villages du Huizhou', 'Wangxian Valley':'Vallée de Wangxian', 'Changbaishan Resort':'Station de Changbaishan', 'North Slope':'Versant nord', 'Shanghai Disneyland':'Disneyland Shanghai', 'Hanging Temple':'Monastère suspendu', 'Yangtze Three Gorges':'Trois Gorges du Yangtsé', 'Urumqi':'Ürümqi', 'Sayram Lake':'Lac Sayram', 'Mergel River':'Rivière Mergel', 'Stone Forest':'Forêt de pierre', 'Science and Technology Museum':'Musée des sciences et des technologies', 'Yangtze River':'Yangtsé', 'Yangtze':'Yangtsé', 'Snow Town':'Xuexiang', 'Changbai Mountain':'Mont Changbai', 'Arctic Village':'Village arctique', 'Wanda Resort':'Station Wanda', 'Glass Bridge':'Pont de verre',
};
const frRoute=(route:string)=>route.split(' · ').map(place=>placeNames[place]??place).join(' · ');
const money=(amount:number,currency:string)=>new Intl.NumberFormat('fr-FR',{style:'currency',currency,currencyDisplay:'code',maximumFractionDigits:0}).format(amount);
const firstSentence=(text:string)=>text.match(/^.*?[.!?](?:\s|$)/u)?.[0]?.trim()??text;
const guideLabels:Readonly<Record<string,string>>={
 'English-speaking guide':'Guide anglophone',
 'English-speaking guide on land':'Guide anglophone pour les étapes terrestres',
 'English guide or no on-site guide':'Guide anglophone ou formule sans guide sur place',
 'Guide language confirmed in quote':'Langue du guide confirmée dans le devis',
 'English-speaking driver-host':'Chauffeur-accompagnateur anglophone',
};

/** Source catalogue order, amounts, party-size entry and currency are retained. */
export function getFrenchPublishedTourCatalog(): readonly PublishedPrivateTourCatalogItem[] {
 const translated = new Map(getFrenchTourCatalog().map(tour=>[tour.slug,tour]));
 const products = getPublishedPrivateTourCatalog('en').map(source=>{
  const tour=translated.get(source.slug);
  const legacy=frenchLegacyTourCards.find(item=>item.slug===source.slug);
  if(!tour&&!legacy) throw new Error(`Missing French catalogue copy: ${source.slug}`);
  const starting = source.startingPrice;
  const packageLabel=tour?.packages.find(p=>p.id===starting?.selection?.packageId)?.label;
  const guide = source.slug===frenchLegacyZhangjiajieSlug
   ? 'Guide anglophone : jours 2 et 3. Guide francophone : supplément sur devis.'
   : `${guideLabels[source.guideLanguage] ?? (()=>{throw new Error(`Missing French guide label: ${source.guideLanguage}`)})()}. ${frenchGuideLanguageBadge}`;
  const validity=source.slug==='harbin-winter-5-day-private-tour'
   ? 'Arrivées du dimanche au jeudi, du 6 janvier au 5 février 2027, hors jours fériés, après ouverture des principaux sites de glace.'
   : source.slug===frenchLegacyZhangjiajieSlug ? 'Tarifs publiés du 6 septembre au 30 décembre 2026 (UTC+8) ; à reconfirmer pour vos dates.' : undefined;
  return {...source,title:tour?.title??legacy!.title,description:tour?.metadataDescription??legacy!.summary,href:tour?.path??legacy!.path,startingPriceHref:`/fr${source.startingPriceHref}`,
   image:{...source.image,alt:tour?.heroImage.alt??legacy!.image.alt},
   comparison:{route:frRoute(source.comparison.route),appeal:firstSentence(tour?.lede??legacy!.summary),pace:firstSentence(tour?.hotelNote??'Trois nuits dans la catégorie choisie ; hôtel et chambres à confirmer pour vos dates.'),fit:tour ? firstSentence(tour.summary) : 'Une première découverte du parc forestier, du pont de verre et de Tianmen.',highlights:tour?.highlights??['Parc forestier','Pont de verre','Mont Tianmen']},
   startingPrice:starting?{...starting,formatted:money(starting.amount,starting.currency),serviceLabel:packageLabel??'Hôtel en ville · guide anglophone les jours 2 et 3',...(validity?{validityNote:validity}:{})}:null,
   ...(source.twoTravellerPrice?{twoTravellerPrice:{...source.twoTravellerPrice,formatted:money(source.twoTravellerPrice.amount,source.twoTravellerPrice.currency)}}:{}),guideLanguage:guide,
  };
 });
 const half=frenchLegacyTourCards[1];
 return [...products,{id:half.slug,slug:half.slug,source:'structured-tour',title:half.title,description:half.summary,days:half.days,nights:half.nights,href:half.path,startingPriceHref:half.path,paths:{en:`/tours/${half.slug}/`,zh:`/zh/tours/${half.slug}/`,ko:`/ko/tours/${half.slug}/`},image:half.image,comparison:{route:'Xi’an · Armée de terre cuite',appeal:'Une visite privée centrée sur le musée, avec véhicule et chauffeur distinct du guide anglophone.',pace:'Environ 5 à 6 heures depuis votre hôtel, dont 2 h 30 à 3 h au musée.',fit:'Pour découvrir l’armée de terre cuite sans réserver un séjour complet.',highlights:['Transfert privé','Guide anglophone au musée','Billets nominatifs']},startingPrice:null,hasServiceChoice:false,guideLanguage:`Guide anglophone au musée. ${frenchGuideLanguageBadge}`,shoppingStops:false,dateModified:products[0].dateModified}];
}

export function FrenchToursHubPage(){
 const products=getFrenchPublishedTourCatalog();
 const count=products.length;
 const sourceFacets=getPrivateTourFacets(products,'en','Sur devis');
 const regionLabels:Record<string,string>={east:'Chine de l’Est',southwest:'Sud-Ouest',south:'Chine du Sud',north:'Nord et Nord-Ouest',northeast:'Nord-Est',central:'Chine centrale',multi:'Plusieurs régions'};
 const lengthLabels:Record<string,string>={short:'D’une demi-journée à 5 jours',medium:'6 jours',long:'7 à 21 jours'};
 const priceLabels:Record<string,string>={low:'Moins de 550 USD',mid:'550 à 1 000 USD',high:'Plus de 1 000 USD',quote:'Sur devis'};
 const edition:PrivateToursHubEdition={
  language:'fr',products,home:{path:'/fr/',skipLink:'Aller aux circuits'},
  header:<FrenchSiteHeader currentPath="/fr/tours/" languagePaths={frenchLanguagePaths('/tours/','/fr/tours/')}/>,footer:<FrenchSiteFooter currentPath="/fr/tours/"/>,
  facets:{...sourceFacets,regions:sourceFacets.regions.map(o=>({...o,label:regionLabels[o.id]})),lengths:sourceFacets.lengths.map(o=>({...o,label:lengthLabels[o.id]})),prices:sourceFacets.prices.map(o=>({...o,label:priceLabels[o.id]}))},
  plannerPath:'/fr/#planner-contact',originalImageSlugs:[frenchHalfDaySlug],
  copy:{htmlLang:'fr',path:'/fr/tours/',metadata:{title:'Circuits privés en Chine : itinéraires et tarifs',description:`Comparez ${count} circuits et visites en Chine : étapes, hébergements, tarifs et prestations. Guide francophone en supplément, sur devis.`,openGraphTitle:`${count} façons de découvrir la Chine`},breadcrumbLabel:'Fil d’Ariane',breadcrumbHome:'Accueil',breadcrumbCurrent:'Circuits',eyebrow:`${count} ITINÉRAIRES ET VISITES EN CHINE`,title:'La Chine, au fil de vos envies.',introduction:'Quelques jours dans une région ou une traversée du pays : comparez les étapes, le rythme et les tarifs. Chaque circuit précise les prestations comprises avant de préparer votre devis.',heroAction:`Comparer les ${count} itinéraires`,quickCompareEyebrow:'TOUS LES ITINÉRAIRES',quickCompareTitle:'Trouvez le voyage qui vous ressemble.',quickCompareIntroduction:'Comparez les durées, les étapes, les hébergements et les prix pour votre groupe.',priceBasisNote:`${frenchPublishedPriceNote} ${frenchGuideLanguageNote}`,quickFitLabel:'Pour quel voyage ?',quickMovementLabel:'Hébergements et rythme',quickAction:'Voir l’itinéraire',catalogEyebrow:'LE CATALOGUE COMPLET',catalogTitle:`${count} façons de découvrir la Chine.`,catalogIntroduction:'Ouvrez un circuit pour retrouver le programme jour par jour, les prestations et les formules.',tourCount:(n:number)=>`${n} itinéraires publiés`,duration:(days:number,nights:number)=>days<1?'Une demi-journée':`${days} jours · ${nights} nuits`,startingPriceLabel:'À partir de',quoteOnlyLabel:'Sur devis',quoteOnlyBody:'Selon les dates, les chambres et le groupe',perPersonLabel:'par personne',groupBasis:(n:number)=>`pour ${n} voyageurs`,twinShareBasis:'en chambre double',partySize:(n:number)=>`${n} voyageurs`,perPersonPriceNote:'Tarifs par personne',paceLabel:'Rythme et hébergements',fitLabel:'Pour quel voyage ?',highlightsLabel:'Les temps forts',viewLabel:'Découvrir ce circuit',finalEyebrow:'UNE ENVIE SE DESSINE ?',finalTitle:'Parlons de votre voyage.',finalBody:'Indiquez vos dates, le nombre de voyageurs et les circuits qui vous intéressent. Nous vérifions les possibilités d’adaptation avant de vous envoyer un devis écrit. Les circuits à programme fixe conservent les prestations annoncées.',finalAction:'Préparer mon voyage',statsRoutes:'Itinéraires publiés',statsRegions:'Régions à découvrir',statsLengths:'Durée en jours',statsShopping:'Circuits avec arrêts commerciaux annoncés',filterGroupLabel:'Filtrer les circuits',filterRegionLabel:'Région',filterLengthLabel:'Durée',filterPriceLabel:'Prix de départ (USD)',filterAll:'Tous',filterReset:'Effacer les filtres',filterCount:'{shown} sur {total} itinéraires',filterEmpty:'Aucun circuit ne correspond à ces critères. Essayez d’élargir votre recherche.'},
  priorityCopy:{eyebrow:'POUR COMMENCER',title:'Quelques façons d’aborder la Chine.',introduction:'Des grandes étapes d’un premier voyage aux journées plus lentes du Jiangnan, choisissez d’abord ce qui vous attire.'},
  priorityReasons:{'beijing-xian-shanghai-8-day-private-tour':'Trois grandes étapes pour une première découverte en huit jours.','beijing-xian-chengdu-guilin-shanghai-13-day-private-tour':'Histoire impériale, pandas et paysages du Sud, avec un accompagnement adapté à chaque étape.','beijing-xian-chengdu-guilin-shanghai-14-day-private-tour':'Quatorze jours en privé, de Pékin à Shanghai en passant par Chengdu et Guilin.','beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour':'Les grands sites historiques et deux paysages majeurs : Zhangjiajie et Guilin.','beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour':'Un départ en petit groupe, avec les dates et conditions de la formule publiée.','suzhou-tongli-hangzhou-shanghai-12-day-private-tour':'Jardins, canaux, thé et vie de quartier : douze jours pour prendre le temps du Jiangnan.'},
  arrivalPlanning:{eyebrow:'AVANT DE RÉSERVER',title:'Préparer un circuit en Chine depuis la France.',introduction:'Nos voyages commencent en Chine. Choisissez un itinéraire, puis nous précisons par écrit le lieu de rendez-vous, les transferts et les prestations pour vos dates et votre groupe.',questions:[{title:'Où commence le voyage ?',body:'Les vols internationaux ne sont pas inclus. Transmettez votre ville de départ et les vols envisagés : nous vérifions l’accueil, le transfert d’arrivée et le programme du premier jour avant réservation.'},{title:'Comment comparer les prix ?',body:'Les prix conservent la devise affichée, USD ou CNY, sans conversion en euros. Certains montants en dollars sont calculés à partir du prix de base en yuans ; d’autres formules ont un prix fixe en dollars. Comparez aussi le nombre de voyageurs et les chambres indiqués. Le devis précise la devise de paiement, le taux applicable et le total.'},{title:'Peut-on voyager avec un guide francophone ?',body:'Oui, sous réserve de disponibilité, avec un supplément chiffré séparément. Les prix publiés conservent l’accompagnement de la formule de base. Vérifiez les journées guidées : Pékin propose aussi une formule sans guide ; le circuit classique de Zhangjiajie inclut un guide anglophone uniquement les jours 2 et 3.'},{title:'Et pour les enfants ou un rythme plus tranquille ?',body:'Précisez l’âge des enfants, vos habitudes de marche, les escaliers que vous préférez éviter et les chambres souhaitées. Nous examinons les possibilités avant le devis ; les parcours fixes gardent les visites et transports annoncés.'}],preparationLabel:'Pour préparer votre départ',links:[{href:'/guides/china-entry-requirements/',label:'Formalités d’entrée en Chine (en anglais)'},{href:'/fr/services/',label:'Choisir son accompagnement'},{href:'/fr/guides/',label:'Conseils avant de réserver'}]},
 };
 return <PrivateToursHubPage locale="en" edition={edition}/>;
}
