import axios from "axios";
import Config from "../../config";

const AxiosClient = axios.create({
    baseURL: Config.API.URL
});

export default AxiosClient;
