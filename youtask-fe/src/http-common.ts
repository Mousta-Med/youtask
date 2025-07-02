import axios from "axios";
import { isExpired } from "react-jwt";

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      if (!isExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        localStorage.removeItem("accessToken");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
