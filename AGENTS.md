# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.
All agents, such as Claude Code, should keep `**/AGENTS.md` in mind.

## Project Type

This is a **vanilla TypeScript library template** built with Vite. It is designed to be bundled into ESM format for distribution as a package.

## Development Commands

```bash
# Start development build in watch mode
pnpm dev

# Build for production (outputs ESM to dist/)
pnpm build

# Format code
pnpm format

# Lint code
pnpm lint

# Run unit tests (Vitest in Node environment)
pnpm test
```

## Architecture

- **Entry point**: `src/index.ts` - The main entry point that exports the library's API.
- **ES modules** throughout (`"type": "module"` in package.json)
- **Output format**: Generates `.js` (ESM) files in the `dist/` directory.
- **Type definitions**: Automatically generates `.d.ts` files using `vite-plugin-dts`.

## Coding Standards

See `docs/rules/` for TypeScript, testing, and tooling guidelines.

## TypeScript Configuration

- **Path alias**: `@/*` maps to `src/*` (configured in `tsconfig.base.json`)
- **Project references**: Uses `tsconfig.json` with `app` and `node` references
- **Strict mode** enabled

## Package Manager

This project uses **pnpm**.
