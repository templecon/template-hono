import { describe, expect, it } from "vitest";
import { testClient } from "hono/testing";
import app from "@/index";
describe("example test", () => {
    const client = testClient(app);
    it.concurrent("should throw on invalid request", async () => {
        //@ts-expect-error Invalid request, should return an error
        const resp = await client.index.$post();
        expect(await resp.text()).not.include("Hello");
    });
    it.concurrent("should return a greeting message", async () => {
        const resp = await client.index.$post({
            json: { name: "Alice" },
        });
        const data = await resp.json();
        expect(data.hello).include("Alice");
    });
});
