# Santi's Equality Library

[![Build Status](https://github.com/santi100a/equal-lib/actions/workflows/test.yml/badge.svg)](https://github.com/santi100a/equal-lib/actions)
[![npm homepage](https://img.shields.io/npm/v/@santi100/equal-lib)](https://npmjs.org/package/@santi100/equal-lib)
[![GitHub stars](https://img.shields.io/github/stars/santi100a/equal-lib.svg)](https://github.com/santi100a/equal-lib)
[![License](https://img.shields.io/github/license/santi100a/equal-lib.svg)](https://github.com/santi100a/equal-lib)
[![Bundlephobia stats](https://img.shields.io/bundlephobia/min/@santi100/equal-lib)](https://bundlephobia.com/package/@santi100/equal-lib@latest)
- 🚀 Lightweight and fast^
- 👴 ES3-compliant*
- 💻 Portable between the browser and Node.js

**Hasn't been tested in an actual ES3 environment. Feel free to open an issue or pull request if you find any non-ES3 thing. See "Contribute" for instructions on how to do so.*

*^The source code is about 2 kilobytes.*

## What's this?
This is a lightweight, fast library for doing [*deep equality*](#what-is-deep-equality).
### What is "deep equality"? 
"Deep equality" refers to the concept of comparing two values for equality not just on a shallow level, but on a deep level as well. When checking for deep equality, not only are the top-level values of the two objects being compared checked, but also their nested values. This can be particularly useful when comparing complex data structures like objects or arrays. For example, if two objects have the same keys but their values are objects themselves, checking for shallow equality would only compare the reference to those objects, not their internal properties. Checking for deep equality would compare those properties as well. JavaScript compares objects with [*referential equality*](#what-is-referential-equality) by default.
### What is "referential equality"?
"Referential equality" is a type of equality that compares if two variables refer to the exact same object in memory. In other words, it checks if the two variables point to the same memory address. This is often used when checking if two variables are the same instance of an object. If two variables have referential equality, any change made to one of them will also affect the other. In JavaScript, referential equality can be checked using the `===` operator.
## Contribute

Wanna contribute? [File an issue](https://github.com/santi100a/equal-lib/issues) or [pull request](https://github.com/santi100a/equal-lib/pulls)!
Make sure you follow the [contribution Code of Conduct](https://github.com/santi100a/equal-lib/blob/main/CODE_OF_CONDUCT.md).

## Installation
- Via NPM: `npm install @santi100/equal-lib`
- Via Yarn: `yarn add @santi100/equal-lib`
- Via PNPM: `pnpm install @santi100/equal-lib`

## API
- `interface EqualityOptions;` Options for equality functions.
    * `epsilon?: number;` An optional epsilon (for increasing floating-point precision).
- `interface DeepEqualityOptions;` (since 1.0.8) Options for `deepEquality`.
    * `compareRegexFlags?: boolean;` Whether or not to compare the flags of a regular expression.
	Has no effect in case you aren't comparing two regexes.
    * `comparator?: CompareFunction;` A custom comparator function, compatible with the `compareFn` parameter
    for `Array.prototype.sort`.
- `function arrayEquality<T = unknown>(a: T[], b: T[], opts?: EqualityOptions): boolean;` Compares two arrays. It takes both arrays as arguments, and returns whether or not they are equal. It can also take an optional `EqualityOptions` object as its third argument.
- `function objectEquality<T extends Record<any, any>>(obj1: A, obj2: Record<any, any>, opts?: EqualityOptions): boolean;` 
Compares two objects. It takes both objects as arguments, and returns whether or not they are equal. It can also take an optional `EqualityOptions` object as its third argument.
- `function deepEquality(param1: any, param2: any, opts?: DeepEqualityOptions): boolean;` 
(since 1.0.4) Deeply compares `param1` and `param2`. It takes any two values as arguments, and returns whether or not they are equal. It can also take an optional `DeepEqualityOptions` object as its third argument.

Keep in mind that since version 1.0.2, this library can compare:
- Nested arrays or objects
- Arrays of objects
- Objects with arrays

**All previous versions (1.0.1 and 1.0.0) are deprecated due to their incapability of doing the above.**

## Usage examples
```typescript
// ESM
import { arrayEquality, deepEquality, objectEquality } from '@santi100/equal-lib'; 
// CJS (since 1.0.4). Import '@santi100/equal-lib/cjs/index.js' if using 1.0.3 or older.
const { arrayEquality, deepEquality, objectEquality } = require('@santi100/equal-lib/cjs'); 

// Examples for arrayEquality
console.log(arrayEquality([1, 2, 3], [1, 2, 3])); // true
console.log(arrayEquality([1, 2, 3], [1, 3, 2])); // false

// Examples for objectEquality
console.log(objectEquality({ foo: 'bar' }, { foo: 'bar' })); // true
console.log(objectEquality({ foo: 'bar', baz: { qux: 'quux' } }, { foo: 'bar', baz: { qux: 'quux' } })); // true
console.log(objectEquality({ foo: 'bar', baz: { qux: 'quux' } }, { foo: 'bar', baz: { qux: 'corge' } })); // false

// Examples for deepEquality
console.log(deepEquality(2, 2)); // true
console.log(deepEquality([1, 2, 3], [1, 2, 3])); // true
console.log(deepEquality({ foo: 'bar', baz: { qux: 'quux' } }, { foo: 'bar', baz: { qux: 'quux' } })); // true
console.log(deepEquality({ foo: 'bar', baz: { qux: 'quux' } }, { foo: 'bar', baz: { qux: 'corge' } })); // false

```