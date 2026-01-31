export default class FetchHandler {
    table;
    reload;
    timeout;
    constructor(table) {
        this.table = table;
    }
    set(callback) {
        this.reload = callback;
    }
    async invalidate() {
        if (!this.reload)
            return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.trigger(), this.table.debounce);
    }
    async trigger() {
        this.table.isLoading = true;
        const state = this.table.getState();
        const data = await this.reload(state);
        this.table.isLoading = false;
        if (data) {
            this.table.rows = data;
        }
    }
}
