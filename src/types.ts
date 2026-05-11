/**
 * Environment variables, injected in runtime.
 * It can be secret(injected in dashboard or separate file) or variables(wrangler.jsonc).
 */
export type Env = {
    /**
     * Injected by Cloudflare in runtime.
     */
    SUPER_SECRET: string;
};

export type HonoEnv = {
    Bindings: Env;
};
