"use strict";
exports.__esModule = true;
exports.objectEquality = exports.deepEquality = exports.arrayEquality = void 0;
// START HELPERS //
function __throwType(name, val, type) {
    throw new TypeError("\"".concat(name, "\" must be ").concat(type, ". Got \"").concat(val, "\" of type \"").concat(typeof val, "\"."));
}
function __checkArrayErrors(a, b) {
    if (!__isArray(a))
        __throwType('a', a, 'an Array');
    if (!__isArray(b))
        __throwType('b', b, 'an Array');
    if (__includes(a, a) || __includes(b, b))
        __throwCircular();
}
function __checkObjectErrors(obj1, obj2) {
    var values1 = __values(obj1);
    var values2 = __values(obj2);
    if (!__isObject(obj1))
        __throwType('obj1', obj1, 'an Object');
    if (!__isObject(obj2))
        __throwType('obj2', obj2, 'an Object');
    if (__includes(values1, obj1) || __includes(values2, obj2))
        __throwCircular();
}
function __isNullOrUndefined(a) {
    return a === null || a === undefined;
}
function __isObject(a) {
    return typeof a === 'object' && !__isNullOrUndefined(a) && !__isArray(a);
}
function __throwCircular() {
    throw new Error('Circular reference detected.');
}
function __includes(arr, item) {
    return arr.indexOf(item) !== -1;
}
function __isArray(a) {
    var _a;
    return ((_a = Array === null || Array === void 0 ? void 0 : Array.isArray) === null || _a === void 0 ? void 0 : _a.call(Array, a)) || a instanceof Array;
}
var AE_CACHE = {};
function DEFAULT_COMPARATOR(a, b) {
    return typeof a === 'number' && typeof b === 'number' ? a - b : (function () {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    })();
}
/**
 * Deeply compares two arrays.
 * @param a An array.
 * @param b Another array.
 * @param opts Options, as in {@link EqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
function arrayEquality(a, b, opts) {
    if (opts === void 0) { opts = {}; }
    __checkArrayErrors(a, b);
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    var stack = [{ a: a, b: b, index: 0 }];
    while (stack.length > 0) {
        var _a = stack.pop(), a_1 = _a.a, b_1 = _a.b, index = _a.index;
        if (index >= a_1.length)
            continue;
        var item1 = a_1[index];
        var item2 = b_1[index];
        if (item1 === a_1 || item2 === b_1)
            __throwCircular();
        if (typeof item1 !== typeof item2)
            return false;
        if (__isArray(item1) && __isArray(item2)) {
            if (item1 === item2)
                continue;
            if (item1.length !== item2.length)
                return false;
            stack.push({ a: item1, b: item2, index: 0 });
        }
        else if (typeof item1 === 'object' &&
            typeof item2 === 'object' &&
            item1 !== null &&
            item2 !== null) {
            if (item1 === item2)
                continue;
            if (__keys(item1).length !== __keys(item2).length)
                return false;
            stack.push({ a: __values(item1), b: __values(item2), index: 0 });
        }
        else if (!__isNullOrUndefined(opts.epsilon) &&
            typeof item1 === 'number' &&
            typeof item2 === 'number'
            ? Math.abs(Number(item1) - Number(item2)) >= opts.epsilon
            : item1 !== item2) {
            return false;
        }
        stack.push({ a: a_1, b: b_1, index: index + 1 });
    }
    return true;
}
exports.arrayEquality = arrayEquality;
function __replaceAfterSlash(regex) {
    var str = regex.toString();
    var newStr = str.replace(/\/[dgimsuy]*$/, '/');
    return newStr;
}
/**
 * Deeply compares any two arbitrary values.
 * @param a Any value.
 * @param b Any other value.
 * @param opts Options, as in {@link DeepEqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
function deepEquality(a, b, opts) {
    if (opts === void 0) { opts = {}; }
    __checkDeepErrors(opts);
    var _a = opts.comparator, comparator = _a === void 0 ? DEFAULT_COMPARATOR : _a, _b = opts.compareRegexFlags, compareRegexFlags = _b === void 0 ? false : _b, epsilon = opts.epsilon;
    if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime(); // handle date objects
    if (a instanceof RegExp && b instanceof RegExp) {
        var flags1 = a.flags, flags2 = b.flags;
        return compareRegexFlags
            ? flags1 === flags2 && __replaceAfterSlash(a) === __replaceAfterSlash(b)
            : __replaceAfterSlash(a) === __replaceAfterSlash(b);
    }
    if (__isArray(a) && __isArray(b))
        return arrayEquality(a, b);
    if (__isObject(a) && __isObject(b))
        return objectEquality(a, b);
    return !__isNullOrUndefined(epsilon) &&
        typeof a === 'number' &&
        typeof b === 'number'
        ? comparator(Math.abs(a - b), epsilon) < 0
        : comparator(a, b) === 0;
}
exports.deepEquality = deepEquality;
/**
 * Deeply compares two objects.
 * @param obj1 An object.
 * @param obj2 Another object.
 * @param opts Options, as in {@link EqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
function objectEquality(obj1, obj2, opts) {
    if (opts === void 0) { opts = {}; }
    __checkObjectErrors(obj1, obj2);
    var keys1 = __keys(obj1);
    var keys2 = __keys(obj2);
    var values1 = __values(obj1);
    if (keys1.length !== keys2.length)
        return false;
    if (obj1 === obj2)
        return true;
    var stack = [{ obj1: obj1, obj2: obj2, index: 0 }];
    while (stack.length > 0) {
        var _a = stack[stack.length - 1], obj2_1 = _a.obj2, index = _a.index;
        if (index >= keys1.length) {
            stack.pop();
            continue;
        }
        var key = keys1[index];
        if (!obj2_1.hasOwnProperty(key))
            return false;
        var val1 = values1[index];
        var val2 = obj2_1[key];
        if (typeof val1 !== typeof val2)
            return false;
        if (__isArray(val1) && __isArray(val2))
            return arrayEquality(val1, val2);
        else if (__isObject(val1) && __isObject(val2))
            return objectEquality(val1, val2);
        else if (!__isNullOrUndefined(opts.epsilon))
            return Math.abs(val1 - val2) < opts.epsilon;
        else if (val1 !== val2)
            return false;
        stack[stack.length - 1].index++;
    }
    return true;
}
exports.objectEquality = objectEquality;
function __keys(obj) {
    var _a;
    return (((_a = Object === null || Object === void 0 ? void 0 : Object.keys) === null || _a === void 0 ? void 0 : _a.call(Object, obj)) ||
        (function () {
            var k = [];
            for (var key in obj) {
                k[k.length] = key;
            }
            return k;
        })());
}
function __values(obj) {
    var _a;
    return (((_a = Object === null || Object === void 0 ? void 0 : Object.values) === null || _a === void 0 ? void 0 : _a.call(Object, obj)) ||
        (function () {
            var k = [];
            for (var key in obj) {
                k[k.length] = obj[key];
            }
            return k;
        })());
}
function __checkDeepErrors(_a) {
    var epsilon = _a.epsilon;
    __checkEpsilon(epsilon);
}
function __checkEpsilon(epsilon) {
    if (__isNullOrUndefined(epsilon))
        return;
    if (typeof epsilon !== 'number')
        __throwType('opts.epsilon', epsilon, 'a number');
    if (epsilon < 0)
        throw new Error("\"opts.epsilon\", if specified, must be positive or zero. Got \"".concat(epsilon, "\" of type \"").concat(typeof epsilon, "\"."));
}
