import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`https://api.example.com/recipes/${recipeId}`)
            .then((response) => setRecipe(response.data));
    }, [recipeId]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Steps:</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeDetails;
