import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const currentBranch: string = execFileSync("git", ["branch", "--show-current"], {
    encoding: "utf8",
}).trim();
const pushedRefs: string[] = readFileSync(0, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim().split(/\s+/)[0])
    .filter((ref): ref is string => ref?.startsWith("refs/heads/local/") === true);
const localBranch: string | undefined = currentBranch.startsWith("local/")
    ? currentBranch
    : pushedRefs[0]?.replace("refs/heads/", "");

if (localBranch) {
    const devBranch = `dev/${localBranch.slice("local/".length)}`;
    const message = [
        `Refusing to push ${localBranch}.`,
        "Branches under local/* are for local work only, not for pushing.",
        `Rename it to ${devBranch} before pushing:`,
        `  git branch -m ${devBranch}`,
        `  git push -u origin ${devBranch}`,
    ].join("\n");
    process.stderr.write(`${message}\n`);
    process.exit(1);
}
