import AddUserForm from "@/components/add-user-form";
import { useAuthAdmin } from "@/context/adminAuthContext";
import { useUserActions } from "@/hooks/useActionUser";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { View, Text } from "react-native";

export default function AdicionarUsuario() {
  const { token } = useAuthAdmin();
  const { fetchUsers } = useFetchUsers(token as string);
  const { addUser } = useUserActions(token as string, fetchUsers);
  return (
    <View className="flex-1 bg-secondary px-4">
      <Text className="text-2xl font-headingBold text-gray-100 text-center my-4">
        Adicionar usuário
      </Text>

      <AddUserForm onSubmit={addUser} />
    </View>
  );
}
