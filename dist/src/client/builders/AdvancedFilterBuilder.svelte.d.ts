import type { Field, Check } from '..';
import type FilterHandler from '../handlers/FilterHandler.svelte';
export default class AdvancedFilterBuilder<Row> {
    criteria: unknown[];
    private id;
    private filterHandler;
    private collection;
    private field;
    private check;
    private isRecursive;
    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check);
    set(value: unknown, check?: Check): void;
    isNotRecursive(): this;
    clear(): void;
    private cleanup;
}
