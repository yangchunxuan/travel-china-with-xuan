"use client";

import { GuideSearchForm, type GuideSearchSurface } from './GuideSearchForm';
import { getGuideSearchCopy, type GuideSearchCopy } from '../lib/guideSearchI18n';
import { editionEnglishMarker } from '../lib/editionEnglishMarker';
import type { GuideSearchDocument } from '../lib/guideSearch';

/**
 * The words the search form shows on /ja/guides/; the rest (the search page's
 * copy) is never rendered there and stays the English copy. Constructed within
 * the client boundary: this copy includes formatter functions.
 */
export const japaneseGuideSearchCopy: GuideSearchCopy = {
  ...getGuideSearchCopy('en'),
  label: '英語のガイドを検索',
  placeholder: '例えば：Where to stay in Zhangjiajie',
  action: `ガイドを検索${editionEnglishMarker.ja}`,
  examplesLabel: '英語での検索例',
  examples: ['Where to stay in Zhangjiajie', 'Beijing South Station to the airport', 'China with older parents'],
  loadingSuggestions: '近いガイドを探しています…',
  suggestionsUnavailable: '候補の表示に時間がかかっています。このまま検索することもできます。',
  retrySuggestions: 'もう一度試す',
  noSuggestions: '近いガイドはまだ見つかりません。検索すると、すべての結果を表示します。',
  emptyQueryError: '知りたいことを英語で入力してください。',
  suggestionsLabel: (count) => `役に立ちそうなガイド${count}本${editionEnglishMarker.ja}`,
};

/** The English guides, searched from the Japanese hub: every result opens an English page and says so. */
export function JapaneseGuideSearchForm({
  documents, surface = 'guides_hub', rotatingPlaceholders = japaneseGuideSearchCopy.examples,
}: {
  documents?: readonly GuideSearchDocument[];
  surface?: GuideSearchSurface;
  rotatingPlaceholders?: readonly string[];
}) {
  return <GuideSearchForm locale="en" documents={documents} surface={surface}
    rotatingPlaceholders={rotatingPlaceholders} copyOverride={japaneseGuideSearchCopy}
    englishLinkMarker={editionEnglishMarker.ja} />;
}
