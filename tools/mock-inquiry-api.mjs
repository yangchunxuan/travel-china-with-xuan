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
  currentHomepageEmailFormVersion,
  currentPrivateTourQuoteFormVersion,
  homepageEmailPrivacyNoticeVersion,
  travellerAckPrivacyNoticeVersion,
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
  `${currentPrivacyNoticeVersion},${homepageEmailPrivacyNoticeVersion},${travellerAckPrivacyNoticeVersion}`
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
const ackLastQueuedByEmail = new Map();
const mockAckStatus = process.env.MOCK_ACK_STATUS || "queued";
if (!["queued", "disabled", "suppressed", "unavailable"].includes(mockAckStatus)) {
  throw new Error("Invalid MOCK_ACK_STATUS");
}
const mockReplyHours = parsePositiveInteger(process.env.MOCK_REPLY_SLA_HOURS, 24);
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
    "access-control-allow-headers": "content-type, idempotency-key, inquiry-access-key",
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

  const isCorrection = request.url === "/v1/inquiry-email-corrections";
  if (request.url !== "/v1/inquiries" && !isCorrection) {
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
        ["content-type", "idempotency-key", ...(isCorrection ? ["inquiry-access-key"] : [])].includes(header)
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

  // Development-only correction contract. No email is sent and no production
  // credential is read. The original submission remains one in-memory enquiry.
  if (isCorrection) {
    const accessKey = request.headers["inquiry-access-key"]?.trim() || "";
    const original = uuidV4Pattern.test(accessKey) ? inquiryByIdempotencyKey.get(accessKey) : null;
    if (!original?.publicResult.contactEmail || Date.now() - original.createdAt > 30 * 60_000) {
      sendError(response, 403, "correction_unavailable", requestId, responseHeaders);
      return;
    }
    const email = typeof rawPayload?.email === "string" ? rawPayload.email.trim().toLowerCase() : "";
    if (email.length > 254 || !/^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/.test(email)) {
      sendError(response, 422, "invalid_email", requestId, responseHeaders);
      return;
    }
    if (!Number.isInteger(rawPayload.expectedRevision) || rawPayload.expectedRevision < 0) {
      sendError(response, 422, "invalid_request", requestId, responseHeaders);
      return;
    }
    const prior = original.corrections.get(idempotencyKey);
    if (prior) {
      if (prior.email !== email || prior.expectedRevision !== rawPayload.expectedRevision) {
        sendError(response, 409, "correction_conflict", requestId, responseHeaders);
      } else {
        sendJson(response, 200, { ...original.publicResult, state: "corrected", changed: prior.changed, duplicate: true, requestId }, responseHeaders);
      }
      return;
    }
    if (original.publicResult.contactRevision !== rawPayload.expectedRevision) {
      sendError(response, 409, "correction_conflict", requestId, responseHeaders);
      return;
    }
    const changed = email !== original.publicResult.contactEmail;
    if (changed && original.publicResult.contactRevision >= 3) {
      sendError(response, 403, "correction_unavailable", requestId, responseHeaders);
      return;
    }
    if (changed) {
      let ackStatus = original.ackEligible ? mockAckStatus : "disabled";
      const now = Date.now();
      if (ackStatus === "queued" && ackLastQueuedByEmail.has(email) && now - ackLastQueuedByEmail.get(email) < 86_400_000) ackStatus = "suppressed";
      if (ackStatus === "queued") ackLastQueuedByEmail.set(email, now);
      Object.assign(original.publicResult, { contactEmail: email, contactRevision: original.publicResult.contactRevision + 1, ackStatus, ackQueued: ackStatus === "queued" });
    }
    original.corrections.set(idempotencyKey, { email, expectedRevision: rawPayload.expectedRevision, changed });
    sendJson(response, 200, { ...original.publicResult, state: "corrected", changed, duplicate: false, requestId }, responseHeaders);
    return;
  }

  // Match the production intake envelope: this optional attribution token is
  // not an inquiry answer and never affects the semantic idempotency hash.
  // The development mock has no traffic collector or attribution persistence.
  if (rawPayload && typeof rawPayload === "object" && !Array.isArray(rawPayload)) {
    rawPayload = { ...rawPayload };
    delete rawPayload.trafficSessionToken;
  }
  const validation = validateAndNormalizeInquiry(rawPayload, {
    allowedFormVersions: [
      currentInquiryFormVersion,
      currentHomepageEmailFormVersion,
      currentPrivateTourQuoteFormVersion,
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

  const now = Date.now();
  const email = validation.value.contact.channel === "email" ? validation.value.contact.email.toLowerCase() : null;
  let ackStatus = email && validation.value.privacyNoticeVersion === travellerAckPrivacyNoticeVersion ? mockAckStatus : "disabled";
  if (ackStatus === "queued" && ackLastQueuedByEmail.has(email) && now - ackLastQueuedByEmail.get(email) < 86_400_000) {
    ackStatus = "suppressed";
  }
  if (ackStatus === "queued") ackLastQueuedByEmail.set(email, now);
  const publicResult = {
    publicReference: makePublicReference(),
    state: "submitted",
    receivedAt: new Date(now).toISOString(),
    firstResponseDueAt: new Date(now + mockReplyHours * 3_600_000).toISOString(),
    ackQueued: ackStatus === "queued",
    ackStatus,
    contactEmail: email,
    contactRevision: 0,
  };
  inquiryByIdempotencyKey.set(idempotencyKey, {
    payloadHash,
    publicResult,
    createdAt: now,
    ackEligible: validation.value.privacyNoticeVersion === travellerAckPrivacyNoticeVersion,
    corrections: new Map(),
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
