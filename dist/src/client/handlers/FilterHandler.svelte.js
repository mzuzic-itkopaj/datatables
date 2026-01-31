import { isNotNull, parse } from '../core';
export default class FilterHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(value, field, check = null, id, isRecursive = true) {
        this.table.setPage(1);
        const { callback, key } = parse(field, id);
        const filter = { value, id, callback, check, key, isRecursive };
        this.table.filters = this.table.filters.filter(filter => filter.id !== id);
        if (isNotNull(value)) {
            this.table.filters.push(filter);
        }
    }
    unset(id) {
        this.table.setPage(1);
        this.table.filters = this.table.filters.filter(filter => filter.id !== id);
    }
}
