//@ts-check
export default {
    "pre-commit": "pnpm run check",
    "pre-push": "node scripts/check-branch-name.ts",
};
