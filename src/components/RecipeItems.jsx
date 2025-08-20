import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

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
      .delete(`http://localhost:5000/recipe/${id}`)
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
              src={`http://localhost:5000/images/${item.coverImage}`}
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

//====================================================================================
//=======================================================================================
// import React, { useEffect, useState } from "react";
// import { Link, useLoaderData } from "react-router-dom";
// import { BsFillStopwatchFill } from "react-icons/bs";
// import { MdFavorite } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import axios from "axios";

// export default function RecipeItems() {
//   const recipes = useLoaderData();
//   const [allRecipes, setAllRecipes] = useState([]);
//   const [favItems, setFavItems] = useState(
//     () => JSON.parse(localStorage.getItem("fav")) || []
//   );

//   let path = window.location.pathname === "/myRecipe" ? true : false;

//   useEffect(() => {
//     setAllRecipes(recipes);
//   }, [recipes]);

//   useEffect(() => {
//     // Sync localStorage with favItems state whenever favItems is updated
//     localStorage.setItem("fav", JSON.stringify(favItems));
//   }, [favItems]);

//   const onDelete = async (id) => {
//     await axios
//       .delete(`http://localhost:5000/recipe/${id}`)
//       .then((res) => console.log(res));
//     setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
//   };

//   const favRecipe = (item) => {
//     setFavItems((prevFavItems) => {
//       const isFavorited = prevFavItems.find(
//         (recipe) => recipe._id === item._id
//       );

//       if (isFavorited) {
//         // Remove from favorites
//         return prevFavItems.filter((recipe) => recipe._id !== item._id);
//       } else {
//         // Add to favorites
//         return [...prevFavItems, item];
//       }
//     });
//   };

//   return (
//     <div className="card-container">
//       {allRecipes?.map((item, index) => {
//         const isFavorited = favItems.find((res) => res._id === item._id);

//         return (
//           <div key={index} className="card">
//             <img
//               src={`http://localhost:5000/images/${item.coverImage}`}
//               width="120px"
//               height="100px"
//               alt="recipe"
//             />
//             <div className="card-body">
//               <div className="title">{item.title}</div>
//               <div className="icons">
//                 <div className="timer">
//                   <BsFillStopwatchFill /> {item.time}
//                 </div>
//                 {!path ? (
//                   <MdFavorite
//                     onClick={() => favRecipe(item)}
//                     style={{ color: isFavorited ? "red" : "black" }} // Red when favorited, black otherwise
//                   />
//                 ) : (
//                   <div className="action">
//                     <Link to={`/editRecipe/${item._id}`} className="editIcon">
//                       <FaEdit />
//                     </Link>
//                     <MdDelete
//                       onClick={() => onDelete(item._id)}
//                       className="deleteIcon"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
