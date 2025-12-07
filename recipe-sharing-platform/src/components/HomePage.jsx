import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data with a slight delay
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // For now, we'll import the JSON directly
        const response = await import('../data.json');
        
        // Simulate network delay
        setTimeout(() => {
          setRecipes(response.default || response);
          setLoading(false);
        }, 500);
        
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('Failed to load recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Recipe Sharing Platform
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing recipes shared by our community. 
            From quick snacks to gourmet meals, find your next favorite dish.
          </p>
          <div className="mt-6">
            <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {recipes.length} Recipes Available
            </span>
          </div>
        </header>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Want to share your own recipe? 
            <a 
              href="#" 
              className="ml-1 text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              Click here to contribute →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;