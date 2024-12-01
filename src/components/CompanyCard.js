import React from "react";

import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  if (!company) return <div>No company data available</div>;

  const { handle, name, description } = company;

  return (
    <div className="CompanyCard">
      <Link to={`/companies/${handle}`}>
        <h3>{name || "Unknown Company"}</h3>
      </Link>
      <p>{description || "No description available"}</p>
      <p>Handle: {handle || "No handle provided"}</p>
    </div>
  );
}

export default CompanyCard;
