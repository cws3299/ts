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
  request.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;

  return request;
});

export default api;
