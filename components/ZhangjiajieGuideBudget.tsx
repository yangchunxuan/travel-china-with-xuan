import { getZhangjiajieGuideBudget } from "../lib/zhangjiajieGuideBudget";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { GuideCtaLink } from "./GuideCtaLink";
import styles from "./ZhangjiajieGuideBudget.module.css";

export function ZhangjiajieGuideBudget({ locale }: { locale: HomegroundLocale }) {
  const copy = getZhangjiajieGuideBudget(locale);
  return (
    <section className={styles.section} id="budget-and-service" aria-labelledby="budget-and-service-title">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 id="budget-and-service-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>
      <div className={styles.services}>
        {copy.services.map((service) => (
          <div className={styles.service} key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.body}</p>
            {service.id === "guide" && (
              <div className={styles.guideRate}>
                <span>{copy.standardRate}</span>
                <strong>{copy.guidePrice}</strong>
                <span>{copy.guideUnit}</span>
                <small>{copy.peak}: {copy.guidePeakPrice}. {copy.guideConfirmation}</small>
              </div>
            )}
            <GuideCtaLink href={service.href} locale={locale} guideId="zhangjiajie-itinerary" position="inline">{service.action}</GuideCtaLink>
          </div>
        ))}
      </div>
      <div className={styles.priceHeading}>
        <h3>{copy.pricesTitle}</h3>
        <p>{copy.priceBasis}</p>
        <p className={styles.currencyNote}>{copy.currencyNote}</p>
      </div>
      <div className={styles.routes}>
        {copy.routes.map((route) => (
          <article className={styles.route} key={route.slug} aria-labelledby={`budget-${route.slug}`}>
            <h4 id={`budget-${route.slug}`}>{route.title}</h4>
            <dl className={styles.prices}>
              <div><dt>{copy.two}</dt><dd>{route.twoPrice}</dd></div>
              <div><dt>{copy.four}</dt><dd>{route.fourPrice}</dd></div>
            </dl>
            {route.validity && (
              <p className={styles.validity}>
                {route.validity.label}<br />
                <time dateTime={`${route.validity.from}T00:00:00+08:00`}>{route.validity.fromLabel}</time>
                {" – "}<time dateTime={route.validity.until}>{route.validity.untilLabel}</time>
              </p>
            )}
            <dl className={styles.scope}>
              <div><dt>{copy.stay}</dt><dd>{route.stay}</dd></div>
              <div><dt>{copy.guide}</dt><dd>{route.guide}</dd></div>
              <div><dt>{copy.tickets}</dt><dd>{route.tickets}</dd></div>
              <div><dt>{copy.extra}</dt><dd>{route.extra}</dd></div>
            </dl>
            <GuideCtaLink href={route.href} locale={locale} guideId="zhangjiajie-itinerary" position="inline">{copy.routeAction}</GuideCtaLink>
          </article>
        ))}
      </div>
      <p className={styles.finalNote}>{copy.finalNote}</p>
    </section>
  );
}
