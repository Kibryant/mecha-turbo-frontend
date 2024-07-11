import { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, useRouter } from "expo-router";
import { logoVertical } from "@/constants/logo";
import { useAuthUser } from "@/context/userAuthContext";
import { User } from "@/core/user";

const LoginScreen = () => {
  const router = useRouter();

  const { signIn, user } = useAuthUser();
  const userObject: User = JSON.parse(user || "{}");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { success } = await signIn({ email, password });

    if (!success) {
      return;
    }

    router.replace("/");
  };

  if (userObject._id) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View>
        <Image source={logoVertical} style={{ width: 300, height: 300 }} />
      </View>

      <View className="w-full">
        <View className="justify-center items-center">
          <Text className="text-2xl font-bold mb-1 text-gray-100">
            Boas-Vindas!
          </Text>
          <Text className="text-gray-100 mb-4">
            Faça login para acessar o sistema.
          </Text>
        </View>

        <View className="w-full flex-row justify-between">
          <Link href="/" className="text-primary mb-2 text-center">
            Esqueceu a senha?
          </Link>
          <Link href="/sign-in-adm" className="text-primary mb-2 text-center">
            Acessar como Administrador
          </Link>
        </View>

        <View className="w-full">
          <TextInput
            className="w-full px-2 py-3 mb-4 border rounded-md border-gray-700"
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
            className="w-full px-2 py-3 mb-4 border rounded-md border-gray-700"
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
