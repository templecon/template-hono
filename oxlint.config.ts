import { defineConfig } from "oxlint";

import typescriptConfig from "./scripts/linter/oxlint-typescript.ts";

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
    ],
    overrides: [
        {
            files: ["**/*.d.ts"],
            rules: {
                "no-unused-vars": "off",
            },
        },
    ],
    extends: [typescriptConfig],
});
