# Dependency security patch — 2026-09-10

Status: installed and production-dependency audit passed locally. The parent task is running the required full checks. This record is not deployment evidence or evidence of an attack.

Workspace: `/Users/yangchunxuan/Homeground-SEO-Acquisition-20260910`.

## Confirmed minimum fixes

| Package / advisory | Official affected range relevant here | Minimum fixed version selected |
|---|---|---|
| Next — GHSA-p293-qw3h-jr36 | `>=13.4.0 <15.5.24` | `15.5.24` |
| Next — GHSA-2xp9-vwfh-vxw4 | `>=10.0.0 <15.5.24` | `15.5.24` |
| sharp — GHSA-rgj7-g3m4-5g8c | `<0.35.4` | `0.35.4` |

Official advisories actually opened and read on 2026-09-10:

- [Next Windows-hosted server advisory](https://github.com/advisories/GHSA-p293-qw3h-jr36): the described RCE concerns affected Pages/App Router servers on Windows filesystems. Next 15.5.24 is patched, so this does not require a major-version upgrade.
- [Next AVIF Image Optimization API advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4): the issue involves underlying libheif used through sharp when optimizing AVIF files. Next 15.5.24 is patched; the advisory describes disabling AVIF optimization pending propagation of the library fix.
- [sharp/libheif advisory](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c): affected processing of untrusted input can lead to RCE on glibc Linux under the described conditions. sharp itself provides no networking. Its 0.35.4 prebuilt distribution includes libheif 1.23.2.

Official npm registry verification succeeded through these read-only commands:

```sh
npm view next@15.5.24 version engines dist.tarball --json --registry=https://registry.npmjs.org
npm view sharp@0.35.4 version engines dist.tarball --json --registry=https://registry.npmjs.org
```

The registry returned Next 15.5.24 and sharp 0.35.4. The returned tarballs were `https://registry.npmjs.org/next/-/next-15.5.24.tgz` and `https://registry.npmjs.org/sharp/-/sharp-0.35.4.tgz`. Next declares Node `^18.18.0 || ^19.8.0 || >=20.0.0`; sharp declares Node `>=20.9.0`. The local runtime is Node 26.0.0. Web-reader attempts to open the equivalent version JSON URLs failed with internal errors; registry verification rests on the successful npm commands, not those failed opens.

## Changes and installation

Only repository `package.json` and `package-lock.json` were modified for this patch. Installed dependencies were refreshed in `node_modules`.

- `dependencies.next`: `^15.3.0` → `^15.5.24`; lock and installed package: 15.5.21 → 15.5.24.
- `overrides.sharp`: 0.35.3 → 0.35.4; lock and installed package agree.
- Lockfile changes cover associated Next environment/SWC packages, sharp platform packages, libvips prebuilt packages (1.3.2 → 1.3.3) and the sharp-related emnapi runtime patch. No additional direct dependency was added or upgraded.
- A before/after manifest comparison confirmed that only the Next range and sharp override changed.

```sh
npm install next@15.5.24 --save-prefix='^' --ignore-scripts --no-fund --no-audit
```

Installation exited 0 and reported 8 installed packages changed. `--ignore-scripts` prevented the repository's `postinstall` hook (`guide:generate`) from running. No content generator or build was run in this task. A read-only module load confirmed Next 15.5.24, sharp 0.35.4 and actual loaded libheif 1.23.2.

## Audit results

The before and after commands were `npm audit --omit=dev --json`.

| Package findings | Before | After |
|---|---:|---:|
| Critical | 1 | 0 |
| High | 1 | 0 |
| Other severities | 0 | 0 |
| Total | 2 | 0 |

The final audit exited 0. Raw results are `dependency-audit-before.json` and `dependency-audit-after.json` in this round folder. The two Next advisories are grouped under one Next package finding. This is a production dependency audit at the recorded time, not proof that all possible vulnerabilities are absent.

## Current static-export applicability

The local Next configuration sets `output: 'export'` and `images: { unoptimized: true }`. The [official static-export documentation](https://nextjs.org/docs/app/guides/static-exports) describes static HTML/CSS/JS output and excludes default runtime Image Optimization. The [official Image documentation](https://nextjs.org/docs/app/api-reference/components/image#unoptimized) states that unoptimized images are served from their source without transformation.

Inference from those facts: a deployment serving only this static export does not expose the described Next Node server or default runtime Image Optimization API. This task did not inspect production host processes or test attack paths, so this is not a complete production exposure assessment. A Windows-hosted Next server, separately enabled image service or changed deployment configuration would require its own assessment.

Static serving does not remove build/tooling dependency concerns. Local image tools import sharp, including `tools/build-chongqing-hub-assets.mjs` and `tools/build-first-trip-ten-city-assets.mjs`. Processing untrusted images with an affected library is a separate condition; this patch removes the known affected package versions from the installed dependency tree. No image tools were executed here.

No evidence of exploitation or compromise was collected, and no such claim is made.
