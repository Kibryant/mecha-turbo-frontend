import Back from "@/components/back";
import { graphicsImages } from "@/constants/graphicsImages";
import { toUpperCaseSeparated } from "@/utils/toUpperCaseSeparated";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import Button from "@/components/button";
import { Graphic } from "@/components/graphic";
import { useTranslation } from "react-i18next";
import { graphicsImagesEs } from "@/constants/graphicsImageEs";

export default function Grafico() {
  const { i18n } = useTranslation();

  const { grafico, url } = useLocalSearchParams<{
    grafico: string;
    url?: string;
  }>();

  const graphicImages =
    i18n.language === "es"
      ? graphicsImagesEs[grafico]
      : graphicsImages[grafico];

  return (
    <SafeAreaView className="bg-secondary">
      <ScrollView>
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
            <Graphic key={`${image}-${index + 1}`} imagePath={image} />
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
