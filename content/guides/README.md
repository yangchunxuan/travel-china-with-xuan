# New guide folders

New articles live in their own folder. Do not add them to `lib/guideRegistry.ts`.

- Reuse the shared page when it is a comfortable fit: `metadata.json` plus `body.en.ts`, `body.zh.ts` and/or `body.ko.ts`.
- If the shared page is only about 80% suitable, reuse it and adjust the shared blocks or add a small article-specific section.
- If it is genuinely unsuitable, set `layout.mode` to `bespoke` and build that article's route/component normally.

See `docs/article-production-lite.md` for the exact small example and commands.
