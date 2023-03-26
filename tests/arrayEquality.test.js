const arrayEquality = require('../cjs').arrayEquality;
jest.setTimeout(3_000);
describe('arrayEquality logic tests', () => {
	test('it should be a function', () => {
		expect(arrayEquality).toBeInstanceOf(Function);
	});
	test('it should return false in case an array is longer', () => {
		expect(arrayEquality([], ['longer'])).toBeFalsy();
	});
	test("it should return false in case the arrays don't share items", () => {
		expect(arrayEquality([1, 2, 3], [4, 5, 6])).toBeFalsy();
	});
	test('it should return false in case the arrays have at least one item different', () => {
		expect(arrayEquality([1, 2, 3], [1, 2, 4])).toBeFalsy();
	});
	test('it should return true in case both arrays are empty', () => {
		expect(arrayEquality([], [])).toBeTruthy();
	});
	test('it should return true in case the arrays are exactly equal', () => {
		expect(arrayEquality([1, 2, 3], [1, 2, 3])).toBeTruthy();
	});
	test('it should be able to compare nested arrays', () => {
		expect(
			arrayEquality(
				[
					[5, 8, 3],
					[5, 8, 3]
				],
				[
					[5, 8, 3],
					[5, 8, 3]
				]
			)
		).toBeTruthy();
		expect(
			arrayEquality(
				[
					[5, 8, 3],
					[5, 8, 4]
				],
				[
					[5, 8, 4],
					[5, 8, 3]
				]
			)
		).toBeFalsy();
	});
	test('it should be able to compare arrays of objects', () => {
		expect(
			arrayEquality(
				[{ hello: 'world' }, { foo: 'bar' }],
				[{ hello: 'world' }, { foo: 'bar' }]
			)
		).toBeTruthy();
		expect(
			arrayEquality(
				[{ bar: 'foo' }, { foo: 'bar' }],
				[{ hello: 'world' }, { foo: 'bar' }]
			)
		).toBeFalsy();
		expect(
			arrayEquality(
				[5, 8, 3, [4, 6, 1, [2, 5, 7, { a: 6, b: 7 }, 5]]],
				[5, 8, 3, [4, 6, 1, [2, 5, 7, { a: 6, b: 7 }, 5]]]
			)
		).toBeTruthy();
	});
});
describe('error handling', () => {
	test("it should throw an error if either parameter (or both of them) isn't an object", () => {
		expect(() => arrayEquality(8, 5)).toThrow(TypeError);
		expect(() => arrayEquality(8, {})).toThrow(TypeError);
		expect(() => arrayEquality({}, 5)).toThrow(TypeError);
	});
	
});