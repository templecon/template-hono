import { describe, expect, it } from "vitest";
import { example } from "@/index";

describe("example test", () => {
    it("should return example", () => {
        expect(example()).toBe("example");
    });
});
