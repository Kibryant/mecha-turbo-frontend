/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { User } from "@/core/user";
import { isSubscriptionActive } from "@/utils/isSubscriptionActive";

interface Props {
  users: User[];
  deleteUser: (id: string) => void;
  editUser: (user: User) => void;
}

export default function UserList({ users, deleteUser, editUser }: Props) {
  if (!users.length) {
    return (
      <View className="p-4">
        <Text className="text-lg font-headingBold text-primary text-center">
          Nenhum usuário encontrado
        </Text>
      </View>
    );
  }

  return (
    <FlashList
      data={users}
      estimatedItemSize={200}
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
    />
  );
}
