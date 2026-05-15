# Tools Configuration

This document provides guidelines for configuring the tools in your project. The tools help maintain code quality and consistency by enforcing coding standards and identifying potential issues.

## Linter Configuration

This project uses oxlint for linting.

### oxlint

Fast linter for TypeScript.

It supports:

- Most of the rules of typescript-eslint, including type-aware rules.
- Many JavaScript plugins, while it might not support all of them.

But doesn't support:

- Every plugin.
- Some HTML-superset code, which oxlint only checks in the `<script>` block.
- A few typescript-eslint rules.
- Clean rule presets like `somePlugin.configs.recommended`.

#### Instructions

The config lives in `oxlint.config.ts`.

When using new plugins, try oxlint's plugin compatibility docs first.

- Make a config in the `scripts/linter/` directory for the plugin.
- Write the rules you want to use in that config.
- Extend `scripts/linter/oxlint-typescript.ts` with the config you made.

If the plugin needs JS plugin support, add it in `oxlint.config.ts` with `jsPlugins` instead of bringing ESLint back.

## Formatter Configuration

This project uses Prettier for formatting.
