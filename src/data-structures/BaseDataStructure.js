// Abstract Class
class BaseDataStructure {
    constructor() {
        this.data = null;
        this.isAnimating = false;
        this.animationSpeed = 300;
        this.shouldStop = false;
    }
    
    validate(data) { throw new Error("Must implement validate()"); }
    visualize() { throw new Error("Must implement visualize()"); }
    reset() { throw new Error("Must implement reset()"); }

    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }

    stop() {
        this.shouldStop = true;
        this.isAnimating = false;
    }

    async delay(ms = this.animationSpeed) {
        if (this.shouldStop) return;
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

export default BaseDataStructure