import Back from "@/components/back";
import { hairTechniques } from "@/constants/hairTechniques";
import { toCamelCase } from "@/utils/toCamelCase";
import { Href, Link, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { useFirebaseImageCache } from "@/hooks/useFirebaseImageCache";

export default function Referencia() {
  const { index } = useLocalSearchParams();

  const { t } = useTranslation();

  const { url, loading, error } = useFirebaseImageCache(
    `catalogo-de-referencia/${Number(index) + 1}.jpg`,
  );

  if (loading) {
    return (
      <SafeAreaView className="bg-secondary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FE017F" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-secondary flex-1 items-center justify-center">
        <Text className="text-red-500">
          Ocorreu um erro ao carregar a imagem.
        </Text>
      </SafeAreaView>
    );
  }

  const hairTechnique = hairTechniques[parseInt(index as string)];

  return (
    <SafeAreaView className="bg-secondary pb-4">
      <ScrollView>
        <View className="flex-1 flex-col items-center bg-secondary">
          <View className="w-full mt-4">
            <Back to="/catalogo-de-referencia" />
          </View>
          <View className="mt-4">
            <Text className="text-3xl font-headingBold text-center text-primary">
              {t("Referência")} {parseInt(index as string) + 1}
            </Text>
          </View>
          <View className="mt-2 w-full px-2">
            <Image
              source={{
                uri: url ?? "",
              }}
              className="w-full h-96 object-cover rounded-md"
              cachePolicy="memory-disk"
            />
          </View>
          <View className="w-full justify-end px-2 mt-4">
            <View>
              <Text className="text-xl font-headingBold text-gray-100">
                {t("Técnica")}{" "}
                {hairTechnique.technique === "ILUMINUS BLOND"
                  ? "ILUMINUS BLOND (FREE HANDS)"
                  : hairTechnique.technique}
              </Text>
              <View className="mt-1">
                <Text className="font-heading3 text-gray-300">
                  - {t(hairTechnique.name)} - {t("Fundo")} {hairTechnique.base}
                </Text>
                <Text className="font-heading3 text-gray-300">
                  - {t("Fundo de Clareamento")} {hairTechnique.base}
                </Text>
                <Text className="font-heading3 text-gray-300">
                  - {t("Ideal Para Cor Natural")}{" "}
                  {hairTechnique.naturalColor.join(", ")}
                </Text>
                <Text className="font-heading3 text-gray-300">
                  -{" "}
                  {t(
                    "OBSVERVAÇÃO: VOCÊ PRECISA VER NO LAVATÓRIO A COR QUE ESTÁ NA FOTO",
                  )}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-xl font-headingBold text-gray-100">
                {t("Tonalizações")}
              </Text>
              <View className="mt-1">
                <Text className="font-heading3 text-gray-300">
                  - {t(hairTechnique.tonalization)}
                </Text>
              </View>
              {hairTechnique.brand && (
                <View className="mt-1">
                  <Text className="font-heading3 text-gray-300">
                    - {t("Referência marca")} {hairTechnique.brand}
                  </Text>
                </View>
              )}
            </View>

            <View className="mt-4">
              <Text className="text-xl font-headingBold text-gray-100">
                {t("Observações importantes")}
              </Text>
              <View className="mt-1">
                <Text className="font-heading3 text-gray-300">
                  - {t(hairTechnique.bristled)}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Link
                href={
                  `/graficos/${toCamelCase(hairTechnique.technique)}?url=/catalogo-de-referencia/${index}` as Href
                }
                asChild
              >
                <TouchableOpacity className="bg-primary p-2 rounded-md">
                  <Text className="text-gray-100 font-headingBold text-center">
                    {t("VER GRÁFICO DA TÉCNICA")}
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
