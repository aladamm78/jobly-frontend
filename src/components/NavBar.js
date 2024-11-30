import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";

function NavBar() {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}!</span>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
