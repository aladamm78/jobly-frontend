import React, { useState, useEffect, useContext } from "react"; // Import useContext
import JoblyApi from "../api/api";
import JobCard from "./JobCard";
import { UserContext } from "../context/UserContext"; // Import UserContext
import "../styles/Titles.css"


function JobsList() {
  const { user } = useContext(UserContext); // Access user from context
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch jobs on component mount
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await JoblyApi.getJobs();
        setJobs(res);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchJobs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await JoblyApi.getJobs({ title: searchTerm });
      setJobs(res);
    } catch (err) {
      console.error("Error searching jobs:", err);
    }
  };

  const handleApply = async (jobId) => {
    console.debug("Job ID received in handleApply:", jobId); // Log jobId
    console.debug("Username passed to API:", user?.username); // Log username

    if (!user || !user.username) {
      alert("You must be logged in to apply for jobs.");
      return;
    }

    try {
      await JoblyApi.applyToJob(user.username, jobId);
      alert(`Successfully applied to job ${jobId}`);
    } catch (err) {
      console.error("Error applying to job:", err.response || err);
      alert("Failed to apply to job.");
    }
  };

  return (
    <div>
      <h1 className="page-title">Jobs</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a job"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {jobs.map((job) => {
          console.debug("Job ID in JobsList map:", job.id); // Log job.id
          return (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
              onApply={handleApply}
            />
          );
        })}
      </div>
    </div>
  );
}

export default JobsList;
