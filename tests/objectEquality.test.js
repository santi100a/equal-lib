const objectEquality = require('../cjs').objectEquality;

describe('objectEquality', () => {
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
    // ---------------------------------------------------------------------------------

    test('it should throw an error if either parameter (or both of them) isn\'t an object', () => {
        expect(() => objectEquality(8, 5))
            .toThrow(TypeError);
        expect(() => objectEquality(8, {}))
            .toThrow(TypeError);
        expect(() => objectEquality({}, 5))
            .toThrow(TypeError);
    });
    test('it should throw an error for circular objects', () => {
        const circular = {};
        circular.property = circular;
        expect(() => objectEquality(circular, {}))
            .toThrow(Error);
    });
});