import { useState } from "react";
import { Alert } from "react-native";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import { User } from "@/core/user";

export function useUserActions(token: string, fetchUsersCallback: () => void) {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addUser = async (
    name: string,
    email: string,
    password: string,
    date: Date,
  ) => {
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
          password,
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
      fetchUsersCallback();
    } catch {
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
      fetchUsersCallback();
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
    fetchUsersCallback();
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
