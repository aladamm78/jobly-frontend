import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import JoblyApi from "../api/api";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object with only changed or non-empty fields
    const filteredData = {};
    for (let key in formData) {
      if (formData[key] !== user[key] && formData[key] !== "") {
        filteredData[key] = formData[key];
      }
    }
  
    try {
      // Send only the updated fields to the backend
      const updatedUser = await JoblyApi.updateUser(user.username, filteredData);
      setUser(updatedUser); // Update the context with new user data
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Error updating profile.");
    }
  };
  

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
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
          value={formData.email}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep the same"
        />
        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
