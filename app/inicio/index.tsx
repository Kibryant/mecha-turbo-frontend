import Button from "@/components/button";
import { logoVertical } from "@/constants/logo";
import { View, Text, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 flex-col items-center justify-between bg-secondary">
        <View className="flex-col items-center gap-y-1 mt-2">
          <Text className="text-2xl font-extrabold text-gray-300">
            Olá, Arthur!
          </Text>
          <Text className="text-lg text-gray-100">
            Seja bem-vindo(a) ao Dna Mecha Turbo.
          </Text>
        </View>
        <View className="w-3/4 flex-col items-center gap-y-2">
          <Text className="text-lg font-bold text-gray-100">
            Escolha a opção desejada
          </Text>
          <Button
            text="Catálogo de Referências"
            href="catalogo-de-referencia"
          />
          <Button text="Criação de Cores" href="criacao-de-cores" />
          <Button text="Enriçãdos e Quadrantes" href="enriçado-quadrantes" />
          <Button text="Gráficos" href="catalogo-de-referencia" />
          <Button text="Testes de Mecha" href="catalogo-de-referencia" />
        </View>

        <Image
          source={logoVertical}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
