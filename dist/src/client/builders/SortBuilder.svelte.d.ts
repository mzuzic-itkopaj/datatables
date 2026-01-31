import type { Field, SortParams } from '..';
import type SortHandler from '../handlers/SortHandler.svelte';
import type { SortInterface } from '../../shared';
export default class SortBuilder<Row> implements SortInterface {
    direction: "desc" | "asc";
    isActive: boolean;
    private id;
    private sortHandler;
    private field;
    private params;
    constructor(sortHandler: SortHandler<Row>, field: Field<Row>, params: SortParams);
    set(): void;
    init(direction?: 'asc' | 'desc'): this;
    asc(): void;
    desc(): void;
    clear(): void;
    private createIsActive;
    private createDirection;
}
