import axios from "axios"
import { CLASS_API } from "../config/api"

export const classService = {
    getClass() {
        return axios.get(`${CLASS_API}`)
    },
    addClass(data) {
        return axios.post(`${CLASS_API}/add-class`, data);
    }
}