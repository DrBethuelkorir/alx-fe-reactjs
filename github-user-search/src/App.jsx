// src/App.jsx
import Search from './components/Search'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users and their profiles</p>
      </header>
      <main className="app-main">
        <Search />
      </main>
    </div>
  )
}

export default App