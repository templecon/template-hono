import { Hono } from "hono";
import {
    describeRoute,
    openAPIRouteHandler,
    resolver,
    validator,
} from "hono-openapi";
import * as z from "zod";

const inputSchema = z.object({
    name: z.string(),
});
const outputSchema = z.object({
    hello: z.string().meta({ description: "A greeting message." }),
});
const app = new Hono().post(
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

// OpenAPI-related
app.get(
    "/openapi.json",
    openAPIRouteHandler(app, {
        documentation: {
            info: {
                title: "Hono API",
                version: "1.0.0",
                description: "Greeting API",
            },
            servers: [
                { url: "http://localhost:5178", description: "Local Server" },
            ],
        },
    })
);

export default app;
