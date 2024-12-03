import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import JobCard from "./JobCard";

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch jobs on component mount
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await JoblyApi.getJobs();
        setJobs(res);
      } catch (err) {
        console.error(err);
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
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Jobs</h1>
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
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
          />
        ))}
      </div>
    </div>
  );
}

export default JobsList;
