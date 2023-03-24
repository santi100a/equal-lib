interface EqualityOptions {
    epsilon?: number;
}
export declare function deepEquality(a: any, b: any, opts?: EqualityOptions): boolean;
export declare function arrayEquality<T = unknown>(a: T[], b: T[], opts?: EqualityOptions): boolean;
export declare function objectEquality<T extends Record<any, any>, _ = unknown>(obj1: T, obj2: Record<any, any>, opts?: EqualityOptions): boolean;
export {};
