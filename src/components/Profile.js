import React, { useState, useContext } from "react";
import UserContext from "../UserContext"; // Context for user data
import JoblyApi from "../api";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext); // Get current user from context
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // Send updated user data to API
      const updatedUser = await JoblyApi.updateProfile(currentUser.username, formData);
      setCurrentUser(updatedUser); // Update context with new user data
      setIsUpdated(true);
      setError(null);
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          disabled
        />

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="alert alert-danger">{error}</p>}
        {isUpdated && <p className="alert alert-success">Profile updated!</p>}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
