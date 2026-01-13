# Hono OpenAPI Template

- Information: This document is for both humans and AI to understand the project. If you need more details, make a [AGENTS.md](https://agents.md/) file.
  Welcome to your super-cool Hono + OpenAPI starter! 🚀✨

## Features

- [Hono](https://hono.dev/) web framework
- [OpenAPI](https://www.openapis.org/) documentation with [hono-openapi](https://honohub.dev/docs/openapi)
- [Zod](https://zod.dev/) schema validation
- [Scalar](https://github.com/scalar/scalar) API docs UI
- Ready for Cloudflare Workers with Wrangler

## Getting Started

```sh
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Format code
pnpm format

# Build the project
pnpm build
```

### Environment Variables

To manage secrets and environment variables for local development, create a `.dev.vars` file in the root of the project. This file is ignored by git, so it is a safe place to store sensitive information.

For more information, see the [Wrangler documentation](https://developers.cloudflare.com/workers/wrangler/commands/#dev).

## API Endpoints

Check out `/docs`. Generated docs are at `/docs`.

## Project Structure

```
src/
  index.ts      # Main app entry, don't make it messy!
  route.ts      # API routes, make changes here
public/         # Static assets
```

## License

Apache-2.0, see [LICENSE](./LICENSE) for details.

## Code Style Guide 🦄✨

To keep our code super neat and sparkly, please follow these rules:

- **JavaScript:**
    - Avoid. Use TypeScript instead!
    - If you must(e.g. config files which do not support TypeScript), follow the same rules as TypeScript.
    - Use `// @ts-check` at the top of the file for type checking.
    - Use JSDoc comments, especially for functions.
    - Do not use common types like `Object`, `Any`. Use specific types.

- **TypeScript:**
    - Name files and folders in `kebab-case`.
    - Use `camelCase` for variables and functions, `PascalCase` for classes and types.
    - Write JSDoc comments as much as possible. Especially, add comments `@fires` and `@listens` for event-related functions.

- **Hono:**
    - MAKE a schema for each endpoint. Check out the route.ts file for examples. It is needed for generating OpenAPI docs.
    - Use middleware for common tasks like authentication, logging, etc.
    - Keep route handlers focused on a single task. We got the serverless power!
    - Make all routes chained. This is necessary for testing autocompletion and validation.

- **Commit Messages:**
    - Use Conventional Commits style. Check out [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/) for details.

- **Testing:**
    - Write tests for new features and bug fixes.
    - Use descriptive names for test cases.
    - Keep tests isolated and independent.
    - Use `it.concurrent` for tests that can run in parallel.
    - Aim for 90%+ code coverage, but don't obsess over it.
    - Focus on testing critical paths and edge cases. Don't test other library's code or trivial code.
    - Use `expectTypeOf<T>()` for type testing.

- **Review:**
    - PRs should be reviewed by at least one friend(AI friend is friend too) before merging!

Let’s keep everything tidy and readable so everyone can enjoy coding together~! (｡•̀ᴗ-)✧
