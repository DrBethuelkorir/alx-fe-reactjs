import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Import data from data.json
        const response = await import('../data.json');
        const recipes = response.default || response;
        
        // Find the recipe by ID
        const foundRecipe = recipes.find(r => r.id === parseInt(id));
        
        if (foundRecipe) {
          // Add additional details for the recipe
          const recipeDetails = {
            ...foundRecipe,
            prepTime: "15 min",
            cookTime: "30 min",
            totalTime: "45 min",
            difficulty: "Medium",
            servings: 4,
            rating: 4.8,
            reviews: 1247,
            author: "Chef Name",
            authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            ingredients: [
              "400g main ingredient",
              "150g secondary ingredient",
              "4 large eggs",
              "100g cheese, grated",
              "50g additional cheese",
              "1 tsp spices",
              "Salt to taste",
              "Fresh herbs for garnish"
            ],
            instructions: [
              "Prepare all ingredients as listed.",
              "Heat a pan over medium heat and add oil.",
              "Cook the main ingredient until golden brown.",
              "Add spices and seasonings, stir well.",
              "Combine with other ingredients and simmer.",
              "Garnish with fresh herbs before serving.",
              "Serve hot and enjoy!"
            ],
            tips: [
              "Use fresh ingredients for best flavor.",
              "Don't overcook the main ingredient.",
              "Adjust spices to your preference.",
              "Let it rest for 5 minutes before serving."
            ],
            nutrition: {
              calories: 450,
              protein: "25g",
              carbs: "40g",
              fat: "20g",
              fiber: "5g"
            }
          };
          
          setTimeout(() => {
            setRecipe(recipeDetails);
            setLoading(false);
          }, 500);
        } else {
          // Recipe not found
          setLoading(false);
          setRecipe(null);
        }
      } catch (error) {
        console.error('Error loading recipe:', error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-6 text-xl font-medium text-gray-700">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h3>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const adjustIngredients = (multiplier) => {
    setServings(multiplier);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Recipes
          </button>
        </div>

        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="md:flex">
            {/* Recipe Image */}
            <div className="md:w-1/2">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            {/* Recipe Info */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{recipe.title}</h1>
                  <p className="text-gray-600 text-lg mb-6">{recipe.summary}</p>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{recipe.prepTime}</div>
                  <div className="text-gray-600 text-sm">Prep Time</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{recipe.cookTime}</div>
                  <div className="text-gray-600 text-sm">Cook Time</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{recipe.difficulty}</div>
                  <div className="text-gray-600 text-sm">Difficulty</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{recipe.totalTime}</div>
                  <div className="text-gray-600 text-sm">Total Time</div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center border-t border-gray-200 pt-6">
                <img
                  src={recipe.authorAvatar}
                  alt={recipe.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">By {recipe.author}</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{recipe.rating} ({recipe.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Servings:</span>
                  <div className="flex items-center bg-gray-100 rounded-full">
                    <button
                      onClick={() => adjustIngredients(Math.max(1, servings - 1))}
                      className="px-3 py-1 hover:bg-gray-200 rounded-l-full"
                    >
                      -
                    </button>
                    <span className="px-3 font-medium">{servings}</span>
                    <button
                      onClick={() => adjustIngredients(servings + 1)}
                      className="px-3 py-1 hover:bg-gray-200 rounded-r-full"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <span className="ml-3 text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Nutrition Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Calories</div>
                    <div className="text-xl font-bold text-gray-900">{recipe.nutrition.calories}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Protein</div>
                    <div className="text-xl font-bold text-gray-900">{recipe.nutrition.protein}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Carbs</div>
                    <div className="text-xl font-bold text-gray-900">{recipe.nutrition.carbs}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Fat</div>
                    <div className="text-xl font-bold text-gray-900">{recipe.nutrition.fat}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cooking Instructions</h2>
              <div className="space-y-8">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                      {index < recipe.instructions.length - 1 && (
                        <div className="mt-6">
                          <div className="w-0.5 h-8 bg-green-200 ml-5"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cooking Tips */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Chef's Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipe.tips.map((tip, index) => (
                    <div key={index} className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex-1">
                    Save Recipe
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex-1">
                    Print Recipe
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex-1">
                    Share Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;