import { useRecipeStore } from './recipeStore'

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId)
      
      // If onDelete callback is provided, call it (for cleanup or navigation)
      if (onDelete) {
        onDelete()
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      className="delete-btn"
    >
      Delete Recipe
    </button>
  )
}

export default DeleteRecipeButton