import type { Field, Check, TableHandler } from '..';
export default class FilterHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(value: unknown, field: Field<Row>, check: Check, id: string, isRecursive?: boolean): void;
    unset(id: string): void;
}
