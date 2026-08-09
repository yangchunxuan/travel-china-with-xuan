import { notFound } from "next/navigation";
import type { HomegroundLocale } from "./homegroundI18n";

export type LocalizedHomegroundLocale = Exclude<HomegroundLocale, "en">;

export function localizedRouteLocale(value: string): LocalizedHomegroundLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}
