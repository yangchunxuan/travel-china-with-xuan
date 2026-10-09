import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash, randomUUID} from 'node:crypto';
import {chmodSync, existsSync, readFileSync, readdirSync, statSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';
import {createEncryptedBackup, BACKUP_SCHEMAS} from '../../tools/create-encrypted-backup.mjs';
import {createIsolatedInquiryDatabase} from '../../tools/run-inquiry-recovery-drill.mjs';

const run = (command, args, options = {}) => execFileSync(command, args, {
  encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], timeout: 30_000,
  maxBuffer: 4 * 1024 * 1024, ...options,
});
const digest = value => createHash('sha256').update(value).digest('hex');

// Reuse the fixture's private Homebrew relocation if one was needed. Nothing
// outside this fresh temporary directory is changed, including installed tools.
function controlCommand(directory) {
  const search = folder => {
    for (const entry of readdirSync(folder, {withFileTypes: true})) {
      const path = join(folder, entry.name);
      if (entry.isFile() && entry.name === 'pg_ctl') return path;
      if (entry.isDirectory()) { const found = search(path); if (found) return found; }
    }
  };
  const runtime = join(directory, 'runtime');
  return existsSync(runtime) ? search(runtime) || 'pg_ctl' : 'pg_ctl';
}

function enableFixtureTls(database) {
  const directory = database.directory;
  const ca = join(directory, 'ca.pem'), caKey = join(directory, 'ca.key');
  const key = join(directory, 'server.key'), csr = join(directory, 'server.csr');
  const certificate = join(directory, 'server.pem'), extension = join(directory, 'server.ext');
  run('openssl', ['req', '-new', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '2',
    '-subj', '/CN=Homeground disposable backup CA', '-keyout', caKey, '-out', ca]);
  run('openssl', ['req', '-new', '-newkey', 'rsa:2048', '-nodes', '-subj', '/CN=localhost',
    '-keyout', key, '-out', csr]);
  // No IP SAN: the negative test proves verify-full also enforces hostnames.
  writeFileSync(extension, 'subjectAltName=DNS:localhost\nextendedKeyUsage=serverAuth\n');
  run('openssl', ['x509', '-req', '-in', csr, '-CA', ca, '-CAkey', caKey, '-CAcreateserial',
    '-days', '2', '-extfile', extension, '-out', certificate]);
  chmodSync(key, 0o600); chmodSync(caKey, 0o600);
  for (const [setting, value] of [['ssl', 'on'], ['log_connections', 'on'], ['ssl_cert_file', certificate], ['ssl_key_file', key], ['ssl_ca_file', ca]]) {
    database.sql(`alter system set ${setting} = ${database.quote(value)};`);
  }
  // The helper's SQL connections stay on its private socket. Only this fixture
  // additionally listens on loopback, for an actual PostgreSQL TLS connection.
  const control = controlCommand(directory), data = join(directory, 'data');
  run(control, ['-D', data, '-m', 'fast', '-w', 'stop']);
  run(control, ['-D', data, '-l', join(directory, 'server.log'), '-o',
    `-h 127.0.0.1 -k ${directory} -p 55493`, '-w', 'start']);
  assert.equal(database.sql('show ssl;'), 'on');
  return ca;
}

function inventory(database, name) {
  const metadata = JSON.parse(database.sql(`select jsonb_build_object(
    'schemas',(select jsonb_agg(jsonb_build_object('name',nspname,'acl',nspacl::text) order by nspname)
      from pg_namespace where nspname in ('public','homeground_private','auth','storage','extensions')),
    'tables',(select jsonb_agg(jsonb_build_object('name',relname,'rls',relrowsecurity,
      'forced',relforcerowsecurity,'acl',coalesce(relacl,acldefault('r',relowner))::text) order by relname)
      from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='homeground_private' and relkind='r'),
    'functions',(select jsonb_agg(jsonb_build_object('name',proname,
      'signature',pg_get_function_identity_arguments(p.oid),'definition',md5(pg_get_functiondef(p.oid)),
      'acl',proacl::text) order by proname,pg_get_function_identity_arguments(p.oid))
      from pg_proc p join pg_namespace n on n.oid=p.pronamespace
      where n.nspname in ('public','homeground_private') and prokind='f'))`, name));
  const data = metadata.tables.map(({name: table}) => {
    assert.match(table, /^[a-z][a-z0-9_]+$/u);
    return {table, ...JSON.parse(database.sql(`select jsonb_build_object('count',count(*),
      'hash',md5(coalesce(jsonb_agg(to_jsonb(t) order by to_jsonb(t)::text)::text,'[]')))
      from homeground_private.${table} t;`, name))};
  });
  return {metadata, data};
}

test('real TLS PostgreSQL streams an encrypted backup that restores inquiry data and protection', {timeout: 120_000}, async t => {
  const required = process.env.CI === 'true' || ['1','true'].includes(process.env.REQUIRE_ISOLATED_POSTGRES);
  let database;
  try {
    for (const command of ['openssl','age','age-keygen','pg_dump','pg_restore']) run(command, ['--version']);
    database = createIsolatedInquiryDatabase();
  } catch (error) {
    if (error.code === 'ENOENT' && !required) { t.skip('PostgreSQL, age and OpenSSL are required for this disposable drill'); return; }
    throw error;
  }
  t.after(() => database.close());
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('outgoing_http_forbidden_in_backup_fixture'); };
  t.after(() => { globalThis.fetch = originalFetch; });
  const ca = enableFixtureTls(database);
  database.sql('create schema auth; create schema storage;');
  const identity = join(database.directory, 'identity.age');
  run('age-keygen', ['-o', identity]); chmodSync(identity, 0o600);
  const recipient = run('age-keygen', ['-y', identity]).trim();
  const email = 'backup-traveller@example.invalid';
  const submission = database.rpc('create_homeground_homepage_email_v1', {
    p_schema_version: 3, p_form_version: '2026-07-26.1', p_locale: 'en', p_contact_email: email,
    p_privacy_notice_version: '2026-07-26.1', p_landing_path: '/', p_attribution: {},
    p_idempotency_key_hash: digest(randomUUID()), p_payload_hash: digest(randomUUID()),
    p_rate_limit_subject_hash: digest(randomUUID()), p_short_rate_limit: 5, p_daily_rate_limit: 20,
    p_first_response_due_at: new Date(Date.now() + 86_400_000).toISOString(),
  });
  assert.equal(submission.outcome, 'created');
  const count = (table, name = 'postgres') => Number(database.sql(`select count(*) from homeground_private.${table};`, name));
  assert.equal(count('inquiries'), 1); assert.equal(count('notification_outbox'), 1);
  const before = inventory(database, 'postgres');
  const options = {dbUrl: 'postgresql://postgres:disposable-fixture@localhost:55493/postgres', recipient,
    outputDir: join(database.directory, 'encrypted'), allowLocalFixture: true, fixtureCaFile: ca, timeoutMs: 30_000};
  let encrypted;

  await t.test('production backup code uses real verify-full TLS and leaves only ciphertext plus a safe receipt', async () => {
    encrypted = await createEncryptedBackup(options);
    assert.equal(encrypted.ok, true, JSON.stringify(encrypted));
    assert.equal(encrypted.details.code, 'BACKUP_ENCRYPTED');
    assert.deepEqual(encrypted.details.scope.schemas, BACKUP_SCHEMAS);
    assert.ok(encrypted.details.scope.schemas.includes('homeground_private'));
    assert.ok(readFileSync(join(database.directory, 'server.log'), 'utf8').split('\n').some(line =>
      line.includes('application_name=homeground-readonly-backup') && line.includes('SSL enabled')),
    'the PostgreSQL server itself observed TLS on the actual backup connection');
    const ciphertext = readFileSync(encrypted.encryptedPath), receipt = readFileSync(encrypted.manifestPath, 'utf8');
    assert.ok(ciphertext.subarray(0, 80).toString().startsWith('age-encryption.org/v1'));
    assert.equal(ciphertext.includes(Buffer.from(email)), false);
    assert.equal(digest(ciphertext), encrypted.details.sha256);
    assert.equal(JSON.parse(receipt).encryptedBytes, ciphertext.length);
    assert.doesNotMatch(receipt, /postgresql:|disposable-fixture|backup-traveller|AGE-SECRET/u);
    assert.deepEqual(readdirSync(options.outputDir).sort(), [encrypted.details.encryptedFile, 'manifest.json'].sort());
    assert.equal(statSync(options.outputDir).mode & 0o777, 0o700);
    for (const file of [encrypted.encryptedPath, encrypted.manifestPath]) assert.equal(statSync(file).mode & 0o777, 0o600);
  });
  await t.test('actual age decrypt and pg_restore preserve every private table, functions, forced RLS and access rules', () => {
    const archive = join(database.directory, 'decrypted.dump');
    run('age', ['--decrypt', '-i', identity, '-o', archive, encrypted.encryptedPath]); chmodSync(archive, 0o600);
    database.sql('create database restored;');
    // Preserve this fresh database's empty standard public schema and default
    // PUBLIC USAGE. pg_dump assumes those defaults exist; dropping the schema
    // then recreating it loses them. Exclude only its duplicate CREATE SCHEMA
    // entry, retaining any backed-up nondefault ACL or comment entries.
    const list = run('pg_restore', ['--list', archive]);
    const publicCreation = /^\d+; \d+ \d+ SCHEMA - public /u;
    assert.equal(list.split('\n').filter(line => publicCreation.test(line)).length, 1);
    const restoreList = join(database.directory, 'restore.list');
    writeFileSync(restoreList, list.split('\n').filter(line => !publicCreation.test(line)).join('\n'), {mode: 0o600});
    try {
      run('pg_restore', ['-h', database.directory, '-p', '55493', '-U', 'postgres', '--dbname=restored',
        '--exit-on-error', '--single-transaction', '--no-owner', '--use-list', restoreList, archive]);
    } catch (error) { throw new Error(`isolated_pg_restore_failed: ${String(error.stderr).slice(0, 800)}`); }
    assert.deepEqual(inventory(database, 'restored'), before);
    assert.equal(count('inquiries', 'restored'), 1); assert.equal(count('notification_outbox', 'restored'), 1);
    assert.equal(database.sql("select extnamespace::regnamespace::text from pg_extension where extname='pgcrypto';", 'restored'), 'extensions');
    assert.ok(database.rpc('get_homeground_admin_insights', {}, 'restored'));
    assert.throws(() => database.sql('set role anon; select * from homeground_private.inquiries;', 'restored'));
  });
  await t.test('untrusted CA and wrong hostname cannot produce a successful or partial backup', async () => {
    const wrongCa = join(database.directory, 'wrong-ca.pem');
    run('openssl', ['req', '-new', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '2',
      '-subj', '/CN=Untrusted disposable CA', '-keyout', join(database.directory, 'wrong-ca.key'), '-out', wrongCa]);
    for (const [label, changes] of [
      ['untrusted-ca', {fixtureCaFile: wrongCa}],
      ['wrong-hostname', {dbUrl: 'postgresql://postgres:disposable-fixture@127.0.0.1:55493/postgres'}],
    ]) {
      const outputDir = join(database.directory, label);
      const failed = await createEncryptedBackup({...options, ...changes, outputDir});
      assert.equal(failed.ok, false); assert.equal(failed.status, 'critical');
      assert.ok(['DATABASE_TLS_FAILED','PG_DUMP_FAILED'].includes(failed.details.code), JSON.stringify(failed));
      assert.deepEqual(readdirSync(outputDir), []);
      assert.doesNotMatch(JSON.stringify(failed), /localhost|127\.0\.0\.1|disposable-fixture|BEGIN CERTIFICATE/u);
    }
    assert.equal(count('inquiries'), 1);
  });
});
