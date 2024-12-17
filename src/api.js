// api.js
import axios from 'axios';

// Replace 'YOUR_API_KEY' with your actual Spoonacular API key
const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
  timeout: 10000,
  params: {
    apiKey: 'dec989b0fd284b688c8e0c0cc7958e9b',
  },
});

// Function to search recipes by ingredients
export const fetchRecipesByIngredients = (ingredients) => {
  return api.get('/recipes/findByIngredients', {
    params: {
      ingredients: ingredients,
      number: 5,  // Fetch 5 recipes for example
      ignorePantry: true,  // Ignore ingredients that are commonly found in the pantry
    },
  });
};
