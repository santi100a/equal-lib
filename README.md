# Santi's Equality Library

[![Build Status](https://github.com/santi100a/equal-lib/actions/workflows/main.yml/badge.svg)](https://github.com/santi100a/equal-lib/actions)
[![GitHub stars](https://img.shields.io/github/stars/santi100a/equal-lib.svg)](https://github.com/santi100a/equal-lib)
[![License](https://img.shields.io/github/license/santi100a/equal-lib.svg)](https://github.com/santi100a/equal-lib)

- 🚀 Lightweight and fast
- 👴 ES3-compliant*
- 💻 Portable between the browser and Node.js

**Hasn't been tested in an actual ES3 environment. Feel free to open an issue or pull request if you find any non-ES3 thing.*

## Installation
- Via NPM: `npm install @santi100/equal-lib`
- Via Yarn: `yarn add @santi100/equal-lib`
- Via PNPM: `pnpm install @santi100/equal-lib`

## API

- `function arrayEquality<T>(array1: T[], array2: T[]): boolean;` Compares two arrays. It takes both arrays as arguments, and returns whether or not they are equal. 
- `function objectEquality<A extends Record<any, any>, B extends Record<any, any>>(obj1: A, obj2: B): boolean;` Compares two objects. It takes both objects as arguments, and returns whether or not they are equal.

Keep in mind that since version 1.0.2, this library can compare:
- Nested arrays or objects
- Arrays of objects
- Objects with arrays

**All previous versions are deprecated due to this.**