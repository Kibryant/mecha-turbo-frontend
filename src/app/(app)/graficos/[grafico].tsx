import Back from "@/components/back";
import { graphicsImages } from "@/constants/graphicsImages";
import { toUpperCaseSeparated } from "@/utils/toUpperCaseSeparated";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import Button from "@/components/button";

export default function Grafico() {
  const { grafico, url } = useLocalSearchParams<{
    grafico: string;
    url?: string;
  }>();

  const graphicImages = graphicsImages[grafico];

  return (
    <SafeAreaView className="bg-secondary">
      <ScrollView className="px-2">
        <View>
          <View className="w-full mt-2">
            <Back to={url ?? "/graficos"} />
          </View>

          <View className="mt-4">
            <Text className="text-3xl font-headingBold text-center text-gray-300">
              {toUpperCaseSeparated(grafico as string)}
            </Text>
          </View>

          {graphicImages.map((image, index) => (
            <View key={index} className="mt-4 overflow-hidden">
              <Image
                source={image}
                style={{
                  width: "100%",
                  height: 900,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
                contentFit="contain"
              />
            </View>
          ))}

          <Button
            href={`tecnicas-especialistas?url=/graficos/${grafico}`}
            text="Assistir aula desse gráfico"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
