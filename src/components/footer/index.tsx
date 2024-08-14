import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <View className="absolute bottom-2">
      <Text className="text-primary text-xs font-body">
        &copy; {t("Todos os direitos reservados DNA MECHA TURBO")}
      </Text>
    </View>
  );
}
