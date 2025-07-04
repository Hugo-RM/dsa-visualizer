import ArrayDS from "../../ArrayDS";

class BubbleSort extends ArrayDS {
    constructor(initArray) {
        super(initArray);
        this.algoName = "Bubble Sort";
        this.timeComplexity = "O(n²)";
        this.spaceComplexity = "O(1)";
        this.currentI = 0;
        this.currentJ = 0;
        this.isStable = true;
    }

    reset() {
        super.reset();
        this.currentI = 0;
        this.currentJ = 0;
    }

    async sort(pnStepCallback) {
        this.isAnimating = true;
        this.shouldStop = false;

        try {
            for (let i = 0; i < this.array.length && !this.shouldStop; i++) {
                this.currentI = i;
                
                for (let j = 0; j < this.array.length - i - 1 && !this.shouldStop; j++) {
                    this.currentJ = j;

                    await this.animateStep(pnStepCallback, {
                        comparing : [j, j + 1],
                        currentPass : i,
                        step : `Pass ${i + 1}: Comparing ${this.array[j]} and ${this.array[j + 1]}`
                    });

                    if (this.compare(j, j + 1) > 0) {
                        this.swap(j, j + 1);
                        
                        await this.animateStep(pnStepCallback, {
                        comparing : [j, j + 1],
                        currentPass : i,
                        step : `Pass ${i + 1}: Swapped ${this.array[j]} and ${this.array[j + 1]}`
                        });
                    }
                    await this.delay();
                }
                
                await this.animateStep(pnStepCallback, {
                    sorted: [this.array.length - i - 1],
                    currentPass: i,
                    step: `Pass ${i + 1}: Position ${this.array.length - i - 1} is sorted`
                });
            }

            if (!this.shouldStop) {
                await this.animateStep(pnStepCallback, {
                    sorted : Array.from({ length : this.array.length }, (_, i) => i),
                    step : "Sorting Complete!"
                });
            }
        } catch (error) {
            console.error("Bubble Sort Error: ", error);
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
            description : "Repeatedly steps through array checking if current is greater than the next, if so swap, else continue",
            isStable : this.isStable,
            name : this.algoName
        }
    }
}

export default BubbleSort