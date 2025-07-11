import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BubbleSort from '../algorithms/sorting/BubbleSort.js'
import SelectionSort from '../algorithms/sorting/SelectionSort.js'
import ArrayVisualizer from '../components/ArrayVisualizer.jsx'

function ArraySortingPage() {
  const [bubbleSortInstance, setBubbleSortInstance] = useState(null);
  const [selectionSortInstance, setSelectionSortInstance] = useState(null);
  
  const [bubbleArray, setBubbleArray] = useState([]);
  const [quickArray, setQuickArray] = useState([]);
  const [mergeArray, setMergeArray] = useState([]);
  const [selectionArray, setSelectionArray] = useState([]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  
  const [bubbleAnimationData, setBubbleAnimationData] = useState({});
  const [selectionAnimationData, setSelectionAnimationData] = useState({});

  // Initialize algorithm instances
  useEffect(() => {
    const initialArray = [64, 34, 25, 12, 22, 11, 90];
    
    const bubbleSort = new BubbleSort(initialArray);
    const selectionSort = new SelectionSort(initialArray);
    
    setBubbleSortInstance(bubbleSort);
    setSelectionSortInstance(selectionSort);
    
    setBubbleArray([...initialArray]);
    setQuickArray([...initialArray]);
    setMergeArray([...initialArray]);
    setSelectionArray([...initialArray]);
  }, []);

  // Animation callback for bubble sort
  const handleBubbleSortStep = async (data) => {
    setBubbleArray([...data.array]);
    setBubbleAnimationData(data);
  };

  const handleSelectionSortStep = async (data) => {
    setSelectionArray([...data.array]);
    setSelectionAnimationData(data);
  };

  const runSort = async () => {
    runBubbleSort();
    runSelectionSort();
  }

  const runBubbleSort = async () => {
    if (!bubbleSortInstance) return;

    setIsRunning(true);

    bubbleSortInstance.resetStats();
    bubbleSortInstance.setAnimationSpeed(speed);
    
    try {
      await bubbleSortInstance.sort(handleBubbleSortStep);
    } catch (error) {
      console.error('Bubble sort error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const runSelectionSort = async () => {
    if (!selectionSortInstance) return;

    setIsRunning(true);

    selectionSortInstance.resetStats();
    selectionSortInstance.setAnimationSpeed(speed);
    
    try {
      await selectionSortInstance.sort(handleSelectionSortStep);
    } catch (error) {
      console.error('Selection sort error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const resetArrays = () => {
    if (bubbleSortInstance) {
      bubbleSortInstance.stop();
      bubbleSortInstance.reset();
      setBubbleArray([...bubbleSortInstance.array]);
    }
    if (selectionSortInstance) {
      selectionSortInstance.stop();
      selectionSortInstance.reset();
      setSelectionArray([...selectionSortInstance.array]);
    }    
    setIsRunning(false);
    setBubbleAnimationData({});
    setSelectionAnimationData({});
  };

  const generateNewArray = () => {
    const newArray = [];
    for (let i = 0; i < 8; i++) {
      newArray.push(Math.floor(Math.random() * 90) + 10);
    }
    
    if (bubbleSortInstance) {
      bubbleSortInstance.stop();
      const newBubbleSort = new BubbleSort(newArray);
      setBubbleSortInstance(newBubbleSort);
    }
    if (selectionSortInstance) {
      selectionSortInstance.stop();
      const newSelectionSort = new SelectionSort(newArray);
      setSelectionSortInstance(newSelectionSort);
    }
    
    // Update all array displays
    setBubbleArray([...newArray]);
    setQuickArray([...newArray]);
    setMergeArray([...newArray]);
    setSelectionArray([...newArray]);
    
    setIsRunning(false);
    setAnimationData({});
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
            onClick={runSort}
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
      {bubbleSortInstance && bubbleAnimationData.comparisons !== undefined || selectionSortInstance && selectionAnimationData.comparisons !== undefined && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Current Statistics</h3>
          
          {/* Bubble Sort Stats */}
          {bubbleAnimationData.comparisons !== undefined && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-blue-600 mb-1">Bubble Sort:</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Comparisons:</span> {bubbleAnimationData.comparisons}
                </div>
                <div>
                  <span className="font-medium">Swaps:</span> {bubbleAnimationData.swaps}
                </div>
                <div>
                  <span className="font-medium">Step:</span> {bubbleAnimationData.step || 'Ready'}
                </div>
              </div>
            </div>
          )}
          
          {/* Selection Sort Stats */}
          {selectionAnimationData.comparisons !== undefined && (
            <div>
              <h4 className="text-sm font-medium text-teal-600 mb-1">Selection Sort:</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Comparisons:</span> {selectionAnimationData.comparisons}
                </div>
                <div>
                  <span className="font-medium">Swaps:</span> {selectionAnimationData.swaps}
                </div>
                <div>
                  <span className="font-medium">Step:</span> {selectionAnimationData.step || 'Ready'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Algorithm Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bubble Sort */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Bubble Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n²) | Space: O(1)</p>
          
          <ArrayVisualizer 
            array={bubbleArray}
            animationData={bubbleAnimationData}
            algorithm="bubble"
            height={40}
            showValues={true}
            showCurrentArray={true}
          />
        </div>

        {/* Quick Sort (Placeholder) */}
        <div className="bg-white rounded-lg shadow p-4 opacity-50">
          <h3 className="text-lg font-semibold mb-2">Quick Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n log n) | Space: O(log n)</p>
          
          <ArrayVisualizer 
            array={quickArray}
            animationData={null}
            algorithm="quick"
            height={40}
            showValues={true}
            showCurrentArray={false}
          />
          
          <p className="text-center text-sm text-gray-600">Coming Soon</p>
        </div>

        {/* Merge Sort (Placeholder) */}
        <div className="bg-white rounded-lg shadow p-4 opacity-50">
          <h3 className="text-lg font-semibold mb-2">Merge Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n log n) | Space: O(n)</p>
          
          <ArrayVisualizer 
            array={mergeArray}
            animationData={null}
            algorithm="merge"
            height={40}
            showValues={true}
            showCurrentArray={false}
          />
          
          <p className="text-center text-sm text-gray-600">Coming Soon</p>
        </div>

        {/* Selection Sort */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Selection Sort</h3>
          <p className="text-sm text-gray-600 mb-4">Time: O(n²) | Space: O(1)</p>
          
          <ArrayVisualizer 
            array={selectionArray}
            animationData={selectionAnimationData}
            algorithm="selection"
            height={40}
            showValues={true}
            showCurrentArray={true}
          />
        </div>
      </div>
    </div>
  )
}

export default ArraySortingPage
