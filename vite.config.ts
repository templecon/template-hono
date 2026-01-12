/// <reference types="vitest/config" />
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import { defineConfig, type UserConfig } from "vite";

const ENVIRONMENT: "edge-runtime" | "cloudflare-workers" = "edge-runtime";

export default (ENVIRONMENT === "edge-runtime"
    ? defineConfig
    : defineWorkersConfig)(() => {
    return {
        test: {
            poolOptions: {
                workers: { wrangler: { configPath: "./wrangler.jsonc" } },
            },
            coverage: {
                provider: "istanbul",
                exclude: ["tests/**", "*.config.ts"],
                include: ["src/**"],
                reporter: ["text-summary", "html", "json"],
                reportOnFailure: true,
            },
            environment:
                ENVIRONMENT === "edge-runtime" ? "edge-runtime" : "node",
            typecheck: {
                tsconfig: "./tsconfig.json",
            },
            include: ["tests/**/*.test.ts"],
        },
        plugins: [cloudflare()],
        server: {
            cors: false, // https://hono.dev/docs/middleware/builtin/cors#using-with-vite
        },
        build: {
            lib: {
                entry: "src/index.ts",
                formats: ["es"],
            },
            sourcemap: true,
        },
        clearScreen: false,
    } satisfies UserConfig;
});
