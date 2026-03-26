import { describe, expect, it } from "vitest";
import { testClient } from "hono/testing";
import { router } from "@/route";

describe("route.ts - POST / endpoint", () => {
    const client = testClient(router);

    it.concurrent("should return greeting with normal name", async () => {
        const resp = await client.index.$post({
            json: { name: "Alice" },
        });
        const data = await resp.json();
        expect(data.hello).toBe("Hello, Alice!");
    });

    it.concurrent("should return greeting with empty string", async () => {
        const resp = await client.index.$post({
            json: { name: "" },
        });
        const data = await resp.json();
        expect(data.hello).toBe("Hello, !");
    });

    it.concurrent("should return greeting with unicode name", async () => {
        const resp = await client.index.$post({
            json: { name: "日本語" },
        });
        const data = await resp.json();
        expect(data.hello).toBe("Hello, 日本語!");
    });

    it.concurrent(
        "should return greeting with accented characters",
        async () => {
            const resp = await client.index.$post({
                json: { name: "José" },
            });
            const data = await resp.json();
            expect(data.hello).toBe("Hello, José!");
        }
    );

    it.concurrent(
        "should return greeting with special characters",
        async () => {
            const resp = await client.index.$post({
                json: { name: "<test>" },
            });
            const data = await resp.json();
            expect(data.hello).toBe("Hello, <test>!");
        }
    );

    it.concurrent("should return greeting with apostrophe", async () => {
        const resp = await client.index.$post({
            json: { name: "O'Brien" },
        });
        const data = await resp.json();
        expect(data.hello).toBe("Hello, O'Brien!");
    });

    it.concurrent("should return greeting with very long name", async () => {
        const longName = "A".repeat(1000);
        const resp = await client.index.$post({
            json: { name: longName },
        });
        const data = await resp.json();
        expect(data.hello).toBe(`Hello, ${longName}!`);
    });

    it.concurrent(
        "should return 400 for invalid type (number instead of string)",
        async () => {
            const resp = await client.index.$post({
                // @ts-expect-error Testing invalid type
                json: { name: 123 },
            });
            // Zod validation should reject number
            expect(resp.status).toBe(400);
        }
    );

    it.concurrent("should return 400 for missing name field", async () => {
        const resp = await client.index.$post({
            // @ts-expect-error Testing missing field
            json: {},
        });
        expect(resp.status).toBe(400);
    });

    it.concurrent("should return 400 for null name", async () => {
        const resp = await client.index.$post({
            // @ts-expect-error Testing null value
            json: { name: null },
        });
        expect(resp.status).toBe(400);
    });
});
