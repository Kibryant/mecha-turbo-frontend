import { View, Text, Pressable, Alert, TextInput } from "react-native";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuthAdmin } from "@/context/adminAuthContext";
import Back from "@/components/back";

export default function Configuracoes() {
  const { token } = useAuthAdmin();
  const [email, setEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const updateAdmin = async () => {
    const response = await api.put(
      "/update-admin",
      {
        oldEmail,
        email,
        password,
        accessCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.status === 200) {
      Alert.alert("Dados atualizados com sucesso!");
      setEmail("");
      setOldEmail("");
      setPassword("");
      setAccessCode("");
    } else {
      Alert.alert("Erro ao atualizar dados.");
    }
  };

  return (
    <View className="bg-secondary flex-1">
      <View className="w-full mt-2">
        <Back to="/admin" />
      </View>
      <View className="flex-col items-center gap-y-1 mt-4">
        <Text className="text-3xl font-bold text-primary text-center">
          Editar Dados do Administrador
        </Text>
        <Text className="text-lg text-gray-300">
          Edite aqui os dados do administrador.
        </Text>
      </View>

      <View className="flex-col items-center gap-y-2 px-3 mt-10">
        <View className="w-full">
          <View className="flex-row items-center gap-x-2">
            <Text className="text-lg font-bold text-gray-100">
              Antigo Email
            </Text>
            <Text className="text-sm font-bold text-red-500">*Obrigatório</Text>
          </View>

          <TextInput
            className="w-full p-2 mb-4 border border-gray-300 rounded-md text-gray-100"
            placeholder="Antigo Email"
            accessibilityLabel="Antigo Email"
            value={oldEmail}
            onChangeText={setOldEmail}
            placeholderTextColor="#374151"
          />
        </View>

        <View className="w-full ">
          <Text className="text-lg font-bold text-gray-100">Novo Email</Text>
          <TextInput
            className="w-full p-2 mb-4 border border-gray-300 rounded-md text-gray-100"
            placeholder="Novo Email"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Novo Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#374151"
          />
        </View>

        <View className="w-full ">
          <Text className="text-lg font-bold text-gray-100">Nova Senha</Text>
          <TextInput
            className="w-full p-2 mb-4 border border-gray-300 rounded-md text-gray-100"
            placeholder="Senha"
            secureTextEntry
            accessibilityLabel="Senha"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#374151"
          />
        </View>

        <View className="w-full ">
          <Text className="text-lg font-bold text-gray-100">
            Novo Código de Acesso
          </Text>
          <TextInput
            className="w-full p-2 mb-4 border border-gray-300 rounded-md text-gray-100"
            placeholder="Código de Acesso"
            secureTextEntry
            accessibilityLabel="Código de Acesso"
            value={accessCode}
            onChangeText={setAccessCode}
            placeholderTextColor="#374151"
          />
        </View>

        <Pressable
          className="w-full bg-emerald-500 rounded-md py-2"
          onPress={updateAdmin}
        >
          <Text className="text-center text-white font-bold">Atualizar</Text>
        </Pressable>
      </View>
    </View>
  );
}
