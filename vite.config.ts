/// <reference types="vitest/config" />
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { cloudflare } from "@cloudflare/vite-plugin";
import { type UserConfig, defineConfig } from "vite";
import { fileURLToPath } from "node:url";

type Config = Required<UserConfig>;

const isVitest = typeof process.env.VITEST !== "undefined";

/**
 * Directories to ignore for any file-watching features.
 */
const ignoredDir = [
    "node_modules",
    "dist",
    "coverage",
    ".wrangler",
    ".git",
    "dist-ts",
].map((dir) => `**/${dir}/**`);

/**
 * Import aliases.
 * Should be exactly matched in tsconfig.base.json's "paths" field for type safety.
 */
const resolve: Config["resolve"] = {
    alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    external: [],
};

const testConfig: Config["test"] = {
    coverage: {
        enabled: true,
        include: ["src/**/*.ts"],
        provider: "istanbul",
        reportOnFailure: true,
        reporter: ["text", "json-summary", "html"],
    },
    environment: "node",
    exclude: ignoredDir,
    globals: true,
    include: ["tests/**/*.test.ts"],

    setupFiles: "./tests/setup.ts",
    silent: "passed-only",
    env: {
        VITEST: "true",
    },
};

const buildConfig: Config["build"] = {
    lib: {
        entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
        formats: ["es"],
        fileName: "index",
    },
    outDir: "dist",
    sourcemap: true,
    rolldownOptions: {
        // Disable code splitting
        output: {
            inlineDynamicImports: true,
            codeSplitting: false,
        },
    },
};

export default defineConfig(() => {
    const cloudflarePlugin = isVitest
        ? cloudflareTest({
              wrangler: { configPath: "./wrangler.jsonc" },
          })
        : cloudflare();
    return {
        plugins: [cloudflarePlugin],
        server: {
            watch: {
                ignored: ignoredDir,
            },
        },
        build: buildConfig,
        clearScreen: false,
        resolve,
        test: testConfig,
    } satisfies UserConfig;
});
