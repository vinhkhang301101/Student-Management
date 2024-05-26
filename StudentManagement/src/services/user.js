import axios from "axios";
import { USER_API } from "../config/api.js";

export const userService = {
    register(data) {
        return axios.post(`${USER_API}/register`, data);
    },
    getUser(data) {
        return axios.get(`${USER_API}`, data);
    },
    getAllStudents(data) {
        return axios.get(`${USER_API}/all-students`, data);
    },
    updateProfile(data) {
        return axios.put(`${USER_API}`, data)
    }
}