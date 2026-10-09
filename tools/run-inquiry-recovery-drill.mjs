import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

// This helper accepts no database URL, host, password or production options.
// Every command explicitly addresses a freshly initialized socket-only cluster.
export function createIsolatedInquiryDatabase() {
  const directory = mkdtempSync("/tmp/homeground-inquiry-drill-");
  const data = join(directory, "data");
  const port = "55493";
  let started = false;
  let initCommand = "initdb", controlCommand = "pg_ctl";
  const run = (command, args, options = {}) => execFileSync(command, args, {
    encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], maxBuffer: 4 * 1024 * 1024,
    timeout: 30_000, ...options,
  });
  const close = () => {
    try { if (started) run(controlCommand, ["-D", data, "-m", "immediate", "-w", "stop"]); }
    finally { rmSync(directory, { recursive: true, force: true }); }
  };
  try {
    const executable = (process.env.PATH ?? "").split(":").map((entry) => join(entry, "initdb")).find(existsSync);
    const installation = executable && dirname(dirname(realpathSync(executable)));
    const share = installation && join(installation, "share", "postgresql");
    const library = installation && join(installation, "lib", "postgresql");
    const initArgs = [];
    if (share && existsSync(join(share, "postgres.bki"))) {
      initArgs.push("-L", share);
      if (existsSync(library)) initArgs.push("-c", `dynamic_library_path=${library}`);
      const compiledShare = run("pg_config", ["--sharedir"]).trim();
      const compiledLibrary = run("pg_config", ["--pkglibdir"]).trim();
      if (!existsSync(join(compiledShare, "postgres.bki"))) {
        const compiledBin = run("pg_config", ["--bindir"]).trim();
        let commonRoot = dirname(compiledBin);
        while (!compiledShare.startsWith(`${commonRoot}/`) || !compiledLibrary.startsWith(`${commonRoot}/`)) commonRoot = dirname(commonRoot);
        const bin = join(directory, "runtime", relative(commonRoot, compiledBin));
        const shareTarget = join(directory, "runtime", relative(commonRoot, compiledShare));
        const libTarget = join(directory, "runtime", relative(commonRoot, compiledLibrary));
        for (const folder of [bin, dirname(shareTarget), dirname(libTarget)]) mkdirSync(folder, { recursive: true });
        for (const command of ["initdb", "pg_ctl", "postgres"]) copyFileSync(join(installation, "bin", command), join(bin, command));
        symlinkSync(share, shareTarget); symlinkSync(library, libTarget);
        initCommand = join(bin, "initdb"); controlCommand = join(bin, "pg_ctl");
      }
    }
    run(initCommand, ["-D", data, "--no-locale", "-E", "UTF8", "-A", "trust", "-U", "postgres", "-c", "timezone=GMT0", "-c", "log_timezone=GMT0", ...initArgs]);
    run(controlCommand, ["-D", data, "-l", join(directory, "server.log"), "-o", `-h '' -k ${directory} -p ${port}`, "-w", "start"]);
    started = true;
    const connection = ["-h", directory, "-p", port, "-U", "postgres"];
    const sql = (input, database = "postgres") => {
      if (!["postgres", "restored", "corrupt_restore"].includes(database)) throw new Error("unknown_isolated_database");
      return run("psql", [...connection, "-d", database, "-XqAt", "-v", "ON_ERROR_STOP=1"], { input }).trim();
    };
    sql("create role anon; create role authenticated; create role service_role; create schema extensions;");
    const migrations = new URL("../supabase/migrations/", import.meta.url);
    const replayed = [];
    for (const filename of readdirSync(migrations).filter((name) => name.endsWith(".sql")).sort()) {
      if (filename === "202607180002_homeground_notification_schedule.sql") continue;
      const source = readFileSync(new URL(filename, migrations), "utf8")
        .replace(/^create extension if not exists (?:pg_cron|pg_net)[^;]*;\s*$/gm, "")
        .replace(/do\s+(\$\w*\$)[\s\S]*?\1;/gi, (block) => block.includes("cron.") ? "-- Hosted scheduling omitted in isolated drill." : block)
        .replace(/^select cron\.schedule[^\r\n]*;[ \t]*(?:\r?\n|$)/gm, "");
      try { sql(source); }
      catch (error) { throw new Error(`Migration ${filename}: ${String(error.stderr).slice(-1600)}`); }
      replayed.push(filename);
    }
    const quote = (value) => value === null ? "null" : `'${String(typeof value === "object" ? JSON.stringify(value) : value).replaceAll("'", "''")}'`;
    const rpc = (name, args, database = "postgres") => {
      if (!/^[a-z][a-z0-9_]*$/u.test(name) || Object.keys(args).some((key) => !/^p_[a-z0-9_]+$/u.test(key))) throw new Error("invalid_fixture_rpc_identifier");
      const setReturning = sql(`select proretset from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname=${quote(name)} limit 1;`, database) === "t";
      const invocation = `public.${name}(${Object.entries(args).map(([key, value]) => `${key} => ${quote(value)}`).join(",")})`;
      const statement = setReturning
        ? `with rpc_rows as materialized (select * from ${invocation}) select coalesce(jsonb_agg(to_jsonb(rpc_rows)), '[]'::jsonb) from rpc_rows;`
        : `select coalesce(to_jsonb(${invocation}), 'null'::jsonb);`;
      return JSON.parse(sql(`set role service_role; ${statement}`, database));
    };
    const dump = join(directory, "fixture.dump");
    const backupAndRestore = () => {
      run("pg_dump", [...connection, "-d", "postgres", "--format=custom", "--file", dump]);
      sql("create database restored;");
      run("pg_restore", [...connection, "--dbname=restored", "--exit-on-error", "--single-transaction", "--no-owner", dump]);
      return dump;
    };
    const restoreCorruptArchive = (archive) => {
      if (!resolve(archive).startsWith(directory + "/")) throw new Error("archive_must_belong_to_disposable_drill");
      sql("create database corrupt_restore;");
      return run("pg_restore", [...connection, "--dbname=corrupt_restore", "--exit-on-error", "--single-transaction", archive]);
    };
    return { directory, sql, rpc, quote, replayed, backupAndRestore, restoreCorruptArchive, close };
  } catch (error) { close(); throw error; }
}
