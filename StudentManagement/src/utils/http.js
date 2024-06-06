import { authService } from "../services/auth";
import axios from "axios";
import { getToken, setToken } from "./token";
import { handleError } from "./handleError";

export const USER_API = import.meta.env.VITE_USER_API;
export const CLASS_API = import.meta.env.VITE_CLASS_API;
export const ANNOUNCEMENT_API = import.meta.env.VITE_ANNOUNCEMENT_API;

let refreshTokenPromise = null;

export const http = axios.create();

http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    if (err.response.status === 403 & err.response.data.message === "Token is expired!") {
        try {
            const curRefreshToken = getToken().refreshToken
            const resToken = await authService.refreshToken({
              refreshToken: curRefreshToken,
            });
            setToken({
              accessToken: resToken.data.accessToken,
              refreshToken: curRefreshToken
            })
            return api(err.config)
        } catch (error) {
            message.error('Your login session is expired!')
            clearToken()
            clearUser()
            setTimeout(() => {
                window.location.reload('/')
            }, 2000)
        }
    } else {
        console.log(err);
        handleError(err)
        throw err
    }
}
);

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
  }
  return config;
});
