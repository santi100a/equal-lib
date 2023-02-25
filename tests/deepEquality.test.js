const deepEquality = require('../cjs').deepEquality;

describe('deepEquality', () => {
  test('returns true for equal primitives', () => {
    expect(deepEquality(1, 1)).toBe(true);
    expect(deepEquality('hello', 'hello')).toBe(true);
    expect(deepEquality(true, true)).toBe(true);
  });

  test('returns false for different primitives', () => {
    expect(deepEquality(1, 2)).toBe(false);
    expect(deepEquality('hello', 'world')).toBe(false);
    expect(deepEquality(true, false)).toBe(false);
  });

  test('returns true for equal arrays', () => {
    expect(deepEquality([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEquality(['hello', true, 3], ['hello', true, 3])).toBe(true);
  });

  test('returns false for different arrays', () => {
    expect(deepEquality([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(deepEquality(['hello', true, 3], [true, 3, 'hello'])).toBe(false);
  });

  test('returns true for equal objects', () => {
    expect(deepEquality({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(deepEquality({ name: 'John', age: 30 }, { name: 'John', age: 30 })).toBe(true);
  });

  test('returns false for different objects', () => {
    expect(deepEquality({ a: 1, b: 2 }, { a: 2, b: 1 })).toBe(false);
    expect(deepEquality({ name: 'John', age: 30 }, { name: 'Jane', age: 30 })).toBe(false);
  });
});
