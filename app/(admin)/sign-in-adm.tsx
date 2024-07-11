import { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { logoVertical } from "@/constants/logo";
import { useAuthAdmin } from "@/context/adminAuthContext";

const LoginScreen = () => {
  const router = useRouter();

  const { signIn } = useAuthAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const handleLogin = async () => {
    await signIn({ accessCode, email, password });

    router.replace("/admin");
  };

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
            Faça login para acessar o painel administrativo.
          </Text>
        </View>

        <View className="w-full flex-row justify-between">
          <Link href="/admin" className="text-primary mb-2 text-center">
            Esqueceu a senha?
          </Link>
          <Link href="/sign-in" className="text-primary mb-2 text-center">
            Acessar como Usuário
          </Link>
        </View>

        <View className="w-full">
          <TextInput
            className="w-full px-2 py-3 mb-4 border rounded-md border-gray-700"
            placeholder="Código de Acesso"
            value={accessCode}
            onChangeText={setAccessCode}
            secureTextEntry
            accessibilityLabel="Código de Acesso"
            placeholderTextColor="#374151"
            style={{ color: "#f3f4f6", fontSize: 12 }}
          />
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
