import { useRecipeStore } from './recipeStore'
import { Link } from 'react-router-dom'

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => 
    state.favorites.map(id =>
      state.recipes.find(recipe => recipe.id === id)
    ).filter(recipe => recipe !== undefined) // Filter out undefined recipes
  )
  const removeFavorite = useRecipeStore((state) => state.removeFavorite)

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <h2>⭐ My Favorites</h2>
        <div className="empty-favorites">
          <p>You haven't added any recipes to favorites yet.</p>
          <p>Click the heart icon on any recipe to add it to your favorites!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-list">
      <h2>⭐ My Favorites ({favorites.length})</h2>
      <div className="favorites-grid">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="favorite-card">
            <div className="favorite-content">
              <Link to={`/recipe/${recipe.id}`} className="recipe-title-link">
                <h3>{recipe.title}</h3>
              </Link>
              <p>{recipe.description}</p>
              {recipe.ingredients && (
                <div className="recipe-ingredients">
                  <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                  {recipe.ingredients.length > 3 && '...'}
                </div>
              )}
              {recipe.prepTime && (
                <div className="recipe-prep-time">
                  <strong>Prep Time:</strong> {recipe.prepTime}
                </div>
              )}
            </div>
            
            <div className="favorite-actions">
              <Link to={`/recipe/${recipe.id}`}>
                <button className="view-btn">View Details</button>
              </Link>
              <button 
                onClick={() => removeFavorite(recipe.id)}
                className="remove-favorite-btn"
                title="Remove from favorites"
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList