import type { Criterion, Check } from '..';
type Params = {
    isRecursive?: boolean;
    check?: Check;
    highlight?: boolean;
};
export declare const match: (entry: unknown, value: unknown | Criterion[], params: Params) => boolean;
export declare const sift: (entry: unknown, value: unknown, params: Params) => unknown;
export declare const deepEmphasize: <Row>(entry: Row, value: string, callback: (entry: Row) => unknown) => Row;
export {};
