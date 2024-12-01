import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function NavBar() {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>
      {currentUser ? (
        <>
          <Link to="/profile">Profile</Link>
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
