import axios from "axios";
const api = axios.create({
  baseURL: "https://gigflow-backend-wj2p.onrender.com/api",
  withCredentials:true
});

export default api;
