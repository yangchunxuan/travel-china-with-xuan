"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  Copy,
  Database,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import {
  AdminApiError,
  type AdminConfig,
  type AdminHealthCheck,
  type AdminHealthResponse,
  type AdminHealthStatus,
  type AdminInsightsResponse,
  type AdminMetric,
  type AdminMetricOption,
  createAdminAuthClient,
  fetchAdminHealth,
  fetchAdminInsights,
  getAdminConfig,
} from "../../lib/adminClient";
import { selectUnverifiedTotpFactors } from "../../lib/adminMfa";
import { canCommitAdminResponse } from "../../lib/adminRequestEpoch";
import styles from "./AdminInsightsPage.module.css";

type AuthStage =
  | "initializing"
  | "auth_unavailable"
  | "signed_out"
  | "mfa_challenge"
  | "mfa_enroll_needed"
  | "mfa_enrolling"
  | "ready";

interface EnrollmentState {
  factorId: string;
  qrCode: string;
  secret: string;
}

interface RequestState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const initialRequestState = {
  data: null,
  error: null,
  loading: false,
};
const inactivityLimitMs = 15 * 60 * 1000;

const numberFormatter = new Intl.NumberFormat("zh-CN");
const percentFormatter = new Intl.NumberFormat("zh-CN", {
  maximumFractionDigits: 1,
});
const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
  timeStyle: "medium",
  timeZone: "Asia/Shanghai",
});
const dayFormatter = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
  timeZone: "Asia/Shanghai",
});

const metricCopy: Record<
  string,
  { title: string; description: string }
> = {
  destination_selections: {
    title: "目的地选择",
    description:
      "每个目的地被选择的次数。一份询盘可选择多个目的地，因此比例合计可能超过 100%。",
  },
  trip_duration: {
    title: "旅行时长",
    description: "按可兼容提取的总住宿晚数分组。",
  },
  party: {
    title: "同行人员",
    description: "只统计新版目的地 Planner 的受控选项。",
  },
  pace: {
    title: "旅行节奏",
    description: "只统计新版目的地 Planner 的受控选项。",
  },
  stay_time_reference_match: {
    title: "停留时间参考匹配",
    description:
      "只比较总晚数与已选目的地的停留时间参考，不验证交通、顺序、门票或路线实际可执行性。",
  },
  must_see_selections: {
    title: "明确标为必去的目的地",
    description:
      "每个目的地被明确标为 Must-see 的次数；一份询盘可以有多个 Must-see。",
  },
  reply_channel_choice: {
    title: "回复渠道选择",
    description:
      "只表示提交表单时选择由 Email 或 WhatsApp 接收回复，不代表后续对话或首次来源。",
  },
  form_locale: {
    title: "提交界面语言",
    description:
      "只表示提交表单时看到的界面语言，不代表国籍、居住地或母语。",
  },
};

const optionCopy: Record<string, string> = {
  "beijing-great-wall": "北京与长城",
  shanghai: "上海",
  xian: "西安",
  chengdu: "成都",
  chongqing: "重庆",
  zhangjiajie: "张家界",
  "guilin-yangshuo": "桂林与阳朔",
  "hangzhou-suzhou": "杭州与苏州",
  "yunnan-dali-lijiang": "云南：大理与丽江",
  "guangzhou-shenzhen": "广州与深圳",
  "1-7": "1–7 晚",
  "8-10": "8–10 晚",
  "11-14": "11–14 晚",
  "15-21": "15–21 晚",
  "22-plus": "22 晚以上",
  solo: "独自旅行",
  "two-adults": "两位成人",
  "family-with-children": "有儿童的家庭",
  "older-relatives": "与年长亲属同行",
  "multigenerational-family": "多代家庭",
  "friends-private-group": "朋友或私人小团",
  essentials: "重点体验（Essentials）",
  classic: "经典节奏（Classic）",
  unhurried: "从容节奏（Unhurried）",
  needs_prioritization: "需要取舍（Needs prioritization）",
  tighter_than_selected_pace:
    "比所选节奏更紧（Tighter than selected pace）",
  within_reference_range: "在参考范围内（Within reference range）",
  room_to_shape: "仍有调整空间（Room to shape）",
  partial_manual_check: "需要部分人工检查（Partial manual check）",
  manual_only: "仅能人工检查（Manual only）",
  email: "Email",
  whatsapp: "WhatsApp",
  en: "English",
  zh: "简体中文",
  ko: "한국어",
};

const healthStatusCopy: Record<
  AdminHealthStatus,
  { label: string; icon: typeof CheckCircle2 }
> = {
  ok: { label: "已验证", icon: CheckCircle2 },
  attention: { label: "需要留意", icon: AlertTriangle },
  action_required: { label: "需要处理", icon: XCircle },
  unknown: { label: "状态未知", icon: TriangleAlert },
  not_verified: { label: "未直接验证", icon: Clock3 },
};

const environmentCopy: Record<AdminHealthResponse["environment"], string> = {
  production: "生产环境",
  staging: "预发布环境",
  development: "开发环境",
  unconfigured: "未配置环境",
};

const healthCheckTitle: Record<AdminHealthCheck["id"], string> = {
  admin_api_reachable: "管理健康接口可访问",
  database_summary_readable: "数据库健康汇总可读取",
  production_intake_configuration: "生产接收配置",
  production_write_path: "生产写入链路",
  notification_outbox: "内部通知队列",
  retained_submission_activity: "当前保留的询盘活动",
  retention_cleanup: "保留期数据清理",
  backup_restore: "备份恢复演练",
  isolated_e2e_canary: "隔离环境端到端检查",
  data_quality_hold: "数据质量暂停",
};

function healthCheckSummary(check: AdminHealthCheck): string {
  switch (check.id) {
    case "admin_api_reachable":
      return "本次已认证请求成功到达管理健康接口。";
    case "database_summary_readable":
      return "受限数据库健康汇总已读取，并与当前数据合约匹配。";
    case "production_intake_configuration":
      if (check.status === "ok") {
        return "服务器配置允许接收当前支持的表单与隐私声明版本。";
      }
      if (check.status === "attention") {
        return "服务器 Kill Switch 正在有意暂停接收询盘。";
      }
      if (check.status === "action_required") {
        return "当前表单或隐私声明版本未被生产接收配置允许，需要处理。";
      }
      return "生产接收配置快照不完整，当前无法确认。";
    case "production_write_path":
      return "没有运行会写入生产数据的探针，因此真实生产写入链路未被直接验证。";
    case "notification_outbox":
      return "状态来自受限队列汇总；数量和 Provider Accepted 的边界见下方。";
    case "retained_submission_activity":
      return "近期保留数量只用于观察活动，不用于判断系统是否健康。";
    case "retention_cleanup":
      if (check.status === "ok") {
        return "最近一次清理在规定时限内成功，且未报告待复制的删除墓碑。";
      }
      if (check.status === "attention") {
        return "保留期清理正在运行，请在完成后重新检查。";
      }
      if (check.status === "not_verified") {
        return "尚未记录保留期清理运行，不能声称该机制已经验证。";
      }
      return "最近清理失败、过期或仍有待复制删除记录；请按技术来源核查。";
    case "backup_restore":
      if (check.status === "ok") {
        return "最近一次隔离备份恢复演练在规定周期内成功；这不证明每份备份都可恢复。";
      }
      if (check.status === "attention") {
        return "已有成功记录，但距离现在超过规定周期，需要重新演练。";
      }
      if (check.status === "action_required") {
        return "最近一次备份恢复演练失败，需要处理。";
      }
      return "尚未记录隔离备份恢复演练，恢复能力未被验证。";
    case "isolated_e2e_canary":
      if (check.status === "ok") {
        return "最近一次隔离端到端检查在规定周期内成功；它不直接验证生产写入。";
      }
      if (check.status === "attention") {
        return "已有成功记录，但距离现在超过规定周期，需要重新检查。";
      }
      if (check.status === "action_required") {
        return "最近一次隔离端到端检查失败，需要处理。";
      }
      return "尚未记录隔离端到端检查，完整接收链路未被验证。";
    case "data_quality_hold":
      return check.status === "action_required"
        ? "存在未关闭的数据质量事件；暂停用本窗口作内容或产品决策。"
        : "当前没有已记录且仍开放的数据质量事件。";
  }
}

function healthHeadline(health: AdminHealthResponse): string {
  if (health.actionRequired) {
    return "至少一项明确列出的检查返回“需要处理”。请先处理对应项目，再使用下方业务汇总。";
  }
  if (
    health.checks.some(
      (check) =>
        check.status === "attention" ||
        check.status === "unknown" ||
        check.status === "not_verified",
    )
  ) {
    return "没有检查返回“需要处理”，但仍有需要留意、状态未知或未直接验证的项目。";
  }
  return "所有明确列出的检查均未报告异常；这不等于证明系统其他部分没有问题。";
}

function formatDate(value: string | null, dateOnly = false): string {
  if (!value) return "没有记录";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "时间不可用";
  return (dateOnly ? dayFormatter : dateFormatter).format(date);
}

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "没有排队记录";
  if (seconds < 60) return `${numberFormatter.format(seconds)} 秒`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${numberFormatter.format(minutes)} 分钟`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${numberFormatter.format(hours)} 小时`;
  return `${numberFormatter.format(Math.floor(hours / 24))} 天`;
}

function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "";
  if (
    code === "invalid_credentials" ||
    code === "invalid_login_credentials"
  ) {
    return "邮箱或密码不正确。请检查后重试。";
  }
  if (
    code === "over_request_rate_limit" ||
    code === "over_email_send_rate_limit"
  ) {
    return "尝试次数过多。请稍后再试。";
  }
  if (
    code === "mfa_verification_failed" ||
    code === "mfa_challenge_expired"
  ) {
    return "验证码不正确或已经过期。请等待验证码刷新后重试。";
  }
  return "验证没有完成。请重试；如果问题持续，请由管理员检查认证配置。";
}

function apiErrorMessage(error: unknown): string {
  if (!(error instanceof AdminApiError)) {
    return "暂时无法读取后台数据。请稍后重试。";
  }
  switch (error.kind) {
    case "unauthorized":
      return "登录会话已经失效，请重新登录。";
    case "forbidden":
      return "这个账户没有查看私有后台的权限。";
    case "rate_limited":
      return "刷新过于频繁，请稍后再试。";
    case "contract":
      return "后台返回的数据格式与已批准版本不一致。为避免误读，页面已停止显示这部分数据。";
    default:
      return "暂时无法连接后台服务。请稍后重试。";
  }
}

function makeQrCodeUrl(qrCode: string): string {
  if (qrCode.startsWith("data:image/")) return qrCode;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(qrCode)}`;
}

function BrandHeader({
  onSignOut,
  showSignOut,
}: {
  onSignOut: () => void;
  showSignOut: boolean;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand} aria-label="Homeground China">
          <span className={styles.brandMark} aria-hidden="true">
            <span />
          </span>
          <span className={styles.brandCopy}>
            <strong>Homeground</strong>
            <small>Private admin</small>
          </span>
        </div>
        {showSignOut ? (
          <button
            className={styles.quietButton}
            type="button"
            onClick={onSignOut}
          >
            <LogOut size={18} aria-hidden="true" />
            安全退出
          </button>
        ) : null}
      </div>
    </header>
  );
}

function PageIntro() {
  return (
    <div className={styles.pageIntro}>
      <div>
        <span className={styles.eyebrow}>仅限负责人访问</span>
        <h1>已保存询盘洞察</h1>
        <p>
          这里汇总网站成功保存且目前仍保留的询盘选择，并检查内部接收链路。
          它不是访客分析、平台归因或客户跟进系统。
        </p>
      </div>
      <div className={styles.boundaryBadge}>
        <ShieldCheck size={20} aria-hidden="true" />
        不显示单条客户资料
      </div>
    </div>
  );
}

function LoadingPanel({ message }: { message: string }) {
  return (
    <div className={styles.centerPanel} role="status" aria-live="polite">
      <LoaderCircle
        className={styles.spinner}
        size={28}
        aria-hidden="true"
      />
      <p>{message}</p>
    </div>
  );
}

function ConfigPanel({
  missing,
  invalid,
}: {
  missing: string[];
  invalid: string[];
}) {
  return (
    <section className={styles.authCard} aria-labelledby="config-title">
      <div className={styles.authIcon}>
        <LockKeyhole size={24} aria-hidden="true" />
      </div>
      <h2 id="config-title">私有后台尚未启用</h2>
      <p>
        页面本身已经可以使用，但正式认证或两个只读数据地址还没有完整配置。
        当前不会发出任何业务数据请求。
      </p>
      <div className={styles.notice} role="status">
        <strong>需要部署人员完成：</strong>
        <ul>
          {missing.map((name) => (
            <li key={name}>{name}</li>
          ))}
          {invalid.map((name) => (
            <li key={name}>{name} 的网址格式不安全或不正确</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LoginPanel({
  busy,
  error,
  onSubmit,
}: {
  busy: boolean;
  error: string | null;
  onSubmit: (email: string, password: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setFieldError("请输入管理员邮箱和密码。");
      return;
    }
    setFieldError(null);
    const submittedPassword = password;
    setPassword("");
    await onSubmit(normalizedEmail, submittedPassword);
  }

  const visibleError = fieldError ?? error;

  return (
    <section className={styles.authCard} aria-labelledby="login-title">
      <div className={styles.authIcon}>
        <LockKeyhole size={24} aria-hidden="true" />
      </div>
      <h2 id="login-title">登录私有后台</h2>
      <p>先使用独立管理员账户登录。登录后仍需完成动态验证码验证。</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="admin-email">管理员邮箱</label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby={visibleError ? "login-error" : undefined}
            aria-invalid={Boolean(visibleError)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="admin-password">密码</label>
          <div className={styles.passwordField}>
            <input
              id="admin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby={visibleError ? "login-error" : undefined}
              aria-invalid={Boolean(visibleError)}
            />
            <button
              className={styles.iconButton}
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "隐藏密码" : "显示密码"}
            >
              {showPassword ? (
                <EyeOff size={19} aria-hidden="true" />
              ) : (
                <Eye size={19} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div
          id="login-error"
          className={styles.formMessage}
          role={visibleError ? "alert" : "status"}
          aria-live="polite"
        >
          {visibleError ?? (busy ? "正在安全登录……" : "\u00a0")}
        </div>
        <button className={styles.primaryButton} type="submit">
          {busy ? (
            <LoaderCircle
              className={styles.spinner}
              size={18}
              aria-hidden="true"
            />
          ) : (
            <KeyRound size={18} aria-hidden="true" />
          )}
          继续
        </button>
      </form>
    </section>
  );
}

function AuthUnavailablePanel({ message }: { message: string | null }) {
  return (
    <section className={styles.authCard} aria-labelledby="auth-error-title">
      <div className={styles.authIcon}>
        <TriangleAlert size={24} aria-hidden="true" />
      </div>
      <h2 id="auth-error-title">当前浏览器无法开启安全会话</h2>
      <p>
        后台需要在当前标签页的临时存储中保存登录会话。请确认浏览器允许网站存储，
        然后重新打开页面；不要因此把密钥写进网址或共享文件。
      </p>
      <div className={styles.dangerBanner} role="alert">
        <XCircle size={22} aria-hidden="true" />
        <div>
          <strong>认证尚未启动</strong>
          <p>{message ?? "当前不会请求任何后台业务数据。"}</p>
        </div>
      </div>
    </section>
  );
}

function TotpCodeField({
  id,
  value,
  onChange,
  errorId,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  errorId: string;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>认证器中的 6 位动态验证码</label>
      <input
        id={id}
        name="totp-code"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        maxLength={6}
        value={value}
        onChange={(event) =>
          onChange(event.target.value.replace(/\D/g, "").slice(0, 6))
        }
        aria-describedby={errorId}
      />
    </div>
  );
}

function MfaChallengePanel({
  busy,
  error,
  onVerify,
  onSignOut,
}: {
  busy: boolean;
  error: string | null;
  onVerify: (code: string) => Promise<void>;
  onSignOut: () => void;
}) {
  const [code, setCode] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!/^\d{6}$/.test(code)) {
      setFieldError("请输入认证器当前显示的 6 位数字。");
      return;
    }
    setFieldError(null);
    const submittedCode = code;
    setCode("");
    await onVerify(submittedCode);
  }

  const visibleError = fieldError ?? error;
  return (
    <section className={styles.authCard} aria-labelledby="mfa-title">
      <div className={styles.authIcon}>
        <Smartphone size={24} aria-hidden="true" />
      </div>
      <h2 id="mfa-title">完成第二步验证</h2>
      <p>
        打开此前绑定的认证器应用，输入 Homeground Admin 当前显示的动态验证码。
      </p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <TotpCodeField
          id="mfa-code"
          value={code}
          onChange={setCode}
          errorId="mfa-error"
        />
        <div
          id="mfa-error"
          className={styles.formMessage}
          role={visibleError ? "alert" : "status"}
          aria-live="polite"
        >
          {visibleError ?? (busy ? "正在验证……" : "\u00a0")}
        </div>
        <button className={styles.primaryButton} type="submit">
          {busy ? (
            <LoaderCircle
              className={styles.spinner}
              size={18}
              aria-hidden="true"
            />
          ) : (
            <ShieldCheck size={18} aria-hidden="true" />
          )}
          验证并进入
        </button>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={onSignOut}
        >
          返回并退出
        </button>
      </form>
    </section>
  );
}

function MfaEnrollmentPanel({
  enrollment,
  busy,
  error,
  onStart,
  onVerify,
  onCancel,
}: {
  enrollment: EnrollmentState | null;
  busy: boolean;
  error: string | null;
  onStart: () => Promise<void>;
  onVerify: (code: string) => Promise<void>;
  onCancel: () => Promise<void>;
}) {
  const [code, setCode] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [secretVisible, setSecretVisible] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!/^\d{6}$/.test(code)) {
      setFieldError("请输入认证器当前显示的 6 位数字。");
      return;
    }
    setFieldError(null);
    const submittedCode = code;
    setCode("");
    await onVerify(submittedCode);
  }

  async function copySecret() {
    if (!enrollment || !navigator.clipboard) {
      setCopyStatus("浏览器不能自动复制，请手动输入密钥。");
      return;
    }
    try {
      await navigator.clipboard.writeText(enrollment.secret);
      setCopyStatus("密钥已复制。请只粘贴到可信认证器中。");
    } catch {
      setCopyStatus("复制失败，请手动输入密钥。");
    }
  }

  if (!enrollment) {
    return (
      <section className={styles.authCard} aria-labelledby="enroll-title">
        <div className={styles.authIcon}>
          <Smartphone size={24} aria-hidden="true" />
        </div>
        <h2 id="enroll-title">首次设置动态验证码</h2>
        <p>
          这个管理员账户还没有完成双重验证。下一步会生成一次性二维码，
          请使用可信的认证器应用扫描。
        </p>
        <div className={styles.notice}>
          <strong>开始前请确认：</strong>
          <ul>
            <li>认证器设备由负责人本人控制；</li>
            <li>不要截图、转发或把密钥贴入聊天工具；</li>
            <li>未完成的旧设置会被安全替换，不会创建第二个业务账户。</li>
          </ul>
        </div>
        <div
          className={styles.formMessage}
          role={error ? "alert" : "status"}
          aria-live="polite"
        >
          {error ?? (busy ? "正在生成安全设置……" : "\u00a0")}
        </div>
        <div className={styles.buttonStack}>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={() => void onStart()}
          >
            {busy ? (
              <LoaderCircle
                className={styles.spinner}
                size={18}
                aria-hidden="true"
              />
            ) : (
              <ShieldCheck size={18} aria-hidden="true" />
            )}
            开始安全设置
          </button>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => void onCancel()}
          >
            取消并退出
          </button>
        </div>
      </section>
    );
  }

  const visibleError = fieldError ?? error;
  return (
    <section
      className={`${styles.authCard} ${styles.enrollmentCard}`}
      aria-labelledby="enroll-verify-title"
    >
      <div className={styles.authIcon}>
        <Smartphone size={24} aria-hidden="true" />
      </div>
      <h2 id="enroll-verify-title">扫描二维码并验证</h2>
      <p>
        先把二维码加入认证器，再输入认证器显示的 6 位数字。验证成功前不会开放后台数据。
      </p>
      <div className={styles.qrFrame}>
        {/* Supabase returns a locally rendered SVG; it is never sent to an image host. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={makeQrCodeUrl(enrollment.qrCode)}
          width={232}
          height={232}
          alt="用于绑定 Homeground Admin 的动态验证码二维码"
        />
      </div>
      <div className={styles.secretBlock}>
        <label htmlFor="totp-secret">无法扫码时手动输入密钥</label>
        <div className={styles.secretRow}>
          <input
            id="totp-secret"
            type={secretVisible ? "text" : "password"}
            value={enrollment.secret}
            readOnly
            autoComplete="off"
            spellCheck={false}
          />
          <button
            className={styles.iconButton}
            type="button"
            onClick={() => setSecretVisible((value) => !value)}
            aria-label={secretVisible ? "隐藏设置密钥" : "显示设置密钥"}
          >
            {secretVisible ? (
              <EyeOff size={19} aria-hidden="true" />
            ) : (
              <Eye size={19} aria-hidden="true" />
            )}
          </button>
          <button
            className={styles.iconButton}
            type="button"
            onClick={() => void copySecret()}
            aria-label="复制设置密钥"
          >
            <Copy size={19} aria-hidden="true" />
          </button>
        </div>
        <p className={styles.copyStatus} aria-live="polite">
          {copyStatus || "\u00a0"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleVerify} noValidate>
        <TotpCodeField
          id="enroll-code"
          value={code}
          onChange={setCode}
          errorId="enroll-error"
        />
        <div
          id="enroll-error"
          className={styles.formMessage}
          role={visibleError ? "alert" : "status"}
          aria-live="polite"
        >
          {visibleError ?? (busy ? "正在验证并保护账户……" : "\u00a0")}
        </div>
        <button className={styles.primaryButton} type="submit">
          {busy ? (
            <LoaderCircle
              className={styles.spinner}
              size={18}
              aria-hidden="true"
            />
          ) : (
            <ShieldCheck size={18} aria-hidden="true" />
          )}
          完成设置并进入
        </button>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => void onCancel()}
        >
          取消设置并退出
        </button>
      </form>
    </section>
  );
}

function StatusPill({ status }: { status: AdminHealthStatus }) {
  const copy = healthStatusCopy[status];
  const Icon = copy.icon;
  return (
    <span className={styles.statusPill} data-status={status}>
      <Icon size={16} aria-hidden="true" />
      {copy.label}
    </span>
  );
}

function HealthCheckCard({ check }: { check: AdminHealthCheck }) {
  return (
    <li className={styles.healthCheck}>
      <div className={styles.healthCheckHeading}>
        <h3>{healthCheckTitle[check.id]}</h3>
        <StatusPill status={check.status} />
      </div>
      <p>{healthCheckSummary(check)}</p>
      <dl className={styles.compactMeta}>
        <div>
          <dt>权威来源</dt>
          <dd>{check.authority}</dd>
        </div>
        <div>
          <dt>检查时间</dt>
          <dd>
            <time dateTime={check.checkedAt}>
              {formatDate(check.checkedAt)}
            </time>
          </dd>
        </div>
      </dl>
    </li>
  );
}

function SystemHealthSection({
  state,
}: {
  state: RequestState<AdminHealthResponse>;
}) {
  const health = state.data;
  const hasAttention = Boolean(
    health?.checks.some(
      (check) =>
        check.status === "attention" ||
        check.status === "unknown" ||
        check.status === "not_verified",
    ),
  );
  return (
    <section
      id="system-health"
      className={styles.section}
      aria-labelledby="system-health-title"
      aria-busy={state.loading}
    >
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.eyebrow}>先看异常，再看汇总</span>
          <h2 id="system-health-title">系统运行状态</h2>
        </div>
        {health ? (
          <div className={styles.checkedAt}>
            环境：{environmentCopy[health.environment]}
            <br />
            北京时间检查于{" "}
            <time dateTime={health.checkedAt}>
              {formatDate(health.checkedAt)}
            </time>
          </div>
        ) : null}
      </div>

      {state.loading && !health ? (
        <LoadingPanel message="正在读取系统状态……" />
      ) : null}
      {state.error ? (
        <div className={styles.dangerBanner} role="alert">
          <XCircle size={22} aria-hidden="true" />
          <div>
            <strong>系统状态当前不可读</strong>
            <p>{state.error}</p>
          </div>
        </div>
      ) : null}
      {health ? (
        <>
          <div
            className={
              health.actionRequired
                ? styles.dangerBanner
                : hasAttention
                  ? styles.attentionBanner
                  : styles.healthBanner
            }
            role={health.actionRequired ? "alert" : "status"}
          >
            {health.actionRequired ? (
              <XCircle size={22} aria-hidden="true" />
            ) : hasAttention ? (
              <AlertTriangle size={22} aria-hidden="true" />
            ) : (
              <CheckCircle2 size={22} aria-hidden="true" />
            )}
            <div>
              <strong>
                {health.actionRequired
                  ? "需要处理"
                  : hasAttention
                    ? "仍有未验证或需留意项目"
                    : "没有已报告的异常"}
              </strong>
              <p>{healthHeadline(health)}</p>
            </div>
          </div>
          <p className={styles.authorityNote}>
            这个结论只来自下方明确列出的检查，不会因为近期有没有询盘就推断系统健康。
          </p>

          {health.dataQualityHold.active ? (
            <div className={styles.holdBanner} role="alert">
              <TriangleAlert size={22} aria-hidden="true" />
              <div>
                <strong>DATA QUALITY HOLD — 暂停业务解读</strong>
                <p>
                  当前窗口存在已确认的数据质量事件。先处理事件，不要用选择汇总调整内容或产品。
                </p>
              </div>
            </div>
          ) : null}

          <ul className={styles.healthGrid} aria-label="独立系统检查">
            {health.checks.map((check) => (
              <HealthCheckCard key={check.id} check={check} />
            ))}
          </ul>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeading}>
              <div>
                <h3>内部通知队列</h3>
                <p>
                  Provider Accepted
                  仅表示内部通知供应商接受发送请求，不表示送达、阅读或客户回复。
                </p>
              </div>
              <Activity size={22} aria-hidden="true" />
            </div>
            <dl className={styles.statGrid}>
              <StatItem label="Queued" value={health.outbox.queued} />
              <StatItem label="Processing" value={health.outbox.processing} />
              <StatItem
                label="Provider Accepted"
                value={health.outbox.providerAccepted}
              />
              <StatItem
                label="Failed"
                value={health.outbox.failed}
                danger={health.outbox.failed > 0}
              />
              <StatItem
                label="Overdue"
                value={health.outbox.overdue}
                danger={health.outbox.overdue > 0}
              />
              <StatItem
                label="Expired"
                value={health.outbox.expired}
                danger={health.outbox.expired > 0}
              />
            </dl>
            <p className={styles.smallNote}>
              最早仍在排队的记录已等待：
              {formatDuration(health.outbox.oldestQueuedAgeSeconds)}
            </p>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeading}>
              <div>
                <h3>近期仍保留的保存记录</h3>
                <p>
                  这些数字只是当前数据库计数，删除后可能回落；它们不能证明写入健康，也不代表不同真人。
                </p>
              </div>
              <Database size={22} aria-hidden="true" />
            </div>
            <dl className={styles.statGrid}>
              <StatItem
                label="过去 10 分钟"
                value={health.retainedCounts.past10Minutes}
              />
              <StatItem
                label="过去 1 小时"
                value={health.retainedCounts.past1Hour}
              />
              <StatItem
                label="过去 24 小时"
                value={health.retainedCounts.past24Hours}
              />
            </dl>
          </div>
        </>
      ) : null}
    </section>
  );
}

function StatItem({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: number;
  danger?: boolean;
}) {
  return (
    <div className={styles.statItem} data-danger={danger || undefined}>
      <dt>{label}</dt>
      <dd>{numberFormatter.format(value)}</dd>
    </div>
  );
}

function MetricOption({
  option,
  percentagesVisible,
}: {
  option: AdminMetricOption;
  percentagesVisible: boolean;
}) {
  const label = optionCopy[option.id] ?? option.id;
  const showPercentage =
    percentagesVisible &&
    option.percentage !== null &&
    !option.suppressed;
  return (
    <li className={styles.metricOption}>
      <div className={styles.metricOptionLine}>
        <span>{label}</span>
        <strong>
          {option.suppressed || option.count === null
            ? "已抑制"
            : `${numberFormatter.format(option.count)} 次${
                showPercentage
                  ? ` · ${percentFormatter.format(option.percentage ?? 0)}%`
                  : ""
              }`}
        </strong>
      </div>
      {showPercentage ? (
        <div
          className={styles.barTrack}
          role="img"
          aria-label={`${label}：${percentFormatter.format(
            option.percentage ?? 0,
          )}%`}
        >
          <span
            className={styles.barFill}
            style={{ inlineSize: `${option.percentage}%` }}
          />
        </div>
      ) : null}
    </li>
  );
}

function MetricCard({
  metric,
  startsAt,
  endsAt,
}: {
  metric: AdminMetric;
  startsAt: string;
  endsAt: string;
}) {
  const copy = metricCopy[metric.id] ?? {
    title: metric.id,
    description: "",
  };
  return (
    <article className={styles.metricCard}>
      <div className={styles.metricHeading}>
        <div>
          <h3>{copy.title}</h3>
          <p>{copy.description}</p>
        </div>
        {metric.insufficientSample ? (
          <span className={styles.sampleBadge}>低样本或互补抑制，不排名</span>
        ) : null}
      </div>

      <dl className={styles.metricDenominators}>
        <div>
          <dt>兼容且当前保留的提交记录（分母）</dt>
          <dd>
            {metric.denominator === null
              ? "已抑制"
              : numberFormatter.format(metric.denominator)}
          </dd>
        </div>
        <div>
          <dt>Unknown</dt>
          <dd>
            {metric.unknown === null
              ? "已抑制"
              : numberFormatter.format(metric.unknown)}
          </dd>
        </div>
        <div>
          <dt>Not applicable</dt>
          <dd>
            {metric.notApplicable === null
              ? "已抑制"
              : numberFormatter.format(metric.notApplicable)}
          </dd>
        </div>
      </dl>

      {metric.insufficientSample ? (
        <div className={styles.suppressedPanel}>
          为降低低样本误判和稀疏值反推风险，本卡不显示选项排序。
        </div>
      ) : (
        <ul className={styles.metricOptions}>
          {metric.buckets.map((option) => (
            <MetricOption
              key={option.id}
              option={option}
              percentagesVisible={metric.percentagesVisible}
            />
          ))}
        </ul>
      )}

      {!metric.insufficientSample && !metric.percentagesVisible ? (
        <p className={styles.smallNote}>
          当前兼容分母不足 20，因此只显示允许显示的计数，不显示百分比。
        </p>
      ) : null}
      {metric.multiSelect ? (
        <p className={styles.smallNote}>
          百分比含义：% of retained saved submissions selecting this
          option（选择该选项的当前保留提交记录占比）。这是多选题，合计可以超过
          100%，不是市场份额。
        </p>
      ) : null}

      <details className={styles.versionDetails}>
        <summary>查看兼容版本与统计边界</summary>
        <dl>
          <div>
            <dt>实际统计窗口（北京时间）</dt>
            <dd>
              <time dateTime={startsAt}>{formatDate(startsAt, true)}</time>
              {" — "}
              <time dateTime={endsAt}>{formatDate(endsAt, true)}</time>
            </dd>
          </div>
          {metric.compatibilitySets.map((compatibilitySet, index) => (
            <div
              key={[
                compatibilitySet.schemaVersion,
                compatibilitySet.entryPath,
                compatibilitySet.formVersion,
                compatibilitySet.ruleVersion,
              ].join(":")}
            >
              <dt>兼容组合 {index + 1}</dt>
              <dd>
                Schema {compatibilitySet.schemaVersion}
                {" · "}
                {compatibilitySet.entryPath}
                {" · Form "}
                {compatibilitySet.formVersion}
                {" · Rule "}
                {compatibilitySet.ruleVersion}
              </dd>
            </div>
          ))}
        </dl>
        <p>
          Unknown 表示本应兼容但字段缺失或无法解析；Not applicable
          表示版本不兼容。两者都不会被猜测或分摊。
        </p>
      </details>
      <p className={styles.smallNote}>
        本卡统计当前仍保留的保存记录，不代表不同真人、客户或市场份额。
      </p>
    </article>
  );
}

function SummarySection({
  state,
  healthHoldActive,
}: {
  state: RequestState<AdminInsightsResponse>;
  healthHoldActive: boolean;
}) {
  const insights = state.data;
  const holdActive =
    healthHoldActive || Boolean(insights?.dataQualityHold.active);
  return (
    <section
      id="saved-inquiry-summary"
      className={styles.section}
      aria-labelledby="summary-title"
      aria-busy={state.loading}
    >
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.eyebrow}>固定滚动窗口</span>
          <h2 id="summary-title">过去 90 天的选择汇总</h2>
        </div>
        {insights ? (
          <div className={styles.checkedAt}>
            北京时间生成于{" "}
            <time dateTime={insights.generatedAt}>
              {formatDate(insights.generatedAt)}
            </time>
          </div>
        ) : null}
      </div>
      <div className={styles.scopeNotice}>
        <BarChart3 size={22} aria-hidden="true" />
        <p>
          <strong>Saved submissions, not unique people, customers, or market share.</strong>
          <br />
          下面是当前仍保留的已保存提交记录，不是不同访客、真实客户、成交或市场需求。
          <br />
          这些汇总仍按受限数据处理；不要连续刷新，也不要把数字变化与通知时间对齐来推断单条询盘。
        </p>
      </div>

      {state.loading && !insights ? (
        <LoadingPanel message="正在读取 90 天汇总……" />
      ) : null}
      {state.error ? (
        <div className={styles.dangerBanner} role="alert">
          <XCircle size={22} aria-hidden="true" />
          <div>
            <strong>选择汇总当前不可读</strong>
            <p>{state.error}</p>
          </div>
        </div>
      ) : null}

      {insights ? (
        <>
          <div className={styles.coveragePanel}>
            <div>
              <span>实际覆盖日期</span>
              <strong>
                <time dateTime={insights.window.startsAt}>
                  {formatDate(insights.window.startsAt, true)}
                </time>
                {" — "}
                <time dateTime={insights.window.endsAt}>
                  {formatDate(insights.window.endsAt, true)}
                </time>
              </strong>
            </div>
            {insights.window.collectingBaseline ? (
              <span className={styles.baselineBadge}>
                Collecting baseline · 正在积累首轮基线
              </span>
            ) : (
              <span className={styles.baselineBadge}>完整 90 天窗口</span>
            )}
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionHeading}>
              <div>
                <h3>当前仍保留的保存记录</h3>
                <p>
                  这些是技术计数；到期删除或权利请求删除后，过去窗口的数字可以回落。
                </p>
              </div>
              <Database size={22} aria-hidden="true" />
            </div>
            <dl className={styles.statGrid}>
              <StatItem
                label="今天"
                value={insights.retainedCounts.today}
              />
              <StatItem
                label="过去 7 天"
                value={insights.retainedCounts.past7Days}
              />
              <StatItem
                label="过去 30 天"
                value={insights.retainedCounts.past30Days}
              />
            </dl>
          </div>

          {holdActive ? (
            <div className={styles.holdBanner} role="alert">
              <TriangleAlert size={22} aria-hidden="true" />
              <div>
                <strong>DATA QUALITY HOLD — 选择分布暂不显示</strong>
                <p>
                  当前窗口存在数据质量事件。为避免错误决策，请先处理事件，再恢复查看选择分布。
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.metricsGrid}>
              {insights.metrics.length > 0 ? (
                insights.metrics.map((metric) => (
                  <MetricCard
                    key={metric.id}
                    metric={metric}
                    startsAt={insights.window.startsAt}
                    endsAt={insights.window.endsAt}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  当前没有达到展示条件的兼容汇总。继续积累已保存询盘，不要用空白推断网站故障。
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </section>
  );
}

function Dashboard({
  healthState,
  insightsState,
  onRefresh,
  accessDenied,
}: {
  healthState: RequestState<AdminHealthResponse>;
  insightsState: RequestState<AdminInsightsResponse>;
  onRefresh: () => void;
  accessDenied: boolean;
}) {
  if (accessDenied) {
    return (
      <section className={styles.accessDenied} role="alert">
        <LockKeyhole size={28} aria-hidden="true" />
        <h2>这个账户没有后台访问权限</h2>
        <p>
          登录本身已经成功，但服务器的固定 User ID
          白名单拒绝了业务数据读取。请不要创建共享账户或把密钥放进浏览器。
        </p>
      </section>
    );
  }
  const refreshing = healthState.loading || insightsState.loading;
  return (
    <>
      <div className={styles.toolbar}>
        <p>
          页面每次只读取两个只读地址：系统健康与 90 天汇总。不会读取单条询盘。
        </p>
        <button
          className={styles.refreshButton}
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={refreshing ? styles.spinner : undefined}
            size={18}
            aria-hidden="true"
          />
          刷新两项数据
        </button>
      </div>
      <div className={styles.liveStatus} role="status" aria-live="polite">
        {refreshing ? "正在刷新私有后台数据……" : ""}
      </div>
      <SystemHealthSection state={healthState} />
      <SummarySection
        state={insightsState}
        healthHoldActive={Boolean(healthState.data?.dataQualityHold.active)}
      />
    </>
  );
}

export function AdminInsightsPage() {
  const configResult = useMemo(() => getAdminConfig(), []);
  const clientRef = useRef<SupabaseClient | null>(null);
  const requestEpochRef = useRef(0);
  const activeUserIdRef = useRef<string | null>(null);
  const [stage, setStage] = useState<AuthStage>("initializing");
  const [session, setSession] = useState<Session | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentState | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [healthState, setHealthState] =
    useState<RequestState<AdminHealthResponse>>(initialRequestState);
  const [insightsState, setInsightsState] =
    useState<RequestState<AdminInsightsResponse>>(initialRequestState);

  const invalidateDashboard = useCallback((clearUser = true) => {
    requestEpochRef.current += 1;
    if (clearUser) activeUserIdRef.current = null;
    setHealthState(initialRequestState);
    setInsightsState(initialRequestState);
    setAccessDenied(false);
  }, []);

  const inspectSession = useCallback(async (client: SupabaseClient) => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      const {
        data: { session: currentSession },
        error: sessionError,
      } = await client.auth.getSession();
      if (sessionError) throw sessionError;
      if (!currentSession) {
        invalidateDashboard();
        setSession(null);
        setFactorId(null);
        setEnrollment(null);
        setStage("signed_out");
        return;
      }
      if (activeUserIdRef.current !== currentSession.user.id) {
        invalidateDashboard(false);
        activeUserIdRef.current = currentSession.user.id;
      }
      setSession(currentSession);
      const [assuranceResult, factorsResult] = await Promise.all([
        client.auth.mfa.getAuthenticatorAssuranceLevel(),
        client.auth.mfa.listFactors(),
      ]);
      if (assuranceResult.error) throw assuranceResult.error;
      if (factorsResult.error) throw factorsResult.error;

      if (assuranceResult.data.currentLevel === "aal2") {
        setFactorId(null);
        setEnrollment(null);
        setStage("ready");
        return;
      }
      const verifiedFactor = factorsResult.data.totp
        .slice()
        .sort((left, right) =>
          right.updated_at.localeCompare(left.updated_at),
        )[0];
      if (verifiedFactor) {
        setFactorId(verifiedFactor.id);
        setEnrollment(null);
        setStage("mfa_challenge");
        return;
      }
      setFactorId(null);
      setEnrollment(null);
      setStage("mfa_enroll_needed");
    } catch (error) {
      invalidateDashboard();
      setAuthError(authErrorMessage(error));
      setSession(null);
      setStage("signed_out");
    } finally {
      setAuthBusy(false);
    }
  }, [invalidateDashboard]);

  useEffect(() => {
    if (!configResult.config) {
      setStage("initializing");
      return;
    }
    let subscription:
      | ReturnType<SupabaseClient["auth"]["onAuthStateChange"]>["data"]["subscription"]
      | null = null;
    let active = true;
    let sessionInspectionTimerId: number | null = null;
    try {
      const client = createAdminAuthClient(configResult.config);
      clientRef.current = client;
      void inspectSession(client);
      const result = client.auth.onAuthStateChange(
        (event, currentSession) => {
          if (event === "SIGNED_OUT" || !currentSession) {
            invalidateDashboard();
            setSession(null);
            setStage("signed_out");
            return;
          }
          if (event === "TOKEN_REFRESHED") {
            invalidateDashboard(false);
            setSession(currentSession);
            setStage("initializing");
            if (sessionInspectionTimerId !== null) {
              window.clearTimeout(sessionInspectionTimerId);
            }
            sessionInspectionTimerId = window.setTimeout(() => {
              sessionInspectionTimerId = null;
              if (active) void inspectSession(client);
            }, 0);
          }
        },
      );
      subscription = result.data.subscription;
    } catch {
      clientRef.current = null;
      invalidateDashboard();
      setAuthError("浏览器没有提供可用的当前标签页临时存储。");
      setStage("auth_unavailable");
    }
    return () => {
      active = false;
      if (sessionInspectionTimerId !== null) {
        window.clearTimeout(sessionInspectionTimerId);
      }
      requestEpochRef.current += 1;
      activeUserIdRef.current = null;
      subscription?.unsubscribe();
      clientRef.current = null;
    };
  }, [configResult.config, inspectSession, invalidateDashboard]);

  const loadData = useCallback(async () => {
    const config = configResult.config;
    const client = clientRef.current;
    if (!config || !client) return;
    const {
      data: { session: currentSession },
    } = await client.auth.getSession();
    if (!currentSession) {
      invalidateDashboard();
      setSession(null);
      setStage("signed_out");
      return;
    }
    if (activeUserIdRef.current !== currentSession.user.id) {
      invalidateDashboard(false);
      activeUserIdRef.current = currentSession.user.id;
    }
    const requestEpoch = ++requestEpochRef.current;
    const requestUserId = currentSession.user.id;
    setAccessDenied(false);
    setHealthState({
      data: null,
      error: null,
      loading: true,
    });
    setInsightsState({
      data: null,
      error: null,
      loading: true,
    });

    const [healthResult, insightsResult] = await Promise.allSettled([
      fetchAdminHealth(config, currentSession.access_token),
      fetchAdminInsights(config, currentSession.access_token),
    ]);
    if (
      !canCommitAdminResponse(
        requestEpoch,
        requestUserId,
        requestEpochRef.current,
        activeUserIdRef.current,
      )
    ) {
      return;
    }
    const errors = [
      healthResult.status === "rejected" ? healthResult.reason : null,
      insightsResult.status === "rejected" ? insightsResult.reason : null,
    ].filter(Boolean);
    if (
      errors.some(
        (error) =>
          error instanceof AdminApiError && error.kind === "forbidden",
      )
    ) {
      setAccessDenied(true);
    }
    if (
      errors.some(
        (error) =>
          error instanceof AdminApiError && error.kind === "unauthorized",
      )
    ) {
      invalidateDashboard();
      await client.auth.signOut({ scope: "local" });
      return;
    }
    setHealthState(
      healthResult.status === "fulfilled"
        ? { data: healthResult.value, error: null, loading: false }
        : {
            data: null,
            error: apiErrorMessage(healthResult.reason),
            loading: false,
          },
    );
    setInsightsState(
      insightsResult.status === "fulfilled"
        ? { data: insightsResult.value, error: null, loading: false }
        : {
            data: null,
            error: apiErrorMessage(insightsResult.reason),
            loading: false,
          },
    );
  }, [configResult.config, invalidateDashboard]);

  useEffect(() => {
    if (stage === "ready" && session) {
      void loadData();
    }
  }, [stage, session?.user.id, loadData]);

  useEffect(() => {
    if (!session) return;
    let timerId: number | null = null;
    let active = true;

    const expireSession = async () => {
      const client = clientRef.current;
      invalidateDashboard();
      try {
        if (client) await client.auth.signOut({ scope: "local" });
      } finally {
        if (!active) return;
        setEnrollment(null);
        setSession(null);
        setStage("signed_out");
        setAuthError("因为 15 分钟没有操作，后台已自动安全退出。");
      }
    };
    const armTimer = () => {
      if (timerId !== null) window.clearTimeout(timerId);
      timerId = window.setTimeout(() => void expireSession(), inactivityLimitMs);
    };
    const handleTrustedInteraction = (event: Event) => {
      if (event.isTrusted) armTimer();
    };

    armTimer();
    window.addEventListener("pointerdown", handleTrustedInteraction, {
      passive: true,
    });
    window.addEventListener("keydown", handleTrustedInteraction);
    return () => {
      active = false;
      if (timerId !== null) window.clearTimeout(timerId);
      window.removeEventListener("pointerdown", handleTrustedInteraction);
      window.removeEventListener("keydown", handleTrustedInteraction);
    };
  }, [session?.user.id, invalidateDashboard]);

  async function signIn(email: string, password: string) {
    const client = clientRef.current;
    if (!client || authBusy) return;
    invalidateDashboard();
    setAuthBusy(true);
    setAuthError(null);
    try {
      const { error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await inspectSession(client);
    } catch (error) {
      setAuthError(authErrorMessage(error));
      setStage("signed_out");
    } finally {
      setAuthBusy(false);
    }
  }

  async function verifyExistingFactor(code: string) {
    const client = clientRef.current;
    if (!client || !factorId || authBusy) return;
    setAuthBusy(true);
    setAuthError(null);
    try {
      const challenge = await client.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;
      const verification = await client.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code,
      });
      if (verification.error) throw verification.error;
      await inspectSession(client);
    } catch (error) {
      setAuthError(authErrorMessage(error));
      setStage("mfa_challenge");
    } finally {
      setAuthBusy(false);
    }
  }

  async function startEnrollment() {
    const client = clientRef.current;
    if (!client || authBusy) return;
    setAuthBusy(true);
    setAuthError(null);
    setStage("mfa_enrolling");
    try {
      const factors = await client.auth.mfa.listFactors();
      if (factors.error) throw factors.error;
      const unfinishedTotpFactors = selectUnverifiedTotpFactors(
        factors.data.all,
      );
      for (const factor of unfinishedTotpFactors) {
        const result = await client.auth.mfa.unenroll({
          factorId: factor.id,
        });
        if (result.error) throw result.error;
      }
      const result = await client.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Homeground Admin",
        issuer: "Homeground China",
      });
      if (result.error) throw result.error;
      setEnrollment({
        factorId: result.data.id,
        qrCode: result.data.totp.qr_code,
        secret: result.data.totp.secret,
      });
    } catch (error) {
      setEnrollment(null);
      setAuthError(authErrorMessage(error));
      setStage("mfa_enroll_needed");
    } finally {
      setAuthBusy(false);
    }
  }

  async function verifyEnrollment(code: string) {
    const client = clientRef.current;
    if (!client || !enrollment || authBusy) return;
    setAuthBusy(true);
    setAuthError(null);
    try {
      const challenge = await client.auth.mfa.challenge({
        factorId: enrollment.factorId,
      });
      if (challenge.error) throw challenge.error;
      const verification = await client.auth.mfa.verify({
        factorId: enrollment.factorId,
        challengeId: challenge.data.id,
        code,
      });
      if (verification.error) throw verification.error;
      setEnrollment(null);
      await inspectSession(client);
    } catch (error) {
      setAuthError(authErrorMessage(error));
      setStage("mfa_enrolling");
    } finally {
      setAuthBusy(false);
    }
  }

  async function signOut(cleanEnrollment = false) {
    const client = clientRef.current;
    if (!client) return;
    invalidateDashboard();
    setAuthBusy(true);
    setAuthError(null);
    try {
      if (cleanEnrollment && enrollment) {
        await client.auth.mfa.unenroll({ factorId: enrollment.factorId });
      }
      await client.auth.signOut({ scope: "local" });
    } finally {
      setEnrollment(null);
      setSession(null);
      setStage("signed_out");
      setFactorId(null);
      setAuthBusy(false);
    }
  }

  const showSignOut =
    Boolean(session) &&
    !["initializing", "auth_unavailable", "signed_out"].includes(stage);

  return (
    <div className={styles.adminShell} lang="zh-CN">
      <a className={styles.skipLink} href="#admin-main">
        跳到主要内容
      </a>
      <BrandHeader
        showSignOut={showSignOut}
        onSignOut={() => void signOut(Boolean(enrollment))}
      />
      <main id="admin-main" className={styles.main}>
        <PageIntro />
        {!configResult.config ? (
          <ConfigPanel
            missing={configResult.missing}
            invalid={configResult.invalid}
          />
        ) : stage === "initializing" ? (
          <LoadingPanel message="正在检查安全会话……" />
        ) : stage === "auth_unavailable" ? (
          <AuthUnavailablePanel message={authError} />
        ) : stage === "signed_out" ? (
          <LoginPanel
            busy={authBusy}
            error={authError}
            onSubmit={signIn}
          />
        ) : stage === "mfa_challenge" ? (
          <MfaChallengePanel
            busy={authBusy}
            error={authError}
            onVerify={verifyExistingFactor}
            onSignOut={() => void signOut()}
          />
        ) : stage === "mfa_enroll_needed" ? (
          <MfaEnrollmentPanel
            enrollment={null}
            busy={authBusy}
            error={authError}
            onStart={startEnrollment}
            onVerify={verifyEnrollment}
            onCancel={() => signOut(true)}
          />
        ) : stage === "mfa_enrolling" ? (
          <MfaEnrollmentPanel
            enrollment={enrollment}
            busy={authBusy}
            error={authError}
            onStart={startEnrollment}
            onVerify={verifyEnrollment}
            onCancel={() => signOut(true)}
          />
        ) : (
          <Dashboard
            healthState={healthState}
            insightsState={insightsState}
            accessDenied={accessDenied}
            onRefresh={() => void loadData()}
          />
        )}
      </main>
      <footer className={styles.footer}>
        <p>
          私有汇总页 · 不含客户名单、联系方式、自由文本、导出、筛选或平台归因
        </p>
      </footer>
    </div>
  );
}
