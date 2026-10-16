import { getHomegroundLegalCopy, type HomegroundLegalCopy, type HomegroundLegalPageId } from './homegroundLegalI18n';
import type { HomegroundPrivacyCopy } from './homegroundPrivacyI18n';
import { getFrenchLegalCopy } from './frenchLegalCopy';
import { homegroundBusiness as business } from './homegroundBusiness';
import { travelAgencyCertificateHolder as certificates } from './homegroundTravelAgencyCredentials';

/** Localized content for the original legal components, with their structure intact. */
export function getFrenchLegalLayoutCopy(pageId: HomegroundLegalPageId): HomegroundLegalCopy {
  const source = getHomegroundLegalCopy(pageId, 'en');
  const base: HomegroundLegalCopy = {
    ...source, htmlLang: 'fr', pagePath: `/fr/${pageId}/`, homePath: '/fr/', languageShort: 'FR',
    skipLink: 'Aller au contenu',
    navigation: { homeLabel: 'Accueil Homeground China', languageLabel: 'Langue de la page', pageLabel: 'Informations légales', homeCta: 'Parler de mon voyage' },
    relatedLabel: 'Informations sur l’entreprise et nos services',
    related: { business: 'Informations légales', terms: 'Conditions de service', refund: 'Remboursement et livraison', privacy: 'Confidentialité', contact: 'Nous écrire' },
  };
  if (pageId !== 'business-information') {
    const copy = getFrenchLegalCopy(pageId);
    return { ...base, metadata: copy.metadata, navigation: { ...base.navigation, pageLabel: copy.hero.eyebrow }, hero: { ...copy.hero, reviewedLabel: 'Dernière révision du texte source' }, callout: copy.callout, sections: copy.sections };
  }
  return {
    ...base,
    metadata: { title: 'Informations légales et licence de Homeground China', description: 'Société exploitante, immatriculation et licence d’agence de voyages de Homeground China, copies des documents et conditions de confirmation avant paiement.' },
    hero: { eyebrow: 'Informations légales', title: 'Qui est derrière Homeground ?', intro: 'Homeground est une marque de voyage en Chine exploitée par une agence légalement immatriculée à Pékin, en Chine continentale. Sa licence couvre le tourisme intérieur et l’accueil de voyageurs venant de l’étranger.', reviewedLabel: 'Dernière révision du texte source', reviewedValue: '15 septembre 2026' },
    callout: { label: 'Commencer en toute clarté', title: 'Une société dont vous pouvez vérifier l’identité, des prestations définies avant paiement.', body: 'Présentez-nous votre projet. Nous précisons vos besoins et la suite à donner par écrit. Pour toute prestation acceptée, le contenu, le prix, le périmètre, le délai et les modalités de règlement sont indiqués avant de payer.' },
    sections: [
      { id: 'registered-details', title: 'Informations d’immatriculation', facts: [
        { label: 'Dénomination enregistrée', value: business.registeredName },
        { label: 'Code unifié de crédit social', value: business.unifiedSocialCreditCode },
        { label: 'Représentant légal', value: business.legalRepresentative },
        { label: 'Adresse enregistrée', value: business.registeredAddress },
        { label: 'Autorité d’immatriculation', value: business.registrationAuthority },
        { label: 'Date de création', value: business.registrationDate },
        { label: 'Registre officiel', value: 'Système national chinois d’information sur le crédit des entreprises', detail: `Recherchez le code ${business.unifiedSocialCreditCode} sur ce site en chinois.`, href: business.registryUrl, external: true },
      ] },
      { id: 'travel-agency-credentials', title: 'Licence et documents de l’agence', paragraphs: ['La société qui exploite Homeground détient les documents ci-dessous pour les activités de tourisme intérieur et de tourisme réceptif en Chine.'], facts: [
        { label: 'Société exploitante', value: business.registeredName, detail: business.englishName },
        { label: 'Code unifié de crédit social', value: business.unifiedSocialCreditCode },
        { label: 'Numéro de licence d’agence de voyages', value: business.travelAgencyLicenceNumber },
        { label: 'Référence de l’autorisation', value: business.travelAgencyPermitDocumentNumber },
        { label: 'Activités autorisées', value: 'Tourisme intérieur en Chine et tourisme réceptif' },
        { label: 'Licence d’agence de voyages', value: 'Consulter la licence', href: certificates.travelAgencyLicencePath },
        { label: 'Licence commerciale', value: 'Consulter la licence commerciale', href: certificates.businessLicencePath },
        { label: 'Vérifier la licence touristique', value: 'Ministère chinois de la Culture et du Tourisme', detail: 'Recherchez le nom chinois de la société ci-dessus sur ce site en chinois.', href: business.travelAgencyRegistryUrl, external: true },
        { label: 'Vérifier l’immatriculation', value: 'Système national chinois d’information sur le crédit des entreprises', detail: `Recherchez le code ${business.unifiedSocialCreditCode} sur ce site en chinois.`, href: business.registryUrl, external: true },
      ] },
      { id: 'current-services', title: 'Les services actuellement proposés', cards: [{ title: 'Planification du voyage et accompagnement sur place', body: 'Partagez l’ensemble de votre projet avec Homeground. Nous commençons par vos dates, les voyageurs, vos priorités et l’accompagnement souhaité, puis nous définissons les prestations et une proposition réalisable.' }], paragraphs: ['Les prestations payantes de vérification ou de création d’itinéraire vendues seules ne sont plus proposées. Les services déjà acceptés restent soumis à leur accord écrit d’origine. Pour les circuits privés, l’organisation, les prestations incluses, le prix et les conditions de règlement sont confirmés par écrit avant réservation.'] },
      { id: 'how-it-starts', title: 'Les étapes de votre demande', numbered: ['Présentez gratuitement votre projet de voyage.', 'Homeground précise vos besoins et les arrangements que l’équipe peut proposer.', 'Avant paiement, recevez une confirmation écrite indiquant l’exploitant, le service, le prix et la devise, les prestations incluses, les éléments nécessaires, la date de livraison et les conditions applicables.', 'Les instructions de règlement sont envoyées séparément.', 'Les prestations convenues commencent après confirmation du paiement et réception de tous les éléments nécessaires.'] },
      { id: 'payment-records', title: 'Paiement et coordonnées', paragraphs: ['Ne transmettez pas de données de carte, d’identifiants bancaires ni de QR code de paiement par le formulaire du site. Avant de payer, vérifiez que le bénéficiaire correspond à celui de la confirmation écrite. Les possibilités de facture ou de reçu sont précisées avant paiement.'], facts: [{ label: 'Questions sur les services ou vos données', value: business.serviceEmail, href: `mailto:${business.serviceEmail}` }, { label: 'Adresse enregistrée', value: business.registeredAddress }] },
    ],
  };
}

/** Map the already reviewed full French notice onto the original privacy layout. */
export function getFrenchPrivacyLayoutCopy(): HomegroundPrivacyCopy {
  const copy = getFrenchLegalCopy('privacy');
  function section(id: string) {
    const item = copy.sections.find(s => s.id === id);
    if (!item) throw new Error(`Missing French privacy section: ${id}`);
    return item;
  }
  function rows(id: string, eyebrow: string) {
    const item = section(id);
    return { eyebrow, title: item.title, intro: item.paragraphs?.join(' ') ?? '', rows: (item.facts ?? []).map(f => ({ label: f.label, value: f.value, detail: f.detail ?? '' })) };
  }
  const flow = section('current-flow'), collection = section('collection'), choices = section('choices'), contact = section('contact');
  return {
    htmlLang: 'fr', pagePath: '/fr/privacy/', homePath: '/fr/', languageShort: 'FR', metadata: copy.metadata, skipLink: 'Aller à la notice de confidentialité',
    navigation: { homeLabel: 'Accueil Homeground China', languageLabel: 'Langue de la notice', privacyLabel: 'Confidentialité', homeCta: 'Parler de mon voyage' },
    hero: { ...copy.hero, reviewedLabel: 'Dernière révision du texte source' },
    status: { eyebrow: copy.callout!.label, title: copy.callout!.title, body: copy.callout!.body, blockersTitle: 'Les points essentiels', blockers: copy.callout!.bullets ?? [] },
    currentFlow: { title: flow.title, paragraphs: flow.paragraphs ?? [] },
    collection: { eyebrow: 'Les informations recueillies', title: collection.title, intro: collection.paragraphs?.join(' ') ?? '', items: (collection.facts ?? []).map(f => ({ name: f.label, stage: f.value, purpose: f.detail ?? '' })) },
    reservation: rows('attraction-reservations', 'Réservations acceptées'), providers: rows('providers', 'Prestataires'), configuration: rows('configuration', 'Conservation et accès'),
    choices: { eyebrow: 'Vos choix', title: choices.title, paragraphs: choices.paragraphs ?? [], items: choices.bullets ?? [] },
    contact: { eyebrow: 'Vos données personnelles', title: contact.title, body: contact.paragraphs?.join(' ') ?? '', emailLabel: 'E-mail de confidentialité', emailPlaceholder: business.serviceEmail, addressLabel: 'Adresse enregistrée', addressPlaceholder: business.registeredAddress },
    footer: section('scope').paragraphs?.join(' ') ?? '',
  };
}
