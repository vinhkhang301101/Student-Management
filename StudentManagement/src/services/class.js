import { CLASS_API } from "../config/api"
import { http } from "../utils/http";

export const classService = {
    getClass() {
        return http.get(`${CLASS_API}`)
    },
    addClass(data) {
        return http.post(`${CLASS_API}/add-class`, data);
    },
    removeClass(data) {
        return http.post(`${CLASS_API}/${data._id}`, data);
    }
}