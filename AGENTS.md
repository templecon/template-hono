# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.
All agents, such as Claude Code, should keep `**/AGENTS.md` in mind.

## Project Type

This is a **Hono backend server template** for Cloudflare Workers. It provides a minimal setup for building API servers with Hono, including:

- Zod validation
- Vitest with Cloudflare worker pool for testing

## Development Commands

```bash
# Start development server (wrangler)
pnpm dev

# Build for production (Cloudflare Workers)
pnpm build

# Format code
pnpm format

# Lint code
pnpm lint

# Run tests
pnpm test
```

## Using This Template in a New Project

When you copy or generate a new project from this template:

1. Replace the template identity in `package.json` with your project name, repository URL, author, and license.
2. Review `wrangler.jsonc` and set the Cloudflare Worker name, compatibility options, and environment bindings for the new project.
3. Update `README.md` and `AGENTS.md` so the first screen describes the new app instead of the template.
4. Review `src/utils/cors.ts` and adjust CORS settings if needed. The current setup allows as much as possible.

Immediately after creating a project from this template, upgrade all dependencies and refresh the lockfile:

```bash
pnpm up --latest
```

Run the project's format, lint, test, and build checks after the upgrade and resolve every resulting error before continuing development.

## Coding Standards

See `docs/rules/` for TypeScript, testing, and tooling guidelines.

## TypeScript Configuration

- Path alias: `@/*` maps to `src/*` (configured in `tsconfig.base.json`)

## Package Manager

This project uses pnpm.

## Cloudflare Workers

This template uses `wrangler` for Cloudflare Workers development and deployment.
Configuration is in `wrangler.jsonc`.
