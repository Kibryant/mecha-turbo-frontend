import { useAuthAdmin } from "@/context/adminAuthContext";
import { User } from "@/core/user";
import { api } from "@/lib/api";
import { editUserSchema, EditUserSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View, Text, Modal, Pressable, TextInput, Alert } from "react-native";

interface EditUserProps {
  user: User;
  showModal: boolean;
  closeModal: () => void;
}

export default function EditUser({
  user,
  showModal,
  closeModal,
}: EditUserProps) {
  const { token } = useAuthAdmin();

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const editUser: SubmitHandler<EditUserSchema> = async ({ name, email }) => {
    try {
      await api.put(
        `/update-user/${user._id}`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert("Sucesso", "Usuário atualizado com sucesso");
      closeModal();
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar o usuário");

      if (error instanceof Error) {
        Alert.alert("Erro", "Erro ao atualizar o usuário");
      }
    }
  };

  return (
    <View className="absolute top-4 right-4">
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-secondary/95">
          <View className="border border-primary w-96 p-4 rounded-lg">
            <Text className="text-xl font-headingBold text-center mb-4 text-gray-100">
              Editar usuário
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Nome"
                  className="border border-gray-300 rounded-md p-2 w-full mb-4 text-gray-300 font-body"
                  placeholderTextColor="#374151"
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text className="text-red-500">{errors.name.message}</Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email"
                  className="border border-gray-300 rounded-md p-2 w-full mb-4 text-gray-300 font-body"
                  placeholderTextColor="#374151"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-500 font-body">
                {errors.email.message}
              </Text>
            )}
            <Pressable
              onPress={handleSubmit(editUser)}
              disabled={isLoading}
              className="bg-primary rounded-md p-2"
            >
              <Text className="text-gray-100 font-body">Editar</Text>
            </Pressable>
            <Pressable
              onPress={closeModal}
              className="bg-red-600 rounded-md p-2 mt-4"
            >
              <Text className="text-gray-100 font-body">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
