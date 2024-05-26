import axios from "axios"

export const USER_API = import.meta.env.VITE_USER_API;
export const CLASS_API = import.meta.env.VITE_CLASS_API;
export const ANNOUNCEMENT_API = import.meta.env.VITE_ANNOUNCEMENT_API;


export const api = axios.create()
api.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    throw error
})