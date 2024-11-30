import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Companies from "./components/Companies";
import CompanyDetail from "./components/CompanyDetail";
import Jobs from "./components/Jobs";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from "./components/Profile";
import CompanyList from "./components/CompanyList";
import JobList from "./components/JobList";


function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
