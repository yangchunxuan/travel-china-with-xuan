// @ts-ignore Node source tests use explicit TypeScript extensions.
import { frenchTourCopyA } from './french-tours/batch-a.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { frenchTourCopyB } from './french-tours/batch-b.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { frenchTourCopyC } from './french-tours/batch-c.ts';
import type { FrenchTourCopy } from './frenchTourCopyTypes';
export const frenchTourCopies: Readonly<Record<string, FrenchTourCopy>> = Object.freeze({ ...frenchTourCopyA, ...frenchTourCopyB, ...frenchTourCopyC });
export const frenchTourSlugs = Object.freeze(Object.keys(frenchTourCopies));
export function getFrenchTourCopy(slug: string) { return frenchTourCopies[slug]; }
export function frenchTourPath(slug: string) { return `/fr/tours/${slug}/`; }
