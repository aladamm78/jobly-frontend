import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user data using the username from localStorage
  useEffect(() => {
    async function fetchUserData() {
      try {
        const username = localStorage.getItem("username");
        const user = await JoblyApi.getCurrentUser(username);
        setUserData(user);
      } catch (err) {
        setError("Unable to fetch user data. Please log in.");
      }
    }

    fetchUserData();
  }, []);

  // Display error or loading state if applicable
  if (error) {
    return <p>{error}</p>;
  }
  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
}

export default Profile;
