import { check as comparator } from '../core';
export default class AdvancedFilterBuilder {
    criteria = $state([]);
    id = Math.random().toString(36).substring(2, 15);
    filterHandler;
    collection;
    field;
    check;
    isRecursive = true;
    constructor(filterHandler, field, check) {
        this.filterHandler = filterHandler;
        this.field = field;
        this.collection = [];
        this.check = check ?? comparator.isEqualTo;
        this.cleanup();
    }
    set(value, check) {
        if (this.collection.find(criterion => criterion.value === value)) {
            this.collection = this.collection.filter(criterion => criterion.value !== value);
        }
        else {
            this.collection = [{ value, check: check ?? this.check }, ...this.collection];
        }
        if (this.collection.length === 0) {
            return this.clear();
        }
        this.filterHandler.set(this.collection, this.field, comparator.whereIn, this.id, this.isRecursive);
        this.criteria = this.collection.map(criterion => criterion.value);
    }
    isNotRecursive() {
        this.isRecursive = false;
        return this;
    }
    clear() {
        this.collection = [];
        this.criteria = [];
        this.filterHandler.unset(this.id);
    }
    cleanup() {
        this.filterHandler['table'].on('clearFilters', () => this.clear());
    }
}
