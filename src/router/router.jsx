import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import HomeLayout from "../layouts/HomeLayout";
import PrivateRoute from "./PrivateRoute";
import AddMovies from "../private/AddMovies";
import PrivateLayout from "../layouts/PrivateLayout";
import AllMovies from "../pages/AllMovies";

const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allMovies",
        element: <AllMovies />,
        loader: async () => {
          const res = await fetch('http://localhost:3000/movies')
          const data = await res.json();

          return data;
        }
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/addMovies",
        element: <AddMovies />,
      },
    ],
  },
]);

export default router;
