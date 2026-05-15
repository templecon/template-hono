import type { HonoEnv } from "@/types";
import type { Context as RawContext, Next } from "hono";
type Context = RawContext<HonoEnv, string>;

function applyCorsHeaders(c: Context) {
    const requestedOrigin = c.req.header("Origin");
    if (requestedOrigin) {
        c.res.headers.append("Vary", "Origin");
        c.header("Access-Control-Allow-Origin", requestedOrigin);
    }

    c.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );

    const requestedHeaders = c.req.header("Access-Control-Request-Headers");
    if (requestedHeaders) {
        c.header("Access-Control-Allow-Headers", requestedHeaders);
        c.header("Access-Control-Expose-Headers", requestedHeaders);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
    }

    c.header("Access-Control-Max-Age", "86400"); // 24h
    c.header("Access-Control-Allow-Credentials", "true");
}
export async function cors(c: Context, next: Next) {
    const origin = c.req.header("Origin");

    if (!origin) {
        // same-origin request
        return next();
    }
    applyCorsHeaders(c);

    if (c.req.method === "OPTIONS") {
        if (c.req.header("Access-Control-Request-Method")) {
            // Preflight requests
            return c.newResponse(null, 204);
        }
    }
    return next();
}
