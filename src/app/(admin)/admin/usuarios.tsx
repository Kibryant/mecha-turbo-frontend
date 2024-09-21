import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useAuthAdmin } from "@/context/adminAuthContext";
import UserList from "@/components/user-list";
import EditUser from "@/components/edit-user";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useUserActions } from "@/hooks/useActionUser";

export default function Usuarios() {
  const { token } = useAuthAdmin();

  const { users, fetchUsers, isLoading, isFetchingNextPage } = useFetchUsers(
    token as string,
  );

  const { deleteUser, editUser, editingUser, showModal, closeModal } =
    useUserActions(token as string);

  if (isLoading) {
    return (
      <View className="flex-1 bg-secondary px-4 justify-center items-center">
        <ActivityIndicator size="large" color="#fe017f" />
      </View>
    );
  }

  if (!users) {
    return (
      <View className="flex-1 bg-secondary px-4 justify-center items-center">
        <Text className="text-xl font-headingBold text-gray-100">
          Nenhum usuário encontrado
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary px-4">
      <UserList
        users={users}
        fetchUsers={fetchUsers}
        deleteUser={deleteUser}
        editUser={editUser}
        isLoading={isFetchingNextPage}
      />

      {editingUser && (
        <EditUser
          user={editingUser}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}
    </View>
  );
}
