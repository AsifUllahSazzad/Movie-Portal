import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="mx-10 mt-8">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
