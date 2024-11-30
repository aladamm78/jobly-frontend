import React from "react";

function JobCard({ job }) {
  if (!job) {
    return <div>No job data available</div>; // Handle case when job is undefined
  }

  const { title, companyName, salary, equity } = job;

  return (
    <div className="JobCard">
      <h3>{title || "Untitled Position"}</h3>
      <p>Company: {companyName || "Unknown Company"}</p>
      <p>Salary: {salary !== null ? `$${salary}` : "Not specified"}</p>
      <p>Equity: {equity !== null ? equity : "None"}</p>
    </div>
  );
}

export default JobCard;
