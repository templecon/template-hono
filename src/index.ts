import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { openAPIRouteHandler } from "hono-openapi";
import helloRoute from "./route";

type Bindings = {
    // You can write your own bindings or env secret here.
    [key: string]: unknown;
};

/* istanbul ignore next -- @preserve */
const app = new Hono<{ Bindings: Bindings }>()
    // Already tested by hono.
    .use(requestId())
    // This is not testable, since import.meta.env.DEV is staticly replaced
    // during the build time.
    .use(
        cors({
            origin: (origin, _ctx) => {
                // All origins are allowed in this example
                if (import.meta.env.DEV) return origin;
                else
                    throw new Error(
                        "CORS is too permissive for production. Please restrict the origin.",
                    );
            },
            credentials: true,
        }),
    )
    .route("/hello", helloRoute);
// Not chained, so it will not be appear on test route list
// Also already tested by hono-openapi
/* istanbul ignore next -- @preserve */
app.get(
    "/openapi.json",
    openAPIRouteHandler(app, {
        includeEmptyPaths: true,
        documentation: {
            info: {
                title: "Hono",
                version: "1.0.0",
                description: "API for greeting users",
            },
        },
        exclude: ["/openapi.json", "/docs"],
    }),
).get("/docs", Scalar({ url: "/openapi.json" }));
export default app;
