import Image from 'next/image';
import Link from 'next/link';
import { FrenchSiteHeader,FrenchSiteFooter } from './FrenchChrome';
import { FrenchContactPanel } from './FrenchContactPanel';
import { FrenchLegacyPrices } from './FrenchLegacyPrices';
import { frenchLanguagePaths,frenchGuideLanguageNote,frenchDraftNote,frenchWhatsAppHref,frenchEmailHref } from '../lib/frenchSite';
import { frenchHalfDayCopy,frenchHalfDayPath,frenchHalfDaySlug,frenchLegacyZhangjiajie,frenchLegacyZhangjiajiePath,frenchLegacyZhangjiajieSlug,frenchLegacyPricing,frenchLegacyStays,frenchLegacyTourCards } from '../lib/frenchLegacyTours';
import { terracottaHalfDayImage } from '../lib/terracottaHalfDayTour';
import styles from './TerracottaHalfDayPage.module.css';
import extras from './FrenchLegacyTours.module.css';

function TourSchema({path,title,description,itinerary,faq}:{path:string;title:string;description:string;itinerary?:readonly {title:string;body:string}[];faq:readonly {question:string;answer:string}[]}) {
 const url=`https://homegroundchina.com${path}`;
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':`${url}#webpage`,url,name:title,description,inLanguage:'fr'},
  {'@type':'TouristTrip','@id':`${url}#trip`,url,name:title,description,touristType:'Voyageurs en circuit privé',...(itinerary?{itinerary:{'@type':'ItemList',numberOfItems:itinerary.length,itemListElement:itinerary.map((day,index)=>({'@type':'ListItem',position:index+1,name:day.title,description:day.body}))}}:{})},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:'https://homegroundchina.com/fr/'},{'@type':'ListItem',position:2,name:'Circuits',item:'https://homegroundchina.com/fr/tours/'},{'@type':'ListItem',position:3,name:title,item:url}]},
  {'@type':'FAQPage','@id':`${url}#faq`,inLanguage:'fr',mainEntity:faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>;
}
function Header({slug,path,anchor}:{slug:string;path:string;anchor:string}) {
 // Keep the explicit on-page enquiry rather than opening a mismatched priced-product dialog.
 return <FrenchSiteHeader currentPath={path} contactHref={`${path}#${anchor}`} languagePaths={frenchLanguagePaths(`/tours/${slug}/`,path)}/>;
}
function Faq({items}:{items:readonly {question:string;answer:string}[]}) {return <section className={styles.block} aria-labelledby="legacy-faq-title"><div className={styles.blockHead}><h2 id="legacy-faq-title">Avant de réserver</h2></div><div className={styles.faq}>{items.map(f=><details key={f.question}><summary><span>{f.question}</span></summary><p>{f.answer}</p></details>)}</div></section>;}

export function FrenchTerracottaHalfDayPage(){
 const c=frenchHalfDayCopy;
 const message=[c.message.opening,'',`${c.message.date} :`,`${c.message.travellers} :`,`${c.message.hotel} :`,'Guide francophone souhaité (supplément sur devis) :','',`${c.message.page} : https://homegroundchina.com${frenchHalfDayPath}`].join('\n');
 return <div className={styles.page} data-homeground-locale="fr">
  <a className={styles.skip} href="#terracotta-main">{c.skip}</a><Header slug={frenchHalfDaySlug} path={frenchHalfDayPath} anchor="half-day-enquiry"/>
  <TourSchema path={frenchHalfDayPath} title={c.title} description={c.description} itinerary={c.stops} faq={c.faq}/>
  <main className={styles.main} id="terracotta-main">
   <section className={styles.hero} aria-labelledby="terracotta-title"><div className={styles.heroCopy}><nav className={styles.breadcrumb} aria-label="Fil d’Ariane"><Link href="/fr/">Accueil</Link><span>/</span><Link href="/fr/tours/">Circuits</Link><span>/</span><span>Xi’an</span></nav><h1 id="terracotta-title">{c.title}</h1><p className={styles.promise}>{c.promise}</p><a className={styles.send} href="#half-day-enquiry">{c.primaryCta}</a></div><figure className={styles.heroImage}><Image src={terracottaHalfDayImage.src} width={1280} height={853} alt={c.heroAlt} priority sizes="(min-width:62rem) 34rem, 100vw"/><figcaption>{c.heroCaption}</figcaption></figure></section>
   <dl className={styles.facts}>{c.facts.map(f=><div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
   <section id="half-day-itinerary" className={styles.block} aria-labelledby="itinerary-title"><div className={styles.blockHead}><h2 id="itinerary-title">{c.routeTitle}</h2><p>{c.routeBody}</p></div><div><ol className={styles.stops}>{c.stops.map(s=><li key={s.time}><p className={styles.stopTime}>{s.time}</p><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol><p className={styles.small}>{c.timingNote}</p></div></section>
   <section className={styles.block} aria-labelledby="scope-title"><div className={styles.blockHead}><h2 id="scope-title">{c.scopeTitle}</h2></div><div><div className={styles.scope}><div><h3>{c.includedTitle}</h3><ul className={styles.included}>{c.included.map(i=><li key={i}>{i}</li>)}</ul></div><div><h3>{c.excludedTitle}</h3><ul className={styles.excluded}>{c.excluded.map(i=><li key={i}>{i}</li>)}</ul></div></div><p className={extras.guideNote}>{frenchGuideLanguageNote}</p><div className={styles.small}><p><strong>{c.bookingTitle}</strong> {c.bookingBody}</p><a className={styles.textLink} href="https://www.bmy.com.cn/guide/">{c.officialLink}</a></div></div></section>
   <section id="half-day-enquiry" className={styles.block} aria-labelledby="price-title"><div className={styles.blockHead}><h2 id="price-title">{c.priceTitle}</h2><p>{c.priceBody}</p><p>{frenchGuideLanguageNote}</p></div><div><ol className={styles.asks}>{c.enquiryDetails.map((d,i)=><li key={d.title}><span className={styles.askNumber} aria-hidden="true">{i+1}</span><div><h3>{d.title}</h3><p>{d.body}</p></div></li>)}</ol><div className={styles.sendRow}><a className={styles.sendLine} data-contact-card-scan-only="" href={frenchWhatsAppHref(message)} target="_blank" rel="noopener noreferrer">{c.send.whatsapp}</a></div><p className={styles.fine}><a className={styles.textLink} data-contact-card-direct="" href={frenchEmailHref(c.message.subject,message)}>{c.send.email}</a><a className={styles.textLink} href="/fr/privacy/">{c.send.privacy}</a></p><p className={styles.small}>{c.enquiryNote} {frenchDraftNote}</p></div></section>
   <Faq items={c.faq}/>
   <section className={styles.block} aria-labelledby="read-title"><div className={styles.blockHead}><h2 id="read-title">{c.readTitle}</h2></div><ul className={styles.read}>{c.readLinks.map(l=><li key={l.path}><Link className={styles.readLink} href={l.path} prefetch={false}>{l.title}</Link><p>{l.body}</p></li>)}</ul></section>
   <p className={styles.credit}><a href={terracottaHalfDayImage.sourceUrl}>{c.photoCredit}</a> · {terracottaHalfDayImage.author} · <a href={terracottaHalfDayImage.licenseUrl}>{terracottaHalfDayImage.license}</a></p>
  </main><FrenchSiteFooter currentPath={frenchHalfDayPath}/>
 </div>;
}

const routeImages=[
 {src:'/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg',width:1016,height:782,alt:'Chambre à deux lits dans l’un des hôtels proposés en ville',caption:'Exemple d’hébergement ; chambre attribuée à confirmer'},
 {src:'/product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg',width:1280,height:1600,alt:'Ascenseur Bailong contre les falaises de grès',caption:'Ascenseur Bailong'},
 {src:'/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg',width:1280,height:1600,alt:'Visiteurs traversant le pont de verre du Grand Canyon de Zhangjiajie',caption:'Pont de verre du Grand Canyon'},
 {src:'/product-previews/zhangjiajie-4-day-private-tour/hero/tianmen-cave-and-stairs.jpg',width:1280,height:1600,alt:'Arche de Tianmen au-dessus de son escalier',caption:'Mont Tianmen'},
];
export function FrenchLegacyZhangjiajiePage(){
 const c=frenchLegacyZhangjiajie,hero=frenchLegacyTourCards[0].image;
 return <div className={styles.page} data-homeground-locale="fr"><a className={styles.skip} href="#zhangjiajie-main">Aller au circuit</a><Header slug={frenchLegacyZhangjiajieSlug} path={frenchLegacyZhangjiajiePath} anchor="planner-contact"/><TourSchema path={frenchLegacyZhangjiajiePath} title={c.title} description={c.description} itinerary={c.itinerary} faq={c.faq}/>
  <main className={styles.main} id="zhangjiajie-main">
   <section className={styles.hero} aria-labelledby="zhangjiajie-title"><div className={styles.heroCopy}><nav className={styles.breadcrumb} aria-label="Fil d’Ariane"><Link href="/fr/">Accueil</Link><span>/</span><Link href="/fr/tours/">Circuits</Link><span>/</span><span>Zhangjiajie</span></nav><h1 id="zhangjiajie-title">{c.title}</h1><p className={styles.promise}>{c.lede}</p><a className={styles.send} href="#legacy-prices">Comparer les trois façons de séjourner</a></div><figure className={styles.heroImage}><Image {...hero} priority sizes="(min-width:62rem) 34rem, 100vw"/><figcaption>Lumière du matin sur les pics de grès de Zhangjiajie</figcaption></figure></section>
   <dl className={styles.facts}><div><dt>Durée</dt><dd>4 jours · 3 nuits</dd></div><div><dt>Votre groupe</dt><dd>Circuit privé · dès 2 adultes</dd></div><div><dt>Guide inclus</dt><dd>Anglophone · jours 2 et 3</dd></div><div><dt>Guide francophone</dt><dd>Supplément sur devis, selon disponibilité</dd></div></dl>
   <section className={styles.block} aria-labelledby="legacy-route-title"><div className={styles.blockHead}><h2 id="legacy-route-title">Une arrivée, puis trois paysages différents.</h2><p>Une journée entière est consacrée au parc forestier, une autre au Grand Canyon et la dernière à Tianmen. Nous coordonnons les créneaux d’entrée, les transports et vos bagages selon vos dates et votre rythme.</p></div><ol className={styles.stops}>{c.itinerary.map((d,i)=><li key={d.title}><p className={styles.stopTime}>JOUR {i+1} · {d.guide}</p><h3>{d.title}</h3><p>{d.body}</p><figure className={extras.dayImage}><Image {...routeImages[i]} loading="lazy" sizes="(min-width:62rem) 42rem, 100vw"/><figcaption>{routeImages[i].caption}</figcaption></figure></li>)}</ol></section>
   <section id="legacy-prices" className={extras.fullSection} aria-labelledby="legacy-price-title"><h2 id="legacy-price-title">Un itinéraire, trois façons de séjourner.</h2><p>Le parcours reste le même. Comparez les hébergements ; nous vérifions ensuite les disponibilités et vous adressons un devis écrit avant toute réservation.</p><FrenchLegacyPrices pricing={frenchLegacyPricing}/></section>
   <section className={styles.block} aria-labelledby="legacy-stay-title"><div className={styles.blockHead}><h2 id="legacy-stay-title">Après la montagne, choisissez votre cadre.</h2><p>Voici quelques-uns des hébergements que nous pouvons proposer. Chaque série de photos présente un seul établissement. La chambre attribuée est confirmée séparément : les photos ne garantissent pas une chambre précise.</p><p>Si aucun ne vous convient, précisez le style, l’emplacement et l’agencement que vous recherchez. Nous pouvons étudier d’autres hôtels de Zhangjiajie avant paiement.</p></div><div>{frenchLegacyStays.map(s=><article className={extras.stay} key={s.id}><p className={extras.kicker}>{s.tier}</p><h3>{s.name}</h3><p>{s.summary}</p><details><summary>Voir les {s.images.length} photos de cet établissement</summary><div className={extras.photos}>{s.images.map(img=><figure key={img.src}><Image src={img.src} width={img.width} height={img.height} alt={img.alt} loading="lazy" sizes="(min-width:62rem) 20rem, 100vw"/><figcaption>{img.caption}</figcaption></figure>)}</div></details></article>)}</div></section>
   <section className={styles.block} aria-labelledby="legacy-scope-title"><div className={styles.blockHead}><h2 id="legacy-scope-title">Ce qui est inclus, et ce qui ne l’est pas.</h2></div><div><div className={styles.scope}><div><h3>Inclus dans le devis</h3><ul className={styles.included}>{c.included.map(i=><li key={i}>{i}</li>)}</ul></div><div><h3>Non inclus dans le prix de base</h3><ul className={styles.excluded}>{c.excluded.map(i=><li key={i}>{i}</li>)}</ul></div></div><p className={extras.guideNote}>{frenchGuideLanguageNote}</p><p className={styles.small}>Avant paiement, votre confirmation écrite détaille chaque prestation, qui l’assure et les éventuelles différences de tarif liées à vos dates.</p></div></section>
   <Faq items={c.faq}/>
   <section className={styles.block} aria-labelledby="legacy-booking-title"><div className={styles.blockHead}><h2 id="legacy-booking-title">Le programme complet avant tout paiement.</h2></div><ol className={styles.stops}><li><h3>1. Parlez-nous de votre voyage</h3><p>Indiquez vos dates d’arrivée et de départ, le nombre d’adultes, l’âge des enfants et la catégorie d’hébergement souhaitée.</p></li><li><h3>2. Nous vérifions les disponibilités</h3><p>Nous vérifions la chambre proposée, le petit-déjeuner, le véhicule, les billets et le guide pour vos dates.</p></li><li><h3>3. Vous examinez la proposition</h3><p>Vous recevez par écrit le prix total, le détail des prestations, leurs prestataires et les conditions de réservation. Vous pouvez ensuite décider.</p></li></ol></section>
   <div className={extras.fullSection}><FrenchContactPanel path={frenchLegacyZhangjiajiePath}/></div>
  </main><FrenchSiteFooter currentPath={frenchLegacyZhangjiajiePath}/>
 </div>;
}
