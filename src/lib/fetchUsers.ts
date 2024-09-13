import { api } from "./api";

export const fetchUsers = async (
  token: string,
  page: number = 1,
  limit: number = 20,
) => {
  const response = await api.get("/users", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    users: response.data.users,
    totalPages: response.data.totalPages,
    currentPage: response.data.currentPage,
  };
};
