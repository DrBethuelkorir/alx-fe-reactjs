import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Mock detailed recipe data
  const mockRecipeDetails = {
    1: {
      id: 1,
      title: "Spaghetti Carbonara",
      summary: "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Italian",
      prepTime: "15 min",
      cookTime: "20 min",
      totalTime: "35 min",
      difficulty: "Medium",
      rating: 4.8,
      reviews: 1247,
      author: "Marco Rossi",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      ingredients: [
        { id: 1, name: "Spaghetti", amount: "400g", note: "" },
        { id: 2, name: "Pancetta or guanciale", amount: "150g", note: "diced" },
        { id: 3, name: "Large eggs", amount: "4", note: "" },
        { id: 4, name: "Pecorino Romano cheese", amount: "100g", note: "grated" },
        { id: 5, name: "Parmesan cheese", amount: "50g", note: "grated" },
        { id: 6, name: "Black pepper", amount: "1 tsp", note: "freshly ground" },
        { id: 7, name: "Salt", amount: "to taste", note: "" },
        { id: 8, name: "Garlic", amount: "2 cloves", note: "optional" },
      ],
      instructions: [
        { id: 1, step: "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente." },
        { id: 2, step: "While pasta cooks, heat a large skillet over medium heat. Add pancetta and cook until crispy, about 5-7 minutes." },
        { id: 3, step: "In a medium bowl, whisk together eggs, grated cheeses, and black pepper until well combined." },
        { id: 4, step: "When pasta is done, reserve 1 cup of pasta water, then drain pasta." },
        { id: 5, step: "Add hot pasta to the skillet with pancetta and toss to combine (remove from heat to prevent eggs from scrambling)." },
        { id: 6, step: "Quickly pour egg mixture over pasta, tossing continuously. Add pasta water a little at a time until sauce is creamy." },
        { id: 7, step: "Serve immediately with extra cheese and black pepper on top." },
      ],
      tips: [
        "Use guanciale for authentic Roman carbonara.",
        "The heat from the pasta will cook the eggs, so work quickly!",
        "Never add cream to traditional carbonara.",
        "Reserve pasta water - it helps create the creamy sauce.",
      ],
      nutrition: {
        calories: 650,
        protein: "28g",
        carbs: "75g",
        fat: "25g",
        fiber: "3g",
      }
    },
    2: {
      id: 2,
      title: "Chicken Tikka Masala",
      summary: "Chunks of grilled chicken (tikka) cooked in a smooth buttery & creamy tomato based gravy.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Indian",
      prepTime: "30 min",
      cookTime: "40 min",
      totalTime: "70 min",
      difficulty: "Medium",
      rating: 4.9,
      reviews: 1893,
      author: "Priya Sharma",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      ingredients: [
        { id: 1, name: "Chicken breast", amount: "500g", note: "boneless, cubed" },
        { id: 2, name: "Yogurt", amount: "1 cup", note: "plain" },
        { id: 3, name: "Ginger-garlic paste", amount: "2 tbsp", note: "" },
        { id: 4, name: "Tomatoes", amount: "4 large", note: "puréed" },
        { id: 5, name: "Heavy cream", amount: "1 cup", note: "" },
        { id: 6, name: "Onion", amount: "2", note: "finely chopped" },
        { id: 7, name: "Garam masala", amount: "1 tbsp", note: "" },
        { id: 8, name: "Turmeric powder", amount: "1 tsp", note: "" },
        { id: 9, name: "Red chili powder", amount: "1 tsp", note: "" },
        { id: 10, name: "Kasuri methi", amount: "1 tsp", note: "dried fenugreek leaves" },
        { id: 11, name: "Butter", amount: "3 tbsp", note: "" },
        { id: 12, name: "Oil", amount: "2 tbsp", note: "" },
        { id: 13, name: "Salt", amount: "to taste", note: "" },
      ],
      instructions: [
        { id: 1, step: "Marinate chicken with yogurt, 1 tbsp ginger-garlic paste, turmeric, and salt for 2 hours." },
        { id: 2, step: "Grill or bake chicken until cooked through and slightly charred." },
        { id: 3, step: "Heat butter and oil in a pan. Add onions and cook until golden brown." },
        { id: 4, step: "Add remaining ginger-garlic paste and sauté for 1 minute." },
        { id: 5, step: "Add tomato purée and cook until oil separates." },
        { id: 6, step: "Add all spices and cook for 2 minutes." },
        { id: 7, step: "Add cream and kasuri methi. Simmer for 5 minutes." },
        { id: 8, step: "Add grilled chicken. Cook for 5-7 minutes on low heat." },
        { id: 9, step: "Garnish with fresh cream and coriander leaves. Serve with naan or rice." },
      ],
      tips: [
        "For best flavor, marinate chicken overnight.",
        "Don't skip kasuri methi - it adds authentic flavor.",
        "Adjust cream quantity to control gravy thickness.",
        "Use fresh tomatoes instead of canned for better taste.",
      ],
      nutrition: {
        calories: 420,
        protein: "35g",
        carbs: "18g",
        fat: "24g",
        fiber: "4g",
      }
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          const recipeData = mockRecipeDetails[id] || mockRecipeDetails[1];
          setRecipe(recipeData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching recipe:', error);
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
          <Link 
            to="/"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
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
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-2">
                    {recipe.category}
                  </span>
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

              {/* Rating & Author */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex items-center">
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
                <div className="flex space-x-3">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                    Save Recipe
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                    Print Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
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
                {recipe.ingredients.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="font-semibold text-green-600 mr-2">
                          {item.amount.includes('g') || item.amount.includes('ml') 
                            ? item.amount 
                            : `${Math.round(parseFloat(item.amount) * servings / 4 * 10) / 10}${item.amount.replace(/[0-9.]/g, '')}`}
                        </span>
                        {item.note && <span className="text-gray-500">• {item.note}</span>}
                      </div>
                    </div>
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

          {/* Right Column - Instructions & Tips */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('instructions')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'instructions'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Cooking Instructions
                  </button>
                  <button
                    onClick={() => setActiveTab('tips')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'tips'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Chef's Tips
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'notes'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    My Notes
                  </button>
                </nav>
              </div>
            </div>

            {/* Instructions Tab */}
            {activeTab === 'instructions' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Instructions</h2>
                <div className="space-y-8">
                  {recipe.instructions.map((step, index) => (
                    <div key={step.id} className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                      </div>
                      <div className="ml-6">
                        <p className="text-gray-700 text-lg leading-relaxed">{step.step}</p>
                        {index < recipe.instructions.length - 1 && (
                          <div className="mt-6">
                            <div className="w-0.5 h-8 bg-green-200 ml-5"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cooking Tips Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Tips</h3>
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
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Chef's Pro Tips</h2>
                <div className="space-y-6">
                  {recipe.tips.map((tip, index) => (
                    <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-yellow-800 font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-lg">{tip}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Video Tutorial</h3>
                  <p className="text-gray-600 mb-4">Watch our chef prepare this recipe step-by-step:</p>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">Click to play video tutorial</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Recipe Notes</h2>
                <div className="space-y-6">
                  <textarea
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Add your personal notes, substitutions, or variations here..."
                    defaultValue="I tried adding mushrooms last time and it was delicious! Next time I'll reduce the cream by half for a lighter version."
                  ></textarea>
                  <div className="flex justify-end space-x-4">
                    <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Clear
                    </button>
                    <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Recipes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <Link
                key={num}
                to={`/recipe/${num}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1565557623262 + num}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                  alt={`Recipe ${num}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Related Recipe {num}</h3>
                  <p className="text-gray-600 text-sm">Try this delicious variation!</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipecard