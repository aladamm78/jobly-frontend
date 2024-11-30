import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  // Handle form input changes
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/"); // Redirect to the homepage after successful signup
    } catch (errors) {
      setFormErrors(errors);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {formErrors.length > 0 && (
          <div>
            {formErrors.map((error, idx) => (
              <p key={idx} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
