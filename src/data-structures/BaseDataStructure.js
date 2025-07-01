// Abstract Class
class BaseDataStructure {
    constructor() {
        this.data = null;
        this.isAnimating = false;
        this.animationSpeed = 300;
    }
    
    validate(data) { throw new Error("Must implement validate()"); }
    visualize() { throw new Error("Must implement visualize()"); }
    reset() { throw new Error("Must implement reset()"); }
}

export default BaseDataStructure