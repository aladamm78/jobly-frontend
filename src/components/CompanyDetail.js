import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
        setError(null);
      } catch (err) {
        console.error("Error fetching company details:", err);
        setError("Failed to load company details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompany();
  }, [handle]);

  if (isLoading) return <p>Loading company details...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <h3>Jobs</h3>
      {company.jobs.length > 0 ? (
        company.jobs.map((job) => (
          <JobCard key={job.id} job={job} hideCompanyName={true} />
        ))
      ) : (
        <p>No jobs available for this company.</p>
      )}
    </div>
  );
}

export default CompanyDetail;
