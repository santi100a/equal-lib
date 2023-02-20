function __map<T, R = unknown>(array: T[], fn: (val: T, ind: number) => R) {
  const _ = [];
  if (!Array.isArray(array))
    throw new TypeError(
      `"array" must be an array, received type "${typeof array}" with value "${String(array)}".`);
  for (let i in array) {
    _[_.length + 1] = fn(array[i], Number(i));
  }
  return _;
}
/**
 * Compares two arrays.
 *
 * @param {T[]} array1 First array.
 * @param {T[]} array2 Second array.
 *
 */
function arrayEquality<T>(array1: T[], array2: T[]): boolean {
  if (!Array.isArray(array1) || !Array.isArray(array2))
    throw new TypeError("Parameters must be arrays.");

  if (array1.length !== array2.length) return false;
  else {
    const str = __map(array1, (v, i) => {
      if (Array.isArray(v)) // If an item is an array...
        return arrayEquality(v, array2[i] as any[]) // recursively call the function.
      else if (typeof v === 'object') {
        // If it's an object...
        return objectEquality(v as Record<any, any>, array2[i] as Record<any, any>);
      } else {
        // If it's a normal data structure...
        return v === array2[i];
      }
      
    }).toString();
    return !str.includes("false");
  }
}
/**
 * Compares two objects.
 *
 * @param {A} obj1 First object.
 * @param {B} obj2 Second object.
 *
 */
function objectEquality<A extends Record<any, any>, B extends Record<any, any>>(
  obj1: A,
  obj2: B
): boolean {
    if (typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null ||
        obj1 === undefined ||
        obj2 === undefined)
      throw new TypeError("Parameters must be objects.");
    else {
      let keys1 = [];
      let keys2 = [];
      let values1 = [];
      let values2 = [];
      for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
          keys1.push(key);
          values1.push(obj1[key]);
        }
      }
      for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
          keys2.push(key);
          values2.push(obj2[key]);
        }
      }
      return arrayEquality(keys1, keys2) && arrayEquality(values1, values2);
  }
}


export { arrayEquality, objectEquality };