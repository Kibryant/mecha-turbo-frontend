/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { User } from "@/core/user";
import { isSubscriptionActive } from "@/utils/isSubscriptionActive";
import DateRangeFilter from "../date-range-filter";
import UserFilter from "../user-filter";
import { useUserFilter } from "@/hooks/useFilterUsers";

interface Props {
  users: User[];
  isLoading: boolean;
  deleteUser: (id: string) => void;
  editUser: (user: User) => void;
  fetchUsers: () => void;
}

export default function UserList({ users, deleteUser, editUser, fetchUsers, isLoading }: Props) {

  const {
    searchEmail,
    setSearchEmail,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredUsers
  } = useUserFilter(users);

  if (users.length === 0) {
    return (
      <View className="p-4">
        <Text className="text-lg font-headingBold text-primary text-center">
          Nenhum usuário encontrado
        </Text>
      </View>
    );
  }


  return (
    <>
      <FlashList
        data={filteredUsers}
        ListHeaderComponent={() => (
          <View className="flex-col items-center gap-y-2 mt-10">
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
            <Text className="text-sm font-headingBold text-gray-100 text-center my-4">
              Total de usuários: {filteredUsers.length}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        estimatedItemSize={2000}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="border-b-2 border-primary p-4">
            <Text className="text-lg font-headingBold text-primary">
              {item.email}
            </Text>
            <Text className="text-lg font-headingBold text-gray-300">
              Data de compra:{" "}
              {new Date(item.purchaseDate).toLocaleDateString("pt-br")}
            </Text>
            <Text className="text-lg font-headingBold text-gray-300">
              Data de expiração:{" "}
              {new Date(item.expirationDate).toLocaleDateString("pt-br")}
            </Text>
            <Text
              className={`text-lg font-headingBold ${isSubscriptionActive(new Date(item.expirationDate).toDateString())
                ? "text-green-500"
                : "text-red-500"
                }`}
            >
              Status:{" "}
              {isSubscriptionActive(new Date(item.expirationDate).toDateString())
                ? "Ativo"
                : "Expirado"}
            </Text>
            <View className="flex-row gap-x-2">
              <Pressable
                className="bg-primary rounded-md py-2 flex-1"
                onPress={() => deleteUser(item._id)}
              >
                <Text className="text-center text-white font-headingBold">
                  Deletar
                </Text>
              </Pressable>

              <Pressable
                className="border border-primary rounded-md py-2 flex-1"
                onPress={() => editUser(item)}
              >
                <Text className="text-center text-white font-headingBold">
                  Editar
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        onEndReached={fetchUsers}
        onEndReachedThreshold={0.05}
        ListFooterComponent={() => {
          if (!isLoading) return null;

          return (
            <View className="p-4">
              <ActivityIndicator size="large" color="#fe017f" />
            </View>
          );
        }}
      />
    </>

  );
}
