function arrayEquality<T>(array1: T[], array2: T[]): boolean {
  if (!Array.isArray(array1) || !Array.isArray(array2))
    throw new TypeError("Parameters must be arrays.");

  if (array1.length !== array2.length) return false;
  
  for (let i = 0; i < array1.length; i++) {
    const item1 = array1[i];
    const item2 = array2[i];

    if (Array.isArray(item1) && Array.isArray(item2)) {
      if (!arrayEquality(item1, item2)) return false;
    } else if (typeof item1 === "object" && typeof item2 === "object") {
      if (!objectEquality(item1 as Record<any, any>, item2 as Record<any, any>)) return false;
    } else if (item1 !== item2) {
      return false;
    }
  }

  return true;
}

/**
 * Compares two objects.
 *
 * @param {T} obj1 First object.
 * @param {Record<any, any>} obj2 Second object.
 *
 */
function objectEquality
<
T extends Record<any, any>, 
_ = unknown
>(
  obj1: T,
  obj2: Record<any, any>
): boolean {
  if (typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null ||
    obj1 === undefined ||
    obj2 === undefined)
    throw new TypeError("Parameters must be objects.");

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key)) {
      return false;
    }
    if (obj1[key] === obj2[key]) {
      continue;
    }
    if (typeof obj1[key] !== typeof obj2[key]) {
      return false;
    }
    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      if (!arrayEquality(obj1[key], obj2[key])) return false;
    } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!objectEquality(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  for (let key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

/**
 * Deeply compares `param1` and `param2`.
 * 
 * @since 1.0.4
 * @param param1 First value.
 * @param param2 Second value.
 * @returns Whether or not `param1` and `param2` are equal.
 */
function deepEquality(param1: any, param2: any): boolean {
  if (typeof param1 !== typeof param2) {
    return false;
  }

  if (Array.isArray(param1) && Array.isArray(param2)) {
    return arrayEquality(param1, param2);
  }

  if (typeof param1 === "object" && typeof param2 === "object") {
    return objectEquality(param1 as Record<any, any>, param2 as Record<any, any>);
  }

  return param1 === param2;
}


export { arrayEquality, objectEquality, deepEquality };