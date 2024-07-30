import { View, Text } from "react-native";
import { hairTechniques } from "@/constants/hairTechniques";
import Item from "@/components/Item";
import Back from "@/components/back";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";

export default function CatalogoDeReferencia() {
  const { t } = useTranslation();

  return (
    <View className="bg-secondary" style={{ flex: 1 }}>
      <View className="w-full mt-2">
        <Back to="/" />
      </View>
      <View>
        <Text className="text-2xl font-headingBold text-center mt-4 text-gray-300">
          {t("Catálogo de Referências")}
        </Text>
      </View>
      <Text className="text-xl text-center text-gray-100 mt-20 mb-4">
        {t("Escolha a opção desejada")}!
      </Text>
      <FlashList
        data={hairTechniques}
        renderItem={({ item, index }) => (
          <Item index={index} image={item.image} />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        estimatedItemSize={50}
      />
    </View>
  );
}
