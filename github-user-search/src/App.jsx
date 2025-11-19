// src/App.jsx
import Ssearch from './components/Ssearch'
import './App.css'
import Search from './components/Search'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users and their profiles</p>
      </header>
      <main className="app-main">
        <Ssearch />
        <Search />
      </main>
    </div>
  )
}

export default App