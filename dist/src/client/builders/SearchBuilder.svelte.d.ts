import { type Field } from '..';
import type SearchHandler from '../handlers/SearchHandler.svelte';
import type { SearchInterface } from '../../shared';
export default class SearchBuilder<Row> implements SearchInterface {
    value: string;
    private scope;
    private searchHandler;
    constructor(searchHandler: SearchHandler<Row>, scope?: Field<Row>[]);
    set(): void;
    init(value?: string): this;
    recursive(): void;
    regex(): void;
    clear(): void;
    private cleanup;
}
