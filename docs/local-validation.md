# Local validation

Use Node 22 or a supported newer release and run `npm ci` in the checkout.
The inquiry suite deliberately exercises real encryption and local TLS, so it
also needs `age`, `age-keygen`, and OpenSSL on `PATH`. Install them from their
official releases or your operating system package manager. Missing programs
are environment failures, not passing tests.

## Windows

Use the official Windows age release and, if Git for Windows is installed,
its `usr\bin` directory for OpenSSL. Add these directories only to the current
PowerShell process before running the checks; global PATH changes are unnecessary.
No Administrator account or Developer Mode is needed for the directory-boundary
tests: they use directory junctions on Windows and symlinks on Linux.

```powershell
# Replace the first path with your installed age directory.
$env:PATH = 'C:\Tools\age;C:\Program Files\Git\usr\bin;' + $env:PATH
npm run test:inquiry
npm run test:guide-search
npm run typecheck
npm run build
npm run check:indexable-export
npm run check:ten-day-guide-export
npm audit
```

Generated-source comparisons normalize checkout CRLF to LF before comparison;
they still compare all content. The price-guide generator uses file URLs for
ES module imports, including checkout paths containing spaces or non-ASCII text.

## Full database and recovery checks

The isolated PostgreSQL drills require a Linux/WSL or CI environment with
PostgreSQL 17 or newer (including `pgcrypto`, `initdb`, `pg_ctl`, `pg_dump`,
`pg_restore`, and `psql`), age, and OpenSSL. Run as a normal, non-root user.
Put the PostgreSQL version's `bin` directory on PATH. Use a separate Linux
checkout or install dependencies separately if native Node modules are needed;
do not run Linux `npm ci` over a Windows checkout's `node_modules`.

```sh
export PATH="$(pg_config --bindir):$PATH"
REQUIRE_ISOLATED_POSTGRES=1 node --experimental-strip-types --test \
  supabase/tests/inquiry-end-to-end.test.mjs \
  supabase/tests/backup-recovery-integration.test.mjs
```

These drills create disposable local clusters and synthetic records. They do
not accept production database connection settings. The required flag makes
missing prerequisites fail instead of skipping. Record native test results
and database drill results separately; skipped database tests are never proof
that backup recovery works.

For a production-equivalent static export, use the repository's current public
`NEXT_PUBLIC_*` variables. Do not copy server credentials into a build or use
live customer submissions to test frontend state.
