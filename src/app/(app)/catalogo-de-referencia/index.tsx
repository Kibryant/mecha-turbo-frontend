import { View, Text, ActivityIndicator } from "react-native";
import { HairTechnique, hairTechniques } from "@/constants/hairTechniques";
import Catalog from "@/components/catalog";
import Back from "@/components/back";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";

export default function CatalogoDeReferencia() {
  const allItems = [...hairTechniques];

  const [visibleItems, setVisibleItems] = useState(allItems.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);

  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<HairTechnique>) => (
      <Catalog index={index} image={item.image} />
    ),
    [],
  );

  const loadMore = () => {
    if (!hasMore) return;

    const currentLength = visibleItems.length;
    const newItems = allItems.slice(currentLength, allItems.length);

    if (newItems.length > 0) {
      setVisibleItems([...visibleItems, ...newItems]);

      if (visibleItems.length + newItems.length >= allItems.length) {
        setHasMore(false);
      }
    }
  };

  const ListFooterComponent = () => {
    if (hasMore) {
      return (
        <View className="flex justify-center items-center mt-4">
          <ActivityIndicator size="large" color="#fe017f" />
        </View>
      );
    }

    return null;
  };

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
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
}
