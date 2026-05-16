---
name: hono-cloudflare-workers
description: "Hono + Cloudflare Workers platform conventions. Use when: setting up CF Workers bindings, handling c.executionCtx, debugging streaming on Wrangler, managing local secrets or variables."
---

# Hono + Cloudflare Workers

Platform-specific conventions for running Hono on Cloudflare Workers.

> If the project already has conventions in `docs/rules/` or similar, prioritize those over this skill.

## When to Use

- Setting up `c.env.*` with type-safe Cloudflare bindings
- Configuring `wrangler.jsonc` and running `wrangler types`
- Using `.dev.vars` for local secrets
- Handling `c.executionCtx.waitUntil()` for background tasks
- Streaming responses not working on Wrangler dev server

## Procedure

### 1. Type-Safe Bindings

Generate binding types with `wrangler`, then wire into Hono:

```sh
wrangler types --env-interface CloudflareBindings
```

Produces `worker-configuration.d.ts` (global, no import needed).

```typescript
type HonoEnv = { Bindings: CloudflareBindings };

const app = new Hono<HonoEnv>().get("/", (c) =>
    c.json({ url: c.env.MY_SECRET })
);
```

Example bindings in `wrangler.jsonc`:

```jsonc
{
    "$schema": "node_modules/wrangler/config-schema.json",
    "vars": { "MY_VAR": "some-value" },
}
```

> `$schema` tip: Add `"$schema": "node_modules/wrangler/config-schema.json"`. The schema file serves as live documentation, so it is handy when you want to check available fields and their descriptions.

Re-run `wrangler types` every time bindings change.

### 2. Local Environment Variables

Create `.dev.vars` at the project root (gitignored by default):

```
API_KEY=sk-abc123
DATABASE_URL=https://...
```

Available via `c.env.*` in dev. Set the same keys via Cloudflare Dashboard or secrets storage for production/staging.

### 3. Execution Context

Use `c.executionCtx.waitUntil()` for fire-and-forget background tasks:

```typescript
app.get("/", async (c) => {
    c.executionCtx.waitUntil(logAnalytics(c.req));
    return c.json({ ok: true });
});
```

### 4. Streaming on Wrangler

Some streaming helpers need an explicit `Content-Encoding` header on the Wrangler dev server:

```typescript
app.get("/stream", (c) => {
  c.header("Content-Encoding", "Identity");
  return streamText(c, async (stream) => { ... });
});
```

## Common Issues & Fixes

| Symptom                    | Cause                                | Fix                                            |
| -------------------------- | ------------------------------------ | ---------------------------------------------- |
| `c.env.*` is `unknown`     | Missing `HonoEnv` generic            | Add `Bindings: CloudflareBindings`             |
| Streaming broken on dev    | Missing `Content-Encoding`           | Try `c.header("Content-Encoding", "Identity")` |
| Secrets missing at runtime | Set in Dashboard but not `.dev.vars` | Match keys in both places                      |
| `wrangler types` outdated  | Bindings changed but not regenerated | Re-run after `wrangler.jsonc` changes          |
