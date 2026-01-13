import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";
import route from "../src/route";

describe("hello route", () => {
    const client = testClient(route);
    it("responds with hello from POST /hello", async () => {
        const res = await client.index.$post({ json: { name: "Alice" } });
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json).toEqual({ hello: "Alice" });
    });
});
