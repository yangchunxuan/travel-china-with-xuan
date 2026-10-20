import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import {
  spanishSalesFacts, spanishSalesLabels, spanishSalesMessage,
  type SpanishAnswerCopy, type SpanishLinkedText, type SpanishSalesCopy,
} from "../lib/spanishSales";
import { spanishEmailHref, spanishWhatsAppHref } from "../lib/spanishSite";
import styles from "./SpanishSalesBlock.module.css";

/** Renders a paragraph, turning each link label (a span of the text itself) into a link. */
function LinkedText({ item }: { item: SpanishLinkedText }) {
  const links = item.links ?? [];
  if (!links.length) return <>{item.text}</>;
  const parts: ReactNode[] = [];
  let rest = item.text;
  for (const link of links) {
    const at = rest.indexOf(link.label);
    if (at < 0) throw new Error(`Link label is not part of its paragraph: ${link.label}`);
    parts.push(rest.slice(0, at));
    const external = /^https?:/.test(link.href);
    parts.push(external
      ? <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label}</a>
      : <Link href={link.href} key={link.href}>{link.label}</Link>);
    rest = rest.slice(at + link.label.length);
  }
  parts.push(rest);
  return <>{parts}</>;
}

export function SpanishTourAnswer({ answer }: { answer: SpanishAnswerCopy }) {
  return (
    <section aria-labelledby="es-answer-title" className={styles.answer}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{answer.eyebrow}</p>
        <h2 id="es-answer-title">{answer.title}</h2>
        <dl className={styles.answerList}>
          {answer.items.map(item => (
            <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function SpanishSalesBlock({ copy, path }: { copy: SpanishSalesCopy; path: string }) {
  const message = spanishSalesMessage(copy.cta, path);
  const hrefs = { whatsapp: spanishWhatsAppHref(message), email: spanishEmailHref(copy.cta.subject, message) };
  const titleId = `${copy.id}-title`;
  return (
    <section aria-labelledby={titleId} className={styles.sales} data-es-sales={copy.id} id={copy.id}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id={titleId}>{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>

        <div className={styles.columns}>
          <div className={styles.risks}>
            {copy.diy?.length ? <section>
              <h3>{copy.diyTitle ?? spanishSalesLabels.diy}</h3>
              <ul>{copy.diy.map(item => <li key={item.text}><LinkedText item={item} /></li>)}</ul>
            </section> : null}
            {copy.late?.length ? <section>
              <h3>{copy.lateTitle ?? spanishSalesLabels.late}</h3>
              <ul className={styles.late}>{copy.late.map(item => <li key={item.text}><LinkedText item={item} /></li>)}</ul>
            </section> : null}
          </div>
          <section className={styles.solution}>
            <h3>{copy.solutionTitle}</h3>
            <ol>{copy.solution.map(item => <li key={item.text}><LinkedText item={item} /></li>)}</ol>
          </section>
        </div>

        <div className={styles.offer}>
          <div className={styles.offerHead}>
            <p className={styles.eyebrow}>{spanishSalesLabels.offer}</p>
            <h3>{copy.offer.name}</h3>
          </div>
          <dl className={styles.offerList}>
            <div><dt>{spanishSalesLabels.includes}</dt><dd>{copy.offer.includes}</dd></div>
            <div className={styles.price}><dt>{spanishSalesLabels.price}</dt><dd>{copy.offer.price}</dd></div>
            <div><dt>{copy.offer.guaranteeLabel ?? spanishSalesLabels.guarantee}</dt><dd>{copy.offer.guarantee}</dd></div>
            <div><dt>{spanishSalesLabels.book}</dt><dd>{copy.offer.book}</dd></div>
            <div><dt>{spanishSalesLabels.pay}</dt><dd>{copy.offer.pay}</dd></div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.primary} href={hrefs.whatsapp} rel="noreferrer" target="_blank">
              {copy.cta.label}<ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className={styles.secondary} href={hrefs.email}>
              <Mail aria-hidden="true" size={16} />{spanishSalesLabels.email}
            </a>
          </div>
        </div>

        <ul aria-label={spanishSalesLabels.trustTitle} className={styles.trust}>
          {(copy.trust ?? spanishSalesFacts.trust).map(item => <li key={item}>{item}</li>)}
        </ul>

        {copy.faq?.length ? <section className={styles.faq} aria-labelledby={`${copy.id}-faq-title`}>
          <h3 id={`${copy.id}-faq-title`}>{copy.faqTitle ?? spanishSalesLabels.faq}</h3>
          {copy.faq.map(item => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section> : null}
      </div>
    </section>
  );
}
