import { api } from "./api";

export const fetchUsers = async (token: string) => {
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.users;
};
