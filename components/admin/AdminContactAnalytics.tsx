"use client";

import { useState } from "react";
import type { ContactChannel, ContactDimension, ContactReport } from "../../supabase/functions/_shared/admin-contact-contracts";
import styles from "./AdminContactAnalytics.module.css";

const channels: { id: ContactChannel; title: string }[] = [
  { id: 'whatsapp', title: 'WhatsApp' }, { id: 'email', title: '邮件' },
  { id: 'messenger', title: 'Messenger' }, { id: 'all', title: '全部渠道' },
];
const dimensions: { id: ContactDimension; title: string; description: string }[] = [
  { id: 'pages', title: '点击页面', description: '客人点击联系按钮时所在的页面。' },
  { id: 'entryPages', title: '首次记录页面', description: '同意统计后，首次记录到的页面；可能不是最初打开的网站页面。' },
  { id: 'sources', title: '访问来源', description: '只显示已记录的活动来源标签。未记录不等于直接访问，也不能据此排除搜索或广告。' },
  { id: 'products', title: '关联产品', description: '点击时一并记录的产品。旧记录或通用按钮可能没有产品信息。' },
  { id: 'surfaces', title: '按钮位置', description: '点击时记录的功能区域。旧记录未采集的位置无法补回。' },
];
const positionLabels: Record<string, string> = {
  product: '产品页', homepage_quick_email: '首页快捷咨询', planner: '行程规划表单', contact_options: '联系选项',
};
function label(key: string, dimension: ContactDimension) {
  if (key === 'Unknown') return '未记录';
  if (key === '/') return '英文首页';
  if (key === '/zh/') return '中文首页';
  if (key === '/ko/') return '韩文首页';
  if (dimension === 'surfaces') return positionLabels[key] ?? key;
  if (dimension === 'products') return key.replace(/-/g, ' ');
  return key;
}
function time(value: string) {
  return new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value));
}
const num = new Intl.NumberFormat('zh-CN');
function percentage(a: number, b: number) { return b ? `${(a / b * 100).toFixed(1)}%` : '—'; }

export function AdminContactAnalytics({ report, loading, error }: { report?: ContactReport; loading: boolean; error: string | null }) {
  const [days, setDays] = useState<7 | 30>(30);
  const [channel, setChannel] = useState<ContactChannel>('whatsapp');
  const [dimension, setDimension] = useState<ContactDimension>('pages');
  const period = report?.periods.find(item => item.days === days);
  const selected = period?.channels.find(item => item.channel === channel);
  const currentDimension = dimensions.find(item => item.id === dimension)!;
  const rows = selected?.dimensions[dimension];
  const peak = Math.max(1, ...(selected?.daily.map(item => item.clicks) ?? []));
  const activeDays = selected?.daily.filter(item => item.clicks > 0) ?? [];
  return <section id="contact-analytics" className={styles.section} aria-labelledby="contact-analytics-title" aria-busy={loading}>
    <header className={styles.header}>
      <div><span className={styles.eyebrow}>联系入口</span><h2 id="contact-analytics-title">从哪里开始咨询</h2><p>查看联系按钮的点击情况。点击不代表消息已发送。</p></div>
      <div className={styles.periods} aria-label="统计时间">
        {([7, 30] as const).map(value => <button key={value} type="button" aria-pressed={days === value} onClick={() => setDays(value)}>近 {value} 天</button>)}
      </div>
    </header>
    {loading && !report ? <p role="status">正在读取联系统计……</p> : null}
    {error ? <p role="alert" className={styles.notice}>联系统计暂时不可读。{error}</p> : null}
    {!loading && !error && !report ? <p className={styles.notice}>当前后台尚未提供联系渠道明细。此处不显示为零。</p> : null}
    {period && selected ? <>
      <div className={styles.channels} aria-label="联系渠道">{channels.map(item => <button type="button" key={item.id} aria-pressed={item.id === channel} onClick={() => setChannel(item.id)}>{item.title}<span>{num.format(period.channels.find(row => row.channel === item.id)!.clicks)}</span></button>)}</div>
      <p className={styles.window}><span><time dateTime={period.startsAt}>{time(period.startsAt)}</time> — <time dateTime={period.endsAt}>{time(period.endsAt)}</time></span><span>北京时间 · 滚动 {days} 天</span></p>
      <dl className={styles.metrics} aria-live="polite">
        <div><dt>按钮点击</dt><dd>{num.format(selected.clicks)}<small>次</small><p>同一会话可点击多次</p></dd></div>
        <div><dt>点击的匿名会话</dt><dd>{num.format(selected.sessions)}<small>个</small><p>按会话去重，<span className={styles.keepTogether}>不代表客户人数</span></p></dd></div>
        <div><dt>会话点击率</dt><dd>{percentage(selected.sessions, period.eligibleSessions)}<p>分母：{num.format(period.eligibleSessions)} 个已记录会话</p></dd></div>
        <div><dt>已知来源的点击</dt><dd>{num.format(selected.clicks - selected.unknownSourceClicks)}<small>次</small><p>{num.format(selected.unknownSourceClicks)} 次来源未记录</p></dd></div>
      </dl>
      {selected.clicks === 0 ? <p className={styles.notice}>这个时间范围内没有记录到{channels.find(item => item.id === channel)!.title}点击。未同意统计、未成功上报的访问不在其中。</p> : null}
      <div className={styles.chartPanel}>
        <div className={styles.subheading}><h3>每日点击</h3><span>{activeDays.length} 天有记录{selected.clicks > 0 ? ` · 单日最高 ${peak} 次` : ""}</span></div>
        <div className={styles.chart} role="img" aria-label={`近 ${days} 天共 ${selected.clicks} 次点击；每日数值见下方展开表格。`}>
          {selected.daily.map(day => <div className={styles.barSlot} key={day.day} title={`${day.day}：${day.clicks} 次点击，${day.sessions} 个匿名会话`}><div className={styles.bar} style={{ height: `${day.clicks / peak * 100}%` }} /></div>)}
        </div>
        <div className={styles.chartLabels}><span>{selected.daily[0].day.slice(5)}</span><span>{selected.daily.at(-1)!.day.slice(5)}</span></div><p className={styles.chartNote}>按天汇总，首尾日期可能不满一天。</p>
        <details className={styles.details}><summary>查看每日数值</summary><div className={styles.tableWrap}><table><caption className={styles.srOnly}>每日点击数与匿名会话数</caption><thead><tr><th scope="col">日期（北京时间）</th><th scope="col">点击</th><th scope="col">匿名会话</th></tr></thead><tbody>{selected.daily.map(day => <tr key={day.day}><th scope="row">{day.day}</th><td>{day.clicks}</td><td>{day.sessions}</td></tr>)}</tbody></table></div></details>
      </div>
      <div className={styles.breakdown}>
        <div className={styles.subheading}><h3>点击明细</h3><label className={styles.dimensionLabel}>查看维度<select value={dimension} onChange={event => setDimension(event.target.value as ContactDimension)}>{dimensions.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label></div>
        <p className={styles.description}>{currentDimension.description}</p>
        {rows && rows.rows.length ? <div className={styles.tableWrap}><table><caption className={styles.srOnly}>{currentDimension.title}点击排名</caption><thead><tr><th scope="col">{currentDimension.title}</th><th scope="col">点击</th><th scope="col">匿名会话</th></tr></thead><tbody>{rows.rows.map(row => <tr key={row.key}><th scope="row">{dimension === 'pages' || dimension === 'entryPages' ? <a href={row.key} target="_blank" rel="noreferrer">{label(row.key, dimension)}</a> : label(row.key, dimension)}</th><td>{num.format(row.clicks)}</td><td>{num.format(row.sessions)}</td></tr>)}</tbody></table></div> : <p className={styles.empty}>暂无已记录的点击明细。</p>}
        {rows && rows.remainingClicks > 0 ? <p className={styles.description}>显示点击最多的 20 项，其余项目共 {num.format(rows.remainingClicks)} 次点击。</p> : null}
        <p className={styles.description}>同一会话可能出现在多个页面或日期中，各行会话数不能相加。</p>
      </div>
      <details className={styles.details}><summary>统计范围与数据说明</summary><div className={styles.definitions}>
        <p>这里只统计已同意匿名分析、成功保存的记录，并排除已标记的内部检查。浏览器拦截、未同意和未上报的点击不会计入；未标记的历史自测可能仍在其中。</p>
        <p>会话点击率 = 点击过所选渠道的匿名会话 ÷ 同期首次记录的全部匿名会话。一个人可能产生多个会话；这个比例不是成交率。</p>
        <p>近 7 天和 30 天窗口按会话首次记录时间及点击接收时间共同筛选。原始访问记录保留 30 天；更早的数据无法从这里补回。</p>
        <p>联系明细提供精确汇总数，不提供姓名、电话、会话编号或个人浏览轨迹。下方网站行为概览继续对小样本分组隐藏；两处显示精度不同。</p>
        <p>WhatsApp 消息是否发出、对方身份与成交情况暂未接入。正式表单咨询以数据库成功保存为准，请看保存记录汇总。</p>
      </div></details>
    </> : null}
  </section>;
}
