import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { destinationHubIds } from "../lib/destinationHubs";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getHomegroundSocialProfiles } from "../lib/homegroundSocial";
import { japaneseExploreCities } from "../lib/japaneseExploreCopy";
import { japaneseSite } from "../lib/japaneseSite";
import styles from "./HomepageFooter.module.css";
import homeStyles from "./JapaneseHome.module.css";

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") return <Instagram aria-hidden="true" size={22} strokeWidth={1.6} />;
  if (platform === "facebook") return <Facebook aria-hidden="true" size={22} strokeWidth={1.6} />;
  if (platform === "youtube") return <Youtube aria-hidden="true" size={23} strokeWidth={1.6} />;
  return <span aria-hidden="true">X</span>;
}

/** The Japanese homepage uses the same complete footer rhythm as the other homepages. */
export function JapaneseHomeFooter() {
  const socialProfiles = getHomegroundSocialProfiles().filter((profile) => Boolean(profile.url));

  return (
    <footer className={styles.footer} data-homeground-homepage-footer="structured-dark">
      <div className={styles.inner}>
        <Link className={`${styles.brand} ${homeStyles.footerBrand}`} href={japaneseSite.home}>
          <HomegroundBrandMark className={styles.brandMark} />
          <span>
            <strong lang="en">Homeground China</strong>
            <small>中国の旅行会社</small>
          </span>
        </Link>

        <div className={styles.navGrid}>
          <nav aria-label="旅を探す">
            <h2>旅を探す</h2>
            <ul>
              <li><Link href={japaneseSite.guides}>実用ガイド</Link></li>
              <li><Link href={japaneseSite.tours}>プライベートツアー</Link></li>
              <li><Link href={japaneseSite.services}>サービス</Link></li>
            </ul>
          </nav>

          <nav aria-label="目的地">
            <h2>目的地</h2>
            <ul>
              <li><Link href={japaneseSite.explore}>すべての目的地</Link></li>
              {destinationHubIds.map((id) => (
                <li key={id}>
                  <Link href={`${japaneseSite.explore}#city-${id}`}>
                    {japaneseExploreCities[id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Homeground">
            <h2>Homeground</h2>
            <ul>
              <li><Link href={japaneseSite.studio}>私たちについて</Link></li>
              <li><Link href={`${japaneseSite.home}#faq`}>よくあるご質問</Link></li>
              <li><Link href={`${japaneseSite.home}#contact`}>日本語で相談する</Link></li>
              <li><a href={`mailto:${homegroundBusiness.serviceEmail}`}>メールで連絡する</a></li>
            </ul>
          </nav>

          <nav aria-label="事業者情報・規約">
            <h2>事業者情報・規約</h2>
            <ul>
              <li><Link href={japaneseSite.businessInformation}>事業者情報</Link></li>
              <li><Link href={japaneseSite.terms}>利用規約</Link></li>
              <li><Link href={japaneseSite.privacy}>プライバシーポリシー</Link></li>
              <li><Link href={japaneseSite.refundDelivery}>返金・提供条件</Link></li>
            </ul>
          </nav>
        </div>

        <div className={styles.meta}>
          <div className={styles.copyrightSocial}>
            <p>© {new Date().getFullYear()} Homeground China. All rights reserved.</p>
            {socialProfiles.length > 0 ? (
              <nav aria-label="Homeground の公式アカウント">
                <ul>
                  {socialProfiles.map((profile) => (
                    <li key={profile.platform}>
                      <a
                        aria-label={profile.label}
                        href={profile.url}
                        rel="me noreferrer"
                        target="_blank"
                      >
                        <SocialIcon platform={profile.platform} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <p className={styles.operator}>
            Homeground China は{" "}
            <Link href={japaneseSite.businessInformation} lang="zh-Hans">
              {homegroundBusiness.publicName}
            </Link>{" "}
            が運営しています。
            <span>統一社会信用コード：{homegroundBusiness.unifiedSocialCreditCode}</span>
            <span>旅行業許可番号（中国）：{homegroundBusiness.travelAgencyLicenceNumber}</span>
          </p>
        </div>
      </div>

      <div aria-hidden="true" className={styles.wordmark}>
        <svg focusable="false" viewBox="0 0 1000 128">
          <text lengthAdjust="spacingAndGlyphs" textLength="1000" x="0" y="138">
            Homeground
          </text>
        </svg>
      </div>
    </footer>
  );
}
