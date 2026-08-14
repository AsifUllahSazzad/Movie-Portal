import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);

  // create new user
  const createNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // sign a existing user
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const provider = new GoogleAuthProvider();

  const socialLogin = async () => {
    return await signInWithPopup(auth, provider);
  };

  // current user
  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubsribe();
  }, []);

  // logout
  const logOut = async () => {
    return await signOut(auth);
  };

  const userInfo = {
    createNewUser,
    login,
    socialLogin,
    currentUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
