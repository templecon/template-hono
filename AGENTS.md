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

## Coding Standards

See `docs/rules/` for TypeScript, testing, and tooling guidelines.

## TypeScript Configuration

- Path alias: `@/*` maps to `src/*` (configured in `tsconfig.base.json`)

## Package Manager

This project uses pnpm.

## Cloudflare Workers

This template uses `wrangler` for Cloudflare Workers development and deployment.
Configuration is in `wrangler.jsonc`.
