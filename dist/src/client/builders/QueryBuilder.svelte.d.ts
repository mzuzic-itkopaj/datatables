import type QueryHandler from '../handlers/QueryHandler.svelte';
export default class QueryBuilder<Row> {
    value: unknown;
    private id;
    private queryHandler;
    private path;
    private check;
    constructor(queryHandler: QueryHandler<Row>);
    from(path: string[]): this;
    where(filter: (row: any, value?: unknown) => boolean): this;
    set(value?: unknown): void;
    clear(): void;
    private cleanup;
}
