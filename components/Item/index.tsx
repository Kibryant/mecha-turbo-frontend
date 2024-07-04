import { arrayOfImage } from "@/constants/arrayOfImages";
import { Link } from "expo-router";
import { Pressable, ImageBackground, View, Text } from "react-native";

export default function Item({ index }: { index: number }) {
  return (
    <Link href={`/inicio/catalogo-de-referencia/${index}`} key={index} asChild>
      <Pressable className="w-2/4 rounded-md p-2">
        <ImageBackground
          className="w-full h-48 relative rounded-md overflow-hidden flex-col items-center justify-end"
          source={arrayOfImage[index]}
          resizeMode="cover"
        >
          <View className="absolute top-1 left-1 w-8 h-8 bg-primary rounded-full items-center justify-center">
            <Text className="text-gray-100 font-bold">{index + 1}</Text>
          </View>
          <View className="p-1 w-11/12 bg-primary/80 mb-2 rounded-md">
            <Text className="text-gray-100 font-bold text-center">Abrir</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
