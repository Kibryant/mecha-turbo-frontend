import Axios from "axios";

export const api = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});
