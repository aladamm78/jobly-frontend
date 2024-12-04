import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import "../styles/Titles.css"



function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const res = await JoblyApi.getCompanies({ name: searchTerm });
      setCompanies(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Companies</h1>
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
