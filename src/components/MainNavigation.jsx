import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainNavigation() {
  return (
    <>
      <Navbar />
      {/* outlet renders the children */}
      <Outlet />
      <Footer />
    </>
  );
}
