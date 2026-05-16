---
name: hono-conventions
description: "Enforce Hono routing & type conventions for all runtimes. Use when: writing Hono routes, fixing type inference issues with testClient/Hono RPC, refactoring routes to the chained pattern, or setting up route grouping."
---

# Hono Conventions

Generic Hono conventions that apply to all runtimes (CF Workers, Deno, Bun, Node.js, etc.).

> If the project already has conventions in `docs/rules/` or similar, prioritize those over this skill.

## When to Use

- Writing or reviewing Hono route definitions
- `testClient` or Hono RPC client has no autocompletion on routes
- Converting routes from separate-definition to chained pattern
- Structuring a larger app with `app.route()`

## Procedure

- Keep route files small enough that their purpose stays obvious.

### 1. Chained Route Pattern

Routes are usually clearer when they are chained on `new Hono()` so TypeScript captures the full type:

```typescript
// ✅ Correct
const app = new Hono()
    .get("/health", (c) => c.json({ status: "ok" }))
    .post("/v1/messages", handler);

// Prefer this style for public app routes.
// Separate `.get()` / `.post()` calls can make route typing less useful.
```

**Why**: Chaining keeps the inferred route type growing on the same expression, which is usually what you want for Hono apps.

**Middleware** chains the same way:

```typescript
const app = new Hono()
    .use("/v1/*", authMiddleware)
    .get("/v1/messages", handler);
```

### 2. Route Grouping with `.route()`

Split large apps into sub-routers, each chained on its own `new Hono()`:

```typescript
// authors.ts
const authors = new Hono()
    .get("/", (c) => c.json("list authors"))
    .post("/", (c) => c.json("created", 201))
    .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

// index.ts
const app = new Hono().route("/authors", authors).route("/books", books);
```

Each sub-router retains full type inference.

### 3. Avoid RoR-like Controllers

Standalone handler functions lose path param inference:

```typescript
// ❌ id is unknown
const handler = (c: Context) => {
    const id = c.req.param("id");
};

// ✅ Inline — id inferred as string
const app = new Hono().get("/books/:id", (c) => {
    const id = c.req.param("id");
});
```

If you need to extract handlers, use [`factory.createHandlers()`](https://hono.dev/docs/helpers/factory) or another pattern that keeps types explicit.

### 4. RPC Export Pattern

```typescript
const routes = app.get("/hello", (c) => c.json({ message: "Hello!" }));
export type AppType = typeof routes;
```

```typescript
// client.ts
import { hc } from "hono/client";
import type { AppType } from "./server";
const client = hc<AppType>("/api");
```

> [!NOTE]
> RPC works best with the chained pattern. Separate `.get()` calls can make `AppType` less useful.

### 5. Testing

```typescript
// Quick test
const res = await app.request("/health");
expect(res.status).toBe(200);

// Typed test with testClient
import { testClient } from "hono/testing";
const client = testClient(app);
const res = await client.health.$get();
```

Both require chained pattern for type inference.

## Common Issues & Fixes

| Symptom                                          | Cause                         | Fix                                |
| ------------------------------------------------ | ----------------------------- | ---------------------------------- |
| `testClient` no route types / autocomplete empty | Routes not chained            | Use chained pattern                |
| Path params not typed                            | Missing generic on handler    | Chain routes + type params inline  |
| Type errors after refactoring                    | Not ported to chained pattern | Use chained pattern from the start |

## References

- [Hono Docs](https://hono.dev/llms.txt)
