import React from "react";
import { View, TextInput } from "react-native";

interface Props {
  searchEmail: string;
  setSearchEmail: (name: string) => void;
}

export default function UserFilter({ searchEmail, setSearchEmail }: Props) {
  return (
    <View className="w-full mb-3">
      <TextInput
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
        placeholder="Buscar por email"
        placeholderTextColor="#374151"
        style={{ color: "#f3f4f6", fontSize: 12 }}
        value={searchEmail}
        onChangeText={setSearchEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email"
      />
    </View>
  );
}
