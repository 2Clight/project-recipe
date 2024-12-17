import React, { useState } from 'react';
import { fetchRecipesByIngredients } from './api'; // Correct import

// Define a list of "acceptable" ingredients that can be present in any recipe
const acceptableIngredients = [
  'water', 'sugar', 'salt', 'oil', 'butter', 'vinegar', 'lemon', 'pepper', 'garlic', 'onion', 'soy sauce'
];

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Normalize the user ingredients list (lowercase, trimmed)
    const ingredientList = ingredients
      .split(',')
      .map((ingredient) => ingredient.trim().toLowerCase())
      .join(',');

    try {
      // Fetch recipes based on the provided ingredients
      const response = await fetchRecipesByIngredients(ingredientList);

      // Filter recipes to match exactly the ingredients
      const filteredRecipes = response.data.filter((recipe) => {
        // Extract and normalize the used ingredients in the recipe
        const usedIngredients = recipe.usedIngredients.map((ing) => ing.name.toLowerCase());

        // Normalize the user ingredients
        const userIngredients = ingredients
          .split(',')
          .map((ingredient) => ingredient.trim().toLowerCase());

        // Check if the recipe's used ingredients match the user-provided ingredients
        const allIngredientsMatch = userIngredients.every((ingredient) =>
          usedIngredients.includes(ingredient)
        );

        // Ensure the recipe does not contain any unacceptable ingredients like flour or milk
        const containsOnlyAllowedIngredients = usedIngredients.every((ingredient) =>
          userIngredients.includes(ingredient) || acceptableIngredients.includes(ingredient)
        );

        return allIngredientsMatch && containsOnlyAllowedIngredients;
      });

      setRecipes(filteredRecipes); // Store the filtered recipes
    } catch (error) {
      setError('An error occurred while fetching recipes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Ingredient-based Recipe Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter ingredients (e.g., egg, oil, salt)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit">Find Recipes</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} width={100} />
              <p>Used Ingredients: {recipe.usedIngredients.map(ing => ing.name).join(', ')}</p>
              <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">View Recipe</a>
            </div>
          ))
        ) : (
          <p>No recipes found for the given ingredients.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
