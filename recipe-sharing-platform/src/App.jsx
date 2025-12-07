import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with logos */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center justify-center gap-8 mb-8">
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img 
                src={viteLogo} 
                className="logo h-24 w-24 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_2em_#646cffaa]" 
                alt="Vite logo" 
              />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img 
                src={reactLogo} 
                className="logo react h-24 w-24 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow" 
                alt="React logo" 
              />
            </a>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Vite + React + Tailwind
          </h1>
          <p className="text-gray-400 text-lg">Modern web development stack</p>
        </div>

        {/* Main content card */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-2xl max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Count is: <span className="text-cyan-300 ml-2">{count}</span>
            </button>
            
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
              <p className="text-lg text-gray-300 mb-2">
                Click the button to increase the count
              </p>
              <p className="text-gray-400">
                Current count: <span className="text-green-400 font-mono text-2xl font-bold">{count}</span>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-300 mb-4">
              Edit <code className="bg-gray-900 px-2 py-1 rounded text-cyan-300 font-mono">src/App.jsx</code> and save to test HMR
            </p>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400">
                Hot Module Replacement (HMR) updates the app without refreshing the page
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Click on the Vite and React logos to learn more
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a 
              href="https://vite.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Vite Documentation
            </a>
            <span className="text-gray-600">•</span>
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              React Documentation
            </a>
            <span className="text-gray-600">•</span>
            <a 
              href="https://tailwindcss.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Tailwind CSS
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App