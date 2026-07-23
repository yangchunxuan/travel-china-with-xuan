import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AdminConfig } from "./adminClient";

const accessTokenPattern =
  /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
const refreshTokenPattern = /^[A-Za-z0-9._~-]{8,2048}$/;
const allowedAdminSetupTypes = new Set(["invite", "recovery"]);
const allowedInviteParameters = new Set([
  "access_token",
  "expires_at",
  "expires_in",
  "refresh_token",
  "sb",
  "token_type",
  "type",
]);
const unsafePasswordCharacters =
  /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u;

export const adminInviteSessionLimitMs = 10 * 60 * 1000;

export interface AdminInviteSessionTokens {
  accessToken: string;
  refreshToken: string;
}

export type AdminInviteCapture =
  | { kind: "missing" | "invalid" | "unavailable" }
  | {
      kind: "valid";
      capturedAtMs: number;
      localDeadlineMs: number;
      tokens: AdminInviteSessionTokens;
    };

export type AdminInviteContinuationState =
  | "current"
  | "expired"
  | "superseded";

export interface AdminInviteUpdateMarker<T> {
  client: T;
  generation: number;
}

export function parseAdminInviteFragment(
  fragment: string,
): AdminInviteSessionTokens | null {
  const value = fragment.startsWith("#") ? fragment.slice(1) : fragment;
  if (!value) return null;

  const parameters = new URLSearchParams(value);
  for (const name of new Set(parameters.keys())) {
    if (
      !allowedInviteParameters.has(name) ||
      parameters.getAll(name).length !== 1
    ) {
      return null;
    }
  }

  if (
    !allowedAdminSetupTypes.has(parameters.get("type") ?? "") ||
    parameters.get("token_type") !== "bearer" ||
    (parameters.has("sb") && parameters.get("sb") !== "")
  ) {
    return null;
  }
  for (const numericName of ["expires_at", "expires_in"]) {
    const numericValue = parameters.get(numericName);
    if (numericValue !== null && !/^\d{1,12}$/.test(numericValue)) {
      return null;
    }
  }

  const accessToken = parameters.get("access_token") ?? "";
  const refreshToken = parameters.get("refresh_token") ?? "";
  if (
    accessToken.length > 8192 ||
    !accessTokenPattern.test(accessToken) ||
    !refreshTokenPattern.test(refreshToken)
  ) {
    return null;
  }
  return { accessToken, refreshToken };
}

export function captureAdminInviteFragment(
  fragment: string,
  scrubUrl: () => void,
  capturedAtMs = Date.now(),
): AdminInviteCapture {
  if (!fragment) return { kind: "missing" };
  try {
    scrubUrl();
  } catch {
    return { kind: "unavailable" };
  }
  const tokens = parseAdminInviteFragment(fragment);
  if (!tokens) return { kind: "invalid" };
  return {
    kind: "valid",
    capturedAtMs,
    localDeadlineMs: capturedAtMs + adminInviteSessionLimitMs,
    tokens,
  };
}

export function classifyAdminInviteContinuation<T>(
  activeClient: T | null,
  expectedClient: T,
  activeGeneration: number,
  expectedGeneration: number,
  deadlineMs: number,
  nowMs = Date.now(),
): AdminInviteContinuationState {
  if (
    activeClient !== expectedClient ||
    activeGeneration !== expectedGeneration
  ) {
    return "superseded";
  }
  if (deadlineMs <= 0 || nowMs >= deadlineMs) return "expired";
  return "current";
}

export function adminInviteExpiryOutcome<T>(
  updateMarker: AdminInviteUpdateMarker<T> | null,
  activeClient: T,
  activeGeneration: number,
): "invalid" | "unconfirmed" {
  return updateMarker?.client === activeClient &&
    updateMarker.generation === activeGeneration
    ? "unconfirmed"
    : "invalid";
}

export function validateAdminInvitePassword(
  password: string,
  confirmation: string,
): string | null {
  const length = Array.from(password).length;
  if (length < 14) return "密码至少需要 14 个字符。";
  if (length > 128) return "密码不能超过 128 个字符。";
  if (password !== password.trim()) {
    return "密码开头或结尾不能包含空格。";
  }
  if (unsafePasswordCharacters.test(password)) {
    return "密码包含不可见或方向控制字符，请重新输入。";
  }
  if (password !== confirmation) return "两次输入的密码不一致。";
  return null;
}

export function createAdminInviteClient(
  config: AdminConfig,
): SupabaseClient {
  return createClient(config.supabaseUrl, config.publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: {
      headers: {
        "X-Client-Info": "homeground-private-admin-invite/1",
      },
    },
  });
}
