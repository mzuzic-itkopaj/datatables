import { isNotNull } from '../core';
export default class QueryHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(path, value, check, id) {
        this.table.setPage(1);
        this.table.queries = this.table.queries.filter(query => query.id !== id);
        this.table.queries.push({ path, value, check, id });
    }
    unset(id) {
        this.table.setPage(1);
        this.table.queries = this.table.queries.filter(query => query.id !== id);
    }
}
