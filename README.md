# template-hono

A small Hono + Cloudflare Workers template for building APIs with Zod validation, OpenAPI docs, and Vitest.

## Requirements

Node.js 26 or higher is required. The templates run TypeScript configuration and hooks directly with Node's built-in type stripping.

Install pnpm (v10.17.1, matching the `packageManager` field) globally; Node 25+ no longer bundles Corepack, so use npm or the standalone installer:

```sh
npm install -g pnpm@10.17.1
```

Or with the standalone installer:

```sh
# macOS / Linux
curl -fsSL https://get.pnpm.io/install.sh | sh -
# Windows (PowerShell)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

pnpm reads the `packageManager` field and switches to the pinned version when available; run `pnpm install` in this directory to set up dependencies.

## What You Get

- [Hono](https://hono.dev/) web framework
- [hono-openapi](https://honohub.dev/docs/openapi) for OpenAPI generation
- [Zod](https://zod.dev/) schema validation
- [Scalar](https://github.com/scalar/scalar) API docs UI
- [oxlint](https://oxc.rs/docs/guide/usage/linter/) for linting
- [Vitest](https://vitest.dev/) with Cloudflare Workers pool for tests

## Using This Template

After copying this template into a new project:

1. Update `package.json` with your project name, repository URL, author, and license.
2. Review `wrangler.jsonc` and set the Worker name and bindings for the new app.
3. Rename the app-specific intro in `README.md`.
4. Check `AGENTS.md` for the local workflow notes before editing.
5. Run `pnpm install`, `pnpm cf-typegen`, `pnpm lint:check`, and `pnpm test`.

## Development

```sh
pnpm install
pnpm dev
pnpm lint:check
pnpm test
pnpm build
```

## API Docs

The generated docs are available at `/docs`.

## License

MIT, see [LICENSE](./LICENSE) for details.
