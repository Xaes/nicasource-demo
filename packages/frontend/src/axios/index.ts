import axios, { AxiosError } from "axios";
import Config from "../../config";
import { logout } from "../services/auth";

const AxiosClient = axios.create({
    baseURL: Config.API.URL
});

AxiosClient.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response) {
        if (error.response.status === 401) {
            logout();
            window.location.replace("/signin");
        } else if (error.response.status < 500) {
            return Promise.reject(error.response.data);
        } else console.error(error);
    } else console.error(error);
})

export default AxiosClient;
