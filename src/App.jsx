import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";

const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get("http://localhost:5000/recipe").then((res) => {
    allRecipes = res.data;
  });
  return allRecipes;
};

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);

  let allRecipes = await getAllRecipes();
  console.log("All recipes:", allRecipes);

  // return allRecipes.filter(
  //   (item) => item.createdBy.toString() === user._id.toString()
  // );

  let filtered = allRecipes.filter((item) => {
    console.log("Recipe creator: ", item.createdBy);
    console.log("User ID: ", user?._id);

    // If createdBy is an object with _id
    if (item.createdBy && typeof item.createdBy === "object") {
      return item.createdBy._id?.toString() === user?._id?.toString();
    }

    // If createdBy is already just an ID string
    return item.createdBy?.toString() === user?._id?.toString();
  });

  console.log("Filtered recipes:", filtered);
  return filtered;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home key="all" />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home key="my" />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home /> },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
