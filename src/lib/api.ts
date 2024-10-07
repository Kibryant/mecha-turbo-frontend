import Axios from "axios";
import { env } from "./env";

export const api = Axios.create({
  baseURL: env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
