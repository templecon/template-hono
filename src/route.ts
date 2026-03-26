import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as z from "zod";

const inputSchema = z.object({
    name: z.string(),
});
const outputSchema = z.object({
    hello: z.string().meta({ description: "A greeting message." }),
});

export const router = new Hono().post(
    "/",
    describeRoute({
        responses: {
            200: {
                description: "Successful Response",
                content: {
                    "application/json": { schema: resolver(outputSchema) },
                },
            },
        },
    }),

    validator("json", inputSchema),
    (c) => {
        const { name } = c.req.valid("json");
        return c.json({ hello: `Hello, ${name}!` });
    }
);
