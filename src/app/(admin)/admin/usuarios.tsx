import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  Platform,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { api } from "@/lib/api";
import { User } from "@/core/user";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { isSubscriptionActive } from "@/utils/isSubscriptionActive";
import { useAuthAdmin } from "@/context/adminAuthContext";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { createUsersSchema, CreateUserSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import EditUser from "@/components/edit-user";
import { fetchUsers } from "@/lib/fetchUsers";

dayjs().locale("pt-br");

export default function Usuarios() {
  const { token } = useAuthAdmin();

  console.log(token);

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUsersSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchUsersCallback = useCallback(fetchUsers, [token]);

  useEffect(() => {
    fetchUsersCallback(token as string).then((users) => setUsers(users));
  }, [fetchUsersCallback, token]);

  const addUser: SubmitHandler<CreateUserSchema> = async ({
    name,
    email,
    password,
  }) => {
    if (!date) {
      Alert.alert("Erro", "Selecione a data de compra");
      return;
    }

    const purchaseDate = date;
    const expirationDate = dayjs(purchaseDate).add(1, "year").toISOString();

    try {
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
      fetchUsersCallback(token as string).then((users) => setUsers(users));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", "Ocorreu um erro ao adicionar o usuário");
      }

      Alert.alert("Erro", "Ocorreu um erro ao adicionar o usuário");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert("Sucesso", "Usuário deletado com sucesso");
      fetchUsersCallback(token as string).then((users) => setUsers(users));
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

  const editUser = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setShowModal(false);
    fetchUsersCallback(token as string).then((users) => setUsers(users));
  };

  return (
    <ScrollView className="flex-1 bg-secondary px-4">
      <Text className="text-2xl font-headingBold text-gray-100 text-center my-4">
        Adicionar usuário
      </Text>

      <View className="flex-col items-center gap-y-4 w-full">
        <View className="w-full">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                placeholder="Nome do Usuário"
                accessibilityLabel="Nome"
                placeholderTextColor="#374151"
                style={{ color: "#f3f4f6", fontSize: 12 }}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text className="text-red-500">{errors.name.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <TextInput
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                placeholder="Email do Usuário"
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email"
                placeholderTextColor="#374151"
                style={{ color: "#f3f4f6", fontSize: 12 }}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onBlur, onChange } }) => (
              <TextInput
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                placeholder="Senha do Usuário"
                secureTextEntry
                accessibilityLabel="Senha"
                placeholderTextColor="#374151"
                style={{ color: "#f3f4f6", fontSize: 12 }}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}

          <View className="w-full gap-y-2">
            <TouchableHighlight
              onPress={() => setShowDatePicker(true)}
              className="w-full rounded-md p-3 border border-primary"
            >
              <Text className="text-center text-white font-headingBold">
                Selecionar a data de compra
              </Text>
            </TouchableHighlight>
            <Text className="text-xs font-headingBold text-gray-300">
              Data de compra: {date.toLocaleDateString("pt-br")}
            </Text>
          </View>
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
            onPress={handleSubmit(addUser)}
            disabled={isLoading}
          >
            <Text className="text-center text-white font-headingBold">
              Adicionar Usuário
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-col items-center gap-y-2 mt-20">
        <Text className="text-xl font-headingBold text-gray-100">
          Usuários Cadastrados
        </Text>
      </View>

      {users.length === 0 && (
        <Text className="text-lg font-headingBold text-gray-300 text-center mt-4">
          Nenhum usuário cadastrado
        </Text>
      )}

      {users.length > 0 &&
        users.map((user) => (
          <View className="border-b-2 border-primary p-4" key={user.email}>
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
              className={`text-lg font-headingBold ${
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
        ))}

      {editingUser && (
        <EditUser
          user={editingUser}
          showModal={showModal}
          closeModal={closeModal}
        />
      )}
    </ScrollView>
  );
}
