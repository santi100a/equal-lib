// eslint-disable-next-line @typescript-eslint/no-var-requires
const deepEquality = require('../cjs').deepEquality;

describe('deepEquality', () => {
	test('returns true for equal primitives', () => {
		expect(deepEquality(1, 1)).toBeTruthy();
		expect(deepEquality('hello', 'hello')).toBeTruthy();
		expect(deepEquality(true, true)).toBeTruthy();
	});

	test('returns false for different primitives', () => {
		expect(deepEquality(1, 2)).toBeFalsy();
		expect(deepEquality('hello', 'world')).toBeFalsy();
		expect(deepEquality(true, false)).toBeFalsy();
	});

	test('returns true for equal arrays', () => {
		expect(deepEquality([1, 2, 3], [1, 2, 3])).toBeTruthy();
		expect(deepEquality(['hello', true, 3], ['hello', true, 3])).toBeTruthy();
	});

	test('returns false for different arrays', () => {
		expect(deepEquality([1, 2, 3], [3, 2, 1])).toBeFalsy();
		expect(deepEquality(['hello', true, 3], [true, 3, 'hello'])).toBeFalsy();
	});

	test('returns true for equal objects', () => {
		expect(deepEquality({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy();
		expect(
			deepEquality({ name: 'John', age: 30 }, { name: 'John', age: 30 })
		).toBeTruthy();
	});

	test('returns false for different objects', () => {
		expect(deepEquality({ a: 1, b: 2 }, { a: 2, b: 1 })).toBeFalsy();
		expect(
			deepEquality({ name: 'John', age: 30 }, { name: 'Jane', age: 30 })
		).toBeFalsy();
	});
	test('returns false for primitives and objects', () => {
		expect(deepEquality(5, { foo: 'bar' })).toBeFalsy();
		expect(deepEquality('not an object', { foo: 'bar' })).toBeFalsy();
		expect(deepEquality(true, { foo: 'bar' })).toBeFalsy();
		expect(deepEquality(false, { foo: 'bar' })).toBeFalsy();
		expect(deepEquality(null, { foo: 'bar' })).toBeFalsy(); // special case
		expect(deepEquality(undefined, { foo: 'bar' })).toBeFalsy();
		expect(deepEquality(/=+/, { foo: 'bar' })).toBeFalsy();
		expect(deepEquality(Symbol('water'), { foo: 'bar' })).toBeFalsy();
		
	});
	test('returns false for primitives and arrays', () => {
		expect(deepEquality(5, ['foo', 'bar', 'baz'])).toBeFalsy();
	});
	test('it can equate regular expressions', () => {
		const re1 = /hello world/;
		const re2 = /hello world/g;
		expect(deepEquality(re1, re2)).toBeTruthy();
	});
	test('it can equate regular expressions keeping flags in mind', () => {
		const re1 = /hello world/gu;
		const re2 = /hello world/gu;
		const re3 = /hello world/;
		expect(deepEquality(re1, re2, { compareRegexFlags: true })).toBeTruthy();
		expect(deepEquality(re1, re3, { compareRegexFlags: true })).toBeFalsy();
	});
});
 
