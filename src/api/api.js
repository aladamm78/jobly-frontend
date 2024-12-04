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
  static async login(username, password) {
    let res = await this.request(`auth/token`, { username, password }, "post");
    return res.accessToken;
  }

  static async register(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    return res.token;
  }

  /** Company Routes */
  static async getCompanies(filters = {}) {
    let res = await this.request(`companies`, filters);
    return res.companies;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Job Routes */
  static async getJobs(filters = {}) {
    let res = await this.request(`jobs`, filters);
    return res.jobs;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** User Routes */
  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(username, userData) {
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }

  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }
}

// Ensure the token is dynamically updated elsewhere in the app
JoblyApi.token = null;

export default JoblyApi;
