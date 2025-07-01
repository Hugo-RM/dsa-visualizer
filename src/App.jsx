import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ArraySortingPage from './data-structures/array/pages/ArraySortingPage'
import ArraySearchingPage from './data-structures/array/pages/ArraySearchingPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            DSA Visualizer
          </h1>
          <p className="text-gray-600 mt-1">
            Interactive Data Structures & Algorithms
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arrays/sorting" element={<ArraySortingPage />} />
          <Route path="/arrays/searching" element={<ArraySearchingPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App