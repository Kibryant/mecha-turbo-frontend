import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://3c67-45-165-125-84.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});
