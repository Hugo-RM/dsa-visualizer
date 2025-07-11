import BaseDataStructure from "../BaseDataStructure";

class ArrayDS extends BaseDataStructure {
    constructor(initArray = []) {
        super();
        this.array = [...initArray];
        this.ogArray = [...initArray];
        this.accessCount = 0;
        this.comparisons = 0;
        this.swaps = 0;
    }
    validate(array) {
        if (!Array.isArray(array)) {
            throw new Error("Input must be an array");
        }
        if (array.length < 2) {
            throw new Error("Array must have at least 2 elements");
        }
        if (array.length > 50) {
            throw new Error("Array is too large, Max is 50");
        }
        return true;
    }
    reset() {
        this.array = [...this.ogArray];
        this.accessCount = 0;
        this.comparisons = 0;
        this.swaps = 0;
        this.shouldStop = true;
        this.isAnimating = false;
    }
    resetStats() {
        this.accessCount = 0;
        this.comparisons = 0;
        this.swaps = 0;
    }
    swap(i, j) {
        if (i >= 0 && i < this.array.length && j >= 0 && j < this.array.length) {
            const valueI = this.access(i);
            const valueJ = this.access(j);
            
            this.array[i] = valueJ;
            this.array[j] = valueI;
            
            this.swaps++;
            return true;
        }
        return false;
    }
    compare(i, j) {
        this.comparisons++;
        if (i >= 0 && i < this.array.length && j >= 0 && j < this.array.length) {
            return this.access(i) < this.access(j);
        }
        return false;
    }
    access(i) {
        this.accessCount++;
        if (i >= 0 && i < this.array.length) {
            return this.array[i];
        }
        return null;
    }
    getState() {
        return {
            array : [...this.array],
            isAnimating : this.isAnimating,
            accessCount : this.accessCount,
            comparisons : this.comparisons,
            swaps : this.swaps
        };
    }
    getStats() {
        return {
            accessCount : this.accessCount,
            comparisons : this.comparisons,
            arraySize : this.array.length,
            swaps : this.swaps
        };
    }
}

export default ArrayDS