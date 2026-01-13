import { describe, expect, expectTypeOf, it } from "vitest";

describe("math sanity", () => {
    it("adds numbers", () => {
        expect(1 + 1).toBe(2);
    });
});

describe("types", () => {
    it("string literal is string", () => {
        expectTypeOf<"hello world">().toBeString();
    });
});
