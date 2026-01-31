import type { Field, TableHandler, SortParams } from '..';
export default class SortHandler<Row> {
    private backup;
    private table;
    constructor(table: TableHandler<Row>);
    set(field: Field<Row>, id: string, params?: SortParams): void;
    asc(field: Field<Row>, id: string, { locales, options }?: SortParams): void;
    desc(field: Field<Row>, id: string, { locales, options }?: SortParams): void;
    clear(): void;
    restore(): void;
    private save;
}
