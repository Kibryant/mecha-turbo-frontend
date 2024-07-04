import { View, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { hairTechniques } from "@/constants/hairTechniques";
import Item from "@/components/Item";

export default function CatalogoDeReferencia() {
  return (
    <SafeAreaProvider>
      {/* <ScrollView>
        <View className="flex-1 flex-col items-center bg-secondary">
          <View className="w-full mt-2">
            <Link href="/inicio">
              <Ionicons name="chevron-back" size={40} color="#d1d5db" />
            </Link>
          </View>
          <View>
            <Text className="text-2xl font-bold text-center mt-4 text-gray-100">
              Catálogo de Referências
            </Text>
          </View>
          <View className="mt-20">
            <Text className="text-xl text-center text-gray-100">
              Escolha a opção desejada!
            </Text>
            <View className="flex-row justify-between flex-wrap w-full mt-4 px-4 rounded-md">
              {hairTechniques.map((_, index) => (
                <Link
                  href={`/inicio/catalogo-de-referencia/${index}`}
                  key={index}
                  asChild
                >
                  <Pressable className="w-2/4 rounded-md p-2">
                    <ImageBackground
                      className="w-full h-48 relative rounded-md overflow-hidden flex-col items-center justify-end"
                      source={arrayOfImage[index]}
                      resizeMode="cover"
                    >
                      <View className="absolute top-1 left-1 w-8 h-8 bg-primary rounded-full items-center justify-center">
                        <Text className="text-gray-100 font-bold">
                          {index + 1}
                        </Text>
                      </View>

                      <View className="p-1 w-11/12 bg-primary/80 mb-2 rounded-md">
                        <Text className="text-gray-100 font-bold text-center">
                          Abrir
                        </Text>
                      </View>
                    </ImageBackground>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        </View>
      </ScrollView> */}
      <View className="flex-1 flex-col items-center bg-secondary">
        <View className="w-full mt-2">
          <Link href="/inicio">
            <Ionicons name="chevron-back" size={40} color="#d1d5db" />
          </Link>
        </View>
        <View>
          <Text className="text-2xl font-bold text-center mt-4 text-gray-100">
            Catálogo de Referências
          </Text>
        </View>
        <Text className="text-xl text-center text-gray-100 mt-20 mb-4">
          Escolha a opção desejada!
        </Text>
        <FlatList
          data={hairTechniques}
          renderItem={({ item, index }) => <Item index={index} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Define o número de colunas na grade
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </SafeAreaProvider>
  );
}
