import { useState, useEffect } from 'react'
import { useRecipeStore } from './recipeStore'

const EditRecipeForm = ({ recipeId, onCancel }) => {
  // Convert recipeId to number to match the IDs in store
  const numericRecipeId = Number(recipeId)
  
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === numericRecipeId)
  )
  const updateRecipe = useRecipeStore((state) => state.updateRecipe)
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Debug: log the values to see what's happening
  useEffect(() => {
    console.log('EditRecipeForm - recipeId:', recipeId, 'type:', typeof recipeId)
    console.log('EditRecipeForm - numericRecipeId:', numericRecipeId, 'type:', typeof numericRecipeId)
    console.log('EditRecipeForm - all recipes:', useRecipeStore.getState().recipes)
    
    if (recipe) {
      console.log('EditRecipeForm - found recipe:', recipe)
      setTitle(recipe.title)
      setDescription(recipe.description)
    } else {
      console.log('EditRecipeForm - recipe not found')
    }
  }, [recipe, recipeId, numericRecipeId])

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    updateRecipe(numericRecipeId, {
      title: title.trim(),
      description: description.trim()
    })

    if (onCancel) {
      onCancel()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <p>Recipe ID: {recipeId} (type: {typeof recipeId})</p>
        <p>Numeric ID: {numericRecipeId} (type: {typeof numericRecipeId})</p>
        <button onClick={handleCancel} className="cancel-btn">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      
      <div className="form-group">
        <label htmlFor="edit-title">Recipe Title:</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title..."
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="edit-description">Recipe Description:</label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter recipe description..."
          rows="4"
          className="form-textarea"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Update Recipe
        </button>
        <button 
          type="button" 
          onClick={handleCancel}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditRecipeForm