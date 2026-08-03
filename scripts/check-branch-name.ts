import { readFileSync } from "node:fs";

type PushedRef = {
    localRef: string;
    localOid: string;
    remoteRef: string;
};

const pushedRefs: PushedRef[] = readFileSync(0, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim().split(/\s+/))
    .filter(
        (parts): parts is [string, string, string, string, ...string[]] =>
            parts.length >= 4
    )
    .map(([localRef, localOid, remoteRef]) => ({
        localRef,
        localOid,
        remoteRef,
    }));
const rejected: PushedRef | undefined = pushedRefs.find(
    (ref) =>
        ref.localRef.startsWith("refs/heads/local/") ||
        (ref.remoteRef.startsWith("refs/heads/local/") &&
            /^0+$/.test(ref.localOid) === false)
);
const rejectedRefName: string | undefined = rejected
    ? rejected.localRef.startsWith("refs/heads/local/")
        ? rejected.localRef
        : rejected.remoteRef
    : undefined;
const localBranch: string | undefined = rejectedRefName?.replace(
    "refs/heads/",
    ""
);

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
