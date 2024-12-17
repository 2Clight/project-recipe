import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h3>{recipe.name}</h3>
                    <p>{recipe.description}</p>
                    <button onClick={() => window.location.href = `/recipe/${recipe.id}`}>View Recipe</button>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
