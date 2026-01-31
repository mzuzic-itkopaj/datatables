import type { Check, TableHandler } from '..';
export default class QueryHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(path: string[], value: unknown, check: Check, id: string): void;
    unset(id: string): void;
}
