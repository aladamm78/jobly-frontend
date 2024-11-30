import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  // Handle form input changes
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  }

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/"); // Redirect to the homepage after successful login
    } catch (errors) {
      setFormErrors(errors);
    }
  }

  return (
    <div>
      <h2>Login</h2>
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
        {formErrors.length > 0 && (
          <div>
            {formErrors.map((error, idx) => (
              <p key={idx} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </div>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
