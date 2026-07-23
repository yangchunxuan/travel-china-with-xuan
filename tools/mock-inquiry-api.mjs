/**
 * Development-only in-memory Homeground Inquiry API.
 *
 * It deliberately has no production persistence and must never be deployed.
 * It exists so the static frontend can exercise POST, CORS, validation,
 * idempotent replay, and conflict handling before Supabase is configured.
 */

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { createServer } from "node:http";
import {
  canonicalizeJson,
  semanticInquiryPayload,
  validateAndNormalizeInquiry,
} from "../lib/inquiryContract.ts";
import {
  currentInquiryFormVersion,
  currentPrivacyNoticeVersion,
  supportedDestinationInquiryFormVersions,
} from "../lib/inquiryVersions.ts";

const port = parsePositiveInteger(process.env.MOCK_INQUIRY_PORT, 8787);
const hostname = process.env.MOCK_INQUIRY_HOST?.trim() || "127.0.0.1";
const allowedOrigins = new Set(
  (
    process.env.MOCK_INQUIRY_ALLOWED_ORIGINS ||
    "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001"
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const privacyNoticeVersions = (
  process.env.MOCK_ALLOWED_PRIVACY_NOTICE_VERSIONS ||
  currentPrivacyNoticeVersion
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const whatsappEnabled =
  process.env.MOCK_WHATSAPP_ENABLED?.trim() === "true";
const maximumRequestBytes = 16 * 1024;
const uuidV4Pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const inquiryByIdempotencyKey = new Map();
const referenceAlphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function parsePositiveInteger(raw, fallback) {
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1 || value > 65_535) {
    throw new Error("MOCK_INQUIRY_PORT must be a valid positive integer.");
  }
  return value;
}

function corsHeaders(origin) {
  return {
    "access-control-allow-headers": "content-type, idempotency-key",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-origin": origin,
    "access-control-max-age": "600",
    vary: "Origin",
  };
}

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
    ...headers,
  });
  response.end(JSON.stringify(body));
}

function sendError(
  response,
  status,
  code,
  requestId,
  headers,
  fieldErrors,
) {
  sendJson(
    response,
    status,
    {
      error: {
        code,
        retryable: false,
        persistenceState: "not_persisted",
        ...(fieldErrors ? { fieldErrors } : {}),
        requestId,
      },
    },
    headers,
  );
}

function makePublicReference() {
  const random = randomBytes(8);
  let raw = "";
  for (let character = 0; character < 12; character += 1) {
    let value = 0;
    for (let bit = 0; bit < 5; bit += 1) {
      const offset = character * 5 + bit;
      value |= ((random[Math.floor(offset / 8)] >> (offset % 8)) & 1) << bit;
    }
    raw += referenceAlphabet[value];
  }
  return `HG-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}

async function readBody(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maximumRequestBytes) {
      return { tooLarge: true, text: "" };
    }
    chunks.push(chunk);
  }
  return {
    tooLarge: false,
    text: Buffer.concat(chunks).toString("utf8"),
  };
}

const server = createServer(async (request, response) => {
  const requestId = randomUUID();
  const origin = request.headers.origin || "";
  if (!allowedOrigins.has(origin)) {
    sendError(
      response,
      403,
      "origin_not_allowed",
      requestId,
      {},
    );
    return;
  }
  const responseHeaders = corsHeaders(origin);

  if (request.url !== "/v1/inquiries") {
    sendError(
      response,
      404,
      "not_found",
      requestId,
      responseHeaders,
    );
    return;
  }

  if (request.method === "OPTIONS") {
    const requestedMethod =
      request.headers["access-control-request-method"]?.toUpperCase();
    const requestedHeaders = (
      request.headers["access-control-request-headers"] || ""
    )
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
    if (
      requestedMethod !== "POST" ||
      !requestedHeaders.every((header) =>
        ["content-type", "idempotency-key"].includes(header)
      )
    ) {
      sendError(
        response,
        403,
        "preflight_not_allowed",
        requestId,
        responseHeaders,
      );
      return;
    }
    response.writeHead(204, responseHeaders);
    response.end();
    return;
  }

  if (request.method !== "POST") {
    sendError(
      response,
      405,
      "method_not_allowed",
      requestId,
      { ...responseHeaders, allow: "POST, OPTIONS" },
    );
    return;
  }

  if (
    !/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(
      request.headers["content-type"] || "",
    )
  ) {
    sendError(
      response,
      415,
      "unsupported_media_type",
      requestId,
      responseHeaders,
    );
    return;
  }

  const idempotencyKey =
    request.headers["idempotency-key"]?.trim() || "";
  if (!uuidV4Pattern.test(idempotencyKey)) {
    sendError(
      response,
      400,
      "invalid_idempotency_key",
      requestId,
      responseHeaders,
    );
    return;
  }

  const body = await readBody(request);
  if (body.tooLarge) {
    sendError(
      response,
      413,
      "request_too_large",
      requestId,
      responseHeaders,
    );
    return;
  }

  let rawPayload;
  try {
    rawPayload = JSON.parse(body.text);
  } catch {
    sendError(
      response,
      400,
      "malformed_json",
      requestId,
      responseHeaders,
    );
    return;
  }

  const validation = validateAndNormalizeInquiry(rawPayload, {
    allowedFormVersions: [
      currentInquiryFormVersion,
      ...supportedDestinationInquiryFormVersions,
    ],
    allowedPrivacyNoticeVersions: privacyNoticeVersions,
    whatsappEnabled,
  });
  if (!validation.ok) {
    sendError(
      response,
      validation.code === "route_mismatch" ||
        validation.code === "unsupported_rule_version"
        ? 409
        : 422,
      validation.code,
      requestId,
      responseHeaders,
      validation.fieldErrors,
    );
    return;
  }

  const payloadHash = createHash("sha256")
    .update(
      canonicalizeJson(semanticInquiryPayload(validation.value)),
      "utf8",
    )
    .digest("hex");
  const previous = inquiryByIdempotencyKey.get(idempotencyKey);
  if (previous) {
    if (previous.payloadHash !== payloadHash) {
      sendError(
        response,
        409,
        "idempotency_conflict",
        requestId,
        responseHeaders,
      );
      return;
    }
    sendJson(
      response,
      200,
      {
        ...previous.publicResult,
        duplicate: true,
        requestId,
      },
      responseHeaders,
    );
    return;
  }

  const publicResult = {
    publicReference: makePublicReference(),
    state: "submitted",
    receivedAt: new Date().toISOString(),
  };
  inquiryByIdempotencyKey.set(idempotencyKey, {
    payloadHash,
    publicResult,
  });
  sendJson(
    response,
    201,
    {
      ...publicResult,
      duplicate: false,
      requestId,
    },
    responseHeaders,
  );
});

server.listen(port, hostname, () => {
  console.info(
    `[development-only] Mock Inquiry API listening on http://${hostname}:${port}/v1/inquiries`,
  );
});
