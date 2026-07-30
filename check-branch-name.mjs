import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const currentBranch = execFileSync("git", ["branch", "--show-current"], {
    encoding: "utf8",
}).trim();
const pushedRefs = readFileSync(0, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim().split(/\s+/)[0])
    .filter((ref) => ref?.startsWith("refs/heads/local/"));
const localBranch = currentBranch.startsWith("local/")
    ? currentBranch
    : pushedRefs[0]?.replace("refs/heads/", "");

if (localBranch) {
    const devBranch = `dev/${localBranch.slice("local/".length)}`;
    console.error(`Refusing to push ${localBranch}.`);
    console.error("Branches under local/* are for local work only, not for pushing.");
    console.error(`Rename it to ${devBranch} before pushing:`);
    console.error(`  git branch -m ${devBranch}`);
    console.error(`  git push -u origin ${devBranch}`);
    process.exit(1);
}
