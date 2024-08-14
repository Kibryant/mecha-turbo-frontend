import React from "react";
import { View, Image, Animated } from "react-native";
import { logoVertical } from "@/constants/logo";

interface HeaderProps {
  fadeAnim: Animated.Value;
}

export default function Header({ fadeAnim }: HeaderProps) {
  return (
    <View className="items-center justify-center p-4">
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={logoVertical} style={{ width: 280, height: 280 }} />
      </Animated.View>
    </View>
  );
}
