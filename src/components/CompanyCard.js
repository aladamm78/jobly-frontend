import React from "react";
import { Link } from "react-router-dom";
import "../styles/CompanyCard.css";

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <div className="company-card">
      <Link to={`/companies/${handle}`} className="company-card-link">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className="company-card-logo"
          />
        )}
        <h2>{name}</h2>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default CompanyCard;
