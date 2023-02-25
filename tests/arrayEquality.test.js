const arrayEquality = require('../cjs').arrayEquality;

test('it should be a function', () => {
    expect(typeof arrayEquality)
        .toBe('function');
});
test('it should return false in case an array is longer', () => {
    expect(arrayEquality([], ['longer']))
        .toBe(false);
});
test('it should return false in case the arrays don\'t share items', () => {
    expect(arrayEquality([1, 2, 3], [4, 5, 6]))
        .toBe(false);
});
test('it should return false in case the arrays have at least one item different', () => {
    expect(arrayEquality([1, 2, 3], [1, 2, 4]))
        .toBe(false);
});
test('it should return true in case both arrays are empty', () => {
    expect(arrayEquality([], []))
        .toBe(true);
});
test('it should return true in case the arrays are exactly equal', () => {
    expect(arrayEquality([1, 2, 3], [1, 2, 3]))
        .toBe(true);
});
test('it should be able to compare nested arrays', () => {
    expect(arrayEquality([[5, 8, 3], [5, 8, 3]], [[5, 8, 3], [5, 8, 3]]))
        .toBe(true);
    expect(arrayEquality([[5, 8, 3], [5, 8, 4]], [[5, 8, 4], [5, 8, 3]]))
        .toBe(false);
});
test('it should be able to compare arrays of objects', () => {
    expect(arrayEquality([{ hello: 'world' }, { foo: 'bar' }], [{ hello: 'world' }, { foo: 'bar' }]))
        .toBe(true);
    expect(arrayEquality([{ bar: 'foo' }, { foo: 'bar' }], [{ hello: 'world' }, { foo: 'bar' }]))
        .toBe(false);
});