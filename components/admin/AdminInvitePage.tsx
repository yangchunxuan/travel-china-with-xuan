"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getAdminConfig } from "../../lib/adminClient";
import {
  adminInviteExpiryOutcome,
  adminInviteSessionLimitMs,
  captureAdminInviteFragment,
  classifyAdminInviteContinuation,
  createAdminInviteClient,
  type AdminInviteCapture,
  type AdminInviteUpdateMarker,
  validateAdminInvitePassword,
} from "../../lib/adminInvite";
import styles from "./AdminInsightsPage.module.css";

type InviteStage =
  | "initializing"
  | "ready"
  | "submitting"
  | "complete"
  | "unconfirmed"
  | "invalid"
  | "auth_unavailable";

const inviteExpirySafetyMs = 30 * 1000;

type InviteBootstrapState =
  | { kind: "uncaptured" }
  | AdminInviteCapture
  | {
      kind: "consumed";
      capturedAtMs: number;
      localDeadlineMs: number;
    };

type InviteAction = "closed" | "idle" | "submit" | "cancel";

const terminalInviteErrorCodes = new Set([
  "bad_jwt",
  "otp_disabled",
  "otp_expired",
  "refresh_token_not_found",
  "session_not_found",
  "token_expired",
]);

function terminalInviteError(error: unknown): boolean {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "";
  return terminalInviteErrorCodes.has(code);
}

function discardAdminInviteClient(
  client: SupabaseClient,
  revokeSession: boolean,
) {
  void (async () => {
    try {
      if (revokeSession) await client.auth.signOut({ scope: "local" });
    } catch {
      // The client has no persistent storage. Dropping the instance is still
      // sufficient to remove the browser's access to the temporary session.
    } finally {
      await client.auth.dispose();
    }
  })().catch(() => undefined);
}

function fixedInviteError(error: unknown): string {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "";
  if (
    code === "otp_expired" ||
    code === "otp_disabled" ||
    code === "token_expired"
  ) {
    return "这个账户设置链接已经过期或已被使用。请只打开最新收到的账户设置邮件。";
  }
  if (code === "weak_password") {
    return "这个密码没有通过账户安全要求，请换一个更长且不重复使用的密码。";
  }
  return "账户设置没有完成。请重试；如果仍失败，请重新发送一封账户设置邮件。";
}

function AdminBrandHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand} aria-label="Homeground China">
          <span className={styles.brandMark} aria-hidden="true">
            <span />
          </span>
          <span className={styles.brandCopy}>
            <strong>Homeground</strong>
            <small>Private admin setup</small>
          </span>
        </div>
      </div>
    </header>
  );
}

function PasswordField({
  id,
  label,
  value,
  visible,
  onChange,
  onToggle,
  describedBy,
}: {
  id: string;
  label: string;
  value: string;
  visible: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
  describedBy: string;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.passwordField}>
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={describedBy}
        />
        <button
          className={styles.iconButton}
          type="button"
          onClick={onToggle}
          aria-label={visible ? `隐藏${label}` : `显示${label}`}
        >
          {visible ? (
            <EyeOff size={19} aria-hidden="true" />
          ) : (
            <Eye size={19} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

export function AdminInvitePage() {
  const bootstrapRef = useRef<InviteBootstrapState>({ kind: "uncaptured" });
  const configResultRef = useRef<ReturnType<typeof getAdminConfig> | null>(
    null,
  );
  const clientRef = useRef<SupabaseClient | null>(null);
  const clientGenerationRef = useRef(0);
  const deadlineRef = useRef(0);
  const updateMarkerRef = useRef<AdminInviteUpdateMarker<SupabaseClient> | null>(
    null,
  );
  const actionRef = useRef<InviteAction>("closed");
  const [stage, setStage] = useState<InviteStage>("initializing");
  const [inviteSessionActive, setInviteSessionActive] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [configReady, setConfigReady] = useState(false);

  useLayoutEffect(() => {
    if (bootstrapRef.current.kind === "uncaptured") {
      bootstrapRef.current = captureAdminInviteFragment(
        window.location.hash,
        () => {
          window.history.replaceState(
            window.history.state,
            "",
            window.location.pathname + window.location.search,
          );
        },
      );
    }
    if (configResultRef.current === null) {
      configResultRef.current = getAdminConfig();
      setConfigReady(true);
    }
  }, []);

  const closeCurrentInvite = useCallback(
    (
      client: SupabaseClient,
      nextStage: Extract<InviteStage, "complete" | "unconfirmed" | "invalid">,
      nextMessage: string | null,
    ) => {
      if (clientRef.current !== client) return;
      const resolvedStage =
        nextStage === "complete" &&
        (deadlineRef.current <= 0 || Date.now() >= deadlineRef.current)
          ? "unconfirmed"
          : nextStage;
      clientGenerationRef.current += 1;
      clientRef.current = null;
      deadlineRef.current = 0;
      updateMarkerRef.current = null;
      actionRef.current = "closed";
      bootstrapRef.current = { kind: "invalid" };
      setInviteSessionActive(false);
      setPassword("");
      setConfirmation("");
      setMessage(nextMessage);
      setStage(resolvedStage);
      discardAdminInviteClient(client, true);
    },
    [],
  );

  useEffect(() => {
    const configResult = configResultRef.current;
    const bootstrap = bootstrapRef.current;
    if (!configReady || !configResult || !configResult.config) return;
    if (bootstrap.kind === "unavailable") {
      actionRef.current = "closed";
      setStage("auth_unavailable");
      return;
    }
    if (bootstrap.kind !== "valid") {
      actionRef.current = "closed";
      setStage("invalid");
      return;
    }

    let active = true;
    let client: SupabaseClient;
    let generation: number;

    try {
      client = createAdminInviteClient(configResult.config);
      generation = clientGenerationRef.current + 1;
      clientGenerationRef.current = generation;
      clientRef.current = client;
      updateMarkerRef.current = null;
      actionRef.current = "closed";

      void (async () => {
        let sessionResult;
        try {
          sessionResult = await client.auth.setSession({
            access_token: bootstrap.tokens.accessToken,
            refresh_token: bootstrap.tokens.refreshToken,
          });
        } catch {
          if (
            active &&
            clientRef.current === client &&
            clientGenerationRef.current === generation
          ) {
            closeCurrentInvite(
              client,
              "invalid",
              "这个账户设置链接已经过期或已被使用。请只打开最新收到的账户设置邮件。",
            );
          } else {
            discardAdminInviteClient(client, false);
          }
          return;
        }

        if (
          !active ||
          clientRef.current !== client ||
          clientGenerationRef.current !== generation
        ) {
          discardAdminInviteClient(client, false);
          return;
        }

        const sessionExpiresAtMs =
          (sessionResult.data.session?.expires_at ?? 0) * 1000;
        const effectiveDeadlineMs = Math.min(
          bootstrap.localDeadlineMs,
          sessionExpiresAtMs - inviteExpirySafetyMs,
        );
        if (
          sessionResult.error ||
          !sessionResult.data.session ||
          Date.now() >= effectiveDeadlineMs
        ) {
          closeCurrentInvite(
            client,
            "invalid",
            "这个账户设置链接已经过期或已被使用。请只打开最新收到的账户设置邮件。",
          );
          return;
        }

        bootstrapRef.current = {
          kind: "consumed",
          capturedAtMs: bootstrap.capturedAtMs,
          localDeadlineMs: bootstrap.localDeadlineMs,
        };
        deadlineRef.current = effectiveDeadlineMs;
        actionRef.current = "idle";
        setInviteSessionActive(true);
        setStage("ready");
      })();
    } catch {
      bootstrapRef.current = { kind: "unavailable" };
      clientRef.current = null;
      actionRef.current = "closed";
      setStage("auth_unavailable");
      return;
    }

    return () => {
      active = false;
      if (clientRef.current === client) {
        clientRef.current = null;
        clientGenerationRef.current += 1;
        deadlineRef.current = 0;
        updateMarkerRef.current = null;
        actionRef.current = "closed";
      }
      discardAdminInviteClient(client, false);
    };
  }, [closeCurrentInvite, configReady]);

  useEffect(() => {
    if (!inviteSessionActive) return;
    const client = clientRef.current;
    const generation = clientGenerationRef.current;
    const deadline = deadlineRef.current;
    if (!client || deadline <= 0) return;

    const expire = () => {
      if (
        clientRef.current !== client ||
        clientGenerationRef.current !== generation
      ) {
        return;
      }
      const expiryOutcome = adminInviteExpiryOutcome(
        updateMarkerRef.current,
        client,
        generation,
      );
      closeCurrentInvite(
        client,
        expiryOutcome,
        expiryOutcome === "invalid"
          ? "临时设置会话已到期。请重新打开最新账户设置邮件。"
          : null,
      );
    };
    const timeoutId = window.setTimeout(
      expire,
      Math.max(0, deadline - Date.now()),
    );
    window.addEventListener("pagehide", expire, { once: true });
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pagehide", expire);
    };
  }, [closeCurrentInvite, inviteSessionActive]);

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (stage !== "ready" || actionRef.current !== "idle") return;
    const validationError = validateAdminInvitePassword(
      password,
      confirmation,
    );
    if (validationError) {
      setMessage(validationError);
      return;
    }

    const client = clientRef.current;
    const generation = clientGenerationRef.current;
    const deadline = deadlineRef.current;
    if (
      !client ||
      deadline <= 0 ||
      Date.now() >= deadline
    ) {
      if (client) {
        closeCurrentInvite(
          client,
          "invalid",
          "临时设置会话已经失效。请重新打开最新账户设置邮件。",
        );
      } else {
        actionRef.current = "closed";
        setInviteSessionActive(false);
        setMessage("临时设置会话已经失效。请重新打开最新账户设置邮件。");
        setStage("invalid");
      }
      return;
    }

    actionRef.current = "submit";
    setStage("submitting");
    setMessage(null);
    let updateAttempted = false;
    try {
      const current = await client.auth.getSession();
      const sessionContinuation = classifyAdminInviteContinuation(
        clientRef.current,
        client,
        clientGenerationRef.current,
        generation,
        deadline,
      );
      if (sessionContinuation === "superseded") return;
      if (sessionContinuation === "expired") {
        closeCurrentInvite(
          client,
          "invalid",
          "临时设置会话已经失效。请重新打开最新账户设置邮件。",
        );
        return;
      }
      const expiresAtMs = (current.data.session?.expires_at ?? 0) * 1000;
      if (
        current.error ||
        !current.data.session ||
        expiresAtMs <= Date.now() + inviteExpirySafetyMs
      ) {
        closeCurrentInvite(
          client,
          "invalid",
          "临时设置会话已经失效。请重新打开最新账户设置邮件。",
        );
        return;
      }

      if (Date.now() >= deadline) {
        closeCurrentInvite(
          client,
          "invalid",
          "临时设置会话已经失效。请重新打开最新账户设置邮件。",
        );
        return;
      }

      updateAttempted = true;
      updateMarkerRef.current = { client, generation };
      const update = await client.auth.updateUser({ password });
      const updateContinuation = classifyAdminInviteContinuation(
        clientRef.current,
        client,
        clientGenerationRef.current,
        generation,
        deadline,
      );
      if (updateContinuation === "superseded") return;
      if (updateContinuation === "expired") {
        closeCurrentInvite(client, "unconfirmed", null);
        return;
      }
      updateMarkerRef.current = null;
      if (update.error) {
        if (
          terminalInviteError(update.error) ||
          Date.now() >= deadline
        ) {
          closeCurrentInvite(
            client,
            "invalid",
            fixedInviteError(update.error),
          );
          return;
        }
        if (update.error.code === "weak_password") {
          actionRef.current = "idle";
          setPassword("");
          setConfirmation("");
          setMessage(fixedInviteError(update.error));
          setStage("ready");
          return;
        }
        closeCurrentInvite(client, "unconfirmed", null);
        return;
      }

      closeCurrentInvite(client, "complete", null);
    } catch (error) {
      const errorContinuation = classifyAdminInviteContinuation(
        clientRef.current,
        client,
        clientGenerationRef.current,
        generation,
        deadline,
      );
      if (errorContinuation === "superseded") return;
      if (updateAttempted) {
        closeCurrentInvite(client, "unconfirmed", null);
        return;
      }
      updateMarkerRef.current = null;
      if (
        terminalInviteError(error) ||
        errorContinuation === "expired"
      ) {
        closeCurrentInvite(client, "invalid", fixedInviteError(error));
        return;
      }
      actionRef.current = "idle";
      setPassword("");
      setConfirmation("");
      setMessage(fixedInviteError(error));
      setStage("ready");
    }
  }

  function cancelSetup() {
    if (actionRef.current !== "idle") return;
    actionRef.current = "cancel";
    const client = clientRef.current;
    if (!client) {
      actionRef.current = "closed";
      setStage("invalid");
      return;
    }
    closeCurrentInvite(
      client,
      "invalid",
      "设置已取消。需要继续时，请重新打开最新账户设置邮件。",
    );
  }

  const configured = Boolean(configResultRef.current?.config);
  const busy = stage === "submitting";

  return (
    <div className={styles.adminShell} lang="zh-CN">
      <button
        className={styles.skipLink}
        type="button"
        onClick={() => document.getElementById("admin-invite-main")?.focus()}
      >
        跳到主要内容
      </button>
      <AdminBrandHeader />
      <main id="admin-invite-main" className={styles.main} tabIndex={-1}>
        <div className={styles.pageIntro}>
          <div>
            <span className={styles.eyebrow}>一次性账户设置</span>
            <h1>设置私有后台密码</h1>
            <p>
              这个页面只用于验证最新的一次性账户设置链接并设置独立管理员密码，不读取任何询盘或客户资料。
            </p>
          </div>
        </div>

        {!configReady ? (
          <div className={styles.centerPanel} role="status" aria-live="polite">
            <LoaderCircle className={styles.spinner} size={28} aria-hidden="true" />
            <p>正在准备安全账户设置……</p>
          </div>
        ) : !configured ? (
          <section className={styles.authCard} aria-labelledby="invite-config-title">
            <div className={styles.authIcon}>
              <LockKeyhole size={24} aria-hidden="true" />
            </div>
            <h2 id="invite-config-title">账户设置尚未启用</h2>
            <p>Staging 的公开认证配置不完整。当前不会验证账户设置链接或发送密码。</p>
          </section>
        ) : stage === "initializing" ? (
          <div className={styles.centerPanel} role="status" aria-live="polite">
            <LoaderCircle className={styles.spinner} size={28} aria-hidden="true" />
            <p>正在检查一次性账户设置链接……</p>
          </div>
        ) : stage === "auth_unavailable" ? (
          <section className={styles.authCard} aria-labelledby="invite-storage-title">
            <div className={styles.authIcon}>
              <TriangleAlert size={24} aria-hidden="true" />
            </div>
            <h2 id="invite-storage-title">当前浏览器无法安全设置账户</h2>
            <p>当前浏览器无法完成安全认证初始化。请关闭此页并重新打开最新账户设置邮件。</p>
          </section>
        ) : stage === "complete" ? (
          <section className={styles.authCard} aria-labelledby="invite-complete-title">
            <div className={styles.authIcon}>
              <CheckCircle2 size={24} aria-hidden="true" />
            </div>
            <h2 id="invite-complete-title">密码已经设置</h2>
            <p>
              临时账户设置会话已退出。下一步请使用新密码登录，再绑定认证器动态验证码。
            </p>
            <a className={styles.primaryButton} href="/admin/">
              <ShieldCheck size={18} aria-hidden="true" />
              前往安全登录
            </a>
          </section>
        ) : stage === "unconfirmed" ? (
          <section className={styles.authCard} aria-labelledby="invite-unconfirmed-title">
            <div className={styles.authIcon}>
              <TriangleAlert size={24} aria-hidden="true" />
            </div>
            <h2 id="invite-unconfirmed-title">本页无法确认设置结果</h2>
            <p>
              设置请求返回时临时账户设置会话已经到期。密码可能已经保存；请先尝试使用刚才的密码登录，若失败再申请新的账户设置邮件。
            </p>
            <a className={styles.primaryButton} href="/admin/">
              <ShieldCheck size={18} aria-hidden="true" />
              前往安全登录
            </a>
          </section>
        ) : stage === "invalid" ? (
          <section className={styles.authCard} aria-labelledby="invite-invalid-title">
            <div className={styles.authIcon}>
              <TriangleAlert size={24} aria-hidden="true" />
            </div>
            <h2 id="invite-invalid-title">需要一封有效的最新账户设置邮件</h2>
            <p>
              {message ??
                "这个地址没有可用的一次性账户设置链接。请从最新收到的 Homeground Admin 账户设置邮件重新打开。"}
            </p>
          </section>
        ) : (
          <section className={styles.authCard} aria-labelledby="invite-password-title">
            <div className={styles.authIcon}>
              <KeyRound size={24} aria-hidden="true" />
            </div>
            <h2 id="invite-password-title">由你本人设置新密码</h2>
            <p>
              使用至少 14 个字符且未在其他网站使用过的密码。密码只发送给 Supabase Auth，
              不会写入本站数据库或聊天记录。
            </p>
            <form className={styles.form} onSubmit={submitPassword} noValidate>
              <PasswordField
                id="admin-new-password"
                label="新密码"
                value={password}
                visible={passwordVisible}
                onChange={setPassword}
                onToggle={() => setPasswordVisible((value) => !value)}
                describedBy="invite-password-message"
              />
              <PasswordField
                id="admin-confirm-password"
                label="再次输入新密码"
                value={confirmation}
                visible={confirmationVisible}
                onChange={setConfirmation}
                onToggle={() => setConfirmationVisible((value) => !value)}
                describedBy="invite-password-message"
              />
              <div
                id="invite-password-message"
                className={styles.formMessage}
                role={message ? "alert" : "status"}
                aria-live="polite"
              >
                {message ?? (busy ? "正在验证链接并设置密码……" : "\u00a0")}
              </div>
              <button className={styles.primaryButton} type="submit" disabled={busy}>
                {busy ? (
                  <LoaderCircle className={styles.spinner} size={18} aria-hidden="true" />
                ) : (
                  <ShieldCheck size={18} aria-hidden="true" />
                )}
                验证链接并设置密码
              </button>
              <button
                className={styles.secondaryButton}
                type="button"
                disabled={busy}
                onClick={cancelSetup}
              >
                取消设置
              </button>
            </form>
          </section>
        )}
      </main>
      <footer className={styles.footer}>
        <p>一次性设置页 · 不读取询盘 · 不记录账户设置令牌、密码或验证码</p>
      </footer>
    </div>
  );
}
