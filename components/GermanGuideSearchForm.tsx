"use client";

import { GuideSearchForm, type GuideSearchSurface } from './GuideSearchForm';
import { getGuideSearchCopy, type GuideSearchCopy } from '../lib/guideSearchI18n';
import type { GuideSearchDocument } from '../lib/guideSearch';

/** Constructed within the client boundary: this copy includes formatter functions. */
export const germanGuideSearchCopy: GuideSearchCopy = {
  ...getGuideSearchCopy('en'),
  navLabel: 'Reisetipp suchen',
  eyebrow: 'Praktische Tipps für China',
  title: 'Eine konkrete Frage? Suchen Sie auf Englisch.',
  introduction: 'Die Artikel sind auf Englisch. Geben Sie einen Ort oder eine Frage auf Englisch ein, um passende Reisetipps zu finden.',
  label: 'Englischsprachige Ratgeber durchsuchen',
  placeholder: 'Zum Beispiel: Where to stay in Zhangjiajie',
  action: 'Suchen (auf Englisch)',
  examplesLabel: 'Beispielsuchen auf Englisch',
  examples: ['Where to stay in Zhangjiajie', 'Beijing South Station to the airport', 'China with older parents'],
  loadingSuggestions: 'Passende Artikel werden gesucht…',
  suggestionsUnavailable: 'Die Vorschläge brauchen etwas länger. Sie können die Suche trotzdem starten.',
  retrySuggestions: 'Erneut versuchen',
  noSuggestions: 'Noch kein genauer Treffer. Starten Sie die Suche, um alle Ergebnisse zu sehen.',
  emptyQueryError: 'Geben Sie einen Ort oder eine Frage auf Englisch ein.',
  suggestionsLabel: (count) => `${count} ${count === 1 ? 'passender Artikel' : 'passende Artikel'} (auf Englisch)`,
  page: {
    metadataTitle: 'China-Reiseratgeber suchen | Homeground',
    metadataDescription: 'Finden Sie praktische Ratgeber zu Städten, Routen, Übernachtungsvierteln, Transport und Reisedauer in China.',
    breadcrumbLabel: 'Seitennavigation', homeLabel: 'Startseite', guidesLabel: 'Reisetipps',
    title: 'China-Reiseratgeber suchen.',
    introduction: 'Geben Sie einen Ort oder eine Frage auf Englisch ein. Artikel und Suchergebnisse sind auf Englisch.',
    emptyQueryTitle: 'Was möchten Sie wissen?',
    emptyQueryBody: 'Versuchen Sie eine Stadt, ein Viertel, eine Strecke oder eine Reisedauer.',
    resultTitle: (query) => `Ratgeber zu „${query}“`,
    resultCount: (count) => `${count} Artikel gefunden`,
    noResultsTitle: (query) => `Kein genauer Treffer für „${query}“`,
    noResultsBody: 'Versuchen Sie eine kürzere englische Suche, stöbern Sie in den Ratgebern oder beschreiben Sie uns Ihre Pläne.',
    browseTopics: 'Themen durchstöbern', allGuides: 'Alle Ratgeber',
    plannerTitle: 'Benötigen Sie Hilfe bei Ihrer Reise?',
    plannerBody: 'Teilen Sie Termine, Teilnehmerzahl und Prioritäten mit. Wir helfen Ihnen, den nächsten Schritt zu klären.',
    plannerAction: 'Meine Reise besprechen', readGuide: 'Artikel lesen (auf Englisch)',
    showMore: 'Weitere Ratgeber anzeigen', updated: 'Aktualisiert am',
  },
};

export function GermanGuideSearchForm({
  documents, documentsUrl, surface = 'guides_hub', initialQuery, compact,
  rotatingPlaceholders = germanGuideSearchCopy.examples, showExamples,
}: {
  documents?: readonly GuideSearchDocument[];
  documentsUrl?: string;
  surface?: GuideSearchSurface;
  initialQuery?: string;
  compact?: boolean;
  rotatingPlaceholders?: readonly string[];
  showExamples?: boolean;
}) {
  return <GuideSearchForm locale="en" documents={documents} documentsUrl={documentsUrl}
    surface={surface} initialQuery={initialQuery} compact={compact}
    rotatingPlaceholders={rotatingPlaceholders} showExamples={showExamples}
    copyOverride={germanGuideSearchCopy} />;
}
