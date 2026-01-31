import type { TableHandlerInterface } from '..';
export default class HighlightBuilder<Row> {
    selector: string;
    private table;
    private interval;
    private keywords;
    constructor(table: TableHandlerInterface<Row>, selector?: string);
    private createHighlight;
    private createKeywords;
    private emphasize;
}
