import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api/api";
import { UserContext } from "../context/UserContext";
import "../styles/Titles.css";


function Register() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await JoblyApi.register(formData);
      login(token, { username: formData.username }); // Pass token and user data to context
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError(err[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  };

  return (
    <div>
      <h1 className="page-title">Signup</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>First Name:</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label>Last Name:</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Register;
