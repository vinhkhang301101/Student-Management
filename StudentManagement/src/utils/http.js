import { authService } from "../services/auth";
import axios from "axios";
import { getToken, setToken } from "./token";

export const USER_API = import.meta.env.VITE_USER_API;
export const CLASS_API = import.meta.env.VITE_CLASS_API;
export const ANNOUNCEMENT_API = import.meta.env.VITE_ANNOUNCEMENT_API;

let refreshTokenPromise = null;

export const http = axios.create();

http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (error) => {
    try {
      if (
        error.response.status === 403 &&
        error.response.data.error_code === "TOKEN_EXPIRED"
      ) {
        if (refreshTokenPromise) {
          await refreshTokenPromise;
        } else {
          // refresh token
          console.log("refreshToken");
          const token = getToken();
          const refreshTokenPromise = await authService.refreshToken({
            refreshToken: token.refreshToken,
          });

          const res = await refreshTokenPromise;

          setToken(res.data);
        }
        return http(error.config);
      }
    } catch (error) {}
    throw error;
  }
);

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
  }
  return config;
});
