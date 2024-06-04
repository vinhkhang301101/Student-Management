import { ANNOUNCEMENT_API } from "../config/api";
import { http } from "../utils/http";

export const announcementService = {
  getAnnouncement() {
    return http.get(`${ANNOUNCEMENT_API}`);
  },
  addAnnouncement(data) {
    return http.post(`${ANNOUNCEMENT_API}/create`, data);
  },
  deleteAnnouncement(data) {
    return http.delete(`${ANNOUNCEMENT_API}/delete/${data._id}`, data);
  },
  updateAnnouncement(data) {
    return http.delete(`${ANNOUNCEMENT_API}/update/${data._id}`, data);
  },
};
