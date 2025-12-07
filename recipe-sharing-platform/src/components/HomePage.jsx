import { useState, useEffect } from 'react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock categories
  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'italian', name: 'Italian' },
    { id: 'indian', name: 'Indian' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'quick', name: 'Quick Meals' },
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Import mock data
        const response = await import('../data.json');
        
        // Add mock categories to recipes
        const mockCategories = ['italian', 'indian', 'vegetarian', 'dessert', 'quick', 'italian', 'indian', 'vegetarian'];
        const recipesWithCategories = (response.default || response).map((recipe, index) => ({
          ...recipe,
          category: mockCategories[index % mockCategories.length],
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating 3.0-5.0
          cookTime: `${Math.floor(Math.random() * 30) + 15} min`,
        }));
        
        setTimeout(() => {
          setRecipes(recipesWithCategories);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('Failed to load recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on search and category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
            <p className="mt-6 text-xl font-medium text-gray-700">Loading delicious recipes...</p>
            <p className="mt-2 text-gray-500">Preparing culinary delights for you</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Discover & Share Amazing Recipes
          </h1>
          <p className="text-xl mb-8 text-emerald-100 max-w-3xl mx-auto">
            Join our community of food lovers. Find inspiration for your next meal or share your culinary creations.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes by name or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 shadow-xl"
              />
              <div className="absolute right-3 top-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Count */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Recipes' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600 mt-2">
                Showing {filteredRecipes.length} of {recipes.length} recipes
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-semibold">4.8</span>
                <span className="text-gray-500 ml-1">(2.4k reviews)</span>
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-gray-400 mb-4">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No recipes found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Recipe Image with Badge */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                        {recipe.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center text-white">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-bold">{recipe.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1">
                        {recipe.title}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {recipe.cookTime}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-5 line-clamp-2">
                      {recipe.summary}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <button className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold group/btn">
                        View Full Recipe
                        <svg
                          className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>

                      <div className="flex space-x-3">
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110"
                          aria-label="Add to favorites"
                          title="Add to favorites"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button
                          className="text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-110"
                          aria-label="Save recipe"
                          title="Save recipe"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">{recipes.length}</div>
                <div className="text-gray-600">Total Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">4.8</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">24</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">1.2k+</div>
                <div className="text-gray-600">Active Cooks</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Share Your Recipe?</h3>
              <p className="mb-6 text-green-100 max-w-2xl mx-auto">
                Join thousands of food enthusiasts who are sharing their culinary creations. 
                Whether it's a family secret or a new invention, your recipe could be the next favorite!
              </p>
              <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl">
                Submit Your Recipe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;