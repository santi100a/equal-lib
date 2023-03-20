function __isArray(a: any): a is any[] {
	return Array?.isArray?.(a) || a instanceof Array;
}

export function deepEquality(a: any, b: any) {
	if (__isArray(a) && __isArray(b)) return arrayEquality(a, b);
	if (__isObject(a) && __isObject(b)) return objectEquality(a, b);
	return a === b;
}

function __isNullOrUndefined(a: any): a is void {
	return a === null || a === undefined;
}
function __isObject(a: any): a is Record<any, any> {
	return typeof a === 'object' && !__isNullOrUndefined(a) && !__isArray(a);
}
function __throwCircular(): never {
	throw new Error('Circular reference detected.');
}
export function arrayEquality<T = unknown>(a: T[], b: T[]): boolean {
	__checkArrayErrors(a, b);
	if (a.indexOf(a as T) !== -1 || b.indexOf(b as T) !== -1) __throwCircular();
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		const item1 = a[i];
		const item2 = b[i];
		if (item1 === a || item2 === b) __throwCircular();
		if (typeof item1 !== typeof item2) return false;
		if (item1 instanceof Array && item2 instanceof Array) {
			if (!arrayEquality(item1, item2)) return false;
		} else if (
			typeof item1 === 'object' &&
			typeof item2 === 'object' &&
			item1 !== null &&
			item2 !== null
		) {
			if (
				!objectEquality(item1 as Record<any, any>, item2 as Record<any, any>)
			) {
				return false;
			}
		} else if (item1 !== item2) {
			return false;
		}
	}
	return true;
}
function __throwType(name: string, val: any, type: string): never {
	throw new TypeError(
		`"${name}" must be ${type}. Got "${val}" of type "${typeof val}".`
	);
}
function __checkArrayErrors(a: any[], b: any[]) {
	if (!__isArray(a)) __throwType('a', a, 'an Array');
	if (!__isArray(b)) __throwType('b', b, 'an Array');
}
function __checkObjectErrors(obj1: Record<any, any>, obj2: Record<any, any>) {
	if (!__isObject(obj1)) __throwType('obj1', obj1, 'an Object');
	if (!__isObject(obj2)) __throwType('obj2', obj2, 'an Object');
}
export function objectEquality<
	T extends Record<any, any>,
	/**
	 * @deprecated
	 */

	_ = unknown
>(obj1: T, obj2: Record<any, any>): boolean {
	__checkObjectErrors(obj1, obj2);
	if (obj1 === obj2) return true;
	const keys1 = __keys(obj1),
		keys2 = __keys(obj2);
	const values1 = __values(obj1),
		values2 = __values(obj2);
	if (values1.indexOf(obj1) !== -1 || values2.indexOf(obj2) !== -1)
		__throwCircular();
	if (!arrayEquality(keys1, keys2)) return false;
	if (!arrayEquality(values1, values2)) return false;
	return true;
}
function __keys(obj: Record<string | number | symbol, any>) {
	return (
		Object?.keys?.(obj) ||
		(function () {
			const k = [];
			for (const key in obj) {
				k[k.length] = key;
			}
			return k;
		})()
	);
}
function __values(obj: Record<string | number | symbol, any>) {
	return (
		Object?.values?.(obj) ||
		(function () {
			const k = [];
			for (const key in obj) {
				k[k.length] = obj[key];
			}
			return k;
		})()
	);
}
