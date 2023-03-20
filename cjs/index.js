"use strict";
exports.__esModule = true;
exports.objectEquality = exports.arrayEquality = exports.deepEquality = void 0;
function __isArray(a) {
    var _a;
    return ((_a = Array === null || Array === void 0 ? void 0 : Array.isArray) === null || _a === void 0 ? void 0 : _a.call(Array, a)) || a instanceof Array;
}
function deepEquality(a, b) {
    if (__isArray(a) && __isArray(b))
        return arrayEquality(a, b);
    if (__isObject(a) && __isObject(b))
        return objectEquality(a, b);
    return a === b;
}
exports.deepEquality = deepEquality;
function __isNullOrUndefined(a) {
    return a === null || a === undefined;
}
function __isObject(a) {
    return typeof a === 'object' && !__isNullOrUndefined(a) && !__isArray(a);
}
function __throwCircular() {
    throw new Error('Circular reference detected.');
}
function arrayEquality(a, b) {
    __checkArrayErrors(a, b);
    if (a.indexOf(a) !== -1 || b.indexOf(b) !== -1)
        __throwCircular();
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; i++) {
        var item1 = a[i];
        var item2 = b[i];
        if (item1 === a || item2 === b)
            __throwCircular();
        if (typeof item1 !== typeof item2)
            return false;
        if (item1 instanceof Array && item2 instanceof Array) {
            if (!arrayEquality(item1, item2))
                return false;
        }
        else if (typeof item1 === 'object' &&
            typeof item2 === 'object' &&
            item1 !== null &&
            item2 !== null) {
            if (!objectEquality(item1, item2)) {
                return false;
            }
        }
        else if (item1 !== item2) {
            return false;
        }
    }
    return true;
}
exports.arrayEquality = arrayEquality;
function __throwType(name, val, type) {
    throw new TypeError("\"".concat(name, "\" must be ").concat(type, ". Got \"").concat(val, "\" of type \"").concat(typeof val, "\"."));
}
function __checkArrayErrors(a, b) {
    if (!__isArray(a))
        __throwType('a', a, 'an Array');
    if (!__isArray(b))
        __throwType('b', b, 'an Array');
}
function __checkObjectErrors(obj1, obj2) {
    if (!__isObject(obj1))
        __throwType('obj1', obj1, 'an Object');
    if (!__isObject(obj2))
        __throwType('obj2', obj2, 'an Object');
}
function objectEquality(obj1, obj2) {
    __checkObjectErrors(obj1, obj2);
    if (obj1 === obj2)
        return true;
    var keys1 = __keys(obj1), keys2 = __keys(obj2);
    var values1 = __values(obj1), values2 = __values(obj2);
    if (values1.indexOf(obj1) !== -1 || values2.indexOf(obj2) !== -1)
        __throwCircular();
    if (!arrayEquality(keys1, keys2))
        return false;
    if (!arrayEquality(values1, values2))
        return false;
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
