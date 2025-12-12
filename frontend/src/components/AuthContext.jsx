import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import routes from "../routes";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser);

  const logIn = async (username, password) => {
    const response = await axios.post(routes.loginPath(), { username, password });
    const userData = { username, token: response.data.token };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return true;
  };

  const signUp = async (username, password) => {
    const response = await axios.post(routes.signupPath(), { username, password });

    const userData = { username, token: response.data.token };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return true;
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const getAuthHeader = () => ({
    Authorization: user ? `Bearer ${user.token}` : '',
  });

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, signUp, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
