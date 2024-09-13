import React from "react";
import { View, Text } from "react-native";
import { useAuthAdmin } from "@/context/adminAuthContext";
import AddUserForm from "@/components/add-user-form";
import UserList from "@/components/user-list";
import EditUser from "@/components/edit-user";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useUserActions } from "@/hooks/useActionUser";

export default function Usuarios() {
  const { token } = useAuthAdmin();

  const { users, fetchUsers, isLoading } = useFetchUsers(token as string);

  const { addUser, deleteUser, editUser, editingUser, showModal, closeModal } =
    useUserActions(token as string, fetchUsers);

  return (
    <View className="flex-1 bg-secondary px-4">
      <Text className="text-2xl font-headingBold text-gray-100 text-center my-4">
        Adicionar usuário
      </Text>

      <AddUserForm onSubmit={addUser} />

      <UserList
        users={users}
        fetchUsers={fetchUsers}
        deleteUser={deleteUser}
        editUser={editUser}
        isLoading={isLoading}
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
