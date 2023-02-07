import axios from "axios";
import { url } from "../../config/constant";

const instance = axios.create({
    baseURL: url.BASE_URL
})
export default instance