import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  // Categories data
  const categories = [
    { id: 'all', name: 'All Recipes', icon: '🍽️', count: 128 },
    { id: 'italian', name: 'Italian', icon: '🍝', count: 24 },
    { id: 'indian', name: 'Indian', icon: '🍛', count: 32 },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🥗', count: 45 },
    { id: 'dessert', name: 'Dessert', icon: '🍰', count: 28 },
    { id: 'quick', name: 'Quick Meals', icon: '⚡', count: 36 },
    { id: 'healthy', name: 'Healthy', icon: '🥑', count: 41 },
    { id: 'breakfast', name: 'Breakfast', icon: '🍳', count: 22 },
  ];

  // Featured recipes data
  const featuredData = [
    {
      id: 101,
      title: "Ultimate Chocolate Cake",
      description: "Rich, moist chocolate cake with ganache frosting",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      cookTime: "45 min",
      difficulty: "Medium",
    },
    {
      id: 102,
      title: "Authentic Ramen Bowl",
      description: "Traditional Japanese ramen with rich broth",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      cookTime: "60 min",
      difficulty: "Hard",
    },
    {
      id: 103,
      title: "Mediterranean Salad",
      description: "Fresh vegetables with feta and olive oil",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      cookTime: "15 min",
      difficulty: "Easy",
    },
  ];

  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      summary: "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "italian",
      rating: 4.8,
      cookTime: "25 min",
      difficulty: "Medium",
      reviews: 1247,
      author: "Marco Rossi",
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      summary: "Chunks of grilled chicken cooked in a smooth buttery & creamy tomato gravy.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "indian",
      rating: 4.9,
      cookTime: "40 min",
      difficulty: "Medium",
      reviews: 1893,
      author: "Priya Sharma",
    },
    {
      id: 3,
      title: "Vegetable Stir Fry",
      summary: "Fresh vegetables quickly sautéed with garlic, ginger, and soy sauce.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "vegetarian",
      rating: 4.6,
      cookTime: "20 min",
      difficulty: "Easy",
      reviews: 892,
      author: "Alex Chen",
    },
    {
      id: 4,
      title: "Chocolate Lava Cake",
      summary: "Decadent chocolate cake with a warm, gooey center, perfect for dessert lovers.",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62dadadf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "dessert",
      rating: 4.9,
      cookTime: "30 min",
      difficulty: "Medium",
      reviews: 2104,
      author: "Sophie Martin",
    },
    {
      id: 5,
      title: "Greek Salad",
      summary: "Fresh tomatoes, cucumbers, onions, feta cheese, and olives with olive oil dressing.",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "healthy",
      rating: 4.5,
      cookTime: "15 min",
      difficulty: "Easy",
      reviews: 756,
      author: "Maria Papadopoulos",
    },
    {
      id: 6,
      title: "Beef Burger",
      summary: "Juicy beef patty with lettuce, tomato, cheese, and special sauce in a toasted bun.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "quick",
      rating: 4.7,
      cookTime: "25 min",
      difficulty: "Easy",
      reviews: 1678,
      author: "John Smith",
    },
    {
      id: 7,
      title: "Vegetable Soup",
      summary: "Hearty soup made with seasonal vegetables, herbs, and vegetable broth.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "vegetarian",
      rating: 4.4,
      cookTime: "35 min",
      difficulty: "Easy",
      reviews: 543,
      author: "Emma Wilson",
    },
    {
      id: 8,
      title: "Blueberry Pancakes",
      summary: "Fluffy pancakes loaded with fresh blueberries and served with maple syrup.",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "breakfast",
      rating: 4.8,
      cookTime: "20 min",
      difficulty: "Easy",
      reviews: 1324,
      author: "David Lee",
    },
    {
      id: 9,
      title: "Margherita Pizza",
      summary: "Classic pizza with tomato sauce, fresh mozzarella, and basil leaves.",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "italian",
      rating: 4.7,
      cookTime: "30 min",
      difficulty: "Medium",
      reviews: 1987,
      author: "Luigi Romano",
    },
    {
      id: 10,
      title: "Sushi Platter",
      summary: "Assorted sushi with fresh fish, rice, and vegetables, served with soy sauce.",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "healthy",
      rating: 4.9,
      cookTime: "50 min",
      difficulty: "Hard",
      reviews: 876,
      author: "Yuki Tanaka",
    },
    {
      id: 11,
      title: "Guacamole",
      summary: "Fresh avocado dip with tomatoes, onions, cilantro, and lime juice.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "quick",
      rating: 4.5,
      cookTime: "10 min",
      difficulty: "Easy",
      reviews: 654,
      author: "Carlos Garcia",
    },
    {
      id: 12,
      title: "Tiramisu",
      summary: "Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "dessert",
      rating: 4.9,
      cookTime: "40 min",
      difficulty: "Medium",
      reviews: 2345,
      author: "Giovanna Bianchi",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        setTimeout(() => {
          setRecipes(mockRecipes);
          setFeaturedRecipes(featuredData);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error loading data:', err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter recipes based on search and category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Function to render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
            <p className="mt-6 text-xl font-medium text-gray-700">Loading delicious recipes...</p>
            <p className="mt-2 text-gray-500">Preparing culinary delights for you</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Discover & Share Amazing Recipes
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of food lovers sharing their favorite recipes. From quick snacks to gourmet meals, find inspiration for your next culinary adventure.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes by name, ingredients, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-8 py-5 rounded-full text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 shadow-2xl"
                />
                <div className="absolute right-5 top-5">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">{recipes.length}+</div>
                <div className="text-emerald-200">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-emerald-200">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-emerald-200">Chefs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24</div>
                <div className="text-emerald-200">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-green-50 border-2 border-green-500 transform scale-105 shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                }`}
              >
                <span className="text-3xl mb-3">{category.icon}</span>
                <span className={`font-semibold text-lg ${selectedCategory === category.id ? 'text-green-700' : 'text-gray-700'}`}>
                  {category.name}
                </span>
                <span className="text-sm text-gray-500 mt-1">{category.count} recipes</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Recipes</h2>
            <Link to="/featured" className="text-green-600 hover:text-green-800 font-semibold flex items-center">
              View All
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                    <span className="text-sm">{recipe.cookTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>
                  <p className="text-gray-200 mb-4">{recipe.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2">{recipe.rating}</span>
                    </div>
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-2 px-5 rounded-full transition-colors"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Recipes Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Recipes' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600 mt-2">
                Showing {filteredRecipes.length} of {recipes.length} recipes
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Clear Filters
              </button>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Sort by: Popular</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Cook Time</option>
              </select>
            </div>
          </div>

          {/* Recipes Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <div className="text-gray-400 mb-6">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No recipes found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `We couldn't find any recipes matching "${searchTerm}"`
                  : "Try selecting a different category or check back later for new recipes."}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Recipe Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                        {recipe.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        {recipe.cookTime}
                      </span>
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1">
                        {recipe.title}
                      </h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-5 line-clamp-2 h-12">
                      {recipe.summary}
                    </p>

                    {/* Rating and Author */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="flex">
                          {renderStars(recipe.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">({recipe.reviews})</span>
                      </div>
                      <div className="text-sm text-gray-500">By {recipe.author}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold group/btn"
                      >
                        View Recipe
                        <svg
                          className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>

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

          {/* Pagination */}
          {filteredRecipes.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-green-600 font-semibold hover:bg-gray-50">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Share Your Culinary Masterpiece?</h2>
          <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
            Join our community of passionate cooks and food lovers. Share your recipes, get feedback, and inspire others with your culinary creations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-xl hover:shadow-2xl">
              Submit Your Recipe
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full text-lg transition-colors">
              Join Our Community
            </button>
          </div>
          <p className="mt-8 text-green-200">
            Over 10,000 recipes shared and counting!
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Weekly Recipe Inspiration</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive handpicked recipes, cooking tips, and exclusive content every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;