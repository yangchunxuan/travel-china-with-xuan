import Link from "next/link";
import { getDestinationHubEntry } from "../lib/destinationHubs";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getSearchCollection,
  getSearchCollectionPath,
} from "../lib/searchCollectionI18n";
import { getSearchSectionPath } from "../lib/searchPlatformI18n";
import styles from "./AuthorityHubLinks.module.css";

export type AuthorityHubKind =
  | "entry"
  | "route-trio"
  | "transport-route"
  | "zhangjiajie";

const copy = {
  en: {
    entry: {
      eyebrow: "Continue with the entry guide",
      title: "Compare China entry routes in one place.",
      body:
        "Passport, travel purpose and route have to work together. Use the entry hub to compare the current country guides and the separate transit route before relying on one rule.",
      entryLabel: "Compare China entry guides",
    },
    route: {
      eyebrow: "Continue with the city guides",
      title: "Check each city before fixing the route.",
      body:
        "The city guides bring nights, stay areas, airports, railway stations and sensible onward combinations back into the same plan.",
      transportLabel: "Browse China transport guides",
    },
    zhangjiajie: {
      eyebrow: "Continue with the destination guide",
      title: "See how Zhangjiajie fits together.",
      body:
        "Compare Zhangjiajie city, Wulingyuan, the park gates, Tianmen Mountain, arrival nodes and the next city before choosing a hotel base or daily order.",
      label: "Open the Zhangjiajie travel guide",
    },
  },
  zh: {
    entry: {
      eyebrow: "继续查看入境专题",
      title: "把不同中国入境方式放在一起比较。",
      body:
        "护照、旅行目的和实际路线必须同时成立。先从入境专题比较国籍规则与单独的过境路线，再判断哪一条适用于自己。",
      entryLabel: "查看中国入境与过境指南",
    },
    route: {
      eyebrow: "继续查看城市指南",
      title: "确定路线前，先分别看懂每座城市。",
      body:
        "城市指南把停留晚数、住宿区域、机场、车站和适合衔接的下一站放回同一条路线里。",
      transportLabel: "浏览中国交通指南",
    },
    zhangjiajie: {
      eyebrow: "继续查看目的地指南",
      title: "先看懂张家界各个地点之间的关系。",
      body:
        "比较张家界市区、武陵源、不同公园入口、天门山、抵达节点和下一站，再决定住宿基地与每天的顺序。",
      label: "查看张家界旅行指南",
    },
  },
  ko: {
    entry: {
      eyebrow: "입국 가이드에서 이어 보기",
      title: "중국 입국 경로를 한곳에서 비교하세요.",
      body:
        "여권과 방문 목적, 실제 이동 경로가 함께 조건을 충족해야 합니다. 입국 가이드에서 국적별 안내와 별도의 경유 규정을 비교한 뒤 적용 여부를 판단하세요.",
      entryLabel: "중국 입국·경유 가이드 보기",
    },
    route: {
      eyebrow: "도시 가이드에서 이어 보기",
      title: "동선을 확정하기 전에 각 도시를 먼저 확인하세요.",
      body:
        "도시 가이드에서 권장 숙박 일수와 숙소 지역, 공항과 기차역, 다음 도시 연결을 하나의 여정으로 확인할 수 있습니다.",
      transportLabel: "중국 교통 가이드 보기",
    },
    zhangjiajie: {
      eyebrow: "여행지 가이드에서 이어 보기",
      title: "장자제의 여러 지점을 한눈에 연결하세요.",
      body:
        "장자제 시내와 우링위안, 공원 입구, 톈먼산, 도착 지점과 다음 도시를 비교한 뒤 숙소 거점과 하루 순서를 정하세요.",
      label: "장자제 여행 가이드 보기",
    },
  },
} as const;

function routeCityLinks(locale: HomegroundLocale) {
  return (["beijing", "zhangjiajie", "shanghai"] as const).map((id) => {
    const hub = getDestinationHubEntry(id, locale);
    return { href: hub.canonicalPath, label: hub.navTitle };
  });
}

export function AuthorityHubLinks({
  kind,
  locale,
}: {
  kind: AuthorityHubKind;
  locale: HomegroundLocale;
}) {
  const localeCopy = copy[locale];
  const headingId = `authority-hub-${kind}-title`;

  if (kind === "zhangjiajie") {
    const hub = getDestinationHubEntry("zhangjiajie", locale);
    const sectionCopy = localeCopy.zhangjiajie;

    return (
      <aside
        aria-labelledby={headingId}
        className={styles.panel}
        data-authority-hub-links={kind}
      >
        <div>
          <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
          <h2 id={headingId}>{sectionCopy.title}</h2>
          <p className={styles.body}>{sectionCopy.body}</p>
        </div>
        <Link className={styles.primaryLink} href={hub.canonicalPath}>
          {sectionCopy.label}
          <span aria-hidden="true">→</span>
        </Link>
      </aside>
    );
  }

  if (kind === "entry") {
    const sectionCopy = localeCopy.entry;
    const entryPath =
      locale === "en"
        ? "/guides/china-entry-requirements/"
        : getSearchCollectionPath(
            getSearchCollection("essentials-entry-transit"),
            locale,
          );

    return (
      <aside
        aria-labelledby={headingId}
        className={styles.panel}
        data-authority-hub-links={kind}
      >
        <div>
          <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
          <h2 id={headingId}>{sectionCopy.title}</h2>
          <p className={styles.body}>{sectionCopy.body}</p>
        </div>
        <Link className={styles.primaryLink} href={entryPath}>
          {sectionCopy.entryLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </aside>
    );
  }

  const sectionCopy = localeCopy.route;
  const links = routeCityLinks(locale);

  return (
    <aside
      aria-labelledby={headingId}
      className={styles.panel}
      data-authority-hub-links={kind}
    >
      <div>
        <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
        <h2 id={headingId}>{sectionCopy.title}</h2>
        <p className={styles.body}>{sectionCopy.body}</p>
      </div>
      <nav aria-label={sectionCopy.title} className={styles.linkGroup}>
        {kind === "transport-route" ? (
          <Link
            className={styles.primaryLink}
            href={getSearchSectionPath("transport", locale)}
          >
            {sectionCopy.transportLabel}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
