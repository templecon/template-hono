# TypeScript Schema Rules

Use this when defining runtime validation schemas and the TypeScript types derived from them.

## TL;DR

- Use Zod for runtime validation by default.
- Put human-facing documentation on schema fields with JSDoc comments.
- Use `z.input<typeof Schema>` for incoming data and `z.output<typeof Schema>` for validated/normalized data.
- Prefer defaults on the schema instead of repeating fallback values in handlers.

## JSDoc on Schemas

Do not use `.describe()` or `.meta()` as the primary place for schema documentation. Those annotations are not as visible in IDEs as property JSDoc, so the docs become easier to miss during implementation.

Write JSDoc directly on the schema fields instead:

```ts
import * as z from "zod";

export const SomeSchema = z
    .object({
        /**
         * Name of the entry shown to users.
         */
        name: z.string().default("Some name"),
        /**
         * Optional free-form description.
         */
        description: z.string().optional(),
    })
    .prefault({});

/**
 * Use the output type once defaults and validation have been applied.
 */
export type SomeType = z.output<typeof SomeSchema>;

/**
 * Use the input type when a caller may omit optional/defaulted values.
 */
export type SomeInputType = z.input<typeof SomeSchema>;
```

## Defaults

Zod gives you two useful defaulting patterns:

- `default()` fills in a missing property during parsing.
- `prefault()` supplies a fallback input value before parsing the object.

Use them like this:

```ts
// Too strict: every caller must provide the field.
const SomeSchema = z.object({
    isEnabled: z.boolean(),
});

// Better: missing `isEnabled` becomes `false` during parsing.
const SomeSchema = z.object({
    isEnabled: z.boolean().default(false),
});

// Best for optional objects: the entire object can be omitted, and defaults still apply.
const SomeSchema = z
    .object({
        isEnabled: z.boolean().default(false),
    })
    .prefault({});
```

Use `prefault({})` when you want callers to be able to omit the entire object, but you still want the object-level defaults to be applied. That works best when every property is either defaulted or optional.

## Types

When a schema uses defaults, the parsed value is usually not the same shape as the raw input. In that case:

- use `z.input<typeof Schema>` for the function parameter type
- use `z.output<typeof Schema>` for the validated return or normalized value type

```ts
function buildResponse(
    input: z.input<typeof SomeSchema>
): z.output<typeof SomeSchema> {
    const parsed = SomeSchema.parse(input);
    return parsed;
}
```

Prefer `z.output` over `z.infer` when the direction matters, because `z.output` makes it clear that the type is the post-parse shape.
