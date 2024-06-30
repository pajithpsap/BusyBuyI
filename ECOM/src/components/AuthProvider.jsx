// AuthProvider.jsx
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseInit";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = () => {
  const { login, logout, setUserData} = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUserData(user);

        login();
      } else {
       logout();
      }
    });

    return () => unsubscribe();
  }, []);

  return <Outlet />;
};

export default AuthProvider;
