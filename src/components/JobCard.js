import React from "react";

function JobCard({ job }) {
  return (
    <div>
      <h3>{job.title}</h3>
      <p>Company: {job.companyName}</p>
      <p>Salary: {job.salary || "Not specified"}</p>
      <p>Equity: {job.equity || "None"}</p>
    </div>
  );
}

export default JobCard;
