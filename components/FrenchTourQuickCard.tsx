import Link from 'next/link';
import type { LocalizedPrivateTourProduct } from '../lib/privateTourProducts';
import { getPrivateTourStartingPrice, getPrivateTourEntrySelection } from '../lib/privateTourStartingPrice';
import { buildPrivateTourDetailHref } from '../lib/privateTourInquiryContext';
import { frenchGuideLanguageBadge } from '../lib/frenchSite';
import { privateTourCardImageSource, privateTourCardImageSrcSet } from './privateTourCardImages';
import styles from './PrivateToursHubPage.module.css';
export function FrenchTourQuickCard({tour}: {tour:LocalizedPrivateTourProduct}) {
  const price=getPrivateTourStartingPrice(tour);
  const entrySelection=getPrivateTourEntrySelection(tour);
  const href=entrySelection ? buildPrivateTourDetailHref(tour.path,tour.slug,entrySelection) : tour.path;
  const validity = tour.slug === 'harbin-winter-5-day-private-tour' ? 'Arrivées du dimanche au jeudi, du 6 janvier au 5 février 2027, hors jours fériés, après ouverture des principaux sites de glace.' : null;
  return <li className={styles.quickItem}><Link className={styles.quickLink} href={href}>
    <figure className={styles.quickImage}><img src={privateTourCardImageSource(tour.slug,640)} srcSet={privateTourCardImageSrcSet(tour.slug)} sizes="(max-width: 760px) 100vw, 260px" width={tour.heroImage.width} height={tour.heroImage.height} alt={tour.heroImage.alt} loading="lazy" decoding="async" style={{objectPosition:tour.heroImage.objectPosition}} /></figure>
    <div className={styles.quickIdentity}><p>{tour.tourFormat === 'small-group' ? 'Circuit en petit groupe' : 'Circuit privé'}</p><h3>{tour.title}</h3><p className={styles.quickAppeal}>{tour.lede}</p></div>
    <p className={styles.quickFacts}>{price ? <><span className={styles.priceLabel}>À partir de</span><strong>{price.formatted}</strong><span>{tour.tourFormat === 'small-group' ? 'par personne, en chambre double' : `par personne, pour ${price.selection.travelers} voyageurs`}</span><span>{price.serviceLabel}</span>{validity ? <span>{validity}</span> : null}</> : <><strong>Sur devis</strong><span>Selon les dates et la composition du groupe</span></>}<span className={styles.guideBadge}>{frenchGuideLanguageBadge}</span></p>
    <div className={styles.quickMeta}><dl className={styles.quickDetails}><div><dt>Durée</dt><dd>{tour.days} jours · {tour.nights} nuits</dd></div></dl></div>
    <span className={styles.quickAction}><span>{tour.days} jours</span><span>Voir l’itinéraire →</span></span>
  </Link></li>;
}
