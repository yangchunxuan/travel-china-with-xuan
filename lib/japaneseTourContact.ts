import { homegroundBusiness } from "./homegroundBusiness";
import type { JapaneseContactHrefs } from "../components/JapaneseJiangnanInteraction";
import type { LocalizedPrivateTourProduct } from "./privateTourProducts";

/** Direct Japanese contact preserves the selected source package and party size. */
export function japaneseTourContactHrefs(
  product: LocalizedPrivateTourProduct,
): JapaneseContactHrefs {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || "8613174215999";
  const phone = /^\d{7,15}$/.test(configured) ? configured : "8613174215999";
  const url = `https://homegroundchina.com${product.path}`;
  const whatsapp: Record<string, string> = {};
  const email: Record<string, string> = {};
  const add = (key: string, packageLabel?: string, travelers?: number) => {
    const message = [
      "こんにちは。日本語で旅行について相談したいです。",
      `希望する旅行：${product.title}`,
      ...(packageLabel ? [`希望するプラン：${packageLabel}`] : []),
      ...(product.slug === "zhangjiajie-4-day-private-tour" && !packageLabel
        ? ["希望する宿泊プラン："]
        : []),
      `参加人数：${travelers && product.tourFormat !== "small-group" ? `${travelers}名` : ""}`,
      product.tourFormat === "small-group" ? "希望する出発日：" : "旅行予定日：",
      "ガイドの言語の希望：",
      `参照ページ：${url}`,
    ].join("\n");
    whatsapp[key] = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    email[key] = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(`日本語での旅行相談：${product.title}`)}&body=${encodeURIComponent(message)}`;
  };
  add("other");
  for (const tourPackage of product.packages) {
    for (const row of tourPackage.rows) {
      add(`${tourPackage.id}:${row.travelers}`, tourPackage.label,
        product.tourFormat === "small-group" ? undefined : row.travelers);
    }
  }
  return { whatsapp, email };
}
