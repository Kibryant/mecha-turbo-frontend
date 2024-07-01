import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function NotFound() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-100 p-4 dark:bg-black">
      <StyledText className="text-3xl font-bold text-red-500 mb-2">
        ERRO - 404
      </StyledText>
      <StyledText className="text-xl mb-4">Página não encontrada</StyledText>
      <StyledTouchableOpacity className="p-2 bg-blue-500 rounded w-full">
        <Link href="/inicio" className="text-center text-white font-bold">
          Voltar
        </Link>
      </StyledTouchableOpacity>
    </StyledView>
  );
}
