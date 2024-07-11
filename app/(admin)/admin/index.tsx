import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { logoVertical } from "@/constants/logo";
import { Image } from "expo-image";
import { useAuthAdmin } from "@/context/adminAuthContext";

export default function Admin() {
  const { signOut } = useAuthAdmin();

  return (
    <View className="flex-1 bg-secondary px-4 items-center justify-between">
      <View className="w-full">
        <View className="flex-col items-center gap-y-1 mt-4">
          <Text className="text-3xl font-bold text-primary">
            Olá, Administrador!
          </Text>
          <Text className="text-lg text-gray-300">
            Seja bem-vindo(a) ao Painel de Administração.
          </Text>
        </View>

        <View className="w-full items-center">
          <Text className="text-2xl font-bold text-gray-100 text-center mt-20">
            O que deseja fazer?
          </Text>

          <Link
            href="/"
            className="p-4 w-full bg-primary rounded-md mt-2"
            asChild
          >
            <Pressable>
              <Text className="text-gray-100 font-bold text-center">
                Acessar o aplicativo
              </Text>
            </Pressable>
          </Link>

          <Link
            href="/admin/usuarios"
            className="p-4 w-full bg-primary rounded-md mt-2"
            asChild
          >
            <Pressable>
              <Text className="text-gray-100 font-bold text-center">
                Visualizar usuários cadastrados
              </Text>
            </Pressable>
          </Link>

          <Link
            href="/admin/configuracoes"
            className="p-4 w-full bg-primary rounded-md mt-2"
            asChild
          >
            <Pressable>
              <Text className="text-gray-100 font-bold text-center">
                Editar dados do administrador
              </Text>
            </Pressable>
          </Link>

          <Pressable
            className="p-4 w-full border border-primary rounded-md mt-2"
            onPress={signOut}
          >
            <Text className="text-gray-100 font-bold text-center">
              Sair da conta
            </Text>
          </Pressable>
        </View>
      </View>

      <Image
        source={logoVertical}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
}
