import { MESSAGE_API } from "../config/api";
import { http } from "../utils/http";

export const chatService = {
  getFullChats(id) {
    return http.get(`${MESSAGE_API}/${id}`);
  },
};
