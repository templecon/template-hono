import { defineConfig } from "oxfmt";

export default defineConfig({
    arrowParens: "always",
    endOfLine: "lf",
    printWidth: 80,
    semi: true,
    singleQuote: false,
    sortPackageJson: false,
    tabWidth: 4,
    trailingComma: "es5",
    useTabs: false,
    overrides: [
        {
            files: ["*.yaml", "*.yml"],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ["*.jsonc"],
            options: {
                trailingComma: "none",
            },
        },
    ],
});
