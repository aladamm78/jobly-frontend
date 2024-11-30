import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./Routes";
import JoblyApi from "./api"; // Ensure JoblyApi is implemented
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user info when token changes
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }
    fetchUser();
  }, [token]);

  // Login function
  async function login(formData) {
    const newToken = await JoblyApi.login(formData);
    setToken(newToken);
  }

  // Signup function
  async function signup(formData) {
    const newToken = await JoblyApi.signup(formData);
    setToken(newToken);
  }

  // Logout function
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider value={{ currentUser, login, signup, logout }}>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
