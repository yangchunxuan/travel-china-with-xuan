// @ts-ignore Node source tests use explicit TypeScript extensions.
import { arabicTourCopyA } from './arabic-tours/batch-a.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { arabicTourCopyB } from './arabic-tours/batch-b.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { arabicTourCopyC } from './arabic-tours/batch-c.ts';
import type { ArabicTourCopy } from './arabicTourCopyTypes';
export const arabicTourCopies: Readonly<Record<string, ArabicTourCopy>> = Object.freeze({ ...arabicTourCopyA, ...arabicTourCopyB, ...arabicTourCopyC });
export const arabicTourSlugs = Object.freeze(Object.keys(arabicTourCopies));
export function getArabicTourCopy(slug: string) { return arabicTourCopies[slug]; }
export function arabicTourPath(slug: string) { return `/ar/tours/${slug}/`; }
