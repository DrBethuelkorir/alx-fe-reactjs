import { useRecipeStore } from './recipeStore'

const RecipeDetails = ({ recipeId }) => {
  // Convert recipeId to number
  const numericRecipeId = Number(recipeId)
  
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === numericRecipeId)
  )

  // Debug: Add console logs to see what's happening
  console.log('RecipeDetails - recipeId:', recipeId, 'type:', typeof recipeId)
  console.log('RecipeDetails - numericRecipeId:', numericRecipeId, 'type:', typeof numericRecipeId)
  console.log('RecipeDetails - all recipes:', useRecipeStore.getState().recipes)

  // Handle case where recipe is not found
  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <p>Looking for ID: {recipeId} (type: {typeof recipeId})</p>
        <p>Converted to: {numericRecipeId} (type: {typeof numericRecipeId})</p>
        <p>Total recipes in store: {useRecipeStore.getState().recipes.length}</p>
        <div>
          <h3>Available Recipes:</h3>
          {useRecipeStore.getState().recipes.map(r => (
            <div key={r.id}>
              ID: {r.id} (type: {typeof r.id}) - {r.title}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      {/* We'll add EditRecipeForm and DeleteRecipeButton here later */}
    </div>
  )
}

export default RecipeDetails