import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PassThrough } from 'node:stream';
import test from 'node:test';
import { BACKUP_EXTENSIONS, BACKUP_SCHEMAS, PROJECT_REF, buildPgDumpInvocation, createEncryptedBackup, parseDatabaseUrl, runCli, validateAgeRecipient } from '../../tools/create-encrypted-backup.mjs';

// Disposable crypto fixtures only. They are never repository/CI backup identities.
const directory = mkdtempSync(join(tmpdir(), 'homeground-encrypted-backup-test-'));
const keyPath = join(directory, 'fixture.key');
execFileSync('age-keygen', ['-o', keyPath], { stdio: 'pipe' });
const recipient = execFileSync('age-keygen', ['-y', keyPath], { encoding: 'utf8', stdio: 'pipe' }).trim();
test.after(() => rmSync(directory, { recursive: true, force: true }));
const dbUrl = `postgresql://postgres:top-secret-password@db.${PROJECT_REF}.supabase.co:5432/postgres`;
const outputDir = () => mkdtempSync(join(directory, 'output-'));
const fixtureBytes = Buffer.from('PGDMP\x01\x10\x00 disposable inquiry: alice-fixture@example.invalid\nprivate notification_outbox fixture\n');
const options = () => ({ dbUrl, recipient, outputDir: outputDir() });
const codeOf = result => result.details.code;
function fakeDump(program, inspect = () => {}) {
  return (command, args, spawnOptions) => {
    if (command !== 'pg_dump') return spawn(command, args, spawnOptions);
    inspect(args, spawnOptions);
    return spawn(process.execPath, ['-e', program], spawnOptions);
  };
}

// Each write is a distinct stderr data event, even when OS pipe buffering would
// coalesce a real process's writes. age still runs as the real encryption tool.
function chunkedDump(chunks) {
  return (command, args, childOptions) => {
    if (command !== 'pg_dump') return spawn(command, args, childOptions);
    const child = new EventEmitter();
    child.stdout = new PassThrough(); child.stderr = new PassThrough();
    child.exitCode = null; child.signalCode = null;
    child.kill = signal => {
      if (child.exitCode !== null || child.signalCode !== null) return false;
      child.signalCode = signal; child.stdout.destroy(); child.stderr.destroy(); child.emit('close', null); return true;
    };
    queueMicrotask(() => {
      child.stdout.end(fixtureBytes);
      for (const chunk of chunks) child.stderr.write(chunk);
      child.stderr.end(); child.exitCode = 1; child.emit('close', 1);
    });
    return child;
  };
}

test('strict known-project URLs and standard age recipient reject unsafe configuration', () => {
  assert.equal(validateAgeRecipient(recipient), recipient);
  for (const value of ['', 'AGE-SECRET-KEY-1fixture', 'ssh-ed25519 fixture']) assert.throws(() => validateAgeRecipient(value));
  // A randomly generated valid recipient may already end in q.
  const corruptedRecipient = `${recipient.slice(0, -1)}${recipient.endsWith('q') ? 'p' : 'q'}`;
  assert.notEqual(corruptedRecipient, recipient);
  assert.throws(() => validateAgeRecipient(corruptedRecipient), { code: 'AGE_RECIPIENT_INVALID' });
  assert.throws(() => parseDatabaseUrl(), /DATABASE_URL_MISSING/);
  for (const value of ['not-a-url', 'https://postgres:secret@example.invalid/postgres', `postgresql://postgres@db.${PROJECT_REF}.supabase.co/postgres`]) assert.throws(() => parseDatabaseUrl(value), /DATABASE_URL_INVALID/);
  assert.throws(() => parseDatabaseUrl(dbUrl.replace(PROJECT_REF, 'wrong-project')), /DATABASE_PROJECT_MISMATCH/);
  assert.throws(() => parseDatabaseUrl(`${dbUrl}?sslmode=require`), /DATABASE_TLS_REQUIRED/);
  assert.throws(() => parseDatabaseUrl(`${dbUrl}?sslrootcert=evil`), /DATABASE_URL_OPTION_NOT_ALLOWED/);
  assert.throws(() => parseDatabaseUrl(dbUrl.replace(':5432', ':6543')), /DATABASE_PROJECT_MISMATCH/);
  assert.equal(parseDatabaseUrl(`postgresql://postgres.${PROJECT_REF}:secret@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres`).rootCert, 'system');
});

test('local fixture opt-in is loopback-only and still mandates a CA and verify-full', () => {
  const local = 'postgresql://postgres:fixture@localhost:55493/postgres';
  assert.throws(() => parseDatabaseUrl(local), /DATABASE_PROJECT_MISMATCH/);
  assert.throws(() => parseDatabaseUrl(local, { allowLocalFixture: true }), /DATABASE_TLS_REQUIRED/);
  assert.throws(() => parseDatabaseUrl(dbUrl, { allowLocalFixture: true, fixtureCaFile: '/tmp/ca.crt' }), /DATABASE_PROJECT_MISMATCH/);
  const connection = parseDatabaseUrl(local, { allowLocalFixture: true, fixtureCaFile: '/tmp/ca.crt' });
  const invocation = buildPgDumpInvocation(connection);
  assert.equal(invocation.env.PGSSLMODE, 'verify-full');
  assert.equal(invocation.env.PGSSLROOTCERT, '/tmp/ca.crt');
});

test('backup uses env credentials, consistent read-only snapshot, and all inquiry schemas', () => {
  const invocation = buildPgDumpInvocation(parseDatabaseUrl(dbUrl), 60000);
  assert.equal(invocation.env.PGPASSWORD, 'top-secret-password');
  assert.equal(invocation.env.PGSSLROOTCERT, 'system');
  assert.equal(invocation.env.PGSSLMODE, 'verify-full');
  assert.match(invocation.env.PGOPTIONS, /default_transaction_read_only=on/u);
  assert.match(invocation.env.PGOPTIONS, /statement_timeout=60000/u);
  assert.ok(invocation.args.includes('--serializable-deferrable'));
  assert.ok(invocation.args.includes('--no-password'));
  assert.ok(invocation.args.includes('--format=custom'));
  assert.deepEqual(BACKUP_SCHEMAS, ['public', 'homeground_private', 'auth', 'storage', 'extensions']);
  assert.ok(invocation.args.includes('--schema=homeground_private'));
  assert.deepEqual(BACKUP_EXTENSIONS, ['pgcrypto']);
  assert.ok(invocation.args.includes('--extension=pgcrypto'), 'the schema filter must include the inquiry UUID/digest extension definition');
  assert.ok(!JSON.stringify(invocation.args).includes('top-secret-password'));
  for (const unsafe of ['PGSERVICE', 'PGSERVICEFILE', 'PGPASSFILE', 'SSL_CERT_FILE', 'OPENSSL_CONF']) assert.equal(invocation.env[unsafe], undefined);
});

test('real age encrypt/decrypt roundtrip writes only ciphertext and safe manifest', async () => {
  const configuration = options();
  const result = await createEncryptedBackup(configuration, {
    spawnProcess: fakeDump(`process.stdout.write(Buffer.from('${fixtureBytes.toString('base64')}', 'base64'))`, (args, child) => {
      assert.ok(!JSON.stringify(args).includes('top-secret-password'));
      assert.equal(child.env.PGSSLMODE, 'verify-full');
    }),
  });
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(result.status, 'healthy');
  const files = readdirSync(configuration.outputDir);
  assert.equal(files.length, 2);
  assert.ok(files.every(name => name.endsWith('.dump.age') || name === 'manifest.json'));
  const ciphertext = readFileSync(result.encryptedPath), manifest = JSON.parse(readFileSync(result.manifestPath, 'utf8'));
  assert.ok(ciphertext.subarray(0, 24).toString().startsWith('age-encryption.org/v1'));
  assert.deepEqual(execFileSync('age', ['--decrypt', '--identity', keyPath, result.encryptedPath], { stdio: 'pipe' }), fixtureBytes);
  assert.equal(manifest.sha256, createHash('sha256').update(ciphertext).digest('hex'));
  assert.equal(manifest.encryptedBytes, ciphertext.length);
  assert.deepEqual(manifest.scope.schemas, [...BACKUP_SCHEMAS]);
  assert.deepEqual(manifest.scope.extensions, ['pgcrypto']);
  assert.equal(manifest.scope.storageObjectFilesIncluded, false);
  assert.equal(manifest.scope.globalRolesIncluded, false);
  assert.deepEqual(manifest.scope.restorePrerequisites, { destinationRolesRequired: true, platformExtensionDefinitionsNotIncluded: ['pg_cron', 'pg_net'] });
  assert.equal(statSync(result.encryptedPath).mode & 0o777, 0o600);
  assert.equal(statSync(result.manifestPath).mode & 0o777, 0o600);
  const serialized = JSON.stringify(result) + JSON.stringify(manifest) + ciphertext.toString();
  for (const secret of ['top-secret-password', 'alice-fixture@example.invalid', 'AGE-SECRET-KEY-', dbUrl]) assert.ok(!serialized.includes(secret), `must not expose ${secret === dbUrl ? 'database URL' : 'fixture secret'}`);
});

test('missing credentials or recipient is unhealthy and starts no child process', async () => {
  for (const [configuration, expected] of [
    [{ ...options(), dbUrl: '' }, 'DATABASE_URL_MISSING'],
    [{ ...options(), recipient: '' }, 'AGE_RECIPIENT_MISSING'],
    [{ ...options(), recipient: 'age1malformed' }, 'AGE_RECIPIENT_INVALID'],
  ]) {
    const result = await createEncryptedBackup(configuration, { spawnProcess: () => assert.fail('no process allowed for invalid config') });
    assert.equal(result.ok, false); assert.equal(codeOf(result), expected);
    assert.deepEqual(readdirSync(configuration.outputDir), []);
  }
});

test('untrusted/expired TLS failures are classified without persisting credential stderr or partial files', async () => {
  for (const reason of ['SSL error: certificate verify failed', 'server certificate has expired', 'server certificate does not match host name']) {
    const configuration = options();
    const stderr = `${reason}; top-secret-password alice-fixture@example.invalid`;
    const result = await createEncryptedBackup(configuration, { spawnProcess: fakeDump(`process.stderr.write(${JSON.stringify(stderr)});process.exit(1)`) });
    assert.equal(result.ok, false); assert.equal(codeOf(result), 'DATABASE_TLS_FAILED');
    assert.deepEqual(readdirSync(configuration.outputDir), []);
    assert.ok(!JSON.stringify(result).includes('top-secret-password'));
    assert.ok(!JSON.stringify(result).includes('alice-fixture@example.invalid'));
  }
});

const diagnosticCases = [
  ['DATABASE_AUTH_FAILED', ['password authentication failed for user "fixture-user"', 'fe_sendauth: no password supplied', 'FATAL: Tenant or user not found']],
  ['DATABASE_PERMISSION_DENIED', ['query failed: ERROR: permission denied for table refresh_tokens', 'query failed: ERROR: permission denied for schema auth', 'query would be affected by row-level security policy for table inquiries']],
  ['DATABASE_VERSION_MISMATCH', ['aborting because of server version mismatch', 'unsupported server version: 18.0']],
  ['DATABASE_SCHEMA_MISSING', ['no matching schemas were found for pattern "auth"', 'no matching extensions were found for pattern "pgcrypto"']],
  ['DATABASE_CONNECTION_FAILED', ['could not translate host name "fixture.invalid" to address: Name or service not known', 'connection to server failed: Connection refused', 'connection to server failed: timeout expired', 'server closed the connection unexpectedly']],
  ['DATABASE_STARTUP_REJECTED', ['FATAL: unsupported startup parameter: options', 'FATAL: unrecognized startup option: options']],
];
for (const [expected, reasons] of diagnosticCases) {
  test(`pg_dump ${expected} is classified across split chunks without leaking or leaving partial files`, async () => {
    for (const reason of reasons) {
      const configuration = options(), split = Math.floor(reason.length / 2);
      const chunks = [Buffer.from(`pg_dump: error: ${reason.slice(0, split)}`),
        Buffer.from(`${reason.slice(split)}\n${dbUrl}\nalice-fixture@example.invalid\n`)];
      const result = await createEncryptedBackup(configuration, {spawnProcess: chunkedDump(chunks)});
      assert.equal(result.ok, false); assert.equal(result.status, 'critical'); assert.equal(codeOf(result), expected);
      assert.deepEqual(readdirSync(configuration.outputDir), []);
      assert.deepEqual(Object.keys(result).sort(), ['details','ok','severity','status']);
      for (const forbidden of [reason, dbUrl, 'top-secret-password', 'alice-fixture@example.invalid']) {
        assert.ok(!JSON.stringify(result).includes(forbidden), 'only a fixed diagnostic code may be returned');
      }
    }
  });
}

test('split TLS errors override another recognized failure and unknown errors remain generic', async () => {
  for (const [chunks, expected] of [
    [['password authentication failed for user fixture\nSSL error: certifi', 'cate verify failed\n'], 'DATABASE_TLS_FAILED'],
    [['unexpected dump failure: top-secret-password alice-fixture@example.invalid'], 'PG_DUMP_FAILED'],
  ]) {
    const configuration = options();
    const result = await createEncryptedBackup(configuration, {spawnProcess: chunkedDump(chunks.map(chunk => Buffer.from(chunk)))});
    assert.equal(codeOf(result), expected); assert.deepEqual(readdirSync(configuration.outputDir), []);
    assert.ok(!JSON.stringify(result).includes('top-secret-password'));
    assert.ok(!JSON.stringify(result).includes('alice-fixture@example.invalid'));
  }
});

test('stderr classification never inspects bytes beyond the fixed 8192-byte prefix', async () => {
  for (const chunks of [
    [Buffer.alloc(8192, 120), Buffer.from('SSL error: certificate verify failed')],
    [Buffer.concat([Buffer.alloc(8192, 120), Buffer.from('password authentication failed')])],
  ]) {
    const configuration = options();
    const result = await createEncryptedBackup(configuration, {spawnProcess: chunkedDump(chunks)});
    assert.equal(codeOf(result), 'PG_DUMP_FAILED'); assert.deepEqual(readdirSync(configuration.outputDir), []);
  }
});

test('failed pg_dump removes completed age ciphertext instead of reporting an empty healthy backup', async () => {
  const configuration = options();
  const result = await createEncryptedBackup(configuration, { spawnProcess: fakeDump("process.stdout.write('incomplete sensitive rows');process.stderr.write('password redacted-by-design');process.exitCode=2") });
  assert.equal(result.ok, false); assert.equal(codeOf(result), 'PG_DUMP_FAILED');
  assert.deepEqual(readdirSync(configuration.outputDir), []);
});

test('deadline terminates the read-only child and removes partial ciphertext', async () => {
  const configuration = { ...options(), timeoutMs: 1000 };
  const started = Date.now();
  const result = await createEncryptedBackup(configuration, { spawnProcess: fakeDump("process.stdout.write('fixture partial');setInterval(()=>{},10000)") });
  assert.equal(codeOf(result), 'BACKUP_TIMEOUT');
  assert.ok(Date.now() - started < 4000);
  assert.deepEqual(readdirSync(configuration.outputDir), []);
});

test('ciphertext size bound fails safely and removes output', async () => {
  const configuration = { ...options(), maxEncryptedBytes: 100 };
  const result = await createEncryptedBackup(configuration, { spawnProcess: fakeDump("process.stdout.write(Buffer.alloc(65536,65))") });
  assert.equal(result.ok, false); assert.equal(codeOf(result), 'OUTPUT_LIMIT_EXCEEDED');
  assert.deepEqual(readdirSync(configuration.outputDir), []);
});

test('missing client binaries fail rather than treating a zero-byte export as healthy', async () => {
  for (const [missing, expected] of [['age', 'AGE_UNAVAILABLE'], ['pg_dump', 'PG_DUMP_UNAVAILABLE']]) {
    const configuration = options();
    const result = await createEncryptedBackup(configuration, { spawnProcess: (command, args, child) => {
      if (command === missing) return spawn(join(directory, 'does-not-exist'), args, child);
      if (command === 'pg_dump') return spawn(process.execPath, ['-e', "process.stdout.write('fixture')"], child);
      return spawn(command, args, child);
    } });
    assert.equal(codeOf(result), expected);
    assert.deepEqual(readdirSync(configuration.outputDir), []);
  }
});

test('output refuses checkout paths and symlinks into the checkout', async () => {
  const checkout = new URL('../..', import.meta.url).pathname;
  for (const output of [join(checkout, 'backup-fixture'), join(checkout, '..backup-fixture')]) {
    const result = await createEncryptedBackup({ ...options(), outputDir: output });
    assert.equal(codeOf(result), 'OUTPUT_DIRECTORY_IN_CHECKOUT');
  }
  const link = join(directory, 'checkout-link'); symlinkSync(checkout, link);
  assert.equal(codeOf(await createEncryptedBackup({ ...options(), outputDir: join(link, 'backups') })), 'OUTPUT_DIRECTORY_IN_CHECKOUT');
});

test('CLI emits non-sensitive failed JSON and exits nonzero for absent configuration', async () => {
  const lines = [];
  assert.equal(await runCli(['--output-dir', outputDir()], {}, line => lines.push(line)), 1);
  assert.equal(JSON.parse(lines[0]).details.code, 'DATABASE_URL_MISSING');
  const invalid = [];
  assert.equal(await runCli(['--unknown', 'top-secret-password'], {}, line => invalid.push(line)), 1);
  assert.equal(JSON.parse(invalid[0]).details.code, 'INVALID_ARGUMENT');
  assert.ok(!invalid[0].includes('top-secret-password'));
});

test('workflow uploads only encrypted artifacts and requires upload success for heartbeat health', () => {
  const workflow = readFileSync(new URL('../../.github/workflows/inquiry-backup.yml', import.meta.url), 'utf8');
  assert.match(workflow, /github\.ref == 'refs\/heads\/main'/u);
  assert.match(workflow, /retention-days: 30/u);
  assert.match(workflow, /steps\.upload\.outcome == 'success'/u);
  assert.match(workflow, /if-no-files-found: error/u);
  const artifactPaths = workflow.match(/path: \|\n((?:\s{12}.+\n)+)/u)?.[1].trim().split('\n').map(value => value.trim());
  assert.deepEqual(artifactPaths, ['${{ runner.temp }}/homeground-encrypted-backup/*.dump.age', '${{ runner.temp }}/homeground-encrypted-backup/manifest.json']);
  assert.ok(!workflow.includes('AGE-SECRET-KEY-'));
  assert.ok(!workflow.includes('SUPABASE_BACKUP_DB_URL }}"'));
});
