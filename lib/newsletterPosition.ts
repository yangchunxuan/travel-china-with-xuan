export type NewsletterSide = "left" | "right";
export type NewsletterMove = NewsletterSide | "up" | "down" | "reset";
export type NewsletterPosition = { x: number; y: number };
export type NewsletterPoint = { x: number; y: number };
export type NewsletterSize = { width: number; height: number };
export type NewsletterArea = { left: number; top: number; right: number; bottom: number };
export type NewsletterBounds = { minX: number; maxX: number; minY: number; maxY: number };
export type NewsletterViewport = NewsletterSize & { left: number; top: number };
export type NewsletterPadding = { left: number; right: number; top: number; bottom: number };

export const newsletterPositionStorageKey = "homeground.newsletter.position.v2";
export const newsletterLegacyPositionStorageKey = "homeground.newsletter.position.v1";
export const newsletterDefaultPosition: NewsletterPosition = { x: 1, y: 1 };
export const newsletterDragThreshold = 8;
export const newsletterDockDuration = 240;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);
const nonnegative = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;

export function parseNewsletterPosition(raw: string | null): NewsletterPosition | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const position = value as Record<string, unknown>;
    if (Object.keys(position).length !== 2) return null;
    const fraction = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
    if (fraction(position.x) && fraction(position.y)) return { x: position.x, y: position.y };
    if ((position.side === "left" || position.side === "right") && fraction(position.fraction)) {
      return { x: position.side === "left" ? 0 : 1, y: position.fraction };
    }
    return null;
  } catch {
    return null;
  }
}

export function readNewsletterPosition(storage?: (Pick<Storage, "getItem"> & Partial<Pick<Storage, "setItem">>) | null): NewsletterPosition {
  try {
    const current = parseNewsletterPosition(storage?.getItem(newsletterPositionStorageKey) ?? null);
    if (current) return current;
    const legacy = parseNewsletterPosition(storage?.getItem(newsletterLegacyPositionStorageKey) ?? null);
    if (legacy) {
      try { storage?.setItem?.(newsletterPositionStorageKey, JSON.stringify(legacy)); } catch { /* Use the migrated position even when storage is read-only. */ }
      return legacy;
    }
    return { ...newsletterDefaultPosition };
  } catch {
    return { ...newsletterDefaultPosition };
  }
}

export function writeNewsletterPosition(position: NewsletterPosition, storage?: Pick<Storage, "setItem"> | null): boolean {
  try {
    // Persist only layout preferences, never page, form, or pointer information.
    const raw = JSON.stringify({ x: position.x, y: position.y });
    if (!storage || !parseNewsletterPosition(raw)) return false;
    storage.setItem(newsletterPositionStorageKey, raw);
    return true;
  } catch {
    return false;
  }
}

export function newsletterSafeArea(
  viewport: NewsletterViewport,
  padding: NewsletterPadding,
  launcher: NewsletterSize,
  obstructionBottom = viewport.top,
): NewsletterArea {
  const width = nonnegative(viewport.width);
  const height = nonnegative(viewport.height);
  // If the viewport becomes exceptionally small, reduce margins before allowing
  // the launcher to leave the visible viewport. The top obstruction is best effort.
  const horizontalSpace = Math.max(0, width - nonnegative(launcher.width));
  const verticalSpace = Math.max(0, height - nonnegative(launcher.height));
  const leftPadding = Math.min(nonnegative(padding.left), horizontalSpace / 2);
  const rightPadding = Math.min(nonnegative(padding.right), horizontalSpace / 2);
  const topPadding = Math.min(nonnegative(padding.top), verticalSpace / 2);
  const bottomPadding = Math.min(nonnegative(padding.bottom), verticalSpace / 2);
  const bottom = viewport.top + height - bottomPadding;
  const safeTop = viewport.top + topPadding;
  const obstacleTop = Number.isFinite(obstructionBottom) && obstructionBottom > viewport.top
    ? obstructionBottom + 8 : safeTop;
  return {
    left: viewport.left + leftPadding,
    right: viewport.left + width - rightPadding,
    top: Math.min(Math.max(safeTop, obstacleTop), Math.max(safeTop, bottom - launcher.height)),
    bottom,
  };
}

export function newsletterLauncherBounds(area: NewsletterArea, launcher: NewsletterSize): NewsletterBounds {
  return {
    minX: area.left,
    maxX: Math.max(area.left, area.right - launcher.width),
    minY: area.top,
    maxY: Math.max(area.top, area.bottom - launcher.height),
  };
}

export function clampNewsletterPoint(point: NewsletterPoint, bounds: NewsletterBounds): NewsletterPoint {
  return { x: clamp(point.x, bounds.minX, bounds.maxX), y: clamp(point.y, bounds.minY, bounds.maxY) };
}

export function newsletterPointForPosition(position: NewsletterPosition, bounds: NewsletterBounds): NewsletterPoint {
  return {
    x: bounds.minX + clamp(position.x, 0, 1) * (bounds.maxX - bounds.minX),
    y: bounds.minY + clamp(position.y, 0, 1) * (bounds.maxY - bounds.minY),
  };
}

export function newsletterPositionForPoint(point: NewsletterPoint, bounds: NewsletterBounds, fallback = newsletterDefaultPosition): NewsletterPosition {
  const clamped = clampNewsletterPoint(point, bounds);
  return {
    x: bounds.maxX > bounds.minX ? (clamped.x - bounds.minX) / (bounds.maxX - bounds.minX) : fallback.x,
    y: bounds.maxY > bounds.minY ? (clamped.y - bounds.minY) / (bounds.maxY - bounds.minY) : fallback.y,
  };
}

export function newsletterSideForPosition(position: NewsletterPosition): NewsletterSide {
  return position.x < 0.5 ? "left" : "right";
}

export function snapNewsletterPosition(position: NewsletterPosition): NewsletterPosition {
  return { x: position.x < 0.5 ? 0 : 1, y: clamp(position.y, 0, 1) };
}

export function moveNewsletterPosition(position: NewsletterPosition, direction: NewsletterMove, bounds: NewsletterBounds): NewsletterPosition {
  if (direction === "reset") return { ...newsletterDefaultPosition };
  if (direction === "left" || direction === "right") return { x: direction === "left" ? 0 : 1, y: position.y };
  const point = newsletterPointForPosition(position, bounds);
  point.y += direction === "up" ? -32 : 32;
  return snapNewsletterPosition(newsletterPositionForPoint(point, bounds, position));
}

export function newsletterDragStarted(deltaX: number, deltaY: number): boolean {
  return Math.hypot(deltaX, deltaY) > newsletterDragThreshold;
}

export function newsletterCardPlacement(
  area: NewsletterArea,
  position: NewsletterPosition,
  launcher: NewsletterSize,
  card: NewsletterSize,
) {
  const maxWidth = Math.max(1, area.right - area.left);
  const maxHeight = Math.max(1, area.bottom - area.top);
  const width = Math.min(card.width, maxWidth);
  const height = Math.min(card.height, maxHeight);
  const bounds = newsletterLauncherBounds(area, { width, height });
  const { x: left, y: top } = newsletterPointForPosition(position, bounds);
  const launcherPoint = newsletterPointForPosition(position, newsletterLauncherBounds(area, launcher));
  return {
    left, top, width, height, maxWidth, maxHeight, bounds,
    originX: clamp(launcherPoint.x + launcher.width / 2 - left, 0, width),
    originY: clamp(launcherPoint.y + launcher.height / 2 - top, 0, height),
  };
}
