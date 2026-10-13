"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { conversionCurrencies, inquiryReferencePattern, parseAdminConversionSnapshot, type AdminConversionEvent, type AdminConversionSnapshot } from "../../lib/adminConversions";
import styles from "./AdminConversions.module.css";

const statusCopy: Record<AdminConversionEvent["status"], string> = {
  pending: "待回传", processing: "正在回传", submitted: "已提交，等待 Google 处理", accepted: "Google API 已接受", failed: "回传失败，需核对", blocked: "未回传",
};
const errorCopy: Record<string, string> = {
  not_found: "未找到这个咨询编号，请核对通知邮件中的完整编号。", invalid_payment: "请检查实收金额、币种和收款时间。收款时间不能早于咨询时间或晚于现在。",
  payment_already_recorded: "这条咨询已有收款记录。为避免重复计入，不能再添加一笔；如需修正，请先核对原记录。",
  conversions_disabled: "成交记录功能尚未启用。", invalid_request: "请检查咨询编号和所填内容。",
};
function localNow() { const now = new Date(); return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 19); }
function eventState(event: AdminConversionEvent, enabled?: boolean) {
  if (event.errorCode === "consent_withdrawn") return "访客已撤回授权，停止回传";
  if (event.errorCode === "missing_ad_attribution") return "未关联广告点击，已保留收款记录";
  if (event.errorCode === "click_expired") return "广告点击已超过保留期，未回传";
  if (event.errorCode === "validation_only") return "校验通过，尚未正式回传";
  return event.status === "pending" && !enabled ? "已保存，等待开通回传" : statusCopy[event.status];
}

export function AdminConversions({ session, supabaseUrl, publishableKey }: { session: Session; supabaseUrl: string; publishableKey: string }) {
  const [reference, setReference] = useState(""); const [snapshot, setSnapshot] = useState<AdminConversionSnapshot | null>(null);
  const [amount, setAmount] = useState(""); const [currency, setCurrency] = useState("USD"); const [occurredAt, setOccurredAt] = useState(localNow);
  const [confirmed, setConfirmed] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const [uncertain, setUncertain] = useState(false); const [notice, setNotice] = useState("");
  const request = useRef<AbortController | null>(null); const epoch = useRef(0);
  useEffect(() => {
    // Session refresh invalidates the previous request's finally block as well.
    // Release its busy state and require a fresh lookup before another mutation.
    setBusy(false); setSnapshot(null); setUncertain(false); setNotice("");
    return () => { epoch.current += 1; request.current?.abort(); };
  }, [session.user.id, session.access_token]);
  const payment = snapshot?.inquiry.events.find((event) => event.kind === "payment_received");
  async function submit(action: "lookup" | "record_payment") {
    if (busy) return;
    const target = action === "record_payment" ? snapshot?.inquiry.publicReference : reference.trim().toUpperCase();
    if (!target || !inquiryReferencePattern.test(target)) { setError("请输入通知邮件中的完整咨询编号，例如 HG-XXXX-XXXX-XXXX。"); return; }
    if (action === "record_payment" && (!confirmed || !Number.isFinite(Number(amount)) || Number(amount) <= 0 || !Number.isFinite(Date.parse(occurredAt)))) {
      setError("请填写实际收到的金额和时间，并确认款项已经到账。"); return;
    }
    request.current?.abort(); const controller = new AbortController(); request.current = controller; const generation = ++epoch.current;
    setBusy(true); setError(""); setNotice(""); const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch(new URL("/functions/v1/admin-conversions", supabaseUrl), { method: "POST", headers: {
        Authorization: `Bearer ${session.access_token}`, apikey: publishableKey, "Content-Type": "application/json" }, credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer", signal: controller.signal,
        body: JSON.stringify({ action, publicReference: target, ...(action === "record_payment" ? {
          amount: Number(amount), currency, occurredAt: new Date(occurredAt).toISOString(), paymentReceivedConfirmed: confirmed } : {}) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? "auth" : data?.error?.code ?? "request");
      const result = parseAdminConversionSnapshot(data); if (!result || result.inquiry.publicReference !== target) throw new Error("response");
      if (generation !== epoch.current) return;
      setSnapshot(result); setUncertain(false); setNotice(action === "record_payment" ? "后端已确认保存首次收款记录。" : "已读取最新记录。");
    } catch (reason) {
      if (generation !== epoch.current) return;
      const code = reason instanceof Error ? reason.message : "request";
      if (action === "record_payment") setUncertain(true);
      setError(code === "auth" ? "登录验证已失效，请重新登录。" : errorCopy[code] ?? (action === "record_payment"
        ? "保存结果尚未确认。请先点击“查询最新记录”核对，避免重复录入。" : "暂时无法读取记录，请稍后重试。"));
      if (action === "lookup") setSnapshot(null);
    } finally { clearTimeout(timeout); if (generation === epoch.current) setBusy(false); }
  }
  function lookup(event: FormEvent) { event.preventDefault(); void submit("lookup"); }
  function record(event: FormEvent) { event.preventDefault(); void submit("record_payment"); }
  return <section className={styles.section} aria-labelledby="conversion-title">
    <h2 id="conversion-title">咨询与首次收款</h2>
    <p>用咨询编号关联广告来源。款项实际到账后，记录一次首次实收金额；已收订金后无需再次记录全款。</p>
    <form onSubmit={lookup} className={styles.lookup}>
      <label>咨询编号<input value={reference} onChange={(event) => { setReference(event.target.value.toUpperCase()); setSnapshot(null); setError(""); setNotice(""); setUncertain(false); setConfirmed(false); }}
        placeholder="HG-XXXX-XXXX-XXXX" maxLength={17} autoComplete="off" spellCheck={false} required disabled={busy} /></label>
      <button disabled={busy} type="submit">{busy ? "处理中…" : "查询最新记录"}</button>
    </form>
    {error ? <p role="alert" className={styles.error}>{error}</p> : null}
    {notice ? <p role="status" aria-live="polite">{notice}</p> : null}
    {snapshot ? <div className={styles.result}>
      <p><strong>{snapshot.inquiry.publicReference}</strong> · {new Date(snapshot.inquiry.receivedAt).toLocaleString("zh-CN")}</p>
      <p>{snapshot.inquiry.attribution ? "已关联访客授权保存的广告点击。" : "当前没有可用的广告点击关联。"}</p>
      {snapshot.inquiry.events.length ? <ul>{snapshot.inquiry.events.map((event) => <li key={event.id}>
        <strong>{event.kind === "inquiry_received" ? "咨询已保存" : "首次收款已保存"}</strong>
        {event.kind === "payment_received" ? ` · ${event.amount} ${event.currency} · ${new Date(event.occurredAt).toLocaleString("zh-CN")}` : ""}
        <span className={styles.eventStatus}>{eventState(event, snapshot.uploadEnabled)}</span>
      </li>)}</ul> : null}
      {!payment ? <form onSubmit={record}>
        <div className={styles.fields}>
          <label>首次实收金额<input type="number" min={currency === "JPY" || currency === "KRW" ? "1" : "0.01"} max="999999999999.99"
            step={currency === "JPY" || currency === "KRW" ? "1" : "0.01"} inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} required disabled={busy || uncertain} /></label>
          <label>收款币种<select value={currency} onChange={(event) => setCurrency(event.target.value)} disabled={busy || uncertain}>{conversionCurrencies.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label>实际到账时间（本机时区）<input type="datetime-local" step="1" value={occurredAt} onChange={(event) => setOccurredAt(event.target.value)} required disabled={busy || uncertain} /></label>
        </div>
        <label className={styles.confirmation}><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} disabled={busy || uncertain} />
          我已核对款项实际到账，填写的是首次实收金额（可为订金），不是报价或口头确认。</label>
        <button type="submit" disabled={!confirmed || busy || uncertain}>保存首次收款</button>
      </form> : <p>这条咨询已记录首次收款。如有退款或录入错误，应先核对并处理原转化，不能用第二笔记录代替修正。</p>}
      <p className={styles.note}>Google API 接受表示数据处理成功；广告归因和报表结果仍以 Google Ads 为准。</p>
    </div> : null}
  </section>;
}
