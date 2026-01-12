import { describe, expect, expectTypeOf, it } from "vitest";

describe("failed", () => {
    it("this test fails", () => {
        expect(1 + 1).toBe(3);
    });
});
describe.skip("example", () => {
    it.concurrent("says hello world", () => {
        expect("hello world").toBe("hello world");
        expectTypeOf<"hello world">().toBeString();
    });
});
