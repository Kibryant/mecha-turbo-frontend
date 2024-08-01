import Back from "@/components/back";
import { graphics } from "@/constants/graphics";
import { toCamelCase } from "@/utils/toCamelCase";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, Pressable } from "react-native";

export default function Graficos() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-secondary">
      <View className="items-center">
        <View className="w-full mt-2">
          <Back to="/" />
        </View>

        <View>
          <Text className="text-2xl font-headingBold text-center mt-4 text-primary">
            {t("Gráficos")}
          </Text>
        </View>

        <View className="w-3/4 flex-col items-center gap-y-2 mt-20 pb-20">
          <Text className="text-xl font-headingBold text-gray-100">
            {t("Escolha a opção desejada")}!
          </Text>
          {graphics.map((graphic, index) => (
            <Link
              href={`/graficos/${toCamelCase(graphic)}?url=graficos`}
              className="p-4 w-full  bg-primary rounded-md mt-2"
              asChild
              key={graphic}
            >
              <Pressable>
                <Text className="text-gray-100 font-headingBold text-center">
                  {graphic}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
