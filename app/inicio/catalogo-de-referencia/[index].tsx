import { arrayOfImage } from "@/constants/arrayOfImages";
import { hairTechniques } from "@/constants/hairTechniques";
import { toCamelCase } from "@/utils/toCamelCase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Referencia() {
  const { index } = useLocalSearchParams();

  const insets = useSafeAreaInsets();

  const hairTechnique = hairTechniques[parseInt(index as string)];

  const image = arrayOfImage[parseInt(index as string)];

  return (
    <SafeAreaProvider
      className="bg-secondary"
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView>
        <View className="flex-1 flex-col items-center bg-secondary">
          <View className="w-full mt-4">
            <Link href="/inicio/catalogo-de-referencia">
              <Ionicons name="chevron-back" size={40} color="#d1d5db" />
            </Link>
          </View>
          <View className="mt-4">
            <Text className="text-3xl font-bold text-center text-gray-300">
              Referência {parseInt(index as string) + 1}
            </Text>
          </View>
          <View className="mt-2 w-full px-2">
            <Image
              source={image}
              className="w-full h-96 object-cover rounded-md"
            />
          </View>
          <View className="w-full justify-end px-2 mt-4">
            <View>
              <Text className="text-xl font-bold text-gray-300">Técnica</Text>
              <View className="mt-1">
                <Text className="font-semibold text-gray-100">
                  - {hairTechnique.name} - Fundo {hairTechnique.base}
                </Text>
                <Text className="font-semibold text-gray-100">
                  - Fundo de Clareamento {hairTechnique.base}
                </Text>
                <Text className="font-semibold text-gray-100">
                  - Ideal Para Cor Natural{" "}
                  {hairTechnique.naturalColor.map((number) => number)}
                </Text>
                <Text className="font-semibold text-gray-100">
                  - OBSVERVAÇÃO: VOCÊ PRECISA VER NO LAVATÓRIO A COR QUE ESTÁ NA
                  FOTO
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-xl font-bold text-gray-300">
                Tonalizações
              </Text>
              <View className="mt-1">
                <Text className="font-semibold text-gray-100">
                  - {hairTechnique.tonalization}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-xl font-bold text-gray-300">
                Observações Importantes
              </Text>
              <View className="mt-1">
                <Text className="font-semibold text-gray-100">
                  - {hairTechnique.tonalization}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Link
                href={`/inicio/graficos/${toCamelCase(hairTechnique.technique)}`}
                asChild
              >
                <TouchableOpacity className="bg-primary p-2 rounded-md">
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
