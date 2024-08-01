import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { api } from "@/lib/api";
import { User } from "@/core/user";
import dayjs from "dayjs";
import { useAuthAdmin } from "@/context/adminAuthContext";
import { fetchUsers } from "@/lib/fetchUsers";
import AddUserForm from "@/components/add-user-form";
import UserList from "@/components/user-list";
import UserFilter from "@/components/user-filter";
import EditUser from "@/components/edit-user";
import DateRangeFilter from "@/components/date-range-filter";
import { isSameDateOrAfterDate } from "@/utils/isSameDateOrAfterDate";
import { isSameDateOrBeforeDate } from "@/utils/isSameDateOrBeforeDate";

dayjs().locale("pt-br");

export default function Usuarios() {
  const { token } = useAuthAdmin();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const fetchUsersCallback = useCallback(fetchUsers, [token]);

  useEffect(() => {
    fetchUsersCallback(token as string).then((users) => {
      setUsers(users);
      setFilteredUsers(users);
    });
  }, [fetchUsersCallback, token]);

  useEffect(() => {
    let filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase()),
    );

    if (startDate && endDate && isSameDateOrBeforeDate(startDate, endDate)) {
      filtered = filtered.filter((user) => {
        const userPurchaseDate = new Date(user.purchaseDate);
        const userExpirationDate = new Date(user.expirationDate);

        return (
          isSameDateOrAfterDate(userPurchaseDate, startDate) &&
          isSameDateOrBeforeDate(userExpirationDate, endDate) &&
          isSameDateOrBeforeDate(userPurchaseDate, userExpirationDate)
        );
      });
    }

    setFilteredUsers(filtered);
  }, [searchEmail, users, startDate, endDate]);

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
      fetchUsersCallback(token as string).then((users) => setUsers(users));
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
      fetchUsersCallback(token as string).then((users) => setUsers(users));
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
    fetchUsersCallback(token as string).then((users) => setUsers(users));
  };

  return (
    <ScrollView className="flex-1 bg-secondary px-4">
      <Text className="text-2xl font-headingBold text-gray-100 text-center my-4">
        Adicionar usuário
      </Text>

      <AddUserForm onSubmit={addUser} />

      <View className="flex-col items-center gap-y-2 mt-20">
        <Text className="text-xl font-headingBold text-gray-100 mb-4">
          Usuários Cadastrados
        </Text>
        <UserFilter searchEmail={searchEmail} setSearchEmail={setSearchEmail} />
        <DateRangeFilter
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </View>

      <UserList
        users={filteredUsers}
        deleteUser={deleteUser}
        editUser={editUser}
      />

      {editingUser && (
        <EditUser
          user={editingUser}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}
    </ScrollView>
  );
}
