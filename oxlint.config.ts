import { defineConfig } from "oxlint";

import baseConfig from "@concertypin/config/oxlint";

export default defineConfig({
    plugins: ["typescript", "unicorn", "import", "vitest", "promise"],
    env: {
        builtin: true,
    },
    options: {
        denyWarnings: true,
        typeAware: true,
        typeCheck: true,
        reportUnusedDisableDirectives: "error",
    },
    ignorePatterns: [
        "**/node_modules/**",
        "**/dist/**",
        "**/dist-ts/**",
        "**/coverage/**",
        "**/.cache/**",
        "**/.vscode/**",
        "**/.git/**",
        "**/.wrangler/**",
    ],
    rules: {
        "@typescript-eslint/consistent-type-imports": "error",
    },
    extends: [baseConfig],
});
