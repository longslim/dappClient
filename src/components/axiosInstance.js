import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:7000/api/v1",
    withCredentials: true,
    timeout: 30000
});


export default api;