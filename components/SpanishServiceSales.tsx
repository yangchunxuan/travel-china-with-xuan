import { spanishHubSales, spanishServiceSales } from "../lib/spanish-sales/services";
import { SpanishSalesBlock } from "./SpanishSalesBlock";

const servicePaths = {
  reservations: "/es/services/china-attraction-reservations/",
  car: "/es/services/private-car-and-driver/",
  guides: "/es/services/private-english-speaking-guides/",
  support: "/es/services/full-trip-support/",
} as const;

/** The Spanish sales block on a service detail page. */
export function SpanishServiceSales({ service }: { service: keyof typeof servicePaths }) {
  return <SpanishSalesBlock copy={spanishServiceSales(service)} path={servicePaths[service]} />;
}

/** The Spanish sales block on the tours and services hubs. */
export function SpanishHubSales({ hub }: { hub: "tours" | "services" }) {
  return <SpanishSalesBlock copy={spanishHubSales(hub)} path={hub === "tours" ? "/es/tours/" : "/es/services/"} />;
}
