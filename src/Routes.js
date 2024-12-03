import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CompaniesList from "./components/CompaniesList";
import CompanyDetail from "./components/CompanyDetail";
import JobsList from "./components/JobsList";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/companies" element={<CompaniesList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobsList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        />
      </Routes>
  );
}

export default AppRoutes;
