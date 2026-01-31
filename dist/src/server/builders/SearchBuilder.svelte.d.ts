import type TableHandler from '../TableHandler.svelte';
import type { SearchInterface } from '../../shared';
export default class SearchBuilder<Row> implements SearchInterface {
    value: string;
    private timeout;
    private table;
    constructor(table: TableHandler<Row>);
    set(): void;
    init(value?: string): this;
    clear(): void;
    private cleanup;
}
