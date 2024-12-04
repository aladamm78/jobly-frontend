import React from "react";
import "../styles/JobCard.css"


function JobCard({ id, title, salary, equity, companyName, hasApplied, onApply }) {
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>Company: {companyName}</p>
      <p>Salary: {salary ? `$${salary}` : "Not specified"}</p>
      <p>Equity: {equity ? equity : "None"}</p>
      <button onClick={() => onApply(id)}>Apply</button> {/* Add onClick handler */}
    </div>
  );
}

export default JobCard;
