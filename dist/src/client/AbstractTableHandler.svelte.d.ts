import type { Field, TableParams } from './';
import { EventDispatcher } from '../shared';
import { type Search, type Filter, type Query, type Sort } from './core';
export default abstract class AbstractTableHandler<Row> {
    protected selectBy?: Field<Row>;
    protected selectScope: "all" | "currentPage";
    protected highlight: boolean;
    protected event: EventDispatcher;
    protected rawRows: Row[];
    protected search: Search<Row>;
    protected sort: Sort<Row>;
    filters: Filter<Row>[];
    queries: Query<Row>[];
    rowsPerPage: number;
    currentPage: number;
    element: HTMLElement;
    clientWidth: number;
    filterCount: number;
    allRows: readonly $state.Snapshot<Row>[];
    rows: readonly $state.Snapshot<Row>[];
    rowCount: {
        total: number;
        start: number;
        end: number;
        selected: number;
    };
    pages: readonly number[];
    pageCount: number;
    pagesWithEllipsis: readonly number[];
    selected: unknown[];
    isAllSelected: boolean;
    constructor(data: Row[], params: TableParams<Row>);
    private createAllRows;
    private createRows;
    private createRowCount;
    private createPages;
    private createPagesWithEllipsis;
    private createIsAllSelected;
}
