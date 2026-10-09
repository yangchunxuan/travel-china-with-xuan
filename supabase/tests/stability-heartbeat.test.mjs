import assert from 'node:assert/strict';
import test from 'node:test';
import {heartbeatDestination, reportHeartbeat} from '../../tools/report-stability-heartbeat.mjs';
import {certificateOutcomes} from '../../tools/report-certificate-heartbeats.mjs';

test('30, 14 and 7 day warnings each open their own incident while missing checks never report healthy', () => {
  const report = days => ({status:days > 30 ? 'healthy' : 'warning',checks:Array.from({length:10},()=>({kind:'origin_tls',details:{daysRemaining:days}}))});
  assert.deepEqual(certificateOutcomes(report(60)), {30:'success',14:'success',7:'success'});
  assert.deepEqual(certificateOutcomes(report(30)), {30:'failure',14:'success',7:'success'});
  assert.deepEqual(certificateOutcomes(report(14)), {30:'failure',14:'failure',7:'success'});
  assert.deepEqual(certificateOutcomes(report(7)), {30:'failure',14:'failure',7:'failure'});
  assert.deepEqual(certificateOutcomes(null), {30:'failure',14:'failure',7:'failure'});
  const badChain = report(60); badChain.status='critical';
  assert.equal(certificateOutcomes(badChain)[30], 'failure');
  badChain.checks[0] = {kind:'origin_tls',status:'critical',details:{code:'CERT_HAS_EXPIRED'}};
  assert.deepEqual(certificateOutcomes(badChain), {30:'failure',14:'failure',7:'failure'});
});

test('only the exact trusted heartbeat endpoint receives success or failure', async () => {
  const raw = 'https://incidents.betterstack.com/api/v1/heartbeat/fixture_token';
  const requests = [];
  for (const outcome of ['success','failure']) {
    const result = await reportHeartbeat({url: raw, outcome}, async (url, options) => {
      requests.push({url: String(url), options});
      return new Response('ok');
    });
    assert.equal(result.ok, true);
  }
  assert.equal(requests[0].url, raw);
  assert.equal(requests[1].url, raw + '/fail');
  assert.ok(requests.every(r => r.options.redirect === 'error' && !r.options.body && r.options.signal));
});

test('redirects, malformed destinations and absent configuration fail closed without revealing tokens', async () => {
  for (const url of [undefined, 'http://incidents.betterstack.com/api/v1/heartbeat/secret',
    'https://incidents.betterstack.com.attacker.invalid/api/v1/heartbeat/secret',
    'https://incidents.betterstack.com/api/v1/heartbeat/secret?key=secret',
    'https://secret@incidents.betterstack.com/api/v1/heartbeat/secret',
    'https://incidents.betterstack.com/api/v1/heartbeat/secret/fail']) {
    assert.throws(() => heartbeatDestination(url, 'success'), /heartbeat_not_configured|invalid_heartbeat_destination/u);
  }
  assert.throws(() => heartbeatDestination('https://uptime.betterstack.com/api/v1/heartbeat/token','cancelled'), /invalid_outcome/u);
  for (const request of [async () => new Response('', {status: 500}), async () => { throw new Error('network secret_token'); }]) {
    await assert.rejects(reportHeartbeat({url:'https://uptime.betterstack.com/api/v1/heartbeat/secret_token',outcome:'failure'},request),
      error => error.message === 'heartbeat_delivery_failed');
  }
});
