import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import API_URL from "../api";

export default function RecipeItems({ recipes, onRecipeClick }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [favItems, setFavItems] = useState(
    () => JSON.parse(localStorage.getItem("fav")) || []
  );

  // let path = window.location.pathname === "/myRecipe" ? true : false;
  let path = window.location.pathname === "/myRecipe";

  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favItems));
  }, [favItems]);

  const onDelete = async (id) => {
    await axios
      .delete(`${API_URL}/recipe/${id}`)
      .then((res) => console.log(res));
    setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
  };

  const favRecipe = (item) => {
    setFavItems((prevFavItems) => {
      const isFavorited = prevFavItems.find(
        (recipe) => recipe._id === item._id
      );
      if (isFavorited) {
        return prevFavItems.filter((recipe) => recipe._id !== item._id);
      } else {
        return [...prevFavItems, item];
      }
    });
  };

  return (
    <div className="card-container">
      {allRecipes?.map((item, index) => {
        const isFavorited = favItems.find((res) => res._id === item._id);

        return (
          <div
            key={index}
            className="card"
            onClick={() => onRecipeClick && onRecipeClick(item)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`${API_URL}/images/${item.coverImage}`}
              width="120px"
              height="100px"
              alt="recipe"
            />
            <div className="card-body">
              <div className="title">{item.title}</div>
              <div className="icons" onClick={(e) => e.stopPropagation()}>
                <div className="timer">
                  <BsFillStopwatchFill /> {item.time}
                </div>
                {!path ? (
                  <MdFavorite
                    onClick={() => favRecipe(item)}
                    style={{ color: isFavorited ? "red" : "black" }}
                  />
                ) : (
                  <div className="action">
                    <Link to={`/editRecipe/${item._id}`} className="editIcon">
                      <FaEdit />
                    </Link>
                    <MdDelete
                      onClick={() => onDelete(item._id)}
                      className="deleteIcon"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
