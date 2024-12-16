import { View, Text, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useFirebaseImageCache } from "@/hooks/useFirebaseImageCache";

interface GraphicProps {
  imagePath: string;
}

export function Graphic({ imagePath }: GraphicProps) {
  const { url, loading, error } = useFirebaseImageCache(imagePath);

  if (loading) {
    return (
      <View className="mt-4 overflow-hidden">
        <View
          style={{
            width: "100%",
            height: 900,
            backgroundColor: "#E0E0E0",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#FE017F" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="mt-4 flex items-center justify-center">
        <Text className="text-red-500 text-center font-bold">
          Erro ao carregar a imagem.
        </Text>
        <Text className="text-gray-500 text-center">
          Verifique sua conexão com a internet e tente novamente.
        </Text>
      </View>
    );
  }

  return (
    <View key={`${url}`} className="mt-4 overflow-hidden">
      <Image
        source={{ uri: url }}
        style={{
          width: "100%",
          height: 900,
          overflow: "hidden",
        }}
        contentFit="contain"
      />
    </View>
  );
}
