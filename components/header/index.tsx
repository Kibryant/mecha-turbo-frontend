import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header() {
  return (
    <View className="flex-row w-full justify-between items-center px-4 bg-gray-300">
      <Text>LOGO</Text>
      <Ionicons name="menu" size={40} color="black" />
    </View>
  );
}
