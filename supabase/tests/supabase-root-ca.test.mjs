import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// Public trust anchor from Supabase Dashboard > Database Settings > Download
// certificate. SHA-256 is the DER certificate fingerprint, not the PEM file hash.
// Source: https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt
const expectedFingerprint = '80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA';
const certificatePath = new URL('../../tools/certificates/supabase-root-2021.crt', import.meta.url);
const pem = readFileSync(certificatePath, 'utf8');

test('tracked trust anchor contains exactly one public PEM certificate and no private material', () => {
  assert.match(pem, /^-----BEGIN CERTIFICATE-----\r?\n[A-Za-z0-9+/=\r\n]+\r?\n-----END CERTIFICATE-----\s*$/u);
  assert.equal((pem.match(/-----BEGIN CERTIFICATE-----/gu) ?? []).length, 1);
  assert.equal((pem.match(/-----END CERTIFICATE-----/gu) ?? []).length, 1);
  assert.doesNotMatch(pem, /PRIVATE KEY|AGE-SECRET-KEY-/u);
});

test('public Supabase root has the independently checked DER SHA-256 fingerprint', () => {
  const certificate = new X509Certificate(pem);
  assert.equal(certificate.fingerprint256, expectedFingerprint);
});

test('Supabase certificate is a self-signed CA, not a pinned server leaf', () => {
  const certificate = new X509Certificate(pem);
  assert.equal(certificate.ca, true);
  assert.equal(certificate.subject, certificate.issuer);
  assert.match(certificate.subject, /CN=Supabase Root 2021 CA/u);
  assert.equal(certificate.verify(certificate.publicKey), true);
});

test('trusted root is currently valid with at least 30 days for reviewed rotation', () => {
  const certificate = new X509Certificate(pem), now = Date.now();
  assert.ok(Date.parse(certificate.validFrom) <= now, 'root must already be valid');
  assert.ok(Date.parse(certificate.validTo) > now + 30 * 24 * 60 * 60 * 1000, 'review the official CA before expiry; do not weaken TLS');
  assert.equal(new Date(certificate.validTo).toISOString(), '2031-04-26T10:56:53.000Z');
});

test('backup installs reviewed CA before export and includes installation in health outcome', () => {
  const workflow = readFileSync(new URL('../../.github/workflows/inquiry-backup.yml', import.meta.url), 'utf8');
  const clients = workflow.match(/id: clients\n\s+run: \|\n((?: {10}.*\n)+)/u)?.[1];
  assert.ok(clients, 'CA installation must belong to the existing clients step');
  const check = clients.indexOf('node --test supabase/tests/supabase-root-ca.test.mjs');
  const install = clients.indexOf('sudo install -m 0644 tools/certificates/supabase-root-2021.crt /usr/local/share/ca-certificates/homeground-supabase-root-2021.crt');
  const update = clients.indexOf('sudo update-ca-certificates');
  const trustCheck = clients.indexOf('openssl verify -CAfile /etc/ssl/certs/ca-certificates.crt /usr/local/share/ca-certificates/homeground-supabase-root-2021.crt');
  assert.ok(check >= 0 && install > check && update > install && trustCheck > update);
  assert.match(workflow, /steps\.clients\.outcome == 'success'/u);
  assert.match(workflow, /steps\.upload\.outcome == 'success'/u);
  assert.doesNotMatch(clients, /(?:curl|wget).*prod-ca-2021/u, 'use reviewed repository certificate rather than mutable download at runtime');
});
