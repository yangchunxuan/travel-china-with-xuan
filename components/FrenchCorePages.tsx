import Link from 'next/link';
import { FrenchSiteFooter, FrenchSiteHeader } from './FrenchChrome';
import { FrenchContactPanel } from './FrenchContactPanel';
import { FrenchTourQuickCard } from './FrenchTourQuickCard';
import { frenchLanguagePaths, frenchGuideLanguageNote, frenchPublishedPriceNote } from '../lib/frenchSite';
import { frenchCoreCopy, type FrenchCorePageId, type FrenchCoreSection } from '../lib/frenchCoreCopy';
import { getFrenchTourCatalog } from '../lib/frenchTourCatalog';
import { frenchLegacyTourCards } from '../lib/frenchLegacyTours';
import { homegroundBusiness } from '../lib/homegroundBusiness';
import type { ReactNode } from 'react';
import localeStyles from './LocaleRoot.module.css';
import tourStyles from './PrivateToursHubPage.module.css';
import editionStyles from './SpanishPages.module.css';
import styles from './FrenchPages.module.css';
const origin='https://homegroundchina.com';
function FrenchLegacyCard({tour}: {tour: (typeof frenchLegacyTourCards)[number]}) {
  return <li className={tourStyles.quickItem}><Link className={tourStyles.quickLink} href={tour.path}>
    <figure className={tourStyles.quickImage}><img {...tour.image} loading="lazy" decoding="async"/></figure>
    <div className={tourStyles.quickIdentity}><p>Circuit privé</p><h3>{tour.title}</h3><p className={tourStyles.quickAppeal}>{tour.summary}</p></div>
    <p className={tourStyles.quickFacts}><strong>{tour.priceLabel}</strong><span className={tourStyles.guideBadge}>Guide francophone : supplément sur devis</span></p>
    <div className={tourStyles.quickMeta}><dl className={tourStyles.quickDetails}><div><dt>Durée</dt><dd>{tour.days === 0.5 ? 'Une demi-journée · environ 5 à 6 h' : `${tour.days} jours · ${tour.nights} nuits`}</dd></div></dl></div>
    <span className={tourStyles.quickAction}>Voir l’itinéraire →</span>
  </Link></li>;
}

function Schema({data}: {data:unknown}) { return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}} />; }
function Shell({path,enPath,children}: {path:string;enPath:string;children:ReactNode}) {
  return <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale="fr" lang="fr"><a className={localeStyles.skipLink} href="#main-content">Aller au contenu</a><FrenchSiteHeader currentPath={path} languagePaths={frenchLanguagePaths(enPath,path)} /><main className={styles.main} id="main-content" tabIndex={-1}>{children}</main><FrenchSiteFooter currentPath={path}/></div>;
}
export const frenchHomeTitle='Voyage en Chine sur mesure, avec une équipe locale';
export const frenchHomeDescription='Découvrez les circuits Homeground China : itinéraires détaillés, tarifs publiés et accompagnement local. Guide francophone en supplément, confirmé sur devis.';
export function FrenchHomePage() {
  const tours=getFrenchTourCatalog();
  const featured=['beijing-xian-shanghai-8-day-private-tour','zhangjiajie-furong-fenghuang-7-day-private-tour','guilin-yangshuo-5-day-private-tour','suzhou-tongli-hangzhou-shanghai-12-day-private-tour','beijing-xian-chengdu-guilin-shanghai-14-day-private-tour','harbin-yabuli-snow-town-6-day-private-tour'].map(slug=>tours.find(t=>t.slug===slug)!);
  return <Shell path="/fr/" enPath="/">
    <header className={styles.hero}><div><p className={styles.eyebrow}>Homeground China · votre voyage, sur place</p><h1>La Chine, au rythme de vos envies.</h1><p>Des jardins du Jiangnan aux montagnes de Zhangjiajie, des premières découvertes aux détours qui vous ressemblent : construisons un voyage dont chaque étape a sa place.</p><p>Comparez nos itinéraires et leurs tarifs, puis échangeons sur vos dates, votre groupe et l’accompagnement qui vous convient.</p><div className={styles.actions}><Link className={styles.action} href="/fr/tours/">Découvrir les circuits</Link><a className={styles.textLink} href="#planner-contact">Parler de mon projet</a></div></div><figure><img src="/images/home/beijing-hero-2400.jpg" alt="Une tour de la Cité interdite de Pékin au bord des douves" width={2400} height={1600} fetchPriority="high"/><figcaption>Pékin · un point de départ parmi tant d’autres.</figcaption></figure></header>
    <div className={styles.stats}><p><strong>{tours.length + frenchLegacyTourCards.length} itinéraires publiés</strong>Le détail de chaque journée et des prestations.</p><p><strong>Des prix lisibles</strong>Prestations et conditions précisées pour chaque formule.</p><p><strong>Une agence identifiée</strong>Licence chinoise {homegroundBusiness.travelAgencyLicenceNumber}.</p></div>
    <p className={styles.notice}>{frenchGuideLanguageNote}</p>
    <section aria-labelledby="fr-featured"><p className={styles.eyebrow}>Trouver votre fil conducteur</p><h2 className={styles.sectionTitle} id="fr-featured">Quelques voyages pour commencer.</h2><ul className={`${tourStyles.quickList} ${editionStyles.tourList}`}>{featured.map(tour=><FrenchTourQuickCard key={tour.slug} tour={tour}/>)}</ul><div className={styles.actions}><Link className={styles.textLink} href="/fr/tours/">Comparer les {tours.length + frenchLegacyTourCards.length} circuits →</Link></div></section>
    <section className={styles.section}><h2>Du premier message au devis.</h2><div><p>Partagez vos dates, le nombre de voyageurs, les lieux qui vous attirent et les réservations déjà faites. Nous vérifions le parcours, les chambres et les prestations, puis vous recevez un devis écrit avant de payer.</p><p>Les circuits privés, les formules sans guide sur place et les départs en petit groupe gardent leurs conditions propres. Une demande n’est pas une réservation.</p><ul className={styles.links}><li><Link href="/fr/services/">Choisir votre accompagnement</Link></li><li><Link href="/fr/studio/">Découvrir notre manière de préparer un voyage</Link></li><li><Link href="/fr/business-information/">Vérifier notre identité et notre licence</Link></li></ul></div></section>
    <FrenchContactPanel path="/fr/"/>
    <Schema data={{'@context':'https://schema.org','@type':'WebPage','@id':`${origin}/fr/#webpage`,url:`${origin}/fr/`,name:frenchHomeTitle,description:frenchHomeDescription,inLanguage:'fr',isPartOf:{'@id':`${origin}/#website`},about:{'@id':`${origin}/#organization`}}}/>
  </Shell>;
}

export const frenchToursTitle='Circuits en Chine : itinéraires et tarifs';
export const frenchToursDescription='Comparez tous les circuits Homeground China : voyage privé ou petit groupe, programme jour par jour, prix par personne et prestations. Guide francophone en supplément.';
export function FrenchToursHubPage() {
  const tours=getFrenchTourCatalog();
  const groups=[
    {id:'grands-circuits',title:'Grands voyages à travers la Chine',items:tours.filter(t=>t.days>=10&&t.tourFormat!=='small-group')},
    {id:'sejours-regionaux',title:'Prendre le temps d’une région',items:tours.filter(t=>t.days<10&&!/(winter|harbin|snow-town|mohe|yanji-changbaishan)/.test(t.slug)&&t.tourFormat!=='small-group')},
    {id:'hiver',title:'La Chine en hiver',items:tours.filter(t=>t.days<10&&/(winter|harbin|snow-town|mohe|yanji-changbaishan)/.test(t.slug))},
    {id:'petits-groupes',title:'Départs en petit groupe',items:tours.filter(t=>t.tourFormat==='small-group')},
  ];
  return <Shell path="/fr/tours/" enPath="/tours/">
    <nav className={styles.breadcrumbs} aria-label="Fil d’Ariane"><Link href="/fr/">Accueil</Link> / Circuits</nav><p className={styles.eyebrow}>{tours.length + frenchLegacyTourCards.length} itinéraires à comparer</p><h1 className={styles.title}>Votre Chine commence par une route.</h1><p className={styles.lead}>Séjours régionaux, grandes traversées et voyages d’hiver : retrouvez le programme quotidien, les formules et le prix de chaque circuit. Les voyages privés et les petits groupes sont présentés séparément.</p>
    <p className={styles.notice}>{frenchPublishedPriceNote}<br/>{frenchGuideLanguageNote}</p>
    <nav className={styles.jump} aria-label="Types de circuits">{groups.map(g=><a href={`#${g.id}`} key={g.id}>{g.title} ({g.items.length})</a>)}</nav>
    {groups.map(g=><section className={styles.tourGroup} id={g.id} key={g.id} aria-labelledby={`${g.id}-title`}><h2 className={styles.sectionTitle} id={`${g.id}-title`}>{g.title}</h2><ul className={`${tourStyles.quickList} ${editionStyles.tourList}`}>{g.items.map(t=><FrenchTourQuickCard tour={t} key={t.slug}/>)}</ul></section>)}
    <section className={styles.tourGroup} id="autres-circuits"><h2 className={styles.sectionTitle}>Deux autres façons de découvrir nos régions</h2><ul className={`${tourStyles.quickList} ${editionStyles.tourList}`}>{frenchLegacyTourCards.map(t=><FrenchLegacyCard tour={t} key={t.slug}/>)}</ul></section>
    <FrenchContactPanel path="/fr/tours/"/>
    <Schema data={{'@context':'https://schema.org','@type':'CollectionPage','@id':`${origin}/fr/tours/#webpage`,url:`${origin}/fr/tours/`,name:frenchToursTitle,description:frenchToursDescription,inLanguage:'fr',mainEntity:{'@type':'ItemList',numberOfItems:tours.length + frenchLegacyTourCards.length,itemListElement:[...tours,...frenchLegacyTourCards].map((t,i)=>({'@type':'ListItem',position:i+1,name:t.title,url:`${origin}${t.path}`}))}}}/>
  </Shell>;
}
export function FrenchCorePage({id}: {id:FrenchCorePageId}) {
  const copy=frenchCoreCopy[id]; const path=`/fr/${id}/`;
  return <Shell path={path} enPath={id==='contact'?'/':`/${id}/`}><nav className={styles.breadcrumbs} aria-label="Fil d’Ariane"><Link href="/fr/">Accueil</Link> / {copy.title}</nav><p className={styles.eyebrow}>{copy.eyebrow}</p><h1 className={styles.title}>{copy.title}</h1><p className={styles.lead}>{copy.intro}</p>
    {(copy.sections as readonly FrenchCoreSection[]).map((section,index)=><section className={styles.section} key={section.title} aria-labelledby={`fr-section-${index}`}><h2 id={`fr-section-${index}`}>{section.title}</h2><div>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.links?<ul className={styles.links}>{section.links.map(link=><li key={link.href}><a href={link.href} lang={link.label.includes('(en anglais)')?'en':undefined}>{link.label} →</a></li>)}</ul>:null}</div></section>)}
    <FrenchContactPanel path={path}/>
    <Schema data={{'@context':'https://schema.org','@type':id==='contact'?'ContactPage':id==='studio'?'AboutPage':'WebPage','@id':`${origin}${path}#webpage`,url:`${origin}${path}`,name:copy.title,description:copy.description,inLanguage:'fr',isPartOf:{'@id':`${origin}/#website`},about:{'@id':`${origin}/#organization`}}}/>
  </Shell>;
}
