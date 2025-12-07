import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            #{recipe.id}
          </span>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {recipe.summary}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link
            to={`/recipe/${recipe.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group/link"
          >
            View Recipe
            <svg 
              className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          <div className="flex space-x-2">
            <button 
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Add to favorites"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button 
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="Save recipe"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;