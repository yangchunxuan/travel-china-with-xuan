"use client";

import { GuideSearchForm, type GuideSearchSurface } from './GuideSearchForm';
import { getGuideSearchCopy, type GuideSearchCopy } from '../lib/guideSearchI18n';
import type { GuideSearchDocument } from '../lib/guideSearch';

/** Constructed within the client boundary: this copy includes formatter functions. */
export const frenchGuideSearchCopy: GuideSearchCopy = {
  ...getGuideSearchCopy('en'),
  navLabel: 'Rechercher un conseil',
  eyebrow: 'Conseils pratiques pour la Chine',
  title: 'Une question précise ? Recherchez en anglais.',
  introduction: 'Les articles sont en anglais. Saisissez un nom de lieu ou une question en anglais pour trouver les conseils utiles à votre voyage.',
  label: 'Rechercher dans les guides en anglais',
  placeholder: 'Par exemple : Where to stay in Zhangjiajie',
  action: 'Rechercher (en anglais)',
  examplesLabel: 'Exemples de recherches en anglais',
  examples: ['Where to stay in Zhangjiajie', 'Beijing South Station to the airport', 'China with older parents'],
  loadingSuggestions: 'Recherche des articles les plus pertinents…',
  suggestionsUnavailable: 'Les suggestions tardent à apparaître. Vous pouvez tout de même lancer la recherche.',
  retrySuggestions: 'Réessayer',
  noSuggestions: 'Pas encore de correspondance précise. Lancez la recherche pour voir tous les résultats.',
  emptyQueryError: 'Saisissez un lieu ou une question en anglais.',
  suggestionsLabel: (count) => `${count} ${count === 1 ? 'article susceptible' : 'articles susceptibles'} de vous aider (en anglais)`,
  page: {
    metadataTitle: 'Rechercher un guide de voyage en Chine | Homeground',
    metadataDescription: 'Trouvez un guide pratique sur les villes, les itinéraires, les quartiers où dormir, les transports et la durée d’un séjour en Chine.',
    breadcrumbLabel: 'Fil d’Ariane', homeLabel: 'Accueil', guidesLabel: 'Conseils de voyage',
    title: 'Rechercher un guide de voyage en Chine.',
    introduction: 'Indiquez un lieu ou une question en anglais. Les articles et les résultats de recherche sont en anglais.',
    emptyQueryTitle: 'Que souhaitez-vous savoir ?',
    emptyQueryBody: 'Essayez le nom d’une ville, un quartier, un trajet ou une durée de séjour.',
    resultTitle: (query) => `Guides pour « ${query} »`,
    resultCount: (count) => `${count} ${count === 1 ? 'article trouvé' : 'articles trouvés'}`,
    noResultsTitle: (query) => `Aucun résultat précis pour « ${query} »`,
    noResultsBody: 'Essayez une recherche plus courte en anglais, parcourez les guides ou expliquez-nous votre projet.',
    browseTopics: 'Parcourir les thèmes', allGuides: 'Tous les guides',
    plannerTitle: 'Besoin d’aide pour votre voyage ?',
    plannerBody: 'Partagez vos dates, le nombre de voyageurs et vos priorités. Nous vous aiderons à préciser la prochaine étape.',
    plannerAction: 'Parler de mon voyage', readGuide: 'Lire l’article (en anglais)',
    showMore: 'Afficher d’autres guides', updated: 'Mis à jour le',
  },
};

export function FrenchGuideSearchForm({
  documents, documentsUrl, surface = 'guides_hub', initialQuery, compact,
  rotatingPlaceholders = frenchGuideSearchCopy.examples, showExamples,
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
    copyOverride={frenchGuideSearchCopy} />;
}
