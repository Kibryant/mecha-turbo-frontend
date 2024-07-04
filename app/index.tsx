import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { api } from "@/lib/api";
import { router } from "expo-router";
import { checkExpirationDate } from "@/utils/checkExpirationDate";
import { logoVertical } from "@/constants/logo";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

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
    <View className="flex-1 items-center justify-center p-4">
      <View className="absolute top-0 left-2">
        <Image source={logoVertical} style={{ width: 100, height: 100 }} />
      </View>

      <View className="justify-center items-center">
        <Text className="text-2xl font-bold mb-1 text-gray-100">
          Boas-Vindas!
        </Text>
        <Text className="text-gray-100 mb-4">
          Faça login para acessar o sistema.
        </Text>
      </View>

      <Link href="/inicio" className="text-primary mb-2">
        Esqueceu a senha?
      </Link>

      <View className="w-full">
        <TextInput
          className="w-full p-2 mb-4 border rounded-md border-gray-700"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email"
          placeholderTextColor="#374151"
          style={{ color: "#f3f4f6", fontSize: 12 }}
        />
      </View>

      <View className="w-full">
        <TextInput
          className="w-full p-2 mb-4 border rounded-md border-gray-700"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Senha"
          placeholderTextColor="#374151"
          style={{ color: "#f3f4f6", fontSize: 12 }}
        />
      </View>

      <Pressable
        className="w-full px-2 py-3 bg-primary rounded-md"
        onPress={handleLogin}
      >
        <Text className="text-center text-white font-bold">Acessar</Text>
      </Pressable>
    </View>
  );
};

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-secondary">
      <LoginScreen />
    </SafeAreaView>
  );
}
