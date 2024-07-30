import { Link } from "expo-router";
import { Pressable, View, Text, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ColorCreationProps {
  name: string;
  index: number;
  image: string;
}

export default function ColorCreation({
  name,
  index,
  image,
}: ColorCreationProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  return (
    <Link href={`/criacao-de-cores/${index}`} key={index} asChild>
      <Pressable className="w-full rounded-md p-2 justify-center items-center">
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
          cachePolicy="memory"
          priority="high"
        />
        <View className="absolute bottom-11">
          <Text className="text-white font-extrabold font-h">{t(name)}</Text>
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
