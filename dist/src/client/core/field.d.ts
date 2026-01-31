import type { Field } from '..';
export declare const parse: <Row>(field: Field<Row>, id?: string) => {
    callback: (row: $state.Snapshot<Row>) => $state.Snapshot<Row>[keyof $state.Snapshot<Row>];
    id: string;
    key: keyof Row & string;
} | {
    callback: (row: $state.Snapshot<Row>) => unknown;
    id: string;
    key: any;
};
