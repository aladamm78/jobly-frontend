import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavBar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data and token
    navigate("/"); // Redirect to homepage
  };

  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "space-between", padding: "10px", listStyle: "none", background: "#eee" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/companies">Companies</Link>
        </li>
        <li>    
            <Link to="/jobs">Jobs</Link>
        </li>

        {user ? (
          <>
            <li>
              Welcome, {user.username}
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ cursor: "pointer", background: "none", border: "none", color: "blue" }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
