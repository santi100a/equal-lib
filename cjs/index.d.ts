/**
 * Options for {@link deepEquality}.
 *
 * @since 1.0.8
 */
export interface DeepEqualityOptions extends EqualityOptions {
    /**
     * Whether or not to compare the flags of a regular expression.
     * Has no effect in case you aren't comparing two regexes.
     */
    compareRegexFlags?: boolean;
    /**
     * A custom comparator function, compatible with the `compareFn` parameter
     * for {@link Array.prototype.sort}.
     */
    comparator?: CompareFunction;
}
type CompareFunction = (a: unknown, b: unknown) => number;
/**
 * Options for equality functions.
 *
 * @since 1.0.7
 */
export interface EqualityOptions {
    /**
     * An optional epsilon (for increasing floating-point precision).
     *
     * @since 1.0.7
     */
    epsilon?: number;
}
/**
 * Deeply compares two arrays.
 * @param a An array.
 * @param b Another array.
 * @param opts Options, as in {@link EqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
export declare function arrayEquality<T = unknown>(a: T[], b: T[], opts?: EqualityOptions): boolean;
/**
 * Deeply compares any two arbitrary values.
 * @param a Any value.
 * @param b Any other value.
 * @param opts Options, as in {@link DeepEqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
export declare function deepEquality(a: unknown, b: unknown, opts?: DeepEqualityOptions): boolean;
/**
 * Deeply compares two objects.
 * @param obj1 An object.
 * @param obj2 Another object.
 * @param opts Options, as in {@link EqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
export declare function objectEquality<T extends Record<PropertyKey, unknown>, _ = unknown>(obj1: T, obj2: Record<PropertyKey, unknown>, opts?: EqualityOptions): boolean;
export {};
