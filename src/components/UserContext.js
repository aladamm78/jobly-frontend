import React, { createContext, useState } from "react";
import JoblyApi from "./api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Login function
  async function login(credentials) {
    try {
      const token = await JoblyApi.loginUser(credentials);
      JoblyApi.token = token; // Store token in the API class
      const user = await JoblyApi.getCurrentUser(credentials.username);
      setCurrentUser(user);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  // Signup function
  async function signup(data) {
    try {
      const token = await JoblyApi.registerUser(data);
      JoblyApi.token = token;
      const user = await JoblyApi.getCurrentUser(data.username);
      setCurrentUser(user);
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  }

  // Logout function
  function logout() {
    setCurrentUser(null);
    JoblyApi.token = null; // Clear the token
  }

  return (
    <UserContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
