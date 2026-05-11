import { defineConfig } from "oxlint";

import errorConfig from "./oxlint-typescript-error.ts";
import warnConfig from "./oxlint-typescript-warn.ts";

export default defineConfig({
    extends: [errorConfig, warnConfig],
});
