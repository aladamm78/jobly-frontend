import React from "react";

function JobCard({ job, hideCompanyName = false }) {
  if (!job) return <div>No job data available</div>;

  const { title, companyName, salary, equity } = job;

  return (
    <div className="JobCard">
      <h3>{title || "Untitled Position"}</h3>
      {!hideCompanyName && <p>Company: {companyName || "Unknown Company"}</p>}
      <p>Salary: {salary !== null ? `$${salary}` : "Not specified"}</p>
      <p>Equity: {equity !== null ? equity : "None"}</p>
    </div>
  );
}

export default JobCard;
