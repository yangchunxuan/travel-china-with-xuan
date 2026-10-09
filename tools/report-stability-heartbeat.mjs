import { pathToFileURL } from 'node:url';

// Only send a result to the configured Better Stack heartbeat. Never transmit
// inquiry data, response bodies, private logs, or a provider API credential.
export function heartbeatDestination(raw, outcome) {
  if (!['success', 'failure'].includes(outcome)) throw new Error('invalid_outcome');
  let url;
  try { url = new URL(raw); } catch { throw new Error('heartbeat_not_configured'); }
  if (url.protocol !== 'https:' || !['incidents.betterstack.com', 'uptime.betterstack.com'].includes(url.hostname)
      || url.username || url.password || url.port || url.search || url.hash
      || !/^\/api\/v1\/heartbeat\/[A-Za-z0-9_-]+\/?$/u.test(url.pathname)) {
    throw new Error('invalid_heartbeat_destination');
  }
  url.pathname = url.pathname.replace(/\/$/u, '') + (outcome === 'failure' ? '/fail' : '');
  return url;
}

export async function reportHeartbeat({url, outcome}, request = fetch) {
  const destination = heartbeatDestination(url, outcome);
  try {
    const response = await request(destination, {method: 'GET', redirect: 'error', signal: AbortSignal.timeout(10_000)});
    if (!response.ok) throw new Error('heartbeat_delivery_failed');
    await response.body?.cancel();
    return {ok: true, outcome, httpStatus: response.status};
  } catch {
    // Network error messages may contain the private heartbeat token.
    throw new Error('heartbeat_delivery_failed');
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  try {
    console.log(JSON.stringify(await reportHeartbeat({url: process.env.STABILITY_HEARTBEAT_URL, outcome: process.env.STABILITY_OUTCOME})));
  } catch (error) {
    console.error(JSON.stringify({ok: false, code: ['invalid_outcome','heartbeat_not_configured','invalid_heartbeat_destination','heartbeat_delivery_failed'].includes(error.message) ? error.message : 'heartbeat_delivery_failed'}));
    process.exitCode = 1;
  }
}
