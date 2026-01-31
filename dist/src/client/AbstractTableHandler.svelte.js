import { EventDispatcher } from '../shared';
import { data, parse } from './core';
export default class AbstractTableHandler {
    selectBy;
    selectScope = $state('currentPage');
    highlight;
    event = new EventDispatcher();
    rawRows = $state.raw([]);
    search = $state({ value: null });
    sort = $state({});
    filters = $state([]);
    queries = $state([]);
    rowsPerPage = $state(10);
    currentPage = $state(1);
    element = $state(undefined);
    clientWidth = $state(1000);
    filterCount = $derived(this.filters.length);
    allRows = $derived(this.createAllRows());
    rows = $derived(this.createRows());
    rowCount = $derived(this.createRowCount());
    pages = $derived(this.createPages());
    pageCount = $derived(this.pages.length);
    pagesWithEllipsis = $derived(this.createPagesWithEllipsis());
    selected = $state([]);
    isAllSelected = $derived(this.createIsAllSelected());
    constructor(data, params) {
        this.rawRows = data;
        this.rowsPerPage = params.rowsPerPage ?? null;
        this.highlight = params.highlight ?? false;
        this.selectBy = params.selectBy;
    }
    createAllRows() {
        let allRows = $state.snapshot(this.rawRows);
        if (this.search.value) {
            allRows = data.search(allRows, this.search, this.highlight);
            this.event.dispatch('change');
        }
        else if (this.filters.length > 0) {
            for (const filter of this.filters) {
                allRows = data.filter(allRows, filter, this.highlight);
            }
            this.event.dispatch('change');
        }
        else if (this.queries.length > 0) {
            for (const query of this.queries) {
                allRows = data.query(allRows, query);
            }
            this.event.dispatch('change');
        }
        return allRows;
    }
    createRows() {
        if (!this.rowsPerPage)
            return this.allRows;
        return this.allRows.slice((this.currentPage - 1) * this.rowsPerPage, this.currentPage * this.rowsPerPage);
    }
    createRowCount() {
        const total = this.allRows.length;
        if (!this.rowsPerPage) {
            return { total: total, start: 1, end: total, selected: this.selected.length };
        }
        return {
            total: total,
            start: this.currentPage * this.rowsPerPage - this.rowsPerPage + 1,
            end: Math.min(this.currentPage * this.rowsPerPage, total),
            selected: this.selected.length
        };
    }
    createPages() {
        if (!this.rowsPerPage) {
            return [1];
        }
        const pages = Array.from(Array(Math.ceil(this.allRows.length / this.rowsPerPage)));
        return pages.map((_, i) => i + 1);
    }
    createPagesWithEllipsis() {
        if (this.pageCount <= 7) {
            return this.pages;
        }
        const ellipse = null;
        const firstPage = 1;
        const lastPage = this.pageCount;
        if (this.currentPage <= 4) {
            return [
                ...this.pages.slice(0, 5),
                ellipse,
                lastPage
            ];
        }
        else if (this.currentPage < lastPage - 3) {
            return [
                firstPage,
                ellipse,
                ...this.pages.slice(this.currentPage - 2, this.currentPage + 1),
                ellipse,
                lastPage
            ];
        }
        else {
            return [
                firstPage,
                ellipse,
                ...this.pages.slice(lastPage - 5, lastPage)
            ];
        }
    }
    createIsAllSelected() {
        if (this.rowCount.total === 0 || !this.selectBy) {
            return false;
        }
        const { callback } = parse(this.selectBy);
        if (this.selectScope === 'all') {
            const identifiers = this.allRows.map(callback);
            return identifiers.every(id => this.selected.includes(id));
        }
        const identifiers = this.rows.map(callback);
        return identifiers.every(id => this.selected.includes(id));
    }
}
