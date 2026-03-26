import { router } from "@/route";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { openAPIRouteHandler } from "hono-openapi";
import { cors } from "hono/cors";
/**
 * @fileoverview
 * This is the main entry point of the Hono application. It sets up the routing and middleware for the application.
 * Don't make this file too large. If you need to add more routes, create separate route files and import them here.
 */

const corsMiddleware = cors({
    origin(origin) {
        if (!import.meta.env.DEV) {
            throw new Error("CORS is only allowed in development mode.");
        }
        return origin;
    },
});
const app = new Hono().use("*", corsMiddleware).route("/", router);

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
app.get(
    "/docs",
    Scalar({
        defaultHttpClient: {
            clientKey: "fetch",
            targetKey: "js",
        },
        url: "/openapi.json",
    })
);
export default app;
