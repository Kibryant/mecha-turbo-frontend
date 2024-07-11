import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logoHorizontal } from "@/constants/logo";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Image source={logoHorizontal} style={{ width: 100, height: 50 }} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Text>
                <Ionicons name="menu" size={40} color="#f3f4f6" />
              </Text>
            </TouchableOpacity>
          ),
          title: "",
          drawerPosition: "right",
          drawerActiveTintColor: "#FE017F",
          drawerInactiveTintColor: "#f3f4f6",
          headerStyle: {
            backgroundColor: "#0d0d0d",
            borderBottomColor: "#e91e63",
          },
          drawerStyle: {
            backgroundColor: "#0D0D0D",
          },
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Início",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
