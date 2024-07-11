import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Pressable,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { api } from "@/lib/api";
import { User } from "@/core/user";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { checkExpirationDate } from "@/utils/checkExpirationDate";
import { getToken, removeToken } from "@/lib/secureStore";
import { Ionicons } from "@expo/vector-icons";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [refreshingPage, setRefreshingPage] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = await getToken();

    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data.users);
  };

  const addUser = async () => {
    const token = await getToken();

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
      await api.delete(`/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
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
    <View className="flex-1 bg-secondary px-4">
      <View className="flex-col items-center gap-y-1 mt-4">
        <Text className="text-3xl font-bold text-primary">
          Olá, Administrador!
        </Text>
        <Text className="text-lg text-gray-300">
          Seja bem-vindo(a) ao Painel de Administração.
        </Text>
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

      <Text className="text-2xl font-bold text-gray-100 text-center mt-20">
        {editingUser ? "Editar" : "Adionar"} Usuário
      </Text>

      <View className="flex-col items-center gap-y-4">
        <View className="w-full gap-y-2">
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
              Selecionar Data de Compra
            </Text>
          </TouchableHighlight>
        </View>

        <View className="w-full mb-4 rounded-md gap-y-2">
          {showDatePicker && (
            <DateTimePicker
              value={date}
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

      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View className="border-b-2 border-primary p-4">
            <Text className="text-lg font-bold text-primary">{item.email}</Text>
            <Text className="text-lg font-bold text-gray-300">
              Data de Compra:{" "}
              {new Date(item.purchaseDate).toLocaleDateString("pt-br")}
            </Text>
            <Text className="text-lg font-bold text-gray-300">
              Data de Expiração:{" "}
              {new Date(item.expirationDate).toLocaleDateString("pt-br")}
            </Text>
            <Text
              // className="text-lg font-bold text-gray-100"
              className={`text-lg font-bold ${checkExpirationDate(new Date(item.expirationDate).toDateString()) ? "text-green-500" : "text-red-500"}`}
            >
              Status:{" "}
              {checkExpirationDate(new Date(item.expirationDate).toDateString())
                ? "Ativo"
                : "Expirado"}
            </Text>
            <View className="flex-row gap-x-2">
              <Pressable
                className="bg-red-800 rounded-md py-2 flex-1"
                onPress={() => deleteUser(item._id)}
              >
                <Text className="text-center text-white font-bold">
                  Deletar
                </Text>
              </Pressable>

              <Pressable
                className="border border-primary rounded-md py-2 flex-1"
                onPress={() => editUser(item)}
              >
                <Text className="text-center text-white font-bold">Editar</Text>
              </Pressable>
            </View>
          </View>
        )}
        refreshing={refreshingPage}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
