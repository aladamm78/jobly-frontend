import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <div>
        <h2>Jobs</h2>
        {company.jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyDetail;
