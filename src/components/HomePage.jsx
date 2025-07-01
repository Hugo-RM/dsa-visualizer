import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose a Data Structure
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore interactive visualizations of fundamental computer science algorithms
          and data structures. Watch step-by-step how each algorithm works.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        
        {/* Arrays Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Arrays</h3>
            <p className="text-gray-600 mb-6">
              Visualize sorting and searching algorithms on array data structures
            </p>
            
            {/* Array Sub-options */}
            <div className="space-y-3">
              <Link 
                to="/arrays/sorting"
                className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Sorting Algorithms
              </Link>
              <Link 
                to="/arrays/searching"
                className="block w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Searching Algorithms
              </Link>
            </div>
          </div>
        </div>

        {/* Linked Lists Card (Coming Soon) */}
        <div className="bg-white rounded-lg shadow-lg p-6 opacity-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Linked Lists</h3>
            <p className="text-gray-600 mb-6">
              Singly Linked Lists, Doubly Linked Lists, Circular Linked Lists, and its algorithms
            </p>
            <button 
              disabled
              className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
        
        {/* Trees Card (Coming Soon) */}
        <div className="bg-white rounded-lg shadow-lg p-6 opacity-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trees</h3>
            <p className="text-gray-600 mb-6">
              Binary search trees, AVL trees, and tree traversal algorithms
            </p>
            <button 
              disabled
              className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* Graphs Card (Coming Soon) */}
        <div className="bg-white rounded-lg shadow-lg p-6 opacity-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕸️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Graphs</h3>
            <p className="text-gray-600 mb-6">
              Adjacency Matrix, Adjacency List, Graph traversal, shortest path, and network algorithms
            </p>
            <button 
              disabled
              className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

      </div>

      {/* Features Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
        <h3 className="text-2xl font-semibold text-center mb-6">Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold mb-2">Real-time Animation</h4>
            <p className="text-gray-600 text-sm">
              Watch algorithms execute step-by-step with smooth animations
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎮</div>
            <h4 className="font-semibold mb-2">Interactive Controls</h4>
            <p className="text-gray-600 text-sm">
              Control speed, pause, and customize input data
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📈</div>
            <h4 className="font-semibold mb-2">Performance Stats</h4>
            <p className="text-gray-600 text-sm">
              Track comparisons, swaps, and time complexity
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage