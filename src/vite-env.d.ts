/// <reference types="vite/client" />
/// <reference types="vitest/importMeta" />

interface ImportMetaEnv extends Readonly<{
    /**
     * Indicates if the current environment is Vitest (testing environment).
     * It can be used to inline test code.
     */
    VITEST: "true" | undefined;
}> {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}
