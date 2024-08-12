import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 items-center justify-center p-4 bg-secondary">
      <Text className="text-3xl font-headingBold text-gray-100 mb-2">
        ERRO - 404
      </Text>
      <Text className="text-xl mb-4 text-gray-300">
        {t("Rota não encontrada")}
      </Text>
      <TouchableOpacity className="p-2 bg-primary rounded w-full">
        <Link
          href="/sign-in"
          className="text-center text-gray-100 font-headingBold"
        >
          {t("Voltar")}
        </Link>
      </TouchableOpacity>
    </View>
  );
}
