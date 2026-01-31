import { match, check, isNotNull } from '../core';
export default class RecordFilterBuilder {
    value = $state('');
    records = $derived(this.createRecords());
    rawRecords = $state.raw([]);
    filter = $state('');
    constructor(records) {
        this.rawRecords = records;
    }
    set() {
        this.filter = this.value;
    }
    createRecords() {
        if (isNotNull(this.filter)) {
            return this.rawRecords.filter(record => match(record, this.filter, { check: check.isLike }));
        }
        return this.rawRecords;
    }
}
