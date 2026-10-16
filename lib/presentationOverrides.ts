/** Widen only presentation strings, retaining the shape of the source copy. */
export type PresentationCopy<T> = T extends string ? string
  : T extends (...args: infer A) => infer R ? (...args: A) => PresentationCopy<R>
  : T extends readonly (infer U)[] ? readonly PresentationCopy<U>[]
  : T extends object ? { [K in keyof T]: PresentationCopy<T[K]> } : T;
