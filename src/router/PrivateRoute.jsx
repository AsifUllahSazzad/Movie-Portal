import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser);

  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;
