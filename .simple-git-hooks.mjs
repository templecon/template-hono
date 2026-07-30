//@ts-check
export default {
    "pre-commit": "pnpm run check",
    "pre-push": "node --experimental-strip-types check-branch-name.ts",
};
