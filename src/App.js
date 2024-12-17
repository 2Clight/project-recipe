import React, { useState } from 'react';
import { fetchRecipesByIngredients } from './api'; // Correct import

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const ingredientList = ingredients.split(',').map((ingredient) => ingredient.trim()).join(',');

    try {
      const response = await fetchRecipesByIngredients(ingredientList);  // Use fetchRecipesByIngredients
      setRecipes(response.data);
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
          placeholder="Enter ingredients (e.g., chicken, rice, tomato)"
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
