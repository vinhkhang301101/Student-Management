import { ANNOUNCEMENT_API } from "../config/api";
import { http } from "../utils/http";

export const announcementService = {
  getAnnouncement() {
    return http.get(`${ANNOUNCEMENT_API}`);
  },
  addAnnouncement(data) {
    return http.post(`${ANNOUNCEMENT_API}/create`, data);
  },
};
