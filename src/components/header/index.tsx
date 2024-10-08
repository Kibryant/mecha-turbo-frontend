import React from "react";
import { View, Animated } from "react-native";
import { logoVertical } from "@/constants/logo";
import { Image } from "expo-image";

interface HeaderProps {
  fadeAnim: Animated.Value;
}

export default function Header({ fadeAnim }: HeaderProps) {
  return (
    <View className="items-center justify-center px-4 py-2">
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={logoVertical}
          style={{ width: 280, height: 280 }}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}
