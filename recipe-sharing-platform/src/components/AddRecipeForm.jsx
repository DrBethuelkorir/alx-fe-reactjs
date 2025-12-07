import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy',
    category: 'italian',
    image: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Categories for dropdown
  const categories = [
    { value: 'italian', label: 'Italian' },
    { value: 'indian', label: 'Indian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
    { value: 'healthy', label: 'Healthy' }
  ];

  // Difficulty levels
  const difficulties = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' }
  ];

  // CORRECTED: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // FIXED: Using e.target.value
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Recipe summary is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
    if (!formData.cookTime.trim()) newErrors.cookTime = 'Cook time is required';
    if (!formData.servings.trim()) newErrors.servings = 'Servings is required';

    // Format validation for ingredients (at least 2 items)
    if (formData.ingredients.trim()) {
      const ingredientLines = formData.ingredients.split('\n');
      const ingredientCount = ingredientLines.filter(line => line.trim()).length;
      if (ingredientCount < 2) {
        newErrors.ingredients = 'Please enter at least 2 ingredients';
      }
    }

    // Format validation for instructions (at least 3 steps)
    if (formData.instructions.trim()) {
      const instructionLines = formData.instructions.split('\n');
      const instructionCount = instructionLines.filter(line => line.trim()).length;
      if (instructionCount < 3) {
        newErrors.instructions = 'Please enter at least 3 steps';
      }
    }

    // Time validation (must be positive numbers)
    const prepTimeNum = parseInt(formData.prepTime);
    if (formData.prepTime && (isNaN(prepTimeNum) || prepTimeNum <= 0)) {
      newErrors.prepTime = 'Prep time must be a positive number';
    }
    
    const cookTimeNum = parseInt(formData.cookTime);
    if (formData.cookTime && (isNaN(cookTimeNum) || cookTimeNum <= 0)) {
      newErrors.cookTime = 'Cook time must be a positive number';
    }

    // Servings validation
    const servingsNum = parseInt(formData.servings);
    if (formData.servings && (isNaN(servingsNum) || servingsNum <= 0)) {
      newErrors.servings = 'Servings must be a positive number';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      return;
    }

    setIsSubmitting(true);

    try {
      // Create recipe object
      const newRecipe = {
        id: Date.now(), // Generate unique ID
        title: formData.title,
        summary: formData.summary,
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: formData.category,
        rating: 4.5, // Default rating
        cookTime: `${formData.cookTime} min`,
        difficulty: formData.difficulty,
        author: 'You', // Current user
        ingredients: formData.ingredients.split('\n').filter(line => line.trim()),
        instructions: formData.instructions.split('\n').filter(line => line.trim()),
        prepTime: `${formData.prepTime} min`,
        servings: parseInt(formData.servings)
      };

      console.log('Submitting recipe:', newRecipe);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          summary: '',
          ingredients: '',
          instructions: '',
          prepTime: '',
          cookTime: '',
          servings: '',
          difficulty: 'Easy',
          category: 'italian',
          image: ''
        });
        setErrors({});
        setIsSubmitting(false);
        
        // Navigate to home page after 2 seconds
        setTimeout(() => navigate('/'), 2000);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting recipe:', error);
      setErrors({ submit: 'Failed to submit recipe. Please try again.' });
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      summary: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      difficulty: 'Easy',
      category: 'italian',
      image: ''
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium group"
          >
            <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Recipes
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-green-800">Recipe Submitted Successfully!</h3>
                <p className="text-green-700">Thank you for sharing your recipe. Redirecting to home page...</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Share Your Recipe
              </h1>
              <p className="text-green-100 text-lg">
                Fill in the details below to add your recipe to our community
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Basic Information
                </h2>
                
                {/* Recipe Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="e.g., Spaghetti Carbonara"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Recipe Summary */}
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                    Brief Description *
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.summary ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Describe your recipe in a few sentences..."
                  />
                  {errors.summary && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.summary}
                    </p>
                  )}
                </div>

                {/* Category and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level *
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    >
                      {difficulties.map(diff => (
                        <option key={diff.value} value={diff.value}>
                          {diff.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Timing and Servings Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Timing & Servings
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Prep Time */}
                  <div>
                    <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Prep Time (minutes) *
                    </label>
                    <input
                      type="number"
                      id="prepTime"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleChange}
                      min="1"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.prepTime ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="e.g., 15"
                    />
                    {errors.prepTime && (
                      <p className="mt-2 text-sm text-red-600">{errors.prepTime}</p>
                    )}
                  </div>

                  {/* Cook Time */}
                  <div>
                    <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Cook Time (minutes) *
                    </label>
                    <input
                      type="number"
                      id="cookTime"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleChange}
                      min="1"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.cookTime ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="e.g., 30"
                    />
                    {errors.cookTime && (
                      <p className="mt-2 text-sm text-red-600">{errors.cookTime}</p>
                    )}
                  </div>

                  {/* Servings */}
                  <div>
                    <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                      Servings *
                    </label>
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      value={formData.servings}
                      onChange={handleChange}
                      min="1"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.servings ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="e.g., 4"
                    />
                    {errors.servings && (
                      <p className="mt-2 text-sm text-red-600">{errors.servings}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recipe Details Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Recipe Details
                </h2>

                {/* Ingredients */}
                <div>
                  <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                    Ingredients * (one per line)
                  </label>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg border font-mono text-sm ${
                      errors.ingredients ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                    placeholder={`2 cups all-purpose flour
1 cup sugar
3 large eggs
1 tsp vanilla extract
...`}
                  />
                  {errors.ingredients && (
                    <p className="mt-2 text-sm text-red-600">{errors.ingredients}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Enter each ingredient on a new line. Include measurements.
                  </p>
                </div>

                {/* Instructions */}
                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions * (one step per line)
                  </label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.instructions ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                    placeholder={`1. Preheat oven to 350°F (175°C)
2. Mix dry ingredients in a bowl
3. Add wet ingredients and mix well
4. Pour into prepared pan
5. Bake for 30-35 minutes
...`}
                  />
                  {errors.instructions && (
                    <p className="mt-2 text-sm text-red-600">{errors.instructions}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Number each step or describe in order.
                  </p>
                </div>

                {/* Image URL (Optional) */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="https://example.com/recipe-image.jpg"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Provide a direct link to a high-quality image of your recipe
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-8 border-t border-gray-200">
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                    <p className="text-red-700 font-medium">{errors.submit}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Clear Form
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-4 font-semibold rounded-lg transition-all ${
                      isSubmitting
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Share Recipe'
                    )}
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-500 text-center">
                  * Required fields
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Form Tips */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Tips for a great recipe submission</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Be specific with measurements and cooking times</li>
                  <li>Include helpful tips or variations</li>
                  <li>Use clear, step-by-step instructions</li>
                  <li>Add a high-quality photo if possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;