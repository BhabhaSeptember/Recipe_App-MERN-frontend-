import React from "react";
import API_URL from '../api';

export default function RecipeDetailModal({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="recipe-modal">
      <h2>{recipe.title}</h2>
      <img
        src={`https://recipeappmern-backend.onrender.com/images/${recipe.coverImage}`}
        alt={recipe.title}
        style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
      />

      <div>
        <strong>Preparation Time:</strong> {recipe.time || "N/A"}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Ingredients:</strong>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Instructions:</strong>
        <p>{recipe.instructions}</p>
      </div>

      {recipe.createdBy && (
        <div style={{ marginTop: "1rem", fontStyle: "italic" }}>
          Created by: {recipe.createdBy?.email || "Anonymous"}
        </div>
      )}
    </div>
  );
}
