Structure:

tests/

- tests/browser/ : Contains integration tests that run in a browser environment using Playwright. It detects slight mismatches between different browsers and node environments.
- tests/unit/ : Contains unit tests that run in a Node.js environment using Vitest. These tests focus on individual functions and modules without browser dependencies. Should be fast and isolated.

Each subdirectory should follow same structure as src/ for easy mapping between source files and tests.
