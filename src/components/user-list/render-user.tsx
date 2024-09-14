/* eslint-disable prettier/prettier */

import { User } from "@/core/user";
import { isSubscriptionActive } from "@/utils/isSubscriptionActive";
import { View, Pressable, Text } from "react-native";

interface RenderUserProps {
  user: User;
  deleteUser: (id: string) => void;
  editUser: (user: User) => void;
}

export function RenderUser({ user, deleteUser, editUser }: RenderUserProps) {
  return (
    <View className="border-b-2 border-primary p-4">
      <Text className="text-lg font-headingBold text-primary">
        {user.email}
      </Text>
      <Text className="text-lg font-headingBold text-gray-300">
        Data de compra:{" "}
        {new Date(user.purchaseDate).toLocaleDateString("pt-br")}
      </Text>
      <Text className="text-lg font-headingBold text-gray-300">
        Data de expiração:{" "}
        {new Date(user.expirationDate).toLocaleDateString("pt-br")}
      </Text>
      <Text
        className={`text-lg font-headingBold ${isSubscriptionActive(new Date(user.expirationDate).toDateString())
          ? "text-green-500"
          : "text-red-500"
          }`}
      >
        Status:{" "}
        {isSubscriptionActive(new Date(user.expirationDate).toDateString())
          ? "Ativo"
          : "Expirado"}
      </Text>
      <View className="flex-row gap-x-2">
        <Pressable
          className="bg-primary rounded-md py-2 flex-1"
          onPress={() => deleteUser(user._id)}
        >
          <Text className="text-center text-white font-headingBold">
            Deletar
          </Text>
        </Pressable>

        <Pressable
          className="border border-primary rounded-md py-2 flex-1"
          onPress={() => editUser(user)}
        >
          <Text className="text-center text-white font-headingBold">
            Editar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
