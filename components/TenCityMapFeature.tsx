import Link from "next/link";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import styles from "./TenCityMapFeature.module.css";

const MAP_PAGE = "/guides/first-trip-china-airport-station-stay-map/";
const MAP_IMAGE =
  "/images/guides/first-trip-china-airport-station-stay-map/hero-1600.webp";
const MAP_PACK =
  "/downloads/homeground-china-10-city-arrival-stay-departure-v1.zip";

const copy = {
  en: {
    eyebrow: "Original reference map",
    title: "Ten cities, one airport–station–stay decision map.",
    body:
      "Match the exact arrival node to a sensible first stay area and the next departure. The complete pack includes the national schematic, ten city cards, CSV, JSON, source notes and reuse files.",
    alt:
      "Homeground China schematic connecting ten gateway cities with arrive, stay and depart decisions.",
    caption: "Editorial schematic, not to scale or live navigation.",
    open: "Open the map and source table",
    download: "Download the complete asset pack",
    format: "ZIP · CC BY 4.0",
    licence: "Reusable with attribution under CC BY 4.0.",
  },
  zh: {
    eyebrow: "原创参考地图",
    title: "十座城市，一张机场—车站—住宿决策图。",
    body:
      "把准确的抵达节点、适合第一程的住宿区域和下一段出发连在一起。完整英文资源包包含全国示意图、十张城市卡、CSV、JSON、来源说明与复用文件。",
    alt: "Homeground China 十城抵达、住宿与出发关系示意图。",
    caption: "编辑示意图，不按地理比例，也不能代替实时导航。",
    open: "打开英文地图与数据表",
    download: "下载完整资源包",
    format: "ZIP · CC BY 4.0",
    licence: "按照 CC BY 4.0 署名后可复用。",
  },
  ko: {
    eyebrow: "Homeground 오리지널 참고 지도",
    title: "10개 도시의 공항·기차역·숙소 결정을 한 장에 담았습니다.",
    body:
      "정확한 도착 지점과 첫 숙소 지역, 다음 출발을 연결해 확인하세요. 전체 영문 자료 묶음에는 전국 개념도와 도시 카드 10장, CSV, JSON, 출처 및 재사용 안내가 포함됩니다.",
    alt: "10개 관문 도시의 도착, 숙박, 출발 결정을 연결한 Homeground China 개념도.",
    caption: "축척 지도나 실시간 길 안내가 아닌 편집용 개념도입니다.",
    open: "영문 지도와 원본 표 열기",
    download: "전체 자료 묶음 다운로드",
    format: "ZIP · CC BY 4.0",
    licence: "CC BY 4.0에 따라 출처를 표시하고 재사용할 수 있습니다.",
  },
} as const;

export function TenCityMapFeature({
  headingId,
  locale,
  placement,
}: {
  headingId: string;
  locale: HomegroundLocale;
  placement: "article" | "homepage" | "transport-hub";
}) {
  const localeCopy = copy[locale];

  return (
    <section
      aria-labelledby={headingId}
      className={styles.feature}
      data-ten-city-map-placement={placement}
    >
      <Link
        aria-label={localeCopy.open}
        className={styles.imageLink}
        href={MAP_PAGE}
      >
        <img
          alt={localeCopy.alt}
          decoding="async"
          height="1000"
          loading="lazy"
          src={MAP_IMAGE}
          width="1600"
        />
      </Link>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{localeCopy.eyebrow}</p>
        <h2 id={headingId}>{localeCopy.title}</h2>
        <p>{localeCopy.body}</p>
        <div className={styles.actions}>
          <Link href={MAP_PAGE}>
            {localeCopy.open}
            <span aria-hidden="true">→</span>
          </Link>
          <a download href={MAP_PACK}>
            <span>
              <strong>{localeCopy.download}</strong>
              <small>{localeCopy.format}</small>
            </span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className={styles.licence}>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            {localeCopy.licence}
          </a>{" "}
          {localeCopy.caption}
        </p>
      </div>
    </section>
  );
}
