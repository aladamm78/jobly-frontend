import React from "react";

function JobCard({ id, title, salary, equity, companyName }) {
  return (
    <div className="JobCard">
      <h2>{title}</h2>
      <p>Company: {companyName}</p>
      <p>Salary: {salary ? `$${salary}` : "Not specified"}</p>
      <p>Equity: {equity ? equity : "None"}</p>
    </div>
  );
}

export default JobCard;
