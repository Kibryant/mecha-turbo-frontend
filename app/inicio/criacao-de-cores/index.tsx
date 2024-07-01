import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import Header from "@/components/header";
import { arrayOfImage } from "@/constants/arrayOfImages";

export default function CriaçaoDeCores() {
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View className="flex-1 flex-col items-center bg-gray-100">
          <Header />
          <View className="w-full mt-2">
            <Link href="/inicio">
              <Ionicons name="chevron-back" size={40} color="black" />
            </Link>
          </View>
          <View>
            <Text className="text-2xl font-bold text-center mt-4">
              Crie Nuances
            </Text>
          </View>
          <View className="mt-20">
            <Text className="text-xl text-center">
              Escolha a opção desejada!
            </Text>
            <View className="flex-row justify-between flex-wrap w-full mt-4 px-4 rounded-md">
              {Array.from({ length: 10 }).map((_, index) => (
                <Link
                  href={`/inicio/criacao-de-cores/${index}`}
                  key={index}
                  asChild
                >
                  <Pressable className="w-2/4 rounded-md p-2">
                    <ImageBackground
                      className="w-full h-48 relative rounded-md overflow-hidden flex-col items-center justify-end"
                      source={arrayOfImage[index]}
                    >
                      <View className="">
                        <Text className="text-white font-extrabold">
                          ACÚCAR MASCAVO
                        </Text>
                      </View>
                      <View className="p-1 w-11/12 bg-blue-500 mb-2 rounded-md">
                        <Text className="text-white font-bold text-center">
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
      </ScrollView>
    </SafeAreaProvider>
  );
}
