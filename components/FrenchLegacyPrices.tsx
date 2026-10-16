'use client';

import { useEffect, useState } from 'react';
import { frenchGuideLanguageNote, frenchPublishedPriceNote } from '../lib/frenchSite';
import styles from './FrenchLegacyTours.module.css';

interface Pricing {
 readonly validFrom:string;
 readonly validUntil:string;
 readonly tiers:readonly {id:string;name:string;description:string;base:string;six:string;regular?:string;featured:boolean}[];
}

/** Keeps the original public price window, including an expiry check for an open browser tab. */
export function FrenchLegacyPrices({pricing}:{pricing:Pricing}) {
 const [expired,setExpired]=useState(false);
 useEffect(()=>{
  let timer:ReturnType<typeof setTimeout>|undefined;
  const check=()=>{
   const now=Date.now();
   const start=new Date(`${pricing.validFrom}T00:00:00+08:00`).getTime();
   const end=new Date(pricing.validUntil).getTime();
   setExpired(now<start||now>end);
   const boundary=now<start?start:end+1;
   if(boundary>now)timer=setTimeout(check,Math.min(boundary-now,2_147_483_647));
  };
  check();
  return()=>clearTimeout(timer);
 },[pricing.validFrom,pricing.validUntil]);
 const fmt=new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Shanghai'});
 return <div aria-live="polite">
  <p className={styles.note}>Tarifs valables du <time dateTime={`${pricing.validFrom}T00:00:00+08:00`}>{fmt.format(new Date(`${pricing.validFrom}T00:00:00+08:00`))}</time> au <time dateTime={pricing.validUntil}>{fmt.format(new Date(pricing.validUntil))}</time>, selon l’heure de Chine (UTC+8), sous réserve de disponibilité. Le montant total est confirmé avant réservation.</p>
  {expired?<p className={styles.note}><strong>Les tarifs de cette période ne sont pas applicables actuellement. Contactez-nous pour recevoir un devis à vos dates.</strong></p>:<div className={styles.prices}>
   {pricing.tiers.map(tier=><article key={tier.id} className={styles.priceCard}>
    <p className={styles.kicker}>{tier.featured?'Notre première sélection':'Autre catégorie d’hébergement'}</p>
    <h3>{tier.name}</h3><p>{tier.description}</p>
    <dl><div><dt>2 à 4 adultes</dt><dd>{tier.base}<small> par personne</small></dd></div><div><dt>6 adultes</dt><dd>{tier.six}<small> par personne</small></dd></div></dl>
    {tier.regular?<p className={styles.note}>Tarif habituel : {tier.regular} par personne.</p>:null}
    <a href="#planner-contact">Vérifier cet hébergement à mes dates</a>
   </article>)}
  </div>}
  <p className={styles.note}>Ces prix couvrent quatre jours et trois nuits, pour au moins deux adultes et sur la base de deux adultes par chambre. Le prix par personne reste le même à 2, 3 ou 4 adultes. Le tarif pour six personnes s’applique uniquement à un groupe de six adultes. Pour 5 adultes ou à partir de 7 adultes, nous établissons un devis selon le nombre de chambres, les bagages et le véhicule nécessaire. Le prix pour les enfants dépend de leur âge, de leur taille, des conditions des billets, du petit-déjeuner et du couchage.</p>
  <p className={styles.note}>Avant paiement, nous confirmons par écrit l’hôtel, le type et le nombre de chambres, le petit-déjeuner, le véhicule et leurs disponibilités. Après la date de validité des tarifs, un nouveau devis est nécessaire.</p>
  <p className={styles.note}>Guide anglophone inclus les jours 2 et 3 uniquement. <strong>{frenchGuideLanguageNote}</strong></p>
  <p className={styles.note}>{frenchPublishedPriceNote}</p>
 </div>;
}
