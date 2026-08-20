import { assertStructuredPageBody } from "./content-system/page-body";
import type { DestinationHubId } from "./destinationHubs";
import type { HomegroundLocale } from "./homegroundI18n";

type BodyModule = { readonly default: unknown };
type BodyLoader = () => Promise<BodyModule>;

/**
 * Destination hub bodies are authored per locale under `content/destinations/`
 * and imported statically so the static export never depends on a runtime
 * filesystem read.
 */
const bodyLoaders = {
  beijing: {
    en: () => import("../content/destinations/beijing/body.en"),
    zh: () => import("../content/destinations/beijing/body.zh"),
    ko: () => import("../content/destinations/beijing/body.ko"),
  },
  shanghai: {
    en: () => import("../content/destinations/shanghai/body.en"),
    zh: () => import("../content/destinations/shanghai/body.zh"),
    ko: () => import("../content/destinations/shanghai/body.ko"),
  },
  xian: {
    en: () => import("../content/destinations/xian/body.en"),
    zh: () => import("../content/destinations/xian/body.zh"),
    ko: () => import("../content/destinations/xian/body.ko"),
  },
  chengdu: {
    en: () => import("../content/destinations/chengdu/body.en"),
    zh: () => import("../content/destinations/chengdu/body.zh"),
    ko: () => import("../content/destinations/chengdu/body.ko"),
  },
  guangzhou: {
    en: () => import("../content/destinations/guangzhou/body.en"),
    zh: () => import("../content/destinations/guangzhou/body.zh"),
    ko: () => import("../content/destinations/guangzhou/body.ko"),
  },
  hangzhou: {
    en: () => import("../content/destinations/hangzhou/body.en"),
    zh: () => import("../content/destinations/hangzhou/body.zh"),
    ko: () => import("../content/destinations/hangzhou/body.ko"),
  },
  zhangjiajie: {
    en: () => import("../content/destinations/zhangjiajie/body.en"),
    zh: () => import("../content/destinations/zhangjiajie/body.zh"),
    ko: () => import("../content/destinations/zhangjiajie/body.ko"),
  },
} as const satisfies Record<
  DestinationHubId,
  Record<HomegroundLocale, BodyLoader>
>;

export async function loadDestinationHubBody(
  hubId: DestinationHubId,
  locale: HomegroundLocale,
) {
  const loader = bodyLoaders[hubId][locale];
  const module = await loader();
  return assertStructuredPageBody(module.default);
}
