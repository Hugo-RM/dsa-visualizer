import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BubbleSort from '../algorithms/sorting/BubbleSort.js'

function ArraySortingPage() {
  // Algorithm instances
  const [bubbleSortInstance, setBubbleSortInstance] = useState(null);
  
  // Array states for visualization
  const [bubbleArray, setBubbleArray] = useState([]);
  const [quickArray, setQuickArray] = useState([]);
  const [mergeArray, setMergeArray] = useState([]);
  const [selectionArray, setSelectionArray] = useState([]);
  
  // Control states
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  
  // Animation states
  const [animationData, setAnimationData] = useState({});

  // Initialize algorithm instances
  useEffect(() => {
    const initialArray = [64, 34, 25, 12, 22, 11, 90];
    
    // Create bubble sort instance
    const bubbleSort = new BubbleSort(initialArray);
    setBubbleSortInstance(bubbleSort);
    
    // Set initial arrays
    setBubbleArray([...initialArray]);
    setQuickArray([...initialArray]);
    setMergeArray([...initialArray]);
    setSelectionArray([...initialArray]);
  }, []);

  // Animation callback for bubble sort
  const handleBubbleSortStep = async (data) => {
    setBubbleArray([...data.array]);
    setAnimationData(data);
  };

  // Start bubble sort using the class
  const runBubbleSort = async () => {
    if (!bubbleSortInstance) return;
    
    setIsRunning(true);
    
    // Update the speed in the algorithm instance
    bubbleSortInstance.setAnimationSpeed(speed);
    
    try {
      await bubbleSortInstance.sort(handleBubbleSortStep);
    } catch (error) {
      console.error('Bubble sort error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  // Reset all arrays using the class
  const resetArrays = () => {
    if (bubbleSortInstance) {
      bubbleSortInstance.stop();
      bubbleSortInstance.reset();
      setBubbleArray([...bubbleSortInstance.array]);
    }
    
    setIsRunning(false);
    setAnimationData({});
  };

  // Generate new array and update all instances
  const generateNewArray = () => {
    const newArray = [];
    for (let i = 0; i < 8; i++) {
      newArray.push(Math.floor(Math.random() * 90) + 10);
    }
    
    // Update bubble sort instance
    if (bubbleSortInstance) {
      bubbleSortInstance.stop();
      const newBubbleSort = new BubbleSort(newArray);
      setBubbleSortInstance(newBubbleSort);
    }
    
    // Update all array displays
    setBubbleArray([...newArray]);
    setQuickArray([...newArray]);
    setMergeArray([...newArray]);
    setSelectionArray([...newArray]);
    
    setIsRunning(false);
    setAnimationData({});
  };

  // Get bar styling based on animation state
  const getBarStyle = (index, algorithm = 'bubble') => {
    let className = "text-white text-xs flex items-end justify-center transition-all duration-200";
    
    if (algorithm === 'bubble' && animationData) {
      if (animationData.comparing && animationData.comparing.includes(index)) {
        className += " bg-red-500"; // Comparing
      } else if (animationData.swapping && animationData.swapping.includes(index)) {
        className += " bg-yellow-500"; // Swapping
      } else if (animationData.sorted && animationData.sorted.includes(index)) {
        className += " bg-green-500"; // Sorted
      } else {
        className += " bg-blue-500"; // Default
      }
    } else {
      className += " bg-gray-400"; // Inactive algorithms
    }
    
    return className;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Arrays</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Sorting</span>
      </nav>

      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Array Sorting Algorithms</h2>
        <p className="text-gray-600 mt-2">
          Visualize how different sorting algorithms work step-by-step
        </p>
      </div>

      {/* Shared Controls */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={runBubbleSort}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isRunning ? 'Running...' : 'Start Bubble Sort'}
          </button>
          
          <button
            onClick={resetArrays}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          
          <button
            onClick={generateNewArray}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            New Array
          </button>
          
          <div className="flex items-center gap-2">
            <label htmlFor="speed" className="text-sm font-medium">Speed:</label>
            <input
              id="speed"
              type="range"
              min="10"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-gray-600">{speed}ms</span>
          </div>
        </div>
      </div>

      {/* Algorithm Statistics */}
      {bubbleSortInstance && animationData.comparisons !== undefined && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Current Statistics</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Comparisons:</span> {animationData.comparisons}
            </div>
            <div>
              <span className="font-medium">Swaps:</span> {animationData.swaps}
            </div>
            <div>
              <span className="font-medium">Current Step:</span> {animationData.step || 'Ready'}
            </div>
          </div>
        </div>
      )}

      {/* Algorithm Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bubble Sort */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Bubble Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n²) | Space: O(1)</p>
          
          {/* Array Visualization */}
          <div className="flex items-end justify-center space-x-1 h-40 mb-4">
            {bubbleArray.map((value, index) => (
              <div
                key={index}
                className={getBarStyle(index, 'bubble')}
                style={{
                  height: `${value * 1.5}px`,
                  width: '30px'
                }}
              >
                <span className="mb-1">{value}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-600">
            Current: [{bubbleArray.join(', ')}]
          </p>
        </div>

        {/* Quick Sort (Placeholder) */}
        <div className="bg-white rounded-lg shadow p-4 opacity-50">
          <h3 className="text-lg font-semibold mb-2">Quick Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n log n) | Space: O(log n)</p>
          
          <div className="flex items-end justify-center space-x-1 h-40 mb-4">
            {quickArray.map((value, index) => (
              <div
                key={index}
                className="bg-gray-400 text-white text-xs flex items-end justify-center"
                style={{
                  height: `${value * 1.5}px`,
                  width: '30px'
                }}
              >
                <span className="mb-1">{value}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-600">Coming Soon</p>
        </div>

        {/* Merge Sort (Placeholder) */}
        <div className="bg-white rounded-lg shadow p-4 opacity-50">
          <h3 className="text-lg font-semibold mb-2">Merge Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n log n) | Space: O(n)</p>
          
          <div className="flex items-end justify-center space-x-1 h-40 mb-4">
            {mergeArray.map((value, index) => (
              <div
                key={index}
                className="bg-gray-400 text-white text-xs flex items-end justify-center"
                style={{
                  height: `${value * 1.5}px`,
                  width: '30px'
                }}
              >
                <span className="mb-1">{value}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-600">Coming Soon</p>
        </div>

        {/* Selection Sort (Placeholder) */}
        <div className="bg-white rounded-lg shadow p-4 opacity-50">
          <h3 className="text-lg font-semibold mb-2">Selection Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n²) | Space: O(1)</p>
          
          <div className="flex items-end justify-center space-x-1 h-40 mb-4">
            {selectionArray.map((value, index) => (
              <div
                key={index}
                className="bg-gray-400 text-white text-xs flex items-end justify-center"
                style={{
                  height: `${value * 1.5}px`,
                  width: '30px'
                }}
              >
                <span className="mb-1">{value}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-600">Coming Soon</p>
        </div>

      </div>
    </div>
  )
}

export default ArraySortingPage