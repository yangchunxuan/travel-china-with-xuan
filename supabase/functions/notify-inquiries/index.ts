import {
  callSupabaseRpc,
  constantTimeEqual,
  jsonResponse,
  positiveIntegerEnv,
  requiredEnv,
  safeRequestId,
  // @ts-ignore Deno resolves explicit TypeScript extensions when bundling.
} from "../_shared/runtime.ts";

declare const Deno: {
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

interface NotificationJob {
  job_id: string;
  inquiry_id: string;
  public_reference: string;
  locale: "en" | "zh" | "ko";
  route_id: string;
  answers: Record<string, unknown>;
  route_snapshot: Record<string, unknown>;
  reply_channel: "email" | "whatsapp";
  contact_email: string | null;
  contact_phone_e164: string | null;
  note: string | null;
  inquiry_created_at: string;
  first_response_due_at: string;
  lease_token: string;
  row_version: number;
  attempt_count: number;
}

interface ResendResult {
  accepted: boolean;
  providerMessageId: string | null;
  errorCode: string | null;
}

interface NotificationConfig {
  apiKey: string;
  from: string;
  to: string;
  providerTimeoutMilliseconds: number;
}

const retryMinutes = [1, 5, 30, 120] as const;
const routeAnswerFields = [
  { key: "party", label: "Travelling party" },
  { key: "travelStyle", label: "Trip style" },
  { key: "nights", label: "Total nights" },
  { key: "pace", label: "Daily pace" },
] as const;
const destinationLabels: Record<string, string> = {
  "beijing-great-wall": "Beijing & Great Wall",
  shanghai: "Shanghai",
  xian: "Xi’an",
  chengdu: "Chengdu",
  chongqing: "Chongqing",
  zhangjiajie: "Zhangjiajie",
  "guilin-yangshuo": "Guilin & Yangshuo",
  "hangzhou-suzhou": "Hangzhou & Suzhou",
  "yunnan-dali-lijiang": "Yunnan — Dali & Lijiang",
  "guangzhou-shenzhen": "Guangzhou & Shenzhen",
};

function ensureHeaderSafe(value: string, name: string): string {
  if (/[\r\n]/u.test(value)) throw new Error(`invalid_env:${name}`);
  return value;
}

function ensureMailboxAddress(value: string, name: string): string {
  const safeValue = ensureHeaderSafe(value, name);
  if (
    !/^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/u.test(safeValue)
  ) {
    throw new Error(`invalid_env:${name}`);
  }
  return safeValue;
}

function ensureSender(value: string): string {
  const safeValue = ensureHeaderSafe(value, "RESEND_FROM_EMAIL");
  const bracketedAddress = safeValue.match(/<([^<>]+)>$/u)?.[1];
  ensureMailboxAddress(
    bracketedAddress ?? safeValue,
    "RESEND_FROM_EMAIL",
  );
  return safeValue;
}

function notificationConfig(): NotificationConfig {
  return {
    apiKey: requiredEnv("RESEND_API_KEY"),
    from: ensureSender(requiredEnv("RESEND_FROM_EMAIL")),
    to: ensureMailboxAddress(
      requiredEnv("BRAND_NOTIFICATION_EMAIL"),
      "BRAND_NOTIFICATION_EMAIL",
    ),
    providerTimeoutMilliseconds:
      positiveIntegerEnv(
        "NOTIFICATION_PROVIDER_TIMEOUT_SECONDS",
        15,
        5,
        60,
      ) * 1_000,
  };
}

function notificationWorkerSecret(): string {
  const secret = ensureHeaderSafe(
    requiredEnv("NOTIFICATION_WORKER_SECRET"),
    "NOTIFICATION_WORKER_SECRET",
  );
  if (secret.length < 32 || secret.length > 512) {
    throw new Error("invalid_env:NOTIFICATION_WORKER_SECRET");
  }
  return secret;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function routeSummary(job: NotificationJob): string {
  if (
    job.route_id === "destination-timing" &&
    Array.isArray(job.route_snapshot?.destinationIds)
  ) {
    const destinations = validatedStringArray(
      job.route_snapshot.destinationIds,
      "route_snapshot.destinationIds",
      10,
    ).map((id) => destinationLabels[id] ?? id);
    const other =
      job.answers.otherPlace === null ||
        job.answers.otherPlace === undefined
        ? null
        : validatedShortString(
            job.answers.otherPlace,
            "answers.otherPlace",
            120,
          );
    const wishlist = [
      ...destinations,
      ...(other ? [`Other: ${other}`] : []),
    ];
    return wishlist.length > 0
      ? `Destination timing: ${wishlist.join(", ")}`
      : "Destination timing: classic starting point requested";
  }

  const cityNights = job.route_snapshot?.cityNights;
  if (!Array.isArray(cityNights)) return job.route_id;

  const stops = cityNights.flatMap((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("city" in entry) ||
      !("nights" in entry) ||
      typeof entry.city !== "string" ||
      typeof entry.nights !== "number"
    ) {
      return [];
    }
    return [`${entry.city} (${entry.nights} nights)`];
  });
  return stops.length > 0
    ? `${job.route_id}: ${stops.join(" → ")}`
    : job.route_id;
}

function validatedShortString(
  value: unknown,
  name: string,
  maximumLength = 80,
): string {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    Array.from(value).length > maximumLength ||
    /[\r\n\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)
  ) {
    throw new Error(`invalid_job:${name}`);
  }
  return value;
}

function validatedStringArray(
  value: unknown,
  name: string,
  maximumItems: number,
): string[] {
  if (!Array.isArray(value) || value.length > maximumItems) {
    throw new Error(`invalid_job:${name}`);
  }
  return value.map((entry, index) =>
    validatedShortString(entry, `${name}.${index}`)
  );
}

function canonicalTimingAnswers(job: NotificationJob): Array<{
  label: string;
  value: string;
}> {
  const answers = job.answers;
  const snapshot = job.route_snapshot;
  const destinationMode = validatedShortString(
    answers.destinationMode,
    "answers.destinationMode",
  );
  const destinationIds = validatedStringArray(
    answers.destinationIds,
    "answers.destinationIds",
    10,
  );
  const mustSeeIds = validatedStringArray(
    answers.mustSeeIds,
    "answers.mustSeeIds",
    3,
  );
  const totalNights = answers.totalNights;
  if (
    typeof totalNights !== "number" ||
    !Number.isSafeInteger(totalNights) ||
    totalNights < 1 ||
    totalNights > 60
  ) {
    throw new Error("invalid_job:answers.totalNights");
  }

  const otherPlace =
    answers.otherPlace === null || answers.otherPlace === undefined
      ? "(None)"
      : validatedShortString(
          answers.otherPlace,
          "answers.otherPlace",
          120,
        );
  const selectedPaceRange = snapshot.selectedPaceRange;
  let selectedPaceRangeDisplay = "(Manual review)";
  if (selectedPaceRange !== null && selectedPaceRange !== undefined) {
    if (
      typeof selectedPaceRange !== "object" ||
      Array.isArray(selectedPaceRange)
    ) {
      throw new Error("invalid_job:route_snapshot.selectedPaceRange");
    }
    const range = selectedPaceRange as Record<string, unknown>;
    if (
      typeof range.minNights !== "number" ||
      !Number.isSafeInteger(range.minNights) ||
      typeof range.maxNights !== "number" ||
      !Number.isSafeInteger(range.maxNights)
    ) {
      throw new Error("invalid_job:route_snapshot.selectedPaceRange");
    }
    selectedPaceRangeDisplay =
      `${range.minNights}–${range.maxNights} nights`;
  }

  const essentialsMinimum = snapshot.essentialsMinimumNights;
  if (
    essentialsMinimum !== null &&
    essentialsMinimum !== undefined &&
    (
      typeof essentialsMinimum !== "number" ||
      !Number.isSafeInteger(essentialsMinimum)
    )
  ) {
    throw new Error(
      "invalid_job:route_snapshot.essentialsMinimumNights",
    );
  }
  const essentialsShortfall = snapshot.essentialsShortfallNights;
  if (
    essentialsShortfall !== null &&
    essentialsShortfall !== undefined &&
    (
      typeof essentialsShortfall !== "number" ||
      !Number.isSafeInteger(essentialsShortfall) ||
      essentialsShortfall < 0
    )
  ) {
    throw new Error(
      "invalid_job:route_snapshot.essentialsShortfallNights",
    );
  }
  const selectedPaceShortfall = snapshot.selectedPaceShortfallNights;
  if (
    selectedPaceShortfall !== null &&
    selectedPaceShortfall !== undefined &&
    (
      typeof selectedPaceShortfall !== "number" ||
      !Number.isSafeInteger(selectedPaceShortfall) ||
      selectedPaceShortfall < 0
    )
  ) {
    throw new Error(
      "invalid_job:route_snapshot.selectedPaceShortfallNights",
    );
  }
  const nightsAboveSelectedPaceMax =
    snapshot.nightsAboveSelectedPaceMax;
  if (
    nightsAboveSelectedPaceMax !== null &&
    nightsAboveSelectedPaceMax !== undefined &&
    (
      typeof nightsAboveSelectedPaceMax !== "number" ||
      !Number.isSafeInteger(nightsAboveSelectedPaceMax) ||
      nightsAboveSelectedPaceMax < 0
    )
  ) {
    throw new Error(
      "invalid_job:route_snapshot.nightsAboveSelectedPaceMax",
    );
  }

  const displayDestinations = destinationIds.map(
    (id) => destinationLabels[id] ?? id,
  );
  const displayMustSee = mustSeeIds.map(
    (id) => destinationLabels[id] ?? id,
  );
  return [
    { label: "Destination mode", value: destinationMode },
    {
      label: "Wish list",
      value:
        displayDestinations.length > 0
          ? displayDestinations.join(", ")
          : "(No standard destination selected)",
    },
    { label: "Other place", value: otherPlace },
    { label: "Total nights in China", value: String(totalNights) },
    {
      label: "Travelling party",
      value: validatedShortString(answers.party, "answers.party"),
    },
    {
      label: "Requested pace",
      value: validatedShortString(answers.pace, "answers.pace"),
    },
    {
      label: "Must-see priorities",
      value:
        displayMustSee.length > 0
          ? displayMustSee.join(", ")
          : "(None marked)",
    },
    {
      label: "Timing status",
      value: validatedShortString(
        snapshot.status,
        "route_snapshot.status",
      ),
    },
    {
      label: "Known-place timing",
      value:
        snapshot.knownDestinationsStatus === null ||
          snapshot.knownDestinationsStatus === undefined
          ? "(Manual review)"
          : validatedShortString(
              snapshot.knownDestinationsStatus,
              "route_snapshot.knownDestinationsStatus",
            ),
    },
    {
      label: "Essentials minimum",
      value:
        essentialsMinimum === null || essentialsMinimum === undefined
          ? "(Manual review)"
          : `${essentialsMinimum} nights`,
    },
    {
      label: "Essentials shortfall",
      value:
        essentialsShortfall === null ||
          essentialsShortfall === undefined
          ? "(Manual review)"
          : `${essentialsShortfall} nights`,
    },
    {
      label: "Selected pace reference",
      value: selectedPaceRangeDisplay,
    },
    {
      label: "Selected pace shortfall",
      value:
        selectedPaceShortfall === null ||
          selectedPaceShortfall === undefined
          ? "(Manual review)"
          : `${selectedPaceShortfall} nights`,
    },
    {
      label: "Nights above selected pace",
      value:
        nightsAboveSelectedPaceMax === null ||
          nightsAboveSelectedPaceMax === undefined
          ? "(Manual review)"
          : `${nightsAboveSelectedPaceMax} nights`,
    },
    {
      label: "Route feasibility",
      value: validatedShortString(
        snapshot.routeFeasibility,
        "route_snapshot.routeFeasibility",
      ),
    },
  ];
}

function routeAnswers(job: NotificationJob): Array<{
  label: string;
  value: string;
}> {
  if (
    typeof job.answers !== "object" ||
    job.answers === null ||
    Array.isArray(job.answers)
  ) {
    throw new Error("invalid_job:answers");
  }

  if (job.route_id === "destination-timing") {
    return canonicalTimingAnswers(job);
  }

  return routeAnswerFields.map(({ key, label }) => {
    const value = job.answers[key];
    if (
      typeof value !== "string" ||
      value.length === 0 ||
      value.length > 80 ||
      /[\r\n]/u.test(value)
    ) {
      throw new Error(`invalid_job:answers.${key}`);
    }
    return { label, value };
  });
}

function contactDetails(job: NotificationJob): {
  display: string;
  replyTo: string | null;
  whatsappUrl: string | null;
} {
  if (job.reply_channel === "email") {
    if (!job.contact_email) throw new Error("invalid_job:contact_email");
    const email = ensureHeaderSafe(job.contact_email, "contact_email");
    return { display: email, replyTo: email, whatsappUrl: null };
  }

  if (!job.contact_phone_e164) {
    throw new Error("invalid_job:contact_phone_e164");
  }
  const phone = ensureHeaderSafe(
    job.contact_phone_e164,
    "contact_phone_e164",
  );
  return {
    display: phone,
    replyTo: null,
    whatsappUrl: `https://wa.me/${phone.replace(/\D/gu, "")}`,
  };
}

async function sendThroughResend(
  job: NotificationJob,
  config: NotificationConfig,
): Promise<ResendResult> {
  const locale = job.locale.toUpperCase();
  const channel =
    job.reply_channel === "email" ? "Email" : "WhatsApp";
  const contact = contactDetails(job);
  const route = routeSummary(job);
  const answers = routeAnswers(job);
  const briefLabel =
    job.route_id === "destination-timing" ? "Planning brief" : "Route";
  const answerSectionLabel =
    job.route_id === "destination-timing"
      ? "Traveller answers"
      : "Route answers";
  const note = job.note?.trim() || "(No note provided)";
  const subject =
    `[Homeground][New] ${job.public_reference} · ${locale} · ${channel}`;
  const text = [
    "A new Homeground inquiry is ready for a human reply.",
    "",
    `Reference: ${job.public_reference}`,
    `Language: ${locale}`,
    `${briefLabel}: ${route}`,
    `${answerSectionLabel}:`,
    ...answers.map(({ label, value }) => `${label}: ${value}`),
    `Reply channel: ${channel}`,
    `Traveller contact: ${contact.display}`,
    "Traveller note:",
    note,
    "",
    `Received: ${job.inquiry_created_at}`,
    `First response due: ${job.first_response_due_at}`,
    "",
    job.reply_channel === "email"
      ? "Reply directly to this message; Reply-To is already set to the traveller."
      : `Continue in the studio WhatsApp account: ${contact.whatsappUrl}`,
    "The Gmail thread and its Sent message are the handling record.",
  ].join("\n");
  const html = `
    <p>A new Homeground inquiry is ready for a human reply.</p>
    <dl>
      <dt>Reference</dt><dd>${escapeHtml(job.public_reference)}</dd>
      <dt>Language</dt><dd>${escapeHtml(locale)}</dd>
      <dt>${escapeHtml(briefLabel)}</dt><dd>${escapeHtml(route)}</dd>
      ${answers
        .map(
          ({ label, value }) =>
            `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`,
        )
        .join("")}
      <dt>Reply channel</dt><dd>${escapeHtml(channel)}</dd>
      <dt>Traveller contact</dt><dd>${escapeHtml(contact.display)}</dd>
      <dt>Traveller note</dt><dd style="white-space:pre-wrap">${escapeHtml(note)}</dd>
      <dt>Received</dt><dd>${escapeHtml(job.inquiry_created_at)}</dd>
      <dt>First response due</dt><dd>${escapeHtml(job.first_response_due_at)}</dd>
    </dl>
    ${
      job.reply_channel === "email"
        ? "<p>Reply directly to this message; Reply-To is already set to the traveller.</p>"
        : `<p><a href="${escapeHtml(contact.whatsappUrl ?? "")}">Continue in the studio WhatsApp account</a>.</p>`
    }
    <p>The Gmail thread and its Sent message are the handling record.</p>
  `.trim();

  let response: Response;
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutController.abort(),
    config.providerTimeoutMilliseconds,
  );
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": job.inquiry_id,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        ...(contact.replyTo ? { reply_to: contact.replyTo } : {}),
        subject,
        text,
        html,
      }),
      signal: timeoutController.signal,
    });
  } catch {
    return {
      accepted: false,
      providerMessageId: null,
      errorCode: timeoutController.signal.aborted
        ? "provider_timeout"
        : "provider_network_error",
    };
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    await response.body?.cancel();
    return {
      accepted: false,
      providerMessageId: null,
      errorCode: `provider_http_${response.status}`,
    };
  }

  let providerMessageId: string | null = null;
  try {
    const responseBody = (await response.json()) as { id?: unknown };
    if (typeof responseBody.id === "string") {
      providerMessageId = responseBody.id;
    }
  } catch {
    // Provider acceptance is authoritative even if its optional response ID
    // cannot be decoded.
  }

  return {
    accepted: true,
    providerMessageId,
    errorCode: null,
  };
}

async function handleRequest(request: Request): Promise<Response> {
  const requestId = safeRequestId();
  if (request.method !== "POST") {
    return jsonResponse(
      405,
      { error: { code: "method_not_allowed", requestId } },
      { Allow: "POST" },
    );
  }

  let expectedSecret: string;
  try {
    expectedSecret = notificationWorkerSecret();
  } catch {
    return jsonResponse(503, {
      error: { code: "worker_not_configured", requestId },
    });
  }
  const suppliedSecret = request.headers.get("x-worker-secret") ?? "";
  if (!constantTimeEqual(suppliedSecret, expectedSecret)) {
    return jsonResponse(401, {
      error: { code: "unauthorized", requestId },
    });
  }

  let config: NotificationConfig;
  let batchSize: number;
  let leaseSeconds: number;
  try {
    config = notificationConfig();
    batchSize = positiveIntegerEnv(
      "NOTIFICATION_BATCH_SIZE",
      1,
      1,
      50,
    );
    leaseSeconds = positiveIntegerEnv(
      "NOTIFICATION_LEASE_SECONDS",
      90,
      15,
      300,
    );
    const worstCaseBatchMilliseconds =
      batchSize * (config.providerTimeoutMilliseconds + 5_000);
    if (worstCaseBatchMilliseconds >= leaseSeconds * 1_000) {
      throw new Error("invalid_env:NOTIFICATION_LEASE_SECONDS");
    }
  } catch {
    return jsonResponse(503, {
      error: { code: "worker_not_configured", requestId },
    });
  }

  let jobsResult;
  try {
    jobsResult = await callSupabaseRpc<NotificationJob[]>(
      "claim_homeground_notification_jobs",
      {
        p_worker_id: `edge:${requestId}`,
        p_job_limit: batchSize,
        p_lease_seconds: leaseSeconds,
      },
    );
  } catch {
    return jsonResponse(503, {
      error: { code: "outbox_unavailable", requestId },
    });
  }

  if (!jobsResult.ok || !Array.isArray(jobsResult.data)) {
    return jsonResponse(503, {
      error: { code: "outbox_unavailable", requestId },
    });
  }

  const summary = {
    claimed: jobsResult.data.length,
    accepted: 0,
    retryScheduled: 0,
    terminalFailed: 0,
    staleLease: 0,
  };

  for (const job of jobsResult.data) {
    let providerResult: ResendResult;
    try {
      providerResult = await sendThroughResend(job, config);
    } catch {
      providerResult = {
        accepted: false,
        providerMessageId: null,
        errorCode: "worker_configuration_error",
      };
    }

    const retryIndex = Math.max(0, job.attempt_count - 1);
    const terminal =
      !providerResult.accepted && retryIndex >= retryMinutes.length;
    const nextAttemptAt =
      providerResult.accepted || terminal
        ? null
        : new Date(
            Date.now() + retryMinutes[retryIndex] * 60_000,
          ).toISOString();

    let finishResult;
    try {
      finishResult = await callSupabaseRpc<boolean>(
        "finish_homeground_notification_job",
        {
          p_job_id: job.job_id,
          p_lease_token: job.lease_token,
          p_expected_row_version: job.row_version,
          p_accepted: providerResult.accepted,
          p_terminal: terminal,
          p_provider_message_id: providerResult.providerMessageId,
          p_error_code: providerResult.errorCode,
          p_next_attempt_at: nextAttemptAt,
        },
      );
    } catch {
      finishResult = { ok: false, status: 503, data: null };
    }

    if (!finishResult.ok || finishResult.data !== true) {
      summary.staleLease += 1;
    } else if (providerResult.accepted) {
      summary.accepted += 1;
    } else if (terminal) {
      summary.terminalFailed += 1;
    } else {
      summary.retryScheduled += 1;
    }
  }

  return jsonResponse(200, { ...summary, requestId });
}

Deno.serve(handleRequest);
