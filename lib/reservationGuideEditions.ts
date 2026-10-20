import { japaneseReservationGuideUi } from "./japaneseReservationGuideUi";
import type { Metadata } from "next";
import { getGuideEntry, getGuideLanguagePaths, type GuideId } from "./guideRegistry";
import { assertStructuredPageBody, type StructuredPageBody } from "./content-system/page-body";
import { reservationGuideEditionPath, isReservationGuideEditionSlug, type ReservationGuideEditionLocale } from "./reservationGuideEditionPaths";
import { serviceDetailSlugs, serviceEditionPaths } from "./serviceEdition";
import { entryRequirementsEditionPath, entryRequirementsEnglishPath } from "./entryRequirementsEditionPaths";
import { privateTourProducts } from "./privateTourProducts";
import { destinationEditionCityPath, destinationsHubEditionPath, hasDestinationEditionCity } from "./destinationEditions";
import ja0 from "./reservation-guide-editions/ja/food-plants-and-animal-products-into-china.json";
import ja1 from "./reservation-guide-editions/ja/yangshuo-town-or-yulong-river-where-to-stay.json";
import ja2 from "./reservation-guide-editions/ja/shanghai-where-to-stay-first-trip.json";
import ja3 from "./reservation-guide-editions/ja/tianmen-mountain-tickets-and-routes.json";
import ja4 from "./reservation-guide-editions/ja/li-river-cruise-tickets-piers-booking.json";
import ja5 from "./reservation-guide-editions/ja/forbidden-city-for-foreign-visitors.json";
import fr0 from "./reservation-guide-editions/fr/food-plants-and-animal-products-into-china.json";
import fr1 from "./reservation-guide-editions/fr/yangshuo-town-or-yulong-river-where-to-stay.json";
import fr2 from "./reservation-guide-editions/fr/shanghai-where-to-stay-first-trip.json";
import fr3 from "./reservation-guide-editions/fr/tianmen-mountain-tickets-and-routes.json";
import fr4 from "./reservation-guide-editions/fr/li-river-cruise-tickets-piers-booking.json";
import fr5 from "./reservation-guide-editions/fr/forbidden-city-for-foreign-visitors.json";
import es0 from "./reservation-guide-editions/es/food-plants-and-animal-products-into-china.json";
import es1 from "./reservation-guide-editions/es/yangshuo-town-or-yulong-river-where-to-stay.json";
import es2 from "./reservation-guide-editions/es/shanghai-where-to-stay-first-trip.json";
import es3 from "./reservation-guide-editions/es/tianmen-mountain-tickets-and-routes.json";
import es4 from "./reservation-guide-editions/es/li-river-cruise-tickets-piers-booking.json";
import es5 from "./reservation-guide-editions/es/forbidden-city-for-foreign-visitors.json";
import de0 from "./reservation-guide-editions/de/food-plants-and-animal-products-into-china.json";
import de1 from "./reservation-guide-editions/de/yangshuo-town-or-yulong-river-where-to-stay.json";
import de2 from "./reservation-guide-editions/de/shanghai-where-to-stay-first-trip.json";
import de3 from "./reservation-guide-editions/de/tianmen-mountain-tickets-and-routes.json";
import de4 from "./reservation-guide-editions/de/li-river-cruise-tickets-piers-booking.json";
import de5 from "./reservation-guide-editions/de/forbidden-city-for-foreign-visitors.json";
import ar0 from "./reservation-guide-editions/ar/food-plants-and-animal-products-into-china.json";
import ar1 from "./reservation-guide-editions/ar/yangshuo-town-or-yulong-river-where-to-stay.json";
import ar2 from "./reservation-guide-editions/ar/shanghai-where-to-stay-first-trip.json";
import ar3 from "./reservation-guide-editions/ar/tianmen-mountain-tickets-and-routes.json";
import ar4 from "./reservation-guide-editions/ar/li-river-cruise-tickets-piers-booking.json";
import ar5 from "./reservation-guide-editions/ar/forbidden-city-for-foreign-visitors.json";
export interface ReservationGuideEdition {
  slug: string; title: string; headline: string; description: string; navTitle: string; heroAlt: string; body: StructuredPageBody;
}
const editions = {ja: {"food-plants-and-animal-products-into-china": ja0, "yangshuo-town-or-yulong-river-where-to-stay": ja1, "shanghai-where-to-stay-first-trip": ja2, "tianmen-mountain-tickets-and-routes": ja3, "li-river-cruise-tickets-piers-booking": ja4, "forbidden-city-for-foreign-visitors": ja5},
fr: {"food-plants-and-animal-products-into-china": fr0, "yangshuo-town-or-yulong-river-where-to-stay": fr1, "shanghai-where-to-stay-first-trip": fr2, "tianmen-mountain-tickets-and-routes": fr3, "li-river-cruise-tickets-piers-booking": fr4, "forbidden-city-for-foreign-visitors": fr5},
es: {"food-plants-and-animal-products-into-china": es0, "yangshuo-town-or-yulong-river-where-to-stay": es1, "shanghai-where-to-stay-first-trip": es2, "tianmen-mountain-tickets-and-routes": es3, "li-river-cruise-tickets-piers-booking": es4, "forbidden-city-for-foreign-visitors": es5},
de: {"food-plants-and-animal-products-into-china": de0, "yangshuo-town-or-yulong-river-where-to-stay": de1, "shanghai-where-to-stay-first-trip": de2, "tianmen-mountain-tickets-and-routes": de3, "li-river-cruise-tickets-piers-booking": de4, "forbidden-city-for-foreign-visitors": de5},
ar: {"food-plants-and-animal-products-into-china": ar0, "yangshuo-town-or-yulong-river-where-to-stay": ar1, "shanghai-where-to-stay-first-trip": ar2, "tianmen-mountain-tickets-and-routes": ar3, "li-river-cruise-tickets-piers-booking": ar4, "forbidden-city-for-foreign-visitors": ar5}} as const;
export const reservationGuideEditionUi = {
  ja: japaneseReservationGuideUi,
  fr: {home:"Accueil", guides:"Guides de voyage", skip:"Aller à l’article", breadcrumb:"Fil d’Ariane", reviewed:"Informations vérifiées le", author:"Par", english:"en anglais", collection:"Préparer votre voyage et vos visites", read:"Lire le guide", destinationLabel:"Destinations liées", destinationTitle:"Replacez cette réponse dans un séjour concret.", routeLabel:"Itinéraires publiés pertinents", routeTitle:"Appliquez ce choix à un itinéraire réel."},
  es: {home:"Inicio", guides:"Guías de viaje", skip:"Ir al artículo", breadcrumb:"Ruta de navegación", reviewed:"Información revisada el", author:"Por", english:"en inglés", collection:"Prepara tu viaje y tus visitas", read:"Leer la guía", destinationLabel:"Destinos relacionados", destinationTitle:"Lleva esta respuesta a una estancia concreta.", routeLabel:"Rutas publicadas relacionadas", routeTitle:"Aplica esta decisión a un itinerario real."},
  de: {home:"Startseite", guides:"Reiseführer", skip:"Zum Artikel", breadcrumb:"Brotkrümelnavigation", reviewed:"Informationen geprüft am", author:"Von", english:"auf Englisch", collection:"Reiseplanung und Eintrittskarten", read:"Reiseführer lesen", destinationLabel:"Passende Reiseziele", destinationTitle:"Übertragen Sie diese Hinweise auf Ihren Aufenthalt.", routeLabel:"Passende veröffentlichte Routen", routeTitle:"Setzen Sie diese Entscheidung in einer konkreten Reiseroute um."},
  ar: {home:"الرئيسية", guides:"أدلة السفر", skip:"انتقل إلى المقال", breadcrumb:"مسار التصفح", reviewed:"تم التحقق من المعلومات في", author:"بقلم", english:"بالإنجليزية", collection:"الاستعداد للرحلة وحجز المعالم", read:"اقرأ الدليل", destinationLabel:"وجهات ذات صلة", destinationTitle:"اربط هذه المعلومات بإقامتك في المدينة.", routeLabel:"مسارات منشورة ذات صلة", routeTitle:"طبّق هذا القرار على برنامج رحلة فعلي."},
} as const;
/** Resolve only equivalents which exist. An untranslated reference is labelled, never sent to a made-up URL. */
function localizedLink(href: string, language: ReservationGuideEditionLocale): {href: string; english: boolean} {
  if (!href.startsWith("/") || href.startsWith("//")) return {href, english:false};
  const match = /^([^?#]*)(.*)$/.exec(href)!;
  const [path, suffix] = [match[1], match[2]];
  const paths = serviceEditionPaths(language);
  if (path === "/") return {href:paths.home+suffix, english:false};
  if (path === "/guides/") return {href:paths.guides+suffix, english:false};
  if (path === "/tours/") return {href:paths.tours+suffix, english:false};
  if (path === "/services/") return {href:paths.services+suffix, english:false};
  if (path === entryRequirementsEnglishPath) return {href:entryRequirementsEditionPath(language)+suffix, english:false};
  const guideSlug = /^\/guides\/([^/]+)\/$/.exec(path)?.[1];
  if (guideSlug) {
    try { const translated = getGuideLanguagePaths(guideSlug as GuideId)[language]; if (translated) return {href:translated+suffix,english:false}; } catch { /* Unknown guide keeps its original link. */ }
  }
  const service = /^\/services\/([^/]+)\/$/.exec(path)?.[1];
  if (service && (serviceDetailSlugs as readonly string[]).includes(service)) return {href:`/${language}${path}${suffix}`,english:false};
  const tour = /^\/tours\/([^/]+)\/$/.exec(path)?.[1];
  if (tour && privateTourProducts.some(product => product.slug === tour)) return {href:`/${language}${path}${suffix}`,english:false};
  // City pages and the destinations hub in the edition's language, where they exist (lib/destinationEditions.ts).
  const city = /^\/destinations\/([^/]+)\/$/.exec(path)?.[1];
  if (city && hasDestinationEditionCity(language, city)) return {href:destinationEditionCityPath(language, city)+suffix, english:false};
  if (path === "/explore/" && language !== "ja") return {href:destinationsHubEditionPath[language]+suffix, english:false};
  return {href,english:!/^\/(?:zh|ko|ja|fr|es|de|ar)\//.test(path)};
}
function localizeBody(body: StructuredPageBody, language: ReservationGuideEditionLocale): StructuredPageBody {
  const label = reservationGuideEditionUi[language].english;
  return { ...body, blocks:body.blocks.map(block => {
    if ((block.type === "paragraph" || block.type === "callout") && block.link) {
      const target = localizedLink(block.link.href,language);
      const linkLabel = block.link.label+(target.english ? ` (${label})` : "");
      // The paragraph renderer finds the link by its exact visible label.
      return block.type === "paragraph" ? {...block,text:block.text.replace(block.link.label,linkLabel),link:{label:linkLabel,href:target.href}} : {...block,link:{label:linkLabel,href:target.href}};
    }
    if (block.type === "internal-links") return {...block,items:block.items.map(item => {const target=localizedLink(item.href,language);return {...item,href:target.href,label:item.label+(target.english?` (${label})`:"")};})};
    if (block.type === "table" && block.rowLinks) return {...block,rowLinks:block.rowLinks.map(link => localizedLink(link,language).href), rows:block.rows.map((row,index) => { const target=localizedLink(block.rowLinks![index],language); return target.english ? [row[0]+` (${label})`,...row.slice(1)] : row; })};
    return block;
  })};
}
export function getReservationGuideEdition(language: ReservationGuideEditionLocale, slug: string): ReservationGuideEdition | null {
  if (!isReservationGuideEditionSlug(slug)) return null;
  const raw=editions[language][slug];
  const body=assertStructuredPageBody(raw.body);
  return {...raw,body:assertStructuredPageBody(localizeBody(body,language))};
}
export function reservationGuideEditionMetadata(language: ReservationGuideEditionLocale, slug: string): Metadata {
  const guide=getReservationGuideEdition(language,slug);
  if (!guide) throw new Error(`Missing guide edition ${language}/${slug}`);
  const source=getGuideEntry(slug as GuideId,"en");
  const path=reservationGuideEditionPath(language,slug);
  return {
    title:`${guide.title} | Homeground China`,description:guide.description,
    alternates:{canonical:path,languages:getGuideLanguagePaths(slug as GuideId)},robots:{index:true,follow:true},
    openGraph:{type:"article",url:path,title:guide.headline,description:guide.description,locale:({ja:"ja_JP",fr:"fr_FR",es:"es_ES",de:"de_DE",ar:"ar_SA"} as const)[language],images:[{url:source.heroImageUrl,width:source.imageWidth,height:source.imageHeight,alt:guide.heroAlt}]},
    twitter:{card:"summary_large_image",title:guide.headline,description:guide.description,images:[source.heroImageUrl]},
  };
}
