## 0. General Guidelines

Tests should follow general TypeScript guidelines. Tests should cover:

- Normal behavior
- Edge cases
- Invalid input
- Boundary values
- Unexpected states
- TypeScript's type check, via Vitest's type assertion features. See [more](https://vitest.dev/guide/testing-types) and [more](https://github.com/mmkal/expect-type)

## 1. Unit Tests (Node.js)

Use these for pure TypeScript utility files. These tests run in Node.js for maximum speed.

### Guidelines:

- File Extension: Use `.test.ts`.
- Location: `tests/` directory.
- Environment: Default (Node.js).
- Concurrency: High. Use `it.concurrent` freely as these should be stateless.

```typescript
// utils.ts (Pure TypeScript logic)
export async function fetchUserList(): Promise<User[]> {
    return [{ id: 1, name: "Ms. Example" }];
}

// utils.test.ts (The Test)
import { describe, it, expect, expectTypeOf } from "vitest";
import { fetchUserList } from "./utils";

describe("User List", () => {
    it.concurrent("should fetch user list", async () => {
        const users = await fetchUserList();
        expectTypeOf(users).toEqualTypeOf<User[]>();
        expect(users).toHaveLength(1);
    });
});
```

## 2. Cloudflare Workers-Specific Tests

> [!WARNING]
> This is only available if...
>
> - `wrangler.jsonc` or `wrangler.toml` is existing
> - and `@cloudflare/vitest-pool-workers` dependency is installed.
> - There's additional integration, such as Workers KV, Durable Objects, or R2,
> - and gonna test those features.
>   Otherwise, use Unit Tests or Hono's built-in testing utilities.

## Documentation

- [Vitest docs](https://vitest.dev/guide/)
