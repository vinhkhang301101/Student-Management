import { ANNOUNCEMENT_API } from "../config/api";
import { http } from "../utils/http";

export const announcementService = {
  getAnnouncement() {
    return http.get(`${ANNOUNCEMENT_API}`);
  },
  getAnnouncementById(id) {
    return http.get(`${ANNOUNCEMENT_API}/${id}`);
  },
  addAnnouncement(data) {
    return http.post(`${ANNOUNCEMENT_API}/create`, data);
  },
  deleteAnnouncement(id) {
    return http.delete(`${ANNOUNCEMENT_API}/delete/${id}`);
  },
  updateAnnouncement(data) {
    return http.put(`${ANNOUNCEMENT_API}/update`, data);
  },
};
