import ArrayDS from "../../ArrayDS";

class SelectionSort extends ArrayDS {
    constructor(initArray) {
        super(initArray);
        this.algoName = "Selection Sort";
        this.timeComplexity = "O(n²)";
        this.spaceComplexity = "O(1)";
        this.currentI = 0;
        this.currentJ = 0;
        this.isStable = false;
    }
    reset() {
        super.reset();
        this.currentI = 0;
        this.currentJ = 0;
    }
    resetStats() {
        super.resetStats();
        this.currentI = 0;
        this.currentJ = 0;
    }

    async sort(pnStepCallback) {
        this.isAnimating = true;
        this.shouldStop = false;

        try {
            for (let i = 0; i < this.array.length && !this.shouldStop; i++) {
                this.currentI = i;
                let minIndex = i;
                
                for (let j = i + 1; j < this.array.length && !this.shouldStop; j++) {
                    this.currentJ = j;

                    await this.animateStep(pnStepCallback, {
                        comparing : [minIndex, j],
                        currentPass : i,
                        step : `Pass ${i + 1}: Comparing ${this.array[minIndex]} and ${this.array[j]}`
                    });

                    if (!this.compare(minIndex, j)) {
                        minIndex = j;
                    }
                    await this.delay();
                }
                if (i != minIndex) {
                    this.swap(i, minIndex);
                    
                    await this.animateStep(pnStepCallback, {
                    swapping : [i, minIndex],
                    currentPass : i,
                    step : `Pass ${i + 1}: Swapped ${this.array[i]} and ${this.array[minIndex]}`
                    });

                    await this.animateStep(pnStepCallback, {
                        sorted: [i],
                        currentPass: i,
                        step: `Pass ${i + 1}: Position ${i + 1} is sorted`
                    });
                }
            }

            if (!this.shouldStop) {
                await this.animateStep(pnStepCallback, {
                    sorted : Array.from({ length : this.array.length }, (_, i) => i),
                    step : "Sorting Complete!"
                });
            }
        } catch (error) {
            console.error("Selection Sort Error: ", error);
        } finally {
            this.isAnimating = false;
        }

        return this.getState();
    }


    async animateStep(callback, animationData) {
        if (this.shouldStop) return;

        const state = this.getState();
        const fullAnimationData = {
            ...state,
            ...animationData,
            algoName : this.algoName
        };

        if (callback) {
            await callback(fullAnimationData);
        }
    }
    getAlgoInfo() {
        return {
            timeComplexity : this.timeComplexity, 
            spaceComplexity : this.spaceComplexity,
            description : "Assumes current pass start index is min and finds the index of the min element after that. Will swap min with start.",
            isStable : this.isStable,
            name : this.algoName
        }
    }
}

export default SelectionSort