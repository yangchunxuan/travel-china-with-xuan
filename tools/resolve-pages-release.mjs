import { execFileSync } from "node:child_process";
import { appendFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const fullSha = /^[a-f0-9]{40}$/u;

export async function resolvePagesRelease({
  eventName, workflowRef, workflowSha, mainSha, deployRef = "", isAncestor, hasVerifiedRelease,
}) {
  if (workflowRef !== "refs/heads/main") throw new Error("deployment_workflow_must_run_on_main");
  if (!fullSha.test(mainSha ?? "")) throw new Error("invalid_main_commit");
  if (eventName !== "push" && eventName !== "workflow_dispatch") throw new Error("unsupported_deployment_event");
  if (eventName === "push" && (deployRef || workflowSha !== mainSha)) throw new Error("superseded_push_deployment");
  if (deployRef && !fullSha.test(deployRef)) throw new Error("deploy_ref_must_be_full_commit_sha");
  const commit = deployRef || mainSha;
  if (commit !== mainSha) {
    if (!await isAncestor(commit, mainSha)) throw new Error("deploy_ref_must_be_main_ancestor");
    if (!await hasVerifiedRelease(commit)) throw new Error("rollback_requires_unexpired_verified_release");
  }
  return { commit, mainSha, rollback: commit !== mainSha };
}

export async function hasVerifiedPagesRelease(commit, { repository, token, fetchImpl = fetch }) {
  if (!fullSha.test(commit) || !/^[\w.-]+\/[\w.-]+$/u.test(repository ?? "") || !token) throw new Error("invalid_release_lookup_configuration");
  const api = async (endpoint) => {
    const response = await fetchImpl(`https://api.github.com/repos/${repository}/${endpoint}`, {
      redirect: "error", signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    });
    if (!response.ok) throw new Error(`verified_release_lookup_http_${response.status}`);
    return response.json();
  };
  // A bounded lookup fails closed if the recovery point is expired or too old.
  for (let page = 1; page <= 10; page += 1) {
    const data = await api(`actions/artifacts?per_page=100&page=${page}&name=verified-release-${commit}`);
    for (const artifact of data.artifacts ?? []) {
      if (artifact.name !== `verified-release-${commit}` || artifact.expired ||
          !Number.isFinite(Date.parse(artifact.expires_at)) || Date.parse(artifact.expires_at) <= Date.now() ||
          !Number.isSafeInteger(artifact.workflow_run?.id)) continue;
      const run = await api(`actions/runs/${artifact.workflow_run.id}`);
      if (run.path === ".github/workflows/deploy.yml" && run.head_branch === "main" &&
          run.status === "completed" && run.conclusion === "success") return true;
    }
    if ((data.artifacts ?? []).length < 100) break;
  }
  return false;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  try {
    const result = await resolvePagesRelease({
      eventName: process.env.GITHUB_EVENT_NAME, workflowRef: process.env.GITHUB_REF,
      workflowSha: process.env.GITHUB_SHA, deployRef: process.env.DEPLOY_REF ?? "",
      mainSha: git("rev-parse", "refs/remotes/origin/main"),
      isAncestor: (commit, main) => {
        try { git("merge-base", "--is-ancestor", commit, main); return true; } catch { return false; }
      },
      hasVerifiedRelease: (commit) => hasVerifiedPagesRelease(commit, {
        repository: process.env.GITHUB_REPOSITORY, token: process.env.GITHUB_TOKEN,
      }),
    });
    await appendFile(process.env.GITHUB_OUTPUT, `deploy_sha=${result.commit}\nmain_sha=${result.mainSha}\nrollback=${result.rollback}\n`);
    console.log(`Resolved ${result.rollback ? "verified recovery" : "main release"}: ${result.commit}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "release_resolution_failed");
    process.exitCode = 1;
  }
}
