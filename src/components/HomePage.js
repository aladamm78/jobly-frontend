import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function HomePage() {
  const { user, logout } = useContext(UserContext);

  const handleSignIn = () => {
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Jobly!</h1>
      {user ? (
        <div>
          <h2>Hello, {user.username}!</h2>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>Please sign in to explore more features.</p>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
