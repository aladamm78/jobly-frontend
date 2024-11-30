import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // Authorization token passed in headers
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get list of companies (optionally filtered by search term). */
  static async getCompanies(searchTerm) {
    const res = await this.request("companies", { name: searchTerm });
    return res.companies;
  }

  /** Get details on a specific company by handle. */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs (optionally filtered by search term). */
  static async getJobs(searchTerm) {
    const res = await this.request("jobs", { title: searchTerm });
    return res.jobs;
  }

  /** Apply to a job by job ID. */
  static async applyToJob(jobId) {
    const res = await this.request(`jobs/${jobId}/apply`, {}, "post");
    return res.message;
  }

  /** Register a new user. */
  static async registerUser(userData) {
    const res = await this.request("auth/register", userData, "post");
    return res.token;
  }

  /** Login user and return a token. */
  static async loginUser(loginData) {
    const res = await this.request("auth/token", loginData, "post");
    return res.token;
  }

  /** Get details of the current user by username. */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }
}

// Set token for current user
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYWRhbW03OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjQwMTA2NX0.6mJIqZ0gpcRd1TbJJvWJmx78wNqbkB1T2r_C9uLqfrc";

export default JoblyApi;
