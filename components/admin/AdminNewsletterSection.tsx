"use client";
import { useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getNewsletterConfig } from "../../lib/newsletter";
import styles from "./AdminInsightsPage.module.css";

const statuses = { pending: "待邮箱确认", active: "有效订阅", unsubscribed: "已退订", suppressed: "已停发" };
type Status = keyof typeof statuses;
interface Subscriber {
  id: string; email: string | null; firstName: string; locale: string; sourcePath: string;
  status: Status; requestedAt: string; confirmedAt: string | null; unsubscribedAt: string | null;
}
interface Result { counts: Record<Status, number>; subscribers: Subscriber[]; nextCursor: string | null }
function valid(value: unknown): value is Result {
  if (!value || typeof value !== "object") return false;
  const data = value as Result & { contractVersion?: string };
  return data.contractVersion === "homeground-newsletter-admin.v1" && data.counts &&
    Object.keys(statuses).every(status => Number.isSafeInteger(data.counts[status]) && data.counts[status] >= 0) &&
    Array.isArray(data.subscribers) && data.subscribers.length <= 25 &&
    data.subscribers.every(item => item && typeof item.id === "string" && item.status in statuses &&
      (item.email === null || typeof item.email === "string") && typeof item.firstName === "string" &&
      typeof item.locale === "string" && typeof item.sourcePath === "string" && typeof item.requestedAt === "string") &&
    (data.nextCursor === null || typeof data.nextCursor === "string");
}

export function AdminNewsletterSection({ session, supabaseUrl }: { session: Session; supabaseUrl: string }) {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Status | "">("");
  const request = useRef<AbortController | null>(null);
  const epoch = useRef(0);
  useEffect(() => () => { epoch.current += 1; request.current?.abort(); }, [session.user.id, session.access_token]);
  if (!getNewsletterConfig()) return null;
  async function load(nextFilter = filter, cursor?: string) {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const generation = ++epoch.current;
    setLoading(true); setError("");
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const url = new URL("/functions/v1/admin-newsletter", supabaseUrl);
      if (nextFilter) url.searchParams.set("status", nextFilter);
      if (cursor) url.searchParams.set("cursor", cursor);
      const response = await fetch(url, { headers: { Authorization: `Bearer ${session.access_token}` },
        cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer", signal: controller.signal });
      if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? "auth" : "request");
      const data = await response.json();
      if (!valid(data)) throw new Error("response");
      if (generation !== epoch.current) return;
      setResult(previous => ({ ...data, subscribers: cursor ? [...(previous?.subscribers ?? []), ...data.subscribers] : data.subscribers }));
    } catch (reason) {
      if (generation === epoch.current) {
        setResult(null);
        setError(reason instanceof Error && reason.message === "auth" ? "登录验证已失效，请重新登录后查看订阅名单。" : "暂时无法读取订阅名单，请稍后重试。");
      }
    } finally {
      clearTimeout(timeout);
      if (generation === epoch.current) setLoading(false);
    }
  }
  return <section className={styles.section} aria-labelledby="newsletter-admin-title">
    <div className={styles.sectionHeading}>
      <div><h2 id="newsletter-admin-title">旅行简报订阅</h2><p>与旅行咨询分开统计。邮箱确认后才计入有效订阅；这里提供名单查看，不会发送推广邮件。</p></div>
      <button type="button" className={styles.refreshButton} onClick={() => void load()} disabled={loading}>{loading ? "正在读取…" : result ? "刷新订阅名单" : "查看订阅名单"}</button>
    </div>
    {error ? <p role="alert">{error}</p> : null}
    {result ? <>
      <p>{Object.entries(statuses).map(([status, label]) => `${label}：${result.counts[status]}`).join(" · ")}</p>
      <label>订阅状态 <select value={filter} onChange={event => { const value = event.target.value as Status | ""; setFilter(value); setResult(null); void load(value); }}>
        <option value="">全部</option>{Object.entries(statuses).map(([status,label]) => <option value={status} key={status}>{label}</option>)}
      </select></label>
      {result.subscribers.length === 0 ? <p>这个状态下还没有订阅记录。</p> : <ul className={styles.healthGrid}>
        {result.subscribers.map(item => <li className={styles.healthCheck} key={item.id}>
          <h3 style={{ overflowWrap: "anywhere" }}>{item.email ?? "邮箱已按保留规则移除"}</h3>
          <p>{item.firstName ? `${item.firstName} · ` : ""}{item.locale.toUpperCase()} · {statuses[item.status]}</p>
          <p>申请时间：{new Date(item.requestedAt).toLocaleString("zh-CN")}</p>
          {item.confirmedAt ? <p>确认时间：{new Date(item.confirmedAt).toLocaleString("zh-CN")}</p> : null}
          <p style={{ overflowWrap: "anywhere" }}>来源页面：{item.sourcePath}</p>
        </li>)}
      </ul>}
      {result.nextCursor ? <button type="button" className={styles.refreshButton} disabled={loading} onClick={() => void load(filter, result.nextCursor)}>查看更多</button> : null}
    </> : null}
  </section>;
}
