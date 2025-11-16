import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('all') // 'all', 'favorites', 'recommendations'

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🍳 Recipe Sharing App</h1>
          <p>Share and discover amazing recipes with the community!</p>
        </header>

        <main className="app-main">
          <div className="container">
            {/* Navigation Tabs */}
            <div className="app-tabs">
              <button 
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                📋 All Recipes
              </button>
              <button 
                className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                ⭐ My Favorites
              </button>
              <button 
                className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
                onClick={() => setActiveTab('recommendations')}
              >
                💡 Recommendations
              </button>
            </div>

            <Routes>
              <Route path="/" element={
                <div>
                  <AddRecipeForm />
                  <SearchBar />
                  
                  {/* Conditional rendering based on active tab */}
                  {activeTab === 'all' && <RecipeList />}
                  {activeTab === 'favorites' && <FavoritesList />}
                  {activeTab === 'recommendations' && <RecommendationsList />}
                </div>
              } />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/edit/:id" element={<EditRecipeForm />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App