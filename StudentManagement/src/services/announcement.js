import axios from "axios";
import { ANNOUNCEMENT_API } from "../config/api";

export const announcementService = {
  getAnnouncement() {
    return axios.get(`${ANNOUNCEMENT_API}`);
  },
  addAnnouncement(data) {
    return axios.post(`${ANNOUNCEMENT_API}/create`, data);
  },
};
