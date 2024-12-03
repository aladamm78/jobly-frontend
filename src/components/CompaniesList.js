import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await JoblyApi.getCompanies();
        setCompanies(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCompanies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await JoblyApi.getCompanies({ nameLike: searchTerm });
      setCompanies(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Companies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {companies.map((c) => (
          <CompanyCard
            key={c.handle}
            handle={c.handle}
            name={c.name}
            description={c.description}
            />
        ))}
      </div>
    </div>
  );
}

export default CompaniesList;
