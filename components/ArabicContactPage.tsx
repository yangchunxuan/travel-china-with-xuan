import { ArabicSiteHeader, ArabicSiteFooter } from './ArabicChrome';
import { ArabicHomeContact } from './ArabicHomeContact';
import { arabicCoreCopy } from '../lib/arabicCoreCopy';
import { arabicLanguagePaths } from '../lib/arabicSite';
import styles from './HomegroundLegalPage.module.css';
import localeStyles from './LocaleRoot.module.css';

/** No standalone English contact page exists; use the site's hero and contact board. */
export function ArabicContactPage() {
  const copy = arabicCoreCopy.contact;
  const path = '/ar/contact/';
  return <div className={`${localeStyles.root} hg-locale-root ${styles.localeRoot}`} data-homeground-locale="ar" lang="ar">
    <a className={styles.skipLink} href="#main-content">انتقل إلى المحتوى</a>
    <ArabicSiteHeader currentPath={path} languagePaths={arabicLanguagePaths('/', path)} />
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="contact-page-title">
        <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h1 id="contact-page-title">لنتحدث عن رحلتك.</h1><p className={styles.heroIntro}>{copy.intro}</p></div>
        <aside className={styles.callout}><p className={styles.calloutLabel}>قبل الحجز</p><h2>خطتك أولاً، ثم عرض كتابي.</h2><p>أرسل المواعيد وعدد المسافرين والطلبات. نؤكد الخدمات والسعر النهائي قبل الدفع. الإرشاد بالعربية غير مشمول في السعر المنشور؛ يلزم التحقق من توفره وسعره بصورة منفصلة.</p></aside>
      </section>
      <div className={styles.article}><ArabicHomeContact /></div>
    </main>
    <ArabicSiteFooter currentPath={path} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'ContactPage','@id':`https://homegroundchina.com${path}#webpage`,url:`https://homegroundchina.com${path}`,name:copy.title,description:copy.description,inLanguage:'ar',isPartOf:{'@id':'https://homegroundchina.com/#website'}}).replace(/</g,'\\u003c')}}/>
  </div>;
}
