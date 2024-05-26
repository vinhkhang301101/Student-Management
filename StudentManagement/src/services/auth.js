import axios from "axios";
import { USER_API } from "../config/api.js";

export const authService = {
  login(data) {
    return axios.post(`${USER_API}/login`, data);
  },
};
