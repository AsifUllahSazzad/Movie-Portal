import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const lists = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>All Movies</a>
      </li>
      <li>
        <NavLink to={"/addMovies"}>Add Movie</NavLink>
      </li>
      <li>
        <a>My Favorites</a>
      </li>
      <li>
        <a>Top Rated</a>
      </li>
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      <li>
        <NavLink to={"/register"}>Register</NavLink>
      </li>
    </>
  );

  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Successful logout...");
      })
      .catch((error) => console.log(error.code));
  };

  return (
    <div className="navbar bg-base-100 shadow-xs shadow-gray-500">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {lists}
          </ul>
        </div>
        <a
          className="btn btn-ghost text-xl tracking-wide"
          style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700 }}
        >
          <span className="text-base-content">Movie</span>
          <span className="text-sky-400">Discover</span>
        </a>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{lists}</ul>
        </div>
      </div>

      <div className="navbar-end">
        <div className="flex gap-2">
          {/* <input
            type="text"
            placeholder="Search"
            className="input w-24 md:w-auto
            flex items-center gap-2 px-4 py-2 rounded-full 
                border 
                border-gray-500
                transition-colors
            "
          /> */}

          {/* design must */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
