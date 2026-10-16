import { TravelServicesHubPage, type TravelServicesHubEdition } from './TravelServicesHubPage';
import { FrenchSiteFooter, FrenchSiteHeader } from './FrenchChrome';
import { frenchGuideLanguageNote, frenchLanguagePaths } from '../lib/frenchSite';
import { attractionReservationServiceFeeCny } from '../lib/attractionReservations';

const path = '/fr/services/';
const origin = 'https://homegroundchina.com';
const hrefs = {
  tours: '/fr/tours/',
  guides: '/services/private-english-speaking-guides/',
  reservations: '/services/china-attraction-reservations/',
  support: '/services/full-trip-support/',
} as const;

export const frenchServicesHubCopy: TravelServicesHubEdition['copy'] = {
  breadcrumb: 'Fil d’Ariane',
  overview: 'Tous nos services',
  choicesEyebrow: 'Partons de ce que vous avez déjà préparé',
  choicesTitle: 'Choisissez l’aide dont vous avez vraiment besoin.',
  choicesBody: 'Comparez nos circuits privés, ou indiquez-nous vos dates, le nombre de voyageurs et les services dont vous avez besoin. Nous confirmons les services possibles et le devis avant toute réservation.',
  cards: [
    { id: 'tours', eyebrow: 'Nos itinéraires publiés', title: 'Comparer les circuits privés', body: 'Découvrez les programmes jour après jour, les tarifs de départ, les prestations incluses et les conditions de réservation.', action: 'Comparer les circuits' },
    { id: 'guides', eyebrow: 'Un guide quand il fait la différence', title: 'Guides privés anglophones', body: 'Shanghai, Pékin, Xi’an et Zhangjiajie : comparez les tarifs d’un guide anglophone pour une journée de 8 heures. Le nombre de voyageurs, le parcours et les transports sont confirmés séparément. Un guide francophone fait l’objet d’un supplément sur devis.', action: 'Services et tarifs des guides (en anglais)' },
    { id: 'reservations', eyebrow: 'Billets nominatifs et horaires réservés', title: 'Réserver vos visites', body: 'Pékin, Shanghai, Suzhou, Hangzhou, Xi’an, Chengdu, Guilin et Lijiang : nous réservons par les canaux officiels, au nom inscrit sur votre passeport. Frais de service : {fee} par personne et par site, auxquels s’ajoute le prix du billet.', action: 'Modalités de réservation (en anglais)' },
    { id: 'support', eyebrow: 'De la préparation au séjour sur place', title: 'Organiser l’ensemble du voyage', body: 'Un itinéraire cohérent, puis les hôtels, les billets, les transferts et la coordination sur place nécessaires pour le réaliser.', action: 'Découvrir l’accompagnement complet (en anglais)' },
  ],
  methodEyebrow: 'Notre manière de travailler',
  methodTitle: 'Comprendre notre méthode avant de nous confier votre voyage.',
  methodBody: `Nous précisons ce que vous pouvez continuer à organiser seul, ce qu’il faut vérifier et ce que Homeground prendra en charge avant de commencer toute prestation payante. ${frenchGuideLanguageNote}`,
  methodAction: 'Comment nous préparons un voyage',
  adviceAction: 'D’abord, répondre à une question pratique',
};

export function FrenchServicesPage() {
  const languagePaths = frenchLanguagePaths('/services/', path);
  const edition: TravelServicesHubEdition = {
    language: 'fr', homePath: '/fr/', homeLabel: 'Accueil', skipLink: 'Aller au contenu',
    header: <FrenchSiteHeader currentPath={path} languagePaths={languagePaths} />,
    footer: <FrenchSiteFooter currentPath={path} />,
    copy: frenchServicesHubCopy,
    section: {
      navLabel: 'Services', shortLabel: 'Services', eyebrow: 'Guides · transferts · accompagnement',
      title: 'Un accompagnement local qui fait la différence.',
      description: 'Guide privé, transferts, choix des hôtels, itinéraire ou coordination du séjour : nous adaptons notre accompagnement après avoir compris votre projet.',
      scopeTitle: 'Où une aide locale vous serait-elle utile ?',
      scope: ['Un guide privé pour une journée plus complexe ?', 'Une aide pour les transferts, les hôtels ou les réservations ?', 'Un interlocuteur pour coordonner l’ensemble du parcours ?'],
    },
    serviceHref: id => hrefs[id], planningHref: '/fr/studio/', guidesHref: '/fr/guides/',
    feeLabel: `${new Intl.NumberFormat('fr-FR').format(attractionReservationServiceFeeCny)} CNY`,
    schema: {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', '@id': `${origin}${path}#webpage`, url: `${origin}${path}`, name: 'Voyage sur mesure en Chine : nos services', description: 'Circuits, guides, réservations et accompagnement local pour votre voyage en Chine. Guide francophone en supplément sur devis.', inLanguage: 'fr', sameAs: languagePaths.map(item => `${origin}${item.path}`), mainEntity: { '@id': `${origin}${path}#services` } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: `${origin}/fr/` }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${origin}${path}` }] },
        { '@type': 'ItemList', '@id': `${origin}${path}#services`, numberOfItems: frenchServicesHubCopy.cards.length, itemListElement: frenchServicesHubCopy.cards.map((card,index) => ({ '@type': 'ListItem', position: index + 1, name: card.title, url: `${origin}${hrefs[card.id]}` })) },
      ],
    },
  };
  return <TravelServicesHubPage locale="en" edition={edition} />;
}
