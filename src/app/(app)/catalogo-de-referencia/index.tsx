import { View, Text } from "react-native";
import { HairTechnique, hairTechniques } from "@/constants/hairTechniques";
import Catalog from "@/components/catalog";
import Back from "@/components/back";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

export default function CatalogoDeReferencia() {
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ index }: ListRenderItemInfo<HairTechnique>) => <Catalog index={index} />,
    [],
  );

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
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        estimatedItemSize={50}
      />
    </View>
  );
}
