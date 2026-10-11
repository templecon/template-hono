import baseConfig from "@concertypin/config/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
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
    extends: [baseConfig()],
});
