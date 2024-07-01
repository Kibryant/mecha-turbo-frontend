import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { api } from "@/lib/api";
import { router } from "expo-router";
import { checkExpirationDate } from "@/utils/checkExpirationDate";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });

      const { isAdmin, message, status, expirationDate } = response.data;

      if (isAdmin) {
        router.replace("/admin");
        return;
      }

      if (status !== 200) {
        Alert.alert("Erro", message);
        return;
      }

      if (!checkExpirationDate(expirationDate)) {
        Alert.alert("Erro", "Conta expirada.");
        return;
      }

      router.replace("/inicio");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", error.message);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <Link href="/inicio" className="text-blue-500">
        Esqueceu a senha?
      </Link>
      <TextInput
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email"
      />
      <TextInput
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="Senha"
      />
      <Pressable
        className="w-full p-2 bg-blue-500 rounded-md"
        onPress={handleLogin}
      >
        <Text className="text-center text-white font-bold">Acessar</Text>
      </Pressable>
    </View>
  );
};

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
}
