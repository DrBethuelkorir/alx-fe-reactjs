import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import './App.css'
import DeleteRecipeButton from './components/DeleteRecipeButton'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import {Router,Route} from 'react-router-dom'

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
            <Route path='/' element={<RecipeList />}></Route>
            <Route path='' element={<DeleteRecipeButton />}></Route>
            <Route path='' element={ <RecipeDetails />}></Route>
            <Route path='' element={<EditRecipeForm />}></Route>
            <AddRecipeForm />
         </Router>
        </div>
      </main>
    </div>
  )
}

export default App