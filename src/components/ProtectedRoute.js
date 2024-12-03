import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the child component
  return children;
}

export default ProtectedRoute;
