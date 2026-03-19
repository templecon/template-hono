/// <reference types="vitest/config" />

import { type UserConfig, defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";

type Config = Required<UserConfig>;

const resolve: Config["resolve"] = {
    alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
    },
};

const testConfig: Config["test"] = {
    coverage: { 
        enabled: true,
        include: ["src/**/*.ts"],
        provider: "v8",
        reportOnFailure: true,
        reporter: ["text", "json-summary", "html"],
    },
    environment: "node",
    exclude: ["**/node_modules/**", "**/dist/**"],
    globals: true,
    include: ["tests/**/*.test.ts"],
    setupFiles: "./tests/setup.ts",
};

export default defineConfig({
    build: {
        lib: {
            entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
            formats: ["es"],
            fileName: "index",
        },
        outDir: "dist",
        sourcemap: true,
    },
    clearScreen: false,
    plugins: [dts({ rollupTypes: true, tsconfigPath: "./tsconfig.app.json" })],
    resolve,
    test: testConfig,
});
