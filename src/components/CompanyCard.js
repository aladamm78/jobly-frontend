import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${handle}`}>
        <h2>{name}</h2>
        <p>{description}</p>
        {logoUrl && <img src={logoUrl} alt={`${name} logo`} />}
      </Link>
    </div>
  );
}

export default CompanyCard;
