import { useEffect } from 'react'
import { useRecipeStore } from './recipeStore'
import { Link } from 'react-router-dom'

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations)
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations)
  const addFavorite = useRecipeStore((state) => state.addFavorite)
  const isFavorite = useRecipeStore((state) => state.isFavorite)

  // Generate recommendations when component mounts
  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <h2>💡 Personalized Recommendations</h2>
        <div className="loading-recommendations">
          <p>Loading recommendations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="recommendations-list">
      <h2>💡 Personalized Recommendations</h2>
      <p className="recommendations-subtitle">
        Based on your favorites and preferences
      </p>
      
      <div className="recommendations-grid">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="recommendation-card">
            <div className="recommendation-content">
              <Link to={`/recipe/${recipe.id}`} className="recipe-title-link">
                <h3>{recipe.title}</h3>
              </Link>
              <p>{recipe.description}</p>
              {recipe.ingredients && (
                <div className="recipe-ingredients">
                  <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 2).join(', ')}
                  {recipe.ingredients.length > 2 && '...'}
                </div>
              )}
              {recipe.prepTime && (
                <div className="recipe-prep-time">
                  <strong>Prep Time:</strong> {recipe.prepTime}
                </div>
              )}
            </div>
            
            <div className="recommendation-actions">
              <Link to={`/recipe/${recipe.id}`}>
                <button className="view-btn">View Recipe</button>
              </Link>
              <button 
                onClick={() => addFavorite(recipe.id)}
                className={`favorite-btn ${isFavorite(recipe.id) ? 'favorited' : ''}`}
                disabled={isFavorite(recipe.id)}
                title={isFavorite(recipe.id) ? "Already in favorites" : "Add to favorites"}
              >
                {isFavorite(recipe.id) ? '❤️ Added' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="refresh-recommendations">
        <button 
          onClick={generateRecommendations}
          className="refresh-btn"
        >
          🔄 Refresh Recommendations
        </button>
      </div>
    </div>
  )
}

export default RecommendationsList