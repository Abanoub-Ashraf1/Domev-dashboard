import { endpoints } from "../config/endpoints";
import { ApiError, callEndpoint } from "./apiClient";

export const authService = {
  async login(email, password) {
    try {
      const data = await callEndpoint(endpoints.login, { body: { email, password }, public: true });
      if (!data?.access_token) throw new ApiError("The server didn't return a session token.");
      return { token: data.access_token, user: data.user ?? { email } };
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        throw new ApiError("Incorrect email or password.", { status: error.status });
      }
      throw error;
    }
  },

  getProfile() {
    return callEndpoint(endpoints.profile);
  },
};
