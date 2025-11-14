import { useRecipeStore } from './recipeStore.js'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div className="recipe-list">
      <h2>Recipes ({recipes.length})</h2>
      
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes yet. Add your first recipe!</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-id">ID: {recipe.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList