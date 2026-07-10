"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./MotionLab.module.css";

type Seed = readonly [x: number, y: number, delay: number];

type PieceConfig = {
  id: string;
  src: string;
  left: string;
  top: string;
  width: string;
  aspect: number;
  depth: number;
  yaw: number;
  order: number;
  revealStart: number;
  revealEnd: number;
  liftStart: number;
  liftEnd: number;
  startAngle: number;
  overshoot: number;
  blur: number;
  mode: "fade" | "grow";
  shadow: boolean;
  verticalBias: number;
  seeds: readonly Seed[];
  fallback: string;
};

type PieceRuntime = {
  update: (masterProgress: number) => void;
};

type Metrics = {
  fps: number;
  longFrames: number;
  worstFrameMs: number;
};

const DURATION_MS = 5200;

const PIECES: readonly PieceConfig[] = [
  {
    id: "mist",
    src: "/motion-lab/pieces/mist.svg",
    left: "15%",
    top: "54%",
    width: "72%",
    aspect: 650 / 160,
    depth: -135,
    yaw: 0,
    order: 0,
    revealStart: 0.03,
    revealEnd: 0.17,
    liftStart: 0,
    liftEnd: 0,
    startAngle: 0,
    overshoot: 0,
    blur: 7,
    mode: "fade",
    shadow: false,
    verticalBias: 0,
    seeds: [],
    fallback: "#e7e6dc",
  },
  {
    id: "ground",
    src: "/motion-lab/pieces/ground.svg",
    left: "7%",
    top: "64%",
    width: "86%",
    aspect: 900 / 190,
    depth: -115,
    yaw: 0,
    order: 1,
    revealStart: 0.07,
    revealEnd: 0.22,
    liftStart: 0,
    liftEnd: 0,
    startAngle: 0,
    overshoot: 0,
    blur: 5,
    mode: "fade",
    shadow: false,
    verticalBias: 0,
    seeds: [],
    fallback: "#dcd6c6",
  },
  {
    id: "ridge",
    src: "/motion-lab/pieces/ridge.svg",
    left: "17%",
    top: "51%",
    width: "67%",
    aspect: 760 / 250,
    depth: -42,
    yaw: -3,
    order: 2,
    revealStart: 0.37,
    revealEnd: 0.6,
    liftStart: 0.26,
    liftEnd: 0.46,
    startAngle: 86,
    overshoot: 0.012,
    blur: 0,
    mode: "grow",
    shadow: true,
    verticalBias: 0.18,
    seeds: [
      [0.13, 0.87, 0],
      [0.34, 0.72, 0.09],
      [0.55, 0.82, 0.16],
      [0.77, 0.67, 0.24],
    ],
    fallback: "#aeb9b6",
  },
  {
    id: "tower",
    src: "/motion-lab/pieces/tower.svg",
    left: "22%",
    top: "30%",
    width: "20%",
    aspect: 240 / 360,
    depth: 24,
    yaw: -5,
    order: 3,
    revealStart: 0.66,
    revealEnd: 0.87,
    liftStart: 0.56,
    liftEnd: 0.76,
    startAngle: 88,
    overshoot: 0.008,
    blur: 0,
    mode: "grow",
    shadow: true,
    verticalBias: 0.4,
    seeds: [
      [0.38, 0.9, 0],
      [0.62, 0.88, 0.08],
      [0.48, 0.58, 0.2],
      [0.5, 0.23, 0.43],
    ],
    fallback: "#7d7568",
  },
  {
    id: "pine",
    src: "/motion-lab/pieces/pine.svg",
    left: "64%",
    top: "24%",
    width: "27%",
    aspect: 300 / 400,
    depth: 86,
    yaw: 7,
    order: 4,
    revealStart: 0.845,
    revealEnd: 0.965,
    liftStart: 0.78,
    liftEnd: 0.9,
    startAngle: 89,
    overshoot: 0.03,
    blur: 0,
    mode: "grow",
    shadow: true,
    verticalBias: 0.38,
    seeds: [
      [0.5, 0.92, 0],
      [0.32, 0.7, 0.08],
      [0.67, 0.62, 0.14],
      [0.45, 0.43, 0.24],
      [0.66, 0.22, 0.38],
      [0.28, 0.28, 0.44],
    ],
    fallback: "#6d8465",
  },
  {
    id: "stone",
    src: "/motion-lab/pieces/stone.svg",
    left: "76%",
    top: "68%",
    width: "17%",
    aspect: 220 / 160,
    depth: 148,
    yaw: -9,
    order: 5,
    revealStart: 0.93,
    revealEnd: 0.995,
    liftStart: 0.905,
    liftEnd: 0.965,
    startAngle: 84,
    overshoot: 0,
    blur: 0,
    mode: "grow",
    shadow: true,
    verticalBias: 0.2,
    seeds: [
      [0.22, 0.82, 0],
      [0.52, 0.68, 0.12],
      [0.78, 0.78, 0.2],
    ],
    fallback: "#4a534c",
  },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function range(progress: number, start: number, end: number) {
  if (end <= start) return progress >= start ? 1 : 0;
  return clamp((progress - start) / (end - start));
}

function smoothstep(progress: number) {
  const value = clamp(progress);
  return value * value * (3 - 2 * value);
}

function easePaperLift(progress: number, overshoot: number) {
  const value = clamp(progress);
  const settled = smoothstep(value);
  if (overshoot <= 0 || value < 0.72) return settled;
  const finish = (value - 0.72) / 0.28;
  return settled + Math.sin(finish * Math.PI) * overshoot;
}

function buildThresholdMap(
  width: number,
  height: number,
  seeds: readonly Seed[],
  verticalBias: number,
) {
  const map = new Float32Array(width * height);
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const nx = x / Math.max(1, width - 1);
      const ny = y / Math.max(1, height - 1);
      let nearest = 1;

      for (const [seedX, seedY, delay] of seeds) {
        const dx = (nx - seedX) / 0.42;
        const dy = (ny - seedY) / 0.46;
        nearest = Math.min(nearest, Math.sqrt(dx * dx + dy * dy) * 0.62 + delay);
      }

      const raw = Math.sin((x + 19) * 12.9898 + (y + 37) * 78.233) * 43758.5453;
      const noise = raw - Math.floor(raw) - 0.5;
      const fibre = Math.sin(x * 0.063 + y * 0.021) * 0.025;
      const threshold = nearest + (1 - ny) * verticalBias + noise * 0.14 + fibre;
      const index = y * width + x;
      map[index] = threshold;
      minimum = Math.min(minimum, threshold);
      maximum = Math.max(maximum, threshold);
    }
  }

  const distance = Math.max(0.0001, maximum - minimum);
  for (let index = 0; index < map.length; index += 1) {
    map[index] = (map[index] - minimum) / distance;
  }

  return map;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = new URLSearchParams(window.location.search).get("reduce") === "1";
    const update = () => setReduced(forced || query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function PaperPiece({
  config,
  forceFailure,
  register,
}: {
  config: PieceConfig;
  forceFailure: boolean;
  register: (id: string, runtime: PieceRuntime | null) => void;
}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const source = forceFailure ? `/motion-lab/pieces/missing-${config.id}.svg` : config.src;
  const slotStyle = {
    left: config.left,
    top: config.top,
    width: config.width,
    aspectRatio: String(config.aspect),
    zIndex: config.order,
  } as CSSProperties;

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let lastMasterProgress = 0;
    let lastReveal = -1;
    let renderReveal: (progress: number) => void = () => undefined;
    const image = new Image();

    const createRuntime = (loadedImage: HTMLImageElement | null) => {
      const slot = slotRef.current;
      const plane = planeRef.current;
      const paper = paperRef.current;
      const shadow = shadowRef.current;
      const canvas = canvasRef.current;
      const fallback = fallbackRef.current;
      if (!slot || !plane || !canvas) return;
      if (config.blur > 0) canvas.style.filter = `blur(${config.blur}px)`;

      const runtime: PieceRuntime = {
        update(masterProgress: number) {
          lastMasterProgress = masterProgress;
          const revealRaw = range(masterProgress, config.revealStart, config.revealEnd);
          const reveal = smoothstep(revealRaw);
          const liftRaw = config.mode === "grow"
            ? range(masterProgress, config.liftStart, config.liftEnd)
            : 1;
          const lift = config.mode === "grow" ? easePaperLift(liftRaw, config.overshoot) : 1;
          const angle = config.mode === "grow"
            ? mix(config.startAngle, 0, lift)
            : 0;
          const flex = config.mode === "grow" ? Math.sin(liftRaw * Math.PI) : 0;

          plane.style.opacity = loadedImage
            ? config.mode === "fade"
              ? String(reveal)
              : revealRaw > 0 || liftRaw > 0
                ? "1"
                : "0"
            : String(reveal);
          plane.style.transform = [
            `translate3d(0, 0, ${config.depth}px)`,
            `rotateY(${config.yaw}deg)`,
            `rotateX(${angle.toFixed(3)}deg)`,
            `scaleY(${(1 + flex * 0.022).toFixed(4)})`,
          ].join(" ");

          if (fallback) fallback.style.opacity = String(reveal);
          if (loadedImage) renderReveal(reveal);
          if (paper) {
            const paperIn = smoothstep(
              range(masterProgress, Math.max(0, config.liftStart - 0.015), config.liftStart + 0.075),
            );
            paper.style.opacity = String(paperIn * (0.92 - reveal * 0.92));
          }

          if (shadow && config.shadow) {
            // Contact shadow: anticipation dot -> soft bloom while the paper
            // is mid-lift -> settles into a thin resting shadow.
            const anticipation = range(
              masterProgress,
              Math.max(0, config.liftStart - 0.035),
              config.liftStart,
            );
            const bloom = Math.sin(clamp(liftRaw) * Math.PI);
            const rest = smoothstep(liftRaw);
            const strength =
              0.2 * anticipation * (1 - rest * 0.6) + 0.15 * bloom + 0.06 * rest;
            shadow.style.opacity = strength.toFixed(3);
            shadow.style.transform = [
              `translate3d(0, 0, ${config.depth - 1}px)`,
              `scaleX(${(0.34 + 0.66 * clamp(lift)).toFixed(3)})`,
              `scaleY(${(0.55 + 0.45 * clamp(lift)).toFixed(3)})`,
            ].join(" ");
          }
        },
      };

      if (loadedImage) {
        const rebuildCanvas = () => {
          const cssWidth = Math.max(64, slot.getBoundingClientRect().width);
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = Math.min(1100, Math.max(160, Math.round(cssWidth * dpr)));
          const height = Math.max(64, Math.round(width / config.aspect));
          canvas.width = width;
          canvas.height = height;

          const output = canvas.getContext("2d");
          if (!output) return;
          const sourceCanvas = document.createElement("canvas");
          sourceCanvas.width = width;
          sourceCanvas.height = height;
          const sourceContext = sourceCanvas.getContext("2d");
          if (!sourceContext) return;
          sourceContext.drawImage(loadedImage, 0, 0, width, height);

          if (config.mode === "fade") {
            renderReveal = () => {
              output.clearRect(0, 0, width, height);
              output.drawImage(sourceCanvas, 0, 0);
            };
            renderReveal(1);
            return;
          }

          const maskCanvas = document.createElement("canvas");
          maskCanvas.width = width;
          maskCanvas.height = height;
          const maskContext = maskCanvas.getContext("2d");
          if (!maskContext) return;
          const maskPixels = maskContext.createImageData(width, height);
          const thresholds = buildThresholdMap(width, height, config.seeds, config.verticalBias);

          renderReveal = (progress: number) => {
            if (Math.abs(progress - lastReveal) < 0.012 && progress < 0.999) return;
            lastReveal = progress;
            output.clearRect(0, 0, width, height);
            if (progress <= 0.001) return;
            if (progress >= 0.999) {
              output.drawImage(sourceCanvas, 0, 0);
              return;
            }

            const pixels = maskPixels.data;
            const threshold = progress * 1.08;
            for (let index = 0; index < thresholds.length; index += 1) {
              const alpha = clamp((threshold - thresholds[index]) / 0.075 + 0.5);
              const offset = index * 4;
              pixels[offset] = 255;
              pixels[offset + 1] = 255;
              pixels[offset + 2] = 255;
              pixels[offset + 3] = Math.round(alpha * 255);
            }
            maskContext.putImageData(maskPixels, 0, 0);
            output.drawImage(sourceCanvas, 0, 0);
            output.globalCompositeOperation = "destination-in";
            output.drawImage(maskCanvas, 0, 0);
            output.globalCompositeOperation = "source-over";
          };

          lastReveal = -1;
          runtime.update(lastMasterProgress);
        };

        resizeObserver = new ResizeObserver(rebuildCanvas);
        resizeObserver.observe(slot);
        rebuildCanvas();
      }

      register(config.id, runtime);
      runtime.update(0);
    };

    image.onload = () => {
      if (cancelled) return;
      setFailed(false);
      createRuntime(image);
    };
    image.onerror = () => {
      if (cancelled) return;
      setFailed(true);
      createRuntime(null);
    };
    image.src = source;

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      register(config.id, null);
    };
  }, [config, register, source]);

  return (
    <div ref={slotRef} className={styles.pieceSlot} style={slotStyle} data-piece={config.id}>
      {config.shadow && !failed && (
        <div ref={shadowRef} className={styles.pieceShadow} aria-hidden="true" />
      )}
      <div ref={planeRef} className={styles.piecePlane}>
        {!failed && config.mode === "grow" && (
          <img ref={paperRef} className={styles.piecePaper} src={source} alt="" draggable={false} />
        )}
        <canvas ref={canvasRef} className={styles.pieceCanvas} />
        {failed && (
          <div
            ref={fallbackRef}
            className={styles.pieceFallback}
            style={{ background: config.fallback }}
          />
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function MotionLab() {
  const runtimesRef = useRef(new Map<string, PieceRuntime>());
  const stageRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef(0);
  const playingRef = useRef(false);
  const progressRef = useRef(0);
  const autoplayedRef = useRef(false);
  const [readyCount, setReadyCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [forceFailure, setForceFailure] = useState(false);
  const reducedMotion = useReducedMotion();

  const register = useCallback((id: string, runtime: PieceRuntime | null) => {
    if (runtime) runtimesRef.current.set(id, runtime);
    else runtimesRef.current.delete(id);
    setReadyCount(runtimesRef.current.size);
  }, []);

  const applyProgress = useCallback((nextProgress: number) => {
    const progress = clamp(nextProgress);
    progressRef.current = progress;
    runtimesRef.current.forEach((runtime) => runtime.update(progress));

    // Camera holds still while the city is being built, then a single slow
    // dolly-in once the anchor (tower) has settled. Monotonic: no direction
    // reversals, never sweeps through the flat 0deg dead point.
    const cameraProgress = smoothstep(range(progress, 0.74, 0.97));
    if (cameraRef.current) {
      cameraRef.current.style.transform = [
        `translate3d(0, ${mix(0.6, -1.6, cameraProgress).toFixed(3)}%, 0)`,
        `scale(${mix(1, 1.045, cameraProgress).toFixed(4)})`,
        `rotateX(${mix(-2.4, -1.5, cameraProgress).toFixed(3)}deg)`,
        `rotateY(${mix(-4.5, -2.8, cameraProgress).toFixed(3)}deg)`,
      ].join(" ");
    }
    if (timelineRef.current) timelineRef.current.value = String(Math.round(progress * 1000));
    if (timeRef.current) timeRef.current.textContent = `${(progress * DURATION_MS / 1000).toFixed(1)} / ${(DURATION_MS / 1000).toFixed(1)}s`;
  }, []);

  const pause = useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);
    playingRef.current = false;
    setPlaying(false);
  }, []);

  const playFrom = useCallback((fromProgress: number) => {
    cancelAnimationFrame(animationFrameRef.current);
    if (reducedMotion) {
      applyProgress(1);
      setPlaying(false);
      return;
    }

    const from = clamp(fromProgress);
    const startedAt = performance.now();
    let previous = startedAt;
    let frames = 0;
    let longFrames = 0;
    let worstFrameMs = 0;
    playingRef.current = true;
    setPlaying(true);
    setMetrics(null);

    const tick = (now: number) => {
      if (!playingRef.current) return;
      const delta = now - previous;
      if (frames > 0) {
        worstFrameMs = Math.max(worstFrameMs, delta);
        if (delta > 24) longFrames += 1;
      }
      previous = now;
      frames += 1;

      const progress = clamp(from + (now - startedAt) / DURATION_MS);
      applyProgress(progress);
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      playingRef.current = false;
      setPlaying(false);
      const elapsed = Math.max(1, now - startedAt);
      setMetrics({
        fps: frames * 1000 / elapsed,
        longFrames,
        worstFrameMs,
      });
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [applyProgress, reducedMotion]);

  const replay = useCallback(() => {
    autoplayedRef.current = true;
    applyProgress(0);
    playFrom(0);
  }, [applyProgress, playFrom]);

  useEffect(() => {
    setForceFailure(new URLSearchParams(window.location.search).get("fail") === "1");
  }, []);

  useEffect(() => {
    const tawkWindow = window as Window & {
      Tawk_API?: { hideWidget?: () => void; showWidget?: () => void };
    };
    const hiddenFrames = new Set<HTMLIFrameElement>();
    const hideChat = () => {
      tawkWindow.Tawk_API?.hideWidget?.();
      document.querySelectorAll<HTMLIFrameElement>("body iframe").forEach((frame) => {
        frame.style.setProperty("visibility", "hidden", "important");
        frame.style.setProperty("pointer-events", "none", "important");
        hiddenFrames.add(frame);
      });
    };

    hideChat();
    const timer = window.setInterval(hideChat, 300);
    return () => {
      window.clearInterval(timer);
      hiddenFrames.forEach((frame) => {
        frame.style.removeProperty("visibility");
        frame.style.removeProperty("pointer-events");
      });
      tawkWindow.Tawk_API?.showWidget?.();
    };
  }, []);

  useEffect(() => {
    if (readyCount !== PIECES.length) return;
    applyProgress(reducedMotion ? 1 : 0);
    if (reducedMotion) return;

    const stage = stageRef.current;
    if (!stage) return;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.38 || autoplayedRef.current) return;
        autoplayedRef.current = true;
        timer = window.setTimeout(() => playFrom(0), 550);
      },
      { threshold: [0.38, 0.55] },
    );
    observer.observe(stage);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [applyProgress, playFrom, readyCount, reducedMotion]);

  useEffect(() => () => cancelAnimationFrame(animationFrameRef.current), []);

  const handleTimeline = (value: string) => {
    autoplayedRef.current = true;
    pause();
    applyProgress(Number(value) / 1000);
  };

  const handlePlayButton = () => {
    if (playing) {
      pause();
      return;
    }
    playFrom(progressRef.current >= 0.999 ? 0 : progressRef.current);
  };

  return (
    <main className={styles.page} data-motion-lab>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>Private motion lab · V5.1</span>
          <h1>Beijing, built from separate paper objects</h1>
          <p>Beats, weight, contact shadows, and a held camera — art &amp; timing pass.</p>
        </div>

        <div className={styles.transport}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={handlePlayButton}
            title={playing ? "Pause" : progressRef.current >= 0.999 ? "Replay" : "Play"}
          >
            {playing ? (
              <Pause size={18} />
            ) : progressRef.current >= 0.999 ? (
              <RotateCcw size={18} />
            ) : (
              <Play size={18} />
            )}
            <span className={styles.srOnly}>{playing ? "Pause" : "Play"}</span>
          </button>
          <button type="button" className={styles.replayButton} onClick={replay}>
            <RotateCcw size={16} />
            Replay
          </button>
        </div>
      </header>

      <section className={styles.timelineBar} aria-label="Motion timeline">
        <input
          ref={timelineRef}
          type="range"
          min="0"
          max="1000"
          defaultValue="0"
          aria-label="Scrub motion timeline"
          onPointerDown={pause}
          onInput={(event) => handleTimeline(event.currentTarget.value)}
        />
        <span ref={timeRef}>0.0 / 5.2s</span>
        <div className={styles.metrics} aria-live="polite">
          <Metric label="Objects" value={`${readyCount}/${PIECES.length}`} />
          <Metric label="FPS" value={metrics ? metrics.fps.toFixed(1) : playing ? "Running" : reducedMotion ? "Static" : "Ready"} />
          <Metric label="Long frames" value={metrics ? String(metrics.longFrames) : "—"} />
          <Metric label="Worst" value={metrics ? `${metrics.worstFrameMs.toFixed(1)}ms` : "—"} />
        </div>
      </section>

      <section className={styles.sceneBand}>
        <div className={styles.copy}>
          <span>Beijing · Chapter study</span>
          <h2>The wall does not fade in. It gathers, finds the ground, and stands.</h2>
          <p>Every visible form owns its hinge, depth, and projected silhouette. The camera moves only after the city has weight.</p>
        </div>

        <figure ref={stageRef} className={styles.stage} aria-label="Beijing watercolor paper-stage motion study">
          <div className={styles.paperTexture} />
          <div className={styles.floorPlane} />
          <div ref={cameraRef} className={styles.sceneCamera}>
            {PIECES.map((piece) => (
              <PaperPiece
                key={`${piece.id}-${forceFailure}`}
                config={piece}
                forceFailure={forceFailure}
                register={register}
              />
            ))}
          </div>
        </figure>
      </section>

      <footer className={styles.footer}>
        <span>Tight object bounds</span>
        <span>Silhouette shadows</span>
        <span>Same scene on mobile</span>
      </footer>
    </main>
  );
}
