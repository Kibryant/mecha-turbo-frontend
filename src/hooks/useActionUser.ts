import { useState } from "react";
import { Alert } from "react-native";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import type { User } from "@/core/user";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";

export function useUserActions(token: string) {
  const queryClient = useQueryClient();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addUser = async ({
    name,
    email,
    date,
  }: {
    name: string;
    email: string;
    date: Date;
  }) => {
    if (!date) {
      Alert.alert("Erro", "Selecione a data de compra");
      return;
    }

    const purchaseDate = date;
    const expirationDate = dayjs(purchaseDate).add(1, "year").toISOString();

    try {
      await api.post<User>(
        "/add-user",
        {
          name,
          email,
          purchaseDate,
          expirationDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert("Sucesso", "Usuário adicionado com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === HttpStatusCode.Conflict) {
          Alert.alert("Erro", "Usuário já cadastrado");
          return;
        }

        if (error.response?.data) {
          Alert.alert("Erro", error.response.data.message);
          return;
        }
      }

      Alert.alert("Erro", "Ocorreu um erro ao adicionar o usuário");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Sucesso", "Usuário deletado com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });
    } catch {
      Alert.alert("Erro", "Ocorreu um erro ao deletar o usuário");
    }
  };

  const editUser = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setShowModal(false);

    queryClient.invalidateQueries({
      queryKey: ["get-users"],
    });
  };

  return {
    addUser,
    deleteUser,
    editUser,
    editingUser,
    showModal,
    closeModal,
  };
}
