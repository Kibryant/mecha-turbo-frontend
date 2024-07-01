import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Pressable,
  Platform,
} from "react-native";
import { api } from "@/lib/api";
import { User } from "@/core/user";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { checkExpirationDate } from "@/utils/checkExpirationDate";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await api.get("/users");

    setUsers(response.data);
  };

  const addUser = async () => {
    const purchaseDate = date.toISOString();
    const expirationDate = dayjs(purchaseDate).add(1, "year").toISOString();

    try {
      if (editingUser) {
        await api.put(`/update-user/${editingUser._id}`, {
          email,
          purchaseDate,
          expirationDate,
        });
        setEditingUser(null);
        Alert.alert("Sucesso", "Usuário atualizado com sucesso");
      } else {
        await api.post<User>("/add-user", {
          email,
          password,
          purchaseDate,
          expirationDate,
        });
        Alert.alert("Sucesso", "Usuário adicionado com sucesso");
      }
      setEmail("");
      fetchUsers();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar/atualizar o usuário");
      console.error(error);
    }
  };

  const editUser = (user: User) => {
    setEmail(user.email);
    setDate(new Date(user.purchaseDate));
    setEditingUser(user);
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/delete-user/${id}`);
      Alert.alert("Sucesso", "Usuário deletado com sucesso");
      fetchUsers();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao deletar o usuário");
      console.error(error);
    }
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <View className="px-3">
        <View className="flex-col items-center gap-y-1">
          <Text className="text-2xl font-bold">Olá, Administrador!</Text>
        </View>

        {/* <View className="flex-col items-center gap-y-2 px-3">
          <Text className="text-lg font-bold">Adicionar Usuário</Text>
          <TextInput
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email"
          />
          <TextInput
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            placeholder="Senha"
            secureTextEntry
            accessibilityLabel="Senha"
          />
          <Pressable
            className="w-full bg-emerald-500 rounded-md py-2"
            onPress={() => Alert.alert("Adicionado com sucesso!")}
          >
            <Text className="text-center text-white font-bold">Adicionar</Text>
          </Pressable>
        </View> */}

        {users.length === 0 && (
          <Text className="text-center"> Nenhum usuário cadastrado</Text>
        )}

        <View className="flex-col items-center gap-y-2">
          <TextInput
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Email do Usuário"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Senha do Usuário"
            secureTextEntry
            accessibilityLabel="Senha"
            value={password}
            onChangeText={setPassword}
          />
          <View className="w-full mb-4 border border-gray-300 rounded-md gap-y-2">
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="w-full bg-emerald-500 rounded-md py-2"
            >
              <Text className="text-center text-white font-bold">
                Selecionar Data de Compra
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <Pressable
              className="w-full bg-blue-500 rounded-md py-2"
              onPress={addUser}
            >
              <Text className="text-center text-white font-bold">
                {editingUser ? "Editar" : "Adicionar"}
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-col items-center gap-y-2 mt-20">
          <Text className="text-xl font-bold">Usuários Cadastrados</Text>
        </View>

        <FlatList
          data={users}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <View className="border-b-2 border-blue-900 p-4">
              <Text className="text-lg font-bold">{item.email}</Text>
              <Text className="text-lg font-bold">
                Data de Compra:{" "}
                {new Date(item.purchaseDate).toLocaleDateString()}
              </Text>
              <Text className="text-lg font-bold">
                Data de Expiração:{" "}
                {new Date(item.expirationDate).toLocaleDateString()}
              </Text>
              <Text className="text-lg font-bold">
                Status:{" "}
                {checkExpirationDate(
                  new Date(item.expirationDate).toDateString(),
                )
                  ? "Ativo"
                  : "Expirado"}
              </Text>
              <View className="flex-row gap-x-2">
                <Pressable
                  className="bg-red-500 rounded-md py-2 flex-1"
                  onPress={() => deleteUser(item._id)}
                >
                  <Text className="text-center text-white font-bold">
                    Deletar
                  </Text>
                </Pressable>

                <Pressable
                  className="bg-yellow-500 rounded-md py-2 flex-1"
                  onPress={() => editUser(item)}
                >
                  <Text className="text-center text-white font-bold">
                    Editar
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
