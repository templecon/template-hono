> [!NOTE]
> This is template repository for library development using TypeScript and Vite. Check out [website template](https://github.com/templecon/template-typescript-vite-web) for web application development.

# How to use

```
git clone https://github.com/templecon/template-typescript-vite
```

## Requirements

Node.js version 22.18.0 or higher is recommended, since it has basic TypeScript support, which is used on eslint.config.ts.
Older versions will:

- Older than v22.6.0: Not work, migrate Node version or eslint.config.ts to .js.
- Between v22.6.0 and v22.18.0: Work, but require `--experimental-transform-types`(since v22.7.0) or `--experimental-strip-types`(since v22.6.0) flag on `NODE_OPTIONS` environment variable.
- v22.18.0 or higher: Work without flags.

## Conventions and Rules

This project follows specific conventions and rules for code style, data validation, testing, and more. Please refer to the following documentation for detailed guidelines.

- [Typescript](./docs/rules/typescript.md)
- [Typescript Schema Validation](./docs/rules/typescript_schema.md)
- [Testing Guidelines](./docs/rules/tests.md)
