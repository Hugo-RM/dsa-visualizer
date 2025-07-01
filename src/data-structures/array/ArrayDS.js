import BaseDataStructure from "../BaseDataStructure";

class ArrayDS extends BaseDataStructure {
    constructor(initialArray = []) {
        super();
        this.array = [...initialArray];
        this.comparisons = 0;
        this.swaps = 0;
    }
    validate(array) {
        // Array specific validation
    }
    swap(i, j) {
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    }
    compare(i, j) {
        // comparison handling
    }
}