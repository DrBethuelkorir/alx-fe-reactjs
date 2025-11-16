import React from 'react'
import { useRecipeStore } from './recipeStore'

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm)
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm)

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by title, description, or ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="clear-search"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar