import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  searchTerm: '',
  filteredRecipes: [],
  
  // Recipe actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
    favorites: state.favorites.filter(favId => favId !== id)
  })),
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter actions
  setSearchTerm: (term) => {
    set({ searchTerm: term })
    get().filterRecipes()
  },
  
  filterRecipes: () => {
    const { recipes, searchTerm } = get()
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    )
    set({ filteredRecipes: filtered })
  },
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => {
    // Check if already in favorites
    if (state.favorites.includes(recipeId)) {
      return state
    }
    return { favorites: [...state.favorites, recipeId] }
  }),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set((state) => {
    const isFavorite = state.favorites.includes(recipeId)
    if (isFavorite) {
      return { favorites: state.favorites.filter(id => id !== recipeId) }
    } else {
      return { favorites: [...state.favorites, recipeId] }
    }
  }),
  
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId)
  },
  
  // Recommendations actions
  generateRecommendations: () => {
    const { recipes, favorites } = get()
    
    if (favorites.length === 0) {
      // If no favorites, show random recipes
      const shuffled = [...recipes].sort(() => 0.5 - Math.random())
      set({ recommendations: shuffled.slice(0, 3) })
      return
    }
    
    // Get favorite recipe categories/tags for better recommendations
    const favoriteRecipes = recipes.filter(recipe => 
      favorites.includes(recipe.id)
    )
    
    // Simple recommendation logic based on:
    // 1. Similar ingredients
    // 2. Similar preparation time
    // 3. Random selection from non-favorites
    const recommended = recipes
      .filter(recipe => !favorites.includes(recipe.id)) // Exclude favorites
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, 4) // Take top 4
    
    set({ recommendations: recommended })
  }
}))