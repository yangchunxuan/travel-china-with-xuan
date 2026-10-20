import { ArrowRight } from "lucide-react";
import { destinationEditionCityPath, hasDestinationEditionCity } from "../lib/destinationEditions";
import { getSightsEditionCopy } from "../lib/sightsEditions";
import { GuideTourCard } from "./content/GuideTourCard";
import { getDestinationHubsForGuide } from "../lib/destinationHubs";
import { getGuidePublishedRouteLinks } from "../lib/existingContentCommercialLinks";
import { getReservationGuideTourCard, getReservationGuideEditionServiceCta, localizedReservationTourTitle, reservationGuideFooterCopy, getReservationGuideAuthorizedServiceCta } from "../lib/reservationGuideCommercialCopy";
import { reservationGuidePhotoCredits } from "../lib/reservationGuidePhotoCredits";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArabicSiteHeader, ArabicSiteFooter } from "./ArabicChrome";
import { GermanSiteHeader, GermanSiteFooter } from "./GermanChrome";
import { FrenchSiteHeader, FrenchSiteFooter } from "./FrenchChrome";
import { SpanishSiteHeader, SpanishSiteFooter } from "./SpanishChrome";
import { JapaneseSiteHeader, JapaneseSiteFooter } from "./JapaneseTourChrome";
import { PageFamilyRenderer } from "./content/PageFamilyRenderer";
import { GuideReservationOffer } from "./content/GuideReservationOffer";
import { GuideCtaLink } from "./GuideCtaLink";
import { ReadingProgress } from "./motion/ReadingProgress";
import { getGuideEntry, getGuideLanguagePaths, type GuideId } from "../lib/guideRegistry";
import { getReservationGuideEdition, reservationGuideEditionUi } from "../lib/reservationGuideEditions";
import { reservationGuideEditionPath, type ReservationGuideEditionLocale } from "../lib/reservationGuideEditionPaths";
import { serviceEditionPaths } from "../lib/serviceEdition";
import { getGuideAttractionReservationTarget } from "../lib/attractionReservations";
import { getGuideReservationOffers, getGuideReservationCtaWording, localizedReservationFee, localizedReservationHref, localizedReservationRule } from "../lib/guideReservationOffers";
import { getAttractionReservationEditionCopy } from "../lib/attractionReservationEditions";
import { guideFirstSectionEndIndex, guideTourCardBlockIndex, guideContentEndIndex } from "../lib/guideTourCard";
import { EDITORIAL_WEBSITE_ID, EDITORIAL_PERSON_ID, EDITORIAL_ORGANIZATION_ID, editorialWebsiteSchema, editorialOrganizationSchema, editorialPersonSchema, editorialReviewedPageSchema, getEditorialAuthor, getEditorialAuthorLanguagePaths } from "../lib/editorialIdentity";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./content/EditorialGuidePage.module.css";
import cardStyles from "./content/GuideReservationCta.module.css";
import bylineStyles from "./EditorialByline.module.css";
import editionStyles from "./ReservationGuideEditionPage.module.css";

const site="https://homegroundchina.com";
const labels:Record<string,string>={en:"EN","zh-Hans":"中文",ko:"한국어",ja:"日本語",fr:"FR",es:"ES",de:"DE",ar:"العربية"};

export function ReservationGuideEditionPage({language,slug}:{language:ReservationGuideEditionLocale;slug:string}) {
  const guide=getReservationGuideEdition(language,slug);
  if (!guide) throw new Error(`Missing guide ${language}/${slug}`);
  const source=getGuideEntry(slug as GuideId,"en");
  const copy=reservationGuideEditionUi[language];
  const path=reservationGuideEditionPath(language,slug), url=site+path;
  const paths=serviceEditionPaths(language);
  const languagePaths=(["en","zh-Hans","ko","ja","fr","es","de","ar"] as const).map(lang=>({lang,path:getGuideLanguagePaths(slug as GuideId)[lang],label:labels[lang]}));
  const props={currentPath:path,languagePaths};
  const header=language==="ja"?<JapaneseSiteHeader {...props} contactHref="/ja/#planner-contact"/>:language==="fr"?<FrenchSiteHeader {...props}/>:language==="es"?<SpanishSiteHeader {...props}/>:language==="de"?<GermanSiteHeader {...props}/>:<ArabicSiteHeader {...props}/>;
  const footer=language==="ja"?<JapaneseSiteFooter currentPath={path}/>:language==="fr"?<FrenchSiteFooter currentPath={path}/>:language==="es"?<SpanishSiteFooter currentPath={path}/>:language==="de"?<GermanSiteFooter currentPath={path}/>:<ArabicSiteFooter currentPath={path}/>;
  const reviewed=new Intl.DateTimeFormat(language==="ar"?"ar-SA-u-ca-gregory-nu-latn":language,{dateStyle:"long",timeZone:"UTC"}).format(new Date(`${source.sourceReviewedDate}T00:00:00Z`));
  const author=getEditorialAuthor("en");
  const authorPath=getEditorialAuthorLanguagePaths()[language];
  const interstitials:{afterIndex:number;node:ReactNode}[]=getGuideReservationOffers(slug,language).map(offer=>{
    const afterIndex=guide.body.blocks.findIndex(block=>block.id===offer.afterBlockId);
    if (afterIndex<0) throw new Error(`Missing reservation offer anchor ${slug}/${language}/${offer.afterBlockId}`);
    return {afterIndex,node:<GuideReservationOffer guideId={slug} locale={language} offer={offer}/>};
  });
  const rule=getGuideAttractionReservationTarget(slug);
  if (rule) {
    const wording=getGuideReservationCtaWording(slug,language,rule);
    if (!wording) throw new Error(`Missing translated reservation wording ${slug}/${language}`);
    const ruleCopy=localizedReservationRule(rule,language);
    const label=getAttractionReservationEditionCopy(language).guideCta.label;
    const lead=guide.body.blocks.findIndex(block=>block.type==="lead");
    interstitials.push({afterIndex:slug==="forbidden-city-for-foreign-visitors"&&lead>=0?lead:guideFirstSectionEndIndex(guide.body),node:
      <aside aria-label={label} className={cardStyles.card} data-guide-reservation-cta={rule.id} data-similarity-ignore>
        <p className={cardStyles.label}>{label}</p><p className={cardStyles.title}>{wording.title}</p>
        <p className={cardStyles.fee}><bdi className={cardStyles.feeAmount}>{localizedReservationFee(language)}</bdi> <span className={cardStyles.feeUnit}>{wording.feeUnit}</span></p>
        <p className={cardStyles.body}>{wording.body}</p>
        <GuideCtaLink className={cardStyles.action} guideId={slug} href={localizedReservationHref(language,rule.id)} locale={language} position="inline">{wording.action}</GuideCtaLink>
        {ruleCopy.disclosure?<p className={cardStyles.disclosure}>{ruleCopy.disclosure}</p>:null}
      </aside>});
  }
  const tourCard=getReservationGuideTourCard(slug,language);
  interstitials.push({afterIndex:guideTourCardBlockIndex(guide.body),node:<GuideTourCard card={tourCard} guideId={slug} locale={language} variant="grok"/>});
  const serviceCard=getReservationGuideEditionServiceCta(slug,language);
  if(serviceCard) interstitials.push({afterIndex:guideContentEndIndex(guide.body),node:<aside aria-label={serviceCard.label} className={cardStyles.card} data-guide-service-cta={serviceCard.city} data-similarity-ignore><p className={cardStyles.label}>{serviceCard.label}</p><p className={cardStyles.title}>{serviceCard.title}</p><p className={cardStyles.body}>{serviceCard.body}</p><GuideCtaLink className={cardStyles.action} guideId={slug} href={serviceCard.href} locale={language} position="inline">{serviceCard.action}<ArrowRight aria-hidden="true" size={18}/></GuideCtaLink></aside>});
  const relatedDestinations=getDestinationHubsForGuide(slug as GuideId,"en");
  const publishedRoutes=getGuidePublishedRouteLinks(slug as GuideId,"en").map(route=>{
    const productSlug=/^\/tours\/([^/]+)\//.exec(route.href)?.[1];
    const title=productSlug?localizedReservationTourTitle(language,productSlug):undefined;
    if(!title) throw new Error(`Missing translated published route ${language}/${route.id}`);
    return {...route,href:`/${language}${route.href}`,label:title};
  });
  const footerCta=getReservationGuideAuthorizedServiceCta(slug,language);
  const footerCopy=footerCta??reservationGuideFooterCopy[language];
  const plannerHref=`${paths.home}?utm_source=editorial_guide&utm_medium=owned&utm_campaign=trip_conversation&utm_content=${slug}#planner-contact`;
  const faq=guide.body.blocks.flatMap(block=>block.type==="faq"?block.items:[]);
  const citations=guide.body.blocks.flatMap(block=>block.type==="sources"?block.items.map(item=>item.url):[]);
  const schema={"@context":"https://schema.org","@graph":[editorialWebsiteSchema(),editorialOrganizationSchema(),editorialPersonSchema("en"),
    {"@type":"Article","@id":url+"#article",url,headline:guide.headline,description:guide.description,image:{"@type":"ImageObject",url:source.heroImageUrl,width:source.imageWidth,height:source.imageHeight},datePublished:"2026-10-19",dateModified:"2026-10-19",inLanguage:language,author:{"@id":EDITORIAL_PERSON_ID},publisher:{"@id":EDITORIAL_ORGANIZATION_ID},isPartOf:{"@id":EDITORIAL_WEBSITE_ID},mainEntityOfPage:editorialReviewedPageSchema(url),citation:citations},
    ...(faq.length?[{"@type":"FAQPage","@id":url+"#faq",url,inLanguage:language,mainEntity:faq.map(item=>({"@type":"Question",name:item.question,acceptedAnswer:{"@type":"Answer",text:item.answer}}))}]:[]),
    {"@type":"BreadcrumbList",itemListElement:[{name:copy.home,item:site+paths.home},{name:copy.guides,item:site+paths.guides},{name:guide.navTitle,item:url}].map((item,index)=>({"@type":"ListItem",position:index+1,...item}))}
  ]};
  return <div className={`${localeStyles.root} hg-locale-root ${styles.pageRoot} ${styles.grokGuide} ${editionStyles.root}`} data-homeground-locale={language} lang={language} dir={language==="ar"?"rtl":"ltr"}>
    <a className={styles.skipLink} href="#editorial-guide-body">{copy.skip}</a><ReadingProgress/>{header}
    <main>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}><ol><li><Link href={paths.home}>{copy.home}</Link></li><li><span aria-hidden="true">/</span><Link href={paths.guides}>{copy.guides}</Link></li><li aria-current="page"><span aria-hidden="true">/</span>{guide.navTitle}</li></ol></nav>
          <p className={styles.eyebrow}><span>{copy.guides}</span><span>{copy.reviewed} {reviewed}</span></p>
          <h1>{guide.headline}</h1><p className={styles.dek}>{guide.description}</p>
          <p className={bylineStyles.byline}><span>{copy.author} <Link href={authorPath} hrefLang={language}>{author.name}</Link></span><span aria-hidden="true">·</span><span>{copy.reviewed} <time dateTime={source.sourceReviewedDate}>{reviewed}</time></span></p>
        </div>
        <figure className={styles.heroFigure}><Image src={source.heroImagePath} alt={guide.heroAlt} width={source.imageWidth} height={source.imageHeight} priority sizes="(max-width: 860px) 100vw, 44vw"/>
          {source.heroCredit?<figcaption className={styles.heroCredit}><span>{reservationGuidePhotoCredits[language].text}</span>{" "}<a href={source.heroCredit.sourceUrl}>{reservationGuidePhotoCredits[language].sourceLabel}</a><span aria-hidden="true"> · </span><a href={source.heroCredit.licenseUrl}>{source.heroCredit.licenseLabel}</a></figcaption>:null}
        </figure>
      </header>
      <article className={styles.article} data-content-body id="editorial-guide-body"><PageFamilyRenderer body={guide.body} guideTracking={{guideId:slug,locale:language}} interstitials={interstitials}/></article>
      {relatedDestinations.length>0?<aside className={styles.relatedDestinations}><div><p>{copy.destinationLabel}</p><h2>{copy.destinationTitle}</h2></div><ul>{relatedDestinations.map(destination=>{
        // The city page in the guide's language where it exists; otherwise the English one, marked.
        const local=hasDestinationEditionCity(language,destination.id);
        return <li key={destination.id}>{local?<Link href={destinationEditionCityPath(language,destination.id)}>{getSightsEditionCopy(language).cities[destination.id]}<span aria-hidden="true">→</span></Link>:<Link href={destination.canonicalPath} hrefLang="en">{destination.navTitle} ({copy.english})<span aria-hidden="true">→</span></Link>}</li>;
      })}</ul></aside>:null}
      {publishedRoutes.length>0?<aside className={styles.relatedDestinations}><div><p>{copy.routeLabel}</p><h2>{copy.routeTitle}</h2></div><ul>{publishedRoutes.map(route=><li key={route.id}><GuideCtaLink href={route.href} guideId={slug} locale={language} position="footer">{route.label}<span aria-hidden="true">→</span></GuideCtaLink></li>)}</ul></aside>:null}
      <aside className={styles.cta} data-similarity-ignore><div><p className={styles.ctaLabel}>{footerCopy.label}</p><h2>{footerCopy.title}</h2><p>{footerCopy.body}</p></div><GuideCtaLink guideId={slug} href={footerCta?.href??plannerHref} locale={language} position="footer">{footerCopy.button}<ArrowRight aria-hidden="true" size={18}/></GuideCtaLink></aside>
    </main>{footer}
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
  </div>;
}
