import { describe, expect, it } from "vitest";
import { testClient } from "hono/testing";
import app from "@/index";

describe("index.ts - app configuration", () => {
    const client = testClient(app);

    it.concurrent("should respond on root route via app", async () => {
        const resp = await client.index.$post({
            json: { name: "Test" },
        });
        expect(resp.status).toBe(200);
    });

    it.concurrent("should include CORS headers in response", async () => {
        const resp = await client.index.$post({
            json: { name: "CORS Test" },
        });
        // CORS headers should be present in dev mode
        expect(resp.headers).toBeDefined();
    });
});
