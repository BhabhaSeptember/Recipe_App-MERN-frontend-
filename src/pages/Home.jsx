import React, { useState } from "react";
import pot from "../assets/pot.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeItems from "../components/RecipeItems";
import { useNavigate, useLoaderData } from "react-router-dom";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";
import RecipeDetailModal from "../components/RecipeDetailModal"; // <-- NEW

export default function Home() {
  const recipes = useLoaderData(); // <-- get recipes from loader
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // for login modal
  const [selectedRecipe, setSelectedRecipe] = useState(null); // for recipe detail modal

  const addRecipe = () => {
    let token = localStorage.getItem("token");
    if (token) navigate("/addRecipe");
    else setIsOpen(true);
  };

  return (
    <>
      <section className="home">
        <div className="left">
          <h2>Welcome to</h2>
          <h1>Food Recipe App</h1>
          <h5>
            🍽️ Discover a world of delicious flavors and easy-to-follow recipes,
            all in one place! Whether you're a seasoned chef or just starting
            your cooking journey, we've got something for everyone. ✨ Explore a
            variety of recipes from different cuisines. <br />
            👨‍🍳 Create and share your own favorite dishes with the community. 🥗
            Save your favorite recipes for easy access anytime. <br /> <br />
            SIGNUP or LOGIN to start exploring, get inspired, and bring amazing
            meals to life! 🚀
          </h5>
          <button onClick={addRecipe}>Share your recipe</button>
        </div>

        <div className="right">
          <img src={pot} width="400px" height="400px" alt="cooking pot" />
        </div>
      </section>

      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 288">
          <path
            fill="#ebe856"
            fillOpacity="1"
            d="M0,160L60,181.3C120,203,240,245,360,224C480,203,600,117,720,122.7C840,128,960,224,1080,245.3C1200,267,1320,213,1380,186.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      {selectedRecipe && (
        <Modal onClose={() => setSelectedRecipe(null)}>
          <RecipeDetailModal recipe={selectedRecipe} />
        </Modal>
      )}

      <div className="recipe">
        <RecipeItems 
         recipes={recipes} 
         onRecipeClick={(recipe) => setSelectedRecipe(recipe)} />
      </div>

      <Footer />
    </>
  );
}

//=========================================================================================
//===================================================================================
// import React, { useState } from "react";
// import pot from "../assets/pot.jpg";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import RecipeItems from "../components/RecipeItems";
// import { useNavigate } from "react-router-dom";
// import Modal from "../components/Modal";
// import InputForm from "../components/InputForm";

// export default function Home() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const addRecipe = () => {
//     let token = localStorage.getItem("token");
//     if (token) navigate("/addRecipe");
//     else {
//       setIsOpen(true);
//     }
//   };

//   return (
//     <>
//       <section className="home">
//         <div className="left">
//           <h2>Welcome to</h2>
//           <h1>Food Recipe App </h1>
//           <h5>
//             🍽️ Discover a world of delicious flavors and easy-to-follow recipes,
//             all in one place! Whether you're a seasoned chef or just starting
//             your cooking journey, we've got something for everyone. ✨ Explore a
//             variety of recipes from different cuisines. <br />
//             👨‍🍳 Create and share your own favorite dishes with the community. 🥗
//             Save your favorite recipes for easy access anytime. <br /> <br />
//             SIGNUP or LOGIN to start exploring, get inspired, and bring amazing meals to life! 🚀
//           </h5>
//           <button onClick={addRecipe}>Share your recipe</button>
//         </div>

//         <div className="right">
//           <img src={pot} width="400px" height="400px"></img>
//         </div>
//       </section>

//       <div className="bg">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 288">
//           <path
//             fill="#ebe856"
//             fillOpacity="1"
//             d="M0,160L60,181.3C120,203,240,245,360,224C480,203,600,117,720,122.7C840,128,960,224,1080,245.3C1200,267,1320,213,1380,186.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
//           ></path>
//         </svg>
//       </div>

//       {isOpen && (
//         <Modal onClose={() => setIsOpen(false)}>
//           <InputForm setIsOpen={() => setIsOpen(false)} />
//         </Modal>
//       )}

//       <div className="recipe">
//         <RecipeItems />
//       </div>
//     </>
//   );
// }
