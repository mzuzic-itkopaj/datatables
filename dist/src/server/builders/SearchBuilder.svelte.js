export default class SearchBuilder {
    value = $state('');
    timeout = undefined;
    table;
    constructor(table) {
        this.table = table;
        this.cleanup();
    }
    set() {
        this.table['search'] = this.value;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.table.setPage(1);
        }, 400);
    }
    init(value) {
        if (!value)
            return this;
        this.value = value;
        this.table['search'] = value;
        return this;
    }
    clear() {
        this.value = '';
        this.table['search'] = '';
        // this.table.invalidate()
        this.table.setPage(1);
    }
    cleanup() {
        this.table.on('clearSearch', () => this.clear());
    }
}
