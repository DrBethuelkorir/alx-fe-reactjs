import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
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
    recipes: state.recipes.filter((recipe) => recipe.id !== id)
  })),
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter actions
  setSearchTerm: (term) => {
    set({ searchTerm: term })
    // Automatically filter when search term changes
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
  }
}))