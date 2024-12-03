import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CompanyDetail from "./components/CompanyDetail";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import CompanyList from "./components/CompanyList";
import JobList from "./components/JobList";
import Profile from "./components/Profile";


function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
