import React from "react";

function CompanyCard({ company }) {
  if (!company) return <div>No company data available</div>;

  const { handle, name, description, logoUrl } = company;

  return (
    <div className="CompanyCard">
      <h3>{name || "Unknown Company"}</h3>
      <p>{description || "No description available"}</p>
      <p>Handle: {handle || "No handle provided"}</p>
    </div>
  );
}


export default CompanyCard;
