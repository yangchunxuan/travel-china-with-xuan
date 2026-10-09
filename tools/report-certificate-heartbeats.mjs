import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {reportHeartbeat} from './report-stability-heartbeat.mjs';

export function certificateOutcomes(report) {
  const checks = Array.isArray(report?.checks) ? report.checks : [];
  const certificates = checks.filter(c => ['edge_tls','origin_tls'].includes(c.kind));
  if (certificates.length !== 10 || !checks.length || !['healthy','warning','critical'].includes(report.status)) {
    return {30:'failure',14:'failure',7:'failure'};
  }
  if (certificates.some(c => c.status === 'critical' || !Number.isFinite(c.details?.daysRemaining))) {
    return {30:'failure',14:'failure',7:'failure'};
  }
  return Object.fromEntries([30,14,7].map(days => [days,
    (days === 30 && report.status !== 'healthy') || certificates.some(c =>
      Number.isFinite(c.details?.daysRemaining) && c.details.daysRemaining <= days)
      ? 'failure' : 'success']));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  let report;
  try { report = JSON.parse(await readFile(process.argv[2] ?? 'site-stability.json','utf8')); } catch { report = null; }
  const outcomes = certificateOutcomes(report);
  let failed = false;
  for (const days of [30,14,7]) {
    try {
      const result = await reportHeartbeat({url:process.env[`SITE_CERTIFICATE_${days}_DAY_HEARTBEAT_URL`],outcome:outcomes[days]});
      console.log(JSON.stringify({thresholdDays:days,...result}));
    } catch {
      console.error(JSON.stringify({ok:false,thresholdDays:days,code:'certificate_heartbeat_delivery_failed'}));
      failed = true;
    }
  }
  if (failed) process.exitCode = 1;
}
