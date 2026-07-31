import { createHmac, timingSafeEqual } from "node:crypto";

const controlledValuePattern =
  /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/u;
const controlledPathPattern = /^\/[A-Za-z0-9/_-]*$/u;
const internalMedia = new Set(["owned", "organic-content"]);

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

function controlledValue(value, maximumLength, required) {
  if (!value && !required) return "";
  const normalized = (value ?? "").normalize("NFKC").trim().toLowerCase();
  if (
    normalized.length < 1 ||
    normalized.length > maximumLength ||
    !controlledValuePattern.test(normalized)
  ) {
    throw new Error("invalid controlled UTM value");
  }
  return normalized;
}

function canonicalPath(pathname) {
  const normalized =
    pathname === "/" || pathname.endsWith("/")
      ? pathname
      : `${pathname}/`;
  if (
    normalized.length > 180 ||
    !controlledPathPattern.test(normalized) ||
    normalized.includes("//") ||
    normalized.includes("..")
  ) {
    throw new Error("invalid landing path");
  }
  return normalized;
}

const secret =
  process.env.TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET?.trim() ?? "";
const rawUrl = process.argv[2]?.trim() ?? "";
if (secret.length < 32) {
  fail(
    "Set TRAFFIC_ATTRIBUTION_LINK_SIGNING_SECRET to the server-side signing secret (at least 32 characters).",
  );
} else if (!rawUrl) {
  fail(
    "Usage: npm run sign:traffic-link -- 'https://homegroundchina.com/path/?utm_source=facebook&utm_medium=social&utm_campaign=campaign-code&utm_content=post-code'",
  );
} else {
  try {
    const url = new URL(rawUrl);
    const local =
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname);
    if (
      (url.protocol !== "https:" && !local) ||
      (url.hostname !== "homegroundchina.com" &&
        url.hostname !== "www.homegroundchina.com" &&
        !local) ||
      url.username ||
      url.password ||
      url.hash
    ) {
      throw new Error("URL must be a Homeground HTTPS URL without a hash");
    }

    const path = canonicalPath(url.pathname);
    const source = controlledValue(
      url.searchParams.get("utm_source"),
      64,
      true,
    );
    const medium = controlledValue(
      url.searchParams.get("utm_medium"),
      64,
      true,
    );
    const campaign = controlledValue(
      url.searchParams.get("utm_campaign"),
      96,
      true,
    );
    const content = controlledValue(
      url.searchParams.get("utm_content"),
      96,
      false,
    );
    if (internalMedia.has(medium)) {
      throw new Error("internal navigation media cannot be acquisition links");
    }

    url.pathname = path;
    url.searchParams.set("utm_source", source);
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", campaign);
    if (content) url.searchParams.set("utm_content", content);
    else url.searchParams.delete("utm_content");
    url.searchParams.delete("hg_attribution_sig");

    const message = [
      "homeground-attribution-link.v1",
      path,
      source,
      medium,
      campaign,
      content,
    ].join("\n");
    const signature = createHmac("sha256", secret)
      .update(message, "utf8")
      .digest("hex");

    // Exercise a constant-time comparison locally so future edits cannot
    // accidentally change the canonical form without making the tool fail.
    const verification = createHmac("sha256", secret)
      .update(message, "utf8")
      .digest();
    if (
      !timingSafeEqual(verification, Buffer.from(signature, "hex"))
    ) {
      throw new Error("signature self-check failed");
    }

    url.searchParams.set("hg_attribution_sig", signature);
    process.stdout.write(`${url.toString()}\n`);
  } catch (error) {
    fail(error instanceof Error ? error.message : "could not sign URL");
  }
}
