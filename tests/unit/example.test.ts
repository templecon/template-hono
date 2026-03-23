import { describe, expect, it } from "vitest";
import { testClient } from "hono/testing";
import app from "@/index";
describe("example test", () => {
    const client = testClient(app);
    it("should return example", async () => {
        const resp = await client.index.$get();
        expect(await resp.text()).include("Hello");
    });
});
