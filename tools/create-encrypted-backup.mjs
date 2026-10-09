#!/usr/bin/env node
// Read-only, encrypted PostgreSQL backup. No dump is ever written as plaintext.
// CLI: SUPABASE_BACKUP_DB_URL=... BACKUP_AGE_RECIPIENT=age1... node
//   tools/create-encrypted-backup.mjs --output-dir <directory outside checkout>
// Optional CLI: --timeout-ms <1000..1800000> (default 900000).
// Credentials go only to libpq environment variables, never command arguments.
// Local fixture overrides exist only in the exported API and still verify TLS.
import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { mkdir, realpath, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const PROJECT_REF = 'xbymvlxethfzqcgyoieb';
export const BACKUP_SCHEMAS = Object.freeze(['public', 'homeground_private', 'auth', 'storage', 'extensions']);
// Schema selection alone omits extension definitions. The inquiries' UUID and
// digest functions need pgcrypto during restore (PostgreSQL 17 pg_dump -n/-e).
export const BACKUP_EXTENSIONS = Object.freeze(['pgcrypto']);
const CHECKOUT = fileURLToPath(new URL('..', import.meta.url));
const SAFE_CODES = new Set(['DATABASE_URL_MISSING', 'DATABASE_URL_INVALID', 'DATABASE_URL_OPTION_NOT_ALLOWED', 'DATABASE_PROJECT_MISMATCH', 'DATABASE_TLS_REQUIRED', 'AGE_RECIPIENT_MISSING', 'AGE_RECIPIENT_INVALID', 'OUTPUT_DIRECTORY_REQUIRED', 'OUTPUT_DIRECTORY_IN_CHECKOUT', 'BACKUP_TIMEOUT', 'PG_DUMP_UNAVAILABLE', 'PG_DUMP_FAILED', 'DATABASE_TLS_FAILED', 'AGE_UNAVAILABLE', 'AGE_ENCRYPTION_FAILED', 'OUTPUT_LIMIT_EXCEEDED', 'BACKUP_IO_FAILED', 'INVALID_ARGUMENT']);
export class BackupError extends Error {
  constructor(code) { super(SAFE_CODES.has(code) ? code : 'BACKUP_IO_FAILED'); this.code = this.message; }
}
const fail = code => { throw new BackupError(code); };

export function validateAgeRecipient(value) {
  if (!value?.trim()) fail('AGE_RECIPIENT_MISSING');
  const recipient = value.trim(), alphabet = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
  if (!/^age1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{58}$/u.test(recipient)) fail('AGE_RECIPIENT_INVALID');
  // Standard X25519 age recipients use Bech32, including a six-character checksum.
  const generators = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let checksum = 1;
  const values = [...[... 'age'].map(c => c.charCodeAt(0) >> 5), 0, ...[... 'age'].map(c => c.charCodeAt(0) & 31), ...[...recipient.slice(4)].map(c => alphabet.indexOf(c))];
  for (const value of values) {
    const top = checksum >>> 25;
    checksum = ((checksum & 0x1ffffff) << 5) ^ value;
    for (let bit = 0; bit < 5; bit++) if ((top >>> bit) & 1) checksum ^= generators[bit];
  }
  if ((checksum >>> 0) !== 1 || (alphabet.indexOf(recipient[55]) & 15) !== 0) fail('AGE_RECIPIENT_INVALID');
  return recipient;
}

export function parseDatabaseUrl(value, { allowLocalFixture = false, fixtureCaFile } = {}) {
  if (!value) fail('DATABASE_URL_MISSING');
  let url, user, password, database;
  try {
    url = new URL(value); user = decodeURIComponent(url.username); password = decodeURIComponent(url.password);
    database = decodeURIComponent(url.pathname.slice(1));
  } catch { fail('DATABASE_URL_INVALID'); }
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || url.hash || !/^[A-Za-z_][A-Za-z0-9_.-]{0,126}$/u.test(user) || !password || password.includes('\0') || !/^[A-Za-z_][A-Za-z0-9_]{0,62}$/u.test(database)) fail('DATABASE_URL_INVALID');
  for (const [key, val] of url.searchParams) {
    if (key !== 'sslmode') fail('DATABASE_URL_OPTION_NOT_ALLOWED');
    if (val !== 'verify-full') fail('DATABASE_TLS_REQUIRED');
  }
  const host = url.hostname, port = url.port || '5432';
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(host);
  if (allowLocalFixture && loopback) {
    if (!fixtureCaFile || !isAbsolute(fixtureCaFile)) fail('DATABASE_TLS_REQUIRED');
  } else {
    if (allowLocalFixture || fixtureCaFile || port !== '5432' || database !== 'postgres') fail('DATABASE_PROJECT_MISMATCH');
    const direct = host === `db.${PROJECT_REF}.supabase.co`;
    const pooler = /^[a-z0-9-]+\.pooler\.supabase\.com$/u.test(host) && user.endsWith(`.${PROJECT_REF}`);
    if (!direct && !pooler) fail('DATABASE_PROJECT_MISMATCH');
  }
  return { host: host === '[::1]' ? '::1' : host, port, user, password, database, rootCert: allowLocalFixture && loopback ? fixtureCaFile : 'system' };
}

export function buildPgDumpInvocation(connection, timeoutMs = 900000) {
  return {
    args: ['--format=custom', '--no-password', '--strict-names', '--serializable-deferrable', '--lock-wait-timeout=30000', ...BACKUP_SCHEMAS.map(schema => `--schema=${schema}`), ...BACKUP_EXTENSIONS.map(extension => `--extension=${extension}`)],
    // Do not inherit PG*, PGSERVICE, SSL_CERT_FILE, or OPENSSL_CONF from the runner.
    env: {
      PATH: process.env.PATH || '/usr/bin:/bin', LANG: 'C', LC_ALL: 'C',
      PGHOST: connection.host, PGPORT: connection.port, PGUSER: connection.user, PGPASSWORD: connection.password,
      PGDATABASE: connection.database, PGSSLMODE: 'verify-full', PGSSLROOTCERT: connection.rootCert,
      PGCONNECT_TIMEOUT: '15', PGAPPNAME: 'homeground-readonly-backup',
      PGOPTIONS: `-c default_transaction_read_only=on -c statement_timeout=${timeoutMs} -c idle_in_transaction_session_timeout=${timeoutMs}`,
    },
  };
}

async function resolveExistingParent(path) {
  let parent = path, tail = [];
  for (;;) {
    try { return resolve(await realpath(parent), ...tail.reverse()); }
    catch { const next = dirname(parent); if (next === parent) fail('BACKUP_IO_FAILED'); tail.push(parent.slice(next.length + (next.endsWith('/') ? 0 : 1))); parent = next; }
  }
}
async function outputDirectory(value) {
  if (!value) fail('OUTPUT_DIRECTORY_REQUIRED');
  const destination = await resolveExistingParent(resolve(value)), checkout = await realpath(CHECKOUT);
  const displacement = relative(checkout, destination);
  if (!displacement || (displacement !== '..' && !displacement.startsWith(`..${sep}`) && !isAbsolute(displacement))) fail('OUTPUT_DIRECTORY_IN_CHECKOUT');
  await mkdir(destination, { recursive: true, mode: 0o700 });
  return destination;
}
function watchChild(child, kind) {
  let tlsFailure = false, inspected = 0;
  // Inspect a bounded prefix only to classify TLS errors; never persist stderr.
  child.stderr?.on('data', chunk => {
    if (inspected >= 8192) return;
    const prefix = chunk.subarray(0, 8192 - inspected).toString(); inspected += chunk.length;
    if (/certificate verify failed|certificate.*(expired|verify|does not match)|SSL error|TLS handshake/iu.test(prefix)) tlsFailure = true;
  });
  return new Promise((resolvePromise, reject) => {
    child.once('error', () => reject(new BackupError(kind === 'pg' ? 'PG_DUMP_UNAVAILABLE' : 'AGE_UNAVAILABLE')));
    child.once('close', code => code === 0 ? resolvePromise() : reject(new BackupError(kind === 'pg' ? (tlsFailure ? 'DATABASE_TLS_FAILED' : 'PG_DUMP_FAILED') : 'AGE_ENCRYPTION_FAILED')));
  });
}

export async function createEncryptedBackup({
  dbUrl = process.env.SUPABASE_BACKUP_DB_URL, recipient = process.env.BACKUP_AGE_RECIPIENT,
  outputDir, timeoutMs = 900000, maxEncryptedBytes = 2 * 1024 ** 3,
  allowLocalFixture = false, fixtureCaFile,
} = {}, { spawnProcess = spawn, now = () => new Date() } = {}) {
  const children = [], timers = [], running = [];
  let partialPath, encryptedPath, manifestPath, completed = false;
  try {
    if (!Number.isInteger(timeoutMs) || timeoutMs < 1000 || timeoutMs > 1800000 || !Number.isSafeInteger(maxEncryptedBytes) || maxEncryptedBytes < 1) fail('INVALID_ARGUMENT');
    const connection = parseDatabaseUrl(dbUrl, { allowLocalFixture, fixtureCaFile });
    const publicRecipient = validateAgeRecipient(recipient), destination = await outputDirectory(outputDir);
    const startedAt = now().toISOString(), stamp = startedAt.replace(/[-:.]/gu, ''), name = `homeground-${stamp}-${randomUUID().slice(0, 8)}.dump.age`;
    encryptedPath = join(destination, name); partialPath = `${encryptedPath}.partial`; manifestPath = join(destination, 'manifest.json');
    const dump = buildPgDumpInvocation(connection, timeoutMs);
    const age = spawnProcess('age', ['--encrypt', '--recipient', publicRecipient], { env: { PATH: dump.env.PATH, LANG: 'C', LC_ALL: 'C' }, stdio: ['pipe', 'pipe', 'pipe'] });
    children.push(age); const ageResult = watchChild(age, 'age'); running.push(ageResult);
    const pg = spawnProcess('pg_dump', dump.args, { env: dump.env, stdio: ['ignore', 'pipe', 'pipe'] });
    children.push(pg); const pgResult = watchChild(pg, 'pg'); running.push(pgResult);
    let encryptedBytes = 0; const hash = createHash('sha256');
    const limiter = new Transform({ transform(chunk, _encoding, callback) {
      encryptedBytes += chunk.length;
      hash.update(chunk);
      callback(encryptedBytes > maxEncryptedBytes ? new BackupError('OUTPUT_LIMIT_EXCEEDED') : null, chunk);
    } });
    running.push(pipeline(pg.stdout, age.stdin), pipeline(age.stdout, limiter, createWriteStream(partialPath, { flags: 'wx', mode: 0o600 })));
    const work = Promise.all(running);
    const deadline = new Promise((_, reject) => timers.push(setTimeout(() => reject(new BackupError('BACKUP_TIMEOUT')), timeoutMs)));
    await Promise.race([work, deadline]);
    if (encryptedBytes < 100) fail('AGE_ENCRYPTION_FAILED');
    const completedAt = now().toISOString(), sha256 = hash.digest('hex');
    await rename(partialPath, encryptedPath);
    const manifest = {
      schemaVersion: 1, projectRef: PROJECT_REF, startedAt, completedAt,
      scope: {
        schemas: [...BACKUP_SCHEMAS], extensions: [...BACKUP_EXTENSIONS], format: 'postgresql-custom',
        storageObjectFilesIncluded: false, globalRolesIncluded: false,
        restorePrerequisites: { destinationRolesRequired: true, platformExtensionDefinitionsNotIncluded: ['pg_cron', 'pg_net'] },
      },
      encryption: 'age-X25519', encryptedFile: name, encryptedBytes, sha256,
    };
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
    completed = true;
    return { ok: true, status: 'healthy', severity: 'info', details: { code: 'BACKUP_ENCRYPTED', ...manifest }, encryptedPath, manifestPath };
  } catch (error) {
    return { ok: false, status: 'critical', severity: 'critical', details: { code: error instanceof BackupError ? error.code : 'BACKUP_IO_FAILED' } };
  } finally {
    timers.forEach(clearTimeout);
    for (const child of children) if (child.exitCode === null && child.signalCode === null) child.kill('SIGTERM');
    // Finish stream cleanup before removing partial files; never leave writers open.
    if (running.length) {
      const hardKill = setTimeout(() => {
        for (const child of children) if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
      }, 1000);
      await Promise.allSettled(running); clearTimeout(hardKill);
    }
    if (!completed) {
      for (const path of [partialPath, encryptedPath]) if (path) await rm(path, { force: true }).catch(() => {});
    }
  }
}

export async function runCli(argv = process.argv.slice(2), env = process.env, output = console.log) {
  let outputDir, timeoutMs = 900000;
  try {
    for (let index = 0; index < argv.length; index++) {
      if (argv[index] === '--output-dir' && argv[index + 1]) outputDir = argv[++index];
      else if (argv[index] === '--timeout-ms' && argv[index + 1]) timeoutMs = Number(argv[++index]);
      else fail('INVALID_ARGUMENT');
    }
    const result = await createEncryptedBackup({ dbUrl: env.SUPABASE_BACKUP_DB_URL, recipient: env.BACKUP_AGE_RECIPIENT, outputDir, timeoutMs });
    output(JSON.stringify(result)); return result.ok ? 0 : 1;
  } catch (error) { output(JSON.stringify({ ok: false, status: 'critical', severity: 'critical', details: { code: error instanceof BackupError ? error.code : 'BACKUP_IO_FAILED' } })); return 1; }
}
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) process.exitCode = await runCli();
