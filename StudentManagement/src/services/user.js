import { USER_API } from "../config/api.js";
import { http } from "../utils/http.js";

export const userService = {
  register(data) {
    return http.post(`${USER_API}/register`, data);
  },
  getPeople(data) {
    return http.get(`${USER_API}/people`, data);
  },
  getUser(data) {
    return http.get(`${USER_API}`, data);
  },
  getStudentById(id) {
    return http.get(`${USER_API}/student/${id}`);
  },
  getUsers(data) {
    return http.get(`${USER_API}/all`, data);
  },
  getAllStudents(data) {
    return http.get(`${USER_API}/all-students`, data);
  },
  updateProfile(data) {
    return http.put(`${USER_API}`, data);
  },
  updateStudents(data) {
    return http.put(`${USER_API}/update-students`, data);
  },
  deleteStudent(id) {
    return http.delete(`${USER_API}/delete-student/${id}`);
  },
  changePassword(data) {
    return http.put(`${USER_API}/change-password`, data);
  },
  forgotPassword(data) {
    return http.post(`${USER_API}/forgot-password`, data);
  },
  sendEmail(data) {
    return http.post(`${USER_API}/send-email`, data);
  },
};