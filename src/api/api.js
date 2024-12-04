import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 */

class JoblyApi {
  // Token for interacting with the API
  static token;

  /** Send a request to the backend API */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

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

  /** Auth Routes */
  
  // Login
  static async login(username, password) {
    let res = await this.request(`auth/token`, { username, password }, "post");
    return res.accessToken;
  }

  // Register
  static async register(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    return res.token;
  }

  // Refresh Token
  static async refreshToken() {
    let res = await this.request(`auth/refresh`);
    return res.accessToken;
  }

  // Logout (if required for clearing server-side refresh tokens)
  static async logout() {
    await this.request(`auth/logout`, {}, "post");
  }

  /** Company Routes */
  
  // Get all companies
  static async getCompanies(filters = {}) {
    let res = await this.request(`companies`, filters);
    return res.companies;
  }

  // Get a single company
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Add a new company (admin only)
  static async addCompany(companyData) {
    let res = await this.request(`companies`, companyData, "post");
    return res.company;
  }

  /** Job Routes */
  
  // Get all jobs with optional filters
  static async getJobs(filters = {}) {
    let res = await this.request(`jobs`, filters);
    return res.jobs;
  }

  // Get a single job
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  // Add a new job (admin only)
  static async addJob(jobData) {
    let res = await this.request(`jobs`, jobData, "post");
    return res.job;
  }

  /** User Routes */
  
  // Get all users (admin only)
  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  // Get a single user
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Update a user
  static async updateUser(username, userData) {
    console.log("Data being sent to backend:", userData); // Debug request body
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  // Delete a user
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }

  // Apply for a job
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }

  static async getCompany(companyId) {
    const res = await this.request(`companies/${companyId}`);
    return res.company;
  }
}

// Set an initial token for testing (can be dynamically updated)
JoblyApi.token = null;

export default JoblyApi;
