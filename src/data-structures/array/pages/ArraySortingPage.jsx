import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BubbleSort from '../algorithms/sorting/BubbleSort.js'
import SelectionSort from '../algorithms/sorting/SelectionSort.js'
import ArrayVisualizer from '../components/ArrayVisualizer.jsx'
import ArrayStats from '../components/ArrayStats.jsx'

function ArraySortingPage() {
  const algorithms = {
    bubble: { 
      name: 'Bubble Sort', 
      Class: BubbleSort, 
      complexity: 'Time: O(n²) | Space: O(1)',
    },
    selection: { 
      name: 'Selection Sort', 
      Class: SelectionSort, 
      complexity: 'Time: O(n²) | Space: O(1)',
    },
    quick: { 
      name: 'Quick Sort', 
      Class: null, 
      complexity: 'Time: O(n log n) | Space: O(log n)',
    },
    merge: { 
      name: 'Merge Sort', 
      Class: null, 
      complexity: 'Time: O(n log n) | Space: O(n)',
    }
  };

  const [algorithmStates, setAlgorithmStates] = useState({
    bubble: { instance: null, array: [], animationData: {} },
    selection: { instance: null, array: [], animationData: {} },
    quick: { instance: null, array: [], animationData: {} },
    merge: { instance: null, array: [], animationData: {} }
  });

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);

  // Initialize all algorithms
  useEffect(() => {
    const initialArray = [64, 34, 25, 12, 22, 11, 90];
    
    const newStates = {};
    Object.keys(algorithms).forEach(key => {
      const algo = algorithms[key];
      newStates[key] = {
        instance: algo.Class ? new algo.Class(initialArray) : null,
        array: [...initialArray],
        animationData: {}
      };
    });
    
    setAlgorithmStates(newStates);
  }, []);

  const createAnimationCallback = (algorithmKey) => {
    return async (data) => {
      setAlgorithmStates(prev => ({
        ...prev,
        [algorithmKey]: {
          ...prev[algorithmKey],
          array: [...data.array],
          animationData: data
        }
      }));
    };
  };

  const runAlgorithm = async (algorithmKey) => {
    const state = algorithmStates[algorithmKey];
    if (!state.instance || isRunning) return;

    setIsRunning(true);
    state.instance.resetStats();
    state.instance.setAnimationSpeed(speed);
    
    try {
      await state.instance.sort(createAnimationCallback(algorithmKey));
    } catch (error) {
      console.error(`${algorithms[algorithmKey].name} error:`, error);
    } finally {
      setIsRunning(false);
    }
  };

  const stopAllAlgorithms = () => {
    Object.values(algorithmStates).forEach(state => {
      if (state.instance) {
        state.instance.stop();
      }
    });
    setIsRunning(false);
  };

  const updateAllAlgorithmStates = (updateFunction) => {
    setAlgorithmStates(prev => {
      const newStates = {};
      Object.keys(prev).forEach(key => {
        newStates[key] = updateFunction(prev[key], key);
      });
      return newStates;
    });
  };

  const runAllSorts = async () => {
    stopAllAlgorithms();

    updateAllAlgorithmStates((state) => {
      if (state.instance) {
        state.instance.resetStats();
      }
      return {
        ...state,
        animationData: {}
      };
    });

    const availableAlgorithms = Object.keys(algorithms).filter(
      key => algorithms[key].Class && algorithmStates[key].instance
    );
    
    setIsRunning(true);
    try {
      await Promise.all(availableAlgorithms.map(key => runAlgorithm(key)));
    } finally {
      setIsRunning(false);
    }
  };

  const resetArrays = () => {
    stopAllAlgorithms();
    
    updateAllAlgorithmStates((state) => {
      if (state.instance) {
        state.instance.reset();
        return {
          ...state,
          array: [...state.instance.array],
          animationData: {}
        };
      }
      return { ...state, animationData: {} };
    });
  };

  const generateNewArray = () => {
    stopAllAlgorithms();
    
    const newArray = Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 90) + 10
    );
    
    updateAllAlgorithmStates((state, key) => {
      const algo = algorithms[key];
      if (algo.Class) {
        return {
          instance: new algo.Class(newArray),
          array: [...newArray],
          animationData: {}
        };
      }
      return {
        instance: null,
        array: [...newArray],
        animationData: {}
      };
    });
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
            onClick={runAllSorts}
            disabled={isRunning}
            className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {isRunning ? 'Running...' : 'Run All Algorithms'}
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

      {/* Algorithm Grid (2x2)*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(algorithms).map(([key, algo]) => {
          const state = algorithmStates[key];
          const isActive = algo.Class !== null;
          
          return (
            <div key={key} className={`bg-white rounded-lg shadow p-4 ${!isActive ? 'opacity-50' : ''}`}>
              <h3 className="text-lg font-semibold mb-2">{algo.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{algo.complexity}</p>
              
              <ArrayVisualizer 
                array={state.array}
                animationData={isActive ? state.animationData : null}
                algorithm={key}
                height={40}
                showValues={true}
                showCurrentArray={isActive}
              />
              
              {isActive ? (
                <ArrayStats 
                  animationData={state.animationData} 
                  algorithm={key}
                  showAccessCount={true}
                />
              ) : (
                <p className="text-center text-sm text-gray-600 mt-4">Coming Soon</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ArraySortingPage