import Back from "@/components/back";
import { useTranslation } from "react-i18next";
import { View, Text, Linking, TouchableOpacity } from "react-native";

export default function TecnicasEspecialistas() {
  const { t } = useTranslation();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="bg-secondary flex-1 items-center">
      <View className="w-full mt-2">
        <Back to="/" />
      </View>

      <Text className="text-primary text-3xl font-headingBold mt-10">
        {t("Técnicas de Especialistas")}
      </Text>
      <View className="w-full px-4 justify-center items-center mt-4">
        <View className="w-full border border-primary rounded-md p-4">
          <Text className="text-gray-100 font-headingBold text-left">
            {t("É nossa aluna? Acesse o conteúdo exclusivo!")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              openLink("https://especialistas20planostart.club.hotmart.com/")
            }
            className="w-full border border-primary rounded-md p-4 mt-2"
          >
            <Text className="text-gray-100 font-headingBold text-center">
              {t("Acessar conteúdo")}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full border border-primary rounded-md p-4 mt-4">
          <Text className="text-gray-100 font-headingBold text-left">
            {t("Ainda não é nossa aluna? Fale com o nosso suporte!")}
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
              {t("Falar com o suporte")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
