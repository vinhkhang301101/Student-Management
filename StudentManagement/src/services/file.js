import { FILE_API } from "../config/api.js";
import { http } from "../utils/http.js";

export const fileService = {
  upload(data) {
    return http.post(`${FILE_API}/upload`, data);
  },
  getFile(filename) {
    return http.post(`${FILE_API}/${filename}`);
  },
};
