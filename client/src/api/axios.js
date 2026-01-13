import axios from "axios";
const api = axios.create({
  baseURL: "https://gigflow-backend-kc01.onrender.com/api",
  withCredentials:true
});

export default api;
