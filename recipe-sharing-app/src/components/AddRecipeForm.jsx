import { useState } from 'react'
import { useRecipeStore } from './recipeStore.js'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [prepTime, setPrepTime] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      ...(ingredients.trim() && {
        ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item)
      }),
      ...(prepTime.trim() && { prepTime: prepTime.trim() })
    }

    addRecipe(newRecipe)
    
    // Reset form
    setTitle('')
    setDescription('')
    setIngredients('')
    setPrepTime('')
  }

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Add New Recipe</h2>
      
      <div className="form-group">
        <label htmlFor="title">Recipe Title:*</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title..."
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Recipe Description:*</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter recipe description..."
          rows="3"
          className="form-textarea"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas (e.g., flour, sugar, eggs)"
          rows="2"
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label htmlFor="prepTime">Preparation Time:</label>
        <input
          id="prepTime"
          type="text"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="e.g., 30 minutes, 1 hour"
          className="form-input"
        />
      </div>
      
      <button type="submit" className="submit-btn">
        Add Recipe
      </button>
    </form>
  )
}

export default AddRecipeForm