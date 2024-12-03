import React, { createContext, useState, useEffect } from "react";
import JoblyApi from "../api/api";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Current logged-in user data
  const [token, setToken] = useState(null); // JWT token
  const [loading, setLoading] = useState(true); // To prevent rendering while loading
  
  // Function to log in a user
  const login = async (userToken, username) => {
    setToken(userToken);
    JoblyApi.token = userToken;
    localStorage.setItem("token", userToken);

    const userData = await JoblyApi.getUser(username); // Fetch user info
    setUser(userData);
  };

  // Function to register a user
  const register = async (userToken, username) => {
    setToken(userToken);
    JoblyApi.token = userToken;
    localStorage.setItem("token", userToken);

    const userData = await JoblyApi.getUser(username); // Fetch user info
    setUser(userData);
  };

  // Function to log out a user
  const logout = () => {
    setToken(null);
    JoblyApi.token = null;
    setUser(null);
    localStorage.removeItem("token");
  };

  // Load token from localStorage on app load
  useEffect(() => {
    async function loadUserFromToken() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          JoblyApi.token = storedToken;
          setToken(storedToken);

          // Decode token to get the username
          const { username } = JSON.parse(atob(storedToken.split(".")[1]));
          const userData = await JoblyApi.getUser(username);
          setUser(userData);
        } catch (err) {
          console.error("Error loading user from token:", err);
          logout(); // Clear invalid token
        }
      }
      setLoading(false); // Stop loading once done
    }
    loadUserFromToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, token, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
