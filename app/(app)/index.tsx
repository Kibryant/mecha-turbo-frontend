import Button from "@/components/button";
import { logoVertical } from "@/constants/logo";
import { useAuthAdmin } from "@/context/adminAuthContext";
import { useAuthUser } from "@/context/userAuthContext";
import { User } from "@/core/user";
import { Link } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";

export default function Home() {
  const { user, signOut } = useAuthUser();
  const { token } = useAuthAdmin();

  const userObject: User = JSON.parse(user || "null");

  return (
    <View className="flex-1 flex-col items-center justify-between bg-secondary">
      <View className="flex-col items-center gap-y-1 mt-2">
        <Text className="text-2xl font-extrabold text-gray-100">
          Olá, {token ? "Administrador!" : null}{" "}
          {userObject ? `${userObject.name}!` : null}
        </Text>
        <Text className="text-lg text-gray-300">
          Seja bem-vindo(a) ao Dna Mecha Turbo.
        </Text>
      </View>

      <View className="w-3/4 flex-col items-center gap-y-2">
        <Text className="text-lg font-bold text-gray-300">
          Escolha a opção desejada
        </Text>
        <Button text="Catálogo de Referências" href="catalogo-de-referencia" />
        <Button text="Criação de Cores" href="criacao-de-cores" />
        <Button text="Eriçados e Quadrantes" href="ericado-quadrantes" />
        <Button text="Gráficos" href="graficos" />
        <Button text="Teste de Mecha" href="teste-de-mecha" />
        {token && (
          <Link
            href="/admin"
            className="p-4 w-full border border-primary rounded-md mt-2"
            asChild
          >
            <Pressable>
              <Text className="text-gray-100 font-bold text-center">
                Voltar ao painel administrativo
              </Text>
            </Pressable>
          </Link>
        )}
        {userObject && (
          <Pressable
            onPress={signOut}
            className="p-4 w-full border border-primary rounded-md mt-2"
          >
            <Text className="text-gray-100 font-bold text-center">
              Sair da conta
            </Text>
          </Pressable>
        )}
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
