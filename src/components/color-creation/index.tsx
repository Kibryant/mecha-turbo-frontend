import { Link } from "expo-router";
import {
  Pressable,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { useFirebaseImageCache } from "@/hooks/useFirebaseImageCache";

interface ColorCreationProps {
  name: string;
  index: number;
}

export default function ColorCreation({ name, index }: ColorCreationProps) {
  const { t } = useTranslation();

  const { url, loading, error, onRetry } = useFirebaseImageCache(
    `criacao-de-cores/${index + 1}.png`,
  );

  if (loading) {
    return (
      <View className="w-full h-52 relative rounded-md overflow-hidden flex-col items-center justify-center">
        <ActivityIndicator size="large" color="#FE017F" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="w-full h-52 relative rounded-md overflow-hidden flex-col items-center justify-center border border-red-300">
        <Text className="text-red-600 font-bold mt-2">
          {t("Erro ao carregar imagem")}
        </Text>
        <TouchableOpacity
          onPress={onRetry}
          className="mt-3 px-4 py-2 bg-red-500 rounded-md"
        >
          <Text className="text-white font-bold">{t("Tentar novamente")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <Link href={`/criacao-de-cores/${index}`} key={index} asChild>
      <Pressable className="w-full rounded-md p-2 justify-center items-center">
        <Image
          className="w-full h-52 relative rounded-md overflow-hidden flex-col items-center justify-end"
          source={{ uri: url ?? "" }}
          contentFit="cover"
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
