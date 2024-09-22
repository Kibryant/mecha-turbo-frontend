import Back from "@/components/back";
import { useLocalSearchParams } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { colorCreation } from "@/constants/colorCreation";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CriacaoDeCor() {
  const { index } = useLocalSearchParams();

  const { t } = useTranslation();

  const color = colorCreation[parseInt(index as string)];

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom }}
      className="flex-1 flex-col items-center bg-secondary"
    >
      <View className="w-full mt-4">
        <Back to="/criacao-de-cores" />
      </View>
      <View className="mt-4">
        <Text className="text-3xl font-headingBold text-center text-primary">
          {t(color.name)}
        </Text>
      </View>
      <View className="mt-2 w-full px-2">
        <Image
          source={color.image}
          className="w-full h-96 object-cover rounded-md"
          cachePolicy="memory-disk"
        />
      </View>
      <View className="w-full justify-end px-2 mt-4">
        <View>
          <Text className="text-xl font-headingBold text-gray-100">
            {t("Receita")}
          </Text>
          <View className="mt-1">
            <Text className="font-heading3 text-gray-300">
              - {t(color.description)} {color.brand}
            </Text>
            <Text className="font-heading3 text-gray-300">
              - {t("Fundo de Clareamento")}{" "}
              {color.whiteningBackground.join(", ")}
            </Text>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-xl font-headingBold text-gray-100">
            {t("Observações importantes")}
          </Text>
          <View className="mt-1">
            <Text className="font-heading3 text-gray-300">
              -{" "}
              {t("Observar o tom da mecha e adaptar a sua técnica escolhida.")}
            </Text>
          </View>
          <View className="mt-1">
            <Text className="font-heading3 text-gray-300">
              -
              {t(
                "Não aplicar com o cabelo pingando água, isso dilui a mistura,sempre retirar o excesso com a toalha antes da tonalização.",
              )}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
