import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import { UserContext } from "../context/UserContext"; 
import JobCard from "./JobCard";
import "../styles/CompanyDetail.css"; 
import "../styles/Titles.css";

const CompanyDetail = () => {
  const { companyId } = useParams(); // Get company ID from the URL
  const { user } = useContext(UserContext); // Access user from context
  const [company, setCompany] = useState(null); // Store company data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await JoblyApi.getCompany(companyId); // Fetch company details
        setCompany(companyData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching company details:", err);
        setError("Could not load company details.");
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]); // Re-run effect when `companyId` changes

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

  if (loading) return <p>Loading company details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="company-details-container">
      <h1 className="company-details-header">{company.name}</h1>
      <p className="company-details-description">{company.description}</p>
      <h2 className="jobs-header">Jobs at {company.name}</h2>
      <div className="jobs-container">
        {company.jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={company.name}
            onApply={handleApply} // Pass handleApply for applying to a job
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetail;
