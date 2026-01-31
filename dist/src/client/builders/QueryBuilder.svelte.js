export default class QueryBuilder {
    value = $state('');
    id = Math.random().toString(36).substring(2, 15);
    queryHandler;
    path = [];
    check;
    constructor(queryHandler) {
        this.queryHandler = queryHandler;
        this.cleanup();
    }
    from(path) {
        this.path = path;
        return this;
    }
    where(filter) {
        this.check = filter;
        return this;
    }
    set(value) {
        if (value)
            this.value = value;
        this.queryHandler.set(this.path, this.value, this.check, this.id);
    }
    clear() {
        this.value = '';
        this.queryHandler.unset(this.id);
    }
    cleanup() {
        this.queryHandler['table'].on('clearFilters', () => this.clear());
    }
}
