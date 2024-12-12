import Back from "@/components/back";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text, Linking, TouchableOpacity } from "react-native";

export default function TecnicasEspecialistas() {
  const { url } = useLocalSearchParams<{ url?: string }>();

  const { t } = useTranslation();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="bg-secondary flex-1 items-center">
      <View className="w-full mt-2">
        <Back to={url ? url : "/"} />
      </View>

      <Text className="text-primary text-3xl font-headingBold mt-10">
        {t("Técnicas de Especialistas")}
      </Text>
      <View className="w-full px-4 justify-center items-center mt-4">
        <View className="w-full border border-primary rounded-md p-4">
          <Text className="text-gray-100 font-headingBold text-left">
            {t("É nossa aluna?")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              openLink(
                "https://hotmart.com/pt-br/club/mecha-turbo-debora-martins-cursos/products/4204207?from=ListProductsPage&_gl=1*kf1o6n*_gcl_au*Njg1MTE5MzE5LjE3MjUyNzkzMjQ.*_ga*ODEwNDAwMzEzLjE3MjUyNzkzMjg.*_ga_GQH2V1F11Q*MTczMTUyNTg1MC4yMjMuMS4xNzMxNTI4MTk2LjQxLjAuMTQ5OTY2NDc1Nw",
              )
            }
            className="w-full border border-primary rounded-md p-4 mt-2"
          >
            <Text className="text-gray-100 font-headingBold text-center">
              {t("Acesse conteúdo")}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full border border-primary rounded-md p-4 mt-4">
          <Text className="text-gray-100 font-headingBold text-left">
            {t("Ainda não é nossa aluna?")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              openLink(
                "https://api.whatsapp.com/send?phone=5543999601261&text=Eu%20estou%20no%20app%20DNA%20da%20Mecha%20Turbo%20e%20tenho%20interesse%20em%20ter%20acesso%20as%20v%C3%ADdeo%20aulas%20da%20Forma%C3%A7%C3%A3o%20Mecha%20Turbo%20%7C%20Especialistas%202.0",
              )
            }
            className="w-full border border-primary rounded-md p-4 mt-2"
          >
            <Text className="text-gray-100 font-headingBold text-center">
              {t("Fale com o suporte")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
