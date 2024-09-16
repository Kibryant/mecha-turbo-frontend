import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logoHorizontal } from "@/constants/logo";
import { useAuthAdmin } from "@/context/adminAuthContext";
import { Redirect } from "expo-router";

export default function Layout() {
  const { isLoading, token } = useAuthAdmin();

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (!token) {
    return <Redirect href="/sign-in-adm" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Image
              source={logoHorizontal}
              style={{ width: 100, height: 50 }}
              className="ml-2"
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              className="mr-2"
            >
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
        <Drawer.Screen
          name="usuarios"
          options={{
            drawerLabel: "Usuários cadastrados",
          }}
        />
        <Drawer.Screen
          name="adicionar-usuario"
          options={{
            drawerLabel: "Adicionar usuário",
          }}
        />
        <Drawer.Screen
          name="configuracoes"
          options={{
            drawerLabel: "Configurações",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
