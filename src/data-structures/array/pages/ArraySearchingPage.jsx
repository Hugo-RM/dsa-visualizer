function ArraySortingPage() {
    return(hello);
}

import { Link } from 'react-router-dom'

function ArraySearchingPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Arrays</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Searching</span>
      </nav>

      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Array Searching Algorithms</h2>
        <p className="text-gray-600 mt-2">
          Visualize how different searching algorithms find elements in arrays
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Searching Visualizer Coming Soon
        </h3>
        <p className="text-gray-600 mb-6">
          This page will contain interactive visualizations of:
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Linear Search</div>
            <div className="text-sm text-gray-600">O(n)</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Binary Search</div>
            <div className="text-sm text-gray-600">O(log n)</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Jump Search</div>
            <div className="text-sm text-gray-600">O(√n)</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Interpolation Search</div>
            <div className="text-sm text-gray-600">O(log log n)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArraySearchingPage