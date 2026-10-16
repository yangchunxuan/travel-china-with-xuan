import { frenchDraftNote, frenchGeneralContactHrefs, frenchGuideLanguageNote } from '../lib/frenchSite';
import styles from './FrenchPages.module.css';
export function FrenchContactPanel({path}: {path:string}) {
  const links=frenchGeneralContactHrefs(path);
  return <section className={styles.contact} id="planner-contact" aria-labelledby="fr-contact-title">
    <h2 id="fr-contact-title">Parlons de votre voyage.</h2>
    <p>Vos dates, votre groupe, vos envies : quelques lignes suffisent pour commencer. Nous préciserons les prestations et le prix par écrit avant toute réservation.</p>
    <p>{frenchGuideLanguageNote}</p>
    <div className={styles.actions}><a className={styles.action} href={links.whatsapp} target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp</a><a className={styles.textLink} href={links.email}>Nous écrire par e-mail</a></div>
    <p className={styles.muted}>{frenchDraftNote}</p>
  </section>;
}
