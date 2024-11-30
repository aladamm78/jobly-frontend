import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs || []); // Ensure jobs is an array, even if undefined or null
        setError(null);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  /** Trigger search on form submission */
  async function search(searchTerm) {
    setIsLoading(true);
    try {
      const jobs = await JoblyApi.getJobs(searchTerm);
      setJobs(jobs || []); // Ensure jobs is an array
      setError(null);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  if (jobs.length === 0) {
    return <p>No jobs found.</p>;
  }

  return (
    <div className="JobList">
      <SearchForm search={search} />
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
  );
}

export default JobList;
