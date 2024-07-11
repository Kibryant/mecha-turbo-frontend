import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { arrayOfImage } from "@/constants/arrayOfImages";
import Back from "@/components/back";

export default function CriaçaoDeCores() {
  return (
    <ScrollView className="bg-secondary">
      <View className="flex-1 flex-col items-center">
        <View className="w-full mt-2">
          <Back to="/inicio" />
        </View>
        <View>
          <Text className="text-2xl font-bold text-center mt-4 text-gray-100">
            Crie Nuances
          </Text>
        </View>
        <View className="mt-20">
          <Text className="text-xl text-center text-gray-300">
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
                    <View className="p-1 w-11/12 bg-primary mb-2 rounded-md">
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
  );
}
