import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <StyledView className="flex-1 items-center justify-center p-4 bg-secondary">
      <StyledText className="text-3xl font-headingBold text-gray-100 mb-2">
        ERRO - 404
      </StyledText>
      <StyledText className="text-xl mb-4 text-gray-300">
        {t("Rota não encontrada")}
      </StyledText>
      <StyledTouchableOpacity className="p-2 bg-primary rounded w-full">
        <Link
          href="/sign-in"
          className="text-center text-gray-100 font-headingBold"
        >
          {t("Voltar")}
        </Link>
      </StyledTouchableOpacity>
    </StyledView>
  );
}
