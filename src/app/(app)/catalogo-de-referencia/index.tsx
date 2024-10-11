import { View, Text, ActivityIndicator } from "react-native";
import { HairTechnique, hairTechniques } from "@/constants/hairTechniques";
import Catalog from "@/components/catalog";
import Back from "@/components/back";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";

export default function CatalogoDeReferencia() {
  const { t } = useTranslation();

  const [itemsToShow, setItemsToShow] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderItem = useCallback(
    ({ index }: ListRenderItemInfo<HairTechnique>) => <Catalog index={index} />,
    [],
  );

  const renderListFooterComponent = useCallback(() => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FE017F" />
        </View>
      );
    }

    return null;
  }, [isLoading]);

  const onEndReached = useCallback(() => {
    if (isLoading) {
      return;
    }

    if (itemsToShow >= hairTechniques.length) {
      return;
    }

    setIsLoading(true);

    setItemsToShow((prev) => prev + 10);
    setIsLoading(false);
  }, [isLoading, itemsToShow]);

  return (
    <View className="bg-secondary" style={{ flex: 1 }}>
      <View className="w-full mt-2">
        <Back to="/" />
      </View>
      <View>
        <Text className="text-3xl font-headingBold text-center mt-4 text-primary">
          {t("Catálogo de Referências")}
        </Text>
      </View>
      <Text className="text-xl text-center text-gray-100 mt-20 mb-4">
        {t("Escolha a opção desejada")}!
      </Text>

      <FlashList
        data={hairTechniques.slice(0, itemsToShow)}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        estimatedItemSize={100}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderListFooterComponent}
        onEndReached={onEndReached}
        contentContainerStyle={{ paddingBottom: 80 }}
        getItemType={(item) => item.image}
      />
    </View>
  );
}
