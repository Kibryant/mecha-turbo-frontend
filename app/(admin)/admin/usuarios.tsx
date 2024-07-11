import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { api } from "@/lib/api";
import { User } from "@/core/user";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { isSubscriptionActive } from "@/utils/isSubscriptionActive";
import { Ionicons } from "@expo/vector-icons";
import { useAuthAdmin } from "@/context/adminAuthContext";

export default function Usuarios() {
  const { token } = useAuthAdmin();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [, setRefreshingPage] = useState(false);

  const fetchUsers = useCallback(async () => {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data.users);
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async () => {
    if (!date) {
      Alert.alert("Erro", "Selecione a data de compra");
      return;
    }

    const purchaseDate = date.toISOString();
    const expirationDate = dayjs(purchaseDate).add(1, "year").toISOString();

    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      if (editingUser) {
        await api.put(
          `/update-user/${editingUser._id}`,
          {
            email,
            purchaseDate,
            expirationDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setEditingUser(null);
        Alert.alert("Sucesso", "Usuário atualizado com sucesso");
      } else {
        await api.post<User>(
          "/add-user",
          {
            name,
            email,
            password,
            purchaseDate,
            expirationDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        Alert.alert("Sucesso", "Usuário adicionado com sucesso");
      }
      setEmail("");
      setName("");
      setDate(null);
      fetchUsers();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar/atualizar o usuário");
      console.error(error);
    }
  };

  const editUser = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setDate(new Date(user.purchaseDate));
    setEditingUser(user);
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const handleRefresh = () => {
    setRefreshingPage(true);
    fetchUsers();
    setRefreshingPage(false);
  };

  return (
    <ScrollView className="flex-1 bg-secondary px-4">
      <Text className="text-2xl font-bold text-gray-100 text-center mt-2">
        {editingUser ? "Editar Usuário" : "Adicionar Usuário"}
      </Text>

      <View className="flex-col items-center gap-y-4 w-full">
        <View className="w-full gap-y-2">
          <TextInput
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nome do Usuário"
            accessibilityLabel="Nome"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#374151"
            style={{ color: "#f3f4f6", fontSize: 12 }}
          />
          <TextInput
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Email do Usuário"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#374151"
            style={{ color: "#f3f4f6", fontSize: 12 }}
          />
          <TextInput
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Senha do Usuário"
            secureTextEntry
            accessibilityLabel="Senha"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#374151"
            style={{ color: "#f3f4f6", fontSize: 12 }}
            editable={!editingUser}
          />
          <TouchableHighlight
            onPress={() => setShowDatePicker(true)}
            className="w-full rounded-md p-3 border border-primary"
          >
            <Text className="text-center text-white font-bold">
              {date
                ? date.toLocaleDateString("pt-br")
                : "Selecionar Data de Compra"}
            </Text>
          </TouchableHighlight>
        </View>

        <View className="w-full mb-4 rounded-md gap-y-2">
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <Pressable
            className="w-full bg-primary rounded-md py-2"
            onPress={addUser}
          >
            <Text className="text-center text-white font-bold">
              {editingUser ? "Editar" : "Adicionar"}
            </Text>
          </Pressable>

          {editingUser && (
            <Pressable
              className="w-full bg-red-500 rounded-md py-2"
              onPress={() => setEditingUser(null)}
            >
              <Text className="text-center text-white font-bold">Cancelar</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View className="flex-col items-center gap-y-2 mt-20">
        <Text className="text-xl font-bold text-gray-100">
          Usuários Cadastrados
        </Text>
      </View>

      {users.length === 0 && (
        <Text className="text-lg font-bold text-gray-300 text-center mt-4">
          Nenhum usuário cadastrado
        </Text>
      )}

      <TouchableOpacity
        className="bg-primary rounded-full w-10 h-10 mt-4 items-center justify-center"
        onPress={handleRefresh}
      >
        <Ionicons name="refresh" size={24} color="#f3f4f6" />
      </TouchableOpacity>

      {users.length > 0 &&
        users.map((user) => (
          <View className="border-b-2 border-primary p-4" key={user.email}>
            <Text className="text-lg font-bold text-primary">{user.email}</Text>
            <Text className="text-lg font-bold text-gray-300">
              Data de Compra:{" "}
              {new Date(user.purchaseDate).toLocaleDateString("pt-br")}
            </Text>
            <Text className="text-lg font-bold text-gray-300">
              Data de Expiração:{" "}
              {new Date(user.expirationDate).toLocaleDateString("pt-br")}
            </Text>
            <Text
              className={`text-lg font-bold ${
                isSubscriptionActive(
                  new Date(user.expirationDate).toDateString(),
                )
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Status:{" "}
              {isSubscriptionActive(
                new Date(user.expirationDate).toDateString(),
              )
                ? "Ativo"
                : "Expirado"}
            </Text>
            <View className="flex-row gap-x-2">
              <Pressable
                className="bg-primary rounded-md py-2 flex-1"
                onPress={() => deleteUser(user._id)}
              >
                <Text className="text-center text-white font-bold">
                  Deletar
                </Text>
              </Pressable>

              <Pressable
                className="border border-primary rounded-md py-2 flex-1"
                onPress={() => editUser(user)}
              >
                <Text className="text-center text-white font-bold">Editar</Text>
              </Pressable>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}
