import { z } from "@hono/zod-openapi";
import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";

let route = new Hono();

const inputSchema = z.object({
    // This description is optional, but useful for OpenAPI
    // Write it if possible
    name: z.string().min(1).max(100).describe(" Name to be greeted"),
});
const outputSchema = z.object({
    hello: z.string(),
});

route = route.post(
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
        const query = c.req.valid("json");
        return c.json({ hello: query.name });
    },
);

export default route;
