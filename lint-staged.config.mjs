//@ts-check
/**
 * @type {import("lint-staged").Configuration}
 */
export default {
    "src/**/*.{js,json,md,ts}": "biome check --write",
};
