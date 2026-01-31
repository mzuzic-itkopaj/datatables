import { type Search, type Filter, type Query } from './';
export declare const data: {
    search: <Row>(allRows: $state.Snapshot<Row[]>, { scope, isRecursive, value, check }: Search<Row>, highlight?: boolean) => $state.Snapshot<Row>[];
    filter: <Row>(allRows: $state.Snapshot<Row[]>, { callback, isRecursive, value, check, key }: Filter<Row>, highlight?: boolean) => $state.Snapshot<Row>[];
    query: <Row>(allRows: $state.Snapshot<Row[]>, { path, value, check }: Query<Row>) => $state.Snapshot<Row>[];
};
export declare const sort: {
    asc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => number;
    desc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => number;
};
