import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); //refers to login/signup modal pop-up

  let token = localStorage.getItem("token");
  //isLogin below means, is the person needing to log in
  const [isLogin, setIsLogin] = useState(token ? false : true); //if there is token, user is already logged in

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      //means user is logged in and can now log out
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      //user is NOT logged in and log in modal must open for login
      setIsOpen(true);
    }
  };

  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {isLogin ? (
              // User not logged in → open modal
              <button onClick={() => setIsOpen(true)} className="navItem">
                My Recipe's
              </button>
            ) : (
              // User logged in → navigate to /myRecipe
              <NavLink to="/myRecipe">My Recipe's</NavLink>
            )}
          </li>
          {/* <li>
            {isLogin ? (
              <NavLink onClick={() => setIsOpen(true)} >My Recipe's</NavLink>
            ) : (
              // <button onClick={() => setIsOpen(true)} >
              //   My Recipe's
              // </button>
              <NavLink to="/myRecipe">My Recipe's</NavLink>
            )}
          </li> */}
          <li onClick={checkLogin}>
            <p className="login">
              {isLogin ? "Login" : "Logout"}
              {user?.email ? ` (${user?.email})` : ""}
            </p>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );

  // return (
  //   <>
  //     <header>
  //       <h2>Food Blog</h2>
  //       <ul>
  //         <li>
  //           <NavLink to="/">Home</NavLink>
  //         </li>
  //         <li onClick={() => isLogin && setIsOpen(true)}>
  //           <NavLink to={isLogin ? "/myRecipe" : "/"}>My Recipe's</NavLink>
  //         </li>
  //         {/* <li onClick={() => isLogin && setIsOpen(true)}>
  //           <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favorites</NavLink>
  //         </li> */}
  //         <li onClick={checkLogin}>
  //           <p className="login">
  //             {isLogin ? "Login" : "Logout"}
  //             {user?.email ? `(${user?.email})` : ""}
  //           </p>
  //         </li>
  //       </ul>
  //     </header>
  //     {isOpen && (
  //       <Modal onClose={() => setIsOpen(false)}>
  //         <InputForm setIsOpen={() => setIsOpen(false)} />
  //       </Modal>
  //     )}
  //   </>
  // );
}
