const objectEquality = require('../index.js').objectEquality;

test('it should be a function', () => {
    expect(typeof objectEquality)
        .toBe('function');
});
test('it should return true if both objects are empty', () => {
    expect(objectEquality({}, {}))
        .toBe(true);
});
test('it should return true in case both objects are exactly equal', () => {
    expect(objectEquality({ a: true }, { a: true }))
        .toBe(true);
});

// -------------------------------------------------------------------------

test('it should return false in case an object has more keys', () => {
    expect(objectEquality({}, { a: true }))
        .toBe(false);
});
test('it should return false in case the objects don\'t share keys', () => {
    expect(objectEquality({ a: true }, { b: true }))
        .toBe(false);
});
test('it should return false in case the objects don\'t share values', () => {
    expect(objectEquality({ a: true }, { a: false }))
        .toBe(false);
});