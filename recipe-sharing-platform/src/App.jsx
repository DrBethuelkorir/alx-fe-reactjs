import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-green-600">🍳 RecipeShare</h1>
                </div>
                <div className="hidden md:block ml-10">
                  <div className="flex items-baseline space-x-4">
                    <a href="#" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="#" className="text-gray-500 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Categories</a>
                    <a href="#" className="text-gray-500 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Popular</a>
                    <a href="#" className="text-gray-500 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Add Recipe
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">RecipeShare</h3>
                <p className="text-gray-400">Share, discover, and enjoy delicious recipes from around the world.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Browse Recipes</a></li>
                  <li><a href="#" className="hover:text-white">Submit Recipe</a></li>
                  <li><a href="#" className="hover:text-white">Community Guidelines</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                  <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>© 2024 RecipeShare. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;