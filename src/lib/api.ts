import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://mecha-turbo-backend.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
