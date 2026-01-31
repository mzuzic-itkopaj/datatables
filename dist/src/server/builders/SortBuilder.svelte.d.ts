import type SortHandler from '../handlers/SortHandler.svelte';
import type { SortInterface } from '../../shared';
export default class SortBuilder<Row> implements SortInterface {
    private sortHandler;
    private field;
    isActive: boolean;
    direction: "desc" | "asc";
    constructor(sortHandler: SortHandler<Row>, field: keyof Row);
    set(): void;
    init(direction?: 'asc' | 'desc'): this;
    asc(): void;
    desc(): void;
    private createIsActive;
    private createDirection;
}
