import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile, copyFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const sourceGenerator = path.resolve(process.cwd(), "tools/generate-guide-registry.mjs");

function git(root, ...args) {
  execFileSync("git", args, { cwd: root, stdio: "pipe" });
}

function metadata(id) {
  return {
    id,
    type: "planning",
    pillar: "planning",
    audienceMarkets: ["global"],
    format: "decision-guide",
    topics: ["trip-planning"],
    destinations: ["china"],
    heroImagePath: `/images/guides/${id}/hero.webp`,
    heroImageUrl: `https://homegroundchina.com/images/guides/${id}/hero.webp`,
    imageWidth: 1200,
    imageHeight: 800,
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
    sourceReviewedDate: "2026-08-10",
    search: {
      section: "plan",
      family: "combined-decision",
      primaryIntent: "plan",
    },
    layout: { mode: "template", templateId: "editorial-v1" },
    locales: {
      en: {
        path: `/guides/${id}/`,
        title: `${id} title`,
        headline: `${id} headline`,
        description: `${id} description`,
        heroAlt: `${id} hero`,
        navTitle: id,
        featuredLinkLabel: `Read ${id}`,
        openGraphLocale: "en_US",
        cardTags: ["China", "Planning"],
      },
    },
  };
}

async function addGuide(root, id) {
  const directory = path.join(root, "content/guides", id);
  const imageDirectory = path.join(root, "public/images/guides", id);
  await mkdir(directory, { recursive: true });
  await mkdir(imageDirectory, { recursive: true });
  await writeFile(path.join(imageDirectory, "hero.webp"), "merge-test-image", "utf8");
  await writeFile(
    path.join(directory, "metadata.json"),
    `${JSON.stringify(metadata(id), null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(directory, "body.en.ts"),
    'export default { schemaVersion: "1.0.0", blocks: [{ id: "answer", type: "lead", text: "A real guide body." }] } as const;\n',
    "utf8",
  );
}

const root = await mkdtemp(path.join(os.tmpdir(), "homeground-guide-merge-"));
try {
  await mkdir(path.join(root, "content/guides"), { recursive: true });
  await mkdir(path.join(root, "tools"), { recursive: true });
  await writeFile(path.join(root, "content/guides/README.md"), "independent guide folders\n");
  await copyFile(sourceGenerator, path.join(root, "tools/generate-guide-registry.mjs"));

  git(root, "init", "-b", "main");
  git(root, "config", "user.name", "Homeground merge test");
  git(root, "config", "user.email", "merge-test@homeground.invalid");
  git(root, "add", "content/guides/README.md", "tools/generate-guide-registry.mjs");
  git(root, "commit", "-m", "base");

  git(root, "checkout", "-b", "computer-a");
  await addGuide(root, "computer-a-guide");
  git(
    root,
    "add",
    "content/guides/computer-a-guide",
    "public/images/guides/computer-a-guide",
  );
  git(root, "commit", "-m", "add computer A guide");

  git(root, "checkout", "main");
  git(root, "checkout", "-b", "computer-b");
  await addGuide(root, "computer-b-guide");
  git(
    root,
    "add",
    "content/guides/computer-b-guide",
    "public/images/guides/computer-b-guide",
  );
  git(root, "commit", "-m", "add computer B guide");

  git(root, "checkout", "main");
  git(root, "merge", "--no-ff", "--no-edit", "computer-a");
  git(root, "merge", "--no-ff", "--no-edit", "computer-b");

  execFileSync("node", ["tools/generate-guide-registry.mjs"], {
    cwd: root,
    stdio: "pipe",
  });
  const registryPath = path.join(root, "lib/generated/guideRegistry.generated.ts");
  const first = await readFile(registryPath, "utf8");
  if (!first.includes('"computer-a-guide"') || !first.includes('"computer-b-guide"')) {
    throw new Error("Merged registry did not retain both independent guide folders.");
  }

  execFileSync("node", ["tools/generate-guide-registry.mjs"], {
    cwd: root,
    stdio: "pipe",
  });
  const second = await readFile(registryPath, "utf8");
  if (first !== second) throw new Error("Guide registry generation is not deterministic.");

  process.stdout.write("Parallel guide merge passed: both branches survived and generated output is deterministic.\n");
} finally {
  await rm(root, { recursive: true, force: true });
}
