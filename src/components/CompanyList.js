import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await JoblyApi.getCompanies(searchTerm);
        setCompanies(res);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompanies();
  }, [searchTerm]);

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Search for a company..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {companies.map((company) => (
        <CompanyCard key={company.handle} company={company} />
      ))}
    </div>
  );
}

export default CompanyList;
