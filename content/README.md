# Homeground content repository

This directory is the versioned, language-neutral source for the Homeground search platform.
It does not replace the existing guide registry during Phase 0.

Each JSON file under `entities/`, `relations/`, `pages/`, `facts/`, `sources/`, or
`media/` is a single versioned record envelope (or an array of envelopes):

```json
{
  "schemaVersion": "1.0.0",
  "recordType": "content-node",
  "data": {}
}
```

The TypeScript contracts and runtime validators live in `lib/content-system/`.
Generate the deterministic manifest with:

```sh
node tools/generate-content-manifest.mjs
```

Use `--check` in CI once a generated manifest has been committed. The generator only
reads the six record directories above, so it never consumes its own output.
