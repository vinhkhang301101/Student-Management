import { USER_API } from "../config/api.js";
import { http } from "../utils/http.js";

export const authService = {
  login(data) {
    return http.post(`${USER_API}/login`, data);
  },
  refreshToken(data) {
    return axios.post(
      `${AUTHENTICATION_API}/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.refreshToken}`,
        },
      }
    );
  },
};
