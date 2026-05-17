const ALLOWED_STRINGS = new Set([
    "then",
    "toJSON",
    "inspect",
    "constructor",
    "prototype",
    "asymmetricMatch",
    "nodeType",
    "valueOf",
    "$$typeof",
    "length",
]);

/**
 * This function is used to create a proxy of type T.
 * If missing properties are accessed, it will throw an error.
 * Note that symbol properties are not checked for existence and will be returned as is.
 * Some default properties are allowed to be accessed without throwing an error, such as "then", "toJSON", "inspect", "constructor", and "prototype".
 * @param obj - The partial object to create a proxy from.
 * @param allowed - A set of allowed property names that can be accessed without throwing an error.
 * @returns A proxy of type T.
 * @see {@link ALLOWED_STRINGS}
 */
export function fragile<const T extends object>(
    target: Partial<T>,
    allowed: Set<string> | string[] = []
): T {
    if (Array.isArray(allowed)) {
        return fragile(target, new Set(allowed));
    }
    return new Proxy(target as T, {
        get(obj, prop, receiver) {
            if (typeof prop === "symbol") {
                return Reflect.get(obj, prop, receiver);
            }
            if (prop in obj) {
                return Reflect.get(obj, prop, receiver);
            }
            if (ALLOWED_STRINGS.has(prop)) {
                return Reflect.get(obj, prop, receiver);
            }
            if (allowed.has(prop)) {
                return Reflect.get(obj, prop, receiver);
            }
            throw new Error(`Property ${String(prop)} is missing`);
        },
    });
}
