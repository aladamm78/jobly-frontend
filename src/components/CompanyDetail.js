import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res);
      } catch (err) {
        console.error("Error fetching company:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompany();
  }, [handle]);

  if (isLoading) return <p>Loading...</p>;
  if (!company) return <p>Company not found.</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h2>Jobs</h2>
      {company.jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default CompanyDetail;
