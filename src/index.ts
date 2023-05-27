// START HELPERS //
function __throwType(name: string, val: unknown, type: string): never {
	throw new TypeError(
		`"${name}" must be ${type}. Got "${val}" of type "${typeof val}".`
	);
}
function __checkArrayErrors(a: unknown[], b: unknown[]) {
	if (!__isArray(a)) __throwType('a', a, 'an Array');
	if (!__isArray(b)) __throwType('b', b, 'an Array');
	if (__includes(a, a as unknown) || __includes(b, b as unknown)) __throwCircular();
}
function __checkObjectErrors(obj1: Record<PropertyKey, unknown>, obj2: Record<PropertyKey, unknown>) {
	const values1 = __values(obj1);
	const values2 = __values(obj2);

	if (!__isObject(obj1)) __throwType('obj1', obj1, 'an Object');
	if (!__isObject(obj2)) __throwType('obj2', obj2, 'an Object');
	if (__includes(values1, obj1) || __includes(values2, obj2)) __throwCircular();
}
function __isNullOrUndefined(a: unknown): a is void {
	return a === null || a === undefined;
}
function __isObject(a: unknown): a is Record<PropertyKey, unknown> {
	return typeof a === 'object' && !__isNullOrUndefined(a) && !__isArray(a);
}
function __throwCircular(): never {
	throw new Error('Circular reference detected.');
}
function __includes<T = unknown>(arr: T[], item: T) {
	return arr.indexOf(item) !== -1;
}
function __isArray(a: unknown): a is unknown[] {
	return Array?.isArray?.(a) || a instanceof Array;
}


// START TYPES //

/**
 * Options for {@link deepEquality}.
 *
 * @since 1.0.8
 */
export interface DeepEqualityOptions extends EqualityOptions {
	/**
	 * Whether or not to compare the flags of a regular expression.
	 * Has no effect in case you aren't comparing two regexes.
	 */
	compareRegexFlags?: boolean;
	/**
	 * A custom comparator function, compatible with the `compareFn` parameter
	 * for {@link Array.prototype.sort}.
	 */
	comparator?: CompareFunction;
}
type CompareFunction = (a: unknown, b: unknown) => number;
/**
 * Options for equality functions.
 *
 * @since 1.0.7
 */
export interface EqualityOptions {
	/**
	 * An optional epsilon (for increasing floating-point precision).
	 *
	 * @since 1.0.7
	 */
	epsilon?: number;
}
interface StackItem<T> {
	obj1: T;
	obj2: Record<PropertyKey, unknown>;
	index: number;
}
function DEFAULT_COMPARATOR(a: unknown, b: unknown) {
	return typeof a === 'number' && typeof b === 'number'
		? a - b
		: (function () {
				// @ts-expect-error a and b are unknown.
				if (a < b) return -1;
				// @ts-expect-error a and b are unknown.
				if (a > b) return 1;
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
export function arrayEquality<T = unknown>(
	a: T[],
	b: T[],
	opts: EqualityOptions = {}
): boolean {
	__checkArrayErrors(a, b);
	if (a === b) return true;
	if (a.length !== b.length) return false;

	const stack: { a: T[]; b: T[]; index: number }[] = [{ a, b, index: 0 }];
	while (stack.length > 0) {
		const { a, b, index } = stack.pop() as NonNullable<{
			a: T[];
			b: T[];
			index: number;
		}>;
		if (index >= a.length) continue;

		const item1 = a[index];
		const item2 = b[index];
		if (item1 === a || item2 === b) __throwCircular();
		if (typeof item1 !== typeof item2) return false;

		if (__isArray(item1) && __isArray(item2)) {
			if (item1 === item2) continue;
			if (item1.length !== item2.length) return false;
			// @ts-expect-error Typing error
			stack.push({ a: item1, b: item2, index: 0 });
		} else if (
			typeof item1 === 'object' &&
			typeof item2 === 'object' &&
			item1 !== null &&
			item2 !== null
		) {
			if (item1 === item2) continue;
			// @ts-expect-error A typing error.
			if (__keys(item1).length !== __keys(item2).length) return false;
			// @ts-expect-error A typing error.
			stack.push({ a: __values(item1), b: __values(item2), index: 0 });
		} else if (
			!__isNullOrUndefined(opts.epsilon) &&
			typeof item1 === 'number' &&
			typeof item2 === 'number'
				? Math.abs(Number(item1) - Number(item2)) >= opts.epsilon
				: item1 !== item2
		) {
			return false;
		}
		stack.push({ a, b, index: index + 1 });
	}

	return true;
}
function __replaceAfterSlash(regex: RegExp): string {
	const str = regex.toString();
	const newStr = str.replace(/\/[dgimsuy]*$/, '/');
	return newStr;
}
/**
 * Deeply compares any two arbitrary values.
 * @param a Any value.
 * @param b Any other value.
 * @param opts Options, as in {@link DeepEqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
export function deepEquality(
	a: unknown,
	b: unknown,
	opts: DeepEqualityOptions = {}
) {
	__checkDeepErrors(opts);
	const {
		comparator = DEFAULT_COMPARATOR,
		compareRegexFlags = false,
		epsilon,
	} = opts;

	if (typeof a !== typeof b) return false;
	if (a === b) return true;
	if (a === null && b !== null) return false;
	if (a !== null && b === null) return false; 
	
	if (a instanceof Date && b instanceof Date)
		return a.getTime() === b.getTime(); // handle date objects
	if (a instanceof RegExp && b instanceof RegExp) {
		const flags1 = a.flags,
			flags2 = b.flags;
		return compareRegexFlags
			? flags1 === flags2 && __replaceAfterSlash(a) === __replaceAfterSlash(b)
			: __replaceAfterSlash(a) === __replaceAfterSlash(b);
	}
	if (__isArray(a) && __isArray(b)) return arrayEquality(a, b);
	if (__isObject(a) && __isObject(b)) return objectEquality(a, b);
	const eq =
		!__isNullOrUndefined(epsilon) &&
		typeof a === 'number' &&
		typeof b === 'number'
			? comparator(Math.abs(a - b), epsilon) < 0
			: comparator(a, b) === 0;
	return eq;
}
/**
 * Deeply compares two objects.
 * @param obj1 An object.
 * @param obj2 Another object.
 * @param opts Options, as in {@link EqualityOptions}.
 * @returns Whether or not `a` and `b` are deeply equal.
 */
export function objectEquality<
	T extends Record<PropertyKey, unknown>,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_ = unknown
>(
	obj1: T,
	obj2: Record<PropertyKey, unknown>,
	opts: EqualityOptions = {}
): boolean {
	__checkObjectErrors(obj1, obj2);

	const keys1 = __keys(obj1);
	const keys2 = __keys(obj2);
	const values1 = __values(obj1);
	if (keys1.length !== keys2.length) return false;
	if (obj1 === obj2) return true;

	const stack: StackItem<T>[] = [{ obj1, obj2, index: 0 }];
	while (stack.length > 0) {
		const { obj2, index } = stack[stack.length - 1];
		if (index >= keys1.length) {
			stack.pop();
			continue;
		}

		const key = keys1[index];
		if (obj2[key] === undefined) return false;
		const val1 = values1[index];
		const val2 = obj2[key];
		if (typeof val1 !== typeof val2) return false;
		if (__isArray(val1) && __isArray(val2)) return arrayEquality(val1, val2);
		else if (__isObject(val1) && __isObject(val2))
			return objectEquality(val1, val2);
		else if (!__isNullOrUndefined(opts.epsilon))
			// @ts-expect-error val1 and val2 are unknown.
			return Math.abs(val1 - val2) < opts.epsilon;
		else if (val1 !== val2) return false;

		stack[stack.length - 1].index++;
	}

	return true;
}

function __keys(obj: Record<PropertyKey, unknown>) {
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
function __values(obj: Record<PropertyKey, unknown>) {
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
function __checkDeepErrors({ epsilon }: EqualityOptions) {
	__checkEpsilon(epsilon);
}
function __checkEpsilon(epsilon: number | undefined) {
	if (__isNullOrUndefined(epsilon)) return;
	if (typeof epsilon !== 'number')
		__throwType('opts.epsilon', epsilon, 'a number');
	if (epsilon < 0)
		throw new Error(
			`"opts.epsilon", if specified, must be positive or zero. Got "${epsilon}" of type "${typeof epsilon}".`
		);
}
