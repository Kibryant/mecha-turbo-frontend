import { arrayOfImage } from "@/constants/arrayOfImages";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, View, Text, ActivityIndicator } from "react-native";
import { Image } from "expo-image";

export default function Item({ index }: { index: number }) {
  const [loading, setLoading] = useState(true);

  return (
    <Link href={`/inicio/catalogo-de-referencia/${index}`} key={index} asChild>
      <Pressable className="w-2/4 rounded-md p-2 items-center">
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
          source={arrayOfImage[index]}
          contentFit="cover"
          onLoadEnd={() => setLoading(false)}
          cachePolicy="memory-disk"
        />
        <View className="absolute top-3 left-3 w-8 h-8 bg-primary rounded-full items-center justify-center">
          <Text className="text-gray-100 font-bold">{index + 1}</Text>
        </View>
        <View className="p-1 w-11/12 bg-primary/80 mb-2 rounded-md absolute bottom-2">
          <Text className="text-gray-100 font-bold text-center">Abrir</Text>
        </View>
      </Pressable>
    </Link>
  );
}
