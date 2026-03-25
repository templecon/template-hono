# Tools Configuration

This document provides guidelines for configuring the tools in your project. The tools help maintain code quality and consistency by enforcing coding standards and identifying potential issues.

## Linter Configuration

This project uses both oxlint and ESLint for linting, to ensure fast linting.

### oxlint

Fast linter for TypeScript.

It supports:

- Most of the rules of typescript-eslint, including type-aware rules.
- ESLint's JS plugins, while it might not support all of the plugins.

But doesn't support:

- ESLint's every single plugin.
- Some of HTML-superset code, which oxlint only checks its `<script>` block.
- Little bit of rules of typescript-eslint.
- Clean rule definition, like ESLint's `somePlugin.configs.recommended`.

#### Instructions

When using new plugins, including ESLint's plugins, you should try oxlint's [ESLint compatibility](https://oxc.rs/docs/guide/usage/linter/js-plugins.html) first.

- Make a config on `scripts/linter/` directory about the plugin.
- Write the rules you want to use in the config. Since oxlint doesn't support `.configs.recommended` or something like that, you should write the rules you want to use in the config. Maybe checking the plugin's code to find out which rules are enabled in the recommended config is helpful.
- Modify `scripts/linter/oxlint-eslint.json` to extend the config you made.

### ESLint

ESLint is available but disabled by default. It supports:

- All of the rules of typescript-eslint, including type-aware rules.
- All of ESLint's plugins.
- All of HTML-superset code, including non-script block.

To enable ESLint, change the `useEslint` setting in `eslint.config.ts`:

- `"no-type-check"`: Use for non-type-aware rules (faster, ~0.5s)
- `"all"`: Full type-aware linting (slower)

ESLint is super-slow when fully enabled. For most development, oxlint alone is sufficient. Use ESLint only when you need rules that oxlint doesn't support.

## Formatter Configuration

This project uses Prettier for formatting, since it's not super-fast but still acceptable for formatting.
