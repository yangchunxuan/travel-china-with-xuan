// @ts-ignore Node source tests use explicit TypeScript extensions.
import { germanTourCopyA } from './german-tours/batch-a.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { germanTourCopyB } from './german-tours/batch-b.ts';
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { germanTourCopyC } from './german-tours/batch-c.ts';
import type { GermanTourCopy } from './germanTourCopyTypes';
export const germanTourCopies: Readonly<Record<string, GermanTourCopy>> = Object.freeze({ ...germanTourCopyA, ...germanTourCopyB, ...germanTourCopyC });
export const germanTourSlugs = Object.freeze(Object.keys(germanTourCopies));
export function getGermanTourCopy(slug: string) { return germanTourCopies[slug]; }
export function germanTourPath(slug: string) { return `/de/tours/${slug}/`; }
