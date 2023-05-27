// eslint-disable-next-line @typescript-eslint/no-var-requires
const objectEquality = require('../cjs').objectEquality;

describe('objectEquality', () => {
	test('it should be a function', () => {
		expect(objectEquality).toBeInstanceOf(Function);
	});
	test('it should return true if both objects are empty', () => {
		expect(objectEquality({}, {})).toBeTruthy();
	});
	test('it should return true in case both objects are exactly equal', () => {
		expect(objectEquality({ a: true }, { a: true })).toBeTruthy();
	});

	// -------------------------------------------------------------------------

	test('it should return false in case an object has more keys', () => {
		expect(objectEquality({}, { a: true })).toBeFalsy();
	});
	test("it should return false in case the objects don't share keys", () => {
		expect(objectEquality({ a: true }, { b: true })).toBeFalsy();
	});
	test("it should return false in case the objects don't share values", () => {
		expect(objectEquality({ a: true }, { a: false })).toBeFalsy();
	});
	// ---------------------------------------------------------------------------------

	test("it should throw an error if either parameter (or both of them) isn't an object", () => {
		expect(() => objectEquality(8, 5)).toThrow(TypeError);
		expect(() => objectEquality(8, {})).toThrow(TypeError);
		expect(() => objectEquality({}, 5)).toThrow(TypeError);
	});
	test('it should throw an error for circular objects', () => {
		const circular = {};
		circular.property = circular;
		expect(() => objectEquality(circular, {})).toThrow(Error);
	});
	test('it should return true in case of nested objects equality', () => {
		expect(
			objectEquality(
				{ a: 1, b: { c: true, d: 3 } },
				{ a: 1, b: { c: true, d: 3 } }
			)
		).toBeTruthy();
	});

	test('it should return false in case of nested objects inequality', () => {
		expect(
			objectEquality(
				{ a: 1, b: { c: true, d: 3 } },
				{ a: 1, b: { c: true, d: 4 } }
			)
		).toBeFalsy();
	});

	test('it should return true when comparing arrays with the same elements', () => {
		expect(
			objectEquality({ a: [1, 2, 3], b: 'test' }, { a: [1, 2, 3], b: 'test' })
		).toBeTruthy();
	});

	test('it should return false when comparing arrays with different elements', () => {
		expect(
			objectEquality({ a: [1, 2, 3], b: 'test' }, { a: [1, 2, 4], b: 'test' })
		).toBeFalsy();
	});

	test('it should return true when comparing objects with floating point numbers within epsilon', () => {
		expect(objectEquality({ a: 1.0001 }, { a: 1.0002 }, { epsilon: 2 / 10_000 })).toBeTruthy();

		expect(
			objectEquality({ a: 1.0001 }, { a: 1.0003 }, { epsilon: 0.0002 })
		).toBeTruthy();
	});

	test('it should return false when comparing objects with floating point numbers beyond epsilon', () => {
		expect(objectEquality({ a: 1.0001 }, { a: 1.0003 })).toBeFalsy();
	});
});