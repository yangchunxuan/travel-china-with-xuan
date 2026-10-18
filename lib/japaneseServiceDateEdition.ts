import type { ContactEditionDateCopy } from './contactEdition';

/** Service forms keep ISO values while showing a Japanese calendar and year-first dates. */
export const japaneseServiceDateEdition = {
  language: 'ja' as const,
  date: {
    placeholder: 'YYYY/MM/DD',
    formatHint: '年 / 月 / 日（YYYY/MM/DD）',
    invalid: '日付を YYYY/MM/DD の形式で正しく入力してください。',
    openCalendar: 'カレンダーを開く',
    closeCalendar: 'カレンダーを閉じる',
    title: '訪問日を選ぶ',
    loadingCalendar: 'カレンダーを読み込んでいます…',
    calendarUnavailable: 'カレンダーを読み込めませんでした。閉じて日付を直接入力するか、もう一度開いてください。',
  } satisfies ContactEditionDateCopy,
};
