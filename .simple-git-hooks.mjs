//@ts-check
export default {
    "pre-commit": "pnpm run check",
    "pre-push": "node check-branch-name.mjs",
};
