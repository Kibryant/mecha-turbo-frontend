import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, View, Text, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

export default function Item({
  index,
  image,
}: {
  index: number;
  image: string;
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  return (
    <Link href={`/catalogo-de-referencia/${index}`} key={index} asChild>
      <Pressable className="w-full rounded-md p-2 items-center mr-10">
        {loading && (
          <ActivityIndicator
            size="large"
            color="#FE017F"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 1,
            }}
          />
        )}
        <Image
          className="w-full h-52 relative rounded-md overflow-hidden flex-col items-center justify-end"
          source={image}
          contentFit="cover"
          onLoadEnd={() => setLoading(false)}
          cachePolicy="memory-disk"
          priority={index <= 20 ? "high" : "normal"}
        />
        <View className="absolute top-3 left-3 w-8 h-8 bg-primary rounded-full items-center justify-center font-body">
          <Text className="text-gray-100 font-headingBold">{index + 1}</Text>
        </View>
        <View className="p-1 w-11/12 bg-primary/80 mb-2 rounded-md absolute bottom-2">
          <Text className="text-gray-100 font-headingBold text-center">
            {t("Abrir")}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
