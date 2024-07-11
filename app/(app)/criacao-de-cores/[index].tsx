import Back from "@/components/back";
import { arrayOfImage } from "@/constants/arrayOfImages";
import { hairTechniques } from "@/constants/hairTechniques";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Referencia() {
  const insets = useSafeAreaInsets();

  const { index } = useLocalSearchParams();

  const hairTechnique = hairTechniques[parseInt(index as string)];

  const image = arrayOfImage[parseInt(index as string)];

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View
          style={{
            paddingBottom: insets.bottom,
          }}
          className="flex-1 flex-col items-center"
        >
          <View className="w-full mt-4">
            <Back to="/inicio/criacao-de-cores" />
          </View>
          <View className="mt-4">
            <Text className="text-3xl font-bold text-center">Vanilla</Text>
          </View>
          <View className="mt-2 w-full px-3">
            <Image
              source={image}
              className="w-full h-96 object-cover rounded-md"
            />
          </View>
          <View className="w-full justify-end px-3 mt-4">
            <View>
              <Text className="text-xl font-bold">Receita</Text>
              <View className="mt-1">
                <Text className="font-semibold">
                  - {hairTechnique.name} - Fundo {hairTechnique.base}
                </Text>
                <Text className="font-semibold">
                  - Fundo de Clareamento {hairTechnique.base}
                </Text>
                <Text className="font-semibold">
                  - Ideal Para Cor Natural{" "}
                  {hairTechnique.naturalColor.map((number) => number)}
                </Text>
                <Text className="font-semibold">
                  - OBSVERVAÇÃO: VOCÊ PRECISA VER NO LAVATÓRIO A COR QUE ESTÁ NA
                  FOTO
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-xl font-bold">Observações Importantes</Text>
              <View className="mt-1">
                <Text className="font-semibold">
                  - {hairTechnique.tonalization}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Link href="/inicio/catalogo-de-referencia" asChild>
                <TouchableOpacity className="bg-blue-500 p-2 rounded-md">
                  <Text className="text-white font-bold text-center">
                    VER GRÁFICO DA TÉCNICA
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
