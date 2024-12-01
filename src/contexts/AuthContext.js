import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
