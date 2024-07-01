import Axios from "axios";

export const api = Axios.create({
  baseURL: "http://10.0.2.2:3333",
  headers: {
    "Content-Type": "application/json",
  },
});
