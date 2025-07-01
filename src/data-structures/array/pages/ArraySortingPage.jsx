import { Link } from 'react-router-dom'

function ArraySortingPage() {
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

      {/* Placeholder Content */}
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Sorting Visualizer Coming Soon
        </h3>
        <p className="text-gray-600 mb-6">
          This page will contain interactive visualizations of:
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Bubble Sort</div>
            <div className="text-sm text-gray-600">O(n²)</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Quick Sort</div>
            <div className="text-sm text-gray-600">O(n log n)</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Merge Sort</div>
            <div className="text-sm text-gray-600">O(n log n)</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">Selection Sort</div>
            <div className="text-sm text-gray-600">O(n²)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArraySortingPage
