/** Count published prices separately from routes that need an individual quote. */
export function describePublishedTourCatalog(tours) {
  const priced = tours.filter((tour) => tour.startingPrice !== null).length;
  const quoteOnly = tours.length - priced;
  return `${tours.length} published routes: ${priced} with per-person prices in USD${quoteOnly ? `; ${quoteOnly} quoted on request` : ""}.`;
}
