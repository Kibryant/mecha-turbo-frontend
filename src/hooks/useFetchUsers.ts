import { api } from "@/lib/api";
import { User } from "@/core/user";
import { Alert } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FIVE_MINUTES_IN_MS } from "@/constants/five-minutes-in-ms";

export interface UserResponse {
  currentPage: number;
  status: number;
  totalPages: number;
  totalUsers: number;
  users: User[];
  hasMore: boolean;
  nextPage: number;
  prevPage: number;
}

export function useFetchUsers(token: string) {
  async function fetchUsers({ page }: { page: number }) {
    const response = await api.get<UserResponse>(
      `/users?page=${page}&per_page=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.status !== 200) {
      Alert.alert("Error", "Error ao buscar usuários");
      return response.data;
    }

    return response.data;
  }

  const { isLoading, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-users"],
      queryFn: ({ pageParam }) => fetchUsers({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : null,
      getPreviousPageParam: (firstPage) => firstPage.prevPage,
      staleTime: FIVE_MINUTES_IN_MS,
    });

  return {
    users: data?.pages.flatMap((page) => page.users) ?? [],
    fetchUsers: fetchNextPage,
    isLoading,
    isFetchingNextPage,
  };
}
