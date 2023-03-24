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
 * @param opts Options, as in {@link EqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
export declare function deepEquality(a: any, b: any, opts?: EqualityOptions): boolean;
/**
 * Deeply compares two objects.
 * @param obj1 An object.
 * @param obj2 Another object.
 * @param opts Options, as in {@link EqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
export declare function objectEquality<T extends Record<any, any>, _ = unknown>(obj1: T, obj2: Record<any, any>, opts?: EqualityOptions): boolean;
