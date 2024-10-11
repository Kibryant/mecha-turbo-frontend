import { View, Text } from "react-native";
import Back from "@/components/back";
import { FlashList } from "@shopify/flash-list";
import { colorCreation } from "@/constants/colorCreation";
import ColorCreation from "@/components/color-creation";
import { useTranslation } from "react-i18next";

export default function CriaçaoDeCores() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 flex-col bg-secondary">
      <View className="w-full mt-2">
        <Back to="/" />
      </View>
      <View>
        <Text className="text-3xl font-headingBold text-center mt-4 text-primary">
          {t("Crie Nuances")}
        </Text>
      </View>
      <View className="mt-20">
        <Text className="text-xl text-center text-gray-100 mb-2">
          {t("Escolha a opção desejada")}!
        </Text>
      </View>
      <FlashList
        data={colorCreation}
        renderItem={({ item, index }) => (
          <ColorCreation name={item.name} index={index} image={item.image} />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        estimatedItemSize={22}
      />
    </View>
  );
}
