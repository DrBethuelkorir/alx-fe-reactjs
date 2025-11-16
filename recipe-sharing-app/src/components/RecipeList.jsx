import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const RecipeList = ({ onViewRecipe, onEditRecipe }) => {
  const recipes = useRecipeStore((state) => state.recipes)
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)

  // Use filtered recipes when there's a search term, otherwise use all recipes
  const displayRecipes = searchTerm ? filteredRecipes : recipes

  return (
    <div className="recipe-list">
      <h2>Recipes ({displayRecipes.length})</h2>
      
      {searchTerm && (
        <div className="search-info">
          <p>
            Showing {filteredRecipes.length} of {recipes.length} recipes 
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      )}
      
      {displayRecipes.length === 0 ? (
        <div className="no-recipes">
          {searchTerm ? (
            <p>No recipes found matching "{searchTerm}". Try a different search term.</p>
          ) : (
            <p>No recipes yet. Add your first recipe above!</p>
          )}
        </div>
      ) : (
        <div className="recipes-grid">
          {displayRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-content">
                {/* Use Link for navigation to recipe details */}
                <Link to={`/recipe/${recipe.id}`} className="recipe-title-link">
                  <h3>{recipe.title}</h3>
                </Link>
                <p>{recipe.description}</p>
                {recipe.ingredients && (
                  <div className="recipe-ingredients">
                    <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
                  </div>
                )}
                {recipe.prepTime && (
                  <div className="recipe-prep-time">
                    <strong>Prep Time:</strong> {recipe.prepTime}
                  </div>
                )}
                <small>ID: {recipe.id}</small>
              </div>
              
              <div className="recipe-actions">
                {/* Link for View Details */}
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="view-btn">
                    View Details
                  </button>
                </Link>
                
                {/* Link for Edit */}
                <Link to={`/edit/${recipe.id}`}>
                  <button className="edit-btn">
                    Edit
                  </button>
                </Link>
                
                {/* Optional: Link for Delete page if you have one */}
                <Link to={`/delete`}>
                  <button className="delete-btn">
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList