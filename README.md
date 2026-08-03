# template-hono

A small Hono + Cloudflare Workers template for building APIs with Zod validation, OpenAPI docs, and Vitest.

## Requirements

Node.js 26 or higher is required. The templates run TypeScript configuration and hooks directly with Node's built-in type stripping.

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
5. Run `pnpm install`, `pnpm cf-typegen`, `pnpm lint`, and `pnpm test`.

## Development

```sh
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm build
```

## API Docs

The generated docs are available at `/docs`.

## License

MIT, see [LICENSE](./LICENSE) for details.
