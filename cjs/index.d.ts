/**
 * Compares two arrays.
 *
 * @param {T[]} array1 First array.
 * @param {T[]} array2 Second array.
 *
 */
declare function arrayEquality<T>(array1: T[], array2: T[]): boolean;
/**
 * Compares two objects.
 *
 * @param {A} obj1 First object.
 * @param {B} obj2 Second object.
 *
 */
declare function objectEquality<A extends Record<any, any>, B extends Record<any, any>>(obj1: A, obj2: B): boolean;
export { arrayEquality, objectEquality };
