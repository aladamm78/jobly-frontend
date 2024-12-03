import JoblyApi from "./api/api";
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import NavBar from "./components/NavBar";
import { UserContext } from "./context/UserContext";


function App() {
  const { token, setUser, loading } = useContext(UserContext);
  
  
  useEffect(() => {
    async function loadUser() {
      if (!token) return; // Early exit if no token
      try {
        const { username } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const userData = await JoblyApi.getUser(username);
        setUser(userData);
      } catch (err) {
        console.error("Error loading user", err);
      }
    }
    loadUser();
  }, [token, setUser]);

   // Conditionally render loading screen
   if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavBar />  
      <AppRoutes />
    </Router>
  );
}

export default App;
