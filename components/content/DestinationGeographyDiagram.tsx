import type {
  DestinationGeographyCopy,
  DestinationGeographyNode,
} from "../../lib/destinationHubs";
import styles from "./DestinationGeographyDiagram.module.css";

const VIEWBOX_WIDTH = 640;
const VIEWBOX_HEIGHT = 460;
const PADDING = 46;

const compassLabels = {
  en: { n: "N", s: "S", w: "W", e: "E" },
  zh: { n: "北", s: "南", w: "西", e: "东" },
  ko: { n: "북", s: "남", w: "서", e: "동" },
} as const;

const legendOrder = ["core", "cluster", "outside", "gateway"] as const;

/**
 * A hand-authored orientation diagram. It is drawn from reviewed registry
 * coordinates rather than a commercial map tile, and it deliberately carries
 * no scale: its only claim is which tasks share a direction from the centre.
 *
 * Numbers stay inside the SVG so no localized string has to be laid out by
 * hand; every label is ordinary HTML in the key below, which wraps correctly
 * in English, Chinese and Korean at any viewport width.
 */
export function DestinationGeographyDiagram({
  copy,
  locale,
  nodes,
}: {
  copy: DestinationGeographyCopy;
  locale: keyof typeof compassLabels;
  nodes: readonly DestinationGeographyNode[];
}) {
  const compass = compassLabels[locale];
  const plotWidth = VIEWBOX_WIDTH - PADDING * 2;
  const plotHeight = VIEWBOX_HEIGHT - PADDING * 2;
  const positioned = nodes.map((node, index) => ({
    ...node,
    index: index + 1,
    cx: PADDING + node.x * plotWidth,
    cy: PADDING + node.y * plotHeight,
  }));
  const core = positioned.find((node) => node.kind === "core") ?? positioned[0];

  return (
    <section className={styles.geography} aria-labelledby="destination-geography">
      <h2 id="destination-geography">{copy.title}</h2>

      <svg
        aria-label={copy.caption}
        className={styles.plot}
        role="img"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width={VIEWBOX_WIDTH - 2}
          height={VIEWBOX_HEIGHT - 2}
          rx="10"
          fill="#fdfcfa"
          stroke="rgba(23,23,22,0.10)"
        />
        <text className={styles.compass} x={VIEWBOX_WIDTH / 2} y="26">
          {compass.n}
        </text>
        <text className={styles.compass} x={VIEWBOX_WIDTH / 2} y={VIEWBOX_HEIGHT - 12}>
          {compass.s}
        </text>
        <text className={styles.compass} x="20" y={VIEWBOX_HEIGHT / 2}>
          {compass.w}
        </text>
        <text className={styles.compass} x={VIEWBOX_WIDTH - 20} y={VIEWBOX_HEIGHT / 2}>
          {compass.e}
        </text>

        {core
          ? positioned
              .filter((node) => node.id !== core.id)
              .map((node) => (
                <line
                  key={`line-${node.id}`}
                  x1={core.cx}
                  y1={core.cy}
                  x2={node.cx}
                  y2={node.cy}
                  stroke="rgba(23,23,22,0.18)"
                  strokeWidth="2"
                  strokeDasharray={node.kind === "outside" ? "7 6" : undefined}
                />
              ))
          : null}

        {positioned.map((node) => (
          <g key={node.id}>
            <circle
              className={styles.marker}
              cx={node.cx}
              cy={node.cy}
              data-kind={node.kind}
              r="20"
            />
            <text
              className={styles.markerIndex}
              data-kind={node.kind}
              x={node.cx}
              y={node.cy}
            >
              {node.index}
            </text>
          </g>
        ))}
      </svg>

      <ol className={styles.key}>
        {positioned.map((node) => {
          const label = copy.nodes[node.id];
          if (!label) return null;
          return (
            <li key={node.id}>
              <span aria-hidden="true" className={styles.keyIndex} data-kind={node.kind}>
                {node.index}
              </span>
              <span>
                <span className={styles.keyLabel}>{label.label}</span>
                <span className={styles.keyNote}>{label.note}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <ul className={styles.legend}>
        {legendOrder.map((kind) => (
          <li key={kind}>
            <span aria-hidden="true" className={styles.swatch} data-kind={kind} />
            {copy.legend[kind]}
          </li>
        ))}
      </ul>

      <p className={styles.caption}>{copy.caption}</p>
    </section>
  );
}
