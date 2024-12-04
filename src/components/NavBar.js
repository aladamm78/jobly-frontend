import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/NavBar.css";


function NavBar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data and token
    navigate("/"); // Redirect to homepage
  };

  return (
    <nav className="navbar">
      {/* Left Section: Links */}
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/companies" className="navbar-link">Companies</Link>
        <Link to="/jobs" className="navbar-link">Jobs</Link>
        {user && <Link to="/profile" className="navbar-link">Profile</Link>}
      </div>

      {/* Right Section: Logout or Authentication */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">{user.username}</span>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;