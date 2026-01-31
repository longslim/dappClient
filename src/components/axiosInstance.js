// import axios from "axios";


// const api = axios.create({
//     baseURL: "https://dappserver-zugf.onrender.com/api/v1",
//     withCredentials: true,
//     timeout: 30000
// });


// export default api;






import axios from "axios";

const api = axios.create({
  baseURL: "https://dappserver-zugf.onrender.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
