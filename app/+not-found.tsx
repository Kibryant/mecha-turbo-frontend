import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function NotFound() {
  return (
    <StyledView className="flex-1 items-center justify-center p-4 bg-secondary">
      <StyledText className="text-3xl font-bold text-primary mb-2">
        ERRO - 404
      </StyledText>
      <StyledText className="text-xl mb-4 text-gray-300">
        Página não encontrada
      </StyledText>
      <StyledTouchableOpacity className="p-2 bg-primary rounded w-full">
        <Link href="/sign-in" className="text-center text-gray-100 font-bold">
          Voltar
        </Link>
      </StyledTouchableOpacity>
    </StyledView>
  );
}
