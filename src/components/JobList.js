import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await JoblyApi.getJobs(searchTerm);
        setJobs(res);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, [searchTerm]);

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Jobs</h1>
      <input
        type="text"
        placeholder="Search for a job..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
