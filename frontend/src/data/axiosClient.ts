import axios from "axios";
import { API_URL } from "src/config";

const axiosClient = axios.create({
    baseURL: API_URL,
})

axiosClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("authorization")
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    async (error) => {
        Promise.reject(error);
    }
);

export default axiosClient;