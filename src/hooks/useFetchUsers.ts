import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { User } from "@/core/user";
import { Alert } from "react-native";

export interface UserResponse {
  currentPage: number;
  status: number;
  totalPages: number;
  totalUsers: number;
  users: User[];
}

export function useFetchUsers(token: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers() {
    setIsLoading(true);

    try {
      const response = await api.get<UserResponse>(
        `/users?page=${page}&per_page=20`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        const currentUsers = response.data.users;
        setUsers((prev) => [...prev, ...currentUsers]);

        if (response.data.currentPage < response.data.totalPages) {
          setPage((prev) => prev + 1);
        }
      }
    } catch (_) {
      Alert.alert("Error", "Error ao buscar usuários");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    fetchUsers,
    isLoading,
  };
}
