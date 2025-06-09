import axios from "axios";
import { SpotifyBaseUrl } from "../config/commonConfig";

const api = axios.create({
  baseURL: SpotifyBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return new Promise(() => {});
  }

  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default api;
