import { TravelServicesHubPage, type TravelServicesHubEdition } from './TravelServicesHubPage';
import { GermanSiteFooter, GermanSiteHeader } from './GermanChrome';
import { germanGuideLanguageNote, germanLanguagePaths } from '../lib/germanSite';
import { attractionReservationServiceFeeCny } from '../lib/attractionReservations';

const path = '/de/services/';
const origin = 'https://homegroundchina.com';
const hrefs = {
  tours: '/de/tours/',
  guides: '/de/services/private-english-speaking-guides/',
  reservations: '/de/services/china-attraction-reservations/',
  support: '/de/services/full-trip-support/',
} as const;

export const germanServicesHubCopy: TravelServicesHubEdition['copy'] = {
  breadcrumb: 'Seitennavigation',
  overview: 'Alle Leistungen',
  choicesEyebrow: 'Beginnen wir mit Ihren bisherigen Plänen',
  choicesTitle: 'Wählen Sie die Unterstützung, die Sie wirklich brauchen.',
  choicesBody: 'Vergleichen Sie unsere Privatreisen oder nennen Sie uns Reisedaten, Personenzahl und benötigte Leistungen. Wir bestätigen mögliche Leistungen und das Angebot vor jeder Buchung.',
  cards: [
    { id: 'tours', eyebrow: 'Unsere veröffentlichten Routen', title: 'Privatreisen vergleichen', body: 'Entdecken Sie Tagesprogramme, Einstiegspreise, enthaltene Leistungen und Buchungsbedingungen.', action: 'Reisen vergleichen' },
    { id: 'guides', eyebrow: 'Reiseleitung, wenn sie den Unterschied macht', title: 'Private englischsprachige Reiseleitung', body: 'Shanghai, Peking, Xi’an und Zhangjiajie: Vergleichen Sie Tarife für englischsprachige Reiseleitung für bis zu 8 Stunden. Personenzahl, Route und Transport werden separat bestätigt. Deutschsprachige Reiseleitung erfordert eine gesonderte Bestätigung von Verfügbarkeit und Preis.', action: 'Leistungen und Preise der Reiseleitung' },
    { id: 'reservations', eyebrow: 'Termine stehen fest? Früh buchen.', title: 'Chinas schwer buchbare Tickets übernehmen wir', body: 'Sparen Sie sich chinesische Apps und den Stress zum Verkaufsstart. Wir buchen im System der jeweiligen Sehenswürdigkeit auf Ihren Passnamen. Senden Sie Ihre Termine früh, damit wir vor der Freigabe bereit sind. Servicegebühr: {fee} pro Person und Sehenswürdigkeit, zuzüglich Eintritt zum Originalpreis.', action: 'Termine zur Buchung senden' },
    { id: 'support', eyebrow: 'Von der Planung bis zum Aufenthalt', title: 'Die gesamte Reise organisieren', body: 'Eine stimmige Route und die passenden Hotels, Tickets, Transfers und Koordination vor Ort.', action: 'Gesamte Reiseorganisation ansehen' },
  ],
  methodEyebrow: 'Unsere Arbeitsweise',
  methodTitle: 'Lernen Sie unsere Arbeitsweise vor der Reiseplanung kennen.',
  methodBody: `Bevor kostenpflichtige Leistungen beginnen, klären wir, was Sie selbst organisieren können, was geprüft werden muss und was Homeground übernimmt. ${germanGuideLanguageNote}`,
  methodAction: 'So planen wir eine Reise',
  adviceAction: 'Zuerst eine praktische Frage klären',
};

export function GermanServicesPage() {
  const languagePaths = germanLanguagePaths('/services/', path);
  const edition: TravelServicesHubEdition = {
    language: 'de', homePath: '/de/', homeLabel: 'Startseite', skipLink: 'Zum Inhalt',
    header: <GermanSiteHeader currentPath={path} languagePaths={languagePaths} />,
    footer: <GermanSiteFooter currentPath={path} />,
    copy: germanServicesHubCopy,
    section: {
      navLabel: 'Leistungen', shortLabel: 'Leistungen', eyebrow: 'Reiseleitung · Transfers · Betreuung',
      title: 'Unterstützung vor Ort, die den Unterschied macht.',
      description: 'Private Reiseleitung, Transfers, Hotelauswahl, Route oder Koordination: Wir passen unsere Unterstützung an Ihre Reisepläne an.',
      scopeTitle: 'Wo wäre lokale Unterstützung hilfreich?',
      scope: ['Private Reiseleitung für einen anspruchsvolleren Tag?', 'Unterstützung bei Transfers, Hotels oder Reservierungen?', 'Eine Ansprechperson für die Koordination der gesamten Route?'],
    },
    serviceHref: id => hrefs[id], planningHref: '/de/studio/', guidesHref: '/de/guides/',
    feeLabel: `${new Intl.NumberFormat('de-DE').format(attractionReservationServiceFeeCny)} CNY`,
    schema: {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', '@id': `${origin}${path}#webpage`, url: `${origin}${path}`, name: 'Individuelle China-Reise: unsere Leistungen', description: 'Reisen, Reiseleitung, Reservierungen und lokale Unterstützung für Ihre China-Reise. Deutschsprachige Reiseleitung ist nicht im Preis enthalten.', inLanguage: 'de', sameAs: languagePaths.map(item => `${origin}${item.path}`), mainEntity: { '@id': `${origin}${path}#services` } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${origin}/de/` }, { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${origin}${path}` }] },
        { '@type': 'ItemList', '@id': `${origin}${path}#services`, numberOfItems: germanServicesHubCopy.cards.length, itemListElement: germanServicesHubCopy.cards.map((card,index) => ({ '@type': 'ListItem', position: index + 1, name: card.title, url: `${origin}${hrefs[card.id]}` })) },
      ],
    },
  };
  return <TravelServicesHubPage locale="en" edition={edition} />;
}
