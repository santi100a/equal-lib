/// <reference path="index.d.ts" />

function arrayEquality(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2))
        throw new TypeError('Parameters must be arrays.')
    
    if (array1.length !== array2.length) return false;
    else {
        const str = array1.map((v, i) => v === array2[i]).toString();
        return !str.includes('false');
    }
}

function objectEquality(obj1, obj2) {
    if (
        typeof obj1 !== 'object' ||
        typeof obj2 !== 'object' ||
        obj1 === null ||
        obj2 === null ||
        obj1 === undefined ||
        obj2 === undefined
    )
        throw new TypeError('Parameters must be objects.');
    else {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        const values1 = Object.values(obj1);
        const values2 = Object.values(obj2);

        return arrayEquality(keys1, keys2) && arrayEquality(values1, values2);
    }
}

exports.arrayEquality = arrayEquality;
exports.objectEquality = objectEquality;