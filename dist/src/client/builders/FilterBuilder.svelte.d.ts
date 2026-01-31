import type { Field, Check } from '..';
import type FilterHandler from '../handlers/FilterHandler.svelte';
import type { FilterInterface } from '../../shared';
export default class FilterBuilder<Row> implements FilterInterface {
    value: unknown;
    private id;
    private filterHandler;
    private field;
    private check;
    private isRecursive;
    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check);
    set(check?: Check): void;
    init(value?: unknown): this;
    isNotRecursive(): this;
    clear(): void;
    private cleanup;
}
