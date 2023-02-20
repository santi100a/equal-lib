"use strict";
exports.__esModule = true;
exports.objectEquality = exports.arrayEquality = void 0;
function __map(array, fn) {
    var _ = [];
    if (!Array.isArray(array))
        throw new TypeError("\"array\" must be an array, received type \"".concat(typeof array, "\" with value \"").concat(String(array), "\"."));
    for (var i in array) {
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
 * **Keep in mind it's not suitable for comparing nested arrays or arrays of objects.**
 */
function arrayEquality(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2))
        throw new TypeError("Parameters must be arrays.");
    if (array1.length !== array2.length)
        return false;
    else {
        var str = __map(array1, function (v, i) {
            if (Array.isArray(v)) // If an item is an array...
                return arrayEquality(v, array2[i]); // recursively call the function.
            else if (typeof v === 'object') {
                // If it's an object...
                return objectEquality(v, array2[i]);
            }
            else {
                // If it's a normal data structure...
                return v === array2[i];
            }
        }).toString();
        return !str.includes("false");
    }
}
exports.arrayEquality = arrayEquality;
/**
 * Compares two objects.
 *
 * @param {A} obj1 First object.
 * @param {B} obj2 Second object.
 *
 * **Keep in mind it's not suitable for comparing nested objects or objects with arrays.**
 */
function objectEquality(obj1, obj2) {
    if (typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null ||
        obj1 === undefined ||
        obj2 === undefined)
        throw new TypeError("Parameters must be objects.");
    else {
        var keys1 = Object.keys(obj1);
        var keys2 = Object.keys(obj2);
        var values1 = Object.values(obj1);
        var values2 = Object.values(obj2);
        return arrayEquality(keys1, keys2) && arrayEquality(values1, values2);
    }
}
exports.objectEquality = objectEquality;
