import { graphicsImages } from "@/constants/graphicsImages";
import { toUpperCaseSeparated } from "@/utils/toUpperCaseSeparated";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";

export default function Referencia() {
  const { grafico } = useLocalSearchParams();

  const graphicImages = graphicsImages[grafico as string];

  return (
    <ScrollView>
      <View className="bg-secondary px-2">
        <View className="mt-4">
          <Text className="text-3xl font-bold text-center text-gray-300">
            {toUpperCaseSeparated(grafico as string)}
          </Text>
        </View>

        {graphicImages.map((image, index) => (
          <View key={index} className="mt-4 overflow-hidden">
            <Image
              source={image}
              style={{
                width: "100%",
                height: 1000,
                borderRadius: 16,
                overflow: "hidden",
              }}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
