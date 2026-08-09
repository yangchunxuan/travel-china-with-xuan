import type {
  PageBodyBlock,
  StructuredPageBody,
} from "../../lib/content-system/page-body";
import styles from "./PageFamilyRenderer.module.css";

function BodyBlock({ block }: { block: PageBodyBlock }) {
  switch (block.type) {
    case "lead":
      return <p className={styles.lead}>{block.text}</p>;
    case "heading":
      return block.level === 2 ? (
        <h2 id={block.id}>{block.text}</h2>
      ) : (
        <h3 id={block.id}>{block.text}</h3>
      );
    case "paragraph":
      return <p>{block.text}</p>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={styles.list}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }
    case "callout":
      return (
        <aside className={styles.callout} data-tone={block.tone ?? "neutral"}>
          {block.title ? <strong>{block.title}</strong> : null}
          <p>{block.body}</p>
        </aside>
      );
    case "comparison":
      return (
        <section className={styles.comparison} aria-labelledby={block.title ? block.id : undefined}>
          {block.title ? <h2 id={block.id}>{block.title}</h2> : null}
          <div>
            {block.columns.map((column) => (
              <article key={column.heading}>
                <h3>{column.heading}</h3>
                {column.body ? <p>{column.body}</p> : null}
                {column.items ? (
                  <ul>
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      );
    case "table":
      return (
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={block.caption}>
          <table>
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={`${block.id}-${rowIndex}`}>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={`${block.id}-${rowIndex}-${cellIndex}`} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${block.id}-${rowIndex}-${cellIndex}`}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "sources":
      return (
        <section className={styles.sources} aria-labelledby={block.id}>
          <h2 id={block.id}>{block.title}</h2>
          <ol>
            {block.items.map((source) => (
              <li key={source.url}>
                <a href={source.url}>{source.label}</a>
                {source.publisher ? <span>{source.publisher}</span> : null}
                {source.reviewedAt ? (
                  <time dateTime={source.reviewedAt}>{source.reviewedAt}</time>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      );
  }
}

/**
 * Shared semantic renderer for new structured leaf-page families.
 * Existing bespoke guides intentionally remain on their current components
 * during Phase 0; new families can adopt this renderer without widening the
 * legacy GuideId union.
 */
export function PageFamilyRenderer({ body }: { body: StructuredPageBody }) {
  return (
    <div className={styles.body}>
      {body.blocks.map((block) => (
        <BodyBlock block={block} key={block.id} />
      ))}
    </div>
  );
}
