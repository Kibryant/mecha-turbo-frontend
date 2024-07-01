import Button from "@/components/button";
import { View, Text } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View
        className="flex-1 flex-col items-center justify-between bg-gray-100"
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-col items-center gap-y-1">
          <Text className="text-2xl font-bold">Olá, Arthur!</Text>
          <Text className="text-lg text-gray-500">
            Seja bem-vindo(a) ao Dna Mecha Turbo.
          </Text>
        </View>
        <View className="w-3/4 flex-col items-center gap-y-2">
          <Text className="text-lg font-bold">Escolha a opção desejada</Text>
          <Button
            text="Catálogo de Referências"
            href="catalogo-de-referencia"
          />
          <Button text="Criação de Cores" href="criacao-de-cores" />
          <Button text="Enriçãdos e Quadrantes" href="enriçado-quadrantes" />
          <Button text="Gráficos" href="catalogo-de-referencia" />
          <Button text="Testes de Mecha" href="catalogo-de-referencia" />
        </View>
        <Text className="text-2xl font-bold mb-4">LOGO</Text>
      </View>
    </SafeAreaProvider>
  );
}
