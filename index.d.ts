declare function arrayEquality<T>(array1: T[], array2: T[]): boolean;
/**
 * Compares two objects.
 *
 * @param {T} obj1 First object.
 * @param {Record<any, any>} obj2 Second object.
 *
 */
declare function objectEquality<T extends Record<any, any>, _ = unknown>(obj1: T, obj2: Record<any, any>): boolean;
/**
 * Deeply compares `param1` and `param2`.
 *
 * @since 1.0.4
 * @param param1 First value.
 * @param param2 Second value.
 * @returns Whether or not `param1` and `param2` are equal.
 */
declare function deepEquality(param1: any, param2: any): boolean;
export { arrayEquality, objectEquality, deepEquality };
