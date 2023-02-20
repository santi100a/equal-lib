/**
 * Compares two arrays.
 *
 * @param {T[]} array1 First array.
 * @param {T[]} array2 Second array.
 *
 * **Keep in mind it's not suitable for comparing nested arrays or arrays of objects.**
 */
declare function arrayEquality<T>(array1: T[], array2: T[]): boolean;
/**
 * Compares two objects.
 *
 * @param {A} obj1 First object.
 * @param {B} obj2 Second object.
 *
 * **Keep in mind it's not suitable for comparing nested objects or objects with arrays.**
 */
declare function objectEquality<A extends Record<any, any>, B extends Record<any, any>>(obj1: A, obj2: B): boolean;
export { arrayEquality, objectEquality };
