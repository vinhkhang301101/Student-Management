import { CLASS_API } from "../config/api"
import { http } from "../utils/http";

export const classService = {
  getClass() {
    return http.get(`${CLASS_API}`);
  },
  getClassById(id) {
    return http.get(`${CLASS_API}/${id}`);
  },
  addClass(data) {
    return http.post(`${CLASS_API}/add-class`, data);
  },
  removeClass(id) {
    return http.delete(`${CLASS_API}/delete/${id}`);
  },
  updateClass(data) {
    return http.put(`${CLASS_API}/update`, data);
  },
};