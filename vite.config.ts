/// <reference types="vitest/config" />
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { cloudflare } from "@cloudflare/vite-plugin";
import { type UserConfig, defineConfig } from "vite";
import { fileURLToPath } from "node:url";

type Config = Required<UserConfig>;

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
    exclude: ["**/node_modules/**", "**/dist/**"],
    globals: true,
    include: ["tests/**/*.test.ts"],
    setupFiles: "./tests/setup.ts",
};
const isVitest = typeof process.env.VITEST !== "undefined";
export default defineConfig(() => {
    const cloudflarePlugin = isVitest
        ? cloudflareTest({
              wrangler: { configPath: "./wrangler.jsonc" },
          })
        : cloudflare();
    return {
        plugins: [cloudflarePlugin],
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
        resolve,
        test: testConfig,
    } satisfies UserConfig;
});
