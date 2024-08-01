import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logoHorizontal } from "@/constants/logo";
import { Redirect } from "expo-router";
import { isSubscriptionActive } from "@/utils/isSubscriptionActive";
import { useAuthUser } from "@/context/userAuthContext";
import { User } from "@/core/user";
import { useAuthAdmin } from "@/context/adminAuthContext";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { user } = useAuthUser();
  const { token } = useAuthAdmin();

  const { t } = useTranslation();

  const userObject: User = JSON.parse(user || "null");

  if (!isSubscriptionActive(userObject?.expirationDate ?? "") && !token) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Image
              source={logoHorizontal}
              style={{ width: 100, height: 50 }}
              priority="high"
              className="ml-2"
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              className="mr-2"
              onPress={() => navigation.openDrawer()}
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
            drawerLabel: t("Início"),
          }}
        />

        <Drawer.Screen
          name="catalogo-de-referencia/index"
          options={{
            drawerLabel: t("Catálogo de Referências"),
          }}
        />

        <Drawer.Screen
          name="criacao-de-cores/index"
          options={{
            drawerLabel: t("Criação de Cores"),
          }}
        />

        <Drawer.Screen
          name="ericado-quadrantes/index"
          options={{
            drawerLabel: t("Eriçados e Quadrantes"),
          }}
        />

        <Drawer.Screen
          name="graficos/index"
          options={{
            drawerLabel: t("Gráficos"),
          }}
        />

        <Drawer.Screen
          name="teste-de-mecha/index"
          options={{
            drawerLabel: t("Teste de Mecha"),
          }}
        />

        <Drawer.Screen
          name="tecnicas-especialistas/index"
          options={{
            drawerLabel: t("Técnicas de Especialistas"),
          }}
        />

        <Drawer.Screen
          name="catalogo-de-referencia/[index]"
          options={{
            drawerActiveBackgroundColor: "#0D0D0D",
          }}
        />

        <Drawer.Screen
          name="criacao-de-cores/[index]"
          options={{
            drawerActiveBackgroundColor: "#0D0D0D",
          }}
        />

        <Drawer.Screen
          name="graficos/[grafico]"
          options={{
            drawerActiveBackgroundColor: "#0D0D0D",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
