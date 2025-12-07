import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for recipe details
    const mockRecipes = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        summary: "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        prepTime: "15 min",
        cookTime: "20 min",
        totalTime: "35 min",
        difficulty: "Medium",
        servings: 4,
        ingredients: [
          "400g spaghetti",
          "150g pancetta or guanciale, diced",
          "4 large eggs",
          "100g Pecorino Romano cheese, grated",
          "50g Parmesan cheese, grated",
          "1 tsp freshly ground black pepper",
          "Salt to taste"
        ],
        instructions: [
          "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.",
          "While pasta cooks, heat a large skillet over medium heat. Add pancetta and cook until crispy.",
          "In a medium bowl, whisk together eggs, grated cheeses, and black pepper.",
          "When pasta is done, reserve 1 cup of pasta water, then drain pasta.",
          "Add hot pasta to the skillet with pancetta and toss to combine.",
          "Quickly pour egg mixture over pasta, tossing continuously. Add pasta water a little at a time until sauce is creamy.",
          "Serve immediately with extra cheese and black pepper on top."
        ]
      },
      {
        id: 2,
        title: "Chicken Tikka Masala",
        summary: "Chunks of grilled chicken cooked in a smooth buttery & creamy tomato gravy.",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        prepTime: "30 min",
        cookTime: "40 min",
        totalTime: "70 min",
        difficulty: "Medium",
        servings: 4,
        ingredients: [
          "500g chicken breast, boneless, cubed",
          "1 cup plain yogurt",
          "2 tbsp ginger-garlic paste",
          "4 large tomatoes, puréed",
          "1 cup heavy cream",
          "2 onions, finely chopped",
          "1 tbsp garam masala",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp dried fenugreek leaves (kasuri methi)",
          "3 tbsp butter",
          "2 tbsp oil",
          "Salt to taste"
        ],
        instructions: [
          "Marinate chicken with yogurt, 1 tbsp ginger-garlic paste, turmeric, and salt for 2 hours.",
          "Grill or bake chicken until cooked through and slightly charred.",
          "Heat butter and oil in a pan. Add onions and cook until golden brown.",
          "Add remaining ginger-garlic paste and sauté for 1 minute.",
          "Add tomato purée and cook until oil separates.",
          "Add all spices and cook for 2 minutes.",
          "Add cream and kasuri methi. Simmer for 5 minutes.",
          "Add grilled chicken. Cook for 5-7 minutes on low heat.",
          "Garnish with fresh cream and coriander leaves. Serve with naan or rice."
        ]
      }
    ];

    setTimeout(() => {
      const foundRecipe = mockRecipes.find(r => r.id.toString() === id) || mockRecipes[0];
      setRecipe(foundRecipe);
      setLoading(false);
    }, 500);
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
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Recipes
          </Link>
        </div>

        {/* Recipe Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Recipe Image */}
          <div className="relative h-64 md:h-96">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold px-4 py-2 rounded-full">
                #{recipe.id}
              </span>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{recipe.title}</h1>
              <p className="text-gray-600 text-lg">{recipe.summary}</p>
            </div>

            {/* Recipe Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{recipe.prepTime}</div>
                <div className="text-gray-600 text-sm">Prep Time</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{recipe.cookTime}</div>
                <div className="text-gray-600 text-sm">Cook Time</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{recipe.difficulty}</div>
                <div className="text-gray-600 text-sm">Difficulty</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{recipe.servings}</div>
                <div className="text-gray-600 text-sm">Servings</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-4 h-4 border-2 border-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold mr-4">
                          {index + 1}
                        </div>
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
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

        {/* Related Recipes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <Link
                key={num}
                to={`/recipe/${num}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${1565557623262 + num}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={`Recipe ${num}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
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

export default RecipeDetail;