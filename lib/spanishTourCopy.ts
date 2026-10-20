// @ts-ignore Node source tests use explicit TypeScript extensions.
import { spanishTourCopyA } from './spanish-tours/batch-a.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { spanishTourCopyB } from './spanish-tours/batch-b.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { spanishTourCopyC } from './spanish-tours/batch-c.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { spanishTourCopyD } from './spanish-tours/batch-d.ts';
import type { SpanishTourCopy } from './spanishTourCopyTypes';
export const spanishTourCopies: Readonly<Record<string, SpanishTourCopy>> = Object.freeze({ ...spanishTourCopyA, ...spanishTourCopyB, ...spanishTourCopyC, ...spanishTourCopyD });
export const spanishTourSlugs = Object.freeze(Object.keys(spanishTourCopies));
export type { SpanishTourCopy } from './spanishTourCopyTypes';
export function hasSpanishTourPage(slug: string) { return Object.hasOwn(spanishTourCopies, slug); }
export function getSpanishTourCopy(slug: string) { return spanishTourCopies[slug]; }
export function spanishTourPath(slug: string) { return `/es/tours/${slug}/`; }
