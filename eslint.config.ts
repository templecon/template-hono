// ESLint configuration for this project.
// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import oxlint from "eslint-plugin-oxlint";
import { defineConfig } from "eslint/config";

/**
 * ESLint usage level:
 * - `"off"`: ESLint is disabled (only oxlint runs). Recommended for most development.
 * - `"no-type-check"`: Use ESLint for non-type-aware rules (faster).
 * - `"all"`: Enable all ESLint rules including type-aware (slower, use sparingly).
 *
 * For most development, oxlint is sufficient. Enable ESLint only when you need
 * rules that oxlint doesn't support.
 */
const useEslint: EslintLevel = "off";

type EslintLevel = "off" | "no-type-check" | "all";
let config: ReturnType<typeof defineConfig> | undefined;

// Just a type assertion to make it not only single literal type, but also a union of string literals
// So that we can use it in if statements and get proper type narrowing.
const eslintLevel: EslintLevel = useEslint satisfies EslintLevel as EslintLevel;
if (eslintLevel === "off") {
    config = defineConfig(
        // Base config to disable all rules
        {
            ignores: [
                "**/node_modules/**",
                "**/dist/**",
                "**/dist-ts/**",
                "**/coverage/**",
                "**/.cache/**",
                "**/.vscode/**",
                "**/.git/**",
                "src/",
            ],
        },
        {
            rules: {},
        }
    );
} else {
    const tsConfig = () => {
        switch (eslintLevel) {
            case "no-type-check":
                return [
                    tseslint.configs.recommended,
                    {
                        languageOptions: {
                            parserOptions: {
                                projectService: false,
                            },
                        },
                    },
                ];
            case "all":
                return [
                    tseslint.configs.recommendedTypeChecked,
                    {
                        languageOptions: {
                            parserOptions: {
                                projectService: true,
                            },
                        },
                    },
                ];
            default:
                eslintLevel satisfies never;
                return [];
        }
    };

    config = defineConfig(
        // Global ignores
        {
            ignores: [
                "**/node_modules/**",
                "**/dist/**",
                "**/dist-ts/**",
                "**/coverage/**",
                "**/.cache/**",
                "**/.vscode/**",
                "**/.git/**",
            ],
        },
        // Base JavaScript config
        js.configs.recommended,
        ...tsConfig(),
        // Override for .d.ts files
        {
            files: ["**/*.d.ts"],
            rules: {
                "@typescript-eslint/no-unused-vars": "off",
            },
        },
        ...oxlint.buildFromOxlintConfigFile(".oxlintrc.json", {
            typeAware: true,
        })
    );
}

config satisfies ReturnType<typeof defineConfig>;

export default config;
