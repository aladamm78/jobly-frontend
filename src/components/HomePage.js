import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/HomePage.css"; // Import the CSS file

function HomePage() {
  const { user, logout } = useContext(UserContext);

  const handleSignIn = () => {
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Jobly!</h1>
      {user ? (
        <div className="homepage-user-section">
          <h2 className="homepage-greeting">Hello, {user.username}!</h2>
          <button className="homepage-button" onClick={logout}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="homepage-guest-section">
          <p className="homepage-text">Please sign in to explore more features.</p>
          <button className="homepage-button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
