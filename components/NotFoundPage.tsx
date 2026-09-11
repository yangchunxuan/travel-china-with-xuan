import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./NotFoundPage.module.css";

const languagePaths = { en: "/", zh: "/zh/", ko: "/ko/" } as const;

/**
 * Global 404. The static export ships one 404.html for every unmatched path
 * (GitHub Pages serves it for all three locales), so the page keeps the
 * English site chrome and offers a way back in each language.
 */
export function NotFoundPage() {
  return (
    <div className={styles.root} lang="en">
      <a className={styles.skipLink} href="#not-found-content">
        Skip to main content
      </a>

      <HomegroundHeader
        languagePaths={languagePaths}
        locale="en"
        pageContext="content"
      />

      <main className={styles.main} id="not-found-content">
        <p className={styles.eyebrow}>Page not found · 404</p>
        <h1 className={styles.title}>This page has moved or never existed.</h1>
        <p className={styles.lead}>
          The address may be out of date, or a guide was renamed. Everything on
          Homeground China is still one step away: compare the private tours,
          browse the travel guides, or start from the homepage.
        </p>

        <div className={styles.actions}>
          <a className={styles.primary} href="/tours/">
            Compare private China tours
          </a>
          <a className={styles.secondary} href="/guides/">
            Browse travel guides
          </a>
          <a className={styles.secondary} href="/">
            Go to the homepage
          </a>
        </div>

        <div className={styles.otherLanguages}>
          <p lang="zh-Hans">
            这个页面不存在或已迁移。您可以回到
            <a className={styles.langLink} href="/zh/">
              中文首页
            </a>
            、查看
            <a className={styles.langLink} href="/zh/tours/">
              私家团路线
            </a>
            或
            <a className={styles.langLink} href="/zh/guides/">
              旅行攻略
            </a>
            。
          </p>
          <p lang="ko">
            이 페이지는 존재하지 않거나 이동되었습니다.{" "}
            <a className={styles.langLink} href="/ko/">
              한국어 홈
            </a>
            ,{" "}
            <a className={styles.langLink} href="/ko/tours/">
              프라이빗 투어
            </a>{" "}
            또는{" "}
            <a className={styles.langLink} href="/ko/guides/">
              여행 가이드
            </a>
            로 이동하세요.
          </p>
        </div>
      </main>

      <HomegroundFooter locale="en" pageContext="content" />
    </div>
  );
}
