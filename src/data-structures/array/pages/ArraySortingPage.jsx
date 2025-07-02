import { useState } from 'react'
import { Link } from 'react-router-dom'

function ArraySortingPage() {
    // Master array that all algorithms start with
  const [masterArray, setMasterArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  
  // Individual array states for each algorithm
  const [bubbleArray, setBubbleArray] = useState([...masterArray]);
  const [quickArray, setQuickArray] = useState([...masterArray]);
  const [mergeArray, setMergeArray] = useState([...masterArray]);
  const [selectionArray, setSelectionArray] = useState([...masterArray]);
  
  // Control states
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);

  // Bubble Sort Implementation
  const runBubbleSort = async () => {
    setIsRunning(true);
    
    // Get a copy of the current bubble array
    const arr = [...bubbleArray];
    
    // Bubble sort algorithm with animation
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Compare adjacent elements
        if (arr[j] > arr[j + 1]) {
          // Swap them
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          // Update the state to show the change
          setBubbleArray([...arr]);
          
          // Wait for animation delay
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    }
    
    setIsRunning(false);
  };

  // Reset all arrays to master array
  const resetArrays = () => {
    setBubbleArray([...masterArray]);
    setQuickArray([...masterArray]);
    setMergeArray([...masterArray]);
    setSelectionArray([...masterArray]);
    setIsRunning(false);
  };

  // Generate new random array
  const generateNewArray = () => {
    const newArray = [];
    for (let i = 0; i < 8; i++) {
      newArray.push(Math.floor(Math.random() * 90) + 10);
    }
    setMasterArray(newArray);
    setBubbleArray([...newArray]);
    setQuickArray([...newArray]);
    setMergeArray([...newArray]);
    setSelectionArray([...newArray]);
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
              onChange={(bar) => setSpeed(parseInt(bar.target.value))}
              className="w-24"
            />
            <span className="text-sm text-gray-600">{speed}ms</span>
          </div>
        </div>
      </div>

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
                className="bg-blue-500 text-white text-xs flex items-end justify-center transition-all duration-200"
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
