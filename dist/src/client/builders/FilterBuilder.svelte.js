import { check as comparator } from '../core';
export default class FilterBuilder {
    value = $state('');
    id = Math.random().toString(36).substring(2, 15);
    filterHandler;
    field;
    check;
    isRecursive = true;
    constructor(filterHandler, field, check) {
        this.filterHandler = filterHandler;
        this.field = field;
        this.check = check ?? comparator.isLike;
        this.cleanup();
    }
    set(check) {
        this.filterHandler.set(this.value, this.field, check ?? this.check, this.id, this.isRecursive);
    }
    init(value) {
        this.value = value;
        this.set();
        return this;
    }
    isNotRecursive() {
        this.isRecursive = false;
        return this;
    }
    clear() {
        this.value = '';
        this.filterHandler.unset(this.id);
    }
    cleanup() {
        this.filterHandler['table'].on('clearFilters', () => this.clear());
    }
}
