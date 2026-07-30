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
    process.stderr.write(`${`Refusing to push ${localBranch}.`}\n`);
    process.stderr.write(
        `${"Branches under local/* are for local work only, not for pushing."}\n`
    );
    process.stderr.write(`${`Rename it to ${devBranch} before pushing:`}\n`);
    process.stderr.write(`${`  git branch -m ${devBranch}`}\n`);
    process.stderr.write(`${`  git push -u origin ${devBranch}`}\n`);
    process.exit(1);
}
