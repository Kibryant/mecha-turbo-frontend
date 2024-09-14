import { ActivityIndicator, View } from "react-native";

interface UserListFooterProps {
  isLoading: boolean;
}

export function UserListFooter({ isLoading }: UserListFooterProps) {
  if (!isLoading) return null;

  return (
    <View className="p-4">
      <ActivityIndicator size="large" color="#fe017f" />
    </View>
  );
}
