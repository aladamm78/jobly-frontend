import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";

/** CompanyList Component
 *
 * Displays a list of companies.
 * Fetches companies from the API on mount or search.
 *
 * Routes -> CompanyList -> { CompanyCard, SearchForm }
 */
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companies = await JoblyApi.getCompanies();
        setCompanies(companies || []); // Ensure companies is an array
        setError(null);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  /** Handle search form submission */
  async function search(searchTerm) {
    setIsLoading(true);
    try {
      const companies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(companies || []); // Ensure companies is an array
      setError(null);
    } catch (err) {
      console.error("Error searching companies:", err);
      setError("Search failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <p>Loading companies...</p>;

  if (error) return <p className="alert alert-danger">{error}</p>;

  if (companies.length === 0) return <p>No companies found.</p>;

  return (
    <div className="CompanyList">
      <SearchForm search={search} />
      {companies.map((company) => (
        <CompanyCard
          key={company.handle}
          handle={company.handle}
          name={company.name}
          description={company.description}
          logoUrl={company.logoUrl}
        />
      ))}
    </div>
  );
}

export default CompanyList;
