import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext"; // Correct the import

function NavBar() {
  const { currentUser, logout } = useUserContext(); // Use the hook

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>
      <Link to="/profile">Profile</Link> {/* Always show this link */}
      {currentUser ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
