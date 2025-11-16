import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import './App.css'
import DeleteRecipeButton from './components/DeleteRecipeButton'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🍳 Recipe Sharing App</h1>
        <p>Share and discover amazing recipes with the community!</p>
      </header>

      <main className="app-main">
        <div className="container">
          <Router>
            <Routes>
              <Route path='/' element={
                <div>
                  <SearchBar />
                  <AddRecipeForm />
                  <RecipeList />
                </div>
              } />
              <Route path='/delete' element={<DeleteRecipeButton />} />
              <Route path='/recipe/:id' element={<RecipeDetails />} />
              <Route path='/edit/:id' element={<EditRecipeForm />} />
            </Routes>
          </Router>
        </div>
      </main>
    </div>
  )
}

export default App